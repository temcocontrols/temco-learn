// The command palette: everything on the site, one keystroke away.
//
// The results page still exists at `#/search?q=…` — it is an address a reader can share — but this is how the site is
// actually searched: Ctrl K, type, arrow, Enter. The index is the same file the page uses, fetched once.

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DismissRegular, SearchRegular } from '@fluentui/react-icons';
import { loadSearch, search, type Result } from '../data';
import { Mark } from './Mark';

const RECENT_KEY = 'temco-learn-recent';
const RECENT_MAX = 5;

const WHERE: Record<Result['where'], string> = {
	title: 'title',
	heading: 'heading',
	text: 'text'
};

function recent(): string[] {
	try {
		const stored = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') as unknown;
		return Array.isArray(stored) ? stored.filter((entry): entry is string => typeof entry === 'string').slice(0, RECENT_MAX) : [];
	} catch {
		return [];
	}
}

function remember(query: string): void {
	const trimmed = query.trim();
	if (trimmed === '') {
		return;
	}
	try {
		const kept = [trimmed, ...recent().filter((entry) => entry !== trimmed)].slice(0, RECENT_MAX);
		localStorage.setItem(RECENT_KEY, JSON.stringify(kept));
	} catch {
		// A private window keeps its recents for this visit only; nothing else depends on it.
	}
}

/** `#/t3000/1.0/ports` is the index's address; the router wants the path without the `#`. */
const routeOf = (url: string): string => (url.startsWith('#') ? url.slice(1) : url);

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
	const navigate = useNavigate();
	const [query, setQuery] = React.useState('');
	const [results, setResults] = React.useState<Result[]>([]);
	const [active, setActive] = React.useState(0);
	const [recents, setRecents] = React.useState<string[]>(() => recent());
	const input = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (!open) {
			return;
		}
		setQuery('');
		setActive(0);
		setRecents(recent());
		const timer = window.setTimeout(() => input.current?.focus(), 0);
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			window.clearTimeout(timer);
			document.body.style.overflow = previous;
		};
	}, [open]);

	React.useEffect(() => {
		if (!open) {
			return;
		}
		const trimmed = query.trim();
		if (trimmed === '') {
			setResults([]);
			return;
		}
		let live = true;
		const timer = window.setTimeout(() => {
			void loadSearch().then((index) => {
				if (live) {
					setResults(search(index, trimmed));
					setActive(0);
				}
			});
		}, 120);
		return () => {
			live = false;
			window.clearTimeout(timer);
		};
	}, [query, open]);

	const go = React.useCallback(
		(result: Result) => {
			remember(query);
			onClose();
			// The anchor travels in router state rather than in the address: a HashRouter address has one hash already.
			navigate(routeOf(result.u), result.anchor === undefined ? undefined : { state: { anchor: result.anchor } });
		},
		[navigate, onClose, query]
	);

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			setActive((at) => Math.min(results.length - 1, at + 1));
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			setActive((at) => Math.max(0, at - 1));
		} else if (event.key === 'Enter') {
			const picked = results[active];
			if (picked !== undefined) {
				event.preventDefault();
				go(picked);
			}
		} else if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
		}
	};

	const groups = React.useMemo(() => {
		const byProject = new Map<string, Result[]>();
		for (const result of results) {
			const held = byProject.get(result.pn);
			if (held === undefined) {
				byProject.set(result.pn, [result]);
			} else {
				held.push(result);
			}
		}
		return [...byProject.entries()];
	}, [results]);

	if (!open) {
		return null;
	}

	let at = -1;

	return (
		<div className="omni">
			<div className="omni__scrim" onClick={onClose} />
			<div className="omni__panel" role="dialog" aria-modal="true" aria-label="Search everything">
				<div className="omni__head">
					<SearchRegular aria-hidden="true" />
					<input
						ref={input}
						className="omni__input"
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						onKeyDown={onKeyDown}
						placeholder="Search titles, headings and page text…"
						aria-label="Search everything"
					/>
					<button className="iconbtn" type="button" onClick={onClose} aria-label="Close search">
						<DismissRegular />
					</button>
				</div>

				<div className="omni__body">
					{query.trim() === '' ? (
						recents.length === 0 ? (
							<p className="omni__empty">Type to search every page, heading and paragraph on the site.</p>
						) : (
							<div className="omni__recent">
								<p className="omni__groupname">Recent searches</p>
								<div className="hints">
									{recents.map((entry) => (
										<button key={entry} type="button" onClick={() => setQuery(entry)}>
											{entry}
										</button>
									))}
								</div>
							</div>
						)
					) : results.length === 0 ? (
						<p className="omni__empty">Nothing matches “{query.trim()}”. Try fewer words.</p>
					) : (
						groups.map(([project, held]) => (
							<div key={project}>
								<p className="omni__groupname">{project}</p>
								<ul className="omni__list">
									{held.map((result) => {
										at += 1;
										const index = at;
										return (
											<li key={`${result.u}-${result.anchor ?? ''}`}>
												<button
													type="button"
													className="omni__item"
													aria-selected={index === active}
													onMouseEnter={() => setActive(index)}
													onClick={() => go(result)}
												>
													<span className="omni__title">
														<Mark text={result.t} query={query} />
													</span>
													<span className="omni__where">
														<span className="mono">{result.v}</span> · {WHERE[result.where]}
														{result.anchor === undefined ? '' : ` › ${result.anchor.replace(/-/gu, ' ')}`}
													</span>
													<span className="omni__snippet">
														<Mark text={result.x} query={query} />
													</span>
												</button>
											</li>
										);
									})}
								</ul>
							</div>
						))
					)}
				</div>

				<div className="omni__foot">
					<span>
						<kbd className="kbd">↑</kbd>
						<kbd className="kbd">↓</kbd> move
					</span>
					<span>
						<kbd className="kbd">↵</kbd> open
					</span>
					<span>
						<kbd className="kbd">esc</kbd> close
					</span>
					<span className="omni__count">{results.length === 0 ? '' : `${results.length} ${results.length === 1 ? 'page' : 'pages'}`}</span>
				</div>
			</div>
		</div>
	);
}
