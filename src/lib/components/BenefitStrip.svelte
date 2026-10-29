<script lang="ts">
	import { benefits } from '../content/partners';
	import Icon from './Icon.svelte';
</script>

<!-- No visible heading, so the region is named here -->
<section class="strip text-sm bg-brand" aria-label="Key benefits">
	<ul class="strip__list wrapper cluster">
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
		padding-block: var(--space-4);
		color: var(--color-text-on-dark);
		font-weight: 500;
	}
	.strip__list {
		--cluster-gap: var(--space-8);
	}
	.strip__item {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
	}
	.strip__divider {
		display: none;
		color: var(--color-divider-on-brand);
	}
	@media (min-width: 640px) {
		.strip__divider {
			display: block;
		}
	}
</style>
