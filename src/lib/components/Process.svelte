<script lang="ts">
	import { steps } from '../content/steps';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section id="how-it-works" tone="alt">
	<SectionHeader
		eyebrow="The Process"
		title="Survey to operation — we handle it all"
		lead="A proven, end-to-end process that removes complexity from day one."
		leadWidth="xl"
	/>
	<ol class="grid grid--4 steps">
		{#each steps as step, i (step.title)}
			<li class="step">
				{#if i < steps.length - 1}
					<div class="step__line" aria-hidden="true"></div>
				{/if}
				<div class="step__card">
					<div class="step__number">{String(i + 1).padStart(2, '0')}</div>
					<h3 class="step__title">{step.title}</h3>
					<p class="step__body">{step.body}</p>
				</div>
			</li>
		{/each}
	</ol>
</Section>

<style>
	.steps {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.step {
		position: relative;
	}
	.step__line {
		display: none;
		position: absolute;
		top: 2rem;
		left: 100%;
		z-index: 0;
		width: 100%;
		height: 2px;
		background: var(--mint);
	}
	.step__card {
		position: relative;
		height: 100%;
		padding: 1.5rem;
		background: var(--white);
		border: 1px solid var(--gray-100);
		border-radius: var(--radius-2xl);
	}
	.step__number {
		margin-bottom: 1rem;
		color: var(--green-900);
		font-size: 1.875rem;
		line-height: 2.25rem;
		font-weight: 800;
	}
	.step__title {
		margin-bottom: 0.5rem;
		color: var(--gray-900);
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 700;
	}
	.step__body {
		color: var(--gray-500);
		font-size: 0.875rem;
		line-height: 1.625;
	}
	@media (min-width: 1024px) {
		.step__line {
			display: block;
		}
	}
</style>
