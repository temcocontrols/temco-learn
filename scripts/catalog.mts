// The catalog: the one file the app reads to know what exists.
//
// Two kinds of page end up in it, and the app does not care which is which until it renders one: a **Markdown** page this
// repo authors (`content/<project>/<version>/*.md`), and an **imported** page a project's own build wrote
// (`public/imported/<project>/<version>/*.html`). Both become rows of one version, in one reading order.
//
// Everything here is derived: delete `catalog.json` and the content tree, run this, and the same file comes back. That is
// deliberate — a generated file nobody can reproduce by hand is a file that drifts.

import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const here = fileURLToPath(new URL('..', import.meta.url));
const content = join(here, 'content');
const publicDir = join(here, 'public');
const imported = join(publicDir, 'imported');
const outDir = join(publicDir, 'content');

interface Section {
	id: string;
	title: string;
	description: string;
}

interface SiteFile {
	title: string;
	section?: string;
	summary?: string;
}

interface PageEntry {
	href: string;
	title: string;
	kind: 'md' | 'build';
	description?: string;
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
}

interface Catalog {
	generated: string;
	sections: Section[];
	projects: Project[];
}

interface CompiledPage {
	title: string;
	description?: string;
	html: string;
	headings: { id: string; text: string; level: number }[];
}

const md = new MarkdownIt({ html: true, linkify: true, typographer: false });

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

/** Compile one Markdown page: HTML for the reader, headings for "In this article", title for the catalog. */
function compile(source: string, slug: string): CompiledPage {
	const parsed = matter(source);
	const data = parsed.data as { title?: unknown; description?: unknown };
	const title = typeof data.title === 'string' && data.title.trim() !== '' ? data.title.trim() : slug;
	const headings: CompiledPage['headings'] = [];
	const taken = new Set<string>();

	// The heading ids are written into the HTML here rather than in the browser, so a link to `#/…/#install` is the same
	// string the reader copies.
	const rendered = md.render(parsed.content, {
		slugger: {
			slug: (value: string) => headingId(value, taken)
		}
	} as never);

	const withAnchors = rendered.replace(/<h([23])>([\s\S]*?)<\/h\1>/gu, (_whole: string, level: string, inner: string) => {
		const text = inner.replace(/<[^>]+>/gu, '').trim();
		const id = headingId(text, taken);
		headings.push({ id, text, level: Number(level) });
		return `<h${level} id="${id}">${inner}</h${level}>`;
	});

	return {
		title,
		...(typeof data.description === 'string' ? { description: data.description } : {}),
		html: withAnchors,
		headings
	};
}

/** The Markdown pages of one version, in reading order, with their compiled bodies written beside the catalog. */
async function markdownVersion(project: string, version: string): Promise<{ pages: PageEntry[]; bodies: Record<string, CompiledPage>; builtAt?: string }> {
	const folder = join(content, project, version);
	const files = (await readdir(folder)).filter((name) => name.endsWith('.md')).sort();
	const ordered: { page: PageEntry; order: number }[] = [];
	const bodies: Record<string, CompiledPage> = {};
	let newest = 0;
	for (const file of files) {
		const slug = file === '00-index.md' ? 'index' : slugOf(file.replace(/\.md$/u, ''), 'page');
		const source = await readFile(join(folder, file), 'utf8');
		const compiled = compile(source, slug);
		const order = Number(matter(source).data.order ?? 9999);
		ordered.push({
			page: { href: slug, title: compiled.title, kind: 'md', ...(compiled.description === undefined ? {} : { description: compiled.description }) },
			order: Number.isFinite(order) ? order : 9999
		});
		bodies[slug] = compiled;
		newest = Math.max(newest, (await stat(join(folder, file))).mtimeMs);
	}
	// The index leads; the rest keep the order their front matter asks for, which is the order a reader gets.
	ordered.sort(
		(one, other) =>
			(one.page.href === 'index' ? -1 : other.page.href === 'index' ? 1 : 0) || one.order - other.order || one.page.title.localeCompare(other.page.title)
	);
	return {
		pages: ordered.map((entry) => entry.page),
		bodies,
		...(newest === 0 ? {} : { builtAt: new Date(newest).toISOString() })
	};
}

/** The pages a build wrote, titled from their own `<title>`, with `index.html` first. */
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
	found.sort((one, other) => (one.href === 'index.html' ? -1 : other.href === 'index.html' ? 1 : one.href.localeCompare(other.href)));
	return { pages: found.map((entry) => ({ href: entry.href, title: entry.title, kind: 'build' as const })), ...(newest === 0 ? {} : { builtAt: new Date(newest).toISOString() }) };
}

const sections = JSON.parse(await readFile(join(content, 'sections.json'), 'utf8')) as Section[];
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
		versions
	});
	void written;
}

projects.sort((one, other) => one.title.localeCompare(other.title));
await mkdir(outDir, { recursive: true });
const catalog: Catalog = { generated: new Date().toISOString(), sections, projects };
await writeFile(join(publicDir, 'catalog.json'), `${JSON.stringify(catalog, null, '\t')}\n`, 'utf8');

const pages = projects.reduce((total, project) => total + project.versions.reduce((count, version) => count + version.pages.length, 0), 0);
console.log(`catalog.json: ${projects.length} projects, ${pages} pages`);
