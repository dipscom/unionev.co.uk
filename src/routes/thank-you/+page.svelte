<script lang="ts">
	import Button from '#lib/components/Button.svelte';
	import PageShell from '#lib/components/PageShell.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { site } from '../../lib/content/site';
</script>

<Seo title="Enquiry received | Union EV" path="/thank-you" noindex />

<PageShell base="/">
	<section class="thanks region text-center" aria-labelledby="thanks-heading">
		<div class="wrapper">
			<div class="section-head flow">
				<p class="eyebrow">Enquiry received</p>
				<h1 id="thanks-heading" class="section-title">Thank you for getting in touch</h1>
				<p class="section-lead">
					We have your enquiry. {site.responseCommitment}
				</p>
			</div>
			<div class="thanks__action">
				<Button href="/">Back to the home page</Button>
			</div>
		</div>
	</section>
</PageShell>

<style>
	.thanks {
		padding-top: calc(var(--nav-height) + var(--space-24));
	}
	.thanks__action {
		margin-top: var(--space-8);
	}
</style>
