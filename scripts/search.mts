// The search index: one small record per page, built from the catalog and the compiled bodies.
//
// The site has no server, so the index is a file the browser downloads once and matches in memory. It is deliberately
// small — a title, the headings, and the first 400 characters — because a docs index that carries whole articles is
// slower to fetch than the page the reader was going to open anyway. Heading **ids** are kept beside the heading text so a
// result can land on a section rather than at the top of a page.


import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('..', import.meta.url));
const publicDir = join(here, 'public');

interface PageEntry {
	href: string;
	title: string;
	kind: 'md' | 'build';
	description?: string;
}

interface Version {
	version: string;
	pages: PageEntry[];
}

interface Project {
	id: string;
	title: string;
	section: string;
	latest: string;
	versions: Version[];
}

interface Catalog {
	projects: Project[];
}

/** One page in the index. The names are short because the file is downloaded by every reader. */
interface Entry {
	t: string;
	p: string;
	pn: string;
	v: string;
	s: string;
	u: string;
	h: string[];
	ha: string[];
	x: string;
}

/** `text`, with the tags gone and the entities the compiler emits put back. */
function plainText(html: string): string {
	return html
		// The `#` a heading carries is an affordance, not a word: it would match every search for it.
		.replace(/<a class="anchor"[\s\S]*?<\/a>/gu, ' ')
		.replace(/<[^>]+>/gu, ' ')
		.replace(/&amp;/gu, '&')
		.replace(/&lt;/gu, '<')
		.replace(/&gt;/gu, '>')
		.replace(/&quot;/gu, '"')
		.replace(/&#39;/gu, "'")
		.replace(/&nbsp;/gu, ' ')
		.replace(/\s+/gu, ' ')
		.trim();
}

const catalog = JSON.parse(await readFile(join(publicDir, 'catalog.json'), 'utf8')) as Catalog;
const records: Entry[] = [];

for (const project of catalog.projects) {
	for (const version of project.versions) {
		const bodyPath = join(publicDir, 'content', project.id, `${version.version}.json`);
		const bodies =
			existsSync(bodyPath)
				? (JSON.parse(await readFile(bodyPath, 'utf8')) as { pages: globalThis.Record<string, { html: string; headings: { id: string; text: string }[] }> }).pages
				: {};

		for (const page of version.pages) {
			const body = bodies[page.href];
			const url = `#/${project.id}/${encodeURIComponent(version.version)}/${page.href}`;
			records.push({
				t: page.title,
				p: project.id,
				pn: project.title,
				v: version.version,
				s: project.section,
				u: url,
				h: (body?.headings ?? []).map((heading) => heading.text),
				ha: (body?.headings ?? []).map((heading) => heading.id),
				x: body === undefined ? (page.description ?? '') : plainText(body.html).slice(0, 400)
			});
		}
	}
}

await writeFile(join(publicDir, 'search.json'), `${JSON.stringify({ generated: new Date().toISOString(), pages: records })}\n`, 'utf8');
console.log(`search.json: ${records.length} pages`);
