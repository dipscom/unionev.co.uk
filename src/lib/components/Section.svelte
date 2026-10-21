<script lang="ts">
	import type { Snippet } from 'svelte';

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
</script>

<section
	{id}
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
