<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		shadow?: boolean;
		class?: string;
		children: Snippet;
	};

	let { shadow = false, class: className = '', children }: Props = $props();
</script>

<div class={['card', shadow && 'card--shadow', className]}>
	{@render children()}
</div>
