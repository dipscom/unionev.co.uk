<script lang="ts">
	import { site } from '../content/site';
	import EnquiryForm from './EnquiryForm.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section id="contact" tone="dark" width="text" class="contact">
	<SectionHeader
		eyebrow="Get In Touch"
		title="Let's talk about your project"
		lead="Tell us about your site and we'll come back with a clear picture of what's possible: the infrastructure, the funding options and the revenue it could generate."
		tone="dark"
		spacing="sm"
		leadWidth="full"
		tight
		relaxed
	/>
	<p class="contact__next">
		What happens next: we read your enquiry and email you to arrange a free site assessment.
		{site.responseCommitment}
	</p>

	<EnquiryForm />

	<p class="contact__note">Free site assessment · No obligation</p>
</Section>

<style>
	:global(.contact) {
		text-align: center;
	}
	.contact__next {
		color: var(--gray-300);
	}
	.contact__note {
		margin-top: 2rem;
		color: var(--gray-300);
		font-size: 0.875rem;
	}
</style>
