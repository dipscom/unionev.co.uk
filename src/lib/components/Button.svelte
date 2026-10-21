<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAnchorAttributes, 'class' | 'children'> & {
		href: string;
		variant?: 'primary' | 'outline' | 'brand';
		size?: 'md' | 'lg';
		/** Small second line shown under the label */
		sublabel?: string;
		class?: string;
		children: Snippet;
	};

	let {
		href,
		variant = 'primary',
		size = 'md',
		sublabel,
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<!-- hrefs here are in-page anchors, mailto: or external URLs, never app routes -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	class={[
		'btn',
		`btn--${variant}`,
		size === 'lg' && 'btn--lg',
		sublabel && 'btn--stacked',
		className
	]}
	{...rest}
>
	{#if sublabel}
		<span class="btn__label">{@render children()}</span>
		<span class="btn__sublabel">{sublabel}</span>
	{:else}
		{@render children()}
	{/if}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
