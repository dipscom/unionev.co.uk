<script lang="ts">
	import union_logo from '../images/union_logo.svg';
	import Image from './Image.svelte';

	type Props = {
		/** nav = 2.5rem tall, footer = 2rem tall */
		size?: 'nav' | 'footer';
	};

	let { size = 'nav' }: Props = $props();
</script>

<Image
	src={union_logo}
	alt="Union Electric Vehicle Charging"
	fit="contain"
	width={1998}
	height={495}
	loading={size === 'nav' ? 'eager' : 'lazy'}
	class="logo"
	data-size={size}
/>

<style>
	:global(.logo) {
		width: auto;
	}
	:global(.logo[data-state]) {
		width: 8rem;
	}
	:global(.logo[data-size='nav']) {
		height: 2.5rem;
	}
	:global(.logo[data-size='footer']) {
		height: 2rem;
	}
</style>
