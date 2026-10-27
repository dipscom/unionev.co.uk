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
		children: Snippet;
	};

	let {
		id,
		tone = 'white',
		size = 'lg',
		width = 'wide',
		class: className = '',
		children
	}: Props = $props();

	const uid = $props.id();
	// Every Section has a SectionHeader, which picks this id up for its <h2>
	const headingId = `${uid}-heading`;
	setContext(headingKey, headingId);
</script>

<section
	{id}
	aria-labelledby={headingId}
	class={[
		'section',
		tone !== 'white' && `section--${tone}`,
		size !== 'lg' && `section--${size}`,
		className
	]}
>
	<div class={['container', width !== 'wide' && `container--${width}`]}>
		{@render children()}
	</div>
</section>
