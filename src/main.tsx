// The app: one provider stack, one router, and the six screens behind it.

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { FluentProvider } from '@fluentui/react-components';
import { CatalogProvider } from './catalog';
import { Shell } from './components/Shell';
import { Article } from './routes/Article';
import { Browse } from './routes/Browse';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';
import { SearchPage } from './routes/SearchPage';
import { VersionPage } from './routes/VersionPage';
import { currentScheme, themeFor, type Scheme } from './theme';
import './styles.css';

function App() {
	const [scheme, setScheme] = React.useState<Scheme>(() => currentScheme());

	return (
		<FluentProvider theme={themeFor(scheme)}>
			<CatalogProvider>
				<HashRouter>
					<Routes>
						<Route element={<Shell scheme={scheme} onScheme={setScheme} />}>
							<Route index element={<Home />} />
							<Route path="search" element={<SearchPage />} />
							<Route path=":key" element={<Browse />} />
							<Route path=":key/:version" element={<VersionPage />} />
							<Route path=":key/:version/:slug" element={<Article />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</HashRouter>
			</CatalogProvider>
		</FluentProvider>
	);
}

const host = document.getElementById('root');
if (host === null) {
	throw new Error('index.html has no #root to mount the site in.');
}
createRoot(host).render(<App />);