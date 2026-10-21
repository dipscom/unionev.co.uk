<script lang="ts">
	import { images } from '../content/images';
	import Image from './Image.svelte';

	type Props = {
		/** nav = 2.5rem tall, footer = 2rem tall */
		size?: 'nav' | 'footer';
	};

	let { size = 'nav' }: Props = $props();
</script>

<Image
	src={images.logo}
	alt="Union EV Charging"
	fit="contain"
	loading="eager"
	class="logo logo--{size}"
/>

<style>
	:global(.logo) {
		width: auto;
	}
	:global(.logo.image--placeholder) {
		width: 8rem;
	}
	:global(.logo--nav) {
		height: 2.5rem;
	}
	:global(.logo--footer) {
		height: 2rem;
	}
</style>
