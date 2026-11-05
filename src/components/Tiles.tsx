// The two shapes the catalogue repeats, as the same hairline tiles the home page uses.
//
// A tile is a link with a small brand-tinted letter, a title that turns brand on hover, a two-line description and one line
// of meta. No background fill, no border box — the hairline above each row is the only structure, so a section page and the
// home page read as the same surface.

import { Link } from 'react-router-dom';
import type { Project, Section } from '../model';
import { plural, since } from '../data';

/** The letter a tile wears: the first letter of the name, which is all an avatar needs to be recognisable in a grid. */
const chip = (title: string): string => title.trim().slice(0, 1).toUpperCase();

export function SectionTile({ section, projects }: { section: Section; projects: Project[] }) {
	return (
		<Link className="tile" to={`/${section.id}`}>
			<span className="tile__mark" aria-hidden="true">
				{chip(section.title)}
			</span>
			<span className="tile__title">{section.title}</span>
			<span className="tile__desc">{section.description}</span>
			<span className="tile__meta">{plural(projects.length, 'project')}</span>
		</Link>
	);
}

export function ProjectTile({ project }: { project: Project }) {
	const latest = project.versions[0];
	return (
		<Link className="tile" to={`/${project.id}/${project.latest}/`}>
			<span className="tile__mark" aria-hidden="true">
				{chip(project.title)}
			</span>
			<span className="tile__title">{project.title}</span>
			<span className="tile__desc">{project.summary}</span>
			<span className="tile__meta">
				Latest <span className="mono">{project.latest}</span> · {plural(project.versions.length, 'version')}
				{latest?.builtAt === undefined ? '' : ` · updated ${since(latest.builtAt)}`}
			</span>
		</Link>
	);
}
