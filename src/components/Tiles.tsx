// The two shapes the catalogue repeats, as the same hairline tiles the home page uses.
//
// A tile is a link with a small brand-tinted letter, a title that turns brand on hover, a two-line description and one line
// of meta. No background fill, no border box — the hairline above each row is the only structure, so a section page and the
// home page read as the same surface.

import { Link } from 'react-router-dom';
import { ChevronRightRegular } from '@fluentui/react-icons';
import type { Project, Section } from '../model';
import { plural, sectionNoun, since } from '../data';

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
			<span className="tile__meta">{plural(projects.length, sectionNoun(section))}</span>
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

/**
 * A section at the foot of another section's page: its mark, its name, one line saying what is behind it, and an arrow.
 * Three sit side by side on the same columns as the tiles above. No box and no fill — what keeps them from being read as
 * more of the content is that the whole block is one link, and it answers as one on hover.
 */
export function SectionJump({ section, projects }: { section: Section; projects: Project[] }) {
	return (
		<Link className="jump" to={`/${section.id}`}>
			<span className="jump__mark" aria-hidden="true">
				{chip(section.title)}
			</span>
			<span className="jump__text">
				<span className="jump__name">{section.title}</span>
				<span className="jump__desc">{section.description}</span>
				<span className="jump__meta">
					{plural(projects.length, sectionNoun(section))}
					<ChevronRightRegular className="jump__chev" aria-hidden="true" />
				</span>
			</span>
		</Link>
	);
}
