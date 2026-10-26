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
	let open = $state(false);
	let toggle: HTMLButtonElement;
	const close = () => (open = false);

	function onkeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') {
			close();
			toggle.focus();
		}
	}
</script>

<svelte:window {onkeydown} />

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
			bind:this={toggle}
			aria-label="Toggle menu"
			aria-expanded={open}
			aria-controls="mobile-menu"
			onclick={() => (open = !open)}
		>
			<span class="nav__bar-line"></span>
			<span class="nav__bar-line"></span>
			<span class="nav__bar-line"></span>
		</button>
	</div>

	{#if open}
		<div id="mobile-menu" class="nav__mobile">
			{#each navLinks as link (link.href)}
				<a href={base + link.href} class="nav__mobile-link" onclick={close}>{link.label}</a>
			{/each}
			<Button href="{base}#contact" size="sm" onclick={close}>{site.primaryCta}</Button>
		</div>
	{/if}
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
	.nav__link {
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
		gap: 1rem;
		padding: 1rem var(--gutter);
		background: var(--white);
		border-top: 1px solid var(--gray-100);
	}
	.nav__mobile-link {
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
