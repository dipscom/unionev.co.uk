<script lang="ts">
	import { partners } from '../content/partners';
</script>

<section class="partners">
	<div class="container container--narrow">
		<p class="partners__label">Powered by trusted partners</p>
		<ul class="partners__list">
			{#each partners as partner, i (partner.name)}
				{#if i > 0}
					<li class="partners__divider" aria-hidden="true"></li>
				{/if}
				<li class="partners__item">
					<span class="partners__name">{partner.name}</span>
					<span class="partners__role">{partner.role}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.partners {
		padding: 2.5rem var(--gutter);
		background: var(--white);
		border-bottom: 1px solid var(--gray-100);
		text-align: center;
	}
	.partners :global(.container) {
		padding-inline: 0;
	}
	.partners__label {
		margin-bottom: 1.5rem;
		color: var(--gray-400);
		font-size: 0.75rem;
		line-height: 1rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.partners__list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
	}
	.partners__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}
	.partners__name {
		color: var(--gray-800);
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.025em;
	}
	.partners__role {
		color: var(--gray-400);
		font-size: 0.75rem;
		line-height: 1rem;
	}
	.partners__divider {
		display: none;
		width: 1px;
		height: 2rem;
		background: var(--gray-200);
	}
	@media (min-width: 640px) {
		.partners__divider {
			display: block;
		}
	}
</style>
