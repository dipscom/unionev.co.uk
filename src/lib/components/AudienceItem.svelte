<script lang="ts">
	import type { audiences } from '../content/audiences';
	import { site } from '../content/site';
	import Button from './Button.svelte';
	import CheckList from './CheckList.svelte';
	import Icon from './Icon.svelte';

	type Props = {
		audience: (typeof audiences)[number];
	};

	let { audience }: Props = $props();
</script>

<!-- `name` makes every audience on the page one exclusive group: opening one closes the others -->
<details class="audience-item" name="audiences">
	<summary class="card audience text-center">
		<span class="audience__icon color-brand"><Icon name={audience.icon} size="1.75rem" /></span>
		<span class="audience__label text-sm weight-semibold">{audience.label}</span>
		<span class="audience__chevron" aria-hidden="true"><Icon name="chevron" size="1rem" /></span>
	</summary>
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
</details>

<style>
	/* Takes the details box out of the grid so the summary is the card's cell and the panel
	   (`::details-content`) spans the full row, which `dense` packing slots in under that card's row */
	.audience-item {
		display: contents;
	}
	.audience-item::details-content {
		grid-column: 1 / -1;
	}
	.audience-item:not([open])::details-content {
		display: none;
	}
	.audience {
		display: flex;
		flex-direction: column;
		align-items: center;
		list-style: none;
		cursor: pointer;
		padding: var(--space-6) var(--space-4) var(--space-4);
	}
	.audience::-webkit-details-marker {
		display: none;
	}
	.audience-item[open] .audience {
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
	.audience-item[open] .audience__chevron {
		color: var(--color-brand);
	}
	.audience-item[open] .audience__chevron {
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
