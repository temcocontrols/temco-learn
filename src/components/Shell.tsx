// The frame every screen sits in: one sticky masthead, the page's own content, the foot, and the command palette.
//
// There used to be a second sticky row under this one — breadcrumbs and page actions. It is gone: the trail now lives at the
// top of the content it describes (`PageHeader`), and search lives only here. One bar that follows the reader is enough.
//
// Embedded, the masthead stands down: the platform already shows a header, and two headers stacked is how a documentation
// site starts to feel like a page inside a page. A host that wants the navigation — the platform's preview pane, whose own
// bar has Reload and Stop but no sections — asks for it back with `?embed=0`.

import * as React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { OpenRegular, SearchRegular, WeatherMoonRegular, WeatherSunnyRegular } from '@fluentui/react-icons';
import { useCatalog } from '../catalog';
import { applyScheme, type Scheme } from '../theme';
import { SearchOverlay } from './SearchOverlay';
import { SiteFooter } from './SiteFooter';

const isEmbedded = (): boolean => {
	try {
		const asked = new URLSearchParams(window.location.search).get('embed');
		if (asked === '1') {
			return true;
		}
		if (asked === '0') {
			return false;
		}
		return window.self !== window.top;
	} catch {
		return false;
	}
};

// T3000 shows this site in a WebView2 window, which has no address bar of its own. Hosting apps expose
// `window.chrome.webview`; when it is there, the masthead offers "View online" so the reader can hand the
// page they are looking at to their real browser (printing, sharing, a URL to copy).
const insideWebViewHost = (): boolean => {
	try {
		const host = (window as unknown as { chrome?: { webview?: unknown } }).chrome;
		return Boolean(host?.webview);
	} catch {
		return false;
	}
};

/** Where this site is published; a local build links here. */
const PUBLISHED_SITE = 'https://temcocontrols.github.io/temco-learn/';

const onPublishedSite = (): boolean => window.location.hostname.endsWith('github.io');

// Shown inside the T3000 window, and on a local build (preview server, `dist`, dev server) where "online" is a
// different place. On the published site there is nothing to hand over, so the control is not rendered at all.
const showViewOnline = (): boolean => insideWebViewHost() || !onPublishedSite();

// Inside T3000 the site *is* the published one, so the same address goes to the browser. On a local build the
// equivalent published page is worked out from the route, with this deployment's base stripped off first.
const viewOnlineHref = (): string => {
	const here = window.location;
	if (onPublishedSite()) {
		return here.href;
	}
	const base = import.meta.env.BASE_URL || '/';
	const path = here.pathname.startsWith(base) ? here.pathname.slice(base.length) : here.pathname.replace(/^\/+/, '');
	return `${PUBLISHED_SITE}${path}${here.search}${here.hash}`;
};

export function Shell({ scheme, onScheme }: { scheme: Scheme; onScheme: (scheme: Scheme) => void }) {
	const catalog = useCatalog();
	const location = useLocation();
	const [scrolled, setScrolled] = React.useState(false);
	const [searching, setSearching] = React.useState(false);
	const [insideHost] = React.useState(showViewOnline);

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
	// from the path: `/t3000/` lights Documentation because the catalog says that project belongs there.
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
						<span className="brand__name">T3000 Help</span>
					</Link>
					<nav className="tabs" aria-label="Sections">
						{catalog.sections.map((section) => (
							<Link key={section.id} className="tab" to={`/${section.id}`} aria-current={section.id === activeSection ? 'page' : undefined}>
								{section.title}
							</Link>
						))}
					</nav>
					<div className="mast__tools">
						{insideHost ? (
							<a
								className="viewonline"
								href={viewOnlineHref()}
								target="_blank"
								rel="noreferrer"
								title="Open this page in your default browser"
							>
								<span className="viewonline__label">View online</span>
								<OpenRegular aria-hidden="true" />
							</a>
						) : null}
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
