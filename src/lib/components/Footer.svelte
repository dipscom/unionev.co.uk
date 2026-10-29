<script lang="ts">
	import { page } from '$app/state';
	import { navLinks } from '../content/nav';
	import { driverSupport, mailto, site } from '../content/site';
	import Logo from './Logo.svelte';
	import NewTabHint from './NewTabHint.svelte';

	type Props = {
		/** Prefix for in-page anchors; use "/" on pages other than the home page */
		base?: string;
	};

	let { base = '' }: Props = $props();

	const legal = [
		site.registered,
		site.companyNumber && `Company No. ${site.companyNumber}`,
		site.registeredOffice && `Registered office: ${site.registeredOffice}`,
		site.insurance
	]
		.filter(Boolean)
		.join(' · ');
</script>

<footer class="footer theme-dark">
	<div class="wrapper">
		<div class="footer__top repel" data-stack-below="md">
			<div>
				<div class="footer__logo"><Logo size="footer" /></div>
				<p class="footer__tagline text-sm leading-relaxed">{site.tagline}</p>
			</div>

			<div class="footer__col text-sm">
				<h2 class="footer__heading text-xs weight-semibold">Contact</h2>
				<a href={mailto}>{site.email}</a>
				<a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<NewTabHint /></a>
			</div>

			<div class="footer__col text-sm">
				<h2 class="footer__heading text-xs weight-semibold">Drivers</h2>
				<p class="footer__note">Already charging with us?</p>
				<a href={driverSupport}>Driver support</a>
			</div>

			<div class="footer__col text-sm">
				<h2 class="footer__heading text-xs weight-semibold">Quick Links</h2>
				{#each navLinks as link (link.href)}
					<a href={base + link.href}>{link.label}</a>
				{/each}
				<a href="/privacy" aria-current={page.url.pathname === '/privacy' ? 'page' : undefined}
					>Privacy</a
				>
			</div>
		</div>

		<div class="footer__bottom text-xs">
			<p>© {site.year} {site.legalName}. All rights reserved.</p>
			<p>{legal}</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding-block: var(--space-14);
		background: var(--color-surface-inverse);
		color: var(--color-text-on-inverse);
	}
	.footer__top {
		--repel-align: flex-start;
		--repel-gap: var(--space-10);
		margin-bottom: var(--space-10);
	}
	.footer__logo {
		display: flex;
		align-items: center;
		width: fit-content;
		margin-bottom: var(--space-4);
		padding: var(--space-1-5) var(--space-3);
		background: var(--color-surface);
		border-radius: var(--radius-lg);
	}
	.footer__tagline {
		max-width: 20rem;
		color: var(--color-text-on-inverse);
	}
	.footer__col {
		display: flex;
		flex-direction: column;
	}
	/* 44px targets (WCAG 2.5.5), stacked with no gap so they don't overlap */
	.footer__col a {
		display: flex;
		align-items: center;
		min-height: 2.75rem;
		transition: color var(--transition);
	}
	.footer__col a:hover,
	.footer__col a[aria-current='page'] {
		color: var(--color-text-on-dark);
	}
	.footer__col a[aria-current='page'] {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	/* Same padding as the links, so it lines up with the first link in the other columns */
	.footer__note {
		padding-block: var(--space-3);
		color: var(--color-text-on-inverse);
	}
	.footer__heading {
		margin-bottom: var(--space-1);
		color: var(--color-text-on-inverse);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.footer__bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-border-inverse);
		color: var(--color-text-on-inverse);
	}
	@media (min-width: 640px) {
		.footer__bottom {
			flex-direction: row;
		}
	}
</style>
