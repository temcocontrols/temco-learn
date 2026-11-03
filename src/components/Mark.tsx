// The query, marked in a result's text — never interpreted as HTML.

import * as React from 'react';

const escape = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');

export function Mark({ text, query }: { text: string; query: string }) {
	const words = query
		.toLowerCase()
		.split(/\s+/u)
		.filter((word) => word.length > 1)
		.map(escape);

	if (words.length === 0) {
		return <>{text}</>;
	}

	const pattern = new RegExp(`(${words.join('|')})`, 'giu');
	return (
		<>
			{text.split(pattern).map((part, index) => (index % 2 === 1 ? <mark key={index}>{part}</mark> : <React.Fragment key={index}>{part}</React.Fragment>))}
		</>
	);
}
