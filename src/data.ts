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
	/** The heading that matched, when one did, so the result can land on a section. */
	anchor?: string;
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
		let matched = -1;
		for (const word of words) {
			if (title.includes(word)) {
				score += title.startsWith(word) ? 60 : 40;
				where = 'title';
			} else if (headings.includes(word)) {
				score += 20;
				where = where === 'title' ? where : 'heading';
				if (matched === -1) {
					matched = page.h.findIndex((heading) => heading.toLowerCase().includes(word));
				}
			} else {
				score += 5;
			}
		}
		const anchor = matched >= 0 ? page.ha[matched] : undefined;
		scored.push({ result: { ...page, where, ...(anchor === undefined ? {} : { anchor }) }, score });
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
export function since(iso: string | undefined): string {	const then = Date.parse(String(iso));
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

/** `Oct 30, 2026` — the date a page was last written, for a meta row. */
export function formatDate(iso: string | undefined): string {
	const at = Date.parse(String(iso));
	if (iso === undefined || Number.isNaN(at)) {
		return '';
	}
	return new Date(at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ---- where a page can send you --------------------------------------------------------------------

export interface Repo {
	repository: string;
	branch: string;
}

/** The repository a project's pages live in, if any: the project's own, or the site's. */
export function repoFor(catalog: Catalog, project?: Project): Repo | undefined {
	const repository = project?.repository ?? catalog.repository;
	if (repository === undefined) {
		return undefined;
	}
	return { repository: repository.replace(/\/+$/u, ''), branch: project?.editBranch ?? catalog.editBranch ?? 'main' };
}

/**
 * The GitHub editor for a page, or nothing when the page has no source.
 *
 * A page written by a project's own build has no Markdown to edit, so the pencil is hidden rather than pointed at a guess;
 * front matter can put it back with `edit: <url>`.
 */
export function editUrl(catalog: Catalog, project: Project, page: PageEntry): string | undefined {
	if (page.edit !== undefined) {
		return page.edit;
	}
	if (page.source === undefined) {
		return undefined;
	}
	const repo = repoFor(catalog, project);
	return repo === undefined ? undefined : `${repo.repository}/edit/${repo.branch}/${page.source}`;
}

export function historyUrl(catalog: Catalog, project: Project, page: PageEntry): string | undefined {
	if (page.source === undefined) {
		return undefined;
	}
	const repo = repoFor(catalog, project);
	return repo === undefined ? undefined : `${repo.repository}/commits/${repo.branch}/${page.source}`;
}

/** A pre-filled issue, with the page's address in the body so the reader can paste nothing. */
export function issueUrl(catalog: Catalog, project: Project, version: string, page: PageEntry, address: string): string | undefined {
	const repo = repoFor(catalog, project);
	if (repo === undefined) {
		return undefined;
	}
	const title = `[docs] ${project.title} ${version} — ${page.title}`;
	const body = `Page: ${permalink(catalog, address)}\n\nWhat is wrong, or what is missing:\n\n`;
	return `${repo.repository}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

/** A hash address as a full URL, against the published site rather than whatever origin is open. */
export function permalink(catalog: Catalog, hash: string): string {
	const base = (catalog.siteUrl ?? `${location.origin}${location.pathname}`).replace(/#.*$/u, '');
	const rooted = base.endsWith('/') ? base : `${base}/`;
	return `${rooted}${hash.startsWith('#') ? hash : `#${hash}`}`;
}

/** `./download/t3000/1.0/ports.md` and friends: the files `scripts/catalog.mts` writes beside the catalog. */
export function downloadUrl(project: string, version: string, kind: 'md' | 'html' | 'zip', page?: PageEntry): string {
	const base = `./download/${encodeURIComponent(project)}`;
	const folder = `${base}/${encodeURIComponent(version)}`;
	if (kind === 'md' && page !== undefined) {
		return `${folder}/${encodeURIComponent(page.href)}.md`;
	}
	return `${base}/${encodeURIComponent(version)}.${kind}`;
}

/** `./pdf/t3000/1.0.pdf` for a guide, `./pdf/t3000/1.0/ports.pdf` for one page. Written by `scripts/pdf.mts`. */
export function pdfUrl(project: string, version: string, page?: PageEntry): string {
	const base = `./pdf/${encodeURIComponent(project)}/${encodeURIComponent(version)}`;
	return page === undefined ? `${base}.pdf` : `${base}/${encodeURIComponent(page.href)}.pdf`;
}

/** `./chm/t3000/1.0.chm` — compiled HTML Help, written by `scripts/chm.mts` on a machine with the workshop. */
export function chmUrl(project: string, version: string): string {
	return `./chm/${encodeURIComponent(project)}/${encodeURIComponent(version)}.chm`;
}

/** What the build actually produced, per project and version. Written by `scripts/chm.mts`. */
export interface Artifacts {
	generated: string;
	projects: Record<string, Record<string, { chm?: boolean }>>;
}

let artifactIndex: Promise<Artifacts> | undefined;

/** Fetched once per session, like the search index: it is a few hundred bytes and never changes mid-visit. */
export function loadArtifacts(): Promise<Artifacts> {
	artifactIndex ??= fetch('./download/manifest.json', { cache: 'no-store' })
		.then((response) => (response.ok ? (response.json() as Promise<Artifacts>) : { generated: '', projects: {} }))
		.catch(() => ({ generated: '', projects: {} }));
	return artifactIndex;
}

/** True only when a `.chm` really exists, so the menu never offers a file the site does not have. */
export function hasChm(artifacts: Artifacts | undefined, project: string, version: string): boolean {
	return artifacts?.projects[project]?.[version]?.chm === true;
}
