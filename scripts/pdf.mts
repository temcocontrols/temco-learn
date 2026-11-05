// The PDFs: one per version, one per page, printed from the app's own print route.
//
// The site is static, so a PDF is a build artefact like `catalog.json`: generated here, written into `dist/pdf/` for the
// deploy and mirrored into `public/pdf/` so a fresh clone has them. Chromium writes the PDF **outline** (the bookmarks a
// reader navigates in a viewer) from the page's headings — which is why the print route keeps `h1`/`h2`/`h3` and nothing
// else.
//
// Chromium cannot put page numbers into a printed table of contents (`target-counter` is unsupported), so the cover lists
// the pages without numbers and the navigable contents is the outline. If printed page numbers ever become a requirement,
// the renderer moves to WeasyPrint — with weaker support for this layout.
//
// If Chromium is not installed this step warns and exits 0 unless `--strict` is passed: a missing browser must not stop a
// deploy, but CI asks for it explicitly.

import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Browser } from 'playwright';

const here = fileURLToPath(new URL('..', import.meta.url));
const dist = join(here, 'dist');
const publicDir = join(here, 'public');
const strict = process.argv.includes('--strict');

interface PageEntry {
	href: string;
	title: string;
	kind: 'md' | 'build';
}

interface Catalog {
	projects: { id: string; title: string; versions: { version: string; pages: PageEntry[] }[] }[];
}

/** A port nothing is listening on, so two builds on one machine cannot collide. */
function freePort(): Promise<number> {
	return new Promise((resolve, reject) => {
		const probe = createServer();
		probe.unref();
		probe.on('error', reject);
		probe.listen(0, () => {
			const address = probe.address();
			const port = typeof address === 'object' && address !== null ? address.port : 0;
			probe.close(() => resolve(port));
		});
	});
}

const escape = (text: string): string => text.replace(/&/gu, '&amp;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;');

async function main(): Promise<void> {
	if (!existsSync(join(dist, 'index.html'))) {
		console.error('dist/ is not built: run `npm run build:fast` first, or `npm run build` for the whole pipeline.');
		process.exitCode = 1;
		return;
	}

	const catalog = JSON.parse(await readFile(join(publicDir, 'catalog.json'), 'utf8')) as Catalog;

	let chromium: { launch: (options?: { executablePath?: string }) => Promise<Browser> };
	try {
		({ chromium } = await import('playwright'));
	} catch {
		console.warn('pdf: playwright is not installed — skipping. `npm i -D playwright && npx playwright install chromium`.');
		if (strict) {
			process.exitCode = 1;
		}
		return;
	}

	let browser: Browser;
	try {
		// `PLAYWRIGHT_CHROMIUM` is an escape hatch for a machine where the bundled browser cannot be downloaded.
		const override = process.env['PLAYWRIGHT_CHROMIUM'] ?? '';
		browser = await chromium.launch(override === '' ? {} : { executablePath: override });
	} catch {
		console.warn('pdf: no Chromium available — skipping. `npx playwright install chromium`.');
		if (strict) {
			process.exitCode = 1;
		}
		return;
	}

	const { preview } = await import('vite');
	const port = await freePort();
	const server = await preview({ preview: { port, strictPort: true }, logLevel: 'warn' });
	const base = server.resolvedUrls?.local[0] ?? `http://localhost:${String(port)}/`;

	let written = 0;
	try {
		const view = await browser.newPage();
		await view.setViewportSize({ width: 1280, height: 1600 });

		const print = async (route: string, target: string, footer: string): Promise<void> => {
			// `resolvedUrls` already carries the build's base (`/` here, `/temco-learn/` if VITE_BASE said so), and `route`
			// starts with a slash, so they are joined rather than concatenated.
			await view.goto(new URL(route.replace(/^\//u, ''), base).toString(), { waitUntil: 'networkidle' });
			await view.waitForSelector('body[data-print-ready="true"]', { timeout: 20000 });
			await mkdir(join(target, '..'), { recursive: true });
			await view.pdf({
				path: target,
				format: 'A4',
				printBackground: true,
				outline: true,
				margin: { top: '16mm', bottom: '18mm', left: '15mm', right: '15mm' },
				displayHeaderFooter: true,
				headerTemplate: '<div></div>',
				footerTemplate:
					'<div style="width:100%;padding:0 15mm;font:9px \'Segoe UI\',sans-serif;color:#666;display:flex;justify-content:space-between">' +
					`<span>${escape(footer)}</span>` +
					'<span>Temco Learn · page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>'
			});
			const size = (await stat(target)).size;
			written += 1;
			console.log(`pdf: ${target.replace(`${here}`, '')} — ${Math.round(size / 1024)} KB`);
		};

		for (const project of catalog.projects) {
			for (const version of project.versions) {
				const folder = join('pdf', project.id);
				const guide = join(dist, folder, `${version.version}.pdf`);
				await print(`/print/${project.id}/${encodeURIComponent(version.version)}`, guide, `${project.title} ${version.version}`);

				for (const page of version.pages) {
					if (page.kind !== 'md') {
						continue;
					}
					await print(
						`/print/${project.id}/${encodeURIComponent(version.version)}/${page.href}`,
						join(dist, folder, version.version, `${page.href}.pdf`),
						`${project.title} ${version.version} · ${page.title}`
					);
				}
			}
		}
	} finally {
		await browser.close();
		await new Promise<void>((resolve) => {
			server.httpServer.close(() => resolve());
		});
	}

	// Committed, like the catalog: a clone that has not run a build still has working download links.
	await rm(join(publicDir, 'pdf'), { recursive: true, force: true });
	await cp(join(dist, 'pdf'), join(publicDir, 'pdf'), { recursive: true });
	console.log(`pdf: ${written} files written and mirrored to public/pdf`);
}

await main();
