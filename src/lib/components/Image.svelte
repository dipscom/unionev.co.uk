<script lang="ts">
	type Props = {
		/** `null` (or a failed load) renders the placeholder */
		src: string | null;
		alt: string;
		width?: number;
		height?: number;
		/** CSS aspect-ratio, e.g. "4 / 3". Reserves space so layout never shifts */
		ratio?: string;
		fit?: 'cover' | 'contain';
		loading?: 'lazy' | 'eager';
		class?: string;
	};

	let {
		src,
		alt,
		width,
		height,
		ratio,
		fit = 'cover',
		loading = 'lazy',
		class: className = ''
	}: Props = $props();

	let failed = $state(false);
	const showImage = $derived(src !== null && !failed);
	const style = $derived(ratio ? `aspect-ratio: ${ratio}` : undefined);
</script>

{#if showImage}
	<img
		{src}
		{alt}
		{width}
		{height}
		{loading}
		{style}
		class={['image', `image--${fit}`, className]}
		onerror={() => (failed = true)}
	/>
{:else}
	<div
		class={['image', 'image--placeholder', className]}
		role="img"
		aria-label={alt}
		style={[style, width && height && !ratio ? `aspect-ratio: ${width} / ${height}` : '']
			.filter(Boolean)
			.join('; ') || undefined}
	></div>
{/if}

<style>
	.image {
		display: block;
		max-width: 100%;
	}
	.image--cover {
		object-fit: cover;
	}
	.image--contain {
		object-fit: contain;
	}
	.image--placeholder {
		width: 100%;
		background: linear-gradient(135deg, var(--mint-tint), var(--mint));
	}
</style>
