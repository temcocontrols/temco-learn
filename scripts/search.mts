// The search index: one small record per page, built from the catalog and the compiled bodies.
//
// The site has no server, so the index is a file the browser downloads once and matches in memory. It is deliberately
// small — a title, the headings, and the first 200 characters — because a docs index that carries whole articles is
// slower to fetch than the page the reader was going to open anyway.

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
	x: string;
}

/** `text`, with the tags gone and the entities the compiler emits put back. */
function plainText(html: string): string {
	return html
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
				? (JSON.parse(await readFile(bodyPath, 'utf8')) as { pages: globalThis.Record<string, { html: string; headings: { text: string }[] }> }).pages
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
				x: page.description ?? (body === undefined ? '' : plainText(body.html).slice(0, 200))
			});
		}
	}
}

await writeFile(join(publicDir, 'search.json'), `${JSON.stringify({ generated: new Date().toISOString(), pages: records })}\n`, 'utf8');
console.log(`search.json: ${records.length} pages`);
