<script lang="ts">
	import { images } from '../content/images';
	import Image from './Image.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const photos = [
		{ src: images.gallery1, alt: 'Union EV vehicle on site' },
		{ src: images.gallery2, alt: 'EV being charged', offset: true },
		{ src: images.install, alt: 'Union EV charge point installation' }
	];
</script>

<Section size="sm">
	<SectionHeader
		title="EV charging, delivered"
		lead="Real installations, real communities, real results."
		titleSize="sm"
		leadWidth="full"
		spacing="sm"
	/>
	<div class="grid grid--3 gallery" style="--gap: 1rem">
		{#each photos as photo (photo.alt)}
			<div class={['tile', photo.offset && 'tile--offset']}>
				<Image src={photo.src} alt={photo.alt} class="img-fill" />
			</div>
		{/each}
	</div>
</Section>

<style>
	.tile {
		height: 16rem;
		overflow: hidden;
		border-radius: var(--radius-2xl);
		box-shadow: var(--shadow-sm);
	}
	.tile :global(.img-fill) {
		transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
	}
	.tile:hover :global(.img-fill) {
		transform: scale(1.05);
	}
	@media (min-width: 768px) {
		.tile--offset {
			margin-top: 1.5rem;
		}
	}
</style>
