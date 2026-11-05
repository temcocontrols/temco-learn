// Fluent's neutral theme, seeded with Microsoft Azure's brand — the same pair Microsoft Learn reads in.
//
// Nothing is invented: Fluent supplies every control's look and every colour token, Azure supplies the blue, and Segoe
// supplies the face. A second theme is the same tokens in dark, so the toggle never changes layout.
//
// Fluent's own type tokens are px strings, so they ignore the root font size. They are re-declared here at the site's
// chrome size (12px) — otherwise a Fluent button would sit at 14px beside a 12px tab and the density would look broken.

import { webDarkTheme, webLightTheme, type Theme } from '@fluentui/react-theme';

const AZURE = '#0078d4';

function seeded(theme: Theme): Theme {
	return {
		...theme,
		fontFamilyBase: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, sans-serif",
		fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Consolas, monospace',
		fontSizeBase100: '10px',
		fontSizeBase200: '11px',
		fontSizeBase300: '12px',
		fontSizeBase400: '14px',
		fontSizeBase500: '16px',
		fontSizeBase600: '18px',
		lineHeightBase200: '14px',
		lineHeightBase300: '16px',
		colorBrandBackground: AZURE,
		colorBrandBackgroundHover: '#106ebe',
		colorBrandBackgroundPressed: '#005a9e',
		colorBrandBackgroundSelected: '#005a9e',
		colorBrandForeground1: AZURE,
		colorBrandForeground2: '#106ebe',
		colorBrandForegroundLink: '#0067b8',
		colorBrandForegroundLinkHover: '#005a9e',
		colorCompoundBrandBackground: AZURE,
		colorCompoundBrandBackgroundHover: '#106ebe',
		colorCompoundBrandStroke: AZURE
	};
}


export const lightTheme = seeded(webLightTheme);
export const darkTheme = seeded(webDarkTheme);

export type Scheme = 'light' | 'dark';

const KEY = 'temco-learn-theme';

/** The scheme the document is already wearing: `index.html` sets it before the bundle so there is no white flash. */
export function currentScheme(): Scheme {
	return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyScheme(scheme: Scheme): void {
	document.documentElement.dataset.theme = scheme;
	try {
		localStorage.setItem(KEY, scheme);
	} catch {
		// A browser with storage turned off still gets the toggle: it just does not remember it.
	}
}

export const themeFor = (scheme: Scheme): Theme => (scheme === 'dark' ? darkTheme : lightTheme);

