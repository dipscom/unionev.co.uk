<script lang="ts">
	import ErrorPage from '#lib/components/ErrorPage.svelte';
	import PageShell from '#lib/components/PageShell.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { notFound } from '../../lib/content/errors';
</script>

<!--
	Prerendered to build/404.html, which Cloudflare serves with a 404 status for any unknown path
	(wrangler.jsonc: not_found_handling "404-page"). It has to be a real page: with csr = false,
	adapter-static's SPA fallback would be an empty shell.
-->
<Seo title="{notFound.heading} | Union EV" path="/404" noindex />

<PageShell base="/">
	<ErrorPage {...notFound} />
</PageShell>
