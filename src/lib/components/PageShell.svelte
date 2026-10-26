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

<Nav {base} />
<main>
	{@render children()}
</main>
<Footer {base} />
