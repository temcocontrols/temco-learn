// Home: a documentation home rather than a front page.
//
// The hero is the whole entry point — one sentence, the search, the three searches this site actually gets, and what changed
// lately, in a single block with no cards. Below it, the six sections are a plain grid of links separated by hairlines.

import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchRegular } from '@fluentui/react-icons';
import { useCatalog } from '../catalog';
import { plural, since, siteBase } from '../data';

/** The searches this site actually gets, from `content/config.json` — an empty list hides the row. */
const hintsOf = (catalog: { hints?: string[] }): string[] => catalog.hints ?? [];

/** The letter a tile wears: the first letter of the name, which is all an avatar needs to be recognisable in a grid. */
const chip = (title: string): string => title.trim().slice(0, 1).toUpperCase();

export function Home() {
	const catalog = useCatalog();
	const navigate = useNavigate();
	const [query, setQuery] = React.useState('');
	const hints = hintsOf(catalog);
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

				<div className="finder">
					<form
						className="bigsearch"
						role="search"
						onSubmit={(event) => {
							event.preventDefault();
							const trimmed = query.trim();
							if (trimmed !== '') {
								navigate(`/search?q=${encodeURIComponent(trimmed)}`);
							}
						}}
					>
						<input
							type="search"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search every page…"
							aria-label="Search every page"
						/>
						{/* A link first: it carries the query in its address, so the action works before any JavaScript does. */}
						<a className="bigsearch__go" href={`${siteBase}search?q=${encodeURIComponent(query.trim())}`}>
							<SearchRegular aria-hidden="true" />
							Search
						</a>
					</form>

					{hints.length === 0 ? undefined : (
						<div className="finder__row">
							<div className="hints">
								{hints.map((hint) => (
									<button key={hint} type="button" onClick={() => setQuery(hint)}>
										{hint}
									</button>
								))}
							</div>

							{updated.length === 0 ? undefined : (
								<p className="finder__recent">
									<span className="finder__label">Recently updated</span>
									{updated.map(({ project, at }) => (
										<Link key={project.id} className="finder__link" to={`/${project.id}/${project.latest}/`}>
											<span className="finder__name">{project.title}</span>
											<span className="mono">{project.latest}</span>
											<span className="finder__when">{at === '' ? '' : since(at)}</span>
										</Link>
									))}
								<Link className="finder__all" to="/documentation">
									All documentation →
								</Link>
							</p>
						)}
					</div>
					)}
				</div>
			</div>
			<div className="page">
				<p className="label__row">
					<span className="label">Sections</span>
					<span className="quiet">{plural(catalog.sections.length, 'section')}</span>
				</p>
				<div className="tiles">
					{catalog.sections.map((section) => (
						<Link key={section.id} className="tile" to={`/${section.id}`}>
							<span className="tile__mark" aria-hidden="true">
								{chip(section.title)}
							</span>
							<span className="tile__title">{section.title}</span>
							<span className="tile__desc">{section.description}</span>
							<span className="tile__meta">{plural(bySection(section.id).length, 'project')}</span>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
