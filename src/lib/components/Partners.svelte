<script lang="ts">
	import { partners } from '../content/partners';
	import NewTabHint from './NewTabHint.svelte';

	const uid = $props.id();
	const headingId = `${uid}-heading`;
</script>

<section class="partners text-center" aria-labelledby={headingId}>
	<div class="wrapper" style="--wrapper-max: var(--w-4xl)">
		<h2 id={headingId} class="partners__label text-xs weight-semibold color-subtle">
			Powered by trusted partners
		</h2>
		<ul class="partners__list cluster">
			{#each partners as partner, i (partner.name)}
				{#if i > 0}
					<li class="partners__divider" aria-hidden="true"></li>
				{/if}
				<li class="partners__item">
					<svelte:element
						this={partner.url ? 'a' : 'span'}
						href={partner.url}
						target={partner.url && '_blank'}
						rel={partner.url && 'noopener noreferrer'}
						class="partners__name weight-extrabold"
					>
						{#if partner.logo}
							<img src={partner.logo} alt={partner.name} class="partners__logo" />
						{:else}
							{partner.name}
						{/if}
						{#if partner.url}<NewTabHint />{/if}
					</svelte:element>
					<span class="partners__role text-xs color-subtle">{partner.role}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.partners {
		padding-block: var(--space-10);
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
	}
	.partners__label {
		margin-bottom: var(--space-6);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.partners__list {
		--cluster-gap: var(--space-10);
	}
	.partners__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-1);
	}
	.partners__name {
		color: var(--color-text-strong);
		font-size: var(--text-xl);
		line-height: var(--leading-lg);
		letter-spacing: -0.025em;
		transition: color var(--transition);
	}
	/* 44px target (WCAG 2.5.5); the negative margin keeps the layout as it was */
	a.partners__name {
		margin-block: calc(var(--space-2) * -1);
		padding-block: var(--space-2);
	}
	a.partners__name:hover {
		color: var(--color-brand);
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	.partners__logo {
		height: 2rem;
		width: auto;
	}
	.partners__divider {
		display: none;
		width: 1px;
		height: 2rem;
		background: var(--color-border-strong);
	}
	@media (min-width: 640px) {
		.partners__divider {
			display: block;
		}
	}
</style>
