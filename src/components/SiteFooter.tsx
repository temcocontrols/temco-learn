// The foot of every page: who this is, where to go next, and how fresh the index is.
//
// The catalogue's own shape, laid out as a sitemap — brand, then Sections, Products and Resources — but compressed: the two
// long lists run in two columns so the whole footer is about three rows tall, and it sits on its own dark surface so it
// reads as an edge rather than as more page.
//
// The guides list is cut after the first few and finished with a Show-all control. Sixteen links in one column made the
// footer five hundred pixels tall, which is a page of its own at the bottom of every page; the control is what keeps the
// footer an edge while leaving every guide one click away.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { formatDate, plural, repoFor } from '../data';

/** How many guides the footer shows before the control — one column, so the list stays level with the brand block. */
const FOOTER_GUIDES = 5;

export function SiteFooter() {
	const catalog = useCatalog();
	const repo = repoFor(catalog);
	const [allGuides, setAllGuides] = useState(false);
	const guides = allGuides ? catalog.projects : catalog.projects.slice(0, FOOTER_GUIDES);
	const pages = catalog.projects.reduce(
		(total, project) => total + project.versions.reduce((count, version) => count + version.pages.length, 0),
		0
	);

	return (
		<footer className="foot">
			<div className="foot__inner">
				<div className="foot__brand">
					<Link className="brand" to="/">
						<span className="brand__mark" aria-hidden="true">
							T
						</span>
						<span className="brand__name">Temco Learn</span>
					</Link>
					<p className="foot__tag">Guides, references and commissioning checks for every Temco product.</p>
				</div>

				<nav className="foot__col foot__col--split" aria-label="Sections">
					<p className="foot__head">Sections</p>
					{catalog.sections.map((section) => (
						<Link key={section.id} to={`/${section.id}`}>
							{section.title}
						</Link>
					))}
				</nav>

				<div className="foot__col">
					<p className="foot__head">Guides</p>
					<div className="foot__lists" id="foot-guides">
						{guides.map((project) => (
							<Link key={project.id} to={`/${project.id}/`}>
								{project.title}
							</Link>
						))}
					</div>
					<button
						type="button"
						className="foot__more"
						aria-expanded={allGuides}
						aria-controls="foot-guides"
						onClick={() => setAllGuides(!allGuides)}
					>
						{allGuides ? 'Show fewer' : `Show all ${plural(catalog.projects.length, 'guide')}`}
					</button>
				</div>

				<nav className="foot__col foot__col--split" aria-label="Resources">
					<p className="foot__head">Resources</p>
					<a href="https://forums.temcocontrols.com/" rel="noopener noreferrer">
						Forum
					</a>
					{repo === undefined ? undefined : (
						<>
							<a href={repo.repository} rel="noopener noreferrer">
								Repository
							</a>
							<a href={`${repo.repository}/issues/new`} rel="noopener noreferrer">
								Report an issue
							</a>
							<a href={`${repo.repository}/edit/${repo.branch}/README.md`} rel="noopener noreferrer">
								Edit this site
							</a>
						</>
					)}
					<a href="https://github.com/temcocontrols" rel="noopener noreferrer">
						GitHub
					</a>
				</nav>
			</div>

			<div className="foot__base">
				<span>© {new Date().getFullYear()} Temco Controls</span>
				<span className="foot__dot" aria-hidden="true">
					·
				</span>
				<span>
					{plural(catalog.projects.length, 'guide')} · {plural(pages, 'page')} · {plural(catalog.sections.length, 'section')}
				</span>
				<span className="foot__spacer" />
				<span>Index built {formatDate(catalog.generated)}</span>
				<button
					type="button"
					className="foot__top"
					onClick={() => {
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}
				>
					Back to top ↑
				</button>
			</div>
		</footer>
	);
}
