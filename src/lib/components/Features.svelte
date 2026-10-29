<script lang="ts">
	import { features } from '../content/features';
	import IconTile from './IconTile.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section id="what-we-do" tone="alt">
	<SectionHeader
		eyebrow="What We Do"
		title="Services"
		lead="One partner from the first site survey to day-to-day operation."
	/>
	<div class="grid" data-layout="halves">
		{#each features as feature (feature.title)}
			<div class="card feature with-icon">
				<IconTile icon={feature.icon} />
				<div>
					<h3 class="feature__title">{feature.title}</h3>
					<p class="feature__body text-sm leading-relaxed color-subtle">{feature.body}</p>
				</div>
			</div>
		{/each}
	</div>
</Section>

<style>
	.feature {
		--with-icon-gap: var(--space-5);
		padding: var(--space-7);
	}
	.feature__title {
		margin-bottom: var(--space-2);
		font-size: var(--text-base);
		line-height: var(--leading-base);
	}
	@media (min-width: 768px) {
		/* An odd one out in the last row sits centred under the others */
		.feature:last-child:nth-child(odd) {
			grid-column: span 2;
			width: 100%;
			max-width: 36rem;
			margin-inline: auto;
		}
	}
</style>
