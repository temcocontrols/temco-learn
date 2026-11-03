// The files the build cannot make for you.
//
// `scripts/catalog.mts` regenerates the Markdown, HTML and ZIP bundles on every build, and `vite build` copies `public/`
// into `dist/`, so those never go stale. The PDFs and the Windows Help files are different: they need a printer and a
// Windows-only compiler, so they are built on a developer's machine and committed. A deploy that silently serves last
// month's PDFs — or a download menu pointing at a `.chm` that was never compiled — is the failure this catches.
//
// Run it after `npm run build`, and in CI before a deploy.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface Page {
	href: string;
	kind: 'md' | 'build';
}

interface Catalog {
	projects: { id: string; versions: { version: string; pages: Page[] }[] }[];
}

interface Artifacts {
	projects: Record<string, Record<string, { chm?: boolean }>>;
}

const here = fileURLToPath(new URL('..', import.meta.url));
const publicDir = join(here, 'public');

const problems: string[] = [];

const read = async (path: string): Promise<unknown> => JSON.parse(await readFile(join(publicDir, path), 'utf8')) as unknown;

if (!existsSync(join(publicDir, 'catalog.json'))) {
	console.error('artifacts: public/catalog.json is missing — run `npm run catalog` first.');
	process.exit(1);
}

const catalog = (await read('catalog.json')) as Catalog;

/** Every `.chm` on disk, as `<project>/<version>`. */
const helpFiles = async (): Promise<Set<string>> => {
	const found = new Set<string>();
	const root = join(publicDir, 'chm');
	if (!existsSync(root)) {
		return found;
	}
	for (const project of await readdir(root, { withFileTypes: true })) {
		if (!project.isDirectory()) {
			continue;
		}
		for (const file of await readdir(join(root, project.name))) {
			if (file.endsWith('.chm')) {
				found.add(`${project.name}/${file.slice(0, -'.chm'.length)}`);
			}
		}
	}
	return found;
};

const onDisk = await helpFiles();

const manifestPath = join(publicDir, 'download', 'manifest.json');
if (!existsSync(manifestPath)) {
	problems.push('public/download/manifest.json is missing — run `npm run chm` to write it');
}
const manifest = (existsSync(manifestPath) ? ((await read('download/manifest.json')) as Artifacts) : { projects: {} }) satisfies Artifacts;

const missingPdfs: string[] = [];
let versions = 0;
let pageCount = 0;

for (const project of catalog.projects) {
	for (const version of project.versions) {
		versions += 1;

		// A whole-guide PDF per version, and one per page authored here. An imported `build` page is compiled by its own
		// project and has no single-page print route of ours.
		if (!existsSync(join(publicDir, 'pdf', project.id, `${version.version}.pdf`))) {
			missingPdfs.push(`pdf/${project.id}/${version.version}.pdf`);
		}
		for (const page of version.pages.filter((entry) => entry.kind === 'md')) {
			pageCount += 1;
			if (!existsSync(join(publicDir, 'pdf', project.id, version.version, `${page.href}.pdf`))) {
				missingPdfs.push(`pdf/${project.id}/${version.version}/${page.href}.pdf`);
			}
		}

		// The menu is drawn from the manifest, so it can promise a file that is not there — or omit one that is.
		const key = `${project.id}/${version.version}`;
		if (manifest.projects[project.id]?.[version.version]?.chm === true && !onDisk.has(key)) {
			problems.push(`manifest.json promises a .chm for ${key}, but public/chm/${key}.chm does not exist`);
		}
	}
}

for (const key of onDisk) {
	const [project, version] = key.split('/') as [string, string];
	if (manifest.projects[project]?.[version]?.chm !== true) {
		problems.push(`public/chm/${key}.chm exists but manifest.json does not list it — run \`npm run chm\``);
	}
}

if (missingPdfs.length > 0) {
	problems.push(
		`${String(missingPdfs.length)} PDF(s) missing — run \`npm run build\` on a machine with Chromium:\n${missingPdfs
			.map((path) => `      public/${path}`)
			.join('\n')}`
	);
}

if (problems.length > 0) {
	console.error(`The committed downloads do not match the catalog:\n\n${problems.map((problem) => `  ${problem}`).join('\n')}\n`);
	process.exit(1);
}

console.log(`artifacts: ${versions} version(s), ${pageCount} page PDF(s), ${onDisk.size} help file(s) — every download has a file`);
