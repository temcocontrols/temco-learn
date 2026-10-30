// One project: what it is, every version it keeps, and the pages of the newest one.

import { Link } from 'react-router-dom';
import { Badge, Button } from '@fluentui/react-components';
import { useCatalog } from '../catalog';
import { pageUrl, plural, since } from '../data';
import type { Project } from '../model';

export function ProjectPage({ project }: { project: Project }) {
	const catalog = useCatalog();
	const section = catalog.sections.find((entry) => entry.id === project.section);
	const latest = project.versions[0];
	const pages = latest?.pages ?? [];

	return (
		<>
			<div className="hero">
				<p className="crumbs">
					<Link to="/">Temco Learn</Link>
					<span aria-hidden="true">›</span>
					<Link to={`/${project.section}`}>{section?.title ?? project.section}</Link>
					<span aria-hidden="true">›</span>
					<span>{project.title}</span>
				</p>
				<h1>{project.title}</h1>
				{project.summary === '' ? undefined : <p className="lede">{project.summary}</p>}
				<p className="lede" style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
					<Badge appearance="tint" color="brand">
						{plural(project.versions.length, 'version')}
					</Badge>
					{latest === undefined ? undefined : <Badge appearance="outline">Latest {latest.version}</Badge>}
					{latest?.builtAt === undefined ? undefined : (
						<span style={{ fontSize: 13, color: 'var(--ink-3)' }}>Updated {since(latest.builtAt)}</span>
					)}
				</p>
			</div>
			<div className="page">
				<p className="label">Versions</p>
				<div className="cards">
					{project.versions.map((version) => (
						<div key={version.version} className="card">
							<span className="card__title mono">{version.version}</span>
							<span className="card__meta" style={{ gridColumn: 1 }}>
								{plural(version.pages.length, 'page')}
								{version.builtAt === undefined ? '' : ` · built ${since(version.builtAt)}`}
							</span>
							<Button
								as="a"
								href={`#/${project.id}/${encodeURIComponent(version.version)}/`}
								appearance={version.version === project.latest ? 'primary' : 'secondary'}
								style={{ gridColumn: 1, justifySelf: 'start', marginTop: 8 }}
							>
								Read
							</Button>
						</div>
					))}
				</div>
				{latest === undefined ? undefined : (
					<>
						<p className="label">In {latest.version}</p>
						<div className="rows">
							{pages.map((page) => (
								<Link key={page.href} className="row" to={pageUrl(project.id, latest.version, page)}>
									<span className="row__title">{page.title}</span>
									{page.description === undefined ? undefined : <span className="row__meta">{page.description}</span>}
									<span className="row__go">Read →</span>
								</Link>
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
}