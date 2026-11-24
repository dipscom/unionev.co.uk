<script lang="ts">
	import Button from './Button.svelte';

	type Props = {
		/** HTTP status, shown as the eyebrow */
		status: number;
		heading: string;
		message: string;
	};

	let { status, heading, message }: Props = $props();
</script>

<section class="error region text-center" aria-labelledby="error-heading">
	<div class="wrapper">
		<div class="section-head flow">
			<p class="eyebrow">{status}</p>
			<h1 id="error-heading" class="section-title">{heading}</h1>
			<p class="section-lead">{message}</p>
		</div>
		<div class="error__action">
			<Button href="/">Back to the home page</Button>
		</div>
	</div>
</section>

<style>
	.error {
		padding-top: calc(var(--nav-height) + var(--space-3xl));
	}
	.error__action {
		margin-top: var(--space-l);
	}
</style>
