// One section: the projects listed in it, then the sections beside it — the same hairline grid the home page uses.

import { useCatalog } from '../catalog';
import { plural, sectionNoun, sectionNounTitle } from '../data';
import { PageHeader } from '../components/PageHeader';
import { ProjectTile, SectionJump } from '../components/Tiles';
import type { Section } from '../model';

export function SectionPage({ section }: { section: Section }) {
	const catalog = useCatalog();
	const projects = catalog.projects.filter((project) => project.section === section.id);
	const others = catalog.sections.filter((entry) => entry.id !== section.id);

	return (
		<>
			<div className="hero">
				<p className="eyebrow">T3000 Help</p>
				<h1>{section.title}</h1>
				<p className="lede">{section.description}</p>
			</div>
			<div className="page">
				<PageHeader />

				<p className="label__row">
					<span className="label">{sectionNounTitle(section)}</span>
					<span className="quiet">{plural(projects.length, sectionNoun(section))}</span>
				</p>
				{projects.length === 0 ? (
					<p className="empty">
						Nothing has been published in {section.title} yet. A {sectionNoun(section)} appears here as soon as one of
						its versions is added, and this page then lists it beside the others.
					</p>
				) : (
					<div className="tiles">
						{projects.map((project) => (
							<ProjectTile key={project.id} project={project} />
						))}
					</div>
				)}

				<p className="label__row">
					<span className="label">Other sections</span>
					<span className="quiet">{plural(others.length, 'section')}</span>
				</p>
				<div className="jumps">
					{others.map((entry) => (
						<SectionJump key={entry.id} section={entry} projects={catalog.projects.filter((project) => project.section === entry.id)} />
					))}
				</div>
			</div>
		</>
	);
}
