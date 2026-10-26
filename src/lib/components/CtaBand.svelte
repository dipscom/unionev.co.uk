<script lang="ts">
	import Button from './Button.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section tone="dark" size="md" width="narrow" class="cta">
	<SectionHeader
		eyebrow="Free. No obligation. No commitment."
		title="Find out what's possible at your site"
		lead="A free site assessment gives you a clear picture of the infrastructure, funding options, and revenue your development could generate — with no strings attached."
		tone="dark"
		spacing="xs"
		titleSize="md"
	/>
	<div class="cta__actions">
		<Button href="#contact">Book Your Free Site Assessment</Button>
		<Button href="#case-study" variant="outline">See a Real Example</Button>
	</div>
	<p class="cta__note">
		£10M liability insurance · Certified engineers · 100% renewable electricity
	</p>
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
	.cta__note {
		margin-top: 1.5rem;
		color: var(--gray-400);
		font-size: 0.875rem;
	}
	@media (min-width: 640px) {
		.cta__actions {
			flex-direction: row;
		}
	}
</style>
