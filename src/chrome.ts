// What the second bar knows: where the reader is, and what this page can offer them.
//
// The bar is rendered by the shell, but only the route knows what it should say. Rather than have every screen push its own
// breadcrumb into context, one function reads the address and the catalog and answers for all of them — so the bar can
// never disagree with the page underneath it.

import type { Catalog, PageEntry, Project, Section, Version } from './model';
import { chmUrl, downloadUrl, editUrl, historyUrl, issueUrl, pdfUrl, plural } from './data';

export interface Crumb {
	label: string;
	to?: string;
	/** Versions are set in the monospace face, so `1.10` cannot be misread as `1.1`. */
	mono?: boolean;
}

export interface VersionSwitch {
	project: Project;
	current: Version;
	/** The page the reader is on, so the switcher can keep them on it. */
	page?: PageEntry;
}

export interface PageInfo {
	crumbs: Crumb[];
	version?: VersionSwitch;
	download?: {
		project: Project;
		version: Version;
		page?: PageEntry;
	};
	edit?: {
		url: string;
		history?: string;
		issue?: string;
	};
}

const decode = (value: string): string => {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
};

/** The address a version's first page lives at, for a switcher that has no better place to go. */
export function versionHome(project: Project, version: Version): string {
	const first = version.pages[0];
	return first === undefined ? `/${project.id}/${encodeURIComponent(version.version)}/` : `/${project.id}/${encodeURIComponent(version.version)}/${first.href}`;
}

/** The same page in another version, by title — the one name a page keeps across versions. */
export function switchVersion(project: Project, from: PageEntry | undefined, to: Version): string {
	const match = from === undefined ? undefined : to.pages.find((page) => page.title === from.title);
	if (match !== undefined) {
		return `/${project.id}/${encodeURIComponent(to.version)}/${match.href}`;
	}
	return versionHome(project, to);
}

/** The hash address the page is being read at, which is what a permalink and an issue both need. */
export function addressOf(project: string, version: string, page?: PageEntry): string {
	const base = `#/${project}/${encodeURIComponent(version)}${page === undefined ? '/' : `/${page.href}`}`;
	return base;
}

export function describePage(pathname: string, catalog: Catalog): PageInfo {
	const parts = pathname.split('/').filter((part) => part !== '');
	const home: Crumb = { label: 'Temco Learn', to: '/' };
	const first = parts[0];

	if (first === undefined) {
		return { crumbs: [{ label: 'Home' }] };
	}

	if (first === 'search') {
		return { crumbs: [home, { label: 'Search' }] };
	}

	if (first === 'print') {
		const project = catalog.projects.find((entry) => entry.id === parts[1]);
		const version = project?.versions.find((entry) => entry.version === decode(parts[2] ?? ''));
		return {
			crumbs: [
				home,
				...(project === undefined ? [] : [{ label: project.title, to: `/${project.id}/` } as Crumb]),
				...(version === undefined ? [] : [{ label: version.version, mono: true } as Crumb])
			]
		};
	}

	const section: Section | undefined = catalog.sections.find((entry) => entry.id === first);
	if (section !== undefined) {
		return { crumbs: [home, { label: section.title }] };
	}

	const project = catalog.projects.find((entry) => entry.id === first);
	if (project === undefined) {
		return { crumbs: [home, { label: decode(first) }] };
	}

	const owner = catalog.sections.find((entry) => entry.id === project.section);
	const projectCrumb: Crumb = { label: project.title, to: `/${project.id}/` };
	const stem: Crumb[] = [home, ...(owner === undefined ? [] : [{ label: owner.title, to: `/${owner.id}` } as Crumb]), projectCrumb];

	const asked = decode(parts[1] ?? '');
	const version = project.versions.find((entry) => entry.version === asked);
	if (version === undefined) {
		// `/t3000/` with no version: the project as a whole, and the project is where the reader already is.
		return { crumbs: [...stem.slice(0, -1), { label: project.title }] };
	}

	const versionCrumb: Crumb = { label: version.version, to: `/${project.id}/${encodeURIComponent(version.version)}/`, mono: true };
	const slug = parts[2];
	const page = slug === undefined ? undefined : version.pages.find((entry) => entry.href === decode(slug));

	const info: PageInfo = {
		crumbs: [...stem, ...(page === undefined ? [versionCrumb] : [versionCrumb, { label: page.title }])],
		version: { project, current: version, ...(page === undefined ? {} : { page }) },
		download: { project, version, ...(page === undefined ? {} : { page }) }
	};

	if (page !== undefined) {
		const url = editUrl(catalog, project, page);
		if (url !== undefined) {
			info.edit = {
				url,
				...(historyUrl(catalog, project, page) === undefined ? {} : { history: historyUrl(catalog, project, page) }),
				...(issueUrl(catalog, project, version.version, page, addressOf(project.id, version.version, page)) === undefined
					? {}
					: { issue: issueUrl(catalog, project, version.version, page, addressOf(project.id, version.version, page)) })
			};
		}
	}

	return info;
}

/** Every file the download menu offers for the page currently open, in the order a reader is most likely to want them. */
export interface DownloadFile {
	label: string;
	href: string;
	detail: string;
	/** Which mark the menu puts beside it. */
	kind: 'pdf' | 'chm' | 'md' | 'html' | 'zip';
	/** Printed things first, then the sources they were made from — the menu draws a rule between them. */
	group: 'print' | 'source';
}

export function downloads(info: PageInfo, chm = false): DownloadFile[] {
	const target = info.download;
	if (target === undefined) {
		return [];
	}
	const { project, version, page } = target;
	const files: DownloadFile[] = [
		{
			label: 'PDF — the whole guide',
			href: pdfUrl(project.id, version.version),
			detail: `${plural(version.pages.length, 'page')}, print-ready`,
			kind: 'pdf',
			group: 'print'
		}
	];
	if (page !== undefined && page.kind === 'md') {
		files.push({ label: 'PDF — this page', href: pdfUrl(project.id, version.version, page), detail: 'one page', kind: 'pdf', group: 'print' });
	}
	if (chm) {
		files.push({
			label: 'Windows help',
			href: chmUrl(project.id, version.version),
			detail: 'a .chm you can press F1 in',
			kind: 'chm',
			group: 'print'
		});
	}
	files.push(
		{
			label: 'Markdown',
			href: downloadUrl(project.id, version.version, 'md'),
			detail: 'every page, one file',
			kind: 'md',
			group: 'source'
		},
		{
			label: 'HTML',
			href: downloadUrl(project.id, version.version, 'html'),
			detail: 'one file, no JavaScript',
			kind: 'html',
			group: 'source'
		},
		{
			label: 'ZIP',
			href: downloadUrl(project.id, version.version, 'zip'),
			detail: 'Markdown and HTML together',
			kind: 'zip',
			group: 'source'
		}
	);
	return files;
}
