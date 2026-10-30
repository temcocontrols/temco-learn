// One version: its pages, in reading order, as the version's own front page.

import { Link, useParams } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { pageUrl, plural, since } from '../data';
import { NotFound } from './NotFound';

export function VersionPage() {
	const catalog = useCatalog();
	const { key, version } = useParams();
	const project = catalog.projects.find((entry) => entry.id === key);
	const held = project?.versions.find((entry) => entry.version === version);

	if (project === undefined || held === undefined) {
		return <NotFound what={key} />;
	}
	const section = catalog.sections.find((entry) => entry.id === project.section);

	return (
		<>
			<div className="hero">
				<p className="crumbs">
					<Link to="/">Temco Learn</Link>
					<span aria-hidden="true">›</span>
					<Link to={`/${project.section}`}>{section?.title ?? project.section}</Link>
					<span aria-hidden="true">›</span>
					<Link to={`/${project.id}/${project.latest}/`}>{project.title}</Link>
					<span aria-hidden="true">›</span>
					<span className="mono">{held.version}</span>
				</p>
				<h1>
					{project.title} <span className="mono" style={{ color: 'var(--ink-3)' }}>{held.version}</span>
				</h1>
				<p className="lede">
					{plural(held.pages.length, 'page')}
					{held.builtAt === undefined ? '' : ` · built ${since(held.builtAt)}`}
				</p>
			</div>
			<div className="page">
				<p className="label">Pages</p>
				<div className="rows">
					{held.pages.map((page) => (
						<Link key={page.href} className="row" to={pageUrl(project.id, held.version, page)}>
							<span className="row__title">{page.title}</span>
							{page.description === undefined ? undefined : <span className="row__meta">{page.description}</span>}
							<span className="row__go">{page.kind === 'build' ? 'Open →' : 'Read →'}</span>
						</Link>
					))}
				</div>
				{project.versions.length > 1 ? (
					<>
						<p className="label">Other versions</p>
						<div className="rows">
							{project.versions
								.filter((entry) => entry.version !== held.version)
								.map((entry) => (
									<Link key={entry.version} className="row" to={`/${project.id}/${encodeURIComponent(entry.version)}/`}>
										<span className="row__title mono">{entry.version}</span>
										<span className="row__meta">{plural(entry.pages.length, 'page')}</span>
										<span className="row__go">Open →</span>
									</Link>
								))}
						</div>
					</>
				) : undefined}
			</div>
		</>
	);
}