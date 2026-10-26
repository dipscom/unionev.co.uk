<script lang="ts">
	import { site } from '../content/site';
	import Button from './Button.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section tone="dark" size="md" width="narrow" class="cta">
	<SectionHeader
		eyebrow="Free. No obligation. No commitment."
		title="Find out what's possible at your site"
		lead="A free site assessment shows what infrastructure your site needs, which funding options suit it, and the revenue it could generate."
		tone="dark"
		spacing="xs"
		titleSize="md"
	/>
	<div class="cta__actions">
		<Button href="#contact">{site.primaryCta}</Button>
		<Button href="#case-study" variant="outline">See the case study</Button>
	</div>
	<p class="cta__next">
		<strong>What happens next:</strong> we get in touch to understand your site, arrange a survey, then
		send you a written proposal to consider.
	</p>
	<p class="cta__note">{site.insurance} · Certified engineers</p>
</Section>

<style>
	:global(.cta) {
		text-align: center;
	}
	.cta__actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: center;
	}
	.cta__next {
		margin-top: 2rem;
		color: var(--gray-300);
		font-size: 0.9375rem;
		line-height: 1.625;
	}
	.cta__next strong {
		color: var(--white);
	}
	.cta__note {
		margin-top: 1rem;
		color: var(--gray-400);
		font-size: 0.875rem;
	}
	@media (min-width: 640px) {
		.cta__actions {
			flex-direction: row;
		}
	}
</style>
