// The content rules, checked before the build rather than by a reader.
//
// A docs repo fails quietly: a page with no title becomes a blank row, two pages with one title become one link, a heading
// that starts at `#` competes with the page's own title. These are cheap to check and expensive to discover.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const here = fileURLToPath(new URL('..', import.meta.url));
const content = join(here, 'content');

const problems: string[] = [];

async function folders(path: string): Promise<string[]> {
	if (!existsSync(path)) {
		return [];
	}
	return (await readdir(path, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

const sections = JSON.parse(await readFile(join(content, 'sections.json'), 'utf8')) as { id: string }[];
const sectionIds = new Set(sections.map((section) => section.id));

for (const project of await folders(content)) {
	const sitePath = join(content, project, 'site.json');
	if (!existsSync(sitePath)) {
		problems.push(`content/${project}/site.json is missing (a project folder needs a title and a section)`);
		continue;
	}
	const site = JSON.parse(await readFile(sitePath, 'utf8')) as { title?: string; section?: string };
	if (typeof site.title !== 'string' || site.title.trim() === '') {
		problems.push(`content/${project}/site.json has no title`);
	}
	if (site.section !== undefined && !sectionIds.has(site.section)) {
		problems.push(`content/${project}/site.json names the section “${site.section}”, which does not exist`);
	}

	for (const version of await folders(join(content, project))) {
		const folder = join(content, project, version);
		const files = (await readdir(folder)).filter((name) => name.endsWith('.md')).sort();
		if (files.length === 0) {
			continue;
		}
		const titles = new Map<string, string>();
		for (const file of files) {
			const where = `content/${project}/${version}/${file}`;
			const parsed = matter(await readFile(join(folder, file), 'utf8'));
			const data = parsed.data as { title?: unknown; order?: unknown };
			if (typeof data.title !== 'string' || data.title.trim() === '') {
				problems.push(`${where} has no title`);
			} else if (titles.has(data.title)) {
				problems.push(`${where} has the same title as ${titles.get(data.title)}`);
			} else {
				titles.set(data.title, where);
			}
			if (data.order !== undefined && typeof data.order !== 'number') {
				problems.push(`${where} has an order that is not a number`);
			}
			if (/^#\s/mu.test(parsed.content)) {
				problems.push(`${where} starts a heading at “#”: the page title is the heading, so prose begins at “##”`);
			}
		}
		if (!files.includes('00-index.md')) {
			problems.push(`content/${project}/${version} has no 00-index.md, so the version has no landing page`);
		}
	}
}

if (problems.length > 0) {
	console.error(`The content does not pass its own rules:\n\n${problems.map((problem) => `  ${problem}`).join('\n')}\n`);
	process.exit(1);
}
console.log(`content: ${(await folders(content)).length} project folders, every rule satisfied`);
