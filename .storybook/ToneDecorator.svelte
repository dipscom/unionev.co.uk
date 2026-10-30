<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Storybook's story context; the decorator reads the toolbar global and story parameters */
		context: {
			viewMode: string;
			globals: { tone?: 'white' | 'alt' | 'dark' };
			parameters: { tone?: 'white' | 'alt' | 'dark' | false; padded?: boolean };
		};
		children: Snippet;
	};

	let { context, children }: Props = $props();

	// A story can pin its tone (`parameters.tone`) or opt out (`false`) when it sets its own
	// background, as full-width sections do
	const tone = $derived(context.parameters.tone ?? context.globals.tone ?? 'white');
	const padded = $derived(context.parameters.padded ?? true);
	// Fill the canvas on a story's own page; in docs, 100vh would be the whole docs page
	const fill = $derived(context.viewMode === 'story');
</script>

{#if tone === false}
	{@render children()}
{:else}
	<div
		class={['tone', tone === 'alt' && 'bg-surface-alt', tone === 'dark' && 'theme-dark bg-brand']}
		data-padded={padded}
		data-fill={fill}
	>
		{@render children()}
	</div>
{/if}

<style>
	.tone {
		background-color: var(--color-surface);
	}
	.tone[data-fill='true'] {
		min-height: 100vh;
	}
	.tone:global(.bg-surface-alt) {
		background: var(--color-surface-alt);
	}
	.tone:global(.bg-brand) {
		background: var(--color-surface-brand);
	}
	.tone[data-padded='true'] {
		padding: var(--space-8);
	}
</style>
