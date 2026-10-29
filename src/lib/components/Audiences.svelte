<script lang="ts">
	import { audiences } from '../content/audiences';
	import { site } from '../content/site';
	import Button from './Button.svelte';
	import CheckList from './CheckList.svelte';
	import Icon from './Icon.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const uid = $props.id();
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
				<button
					type="button"
					class="card audience text-center"
					data-disclosure
					data-disclosure-group="audiences"
					aria-expanded="false"
					aria-controls="{uid}-{audience.slug}"
				>
					<span class="audience__icon color-brand"
						><Icon name={audience.icon} size="1.75rem" /></span
					>
					<span class="audience__label text-sm weight-semibold">{audience.label}</span>
					<span class="audience__chevron"><Icon name="chevron" size="1rem" /></span>
				</button>
			</li>
			<!-- Spans the full row; `dense` packing slots it in under the row of the card that opened it -->
			<li id="{uid}-{audience.slug}" class="audiences__panel" data-disclosure-panel hidden>
				<div class="panel bg-surface-alt">
					<div>
						<h3 class="panel__title text-lg">{audience.label}</h3>
						<p class="panel__summary color-muted">{audience.summary}</p>
					</div>
					<CheckList items={[...audience.points]} variant="good" />
					<div class="panel__cta">
						<Button href="?type={audience.slug}#contact">
							{site.primaryCta}<span class="visually-hidden"> for {audience.label}</span>
						</Button>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</Section>

<style>
	.audiences {
		grid-auto-flow: dense;
	}
	.audiences__item {
		display: flex;
	}
	.audiences__panel {
		grid-column: 1 / -1;
	}
	.audience {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: var(--space-6) var(--space-4) var(--space-4);
	}
	.audience:global([aria-expanded='true']) {
		border-color: var(--color-brand);
	}
	.audience__icon {
		display: flex;
		justify-content: center;
		margin-bottom: var(--space-3);
	}
	.audience__label {
		flex-grow: 1;
		color: var(--color-text);
	}
	.audience__chevron {
		display: flex;
		margin-top: var(--space-3);
		color: var(--color-icon-muted);
		transition:
			transform var(--transition),
			color var(--transition);
	}
	.audience:hover .audience__chevron,
	.audience:global([aria-expanded='true']) .audience__chevron {
		color: var(--color-brand);
	}
	.audience:global([aria-expanded='true']) .audience__chevron {
		transform: rotate(180deg);
	}
	.panel {
		display: grid;
		gap: var(--space-6);
		padding: var(--space-7);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-2xl);
		text-align: left;
	}
	.panel__title {
		margin-bottom: var(--space-1);
	}
	.panel__summary {
		font-size: var(--text-15);
		line-height: var(--leading-relaxed);
	}
	.panel__cta {
		display: flex;
		justify-self: start;
	}
	@media (min-width: 1024px) {
		.panel {
			grid-template-columns: 1fr 1fr auto;
			align-items: center;
			gap: var(--space-8);
		}
	}
</style>
