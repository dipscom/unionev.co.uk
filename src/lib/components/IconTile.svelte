<script lang="ts">
	import Icon, { type IconName } from './Icon.svelte';

	type Props = {
		icon: IconName;
	};

	let { icon }: Props = $props();
</script>

<div class="icon-tile color-accent">
	<Icon name={icon} size="1.25rem" />
</div>

<style>
	.icon-tile {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--color-surface-accent);
		border-radius: var(--radius-xl);
	}
</style>
