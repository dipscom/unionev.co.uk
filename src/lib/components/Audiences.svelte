<script lang="ts">
	import { audiences, type AudienceSlug } from '../content/audiences';
	import { site } from '../content/site';
	import Button from './Button.svelte';
	import CheckList from './CheckList.svelte';
	import Icon from './Icon.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const uid = $props.id();
	/** Only one panel is open at a time */
	let openSlug = $state<AudienceSlug | null>(null);

	const toggle = (slug: AudienceSlug) => (openSlug = openSlug === slug ? null : slug);
</script>

<Section>
	<SectionHeader
		eyebrow="Who We Work With"
		title="Powering people where they live, work and connect"
		lead="Choose the one that describes you to see how we can help."
		spacing="compact"
	/>
	<ul class="grid grid--4 grid--2-mobile audiences" style="--gap: 1rem">
		{#each audiences as audience (audience.slug)}
			{@const open = openSlug === audience.slug}
			<li class="audiences__item">
				<button
					type="button"
					class={['card', 'audience', open && 'audience--open']}
					aria-expanded={open}
					aria-controls="{uid}-{audience.slug}"
					onclick={() => toggle(audience.slug)}
				>
					<span class="audience__icon"><Icon name={audience.icon} size="1.75rem" /></span>
					<span class="audience__label">{audience.label}</span>
					<span class="audience__chevron"><Icon name="chevron" size="1rem" /></span>
				</button>
			</li>
			<!-- Spans the full row; `dense` packing slots it in under the row of the card that opened it -->
			<li id="{uid}-{audience.slug}" class="audiences__panel" hidden={!open}>
				<div class="panel">
					<div>
						<h3 class="panel__title">{audience.label}</h3>
						<p class="panel__summary">{audience.summary}</p>
					</div>
					<CheckList items={[...audience.points]} variant="good" />
					<Button href="?type={audience.slug}#contact" class="panel__cta">
						{site.primaryCta}<span class="visually-hidden"> for {audience.label}</span>
					</Button>
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
		padding: 1.5rem 1rem 1rem;
		text-align: center;
	}
	.audience--open {
		border-color: var(--green-900);
	}
	.audience__icon {
		display: flex;
		justify-content: center;
		margin-bottom: 0.75rem;
		color: var(--green-900);
	}
	.audience__label {
		flex-grow: 1;
		color: var(--gray-900);
		font-size: 0.875rem;
		line-height: 1.3125rem;
		font-weight: 600;
	}
	.audience__chevron {
		display: flex;
		margin-top: 0.75rem;
		color: var(--gray-400);
		transition:
			transform var(--transition),
			color var(--transition);
	}
	.audience:hover .audience__chevron,
	.audience--open .audience__chevron {
		color: var(--green-900);
	}
	.audience--open .audience__chevron {
		transform: rotate(180deg);
	}
	.panel {
		display: grid;
		gap: 1.5rem;
		padding: 1.75rem;
		background: var(--gray-50);
		border: 1px solid var(--gray-100);
		border-radius: var(--radius-2xl);
		text-align: left;
	}
	.panel__title {
		margin-bottom: 0.25rem;
		color: var(--gray-900);
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700;
	}
	.panel__summary {
		color: var(--gray-600);
		font-size: 0.9375rem;
		line-height: 1.625;
	}
	.panel :global(.panel__cta) {
		justify-self: start;
	}
	@media (min-width: 1024px) {
		.panel {
			grid-template-columns: 1fr 1fr auto;
			align-items: center;
			gap: 2rem;
		}
	}
</style>
