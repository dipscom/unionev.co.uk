<script lang="ts">
	type Props = {
		value: string;
		label: string;
	};

	let { value, label }: Props = $props();
</script>

<div class="card stat shadow-sm text-center">
	<div class="stat__value weight-extrabold color-brand">{value}</div>
	<div class="stat__label text-sm color-muted">{label}</div>
</div>

<style>
	.stat {
		border-color: var(--color-border-brand-subtle);
	}
	.stat__value {
		margin-bottom: var(--space-2);
		font-size: var(--text-4xl);
		line-height: var(--leading-4xl);
	}
</style>
