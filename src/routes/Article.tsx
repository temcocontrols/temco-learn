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
import type { CompiledPage, PageEntry, Version } from '../model';
import { Feedback } from '../components/Feedback';
import { PageHeader } from '../components/PageHeader';
import { NotFound } from './NotFound';

/** The pages either side of this one, in the order the version lists them. */
function neighbours(pages: PageEntry[], href: string): { previous?: PageEntry; next?: PageEntry } {
	const at = pages.findIndex((page) => page.href === href);
	return { previous: at > 0 ? pages[at - 1] : undefined, next: at >= 0 ? pages[at + 1] : undefined };
}

/** Where the sticky masthead ends: the line a heading has to cross before the table of contents calls it current. */
const READING_LINE = 76;

export function Article() {
	const catalog = useCatalog();
	const location = useLocation();
	const { key, version, slug } = useParams();
	const project = catalog.projects.find((entry) => entry.id === key);
	const held: Version | undefined = project?.versions.find((entry) => entry.version === version);
	const page: PageEntry | undefined = held?.pages.find((entry) => entry.href === slug);

	const [bodies, setBodies] = React.useState<Record<string, CompiledPage>>({});
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

	React.useEffect(() => {
		document.title = page === undefined ? 'Temco Learn' : `${page.title} · Temco Learn`;
	}, [page]);

	// A new page starts with a clean tree filter, and the reader's own page scrolled into the tree.
	React.useEffect(() => {
		setFilter('');
		rail.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
	}, [page?.href]);

	const body = page === undefined ? undefined : bodies[page.href];

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
	const section = catalog.sections.find((entry) => entry.id === project.section);
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
				<label className="rail__filter">
					<span className="sr">Filter pages</span>
					<SearchRegular aria-hidden="true" />
					<input type="search" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter pages…" />
				</label>

				<p className="label">{project.title}</p>
				{shown.length === 0 ? (
					<p className="rail__none">No page matches “{filter.trim()}”.</p>
				) : (
					<ul className="rail__list">
						{shown.map((entry) => (
							<li key={entry.href}>
								<Link to={pageUrl(project.id, held.version, entry)} aria-current={entry.href === page.href ? 'page' : undefined}>
									{entry.title}
								</Link>
							</li>
						))}
					</ul>
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
			</nav>

			<article className="article">
				<PageHeader />
				<p className="article__eyebrow">{section?.title ?? project.section}</p>
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

				{page.kind === 'build' ? (
					<>
						<p className="result__meta">This page was written by the {project.title} build, so it opens exactly as the build laid it out.</p>
						<iframe
							className="article__frame"
							title={page.title}
							src={`./imported/${encodeURIComponent(project.id)}/${encodeURIComponent(held.version)}/${page.href}`}
						/>
					</>
				) : body === undefined ? (
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

			<aside className="reader__toc" aria-label="In this article">
				<p className="label">In this article</p>
				{body === undefined || body.headings.length === 0 ? (
					<p className="result__meta">{plural(held.pages.length, 'page')} in this version</p>
				) : (
					<ul className="toc">
						{body.headings.map((heading) => (
							<li key={heading.id} className={heading.level > 2 ? 'toc__sub' : undefined}>
								<a
									href={`#${heading.id}`}
									aria-current={heading.id === current ? 'true' : undefined}
									onClick={(event) => {
										// The hash is the route: scrolling is done by hand so the address does not change.
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
