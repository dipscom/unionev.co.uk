<script lang="ts">
	import Icon from './Icon.svelte';

	type Props = {
		items: string[];
		variant?: 'good' | 'bad';
	};

	let { items, variant = 'good' }: Props = $props();
</script>

<ul class={['check-list', `check-list--${variant}`]}>
	{#each items as item (item)}
		<li>
			<span class="check-list__mark">
				<Icon name={variant === 'good' ? 'check' : 'cross'} size="1rem" />
			</span>
			<span class="check-list__text">{item}</span>
		</li>
	{/each}
</ul>
