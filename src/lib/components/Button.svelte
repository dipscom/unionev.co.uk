<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAnchorAttributes, 'class' | 'children'> & {
		href: string;
		variant?: 'primary' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		children: Snippet;
	};

	let {
		href,
		variant = 'primary',
		size = 'md',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<a {href} class={['btn', className]} data-variant={variant} data-size={size} {...rest}>
	{@render children()}
</a>
