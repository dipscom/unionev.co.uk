<script lang="ts">
	import { page } from '$app/state';
	import ErrorPage from '#lib/components/ErrorPage.svelte';
	import PageShell from '#lib/components/PageShell.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { notFound, serverError } from '../lib/content/errors';

	// Only reached when SvelteKit renders a route (dev and `npm run preview`). On Cloudflare, unknown
	// paths get the prerendered 404.html from src/routes/404/ instead.
	const copy = $derived(page.status === 404 ? notFound : serverError);
</script>

<Seo title="{copy.heading} | Union EV" path={page.url.pathname} noindex />

<PageShell base="/">
	<ErrorPage status={page.status} heading={copy.heading} message={copy.message} />
</PageShell>
