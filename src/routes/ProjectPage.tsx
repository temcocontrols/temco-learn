// One project: what it is, every version it keeps, and the pages of the newest one.

import { Link } from 'react-router-dom';
import { ArrowDownloadRegular } from '@fluentui/react-icons';
import { useCatalog } from '../catalog';
import { formatDate, pageUrl, pdfUrl, plural, since } from '../data';
import { PageHeader } from '../components/PageHeader';
import type { Project } from '../model';

export function ProjectPage({ project }: { project: Project }) {
	const catalog = useCatalog();
	const section = catalog.sections.find((entry) => entry.id === project.section);
	const latest = project.versions[0];
	const pages = latest?.pages ?? [];

	return (
		<>
			<div className="hero">
				<p className="eyebrow">{section?.title ?? project.section}</p>
				<h1>{project.title}</h1>
				{project.summary === '' ? undefined : <p className="lede">{project.summary}</p>}
				<div className="hero__badges">
					<span>{plural(project.versions.length, 'version')}</span>
					<span className="pill pill--latest">Latest {project.latest}</span>
					{latest?.builtAt === undefined ? undefined : <span>Updated {since(latest.builtAt)}</span>}
				</div>
				<div className="hero__actions">
					<a className="btn btn--primary" href={pdfUrl(project.id, project.latest)} download>
						<ArrowDownloadRegular aria-hidden="true" /> Download the guide
					</a>
					<Link className="btn" to={`/${project.id}/${encodeURIComponent(project.latest)}/`}>
						Read {project.latest}
					</Link>
				</div>
			</div>

			<div className="page">
				<PageHeader />
				<p className="label">Versions</p>
				<div className="table__wrap">
					<table className="table">
						<thead>
							<tr>
								<th>Version</th>
								<th>Pages</th>
								<th>Updated</th>
								<th className="table__end">Open</th>
							</tr>
						</thead>
						<tbody>
							{project.versions.map((version) => (
								<tr key={version.version} data-current={version.version === project.latest ? 'true' : undefined}>
									<td>
										<span className="mono table__title">{version.version}</span>
										{version.version === project.latest ? <span className="pill pill--latest">Latest</span> : undefined}
									</td>
									<td className="table__num">{plural(version.pages.length, 'page')}</td>
									<td className="quiet">{formatDate(version.builtAt)}</td>
									<td className="table__end">
										<Link to={`/${project.id}/${encodeURIComponent(version.version)}/`}>Open →</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{latest === undefined ? undefined : (
					<>
						<p className="label">In {latest.version}</p>
						<div className="rows">
							{pages.map((page) => (
								<Link key={page.href} className="row" to={pageUrl(project.id, latest.version, page)}>
									<span className="row__title">{page.title}</span>
									{page.description === undefined ? undefined : <span className="row__meta">{page.description}</span>}
									<span className="row__go">{page.kind === 'build' ? 'Open →' : 'Read →'}</span>
								</Link>
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
}
