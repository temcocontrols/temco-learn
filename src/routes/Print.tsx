// The print route: one version, or one page of it, laid out as a document rather than as a screen.
//
// `scripts/pdf.mts` loads this address in a headless browser and prints it; a reader can also open it and press Ctrl P. It
// renders on its own — no masthead, no rails, no feedback — so the only markup in the PDF is the guide itself.
//
// A page authored here arrives as Markdown already compiled into HTML. A page written by a project's own build arrives as
// a document of its own, shown in an iframe on screen — and printing prints the app, not a frame — so its body is fetched
// here and laid in as markup. Both kinds end up as the same `<section>`, which is what makes one guide out of two kinds
// of page.
//
// `body[data-print-ready]` is the signal the PDF script waits for: set only once every body has arrived and every image
// inside it has loaded, so a guide is never printed mid-load.

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { formatDate, loadBodies, plural } from '../data';
import { readBuildPage } from '../imported';
import { NotFound } from './NotFound';

/** One page of the guide, as it should appear on paper. */
interface Printed {
	href: string;
	title: string;
	description?: string;
	/** The body: Markdown compiled by `scripts/catalog.mts`, or a build page's own `<main>`, cleaned for print. */
	html: string;
}

export function Print() {
	const catalog = useCatalog();
	const { key, version, '*': rest } = useParams();
	/** The page's own address inside the version, when one was asked for: a guide is printed when it is not. */
	const slug = rest === undefined || rest === '' ? undefined : rest;
	const project = catalog.projects.find((entry) => entry.id === key);
	const held = project?.versions.find((entry) => entry.version === version);

	const [printed, setPrinted] = React.useState<Printed[] | undefined>(undefined);

	React.useEffect(() => {
		if (project === undefined || held === undefined) {
			return;
		}
		const chosen = slug === undefined ? held.pages : held.pages.filter((page) => page.href === slug);
		let live = true;
		setPrinted(undefined);
		void (async () => {
			const bodies = chosen.some((page) => page.kind === 'md') ? (await loadBodies(project.id, held.version)).pages : {};
			const pages = await Promise.all(
				chosen.map(
					async (page): Promise<Printed> => ({
						href: page.href,
						title: page.title,
						description: page.description,
						html:
							page.kind === 'md'
								? (bodies[page.href]?.html ?? '')
								: await importedBody(project.id, held.version, page.href)
					})
				)
			);
			if (live) {
				setPrinted(pages);
			}
		})();
		return () => {
			live = false;
		};
	}, [project, held, slug]);

	// A printed guide is black on white whatever the reader chose for the screen.
	React.useEffect(() => {
		const previous = document.documentElement.dataset.theme;
		document.documentElement.dataset.theme = 'light';
		document.documentElement.dataset.embed = 'false';
		return () => {
			if (previous === undefined) {
				delete document.documentElement.dataset.theme;
			} else {
				document.documentElement.dataset.theme = previous;
			}
		};
	}, []);

	React.useEffect(() => {
		if (printed === undefined) {
			return;
		}
		let live = true;
		void Promise.race([imagesSettled(document.querySelector('.print')), delay(IMAGE_WAIT_MS)]).then(() => {
			if (live) {
				document.body.dataset.printReady = 'true';
			}
		});
		return () => {
			live = false;
			delete document.body.dataset.printReady;
		};
	}, [printed]);

	if (project === undefined || held === undefined) {
		return <NotFound what={key} />;
	}

	const single = slug !== undefined;

	return (
		<div className="print">
			<div className="print__cover">
				<p className="eyebrow">Temco Learn</p>
				<h1>{project.title}</h1>
				<p className="lede">
					{single ? (printed?.[0]?.title ?? held.version) : `${held.version} · ${plural(printed?.length ?? 0, 'page')}`}
					{held.builtAt === undefined ? '' : ` · built ${formatDate(held.builtAt)}`}
				</p>
				{single || printed === undefined || printed.length === 0 ? undefined : (
					<ol className="print__list">
						{printed.map((page) => (
							<li key={page.href}>{page.title}</li>
						))}
					</ol>
				)}
			</div>

			{printed?.map((page) => (
				<section className="print__page" key={page.href}>
					<h1>{page.title}</h1>
					{page.description === undefined ? undefined : <p className="article__desc">{page.description}</p>}
					{page.html === '' ? undefined : <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />}
				</section>
			))}
		</div>
	);
}

async function importedBody(project: string, version: string, href: string): Promise<string> {
	return (await readBuildPage(project, version, href)).html;
}

/** Waits for every image under `root` to load or fail, so nothing is printed half-drawn. */
async function imagesSettled(root: Element | null): Promise<void> {
	if (root === null) {
		return;
	}
	await Promise.all(
		Array.from(root.querySelectorAll('img')).map((image) =>
			image.complete
				? Promise.resolve()
				: new Promise<void>((resolve) => {
						image.addEventListener('load', () => resolve(), { once: true });
						image.addEventListener('error', () => resolve(), { once: true });
					})
		)
	);
}

/**
 * How long the flag waits for images before it is set anyway.
 *
 * A guide the length of a manual is printed for the reader, not for the network: a picture that will not load must delay
 * the guide by its own moment and no longer.
 */
const IMAGE_WAIT_MS = 30000;

const delay = (ms: number): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, ms));
