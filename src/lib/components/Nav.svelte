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
	<div class="container nav__bar">
		<Logo />

		<div class="nav__links">
			{#each navLinks as link (link.href)}
				<a href={base + link.href} class="nav__link">{link.label}</a>
			{/each}
		</div>

		<Button href="{base}#contact" size="sm" class="nav__cta">{site.primaryCta}</Button>

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
			<a href={base + link.href} class="nav__mobile-link">{link.label}</a>
		{/each}
		<Button href="{base}#contact" size="sm">{site.primaryCta}</Button>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto;
		z-index: 50;
		background: rgb(255 255 255 / 0.95);
		backdrop-filter: blur(4px);
		border-bottom: 1px solid var(--gray-100);
	}
	.nav__bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 1rem;
	}
	.nav__links {
		display: none;
		align-items: center;
		gap: 2rem;
	}
	/* 44px targets (WCAG 2.5.5) */
	.nav__link {
		padding-block: 0.75rem;
		color: var(--gray-600);
		font-size: 0.875rem;
		font-weight: 500;
		transition: color var(--transition);
	}
	.nav__link:hover {
		color: var(--green-900);
	}
	.nav :global(.nav__cta) {
		display: none;
	}
	.nav__toggle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* 44px tap target */
		min-width: 2.75rem;
		min-height: 2.75rem;
		padding: 0.75rem;
	}
	.nav__bar-line {
		display: block;
		width: 1.25rem;
		height: 2px;
		background: var(--gray-900);
	}
	.nav__bar-line + .nav__bar-line {
		margin-top: 0.25rem;
	}
	.nav__mobile {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.5rem var(--gutter) 1rem;
		background: var(--white);
		border-top: 1px solid var(--gray-100);
	}
	.nav__mobile[hidden] {
		display: none;
	}
	.nav__mobile-link {
		padding-block: 0.75rem;
		color: var(--gray-700);
		font-size: 0.875rem;
		font-weight: 500;
	}

	@media (min-width: 768px) {
		.nav__links {
			display: flex;
		}
		.nav :global(.nav__cta) {
			display: inline-flex;
		}
		.nav__toggle,
		.nav__mobile {
			display: none;
		}
	}
</style>
