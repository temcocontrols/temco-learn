// The catalog: the one file the app reads to know what exists.
//
// Two kinds of page end up in it, and the app does not care which is which until it renders one: a **Markdown** page this
// repo authors (`content/<project>/<version>/*.md`), and an **imported** page a project's own build wrote
// (`public/imported/<project>/<version>/*.html`). Both become rows of one version, in one reading order.
//
// Each Markdown page also carries what the reader needs to point back at it — the path a pencil opens, when it last
// changed, how long it takes — and the same content is written again as downloadable Markdown and a ZIP of it.
//
// Everything here is derived: delete `catalog.json` and the content tree, run this, and the same file comes back. That is
// deliberate — a generated file nobody can reproduce by hand is a file that drifts.

import { cp, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import hljs from 'highlight.js';
import { zip } from './zip.mts';

const here = fileURLToPath(new URL('..', import.meta.url));
const content = join(here, 'content');
const publicDir = join(here, 'public');
const imported = join(publicDir, 'imported');
const outDir = join(publicDir, 'content');
const downloadDir = join(publicDir, 'download');

interface Section {
	id: string;
	title: string;
	description: string;
}

interface SiteFile {
	title: string;
	section?: string;
	summary?: string;
	/** A project that lives in another repository says so, and the pencil follows it. */
	repository?: string;
	editBranch?: string;
}

/** `content/config.json`: the site-wide answers the catalog copies into every project. */
interface SiteConfig {
	repository?: string;
	editBranch?: string;
	siteUrl?: string;
	/** The suggestions shown under the home page's search field. Yours to choose, since only you know what readers look for. */
	hints?: string[];
}

interface PageEntry {
	href: string;
	title: string;
	kind: 'md' | 'build';
	description?: string;
	source?: string;
	updated?: string;
	minutes?: number;
}

interface Version {
	version: string;
	/** When the newest page of this version was written or imported, ISO. */
	builtAt?: string;
	pages: PageEntry[];
}

interface Project {
	id: string;
	title: string;
	section: string;
	summary: string;
	latest: string;
	versions: Version[];
	repository?: string;
	editBranch?: string;
}

interface Catalog {
	generated: string;
	sections: Section[];
	projects: Project[];
	repository?: string;
	editBranch?: string;
	siteUrl?: string;
	hints?: string[];
}

interface CompiledPage {
	title: string;
	description?: string;
	html: string;
	headings: { id: string; text: string; level: number }[];
}

const md = new MarkdownIt({ html: true, linkify: true, typographer: false });

/** The name a code block wears in its header strip, when the fence names a language we recognise. */
const LANGUAGES: Record<string, string> = {
	bash: 'Shell',
	sh: 'Shell',
	powershell: 'PowerShell',
	ps1: 'PowerShell',
	ts: 'TypeScript',
	tsx: 'TypeScript',
	js: 'JavaScript',
	jsx: 'JavaScript',
	json: 'JSON',
	md: 'Markdown',
	yaml: 'YAML',
	yml: 'YAML',
	xml: 'XML',
	html: 'HTML',
	css: 'CSS',
	cs: 'C#',
	cpp: 'C++',
	c: 'C',
	sql: 'SQL',
	diff: 'Diff',
	text: 'Text',
	ini: 'Configuration'
};

/** Callouts: `::: note`, `::: tip`, `::: important`, `::: warning`, and a title after the kind if one is given. */
const CALLOUTS: Record<string, string> = {
	note: 'Note',
	tip: 'Tip',
	important: 'Important',
	warning: 'Warning'
};

for (const [kind, fallback] of Object.entries(CALLOUTS)) {
	// Calling the plugin is what `md.use` does; going direct keeps the container's own untyped signature out of the way.
	container(md, kind, {
		render(tokens, index) {
			const token = tokens[index];
			if (token === undefined) {
				return '';
			}
			if (token.nesting === 1) {
				const given = token.info.trim().slice(kind.length).trim();
				const title = given === '' ? fallback : given;
				return `<div class="callout callout--${kind}"><p class="callout__title">${md.utils.escapeHtml(title)}</p>\n`;
			}
			return '</div>\n';
		}
	});
}

// A code block becomes a header strip (language, then the Copy button the reader adds) over the highlighted source.
md.renderer.rules.fence = (tokens, index) => {
	const token = tokens[index];
	if (token === undefined) {
		return '';
	}
	const named = (token.info.trim().split(/\s+/u)[0] ?? '').toLowerCase();
	const label = LANGUAGES[named] ?? (named === '' ? 'Text' : named.toUpperCase());
	const body =
		named !== '' && hljs.getLanguage(named) !== undefined
			? hljs.highlight(token.content, { language: named, ignoreIllegals: true }).value
			: md.utils.escapeHtml(token.content);
	return (
		`<div class="code"><div class="code__bar"><span class="code__lang">${md.utils.escapeHtml(label)}</span>` +
		`<button class="code__copy" type="button" data-copy>Copy</button></div>` +
		`<pre class="code__pre"><code class="hljs">${body}</code></pre></div>\n`
	);
};


/** `1.0` after `0.9`, and `1.10` after `1.9`: a version is numbers, not a string. */
function compareVersions(one: string, other: string): number {
	const left = one.split(/[.\-+]/).map((part) => Number.parseInt(part, 10));
	const right = other.split(/[.\-+]/).map((part) => Number.parseInt(part, 10));
	for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
		const a = left[index] ?? 0;
		const b = right[index] ?? 0;
		if (a !== b) {
			return b - a;
		}
	}
	return 0;
}

/** `Getting started` → `getting-started`, which is what the address carries. */
function slugOf(title: string, fallback: string): string {
	const slug = title
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[^a-z0-9]+/gu, '-')
		.replace(/^-+|-+$/gu, '');
	return slug === '' ? fallback : slug;
}

async function folders(path: string): Promise<string[]> {
	if (!existsSync(path)) {
		return [];
	}
	const entries = await readdir(path, { withFileTypes: true });
	return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

/** Every Markdown file under a version folder, as paths relative to it: `control/inputs/inputs.md`. */
async function markdownFiles(folder: string, under = ''): Promise<string[]> {
	const found: string[] = [];
	let entries: { name: string; isDirectory(): boolean }[];
	try {
		entries = await readdir(join(folder, under), { withFileTypes: true });
	} catch {
		return found;
	}
	for (const entry of entries) {
		const path = under === '' ? entry.name : `${under}/${entry.name}`;
		if (entry.isDirectory()) {
			found.push(...(await markdownFiles(folder, path)));
			continue;
		}
		if (entry.name.endsWith('.md')) {
			found.push(path);
		}
	}
	return found;
}

/** The prefix the build was made for: `/` locally, `/temco-learn/` on the project site. */
function assetBase(): string {
	const base = process.env['VITE_BASE'] ?? '/';
	return base.endsWith('/') ? base : `${base}/`;
}

/**
 * The words of a heading, as a reader hears them.
 *
 * The inner HTML is markup, so an `&` in the author's heading arrives as `&amp;`. Decoding here keeps the
 * text in "In this page" and the anchor a reader copies free of entity names.
 */
function headingText(inner: string): string {
	return inner
		.replace(/<[^>]+>/gu, '')
		.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/giu, (whole, name: string) => {
			if (name.startsWith('#')) {
				const code = name[1] === 'x' || name[1] === 'X' ? Number.parseInt(name.slice(2), 16) : Number.parseInt(name.slice(1), 10);
				return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
			}
			const named: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };
			return named[name.toLowerCase()] ?? whole;
		})
		.trim();
}

/** A heading id that is stable between builds, so a shared link keeps working after an edit. */
function headingId(text: string, taken: Set<string>): string {
	const base = slugOf(text, 'section');
	let id = base;
	let suffix = 2;
	while (taken.has(id)) {
		id = `${base}-${String(suffix)}`;
		suffix += 1;
	}
	taken.add(id);
	return id;
}

/** The words a reader would actually read, counted the way a reading-time estimate counts them. */
function readingMinutes(html: string): number {
	const words = html
		.replace(/<[^>]+>/gu, ' ')
		.replace(/&[a-z#0-9]+;/giu, ' ')
		.split(/\s+/u)
		.filter((word) => word !== '').length;
	return Math.max(1, Math.round(words / 200));
}

/**
 * Compile one Markdown page: HTML for the reader, headings for "In this article", title for the catalog.
 *
 * Each heading carries a `#` link. It is markup rather than a hover effect in the browser, so the affordance exists before
 * any JavaScript runs and the anchor a reader copies is the same string on every build.
 */
function compile(source: string, slug: string, project: string, version: string): CompiledPage {
	const parsed = matter(source);
	const data = parsed.data as { title?: unknown; description?: unknown };
	const title = typeof data.title === 'string' && data.title.trim() !== '' ? data.title.trim() : slug;
	const headings: CompiledPage['headings'] = [];
	const taken = new Set<string>();

	// The heading ids are written into the HTML here rather than in the browser, so a link to `/…/#install` is the same
	// string the reader copies.
	const rendered = md.render(parsed.content, {
		slugger: {
			slug: (value: string) => headingId(value, taken)
		}
	} as never);

	const withAnchors = rendered.replace(/<h([23])>([\s\S]*?)<\/h\1>/gu, (_whole: string, level: string, inner: string) => {
		const text = headingText(inner);
		const id = headingId(text, taken);
		headings.push({ id, text, level: Number(level) });
		return `<h${level} id="${id}">${inner}<a class="anchor" href="#${id}" data-anchor="${id}" aria-label="Copy a link to ${md.utils.escapeHtml(text)}">#</a></h${level}>`;
	});

	return {
		title,
		...(typeof data.description === 'string' ? { description: data.description } : {}),
		// A picture is written beside the pages it belongs to and served from `media/<project>/<version>/`: a page is
		// addressed by its route, so a relative `media/shot.png` would otherwise be looked for under that route.
		html: withAnchors.replace(
			/(<img\b[^>]*?\bsrc=")(?!https?:|\/|data:)([^"]+)(")/giu,
			(_whole: string, before: string, src: string, after: string) =>
				`${before}${assetBase()}media/${encodeURIComponent(project)}/${encodeURIComponent(version)}/${src.replace(/^(?:\.\.?\/)+/u, '').replace(/^media\//u, '')}${after}`
		),
		headings
	};
}

/** The Markdown pages of one version, in reading order, with their compiled bodies written beside the catalog. */
async function markdownVersion(
	project: string,
	version: string
): Promise<{ pages: PageEntry[]; bodies: Record<string, CompiledPage>; raw: Record<string, string>; builtAt?: string }> {
	const folder = join(content, project, version);
	// A page's address is its path under the version, so a chapter is a folder here as it is everywhere else.
	const files = (await markdownFiles(folder)).sort();
	const ordered: { page: PageEntry; order: number }[] = [];
	const bodies: Record<string, CompiledPage> = {};
	const raw: Record<string, string> = {};
	let newest = 0;
	for (const file of files) {
		const slug = file === '00-index.md' ? 'index' : file.replace(/\.md$/u, '').split('/').map((part) => slugOf(part, 'page')).join('/');
		const source = await readFile(join(folder, file), 'utf8');
		const compiled = compile(source, slug, project, version);
		const front = matter(source).data as { order?: unknown; edit?: unknown };
		const order = Number(front.order ?? 9999);
		const changed = (await stat(join(folder, file))).mtime;
		const where = `content/${project}/${version}/${file}`;
		// `edit: false` hides the pencil; `edit: <url>` sends it somewhere other than this repository.
		const edit = front.edit === false ? undefined : typeof front.edit === 'string' ? front.edit : undefined;
		const hidden = front.edit === false;
		ordered.push({
			page: {
				href: slug,
				title: compiled.title,
				kind: 'md',
				...(compiled.description === undefined ? {} : { description: compiled.description }),
				...(!hidden && edit === undefined ? { source: where } : {}),
				...(edit === undefined ? {} : { edit }),
				updated: changed.toISOString(),
				minutes: readingMinutes(compiled.html)
			},
			order: Number.isFinite(order) ? order : 9999
		});
		bodies[slug] = compiled;
		raw[slug] = source;
		newest = Math.max(newest, changed.getTime());
	}
	// The pictures a version carries are copied where the site can serve them, once per build. They are authored next to
	// the pages (`content/<project>/<version>/media/`), so an image is added in the same pull request as the page using it.
	const media = join(folder, 'media');
	if (existsSync(media)) {
		const published = join(publicDir, 'media', project, version);
		await mkdir(published, { recursive: true });
		await cp(media, published, { recursive: true });
	}

	// The index leads; the rest keep the order their front matter asks for, which is the order a reader gets.
	ordered.sort(
		(one, other) =>
			(one.page.href === 'index' ? -1 : other.page.href === 'index' ? 1 : 0) || one.order - other.order || one.page.title.localeCompare(other.page.title)
	);
	return {
		pages: ordered.map((entry) => entry.page),
		bodies,
		raw,
		...(newest === 0 ? {} : { builtAt: new Date(newest).toISOString() })
	};
}
/** Markdown, and a ZIP of it with the images beside it: what "download this guide" actually hands over. */
async function writeDownloads(project: string, version: string, pages: PageEntry[], raw: Record<string, string>): Promise<void> {
	const folder = join(downloadDir, project);
	await mkdir(join(folder, version), { recursive: true });
	const encoder = new TextEncoder();
	const entries: { name: string; data: Uint8Array }[] = [];

	for (const page of pages) {
		const text = raw[page.href];
		if (text === undefined) {
			continue;
		}
		// A page's address is its path, so a chapter's pages land in a folder of the same name in the download too.
		const name = `${page.href}.md`;
		const where = join(folder, version, name);
		await mkdir(dirname(where), { recursive: true });
		await writeFile(where, text, 'utf8');
		entries.push({ name, data: encoder.encode(text) });
	}

	const guide = pages
		.map((page) => raw[page.href])
		.filter((text): text is string => text !== undefined)
		.join('\n\n---\n\n');
	await writeFile(join(folder, `${version}.md`), guide, 'utf8');
	entries.push({ name: `${version}.md`, data: encoder.encode(guide) });

	// The pages point at `media/<file>`, so the ZIP carries the images at that same relative path: a download that opened
	// to a folder of broken pictures would be a download nobody can read.
	for (const name of await listFiles(join(publicDir, 'media', project, version))) {
		entries.push({ name: `media/${name}`, data: await readFile(join(publicDir, 'media', project, version, name)) });
	}

	await writeFile(join(folder, `${version}.zip`), zip(entries));
}

/** Every file under a folder, as paths relative to it, or nothing when the folder is not there. */
async function listFiles(folder: string, under = ''): Promise<string[]> {
	let entries;
	try {
		entries = await readdir(join(folder, under), { withFileTypes: true });
	} catch {
		return [];
	}
	const found: string[] = [];
	for (const entry of entries) {
		const next = under === '' ? entry.name : `${under}/${entry.name}`;
		if (entry.isDirectory()) {
			found.push(...(await listFiles(folder, next)));
		} else if (entry.isFile()) {
			found.push(next);
		}
	}
	return found;
}


/**
 * The pages a build wrote, titled from their own `<title>`, in the order the build published.
 *
 * A folder walk only knows the alphabet, and "6.1 Graphic Screens" comes before "6.2 Programs" while "6.10 ALARM LOG"
 * comes after both — so a build may write `nav.json` with its reading order, and that order wins. Pages it does not list
 * (an older build, or a file added by hand) follow, alphabetically, and `index.html` still opens the guide.
 */
async function importedVersion(project: string, version: string): Promise<{ pages: PageEntry[]; builtAt?: string }> {
	const folder = join(imported, project, version);
	if (!existsSync(folder)) {
		return { pages: [] };
	}
	const found: { href: string; title: string }[] = [];
	let newest = 0;
	async function walk(directory: string): Promise<void> {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			const path = join(directory, entry.name);
			if (entry.isDirectory()) {
				await walk(path);
				continue;
			}
			if (!entry.name.endsWith('.html')) {
				continue;
			}
			newest = Math.max(newest, (await stat(path)).mtimeMs);
			const html = await readFile(path, 'utf8');
			const held = /<title>([\s\S]*?)<\/title>/iu.exec(html)?.[1];
			const title = (held ?? entry.name).replace(/&amp;/gu, '&').replace(/&lt;/gu, '<').replace(/&gt;/gu, '>').trim();
			found.push({ href: relative(folder, path).split(sep).join('/'), title });
		}
	}
	await walk(folder);

	const ordered = await readNav(folder);
	const place = new Map(ordered.map((href, index) => [href, index]));
	const fallback = (one: { href: string }): number => (one.href === 'index.html' ? -1 : ordered.length + 1);
	found.sort((one, other) => {
		const at = place.get(one.href);
		const at2 = place.get(other.href);
		if (at !== undefined || at2 !== undefined) {
			return (at ?? fallback(one)) - (at2 ?? fallback(other)) || one.href.localeCompare(other.href);
		}
		return fallback(one) - fallback(other) || one.href.localeCompare(other.href);
	});
	return { pages: found.map((entry) => ({ href: entry.href, title: entry.title, kind: 'build' as const })), ...(newest === 0 ? {} : { builtAt: new Date(newest).toISOString() }) };
}

/** The reading order a build publishes, if it published one. */
async function readNav(folder: string): Promise<string[]> {
	try {
		const file = JSON.parse(await readFile(join(folder, 'nav.json'), 'utf8')) as { pages?: { href?: string }[] };
		return (file.pages ?? []).map((page) => page.href).filter((href): href is string => typeof href === 'string');
	} catch {
		return [];
	}
}

const sections = JSON.parse(await readFile(join(content, 'sections.json'), 'utf8')) as Section[];

/** Site-wide answers — where the pencil points, and where the site is published. Absent means "no edit links". */
const configPath = join(content, 'config.json');
const config: SiteConfig = existsSync(configPath) ? (JSON.parse(await readFile(configPath, 'utf8')) as SiteConfig) : {};

const projects: Project[] = [];

for (const project of await folders(content)) {
	const sitePath = join(content, project, 'site.json');
	if (!existsSync(sitePath)) {
		continue;
	}
	const site = JSON.parse(await readFile(sitePath, 'utf8')) as SiteFile;
	const versions: Version[] = [];
	const written: string[] = [];

	for (const version of await folders(join(content, project))) {
		const markdown = await markdownVersion(project, version);
		const build = await importedVersion(project, version);
		const builtAt = [markdown.builtAt, build.builtAt].filter((value): value is string => value !== undefined).sort().at(-1);
		versions.push({ version, ...(builtAt === undefined ? {} : { builtAt }), pages: [...markdown.pages, ...build.pages] });
		if (Object.keys(markdown.bodies).length > 0) {
			const target = join(outDir, project);
			await mkdir(target, { recursive: true });
			await writeFile(join(target, `${version}.json`), `${JSON.stringify({ pages: markdown.bodies }, null, '\t')}\n`, 'utf8');
			await writeDownloads(project, version, markdown.pages, markdown.raw);
			written.push(`${project}/${version}.json`);
		}
	}

	// A version that only carries an imported build still exists, even with no `content/<project>/<version>/` folder.
	for (const version of await folders(join(imported, project))) {
		if (versions.some((entry) => entry.version === version)) {
			continue;
		}
		const importedPages = await importedVersion(project, version);
		if (importedPages.pages.length > 0) {
			versions.push({ version, ...(importedPages.builtAt === undefined ? {} : { builtAt: importedPages.builtAt }), pages: importedPages.pages });
		}
	}

	versions.sort((one, other) => compareVersions(one.version, other.version));
	if (versions.length === 0) {
		continue;
	}
	projects.push({
		id: project,
		title: site.title,
		section: site.section ?? sections[0]?.id ?? 'documentation',
		summary: site.summary ?? '',
		latest: versions[0]?.version ?? '',
		versions,
		...(site.repository ?? config.repository) === undefined ? {} : { repository: site.repository ?? config.repository },
		...(site.editBranch ?? config.editBranch) === undefined ? {} : { editBranch: site.editBranch ?? config.editBranch }
	});
	void written;
}

projects.sort((one, other) => one.title.localeCompare(other.title));
await mkdir(outDir, { recursive: true });
const catalog: Catalog = {
	generated: new Date().toISOString(),
	sections,
	projects,
	...(config.repository === undefined ? {} : { repository: config.repository }),
	...(config.editBranch === undefined ? {} : { editBranch: config.editBranch }),
	...(config.siteUrl === undefined ? {} : { siteUrl: config.siteUrl }),
	...(config.hints === undefined || config.hints.length === 0 ? {} : { hints: config.hints })
};
await writeFile(join(publicDir, 'catalog.json'), `${JSON.stringify(catalog, null, '\t')}\n`, 'utf8');

const pages = projects.reduce((total, project) => total + project.versions.reduce((count, version) => count + version.pages.length, 0), 0);
console.log(`catalog.json: ${projects.length} projects, ${pages} pages`);
