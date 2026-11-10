// Where you are, and what this page can offer — inline, at the top of the content.
//
// Two of the actions are menus rather than fixed controls: the version switcher lists every version with its size and marks
// the newest, and Download lists every artefact the build actually produced — PDF, Windows Help, Markdown, HTML, ZIP — with
// the CHM only appearing when a `.chm` exists for this version.
//
// Search is deliberately absent: the masthead already has the one search on the site.

import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	ArchiveRegular,
	ArrowDownloadRegular,
	BookRegular,
	BugRegular,
	ChevronDownRegular,
	CopyRegular,
	DocumentPdfRegular,
	EditRegular,
	HistoryRegular,
	MoreHorizontalRegular,
	PrintRegular,
	TextDescriptionRegular
} from '@fluentui/react-icons';
import type { FluentIcon } from '@fluentui/react-icons';
import { useArtifacts } from '../artifacts';
import { useCatalog } from '../catalog';
import { describePage, downloads, switchVersion } from '../chrome';
import type { DownloadFile } from '../chrome';
import { hasChm, permalink, plural } from '../data';

/** The mark beside each artefact in the download menu, by what the file is rather than by its position in the list. */
const MARKS: Record<DownloadFile['kind'], FluentIcon> = {
	pdf: DocumentPdfRegular,
	chm: BookRegular,
	md: TextDescriptionRegular,
	zip: ArchiveRegular
};

const closeMenus = (): void => {
	for (const element of document.querySelectorAll<HTMLDetailsElement>('details.menu[open]')) {
		element.removeAttribute('open');
	}
};

export function PageHeader() {
	const catalog = useCatalog();
	const location = useLocation();
	const artifacts = useArtifacts();
	const [copied, setCopied] = React.useState(false);

	const info = React.useMemo(() => describePage(location.pathname, catalog), [location.pathname, catalog]);
	const chm = info.download === undefined ? false : hasChm(artifacts, info.download.project.id, info.download.version.version);
	const files = downloads(info, chm);
	const version = info.version;

	// A menu that survives a route change is a menu left open on top of the next page.
	React.useEffect(() => {
		closeMenus();
		setCopied(false);
	}, [location.pathname, location.hash]);

	React.useEffect(() => {
		const onPointer = (event: MouseEvent): void => {
			for (const element of document.querySelectorAll<HTMLDetailsElement>('details.menu[open]')) {
				if (event.target instanceof Node && !element.contains(event.target)) {
					element.removeAttribute('open');
				}
			}
		};
		document.addEventListener('click', onPointer);
		return () => document.removeEventListener('click', onPointer);
	}, []);

	const copyLink = (): void => {
		// `pathname` from the router is already inside the base, so the permalink adds only the published origin.
		const address = permalink(catalog, `${location.pathname}${location.hash}`);
		void navigator.clipboard
			?.writeText(address)
			.then(() => {
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1600);
			})
			.catch(() => {
				// A browser that refuses the clipboard still has the address in its own address bar.
			});
	};

	return (
		<div className="pagehead">
			<nav className="crumbs" aria-label="Breadcrumb">
				{info.crumbs.map((crumb, index) => (
					<React.Fragment key={`${crumb.label}-${String(index)}`}>
						{index === 0 ? undefined : (
							<span className="crumbs__sep" aria-hidden="true">
								›
							</span>
						)}
						{crumb.to === undefined ? (
							<span className="crumbs__here" aria-current="page">
								{crumb.label}
							</span>
						) : (
							<Link to={crumb.to} className={crumb.mono === true ? 'mono' : undefined}>
								{crumb.label}
							</Link>
						)}
					</React.Fragment>
				))}
			</nav>

			<div className="pagehead__actions">
				{version === undefined ? undefined : (
					<details className="menu">
						<summary className="pagehead__btn" aria-label={`Version ${version.current.version}`}>
							<span className="mono">{version.current.version}</span>
							{version.current.version === version.project.latest ? <span className="pill pill--latest">Latest</span> : undefined}
							<ChevronDownRegular aria-hidden="true" />
						</summary>
						<ul className="menu__list menu__list--versions">
							{version.project.versions.map((entry) => (
								<li key={entry.version}>
									<Link
										className="menu__item"
										to={switchVersion(version.project, version.page, entry)}
										aria-current={entry.version === version.current.version ? 'page' : undefined}
										onClick={closeMenus}
									>
										<span className="menu__label mono">{entry.version}</span>
										{entry.version === version.project.latest ? <span className="pill pill--latest">Latest</span> : undefined}
										<span className="menu__detail">{plural(entry.pages.length, 'page')}</span>
									</Link>
								</li>
							))}
						</ul>
					</details>
				)}

				{files.length === 0 ? undefined : (
					<details className="menu">
						<summary className="pagehead__btn">
							<ArrowDownloadRegular aria-hidden="true" />
							<span className="pagehead__label">Download</span>
							<ChevronDownRegular aria-hidden="true" />
						</summary>
						<ul className="menu__list menu__list--downloads">
							{files.map((file, index) => {
								const Mark = MARKS[file.kind];
								const startsSources = file.group === 'source' && files[index - 1]?.group === 'print';
								return (
									<React.Fragment key={file.href}>
										{startsSources ? <li className="menu__sep" role="separator" /> : undefined}
										<li>
											<a className="menu__item" href={file.href} download onClick={closeMenus}>
												<Mark className="menu__icon" aria-hidden="true" />
												<span className="menu__text">
													<span className="menu__label">{file.label}</span>
													<span className="menu__detail">{file.detail}</span>
												</span>
											</a>
										</li>
									</React.Fragment>
								);
							})}
						</ul>
					</details>
				)}

				{info.edit === undefined ? undefined : (
					<a className="pagehead__link" href={info.edit.url} target="_blank" rel="noopener noreferrer">
						<EditRegular aria-hidden="true" />
						<span className="pagehead__label">Edit this page</span>
					</a>
				)}

				<details className="menu">
					<summary className="iconbtn" aria-label="More actions" title="More actions">
						<MoreHorizontalRegular />
					</summary>
					<ul className="menu__list menu__list--more">
						<li>
							<button type="button" className="menu__item" onClick={copyLink}>
								<CopyRegular className="menu__icon" aria-hidden="true" />
								<span className="menu__label">{copied ? 'Link copied' : 'Copy link'}</span>
							</button>
						</li>
						{info.edit?.history === undefined ? undefined : (
							<li>
								<a className="menu__item" href={info.edit.history} target="_blank" rel="noopener noreferrer">
									<HistoryRegular className="menu__icon" aria-hidden="true" />
									<span className="menu__label">View history</span>
								</a>
							</li>
						)}
						{info.edit?.issue === undefined ? undefined : (
							<li>
								<a className="menu__item" href={info.edit.issue} target="_blank" rel="noopener noreferrer">
									<BugRegular className="menu__icon" aria-hidden="true" />
									<span className="menu__label">Report an issue</span>
								</a>
							</li>
						)}
						<li className="menu__sep" role="separator" />
						<li>
							<button type="button" className="menu__item" onClick={() => window.print()}>
								<PrintRegular className="menu__icon" aria-hidden="true" />
								<span className="menu__label">Print this page</span>
							</button>
						</li>
					</ul>
				</details>
			</div>
		</div>
	);
}
