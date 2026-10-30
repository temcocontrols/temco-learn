// Home: what the site is, the six sections, and what changed lately.

import { Link } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { since } from '../data';
import { SectionCard } from '../components/Cards';

export function Home() {
	const catalog = useCatalog();
	const bySection = (id: string) => catalog.projects.filter((project) => project.section === id);
	const updated = [...catalog.projects]
		.map((project) => ({ project, at: project.versions[0]?.builtAt ?? '' }))
		.sort((one, other) => other.at.localeCompare(one.at))
		.slice(0, 6);

	return (
		<>
			<div className="hero">
				<p className="eyebrow">Temco Learn</p>
				<h1>Documentation for every Temco product</h1>
				<p className="lede">
					Guides, references, training and commissioning checks, one folder per product and one page per version. Every version a
					product keeps stays readable, so a machine commissioned two years ago still has the pages it was built with.
				</p>
			</div>
			<div className="page">
				<p className="label">Sections</p>
				<div className="cards">
					{catalog.sections.map((section) => (
						<SectionCard key={section.id} section={section} projects={bySection(section.id)} />
					))}
				</div>
				{updated.length === 0 ? undefined : (
					<>
						<p className="label">Recently updated</p>
						<div className="rows">
							{updated.map(({ project, at }) => (
								<Link key={project.id} className="row" to={`/${project.id}/${project.latest}/`}>
									<span className="row__title">{project.title}</span>
									<span className="row__meta mono">{project.latest}</span>
									<span className="row__meta">{at === '' ? '' : `updated ${since(at)}`}</span>
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