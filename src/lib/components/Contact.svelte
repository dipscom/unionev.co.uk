<script lang="ts">
	import { mailto, site } from '../content/site';
	import Button from './Button.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section id="contact" tone="dark" width="text" class="contact">
	<SectionHeader
		eyebrow="Get In Touch"
		title="Let's talk about your project"
		lead="Whether you manage a residential development, run a fleet, or are building new homes — drop us an email and we'll come back to you same day with a clear picture of what's possible."
		tone="dark"
		spacing="sm"
		leadWidth="full"
		tight
		relaxed
	/>
	<Button href={mailto} size="lg">
		<span aria-hidden="true">✉</span>
		<span>Email Us: {site.email}</span>
	</Button>
	<p class="contact__note">Free site assessment · No obligation · Response same day</p>
</Section>

<style>
	:global(.contact) {
		text-align: center;
	}
	.contact__note {
		margin-top: 1.5rem;
		color: var(--gray-400);
		font-size: 0.875rem;
	}
</style>
