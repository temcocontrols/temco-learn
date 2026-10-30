// Search: the results page the bar sends you to, driven by the index the build generated.

import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { loadSearch, search, type Result } from '../data';

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
					role="search"
					style={{ marginTop: 16, display: 'flex', gap: 8, maxWidth: 640 }}
					onSubmit={(event) => {
						event.preventDefault();
						setParams(typed.trim() === '' ? {} : { q: typed.trim() });
					}}
				>
					<input
						type="search"
						value={typed}
						onChange={(event) => setTyped(event.target.value)}
						placeholder="Search everything…"
						aria-label="Search everything"
						style={{ flex: 1, height: 38, padding: '0 12px', borderRadius: 6, border: '1px solid var(--line)', font: 'inherit' }}
					/>
					<button type="submit" style={{ height: 38, padding: '0 18px', borderRadius: 6, border: 0, background: 'var(--colorBrandBackground, #0078d4)', color: '#fff', font: 'inherit', cursor: 'pointer' }}>
						Search
					</button>
				</form>
				{results === undefined || query === '' ? undefined : (
					<p className="lede" style={{ marginTop: 12, fontSize: 14 }}>
						{results.length === 0 ? 'Nothing matches.' : `${results.length} ${results.length === 1 ? 'page' : 'pages'} match “${query}”.`}
					</p>
				)}
			</div>
			<div className="page">
				<ul className="results">
					{(results ?? []).map((result) => (
						<li key={result.u}>
							<Link className="result" to={result.u}>
								<span className="result__head">
									<span className="result__title">{result.t}</span>
									<span className="result__where">{WHERE[result.where]}</span>
								</span>
								<span className="result__meta">
									{result.pn} <span className="mono">{result.v}</span> · {result.s}
								</span>
								{result.x === '' ? undefined : <p className="result__text">{result.x}</p>}
							</Link>
						</li>
					))}
				</ul>
				{results !== undefined && results.length === 0 && query !== '' ? (
					<p className="empty">
						Nothing on the site matches “{query}”. Try fewer words: the index holds titles, headings and the first lines of every
						page.
					</p>
				) : undefined}
			</div>
		</>
	);
}