// The honest page: an address that names nothing says so, guesses what was meant, and offers the way back.

import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchRegular } from '@fluentui/react-icons';
import { useCatalog } from '../catalog';
import { plural } from '../data';
import { PageHeader } from '../components/PageHeader';
import { SectionTile } from '../components/Tiles';

/** Edit distance, bounded: enough to catch `prot` for `ports` and `gettingstarted` for `getting-started`. */
function distance(one: string, other: string): number {
	const left = one.toLowerCase();
	const right = other.toLowerCase();
	const rows = left.length + 1;
	const columns = right.length + 1;
	const table = Array.from({ length: rows }, (_, row) => Array.from({ length: columns }, (_, column) => (row === 0 ? column : column === 0 ? row : 0)));
	for (let row = 1; row < rows; row += 1) {
		for (let column = 1; column < columns; column += 1) {
			const cost = left[row - 1] === right[column - 1] ? 0 : 1;
			table[row]![column] = Math.min(table[row - 1]![column]! + 1, table[row]![column - 1]! + 1, table[row - 1]![column - 1]! + cost);
		}
	}
	return table[rows - 1]![columns - 1]!;
}

export function NotFound({ what }: { what?: string }) {
	const catalog = useCatalog();
	const navigate = useNavigate();
	const [query, setQuery] = React.useState('');
	const asked = what ?? '';

	// A near miss is worth naming: it is the difference between "not here" and "you meant this".
	const near = React.useMemo(() => {
		if (asked === '') {
			return [];
		}
		const candidates = [
			...catalog.projects.map((project) => ({ id: project.id, label: project.title, to: `/${project.id}/` })),
			...catalog.sections.map((section) => ({ id: section.id, label: section.title, to: `/${section.id}` })),
			...catalog.projects.flatMap((project) =>
				project.versions.flatMap((version) =>
					version.pages.map((page) => ({ id: page.href, label: page.title, to: `/${project.id}/${encodeURIComponent(version.version)}/${page.href}` }))
				)
			)
		];
		return candidates
			.map((entry) => ({ ...entry, score: Math.min(distance(asked, entry.id), distance(asked, entry.label)) }))
			.filter((entry) => entry.score <= Math.max(2, Math.round(asked.length / 3)))
			.sort((one, other) => one.score - other.score)
			.slice(0, 4);
	}, [asked, catalog]);

	return (
		<>
			<div className="hero">
				<p className="eyebrow">Temco Learn</p>
				<h1>Not on this site</h1>
				<p className="lede">
					{what === undefined ? 'That address does not name a page.' : `Nothing here is called “${what}”.`} A page appears once one
					of a project's versions is published.
				</p>
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
					<button type="submit" className="bigsearch__go">
						<SearchRegular aria-hidden="true" />
						Search
					</button>
				</form>
			</div>

			<div className="page">
				<PageHeader />
				{near.length === 0 ? undefined : (
					<>
						<p className="label">Did you mean</p>
						<div className="rows">
							{near.map((entry) => (
								<Link key={`${entry.to}-${entry.label}`} className="row" to={entry.to}>
									<span className="row__title">{entry.label}</span>
									<span className="row__meta mono">{entry.to}</span>
									<span className="row__go">Open →</span>
								</Link>
							))}
						</div>
					</>
				)}

				<p className="label__row">
					<span className="label">Sections</span>
					<span className="quiet">{plural(catalog.sections.length, 'section')}</span>
				</p>
				<div className="tiles">
					{catalog.sections.map((section) => (
						<SectionTile key={section.id} section={section} projects={catalog.projects.filter((project) => project.section === section.id)} />
					))}
				</div>
			</div>
		</>
	);
}
