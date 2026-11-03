// The print route: one version, or one page of it, laid out as a document rather than as a screen.
//
// `scripts/pdf.mts` loads this address in a headless browser and prints it; a reader can also open it and press Ctrl P. It
// renders on its own — no masthead, no rails, no feedback — so the only markup in the PDF is the guide itself.
//
// `body[data-print-ready]` is the signal the PDF script waits for: set only once the bodies have arrived, so a guide is
// never printed mid-load.

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { formatDate, loadBodies, plural } from '../data';
import type { CompiledPage } from '../model';
import { NotFound } from './NotFound';

export function Print() {
	const catalog = useCatalog();
	const { key, version, slug } = useParams();
	const project = catalog.projects.find((entry) => entry.id === key);
	const held = project?.versions.find((entry) => entry.version === version);

	const [bodies, setBodies] = React.useState<Record<string, CompiledPage>>({});
	const [ready, setReady] = React.useState(false);

	React.useEffect(() => {
		if (project === undefined || held === undefined) {
			return;
		}
		let live = true;
		void loadBodies(project.id, held.version).then((file) => {
			if (live) {
				setBodies(file.pages);
				setReady(true);
			}
		});
		return () => {
			live = false;
		};
	}, [project, held]);

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
		if (!ready) {
			return;
		}
		document.body.dataset.printReady = 'true';
		return () => {
			delete document.body.dataset.printReady;
		};
	}, [ready]);

	if (project === undefined || held === undefined) {
		return <NotFound what={key} />;
	}

	const chosen = slug === undefined ? held.pages.filter((page) => page.kind === 'md') : held.pages.filter((page) => page.href === slug);
	const pages = chosen.filter((page) => page.kind === 'md');
	const single = slug !== undefined;

	return (
		<div className="print">
			<div className="print__cover">
				<p className="eyebrow">Temco Learn</p>
				<h1>{project.title}</h1>
				<p className="lede">
					{single ? pages[0]?.title ?? held.version : `${held.version} · ${plural(pages.length, 'page')}`}
					{held.builtAt === undefined ? '' : ` · built ${formatDate(held.builtAt)}`}
				</p>
				{single || pages.length === 0 ? undefined : (
					<ol className="print__list">
						{pages.map((page) => (
							<li key={page.href}>{page.title}</li>
						))}
					</ol>
				)}
			</div>

			{pages.map((page) => (
				<section className="print__page" key={page.href}>
					<h1>{page.title}</h1>
					{page.description === undefined ? undefined : <p className="article__desc">{page.description}</p>}
					{bodies[page.href] === undefined ? undefined : (
						<div className="prose" dangerouslySetInnerHTML={{ __html: bodies[page.href]?.html ?? '' }} />
					)}
				</section>
			))}
		</div>
	);
}
