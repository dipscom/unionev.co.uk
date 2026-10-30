import type { StorybookConfig } from '@storybook/sveltekit';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
	// Foundations and brand pages are MDX in src/design-system/; component stories sit beside
	// their component in src/lib/components/
	stories: ['../src/**/*.mdx', '../src/**/*.stories.svelte'],
	addons: [
		'@storybook/addon-svelte-csf',
		{
			name: '@storybook/addon-docs',
			// GitHub-flavoured Markdown, for the tables in the MDX pages
			options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } }
		},
		'@storybook/addon-a11y'
	],
	framework: '@storybook/sveltekit',
	// So /favicon.svg, /apple-touch-icon.png and /og.jpg resolve as they do on the site
	staticDirs: ['../static'],
	core: { disableTelemetry: true }
};

export default config;
