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

		<button type="button" class="nav__toggle" popovertarget="nav-menu" aria-label="Toggle menu">
			<span class="nav__bar-line"></span>
			<span class="nav__bar-line"></span>
			<span class="nav__bar-line"></span>
		</button>

		<!-- One menu for every width. Below 768px it is a popover, so the browser handles
		     open/close, Escape, outside clicks and focus, with or without JavaScript; from
		     768px it is just the links and button inline in the bar -->
		<div id="nav-menu" class="nav__menu" popover>
			<ul class="nav__links">
				{#each navLinks as link (link.href)}
					<li><a href={base + link.href} class="nav__link">{link.label}</a></li>
				{/each}
			</ul>
			<Button href="{base}#contact" size="sm">{site.primaryCta}</Button>
		</div>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto;
		z-index: 50;
		/* Where the mobile menu popover starts: the bar's padding, 44px toggle and border */
		--nav-height: calc(var(--space-4) * 2 + 2.75rem + 1px);
		background: var(--color-surface-translucent);
		backdrop-filter: blur(4px);
		border-bottom: 1px solid var(--color-border);
	}
	.nav__bar {
		--wrapper-max: calc(var(--w-6xl) - var(--gutter) * 2);
		flex-wrap: nowrap;
		padding-block: var(--space-4);
	}
	/* Popovers render in the top layer, so position under the bar rather than inside the nav */
	.nav__menu {
		inset: var(--nav-height) 0 auto;
		width: auto;
		height: auto;
		margin: 0;
		overflow: visible;
		border: 0;
		border-top: 1px solid var(--color-border);
		background: var(--color-surface);
		color: inherit;
		padding: var(--space-2) var(--gutter) var(--space-4);
	}
	.nav__menu:popover-open {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.nav__menu::backdrop {
		background: transparent;
	}
	.nav__links {
		display: flex;
		flex-direction: column;
	}
	/* 44px targets (WCAG 2.5.5) */
	.nav__link {
		display: block;
		padding-block: var(--space-3);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-weight: 500;
		transition: color var(--transition);
	}
	.nav__link:hover {
		color: var(--color-brand);
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

	@media (min-width: 768px) {
		/* The links and the button become flex items of the bar itself */
		.nav__menu,
		.nav__menu:popover-open {
			display: contents;
		}
		.nav__links {
			flex-direction: row;
			align-items: center;
			gap: var(--space-8);
		}
		.nav__toggle {
			display: none;
		}
	}
</style>
