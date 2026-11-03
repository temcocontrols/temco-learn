// One version: the landing a reader arrives on before they start reading.
//
// The hero carries the useful actions — start reading, the PDF, the Windows Help file when the build produced one, and the
// way back to every version. The pages below are a numbered grid, not a table: no lines, no columns, just the order and the
// titles, which is what a reader is actually choosing between.

import { Link, useParams } from 'react-router-dom';
import { ArrowDownloadRegular, BookRegular } from '@fluentui/react-icons';
import { useArtifacts } from '../artifacts';
import { useCatalog } from '../catalog';
import { chmUrl, hasChm, pageUrl, pdfUrl, plural, since } from '../data';
import { PageHeader } from '../components/PageHeader';
import { NotFound } from './NotFound';

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
					<span className="quiet">{plural(held.pages.length, 'page')}</span>
				</p>
				<ol className="pagegrid">
					{held.pages.map((page, at) => (
						<li key={page.href}>
							<Link className="pagetile" to={pageUrl(project.id, held.version, page)}>
								<span className="pagetile__no">{String(at + 1).padStart(2, '0')}</span>
								<span className="pagetile__title">{page.title}</span>
								{page.description === undefined ? undefined : <span className="pagetile__desc">{page.description}</span>}
								<span className="pagetile__meta">
									{page.kind === 'build' ? 'from the build' : `${String(page.minutes ?? 1)} min read`}
								</span>
							</Link>
						</li>
					))}
				</ol>

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
