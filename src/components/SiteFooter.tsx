// The foot of every page: who this is, where to go next, and how fresh the index is.
//
// The catalogue's own shape, laid out as a sitemap — brand, then Sections, Products and Resources — but compressed: the two
// long lists run in two columns so the whole footer is about three rows tall, and it sits on its own dark surface so it
// reads as an edge rather than as more page.

import { Link } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { formatDate, plural, repoFor } from '../data';

export function SiteFooter() {
	const catalog = useCatalog();
	const repo = repoFor(catalog);
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

				<nav className="foot__col" aria-label="Products">
					<p className="foot__head">Products</p>
					{catalog.projects.map((project) => (
						<Link key={project.id} to={`/${project.id}/`}>
							{project.title}
						</Link>
					))}
				</nav>

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
					{plural(catalog.projects.length, 'product')} · {plural(pages, 'page')} · {plural(catalog.sections.length, 'section')}
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
