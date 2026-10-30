// Where the catalog is read once, and how every screen asks for it.
//
// A screen that fetched the catalog itself would fetch it per route change; this provider fetches it once and hands the
// same object to the shell and to every page, so the tabs and the content can never disagree.

import * as React from 'react';
import { loadCatalog } from './data';
import type { Catalog } from './model';

const CatalogContext = React.createContext<Catalog | undefined>(undefined);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
	const [catalog, setCatalog] = React.useState<Catalog | undefined>(undefined);

	React.useEffect(() => {
		let live = true;
		void loadCatalog().then((loaded) => {
			if (live) {
				setCatalog(loaded);
			}
		});
		return () => {
			live = false;
		};
	}, []);

	if (catalog === undefined) {
		return (
			<div className="page">
				<p className="empty">Loading the documentation…</p>
			</div>
		);
	}
	return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): Catalog {
	const catalog = React.useContext(CatalogContext);
	if (catalog === undefined) {
		throw new Error('useCatalog was called outside the catalog provider.');
	}
	return catalog;
}
