<script lang="ts">
	import { getSectionHeadingId } from './Section.svelte';

	type Props = {
		eyebrow?: string;
		title: string;
		lead?: string;
		titleSize?: 'lg' | 'md' | 'sm';
		/** Max width of the lead paragraph; defaults to 42rem */
		leadWidth?: 'xl' | '2xl' | 'full';
	};

	let { eyebrow, title, lead, titleSize = 'lg', leadWidth = '2xl' }: Props = $props();
	const headingId = getSectionHeadingId();
</script>

<div class="section-head flow" data-title-size={titleSize} data-lead-width={leadWidth}>
	{#if eyebrow}
		<span class="eyebrow">{eyebrow}</span>
	{/if}
	<h2 id={headingId} class="section-title">{title}</h2>
	{#if lead}
		<p class="section-lead">{lead}</p>
	{/if}
</div>
