<script lang="ts">
	import { audiences } from '../content/audiences';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section>
	<SectionHeader
		eyebrow="Who We Work With"
		title="Powering people where they live, work and connect"
		lead="Wherever you are — residential, commercial, fleet, or public sector — you receive a charging solution built around your context."
		spacing="compact"
	/>
	<ul class="grid grid--4 grid--2-mobile" style="--gap: 1rem">
		{#each audiences as audience (audience.label)}
			<li class="card audience">
				<div class="audience__icon" aria-hidden="true">{audience.icon}</div>
				<div class="audience__label">{audience.label}</div>
			</li>
		{/each}
	</ul>
</Section>

<style>
	.audience {
		padding: 1.5rem;
		text-align: center;
		transition:
			border-color var(--transition),
			box-shadow var(--transition);
	}
	.audience:hover {
		border-color: rgb(237 79 34 / 0.3);
		box-shadow: var(--shadow-sm);
	}
	.audience__icon {
		margin-bottom: 0.75rem;
		font-size: 1.875rem;
		line-height: 2.25rem;
	}
	.audience__label {
		color: var(--gray-900);
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
	}
</style>
