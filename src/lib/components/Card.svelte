<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		hover?: boolean;
		shadow?: boolean;
		class?: string;
		children: Snippet;
	};

	let { hover = false, shadow = false, class: className = '', children }: Props = $props();
</script>

<div class={['card', hover && 'card--hover', shadow && 'card--shadow', className]}>
	{@render children()}
</div>
