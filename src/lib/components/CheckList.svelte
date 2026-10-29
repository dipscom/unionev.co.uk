<script lang="ts">
	import Icon from './Icon.svelte';

	type Props = {
		items: string[];
		variant?: 'good' | 'bad';
	};

	let { items, variant = 'good' }: Props = $props();
</script>

<ul class="check-list" data-variant={variant}>
	{#each items as item (item)}
		<li class="with-icon">
			<span class="check-list__mark">
				<Icon name={variant === 'good' ? 'check' : 'cross'} size="1rem" />
			</span>
			<span class="check-list__text">{item}</span>
		</li>
	{/each}
</ul>
