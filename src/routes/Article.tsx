// One page of one version: the three-column reader, whether the page was authored here or written by a build.
//
// The left column is a tree a reader can filter and walk with the arrow keys; the middle is the page; the right is the
// table of contents, which follows the reader down the page. Everything the compiler wrote — code blocks, headings, anchors
// — is decorated here, once, by delegation, so the compiled HTML stays inert.

import * as React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SearchRegular } from '@fluentui/react-icons';
import { useCatalog } from '../catalog';
import { addressOf } from '../chrome';
import { formatDate, loadBodies, pageUrl, permalink, plural } from '../data';
import { readBuildPage } from '../imported';
import type { CompiledPage, PageEntry, Version } from '../model';
import { Feedback } from '../components/Feedback';
import { PageHeader } from '../components/PageHeader';
import { NotFound } from './NotFound';

/** The pages either side of this one, in the order the version lists them. */
function neighbours(pages: PageEntry[], href: string): { previous?: PageEntry; next?: PageEntry } {
	const at = pages.findIndex((page) => page.href === href);
	return { previous: at > 0 ? pages[at - 1] : undefined, next: at >= 0 ? pages[at + 1] : undefined };
}

/**
 * One folder of the left rail: the pages it holds and the folders inside it, in the order the version lists them.
 *
 * The rail is built from the pages' own addresses, because an imported build has already said what its folders are:
 * `control/inputs/menu.html` is the page `menu` in the folder `control/inputs`. A page whose name repeats its folder is
 * that folder's own introduction, and gives the folder its title.
 */
interface RailNode {
	name: string;
	/** The folder's address inside the version: `control/inputs`. Empty at the top. */
	path: string;
	seq: { page?: PageEntry; folder?: RailNode }[];
	folders: Map<string, RailNode>;
}

function railTree(pages: PageEntry[]): RailNode {
	const root: RailNode = { name: '', path: '', seq: [], folders: new Map() };
	for (const page of pages) {
		const parts = page.href.split('/');
		let node = root;
		for (const name of parts.slice(0, -1)) {
			let child = node.folders.get(name);
			if (child === undefined) {
				child = { name, path: (node.path === '' ? '' : node.path + '/') + name, seq: [], folders: new Map() };
				node.folders.set(name, child);
				node.seq.push({ folder: child });
			}
			node = child;
		}
		node.seq.push({ page });
	}
	return root;
}

/** A folder's title: its own page's, or its name with the dashes taken out. */
function railTitle(node: RailNode): string {
	// A page's own address is its path — `.html` when a build wrote it, and nothing at all when the site authored it.
	const own = node.seq.find(
		(item) => item.page !== undefined && (item.page.href === `${node.path}/${node.name}` || item.page.href === `${node.path}/${node.name}.html`)
	);
	if (own?.page !== undefined) {
		return own.page.title;
	}
	const words = node.name.replace(/[-_]+/gu, ' ');
	return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * The rail, drawn as the folders it is.
 *
 * A folder is a `<details>` left open, so a chapter can be closed once the reader knows where they are, and the whole
 * manual still fits a column. The folders above the current page start open whatever their depth: a reader arriving from
 * a link should see where they are.
 */
function railItems(node: RailNode, project: string, version: string, current: string, depth: number): React.ReactNode[] {
	return node.seq.map((item) => {
		if (item.page !== undefined) {
			return (
				<li key={item.page.href}>
					<Link to={pageUrl(project, version, item.page)} aria-current={item.page.href === current ? 'page' : undefined}>
						{item.page.title}
					</Link>
				</li>
			);
		}
		const held = item.folder;
		if (held === undefined) {
			return undefined;
		}
		const inside = railItems(held, project, version, current, depth + 1);
		return (
			<li key={held.path} className="rail__folder">
				<details open={current.startsWith(held.path + '/') || depth === 0}>
					<summary>{railTitle(held)}</summary>
					<ul className="rail__list">{inside}</ul>
				</details>
			</li>
		);
	});
}

/** Where the sticky masthead ends: the line a heading has to cross before the table of contents calls it current. */
const READING_LINE = 76;

export function Article() {
	const catalog = useCatalog();
	const location = useLocation();
	const { key, version, '*': rest } = useParams();
	/** The page's own address inside the version, which may itself be a path: `control/inputs/inputs.html`. */
	const slug = rest === undefined || rest === '' ? undefined : rest;
	const project = catalog.projects.find((entry) => entry.id === key);
	const held: Version | undefined = project?.versions.find((entry) => entry.version === version);
	const page: PageEntry | undefined = held?.pages.find((entry) => entry.href === slug);

	const [bodies, setBodies] = React.useState<Record<string, CompiledPage>>({});
	const [built, setBuilt] = React.useState<CompiledPage | undefined>(undefined);
	const [filter, setFilter] = React.useState('');
	const [current, setCurrent] = React.useState<string | undefined>(undefined);
	const prose = React.useRef<HTMLDivElement>(null);
	const rail = React.useRef<HTMLElement>(null);

	React.useEffect(() => {
		if (project === undefined || held === undefined) {
			return;
		}
		let live = true;
		void loadBodies(project.id, held.version).then((file) => {
			if (live) {
				setBodies(file.pages);
			}
		});
		return () => {
			live = false;
		};
	}, [project, held]);

	// A page a build wrote is read and shown as an article, not framed: framed it would be a window with a scroll bar of
	// its own inside a page that also scrolls — and the reader could not tell where one document ends and the next begins.
	React.useEffect(() => {
		setBuilt(undefined);
		if (project === undefined || held === undefined || page === undefined || page.kind !== 'build') {
			return;
		}
		let live = true;
		void readBuildPage(project.id, held.version, page.href).then((read) => {
			if (live) {
				setBuilt({ title: page.title, description: page.description, html: read.html, headings: read.headings });
			}
		});
		return () => {
			live = false;
		};
	}, [project, held, page]);

	React.useEffect(() => {
		document.title = page === undefined ? 'Temco Learn' : `${page.title} · Temco Learn`;
	}, [page]);

	// A new page starts with a clean tree filter, and the reader's own page scrolled into the tree.
	React.useEffect(() => {
		setFilter('');
		rail.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
	}, [page?.href]);

	const body = page === undefined ? undefined : page.kind === 'build' ? built : bodies[page.href];

	// A section can be linked from the palette (router state) or from a copied address (`#heading` in the route).
	React.useEffect(() => {
		if (body === undefined) {
			return;
		}
		const state = location.state as { anchor?: string } | null;
		const wanted = state?.anchor ?? location.hash.replace(/^#/u, '');
		if (wanted === '' || wanted === undefined) {
			return;
		}
		const element = document.getElementById(wanted);
		if (element !== null) {
			element.scrollIntoView({ block: 'start', behavior: 'smooth' });
			setCurrent(wanted);
		}
	}, [body, location.state, location.hash]);

	// Copy buttons and heading anchors: one listener for the whole article, attached to markup the compiler produced.
	React.useEffect(() => {
		const host = prose.current;
		if (host === null) {
			return;
		}
		const onClick = (event: MouseEvent): void => {
			const target = event.target;
			if (!(target instanceof Element)) {
				return;
			}

			const button = target.closest('[data-copy]');
			if (button !== null) {
				const code = button.closest('.code')?.querySelector('code');
				const text = code?.textContent ?? '';
				void navigator.clipboard?.writeText(text).then(() => {
					button.textContent = 'Copied';
					button.setAttribute('data-copied', 'true');
					window.setTimeout(() => {
						button.textContent = 'Copy';
						button.removeAttribute('data-copied');
					}, 1600);
				});
				return;
			}

			const anchor = target.closest('.anchor');
			if (anchor !== null) {
				event.preventDefault();
				const id = anchor.getAttribute('data-anchor');
				if (id === null || page === undefined || project === undefined || held === undefined) {
					return;
				}
				const hash = `${addressOf(project.id, held.version, page)}#${id}`;
				void navigator.clipboard?.writeText(permalink(catalog, hash)).then(() => {
					anchor.setAttribute('data-copied', 'true');
					window.setTimeout(() => anchor.removeAttribute('data-copied'), 1600);
				});
				document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
			}
		};
		host.addEventListener('click', onClick);
		return () => host.removeEventListener('click', onClick);
	}, [body, catalog, held, page, project]);

	// The table of contents follows the reader: whichever heading last crossed the reading line is the current one.
	React.useEffect(() => {
		if (body === undefined) {
			setCurrent(undefined);
			return;
		}
		const host = prose.current;
		if (host === null) {
			return;
		}
		const headings = [...host.querySelectorAll<HTMLElement>('h2[id], h3[id]')];
		const onScroll = (): void => {
			let seen: string | undefined = headings[0]?.id;
			for (const heading of headings) {
				if (heading.getBoundingClientRect().top <= READING_LINE) {
					seen = heading.id;
				}
			}
			setCurrent(seen);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [body]);

	if (project === undefined || held === undefined || page === undefined) {
		return <NotFound what={slug} />;
	}

	const { previous, next } = neighbours(held.pages, page.href);
	const needle = filter.trim().toLowerCase();
	const shown = held.pages.filter((entry) => {
		if (needle === '') {
			return true;
		}
		if (entry.title.toLowerCase().includes(needle)) {
			return true;
		}
		const heldBody = bodies[entry.href];
		return heldBody !== undefined && heldBody.headings.some((heading) => heading.text.toLowerCase().includes(needle));
	});

	// The right column is the current document and nothing else: the headings a reader can jump to.
	const sections = body?.headings ?? [];

	const onRailKey = (event: React.KeyboardEvent<HTMLElement>): void => {
		if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
			return;
		}
		const links = [...(rail.current?.querySelectorAll<HTMLAnchorElement>('.rail__list a') ?? [])];
		const at = links.indexOf(document.activeElement as HTMLAnchorElement);
		if (at === -1) {
			return;
		}
		event.preventDefault();
		const next = links[Math.min(links.length - 1, Math.max(0, at + (event.key === 'ArrowDown' ? 1 : -1)))];
		next?.focus();
	};

	return (
		<div className="reader">
			<nav className="reader__nav" aria-label={`Pages in ${project.title} ${held.version}`} ref={rail} onKeyDown={onRailKey}>
				{/* The filter stays; the tree under it is what scrolls, so searching never means scrolling back up. */}
				<label className="rail__filter">
					<span className="sr">Filter pages</span>
					<SearchRegular aria-hidden="true" />
					<input type="search" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter pages…" />
				</label>

				<div className="rail__scroll">
					<p className="label">{project.title}</p>
					{shown.length === 0 ? (
						<p className="rail__none">No page matches “{filter.trim()}”.</p>
					) : (
						<ul className="rail__list">{railItems(railTree(shown), project.id, held.version, page.href, 0)}</ul>
					)}

					<div className="rail__versions">
						{project.versions.map((entry) => (
							<Link
								key={entry.version}
								to={pageUrl(project.id, entry.version, entry.pages[0] ?? page)}
								aria-current={entry.version === held.version ? 'page' : undefined}
							>
								{entry.version}
							</Link>
						))}
					</div>
				</div>
			</nav>

			<article className="article">
				<PageHeader />
				<h1 className="article__title">{page.title}</h1>
				{page.description === undefined ? undefined : <p className="article__desc">{page.description}</p>}

				<p className="article__meta">
					<span>Updated {formatDate(page.updated)}</span>
					<span className="meta__dot">{plural(page.minutes ?? 1, 'minute')} to read</span>
					<span className="meta__dot mono">applies to {held.version}</span>
				</p>

				{body === undefined || body.headings.length === 0 ? undefined : (
					<details className="inth">
						<summary>In this article</summary>
						<ol>
							{body.headings.map((heading) => (
								<li key={heading.id}>
									<a
										href={`#${heading.id}`}
										onClick={(event) => {
											event.preventDefault();
											document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
										}}
									>
										{heading.text}
									</a>
								</li>
							))}
						</ol>
					</details>
				)}

				{body === undefined ? (
					<p className="empty">Loading the page…</p>
				) : (
					<div className="prose" ref={prose} dangerouslySetInnerHTML={{ __html: body.html }} />
				)}

				<Feedback page={`${project.id}/${held.version}/${page.href}`} />

				<div className="pager">
					{previous === undefined ? undefined : (
						<Link to={pageUrl(project.id, held.version, previous)}>
							<span className="pager__label">‹ Previous</span>
							<span className="pager__title">{previous.title}</span>
						</Link>
					)}
					{next === undefined ? undefined : (
						<Link className="pager__next" to={pageUrl(project.id, held.version, next)}>
							<span className="pager__label">Next ›</span>
							<span className="pager__title">{next.title}</span>
						</Link>
					)}
				</div>

			</article>

			<aside className="reader__toc" aria-label="In this page">
				<p className="label">In this page</p>
				{sections.length === 0 ? (
					<p className="toc__none">No sections on this page.</p>
				) : (
					<ul className="toc">
						{sections.map((heading) => (
							<li key={heading.id} className={heading.level > 2 ? 'toc__sub' : undefined}>
								<a
									href={`#${heading.id}`}
									aria-current={heading.id === current ? 'true' : undefined}
									onClick={(event) => {
										// Scrolling is done by hand so the address keeps naming the page rather than a position on it.
										event.preventDefault();
										document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
									}}
								>
									{heading.text}
								</a>
							</li>
						))}
					</ul>
				)}
			</aside>
		</div>
	);
}
