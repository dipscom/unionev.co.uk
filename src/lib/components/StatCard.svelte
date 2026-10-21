<script lang="ts">
	type Props = {
		value: string;
		label: string;
	};

	let { value, label }: Props = $props();
</script>

<div class="card card--shadow stat">
	<div class="stat__value">{value}</div>
	<div class="stat__label">{label}</div>
</div>

<style>
	.stat {
		text-align: center;
		border-color: rgb(2 58 49 / 0.1);
	}
	.stat__value {
		margin-bottom: 0.5rem;
		color: var(--green-900);
		font-size: 2.25rem;
		line-height: 2.5rem;
		font-weight: 800;
	}
	.stat__label {
		color: var(--gray-600);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
