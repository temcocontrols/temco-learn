// A ZIP writer small enough to keep in the repo.
//
// The only archives this project makes are the Markdown sources of one version, which are a few kilobytes, so entries are
// **stored** rather than deflated: no compression library, no dependency, and the archive opens in every tool. If a version
// ever grows past a megabyte, switch `method` to 8 and add `deflateRawSync` — nothing else changes.

export interface ZipEntry {
	/** Path inside the archive, always with forward slashes. */
	name: string;
	data: Uint8Array;
}

const TABLE = ((): Uint32Array => {
	const table = new Uint32Array(256);
	for (let index = 0; index < 256; index += 1) {
		let value = index;
		for (let bit = 0; bit < 8; bit += 1) {
			value = (value & 1) === 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
		}
		table[index] = value >>> 0;
	}
	return table;
})();

function crc32(bytes: Uint8Array): number {
	let crc = 0xffffffff;
	for (const byte of bytes) {
		crc = (TABLE[(crc ^ byte) & 0xff] ?? 0) ^ (crc >>> 8);
	}
	return (crc ^ 0xffffffff) >>> 0;
}

/** MS-DOS date and time, which is what both ZIP headers carry. */
function dosStamp(when: Date): { time: number; date: number } {
	const time = ((when.getHours() & 0x1f) << 11) | ((when.getMinutes() & 0x3f) << 5) | ((when.getSeconds() >> 1) & 0x1f);
	const date = (((when.getFullYear() - 1980) & 0x7f) << 9) | (((when.getMonth() + 1) & 0xf) << 5) | (when.getDate() & 0x1f);
	return { time, date };
}

function concat(parts: Uint8Array[]): Uint8Array {
	const total = parts.reduce((length, part) => length + part.length, 0);
	const joined = new Uint8Array(total);
	let at = 0;
	for (const part of parts) {
		joined.set(part, at);
		at += part.length;
	}
	return joined;
}

export function zip(entries: ZipEntry[], when = new Date()): Uint8Array {
	const encoder = new TextEncoder();
	const { time, date } = dosStamp(when);
	const parts: Uint8Array[] = [];
	const central: Uint8Array[] = [];
	let offset = 0;

	for (const entry of entries) {
		const name = encoder.encode(entry.name);
		const crc = crc32(entry.data);

		const local = new Uint8Array(30 + name.length);
		const localView = new DataView(local.buffer);
		localView.setUint32(0, 0x04034b50, true);
		localView.setUint16(4, 20, true);
		localView.setUint16(6, 0x0800, true);
		localView.setUint16(8, 0, true);
		localView.setUint16(10, time, true);
		localView.setUint16(12, date, true);
		localView.setUint32(14, crc, true);
		localView.setUint32(18, entry.data.length, true);
		localView.setUint32(22, entry.data.length, true);
		localView.setUint16(26, name.length, true);
		names(local, name, 30);
		parts.push(local, entry.data);

		const header = new Uint8Array(46 + name.length);
		const headerView = new DataView(header.buffer);
		headerView.setUint32(0, 0x02014b50, true);
		headerView.setUint16(4, 20, true);
		headerView.setUint16(6, 20, true);
		headerView.setUint16(8, 0x0800, true);
		headerView.setUint16(10, 0, true);
		headerView.setUint16(12, time, true);
		headerView.setUint16(14, date, true);
		headerView.setUint32(16, crc, true);
		headerView.setUint32(20, entry.data.length, true);
		headerView.setUint32(24, entry.data.length, true);
		headerView.setUint16(28, name.length, true);
		headerView.setUint32(42, offset, true);
		names(header, name, 46);
		central.push(header);

		offset += local.length + entry.data.length;
	}

	const centralSize = central.reduce((length, part) => length + part.length, 0);
	const end = new Uint8Array(22);
	const endView = new DataView(end.buffer);
	endView.setUint32(0, 0x06054b50, true);
	endView.setUint16(8, entries.length, true);
	endView.setUint16(10, entries.length, true);
	endView.setUint32(12, centralSize, true);
	endView.setUint32(16, offset, true);

	return concat([...parts, ...central, end]);
}

function names(header: Uint8Array, name: Uint8Array, at: number): void {
	header.set(name, at);
}
