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
		leadWidth="full"
	/>
	<div class="faq-list flow">
		{#each faqs as faq (faq.q)}
			<FaqItem question={faq.q} answer={faq.a} />
		{/each}
	</div>
	<p class="faq-more text-sm color-subtle text-center">
		Still have a question? <a href="#contact">Get in touch</a> and we'll get back to you.
	</p>
</Section>

<style>
	.faq-list {
		--flow-space: var(--space-4);
		/* Below the header, which the wrapper's flow would space by 4rem */
		margin-top: var(--space-14);
	}
	.faq-more {
		margin-top: var(--space-10);
	}
	.faq-more a {
		color: var(--color-brand);
		font-weight: 600;
	}
	.faq-more a:hover {
		text-decoration: underline;
	}
</style>
