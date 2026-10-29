<script lang="ts">
	import { site } from '../content/site';
	import EnquiryForm from './EnquiryForm.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section
	id="contact"
	tone="dark"
	width="text"
	class="text-center"
	style="--flow-space: var(--space-10); --title-leading: var(--leading-tight); --lead-leading: var(--leading-relaxed)"
>
	<SectionHeader
		eyebrow="Get In Touch"
		title="Let's talk about your project"
		lead="Tell us about your site and we'll come back with a clear picture of what's possible: the infrastructure, the funding options and the revenue it could generate."
		leadWidth="full"
	/>
	<p class="contact__next">
		What happens next: we read your enquiry and email you to arrange a free site assessment.
		{site.responseCommitment}
	</p>

	<EnquiryForm />

	<p class="contact__note text-sm">Free site assessment · No obligation</p>
</Section>

<style>
	.contact__next {
		color: var(--color-text-on-dark-muted);
	}
	.contact__note {
		margin-top: var(--space-8);
		color: var(--color-text-on-dark-muted);
	}
</style>
