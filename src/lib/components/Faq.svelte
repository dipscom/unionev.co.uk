<script lang="ts">
	import { faqs } from '../content/faqs';
	import FaqItem from './FaqItem.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<Section width="text">
	<SectionHeader
		eyebrow="Common Questions"
		title="Everything you need to know"
		lead="No jargon. Just straight answers."
		spacing="md"
		leadWidth="full"
	/>
	<div class="stack" style="--stack-gap: 1rem">
		{#each faqs as faq (faq.q)}
			<FaqItem question={faq.q} answer={faq.a} />
		{/each}
	</div>
	<p class="faq-more">
		Still have a question? <a href="#contact">Get in touch</a> and we'll get back to you.
	</p>
</Section>

<style>
	.faq-more {
		margin-top: 2.5rem;
		color: var(--gray-500);
		font-size: 0.875rem;
		line-height: 1.25rem;
		text-align: center;
	}
	.faq-more a {
		color: var(--green-900);
		font-weight: 600;
	}
	.faq-more a:hover {
		text-decoration: underline;
	}
</style>
