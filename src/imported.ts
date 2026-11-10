// One page of an imported build, ready to show in the reader.
//
// A build page is a document of its own: a complete HTML file with its own stylesheet, its own sidebar and its own pager.
// Put in an iframe it becomes a window inside the page — a second scroll bar, a height that has to be measured and
// guessed at, and a page that is not really part of this site. So it is read here instead and handed over as what it
// is: an article. The furniture a reader of Temco Learn already has is taken out, every picture is asked for by its
// absolute address, and every link to another page of the same build becomes a route of this app — so a click stays
// inside the site, with the rail, the pager and the contents column all still working.

import { siteBase } from './data';

export interface BuildPage {
	/** The body, ready for `dangerouslySetInnerHTML`. */
	html: string;
	/** What the right-hand column lists: the page's own second and third level headings. */
	headings: { id: string; text: string; level: number }[];
}

/** Where one page of a build is served from. */
export function buildPageUrl(project: string, version: string, href: string): string {
	return `${siteBase}imported/${encodeURIComponent(project)}/${encodeURIComponent(version)}/${href}`;
}

export async function readBuildPage(project: string, version: string, href: string): Promise<BuildPage> {
	const address = buildPageUrl(project, version, href);
	try {
		const response = await fetch(address, { cache: 'no-store' });
		if (!response.ok) {
			return { html: '', headings: [] };
		}
		const document_ = new DOMParser().parseFromString(await response.text(), 'text/html');
		const main = document_.querySelector('main') ?? document_.body;
		if (main === null) {
			return { html: '', headings: [] };
		}
		for (const removed of main.querySelectorAll('nav, header, footer, script, style, link, h1, .applies')) {
			removed.remove();
		}

		const at = new URL(address, window.location.href);
		const root = buildPageUrl(project, version, '');
		for (const held of main.querySelectorAll('img[src], source[src], video[poster]')) {
			const poster = held.getAttribute('poster');
			const value = poster ?? held.getAttribute('src') ?? '';
			held.setAttribute(poster === null ? 'src' : 'poster', new URL(value, at).toString());
		}
		for (const anchor of main.querySelectorAll('a[href]')) {
			const value = anchor.getAttribute('href') ?? '';
			if (value.startsWith('#')) {
				continue;
			}
			const resolved = new URL(value, at);
			if (!/\.html?$/iu.test(value)) {
				anchor.setAttribute('href', resolved.toString());
				continue;
			}
			// Another page of this build: hand it to the router, so the rail stays and the address stays this site's.
			const inside = resolved.toString().startsWith(root) ? resolved.toString().slice(root.length) : undefined;
			anchor.setAttribute('href', inside === undefined ? resolved.toString() : `/${project}/${encodeURIComponent(version)}/${inside}`);
		}

		const headings = [...main.querySelectorAll('h2, h3')]
			.map((heading) => ({
				id: heading.id,
				text: (heading.textContent ?? '').replace(/#$/u, '').trim(),
				level: Number(heading.tagName.slice(1))
			}))
			.filter((heading) => heading.id !== '' && heading.text !== '');
		return { html: main.innerHTML, headings };
	} catch {
		return { html: '', headings: [] };
	}
}
