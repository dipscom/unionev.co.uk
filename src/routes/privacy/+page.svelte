<script lang="ts">
	import NewTabHint from '#lib/components/NewTabHint.svelte';
	import PageShell from '#lib/components/PageShell.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { site } from '../../lib/content/site';
</script>

<Seo
	title="Privacy & Cookie Notice | Union EV"
	description="How Union Electric Vehicle Charging Limited handles personal information received through this website."
	path="/privacy"
/>

<PageShell base="/">
	<article class="privacy region">
		<div class="wrapper flow">
			<div class="section-head flow">
				<p class="eyebrow">Legal</p>
				<h1 class="section-title">Privacy &amp; Cookie Notice</h1>
			</div>
			<p class="privacy__updated text-sm color-subtle">Last updated: 27 October 2026</p>

			<h2>Who we are</h2>
			<p>
				This website is operated by {site.legalName} ("Union EV", "we", "us"), registered in England &amp;
				Wales. We are the controller of personal information collected through this website.
			</p>

			<h2>What we collect</h2>
			<p>
				If you use the enquiry form, we receive your name, email address, organisation, the site
				postcode and type of site, and any project details you choose to add. The form also records
				the page you came from and any campaign tags in the link you followed (such as
				<code>utm_source</code>), so we can see which of our marketing is working. If you email us
				at <a href="mailto:{site.email}">{site.email}</a>, we receive your email address, your name
				if you include it, and anything else you choose to tell us. We use this only to reply to
				your enquiry, to arrange a site assessment and, if you become a customer, to provide our
				service.
			</p>
			<p>
				Our hosting provider may keep standard server logs (such as IP address, date and time, and
				the page requested) for security and reliability.
			</p>

			<h2>Cookies and analytics</h2>
			<p>
				We do not currently set cookies or use analytics or advertising trackers on this website. If
				that changes, we will update this notice and ask for your consent where the law requires it.
			</p>

			<h2>Third parties</h2>
			<p>
				We use Cloudflare Turnstile to check that enquiries come from people, not robots. It runs
				when you start filling in the form and may use your browser and device details to decide; it
				is subject to Cloudflare's own privacy policy. We use Brevo (a French company with EU data
				centres) to deliver the enquiry to us and your confirmation email to you, so it processes
				your enquiry and email address on our behalf. Our images and fonts are served from this
				website, not from a third party.
			</p>

			<h2>Our legal basis and how long we keep information</h2>
			<p>
				We process enquiry emails because it is in our legitimate interests to respond to people who
				contact us, and to take steps you ask for before entering into a contract. We keep enquiries
				(forms and emails) only as long as needed for that purpose, or longer where we are required
				to by law.
			</p>

			<h2>Your rights</h2>
			<p>
				Under United Kingdom (UK) data protection law you can ask us for access to, correction of,
				or deletion of your personal information, and you can object to or ask us to restrict how we
				use it. Email us to make a request. If you are unhappy with how we have handled your
				information, you can complain to the Information Commissioner's Office at
				<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer"
					>ico.org.uk<NewTabHint /></a
				>.
			</p>

			<h2>Contact</h2>
			<p>
				{site.legalName}<br />
				<a href="mailto:{site.email}">{site.email}</a>
			</p>
		</div>
	</article>
</PageShell>

<style>
	.privacy {
		padding-top: calc(var(--nav-height) + var(--space-16));
	}
	.privacy .wrapper {
		--wrapper-max: var(--w-3xl);
		--flow-space: 1.5em;
	}
	.privacy .section-head {
		text-align: left;
	}
	.privacy__updated {
		margin-top: var(--space-4);
		margin-bottom: var(--space-8);
	}
	h2 {
		margin: var(--space-8) 0 var(--space-3);
		color: var(--color-heading);
		font-size: var(--text-xl);
		line-height: var(--leading-lg);
		font-weight: 700;
	}
	h2 + p {
		margin-top: 0;
	}
	/* WCAG 1.4.8: paragraph gap of 1.5em (the flow), and lines kept under 80 characters */
	.privacy p {
		max-width: 56ch;
		color: var(--color-text-muted);
		line-height: var(--leading-relaxed);
	}
	a {
		color: var(--color-brand);
		font-weight: 600;
		text-decoration: underline;
	}
</style>
