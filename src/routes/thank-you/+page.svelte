<script lang="ts">
	import Button from '#lib/components/Button.svelte';
	import PageShell from '#lib/components/PageShell.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { site } from '../../lib/content/site';
</script>

<Seo title="Enquiry received | Union EV" path="/thank-you" noindex />

<PageShell base="/">
	<section class="thanks" aria-labelledby="thanks-heading">
		<p class="eyebrow">Enquiry received</p>
		<h1 id="thanks-heading" class="section-title">Thank you for getting in touch</h1>
		<p class="section-lead">
			We have your enquiry and have emailed you a confirmation. {site.responseCommitment}
		</p>
		<div class="thanks__action">
			<Button href="/">Back to the home page</Button>
		</div>
	</section>
</PageShell>

<style>
	.thanks {
		padding: calc(var(--nav-height) + 6rem) var(--gutter) 6rem;
		text-align: center;
	}
	.thanks__action {
		margin-top: 2rem;
	}
</style>
