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
	<div class="grid grid--2">
		{#each features as feature, i (feature.title)}
			<div
				class={[
					'card feature',
					i === features.length - 1 && features.length % 2 === 1 && 'feature--last'
				]}
			>
				<IconTile icon={feature.icon} />
				<div>
					<h3 class="feature__title">{feature.title}</h3>
					<p class="feature__body">{feature.body}</p>
				</div>
			</div>
		{/each}
	</div>
</Section>

<style>
	.feature {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		padding: 1.75rem;
	}
	.feature__title {
		margin-bottom: 0.5rem;
		color: var(--gray-900);
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 700;
	}
	.feature__body {
		color: var(--gray-500);
		font-size: 0.875rem;
		line-height: 1.625;
	}
	@media (min-width: 768px) {
		.feature--last {
			grid-column: span 2;
			width: 100%;
			max-width: 36rem;
			margin-inline: auto;
		}
	}
</style>
