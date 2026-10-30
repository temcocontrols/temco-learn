// Reading the three generated files, and the small formatting the screens share.
//
// Every fetch is relative (`./…`), which is what lets one build run at `/`, at `/temco-learn/` and at `localhost:1011`
// without asking the server for a hint. A missing file is an empty site rather than a broken one: a clone that has not run
// `npm run catalog` yet opens on an honest "nothing here" instead of an exception.

import type { BodyFile, Catalog, SearchIndex, SearchRecord, Project, Version, PageEntry } from './model';

export async function loadCatalog(): Promise<Catalog> {
	try {
		const response = await fetch('./catalog.json', { cache: 'no-store' });
		if (!response.ok) {
			return { generated: '', sections: [], projects: [] };
		}
		return (await response.json()) as Catalog;
	} catch {
		return { generated: '', sections: [], projects: [] };
	}
}

export async function loadBodies(project: string, version: string): Promise<BodyFile> {
	try {
		const response = await fetch(`./content/${encodeURIComponent(project)}/${encodeURIComponent(version)}.json`, {
			cache: 'no-store'
		});
		if (!response.ok) {
			return { pages: {} };
		}
		return (await response.json()) as BodyFile;
	} catch {
		return { pages: {} };
	}
}

let searched: Promise<SearchIndex> | undefined;

/** The index is fetched once per session: it is small, and it does not change while a page is open. */
export function loadSearch(): Promise<SearchIndex> {
	searched ??= fetch('./search.json', { cache: 'no-store' })
		.then((response) => (response.ok ? (response.json() as Promise<SearchIndex>) : { generated: '', pages: [] }))
		.catch(() => ({ generated: '', pages: [] }));
	return searched;
}

export interface Result extends SearchRecord {
	/** Why this page matched: its title, one of its headings, or its text. */
	where: 'title' | 'heading' | 'text';
}

/**
 * Searching a file with no server.
 *
 * Title matches beat heading matches, which beat body matches; within a kind, the page whose title starts with the query
 * wins over one that merely contains it. The query is split into words, and every word has to appear somewhere on the page,
 * so `alarm clear` finds the alarm page and not every page that mentions a clear.
 */
export function search(index: SearchIndex, query: string): Result[] {
	const words = query
		.toLowerCase()
		.split(/\s+/u)
		.filter((word) => word.length > 0);
	if (words.length === 0) {
		return [];
	}
	const scored: { result: Result; score: number }[] = [];
	for (const page of index.pages) {
		const title = page.t.toLowerCase();
		const headings = page.h.join(' ').toLowerCase();
		const text = page.x.toLowerCase();
		const haystack = `${title} ${headings} ${text}`;
		if (!words.every((word) => haystack.includes(word))) {
			continue;
		}
		let score = 0;
		let where: Result['where'] = 'text';
		for (const word of words) {
			if (title.includes(word)) {
				score += title.startsWith(word) ? 60 : 40;
				where = 'title';
			} else if (headings.includes(word)) {
				score += 20;
				where = where === 'title' ? where : 'heading';
			} else {
				score += 5;
			}
		}
		scored.push({ result: { ...page, where }, score });
	}
	return scored
		.sort((one, other) => other.score - one.score || one.result.t.localeCompare(other.result.t))
		.slice(0, 40)
		.map((entry) => entry.result);
}

/** `#/t3000/1.0/ports` — the address a page lives at. */
export function pageUrl(project: string, version: string, page: PageEntry): string {
	return `/${project}/${encodeURIComponent(version)}/${page.href}`;
}

export function versionOf(project: Project, version: string | undefined): Version | undefined {
	return project.versions.find((entry) => entry.version === version) ?? project.versions[0];
}

export const plural = (count: number, one: string): string => `${count} ${count === 1 ? one : `${one}s`}`;

/** `just now`, `2 hours ago`, `yesterday` — the words a reader uses, from an ISO date. */
export function since(iso: string | undefined): string {
	const then = Date.parse(String(iso));
	if (Number.isNaN(then)) {
		return 'at an unknown time';
	}
	const minutes = Math.floor((Date.now() - then) / 60000);
	if (minutes < 1) {
		return 'just now';
	}
	if (minutes < 60) {
		return `${minutes} min ago`;
	}
	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
	}
	const days = Math.floor(hours / 24);
	return days === 1 ? 'yesterday' : `${days} days ago`;
}
