// "Was this page helpful?" — the one question worth asking at the foot of a page.
//
// There is no server, so an answer is kept beside the theme key and the text size: remembered for this reader, posted
// nowhere. When the platform offers an endpoint, `send` is the only line that has to change.

import * as React from 'react';

const KEY = 'temco-learn-feedback';

interface Answer {
	page: string;
	helpful: boolean;
	note?: string;
	at: string;
}

function readAll(): Record<string, Answer> {
	try {
		const stored = JSON.parse(localStorage.getItem(KEY) ?? '{}') as unknown;
		return typeof stored === 'object' && stored !== null ? (stored as Record<string, Answer>) : {};
	} catch {
		return {};
	}
}

function save(answer: Answer): void {
	try {
		const all = readAll();
		all[answer.page] = answer;
		localStorage.setItem(KEY, JSON.stringify(all));
	} catch {
		// Storage off: the thank-you is still shown for this visit.
	}
}

export function Feedback({ page }: { page: string }) {
	const [given, setGiven] = React.useState<Answer | undefined>(() => readAll()[page]);
	const [note, setNote] = React.useState('');
	const [asking, setAsking] = React.useState(false);

	const answer = (helpful: boolean): void => {
		const value: Answer = { page, helpful, at: new Date().toISOString() };
		save(value);
		setGiven(value);
		setAsking(!helpful);
	};

	const addNote = (): void => {
		if (given === undefined) {
			return;
		}
		const trimmed = note.trim();
		const value: Answer = trimmed === '' ? given : { ...given, note: trimmed };
		save(value);
		setGiven(value);
		setAsking(false);
	};

	return (
		<div className="feedback">
			{asking ? (
				<>
					<span className="feedback__q">What was missing or wrong?</span>
					<textarea value={note} onChange={(event) => setNote(event.target.value)} aria-label="What was missing or wrong?" />
					<button type="button" onClick={addNote}>
						Send
					</button>
					<span className="feedback__note">Kept on this device unless the platform is given an address to post to.</span>
				</>
			) : given === undefined ? (
				<>
					<span className="feedback__q">Was this page helpful?</span>
					<button type="button" onClick={() => answer(true)}>
						Yes
					</button>
					<button type="button" onClick={() => answer(false)}>
						No
					</button>
					<span className="feedback__note">Answers stay on this device.</span>
				</>
			) : (
				<>
					<span className="feedback__q">{given.helpful ? 'Thanks — noted as helpful.' : 'Thanks — noted.'}</span>
					{given.helpful || given.note !== undefined ? undefined : (
						<button type="button" onClick={() => setAsking(true)}>
							Add a note
						</button>
					)}
					{given.note === undefined ? undefined : <span className="feedback__note">Your note is saved on this device.</span>}
				</>
			)}
		</div>
	);
}
