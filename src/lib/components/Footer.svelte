<script lang="ts">
	import { navLinks } from '../content/nav';
	import { mailto, site } from '../content/site';
	import Logo from './Logo.svelte';

	type Props = {
		/** Prefix for in-page anchors; use "/" on pages other than the home page */
		base?: string;
	};

	let { base = '' }: Props = $props();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer__top">
			<div>
				<div class="footer__logo"><Logo size="footer" /></div>
				<p class="footer__tagline">{site.tagline}</p>
			</div>

			<div class="footer__col">
				<p class="footer__heading">Contact</p>
				<a href={mailto}>{site.email}</a>
				<a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
			</div>

			<div class="footer__col">
				<p class="footer__heading">Quick Links</p>
				{#each navLinks as link (link.href)}
					<a href={base + link.href}>{link.label}</a>
				{/each}
				<a href="/privacy">Privacy</a>
			</div>
		</div>

		<div class="footer__bottom">
			<p>© {site.year} {site.legalName}. All rights reserved.</p>
			<p>{site.registered}</p>
		</div>
	</div>
</footer>

<style>
	.footer {
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
		color: var(--gray-500);
		font-size: 0.875rem;
		line-height: 1.625;
	}
	.footer__col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	.footer__col a {
		transition: color var(--transition);
	}
	.footer__col a:hover {
		color: var(--white);
	}
	.footer__heading {
		margin-bottom: 0.25rem;
		color: var(--gray-600);
		font-size: 0.75rem;
		line-height: 1rem;
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
		color: var(--gray-600);
		font-size: 0.75rem;
		line-height: 1rem;
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
