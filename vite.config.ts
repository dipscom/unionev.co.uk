import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';
import { defineConfig, minifySync, type Plugin } from 'vite';

/**
 * `import code from './x.js?inline-script'` gives the file's minified source as a string, for
 * inlining in a <script>. The browser scripts are tiny, so inlining beats a request for each.
 */
function inlineScript(): Plugin {
	const suffix = '?inline-script';
	return {
		name: 'inline-script',
		enforce: 'pre',
		resolveId(source, importer) {
			if (!source.endsWith(suffix)) return null;
			return this.resolve(source.slice(0, -suffix.length), importer, { skipSelf: true }).then(
				(resolved) => resolved && resolved.id + suffix
			);
		},
		load(id) {
			if (!id.endsWith(suffix)) return null;
			const file = id.slice(0, -suffix.length);
			this.addWatchFile(file);
			const { code } = minifySync(file, readFileSync(file, 'utf8'));
			return `export default ${JSON.stringify(code)};`;
		}
	};
}

export default defineConfig({
	plugins: [
		inlineScript(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Styles are small; inline them so they don't block first paint.
			inlineStyleThreshold: 20000,

			// Inlined styles live in the HTML, so their url()s must not be relative to a CSS file
			// (they would resolve against the page and 404, e.g. the font at /inter-latin-….woff2)
			paths: { relative: false },

			// Plain static output so the site deploys unchanged to any static host.
			// fallback gives hosts a 404.html that renders +error.svelte.
			adapter: adapter({ fallback: '404.html' })
		})
	]
});
