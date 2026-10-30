<script lang="ts">
	import Icon from './Icon.svelte';

	type Props = {
		quote: string;
		author: string;
		/** e.g. "Chair, Residents' Association"; only for named, permission-approved testimonials */
		role?: string | null;
	};

	let { quote, author, role }: Props = $props();
</script>

<figure class="card quote shadow-sm">
	<div class="quote__mark color-accent"><Icon name="quote" size="2.5rem" /></div>
	<blockquote class="quote__text">{quote}</blockquote>
	<figcaption class="quote__author text-sm weight-semibold color-subtle">
		— {author}{#if role}<span class="quote__role">, {role}</span>{/if}
	</figcaption>
</figure>

<style>
	.quote {
		margin: 0;
	}
	.quote__mark {
		display: flex;
		margin-bottom: var(--space-3);
	}
	/* Lucide's quote is a closing mark (”): mirror it to face the text */
	.quote__mark :global(.icon) {
		transform: scaleX(-1);
	}
	.quote__text {
		margin: 0 0 var(--space-4);
		color: var(--color-text-soft);
		font-size: var(--text-base);
		line-height: var(--leading-relaxed);
	}
	.quote__role {
		font-weight: 400;
	}
</style>
