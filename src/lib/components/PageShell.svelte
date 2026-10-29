<script lang="ts">
	import type { Snippet } from 'svelte';
	import Footer from './Footer.svelte';
	import Nav from './Nav.svelte';

	type Props = {
		/** "" on the home page, "/" elsewhere so nav and footer anchors point home */
		base?: string;
		children: Snippet;
	};

	let { base = '', children }: Props = $props();
</script>

<a href="#main" class="skip-link text-sm weight-semibold color-brand">Skip to main content</a>
<Nav {base} />
<!-- tabindex lets the skip link move focus here, not just scroll -->
<main id="main" tabindex="-1">
	{@render children()}
</main>
<Footer {base} />

<style>
	.skip-link {
		position: fixed;
		top: 0.75rem;
		left: 0.75rem;
		z-index: 100;
		padding: var(--space-3) var(--space-4);
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		transform: translateY(-200%);
	}
	.skip-link:focus {
		transform: none;
	}
	main:focus {
		outline: none;
	}
</style>
