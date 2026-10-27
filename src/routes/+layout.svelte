<script lang="ts">
	import '@fontsource-variable/inter/wght.css';
	import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
	import siteScript from '#lib/client/site.js?inline-script';
	import '../styles/global.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<!-- type="module" defers an inline script until the page is parsed -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="module">${siteScript}</` + `script>`}
	<link rel="preload" href={interLatin} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#023a31" />
</svelte:head>

{@render children()}
