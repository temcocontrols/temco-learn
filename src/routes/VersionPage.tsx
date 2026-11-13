// One version: the landing a reader arrives on before they start reading.
//
// The hero carries the useful actions — start reading, the PDF, the Windows Help file when the build produced one, and the
// way back to every version. Below it, the version's contents: the folders the manual was written in become tabs, and the
// chosen chapter lists its pages in columns, so forty pages read as six chapters rather than as one wall of numbered links.

import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tab, TabList } from '@fluentui/react-components';
import { ArrowDownloadRegular, BookRegular } from '@fluentui/react-icons';
import { useArtifacts } from '../artifacts';
import { useCatalog } from '../catalog';
import { chmUrl, hasChm, pageUrl, pdfUrl, plural, readingTime, since } from '../data';
import { PageHeader } from '../components/PageHeader';
import type { PageEntry } from '../model';
import { NotFound } from './NotFound';

/** A page of the version, with the number it holds in the version as a whole. */
interface Entry {
	page: PageEntry;
	seq: number;
}

/**
 * A run of pages under one heading: a folder's pages, or the loose pages that sit between folders.
 *
 * The chapters are already in the addresses the build wrote — `introduction/specifications` is the page `specifications`
 * in the chapter `introduction` — so the contents are drawn from the addresses themselves, rather than from a second list
 * that has to be kept in step with them.
 */
interface Chapter {
	/** The folder inside the version. Empty for the loose pages at the top, which are listed without a heading. */
	path: string;
	title: string;
	/** The page the chapter's heading leads to: the folder's own page, or the page the chapter opens with. */
	lead: PageEntry;
	items: Entry[];
}

function chapterOf(path: string, pages: [PageEntry, ...PageEntry[]]): Chapter {
	const name = path.split('/').pop() ?? path;
	// A chapter is named by its own page; without one, by the page it opens with.
	const own = path === '' ? undefined : pages.find((page) => isOwnPage(page, name));
	return {
		path,
		title: own?.title ?? pages[0].title,
		lead: own ?? pages[0],
		items: pages.map((page) => ({ page, seq: 0 })),
	};
}

/**
 * Whether a page introduces its folder.
 *
 * The build says so in the name: `introduction/introduction` is the introduction's own page, and a folder written by a
 * tool that gives every folder a `readme` — temco-platform's modules are — says so that way instead.
 */
function isOwnPage(page: PageEntry, name: string): boolean {
	const leaf = (page.href.split('/').pop() ?? '').replace(/\.html$/u, '');
	return leaf === name || leaf === 'index' || leaf === 'readme' || leaf === '00-index';
}

/**
 * The version's contents, chaptered and numbered.
 *
 * A build writes its pages in its own order, and that order interleaves folders — t3000 lists two pages of
 * `menu-items-and-tree`, then three of something else, then three more of `menu-items-and-tree`. Grouping therefore has to
 * come before the numbering: numbered first, a chapter's range would be broken by pages that are listed elsewhere on the
 * page. Pages that sit in no folder are held in one list at the top, where the index page leads.
 */
function contentsOf(pages: PageEntry[]): Chapter[] {
	let loose: [PageEntry, ...PageEntry[]] | undefined;
	const folders = new Map<string, [PageEntry, ...PageEntry[]]>();

	for (const page of pages) {
		const path = page.href.split('/').slice(0, -1).join('/');
		if (path === '') {
			loose = loose === undefined ? [page] : [...loose, page];
			continue;
		}
		const held = folders.get(path);
		folders.set(path, held === undefined ? [page] : [...held, page]);
	}

	// A folder is taken in the order it first appears, so a sub-chapter follows the chapter it belongs to.
	const chapters: Chapter[] = loose === undefined ? [] : [chapterOf('', loose)];
	for (const [path, held] of folders) {
		chapters.push(chapterOf(path, held));
	}

	let seq = 0;
	for (const chapter of chapters) {
		for (const entry of chapter.items) {
			seq += 1;
			entry.seq = seq;
		}
	}

	return chapters;
}

/** A chapter's address on this page: its folder path, flattened, so that `a/b` stays a usable fragment. */
const anchorOf = (chapter: Chapter): string =>
	`contents-${chapter.path === '' ? 'front' : chapter.path.replace(/\//gu, '-')}`;

const minutesOf = (items: Entry[]): number => items.reduce((total, entry) => total + (entry.page.minutes ?? 0), 0);

/** `01`, `09`, `39` — the number a page row is introduced by. */
const numbered = (value: number): string => String(value).padStart(2, '0');

/** `04–09`, or `37` for a chapter of one page: the pages a chapter holds, printed the way a contents page does. */
function rangeOf(items: Entry[]): string {
	const first = items[0]?.seq ?? 0;
	const last = items[items.length - 1]?.seq ?? first;
	return first === last ? numbered(first) : `${numbered(first)}–${numbered(last)}`;
}

/** A chapter's pages, as rows — one row per page, whatever the chapter's size. */
function pagesOf(chapter: Chapter, project: string, version: string): React.ReactNode {
	return (
		<ol className="pages">
			{chapter.items.map((entry) => (
				<li key={entry.page.href}>
					<Link className="pagerow" to={pageUrl(project, version, entry.page)}>
						<span className="pagerow__no">{numbered(entry.seq)}</span>
						<span className="pagerow__title">{entry.page.title}</span>
						<span className="pagerow__time">
							{entry.page.kind === 'build' ? 'from the build' : entry.page.minutes === undefined ? '' : readingTime(entry.page.minutes)}
						</span>
						{entry.page.description ? <span className="pagerow__desc">{entry.page.description}</span> : undefined}
					</Link>
				</li>
			))}
		</ol>
	);
}

/**
 * The version's contents, as a strip of chapters.
 *
 * A manual is walked one chapter at a time, and the tab strip keeps every chapter in reach without printing forty rows to
 * arrive at the last one. The pages that sit in no folder are the version's own front pages and lead the strip, named by
 * the page they open with; a version with no folders at all is one plain list, because a strip of one tab says nothing.
 */
function Contents({ chapters, project, version }: { chapters: Chapter[]; project: string; version: string }) {
	const [chosen, setChosen] = React.useState<string | undefined>(undefined);
	const loose = chapters.find((chapter) => chapter.path === '');
	const titled = chapters.filter((chapter) => chapter.path !== '');
	const front =
		loose === undefined
			? undefined
			: { path: '', title: loose.items[0]?.page.title ?? '', lead: loose.lead, items: loose.items };
	const views = front === undefined ? titled : [front, ...titled];
	// The reader's own choice while it is still a chapter of this version, and the first tab otherwise.
	const shown = views.find((chapter) => chapter.path === chosen) ?? views[0];

	if (shown === undefined) {
		return undefined;
	}

	if (titled.length === 0) {
		return <section className="contents__loose">{pagesOf(shown, project, version)}</section>;
	}

	return (
		<>
			<TabList
				className="chapters"
				aria-label="In this version"
				selectedValue={shown.path}
				onTabSelect={(_, data) => setChosen(String(data.value))}
			>
				{views.map((chapter) => (
					<Tab key={chapter.path} value={chapter.path} id={anchorOf(chapter)} className="chapters__tab">
						<span className="chapters__no">{numbered(chapter.items[0]?.seq ?? 0)}</span>
						<span className="chapters__title">{chapter.title}</span>
					</Tab>
				))}
			</TabList>

			<section className="contents__chapter" role="tabpanel" aria-labelledby={anchorOf(shown)}>
				<p className="contents__scale">
					<span className="contents__range">{rangeOf(shown.items)}</span>
					<span className="contents__meta">
						{plural(shown.items.length, 'page')}
						{minutesOf(shown.items) === 0 ? '' : ` · ${readingTime(minutesOf(shown.items))}`}
					</span>
				</p>
				{pagesOf(shown, project, version)}
			</section>
		</>
	);
}

export function VersionPage() {
	const catalog = useCatalog();
	const artifacts = useArtifacts();
	const { key, version } = useParams();
	const project = catalog.projects.find((entry) => entry.id === key);
	const held = project?.versions.find((entry) => entry.version === version);

	if (project === undefined || held === undefined) {
		return <NotFound what={key} />;
	}

	const section = catalog.sections.find((entry) => entry.id === project.section);
	const newest = held.version === project.latest;
	const latest = project.versions.find((entry) => entry.version === project.latest);
	const first = held.pages[0];
	const chm = hasChm(artifacts, project.id, held.version);
	const chapters = contentsOf(held.pages);
	const minutes = held.pages.reduce((total, page) => total + (page.minutes ?? 0), 0);

	return (
		<>
			<div className="hero">
				<p className="eyebrow">{section?.title ?? project.section}</p>
				<h1>
					{project.title} <span className="quiet">{held.version}</span>
				</h1>
				<p className="lede">
					{plural(held.pages.length, 'page')}
					{held.builtAt === undefined ? '' : ` · built ${since(held.builtAt)}`}
					{newest ? '' : latest === undefined ? '' : ` · the newest version is ${latest.version}`}
				</p>

				{newest ? undefined : (
					<p className="hero__banner">
						You are reading {held.version}.
						<Link to={latest === undefined ? `/${project.id}/` : `/${project.id}/${encodeURIComponent(latest.version)}/`}>
							{' '}
							Switch to {latest?.version ?? 'the newest version'} →
						</Link>
					</p>
				)}

				<div className="hero__actions">
					{first === undefined ? undefined : (
						<Link className="btn btn--primary" to={pageUrl(project.id, held.version, first)}>
							Start reading
						</Link>
					)}
					<a className="btn" href={pdfUrl(project.id, held.version)} download>
						<ArrowDownloadRegular aria-hidden="true" /> PDF
					</a>
					{chm ? (
						<a className="btn" href={chmUrl(project.id, held.version)} download>
							<BookRegular aria-hidden="true" /> Windows help
						</a>
					) : undefined}
					<Link className="btn" to={`/${project.id}/`}>
						All versions
					</Link>
				</div>
			</div>

			<div className="page">
				<PageHeader />

				<p className="label__row">
					<span className="label">In this version</span>
					<span className="quiet">
						{plural(held.pages.length, 'page')}
						{minutes === 0 ? '' : ` · ${readingTime(minutes)}`}
					</span>
				</p>

				<Contents chapters={chapters} project={project.id} version={held.version} />

				{project.versions.length > 1 ? (
					<>
						<p className="label__row">
							<span className="label">Other versions</span>
							<span className="quiet">{plural(project.versions.length - 1, 'version')}</span>
						</p>
						<p className="versions">
							{project.versions
								.filter((entry) => entry.version !== held.version)
								.map((entry) => (
									<Link key={entry.version} className="version" to={`/${project.id}/${encodeURIComponent(entry.version)}/`}>
										<span className="mono">{entry.version}</span>
										{entry.version === project.latest ? <span className="pill pill--latest">Latest</span> : undefined}
										<span className="version__meta">{plural(entry.pages.length, 'page')}</span>
									</Link>
								))}
						</p>
					</>
				) : undefined}
			</div>
		</>
	);
}
