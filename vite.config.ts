import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` is what lets one build serve four places: the dev server, `vite preview` on 1011, a GitHub Pages project
// site under `/temco-learn/`, and any static host that hands us a sub-path.
export default defineConfig({
	base: './',
	plugins: [react()],
	build: {
		outDir: 'dist',
		target: 'chrome120',
		sourcemap: false,
		chunkSizeWarningLimit: 900
	},
	preview: { port: 1011, strictPort: true }
});
