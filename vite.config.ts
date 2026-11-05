import { copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Clean addresses (`/t3000/1.0/ports`, no `#/`) mean the browser resolves every asset and fetch against the mount point,
// so the prefix has to be baked in at build time. It differs per host, which is why it is an environment variable:
//
//   npm run build                              → `/`             the dev server and `vite preview`
//   VITE_BASE=/temco-learn/ npm run build      → GitHub Pages    the project site
//   VITE_BASE=/learn/ npm run build            → `/learn/`       wherever the Temco platform mounts the build
//
// A trailing slash is required: `import.meta.env.BASE_URL` is composed from this value.
const base = ((): string => {
	const wanted = process.env.VITE_BASE ?? '/';
	return wanted.endsWith('/') ? wanted : `${wanted}/`;
})();

export default defineConfig({
	base,
	plugins: [
		react(),
		{
			// GitHub Pages has no rewrites, so a direct hit on a deep address finds no file — it serves `404.html` instead.
			// A copy of the app shell there lets the router answer for every address and the reader keeps the clean URL.
			// `vite preview` and any host with an SPA rewrite use `index.html` and never see this file.
			name: 'spa-fallback',
			closeBundle() {
				const dist = resolve(process.cwd(), 'dist');
				copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
			}
		}
	],
	build: {
		outDir: 'dist',
		target: 'chrome120',
		sourcemap: false,
		chunkSizeWarningLimit: 900
	},
	preview: { port: 1011, strictPort: true }
});
