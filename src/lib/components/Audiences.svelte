<script lang="ts">
	import { audiences } from '../content/audiences';
	import AudienceItem from './AudienceItem.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section style="--flow-space: var(--space-12)">
	<SectionHeader
		eyebrow="Who We Work With"
		title="Powering people where they live, work and connect"
		lead="Choose the one that describes you to see how we can help."
	/>
	<ul class="grid audiences" data-layout="quarters-2up" style="--gap: var(--space-4)">
		{#each audiences as audience (audience.slug)}
			<li class="audiences__item">
				<AudienceItem {audience} />
			</li>
		{/each}
	</ul>
</Section>

<style>
	.audiences {
		grid-auto-flow: dense;
	}
	.audiences__item {
		display: contents;
	}
</style>
