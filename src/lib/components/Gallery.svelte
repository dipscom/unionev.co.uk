<script lang="ts">
	import { images, type Picture } from '../content/images';
	import Image from './Image.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';

	type Photo = {
		src: Picture | null;
		alt: string;
		caption: string;
		/** Case study for this project, when there is one */
		href?: string;
	};

	// `alt` describes the photo; `caption` describes the project.
	// Captions still need the location of each project (see docs/open-points.md)
	const photos: Photo[] = [
		{
			src: images.gallery1,
			alt: 'Yellow Renault 5 with a Union EV number plate',
			caption: 'Union EV on site for a charger installation'
		},
		{
			src: images.gallery2,
			alt: 'Driver plugging a charging cable into a red car',
			caption: 'A resident charging at a Union EV charge point'
		},
		{
			src: images.installTile,
			alt: 'Union EV charge post serving bays 2 and 4, beside a stone wall',
			caption: 'A completed Union EV charge point installation'
		}
	];
</script>

<Section size="sm" style="--flow-space: var(--space-10)">
	<SectionHeader
		title="EV charging, delivered"
		lead="Real installations, real communities, real results."
		titleSize="sm"
		leadWidth="full"
	/>
	<div class="grid" data-layout="thirds" style="--gap: var(--space-4)">
		{#each photos as photo (photo.alt)}
			<figure class="tile">
				<svelte:element this={photo.href ? 'a' : 'div'} href={photo.href} class="tile__image">
					<Image
						src={photo.src}
						alt={photo.alt}
						sizes="(min-width: 1152px) 357px, (min-width: 768px) calc((100vw - 5rem) / 3), calc(100vw - 3rem)"
						class="img-fill"
					/>
				</svelte:element>
				<figcaption class="tile__caption text-sm color-muted">{photo.caption}</figcaption>
			</figure>
		{/each}
	</div>
</Section>

<style>
	.tile {
		margin: 0;
	}
	.tile__image {
		display: block;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border-radius: var(--radius-2xl);
		box-shadow: var(--shadow-sm);
	}
	a.tile__image :global(.img-fill) {
		transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
	}
	a.tile__image:hover :global(.img-fill) {
		transform: scale(1.05);
	}
	.tile__caption {
		margin-top: var(--space-3);
	}
</style>
