// Search: the results page the address `#/search?q=…` names, driven by the index the build generated.
//
// The palette (Ctrl K) is how most readers search; this page exists because a search is an address you can send someone.

import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchRegular } from '@fluentui/react-icons';
import { loadSearch, search, type Result } from '../data';
import { Mark } from '../components/Mark';
import { PageHeader } from '../components/PageHeader';

const WHERE: Record<Result['where'], string> = {
	title: 'in the title',
	heading: 'in a heading',
	text: 'in the text'
};

export function SearchPage() {
	const [params, setParams] = useSearchParams();
	const query = params.get('q') ?? '';
	const [typed, setTyped] = React.useState(query);
	const [results, setResults] = React.useState<Result[] | undefined>(undefined);

	React.useEffect(() => {
		setTyped(query);
	}, [query]);

	React.useEffect(() => {
		let live = true;
		if (query.trim() === '') {
			setResults([]);
			return;
		}
		void loadSearch().then((index) => {
			if (live) {
				setResults(search(index, query));
			}
		});
		return () => {
			live = false;
		};
	}, [query]);

	React.useEffect(() => {
		document.title = query === '' ? 'Search · Temco Learn' : `${query} · Temco Learn`;
	}, [query]);

	return (
		<>
			<div className="hero">
				<p className="eyebrow">Temco Learn</p>
				<h1>Search</h1>
				<form
					className="bigsearch"
					role="search"
					onSubmit={(event) => {
						event.preventDefault();
						setParams(typed.trim() === '' ? {} : { q: typed.trim() });
					}}
				>
					<input
						type="search"
						value={typed}
						onChange={(event) => setTyped(event.target.value)}
						placeholder="Search every page…"
						aria-label="Search every page"
					/>
					<button type="submit" className="bigsearch__go">
					<SearchRegular aria-hidden="true" />
					Search
				</button>
				</form>
				{results === undefined || query === '' ? undefined : (
					<p className="lede">
						{results.length === 0 ? 'Nothing matches.' : `${results.length} ${results.length === 1 ? 'page' : 'pages'} match “${query}”.`}
					</p>
				)}
			</div>

			<div className="page">
				<PageHeader />
				<ul className="results">
					{(results ?? []).map((result) => (
						<li key={`${result.u}-${result.anchor ?? ''}`}>
							<Link className="result" to={result.u.replace(/^#/u, '')}>
								<span className="result__head">
									<span className="result__title">
										<Mark text={result.t} query={query} />
									</span>
									<span className="result__where">{WHERE[result.where]}</span>
								</span>
								<span className="result__meta">
									{result.pn} <span className="mono">{result.v}</span> · {result.s}
									{result.anchor === undefined ? '' : ` › ${result.anchor.replace(/-/gu, ' ')}`}
								</span>
								{result.x === '' ? undefined : (
									<p className="result__text">
										<Mark text={result.x} query={query} />
									</p>
								)}
							</Link>
						</li>
					))}
				</ul>
				{results !== undefined && results.length === 0 && query !== '' ? (
					<p className="empty">
						Nothing on the site matches “{query}”. Try fewer words: the index holds titles, headings and the first lines of every
						page. <kbd className="kbd">Ctrl K</kbd> searches the same index from anywhere.
					</p>
				) : undefined}
			</div>
		</>
	);
}
