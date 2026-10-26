<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/Button.svelte';
	import PageShell from '#lib/components/PageShell.svelte';
	import Seo from '#lib/components/Seo.svelte';

	const notFound = $derived(page.status === 404);
	const heading = $derived(notFound ? 'Page not found' : 'Something went wrong');
	const message = $derived(
		notFound
			? "The page you're looking for doesn't exist or has moved."
			: 'An unexpected error occurred. Please try again in a moment.'
	);
</script>

<Seo title="{heading} | Union EV" path={page.url.pathname} noindex />

<PageShell base="/">
	<section class="error">
		<p class="eyebrow">{page.status}</p>
		<h1 class="section-title">{heading}</h1>
		<p class="section-lead">{message}</p>
		<div class="error__action">
			<Button href="/">Back to the home page</Button>
		</div>
	</section>
</PageShell>

<style>
	.error {
		padding: calc(var(--nav-height) + 6rem) var(--gutter) 6rem;
		text-align: center;
	}
	.error__action {
		margin-top: 2rem;
	}
</style>
