import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Styles are small; inline them so they don't block first paint.
			inlineStyleThreshold: 20000,

			// Plain static output so the site deploys unchanged to any static host.
			// fallback gives hosts a 404.html that renders +error.svelte.
			adapter: adapter({ fallback: '404.html' })
		})
	]
});
