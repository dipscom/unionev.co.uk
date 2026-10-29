<script lang="ts">
	import { site } from '../content/site';
	import Button from './Button.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section
	tone="dark"
	size="md"
	width="narrow"
	class="text-center"
	style="--flow-space: var(--space-8)"
>
	<SectionHeader
		eyebrow="Free. No obligation. No commitment."
		title="Find out what's possible at your site"
		lead="A free site assessment shows what infrastructure your site needs, which funding options suit it, and the revenue it could generate."
		titleSize="md"
	/>
	<div class="cta__actions switcher">
		<Button href="#contact">{site.primaryCta}</Button>
		<Button href="#case-study" variant="outline">See the case study</Button>
	</div>
	<p class="cta__next">
		<strong>What happens next:</strong> we get in touch to understand your site, arrange a survey, then
		send you a written proposal to consider.
	</p>
	<p class="cta__note text-sm">{site.insurance} · Certified engineers</p>
</Section>

<style>
	.cta__actions {
		--switcher-justify: center;
		--switcher-wrap: nowrap;
	}
	.cta__next {
		margin-top: var(--space-8);
		color: var(--color-text-on-dark-muted);
		font-size: var(--text-15);
		line-height: var(--leading-relaxed);
	}
	.cta__next strong {
		color: var(--color-text-on-dark);
	}
	.cta__note {
		margin-top: var(--space-4);
		color: var(--color-text-on-inverse);
	}
</style>
