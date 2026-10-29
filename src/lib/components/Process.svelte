<script lang="ts">
	import { steps } from '../content/steps';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section id="how-it-works" tone="alt">
	<SectionHeader
		eyebrow="The Process"
		title="Survey to operation — we handle it all"
		lead="Four steps from the first conversation to live chargers, and what we need from you at each one."
		leadWidth="xl"
	/>
	<ol class="grid steps" data-layout="quarters">
		{#each steps as step, i (step.title)}
			<li class="step">
				{#if i < steps.length - 1}
					<div class="step__line" aria-hidden="true"></div>
				{/if}
				<div class="step__card">
					<div class="step__number weight-extrabold color-brand">
						{String(i + 1).padStart(2, '0')}
					</div>
					<h3 class="step__title">{step.title}</h3>
					<p class="step__body text-sm leading-relaxed color-subtle">{step.body}</p>
					<p class="step__needs color-muted"><strong>From you:</strong> {step.needs}</p>
				</div>
			</li>
		{/each}
	</ol>
</Section>

<style>
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
		background: var(--color-brand-soft);
	}
	.step__card {
		position: relative;
		height: 100%;
		padding: var(--space-6);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-2xl);
	}
	.step__number {
		margin-bottom: var(--space-4);
		font-size: var(--text-3xl);
		line-height: var(--leading-3xl);
	}
	.step__title {
		margin-bottom: var(--space-2);
		font-size: var(--text-base);
		line-height: var(--leading-base);
	}
	.step__needs {
		margin-top: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border);
		font-size: var(--text-13);
		line-height: var(--leading-snug);
	}
	.step__needs strong {
		color: var(--color-brand);
	}
	@media (min-width: 1024px) {
		.step__line {
			display: block;
		}
	}
</style>
