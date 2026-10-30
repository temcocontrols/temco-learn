// The frame every screen sits in: one bar, one footer, and a search field that goes to a page of results.

import * as React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import { DismissRegular, SearchRegular, WeatherMoonRegular, WeatherSunnyRegular } from '@fluentui/react-icons';
import { useCatalog } from '../catalog';
import { applyScheme, type Scheme } from '../theme';

function SearchBox() {
	const navigate = useNavigate();
	const [query, setQuery] = React.useState('');

	return (
		<form
			className="bar__search"
			role="search"
			onSubmit={(event) => {
				event.preventDefault();
				const trimmed = query.trim();
				if (trimmed !== '') {
					navigate(`/search?q=${encodeURIComponent(trimmed)}`);
				}
			}}
		>
			<SearchRegular aria-hidden="true" />
			<input
				type="search"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				placeholder="Search everything…"
				aria-label="Search everything"
			/>
			{query === '' ? undefined : (
				<Button appearance="transparent" size="small" icon={<DismissRegular />} aria-label="Clear the search" onClick={() => setQuery('')} />
			)}
		</form>
	);
}

export function Shell({ scheme, onScheme }: { scheme: Scheme; onScheme: (scheme: Scheme) => void }) {
	const catalog = useCatalog();
	const location = useLocation();

	// A project belongs to a section even though its address does not say so, so the tab is lit from the catalog rather than
	// from the path: `/#/t3000/` lights Documentation because that is where Test1 is listed.
	const first = location.pathname.split('/').filter((part) => part !== '')[0];
	const activeSection = first === undefined ? undefined : catalog.projects.find((project) => project.id === first)?.section ?? first;

	return (
		<div className="shell">
			<header className="bar">
				<div className="bar__inner">
					<Link className="brand" to="/">
						<span className="brand__mark" aria-hidden="true">
							T
						</span>
						<span>Temco Learn</span>
					</Link>
					<nav className="tabs" aria-label="Sections">
						{catalog.sections.map((section) => (
							<Link key={section.id} className="tab" to={`/${section.id}`} aria-current={section.id === activeSection ? 'page' : undefined}>
								{section.title}
							</Link>
						))}
					</nav>
					<SearchBox />
					<Button
						appearance="transparent"
						size="small"
						icon={scheme === 'dark' ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
						aria-label={scheme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'}
						onClick={() => {
							const next: Scheme = scheme === 'dark' ? 'light' : 'dark';
							applyScheme(next);
							onScheme(next);
						}}
					/>
				</div>
			</header>
			<main className="main">
				<Outlet />
			</main>
			<footer className="foot">
				<span>Temco Learn · Temco Controls</span>
				<span className="foot__spacer" />
				<a href="https://forums.temcocontrols.com/" rel="noopener noreferrer">
					Forum
				</a>
				<a href="https://github.com/temcocontrols" rel="noopener noreferrer">
					GitHub
				</a>
			</footer>
		</div>
	);
}