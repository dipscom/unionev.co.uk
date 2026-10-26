<script lang="ts">
	import { images } from '../content/images';
	import { site } from '../content/site';
	import union_logo from '../images/union_logo.svg';

	type Props = {
		title?: string;
		description?: string;
		/** Path of the page, used for the canonical and og:url */
		path?: string;
		/** Emit Organization structured data (home page only) */
		organization?: boolean;
		noindex?: boolean;
	};

	let {
		title = site.title,
		description = site.description,
		path = '/',
		organization = false,
		noindex = false
	}: Props = $props();

	const url = $derived(site.origin + path);

	const jsonLd = $derived(
		[
			'<script type="application/ld+json">',
			JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'Organization',
				name: site.name,
				legalName: site.legalName,
				url: site.origin,
				logo: new URL(union_logo, site.origin).href,
				email: site.email,
				description: site.description,
				sameAs: [site.linkedin],
				areaServed: { '@type': 'Country', name: 'United Kingdom' }
			}),
			'</scr' + 'ipt>'
		].join('')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	{#if images.hero}
		<meta property="og:image" content={images.hero} />
		<meta name="twitter:image" content={images.hero} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	{#if organization}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html jsonLd}
	{/if}
</svelte:head>
