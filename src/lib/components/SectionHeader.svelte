<script lang="ts">
	type Props = {
		eyebrow?: string;
		title: string;
		lead?: string;
		tone?: 'light' | 'dark';
		spacing?: 'lg' | 'md' | 'sm';
		titleSize?: 'lg' | 'sm';
	};

	let { eyebrow, title, lead, tone = 'light', spacing = 'lg', titleSize = 'lg' }: Props = $props();
	const dark = $derived(tone === 'dark');
</script>

<div class={['section-head', spacing !== 'lg' && `section-head--${spacing}`]}>
	{#if eyebrow}
		<span class={['eyebrow', dark && 'eyebrow--light']}>{eyebrow}</span>
	{/if}
	<h2
		class={[
			'section-title',
			titleSize === 'sm' && 'section-title--sm',
			dark && 'section-title--dark'
		]}
	>
		{title}
	</h2>
	{#if lead}
		<p class={['section-lead', dark && 'section-lead--dark']}>{lead}</p>
	{/if}
</div>
