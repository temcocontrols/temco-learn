// One page of one version: the three-column reader, whether the page was authored here or written by a build.

import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { loadBodies, pageUrl, plural } from '../data';
import type { CompiledPage, PageEntry, Version } from '../model';
import { NotFound } from './NotFound';

/** The pages either side of this one, in the order the version lists them. */
function neighbours(pages: PageEntry[], href: string): { previous?: PageEntry; next?: PageEntry } {
	const at = pages.findIndex((page) => page.href === href);
	return { previous: at > 0 ? pages[at - 1] : undefined, next: at >= 0 ? pages[at + 1] : undefined };
}

export function Article() {
	const catalog = useCatalog();
	const { key, version, slug } = useParams();
	const project = catalog.projects.find((entry) => entry.id === key);
	const held: Version | undefined = project?.versions.find((entry) => entry.version === version);
	const page: PageEntry | undefined = held?.pages.find((entry) => entry.href === slug);

	const [bodies, setBodies] = React.useState<Record<string, CompiledPage>>({});
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

	if (project === undefined || held === undefined || page === undefined) {
		return <NotFound what={slug} />;
	}

	const body = bodies[page.href];
	const { previous, next } = neighbours(held.pages, page.href);
	const section = catalog.sections.find((entry) => entry.id === project.section);

	return (
		<div className="reader">
			<nav className="reader__nav" aria-label={`Pages in ${project.title} ${held.version}`}>
				<p className="label">{project.title}</p>
				<ul>
					{held.pages.map((entry) => (
						<li key={entry.href}>
							<Link to={pageUrl(project.id, held.version, entry)} aria-current={entry.href === page.href ? 'page' : undefined}>
								{entry.title}
							</Link>
						</li>
					))}
				</ul>
				<div className="reader__versions">
					{project.versions.map((entry) => (
						<Link
							key={entry.version}
							to={pageUrl(project.id, entry.version, entry.pages[0] ?? page)}
							aria-current={entry.version === held.version ? 'page' : undefined}
							className="mono"
							style={{ fontSize: 13 }}
						>
							{entry.version}
						</Link>
					))}
				</div>
			</nav>

			<article className="article">
				<p className="crumbs">
					<Link to="/">Temco Learn</Link>
					<span aria-hidden="true">›</span>
					<Link to={`/${project.section}`}>{section?.title ?? project.section}</Link>
					<span aria-hidden="true">›</span>
					<Link to={`/${project.id}/${encodeURIComponent(held.version)}/`}>
						{project.title} {held.version}
					</Link>
				</p>
				<h1 className="article__title">{page.title}</h1>
				{page.description === undefined ? undefined : <p className="article__desc">{page.description}</p>}

				{page.kind === 'build' ? (
					<>
						<p className="result__meta" style={{ marginTop: 0 }}>
							This page was written by the {project.title} build, not by hand, so it opens exactly as the build laid it out.
						</p>
						<iframe
							className="article__frame"
							title={page.title}
							src={`./imported/${encodeURIComponent(project.id)}/${encodeURIComponent(held.version)}/${page.href}`}
						/>
					</>
				) : body === undefined ? (
					<p className="empty">Loading the page…</p>
				) : (
					<div className="prose" dangerouslySetInnerHTML={{ __html: body.html }} />
				)}

				<div className="pager">
					{previous === undefined ? undefined : <Link to={pageUrl(project.id, held.version, previous)}>‹ {previous.title}</Link>}
					{next === undefined ? undefined : (
						<Link className="pager__next" to={pageUrl(project.id, held.version, next)}>
							{next.title} ›
						</Link>
					)}
				</div>
			</article>

			<aside className="reader__toc" aria-label="In this article">
				<p className="label">In this article</p>
				{body === undefined || body.headings.length === 0 ? (
					<p className="result__meta">{plural(held.pages.length, 'page')} in this version</p>
				) : (
					<ul>
						{body.headings.map((heading) => (
							<li key={heading.id}>
								<a
									href={`#${heading.id}`}
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

