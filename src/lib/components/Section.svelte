<script lang="ts" module>
	import { getContext, setContext, type Snippet } from 'svelte';

	const headingKey = Symbol('section-heading');

	/** Id for the section's heading, so the section is named after it (WCAG 1.3.6) */
	export const getSectionHeadingId = () => getContext<string | undefined>(headingKey);
</script>

<script lang="ts">
	type Props = {
		id?: string;
		tone?: 'white' | 'alt' | 'dark';
		size?: 'lg' | 'md' | 'sm';
		width?: 'wide' | 'narrow' | 'text';
		class?: string;
		/** Custom properties for the wrapper's flow, e.g. `--flow-space` for the gap after the header */
		style?: string;
		children: Snippet;
	};

	let {
		id,
		tone = 'white',
		size = 'lg',
		width = 'wide',
		class: className = '',
		style = '',
		children
	}: Props = $props();

	const regionSpace = {
		lg: '',
		md: '--region-space: var(--space-20);',
		sm: '--region-space: var(--space-16);'
	};
	const wrapperMax = {
		wide: '',
		narrow: '--wrapper-max: var(--w-4xl);',
		text: '--wrapper-max: var(--w-3xl);'
	};

	const uid = $props.id();
	// Every Section has a SectionHeader, which picks this id up for its <h2>
	const headingId = `${uid}-heading`;
	setContext(headingKey, headingId);
</script>

<section
	{id}
	aria-labelledby={headingId}
	class={[
		'region',
		tone === 'alt' && 'bg-surface-alt',
		tone === 'dark' && 'theme-dark bg-brand',
		className
	]}
	style={regionSpace[size] || undefined}
>
	<div class="wrapper flow" style="{wrapperMax[width]}{style}">
		{@render children()}
	</div>
</section>

<style>
	/* The gap after the header; a caller's `style` can set another */
	.flow {
		--flow-space: var(--space-16);
	}
</style>
