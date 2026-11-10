// Compiled HTML Help (.chm) — the format Windows shows when you press F1.
//
// A CHM is an OLE compound file produced by Microsoft's HTML Help Workshop, so it cannot be written from Node: this script
// assembles the help project (one HTML topic per page, a contents tree, an index, an .hhp) and then runs `hhc.exe` when the
// workshop is installed. When it is not — a Linux CI runner, for instance — the script says so and leaves whatever is
// already committed in `public/chm/` alone, exactly like the PDF step leaves its Chromium-free builds alone.
//
// The manifest it writes reports what is actually on disk, not what this run managed to build, so a committed .chm keeps
// its download link even on a machine that cannot produce one.
//
// `HTMLHELP_HHC` overrides the path to hhc.exe.

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('..', import.meta.url));
const dist = join(here, 'dist');
const publicDir = join(here, 'public');
const work = join(dist, 'chm');
const strict = process.argv.includes('--strict');

interface PageEntry {
	href: string;
	title: string;
	kind: 'md' | 'build';
	description?: string;
}

interface CompiledPage {
	title: string;
	description?: string;
	html: string;
}

interface Catalog {
	projects: {
		id: string;
		title: string;
		versions: { version: string; pages: PageEntry[] }[];
	}[];
}

const escape = (text: string): string =>
	text.replace(/&/gu, '&amp;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;').replace(/"/gu, '&quot;');

/** Where `hhc.exe` might be: the environment first, then the two places the installer uses. */
function findHhc(): string | undefined {
	const candidates = [
		process.env['HTMLHELP_HHC'],
		'C:\\Program Files (x86)\\HTML Help Workshop\\hhc.exe',
		'C:\\Program Files\\HTML Help Workshop\\hhc.exe'
	];
	return candidates.find((candidate): candidate is string => candidate !== undefined && existsSync(candidate));
}

/** The stylesheet every topic carries: the same reading rules as the site, without the site. */
const STYLE = `
body{margin:0;padding:18px 22px 40px;font:14px/1.7 "Segoe UI",system-ui,sans-serif;color:#1b1b1f;background:#fff;max-width:900px}
h1{font-size:26px;line-height:1.25;margin:0 0 6px}
h2{font-size:22px;margin:28px 0 8px;padding-top:10px;border-top:1px solid #e0e0e0}
h3{font-size:17px;margin:20px 0 6px}
a{color:#0067b8}
code{font-family:ui-monospace,Consolas,monospace;font-size:13px;background:#f3f2f1;padding:1px 4px;border-radius:3px}
.code{margin:0 0 16px;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden}
.code__bar{display:flex;justify-content:space-between;padding:3px 10px;background:#f3f2f1;font-size:11px;color:#6e7379}
.code__pre{margin:0;padding:10px 12px;overflow:auto;background:#faf9f8}
.code__pre code{background:none;padding:0}
table{width:100%;border-collapse:collapse;margin:0 0 16px;font-size:13px}
th,td{padding:6px 10px;text-align:left;border-bottom:1px solid #e0e0e0}
th{background:#faf9f8}
blockquote{margin:0 0 14px;padding-left:12px;border-left:3px solid #c8c6c4;color:#5c5f66}
.callout{margin:0 0 16px;padding:9px 13px;border-left:3px solid #0f548c;background:#eff6fc;border-radius:4px}
.callout--tip{border-left-color:#0e700e;background:#f1faf1}
.callout--important{border-left-color:#8a5300;background:#fff9e6}
.callout--warning{border-left-color:#b10e1c;background:#fdf3f4}
.callout__title{margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.nav{display:flex;gap:14px;margin:0 0 14px;padding-bottom:10px;border-bottom:1px solid #e0e0e0;font-size:11px;color:#6e7379}
.nav a{margin-left:auto}
.nav a:first-child{margin-left:0}
.anchor{display:none}
.lead{margin:0 0 16px;color:#5c5f66;font-size:17px}
`;

function topic(page: CompiledPage, previous?: PageEntry, next?: PageEntry): string {
	const body = page.html.replace(/<button class="code__copy"[^>]*>Copy<\/button>/gu, '').replace(/<a class="anchor"[^>]*>.*?<\/a>/gu, '');
	const nav = [
		'<div class="nav">',
		'<a href="index.html">Contents</a>',
		previous === undefined ? '' : `<a href="${previous.href}.html">‹ ${escape(previous.title)}</a>`,
		next === undefined ? '' : `<a href="${next.href}.html">${escape(next.title)} ›</a>`,
		'</div>'
	].join('');
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escape(page.title)}</title>
<style>${STYLE}</style>
</head>
<body>
${nav}
<h1>${escape(page.title)}</h1>
${page.description === undefined ? '' : `<p class="lead">${escape(page.description)}</p>`}
${body}
</body>
</html>
`;
}

/**
 * The contents tree of the help file: the same hierarchy the pages themselves have.
 *
 * A CHM's left pane is sitemap nodes, and a page whose address is a path (`control/inputs/menu`) belongs under the folders
 * of that path — the chapter's own page first, then its topics, in reading order. This is what makes the compiled help
 * look like the manual it came from instead of one flat list of 128 titles.
 */
function contents(pages: PageEntry[]): string {
	interface Node {
		name: string;
		path: string;
		seq: { page?: PageEntry; folder?: Node }[];
		folders: Map<string, Node>;
	}

	const root: Node = { name: '', path: '', seq: [], folders: new Map() };
	for (const page of pages) {
		const parts = page.href.split('/');
		let node = root;
		for (const part of parts.slice(0, -1)) {
			let child = node.folders.get(part);
			if (child === undefined) {
				child = { name: part, path: node.path === '' ? part : `${node.path}/${part}`, seq: [], folders: new Map() };
				node.folders.set(part, child);
				node.seq.push({ folder: child });
			}
			node = child;
		}
		node.seq.push({ page });
	}

	// A folder is named by the page that lives at its own address — "6.1 Graphic Screens", not "graphic-screens".
	const ownPage = (node: Node): PageEntry | undefined =>
		node.seq.find((item) => item.page !== undefined && item.page.href === `${node.path}/${node.name}`)?.page;

	const draw = (node: Node, depth: number, skip?: string): string => {
		const pad = '  '.repeat(depth + 1);
		const out: string[] = [];
		for (const item of node.seq) {
			if (item.page !== undefined) {
				// A chapter's own page is the folder row itself: printing it again under its own folder lists it twice.
				if (item.page.href === skip) {
					continue;
				}
				out.push(`${pad}<LI><OBJECT type="text/sitemap"><param name="Name" value="${escape(item.page.title)}"><param name="Local" value="${item.page.href}.html"></OBJECT>`);
				continue;
			}
			const folder = item.folder;
			if (folder === undefined) {
				continue;
			}
			// A folder that has its own page opens it; one that does not is a plain grouping node.
			const own = ownPage(folder);
			const local = own === undefined ? '' : `<param name="Local" value="${own.href}.html">`;
			out.push(`${pad}<LI><OBJECT type="text/sitemap"><param name="Name" value="${escape(own?.title ?? folder.name.replace(/[-_]+/gu, ' '))}">${local}</OBJECT>`);
			out.push(`${pad}<UL>`);
			out.push(draw(folder, depth + 1, own?.href));
			out.push(`${pad}</UL>`);
		}
		return out.join('\n');
	};

	// The book's own node is not repeated: the help file's title bar already names it, and the original file opens on its
	// first page rather than on a folder that holds everything.
	return `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML><HEAD><meta name="GENERATOR" content="Microsoft&reg; HTML Help Workshop 4.1">
<!-- Sitemap 1.0 --></HEAD><BODY>
<OBJECT type="text/site properties"><param name="ImageType" value="Folder"><param name="Font" value="Segoe UI,9,,,"></OBJECT>
<UL>
${draw(root, 0)}
</UL>
</BODY></HTML>
`;
}

function index(entries: { title: string; href: string }[]): string {
	const items = entries
		.map((entry) => `    <LI><OBJECT type="text/sitemap"><param name="Name" value="${escape(entry.title)}"><param name="Local" value="${entry.href}"></OBJECT>`)
		.join('\n');
	return `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML><HEAD><meta name="GENERATOR" content="Microsoft&reg; HTML Help Workshop 4.1">
<!-- Sitemap 1.0 --></HEAD><BODY>
<UL>
${items}
</UL>
</BODY></HTML>
`;
}

function landing(projectTitle: string, version: string, pages: PageEntry[]): string {
	const items = pages.map((page) => `<li><a href="${page.href}.html">${escape(page.title)}</a></li>`).join('\n');
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escape(projectTitle)} ${escape(version)}</title>
<style>${STYLE}</style>
</head>
<body>
<h1>${escape(projectTitle)} ${escape(version)}</h1>
<p class="lead">Temco Learn — the guide for this version, in Windows Help.</p>
<ul>${items}</ul>
</body>
</html>
`;
}

/** Everything on disk, whichever machine built it: this is what the manifest reports. */
async function availableOnDisk(): Promise<Record<string, Record<string, { chm: boolean }>>> {
	const projects: Record<string, Record<string, { chm: boolean }>> = {};
	for (const root of [publicDir, dist]) {
		const folder = join(root, 'chm');
		if (!existsSync(folder)) {
			continue;
		}
		for (const project of await readdir(folder, { withFileTypes: true })) {
			if (!project.isDirectory()) {
				continue;
			}
			for (const file of await readdir(join(folder, project.name))) {
				if (!file.endsWith('.chm')) {
					continue;
				}
				const version = file.slice(0, -'.chm'.length);
				const held = (projects[project.name] ??= {});
				held[version] = { chm: true };
			}
		}
	}
	return projects;
}

async function main(): Promise<void> {
	if (!existsSync(join(here, 'public', 'catalog.json'))) {
		console.error('chm: public/catalog.json is missing — run `npm run catalog` first.');
		process.exitCode = 1;
		return;
	}

	const catalog = JSON.parse(await readFile(join(publicDir, 'catalog.json'), 'utf8')) as Catalog;
	const hhc = findHhc();
	let built = 0;
	let skipped = 0;

	if (hhc === undefined) {
		console.warn('chm: HTML Help Workshop is not installed — skipping. Set HTMLHELP_HHC to hhc.exe to compile.');
		if (strict) {
			process.exitCode = 1;
		}
	} else {
		for (const project of catalog.projects) {
			for (const version of project.versions) {
				const pages = version.pages.filter((page) => page.kind === 'md');
				if (pages.length === 0) {
					continue;
				}
				const bodiesPath = join(publicDir, 'content', project.id, `${version.version}.json`);
				if (!existsSync(bodiesPath)) {
					skipped += 1;
					continue;
				}
				const bodies = (JSON.parse(await readFile(bodiesPath, 'utf8')) as { pages: Record<string, CompiledPage> }).pages;

				// A scratch project per version: hhc writes the .chm beside the .hhp, and these sources are not shipped.
				const source = join(work, project.id, `${version.version}-src`);
				await rm(source, { recursive: true, force: true });
				await mkdir(source, { recursive: true });

				const title = `${project.title} ${version.version}`;
				// A help file is one folder on a reader's disk, so its pictures travel inside it: the served addresses are
				// rewritten to a `media/` folder beside the topics, and the files are copied there.
				const media = join(publicDir, 'media', project.id, version.version);
				const inside = `media/${project.id}/${version.version}/`;
				if (existsSync(media)) {
					await cp(media, join(source, 'media'), { recursive: true });
				}
				const inFile = (html: string): string => html.split(inside).join('media/');

				await writeFile(join(source, 'index.html'), landing(project.title, version.version, pages), 'utf8');
				for (const [at, page] of pages.entries()) {
					const body = bodies[page.href];
					if (body === undefined) {
						continue;
					}
					// A page's address is its path, so a chapter's topics land in a folder of the same name.
					const where = join(source, `${page.href}.html`);
					await mkdir(dirname(where), { recursive: true });
					await writeFile(where, inFile(topic(body, pages[at - 1], pages[at + 1])), 'utf8');
				}

				await writeFile(join(source, 'contents.hhc'), contents(pages), 'utf8');
				await writeFile(
					join(source, 'index.hhk'),
					index([{ title: 'Overview', href: 'index.html' }, ...pages.map((page) => ({ title: page.title, href: `${page.href}.html` }))]),
					'utf8'
				);

				const compiled = `${project.id}-${version.version}.chm`;
				const hhp = `[OPTIONS]
Compatibility=1.1 or later
Compiled file=${compiled}
Contents file=contents.hhc
Index file=index.hhk
Default topic=index.html
Display compile progress=No
Full-text search=Yes
Language=0x409 English (United States)
Title=${title}

[FILES]
index.html
${pages.map((page) => `${page.href}.html`).join('\n')}

[INFOTYPES]
`;
				await writeFile(join(source, `${version.version}.hhp`), hhp, 'utf8');

				const run = spawnSync(hhc, [`${version.version}.hhp`], { cwd: source, encoding: 'utf8', timeout: 120000 });
				const produced = join(source, compiled);
				if (!existsSync(produced)) {
					console.warn(`chm: ${project.id} ${version.version} did not compile — ${(run.stdout ?? '').trim().split('\n').at(-1) ?? 'no output'}`);
					skipped += 1;
					continue;
				}

				const target = join(work, project.id);
				await mkdir(target, { recursive: true });
				await cp(produced, join(target, `${version.version}.chm`));
				await rm(source, { recursive: true, force: true });
				built += 1;
				console.log(`chm: ${project.id}/${version.version}.chm`);
			}
		}
	}

	// Committed like the PDFs: a clone that has never run the workshop still has working links.
	const fromDist = join(dist, 'chm');
	if (existsSync(fromDist)) {
		await rm(join(publicDir, 'chm'), { recursive: true, force: true });
		await cp(fromDist, join(publicDir, 'chm'), { recursive: true });
	}

	const manifest = { generated: new Date().toISOString(), projects: await availableOnDisk() };
	// The folder normally exists because `scripts/catalog.mts` wrote the offline bundles into it; an empty site has no
	// bundles, so the manifest is the first thing to land there.
	await mkdir(join(publicDir, 'download'), { recursive: true });
	await writeFile(join(publicDir, 'download', 'manifest.json'), `${JSON.stringify(manifest, null, '\t')}\n`, 'utf8');
	console.log(`chm: ${built} compiled, ${skipped} skipped, ${Object.keys(manifest.projects).length} project(s) in the manifest`);
}

await main();
