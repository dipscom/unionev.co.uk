<script lang="ts">
	import type { Picture } from '../content/images';

	type Props = {
		/** `null` renders the placeholder; a failed load is given one by site.js */
		src: Picture | string | null;
		alt: string;
		width?: number;
		height?: number;
		/** CSS aspect-ratio, e.g. "4 / 3". Reserves space so layout never shifts */
		ratio?: string;
		fit?: 'cover' | 'contain';
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
		/** Display width of the image, for choosing from the srcset, e.g. "(min-width: 768px) 357px, 100vw" */
		sizes?: string;
		class?: string;
		/** Extra attributes for the image, e.g. a data-* hook */
		[attribute: `data-${string}`]: string | undefined;
	};

	let {
		src,
		alt,
		width,
		height,
		ratio,
		fit = 'cover',
		loading = 'lazy',
		fetchpriority,
		sizes,
		class: className = '',
		...rest
	}: Props = $props();

	const showImage = $derived(src !== null);
	const picture = $derived(typeof src === 'object' && src !== null ? src : null);
	const imgSrc = $derived(picture ? picture.src : (src as string | null));
	const imgWidth = $derived(width ?? picture?.width);
	const imgHeight = $derived(height ?? picture?.height);
	const style = $derived(ratio ? `aspect-ratio: ${ratio}` : undefined);
</script>

{#snippet img()}
	<img
		src={imgSrc}
		{alt}
		width={imgWidth}
		height={imgHeight}
		{loading}
		{fetchpriority}
		decoding="async"
		{style}
		class={['image', className]}
		data-fit={fit}
		{...rest}
	/>
{/snippet}

{#if showImage}
	{#if picture}
		<picture>
			{#each picture.sources as source (source.type)}
				<source type={source.type} srcset={source.srcset} {sizes} />
			{/each}
			{@render img()}
		</picture>
	{:else}
		{@render img()}
	{/if}
{:else}
	<div
		class={['image', className]}
		data-fit={fit}
		data-state="placeholder"
		{...rest}
		role="img"
		aria-label={alt}
		style={[
			style,
			imgWidth && imgHeight && !ratio ? `aspect-ratio: ${imgWidth} / ${imgHeight}` : ''
		]
			.filter(Boolean)
			.join('; ') || undefined}
	></div>
{/if}

<style>
	picture {
		display: contents;
	}
	.image {
		display: block;
		max-width: 100%;
	}
	.image[data-fit='cover'] {
		object-fit: cover;
	}
	.image[data-fit='contain'] {
		object-fit: contain;
	}
	/* data-state="failed" is set by site.js when the file fails to load: it hides the broken-image icon and alt text */
	.image[data-state] {
		width: 100%;
		background: linear-gradient(135deg, var(--color-surface-brand-soft), var(--color-brand-soft));
	}
	.image[data-state='failed'] {
		color: transparent;
	}
</style>
