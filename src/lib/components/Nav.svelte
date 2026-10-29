<script lang="ts">
	import { navLinks } from '../content/nav';
	import { site } from '../content/site';
	import Button from './Button.svelte';
	import Logo from './Logo.svelte';

	type Props = {
		/** Prefix for in-page anchors; use "/" on pages other than the home page */
		base?: string;
	};

	let { base = '' }: Props = $props();
</script>

<nav class="nav" aria-label="Main">
	<div class="nav__bar wrapper repel">
		<Logo />

		<div class="nav__links">
			{#each navLinks as link (link.href)}
				<a href={base + link.href} class="nav__link">{link.label}</a>
			{/each}
		</div>

		<div class="nav__cta">
			<Button href="{base}#contact" size="sm">{site.primaryCta}</Button>
		</div>

		<button
			type="button"
			class="nav__toggle"
			data-disclosure
			data-menu-toggle
			aria-label="Toggle menu"
			aria-expanded="false"
			aria-controls="mobile-menu"
		>
			<span class="nav__bar-line"></span>
			<span class="nav__bar-line"></span>
			<span class="nav__bar-line"></span>
		</button>
	</div>

	<div id="mobile-menu" class="nav__mobile" data-disclosure-panel data-menu hidden>
		{#each navLinks as link (link.href)}
			<a href={base + link.href} class="nav__mobile-link text-sm">{link.label}</a>
		{/each}
		<Button href="{base}#contact" size="sm">{site.primaryCta}</Button>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto;
		z-index: 50;
		background: var(--color-surface-translucent);
		backdrop-filter: blur(4px);
		border-bottom: 1px solid var(--color-border);
	}
	.nav__bar {
		--wrapper-max: calc(var(--w-6xl) - var(--gutter) * 2);
		flex-wrap: nowrap;
		padding-block: var(--space-4);
	}
	.nav__links {
		display: none;
		align-items: center;
		gap: var(--space-8);
	}
	/* 44px targets (WCAG 2.5.5) */
	.nav__link {
		padding-block: var(--space-3);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-weight: 500;
		transition: color var(--transition);
	}
	.nav__link:hover {
		color: var(--color-brand);
	}
	.nav__cta {
		display: none;
	}
	.nav__toggle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* 44px tap target */
		min-width: 2.75rem;
		min-height: 2.75rem;
		padding: var(--space-3);
	}
	.nav__bar-line {
		display: block;
		width: 1.25rem;
		height: 2px;
		background: var(--color-text);
	}
	.nav__bar-line + .nav__bar-line {
		margin-top: var(--space-1);
	}
	.nav__mobile {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: var(--space-2) var(--gutter) var(--space-4);
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
	}
	.nav__mobile[hidden] {
		display: none;
	}
	.nav__mobile-link {
		padding-block: var(--space-3);
		color: var(--color-text-soft);
		font-weight: 500;
	}

	@media (min-width: 768px) {
		.nav__links {
			display: flex;
		}
		/* The button itself stays the flex item of the bar */
		.nav__cta {
			display: contents;
		}
		.nav__toggle,
		.nav__mobile {
			display: none;
		}
	}
</style>
