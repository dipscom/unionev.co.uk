<script lang="ts">
	import { benefits } from '../content/partners';
	import Icon from './Icon.svelte';
</script>

<!-- No visible heading, so the region is named here -->
<section class="strip" aria-label="Key benefits">
	<ul class="container strip__list">
		{#each benefits as benefit, i (benefit)}
			{#if i > 0}
				<li class="strip__divider" aria-hidden="true">|</li>
			{/if}
			<li class="strip__item"><Icon name="check" size="1rem" />{benefit}</li>
		{/each}
	</ul>
</section>

<style>
	.strip {
		padding: 1rem var(--gutter);
		background: var(--green-900);
		color: var(--white);
		font-size: 0.875rem;
		line-height: 1.3125rem;
		font-weight: 500;
	}
	.strip__list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		padding-inline: 0;
	}
	.strip__item {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
	}
	.strip__divider {
		display: none;
		color: rgb(255 255 255 / 0.4);
	}
	@media (min-width: 640px) {
		.strip__divider {
			display: block;
		}
	}
</style>
