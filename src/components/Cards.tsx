// The two shapes the catalogue repeats: a project as a card, and a section as a card.

import { Link } from 'react-router-dom';
import type { Project, Section } from '../model';
import { plural, since } from '../data';

/** The letter a card wears: the first letter of the name, which is all an avatar needs to be recognisable in a grid. */
const chip = (title: string): string => title.trim().slice(0, 1).toUpperCase();

export function SectionCard({ section, projects }: { section: Section; projects: Project[] }) {
	return (
		<Link className="card" to={`/${section.id}`}>
			<span className="card__chip" aria-hidden="true">
				{chip(section.title)}
			</span>
			<span className="card__title">{section.title}</span>
			<span className="card__desc">{section.description}</span>
			<span className="card__meta">{plural(projects.length, 'project')}</span>
		</Link>
	);
}

export function ProjectCard({ project }: { project: Project }) {
	const latest = project.versions[0];
	return (
		<Link className="card" to={`/${project.id}/${project.latest}/`}>
			<span className="card__chip" aria-hidden="true">
				{chip(project.title)}
			</span>
			<span className="card__title">{project.title}</span>
			<span className="card__desc">{project.summary}</span>
			<span className="card__meta">
				Latest <span className="mono">{project.latest}</span> · {plural(project.versions.length, 'version')}
				{latest?.builtAt === undefined ? '' : ` · updated ${since(latest.builtAt)}`}
			</span>
		</Link>
	);
}