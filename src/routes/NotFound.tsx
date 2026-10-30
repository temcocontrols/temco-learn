// The honest page: an address that names nothing says so, and offers the way back.

import { Link } from 'react-router-dom';

export function NotFound({ what }: { what?: string }) {
	return (
		<>
			<div className="hero">
				<p className="eyebrow">Temco Learn</p>
				<h1>Not on this site</h1>
				<p className="lede">
					{what === undefined ? 'That address does not name a page.' : `Nothing here is called “${what}”.`} A page appears once one
					of a project's versions is published.
				</p>
			</div>
			<div className="page">
				<p className="label">Where to go</p>
				<div className="rows">
					<Link className="row" to="/">
						<span className="row__title">Home</span>
						<span className="row__meta">The six sections, and what changed lately</span>
						<span className="row__go">Open →</span>
					</Link>
					<Link className="row" to="/documentation">
						<span className="row__title">Documentation</span>
						<span className="row__meta">Every project's guides and references</span>
						<span className="row__go">Open →</span>
					</Link>
				</div>
			</div>
		</>
	);
}