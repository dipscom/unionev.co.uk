<script lang="ts">
	type Props = {
		eyebrow?: string;
		title: string;
		lead?: string;
		tone?: 'light' | 'dark';
		spacing?: 'lg' | 'md' | 'compact' | 'sm' | 'xs';
		titleSize?: 'lg' | 'md' | 'sm';
		/** Max width of the lead paragraph; defaults to 42rem */
		leadWidth?: 'xl' | '2xl' | 'full';
		/** Tighter title line-height (Tailwind leading-tight) */
		tight?: boolean;
		/** Looser lead line-height (Tailwind leading-relaxed) */
		relaxed?: boolean;
	};

	let {
		eyebrow,
		title,
		lead,
		tone = 'light',
		spacing = 'lg',
		titleSize = 'lg',
		leadWidth = '2xl',
		tight = false,
		relaxed = false
	}: Props = $props();
	const dark = $derived(tone === 'dark');
</script>

<div class={['section-head', spacing !== 'lg' && `section-head--${spacing}`]}>
	{#if eyebrow}
		<span class={['eyebrow', dark && 'eyebrow--light']}>{eyebrow}</span>
	{/if}
	<h2
		class={[
			'section-title',
			titleSize !== 'lg' && `section-title--${titleSize}`,
			tight && 'section-title--tight',
			dark && 'section-title--dark'
		]}
	>
		{title}
	</h2>
	{#if lead}
		<p
			class={[
				'section-lead',
				leadWidth !== '2xl' && `section-lead--${leadWidth}`,
				titleSize === 'sm' && 'section-lead--sm',
				relaxed && 'section-lead--relaxed',
				dark && 'section-lead--dark'
			]}
		>
			{lead}
		</p>
	{/if}
</div>
