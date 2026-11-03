// The frame every screen sits in: one sticky masthead, the page's own content, the foot, and the command palette.
//
// There used to be a second sticky row under this one — breadcrumbs and page actions. It is gone: the trail now lives at the
// top of the content it describes (`PageHeader`), and search lives only here. One bar that follows the reader is enough.
//
// Embedded, the masthead stands down: the platform already shows a header, and two headers stacked is how a documentation
// site starts to feel like a page inside a page.

import * as React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SearchRegular, WeatherMoonRegular, WeatherSunnyRegular } from '@fluentui/react-icons';
import { useCatalog } from '../catalog';
import { applyScheme, type Scheme } from '../theme';
import { SearchOverlay } from './SearchOverlay';
import { SiteFooter } from './SiteFooter';

const isEmbedded = (): boolean => {
	try {
		return new URLSearchParams(window.location.search).get('embed') === '1' || window.self !== window.top;
	} catch {
		return false;
	}
};

export function Shell({ scheme, onScheme }: { scheme: Scheme; onScheme: (scheme: Scheme) => void }) {
	const catalog = useCatalog();
	const location = useLocation();
	const [scrolled, setScrolled] = React.useState(false);
	const [searching, setSearching] = React.useState(false);

	React.useEffect(() => {
		document.documentElement.dataset.embed = isEmbedded() ? 'true' : 'false';
	}, []);

	// A host that frames the site needs to know how tall it became, or it shows a scrollbar inside a scrollbar.
	React.useEffect(() => {
		if (document.documentElement.dataset.embed !== 'true') {
			return;
		}
		const post = (): void => {
			window.parent.postMessage({ type: 'temco-learn:height', height: document.documentElement.scrollHeight }, '*');
		};
		post();
		const observer = new ResizeObserver(post);
		observer.observe(document.body);
		window.addEventListener('resize', post);
		return () => {
			observer.disconnect();
			window.removeEventListener('resize', post);
		};
	}, []);

	React.useEffect(() => {
		const onScroll = (): void => setScrolled(window.scrollY > 4);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	React.useEffect(() => {
		const onKey = (event: KeyboardEvent): void => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				setSearching(true);
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	// A project belongs to a section even though its address does not say so, so the tab is lit from the catalog rather than
	// from the path: `/t3000/` lights Documentation because that is where Test1 is listed.
	const first = location.pathname.split('/').filter((part) => part !== '')[0];
	const activeSection = first === undefined ? undefined : catalog.projects.find((project) => project.id === first)?.section ?? first;

	return (
		<div className="shell" data-scrolled={scrolled ? 'true' : 'false'}>
			<button
				type="button"
				className="skip"
				onClick={() => {
					const main = document.getElementById('main');
					main?.focus();
					main?.scrollIntoView();
				}}
			>
				Skip to content
			</button>

			<header className="mast">
				<div className="mast__inner">
					<Link className="brand" to="/">
						<span className="brand__mark" aria-hidden="true">
							T
						</span>
						<span className="brand__name">Temco Learn</span>
					</Link>
					<nav className="tabs" aria-label="Sections">
						{catalog.sections.map((section) => (
							<Link key={section.id} className="tab" to={`/${section.id}`} aria-current={section.id === activeSection ? 'page' : undefined}>
								{section.title}
							</Link>
						))}
					</nav>
					<div className="mast__tools">
						<button type="button" className="searchbtn" onClick={() => setSearching(true)} aria-keyshortcuts="Control+K">
							<SearchRegular aria-hidden="true" />
							<span className="searchbtn__label">Search everything…</span>
							<span className="kbd">Ctrl K</span>
						</button>
						<button
							type="button"
							className="iconbtn"
							aria-label={scheme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'}
							onClick={() => {
								const next: Scheme = scheme === 'dark' ? 'light' : 'dark';
								applyScheme(next);
								onScheme(next);
							}}
						>
							{scheme === 'dark' ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
						</button>
					</div>
				</div>
			</header>

			<main className="main" id="main" tabIndex={-1}>
				<Outlet />
			</main>

			<SiteFooter />

			<SearchOverlay open={searching} onClose={() => setSearching(false)} />
		</div>
	);
}
