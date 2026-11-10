// Where a page starts.
//
// A browser keeps the scroll offset across a client-side navigation, and it has no way to know that the next page is
// shorter than the last one: reading to the end of a long article and then opening a two-line one leaves the reader
// looking at the footer, with the title somewhere above the window. This is the one component that closes that, because
// it is a fact about the router and not about any screen.
//
// One exception, and it is the reason this reads the location and not only the path: a link that names a section — the
// palette's own anchor, or a copied `#heading` address — is asking to be taken *there*, and the article scrolls to it.

import * as React from 'react';
import { useLocation } from 'react-router-dom';

/** Where a navigation should land: a section when the address names one, the top of the page otherwise. */
export function ScrollToTop(): undefined {
	const { pathname, hash, state } = useLocation();

	React.useEffect(() => {
		const anchor = (state as { anchor?: string } | null)?.anchor ?? hash.replace(/^#/u, '');
		if (anchor !== '') {
			return;
		}
		// `auto` rather than `smooth`: arriving somewhere new is not a journey to watch, and a long page animating from
		// its footer to its title takes longer than the reader is willing to look at it.
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}, [pathname, hash, state]);

	return undefined;
}
