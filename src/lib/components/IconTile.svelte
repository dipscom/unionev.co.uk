<script lang="ts">
	type Props = {
		icon: string;
	};

	let { icon }: Props = $props();
</script>

<div class="icon-tile" aria-hidden="true">{icon}</div>

<style>
	.icon-tile {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--orange-tint);
		border-radius: var(--radius-xl);
		font-size: 1.5rem;
		line-height: 2rem;
	}
</style>
