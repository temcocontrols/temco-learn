// One section: the projects listed in it, as the category itself — no "Projects" heading above the cards.

import { Link } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { ProjectCard } from '../components/Cards';
import type { Section } from '../model';

export function SectionPage({ section }: { section: Section }) {
	const catalog = useCatalog();
	const projects = catalog.projects.filter((project) => project.section === section.id);

	return (
		<>
			<div className="hero">
				<p className="eyebrow">Temco Learn</p>
				<h1>{section.title}</h1>
				<p className="lede">{section.description}</p>
			</div>
			<div className="page">
				{projects.length === 0 ? (
					<p className="empty">
						Nothing has been published in {section.title} yet. A project appears here as soon as one of its versions is added, and
						this page then lists it beside the others.
					</p>
				) : (
					<div className="cards">
						{projects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				)}
				<p className="label">Other sections</p>
				<div className="rows">
					{catalog.sections
						.filter((entry) => entry.id !== section.id)
						.map((entry) => (
							<Link key={entry.id} className="row" to={`/${entry.id}`}>
								<span className="row__title">{entry.title}</span>
								<span className="row__meta">{entry.description}</span>
								<span className="row__go">Open →</span>
							</Link>
						))}
				</div>
			</div>
		</>
	);
}