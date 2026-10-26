<script lang="ts">
	import '@fontsource-variable/inter/wght.css';
	import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
	import '../styles/global.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="preload" href={interLatin} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#023a31" />
</svelte:head>

{@render children()}
