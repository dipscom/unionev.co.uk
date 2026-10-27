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

<footer class="footer">
	<div class="container">
		<div class="footer__top">
			<div>
				<div class="footer__logo"><Logo size="footer" /></div>
				<p class="footer__tagline">{site.tagline}</p>
			</div>

			<div class="footer__col">
				<h2 class="footer__heading">Contact</h2>
				<a href={mailto}>{site.email}</a>
				<a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<NewTabHint /></a>
			</div>

			<div class="footer__col">
				<h2 class="footer__heading">Drivers</h2>
				<p class="footer__note">Already charging with us?</p>
				<a href={driverSupport}>Driver support</a>
			</div>

			<div class="footer__col">
				<h2 class="footer__heading">Quick Links</h2>
				{#each navLinks as link (link.href)}
					<a href={base + link.href}>{link.label}</a>
				{/each}
				<a href="/privacy" aria-current={page.url.pathname === '/privacy' ? 'page' : undefined}
					>Privacy</a
				>
			</div>
		</div>

		<div class="footer__bottom">
			<p>© {site.year} {site.legalName}. All rights reserved.</p>
			<p>{legal}</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		--focus-ring: var(--orange-pale);
		padding: 3.5rem var(--gutter);
		background: var(--gray-950);
		color: var(--gray-400);
	}
	.footer :global(.container) {
		padding-inline: 0;
	}
	.footer__top {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		gap: 2.5rem;
		margin-bottom: 2.5rem;
	}
	.footer__logo {
		display: flex;
		align-items: center;
		width: fit-content;
		margin-bottom: 1rem;
		padding: 0.375rem 0.75rem;
		background: var(--white);
		border-radius: var(--radius-lg);
	}
	.footer__tagline {
		max-width: 20rem;
		color: var(--gray-400);
		font-size: 0.875rem;
		line-height: 1.625;
	}
	.footer__col {
		display: flex;
		flex-direction: column;
		font-size: 0.875rem;
		line-height: 1.3125rem;
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
		color: var(--white);
	}
	.footer__col a[aria-current='page'] {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	/* Same padding as the links, so it lines up with the first link in the other columns */
	.footer__note {
		padding-block: 0.75rem;
		color: var(--gray-400);
	}
	.footer__heading {
		margin-bottom: 0.25rem;
		color: var(--gray-400);
		font-size: 0.75rem;
		line-height: 1.125rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.footer__bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--gray-800);
		color: var(--gray-400);
		font-size: 0.75rem;
		line-height: 1.125rem;
	}
	@media (min-width: 640px) {
		.footer__bottom {
			flex-direction: row;
		}
	}
	@media (min-width: 768px) {
		.footer__top {
			flex-direction: row;
		}
	}
</style>
