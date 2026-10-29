<script lang="ts">
	import Icon from './Icon.svelte';

	type Props = {
		question: string;
		answer: string;
	};

	let { question, answer }: Props = $props();
</script>

<details class="faq">
	<summary class="faq__question">
		<!-- Heading inside the summary lets screen reader users jump between questions -->
		<h3 class="faq__heading text-sm weight-semibold">{question}</h3>
		<span class="faq__icon color-brand" aria-hidden="true">
			<Icon name="plus" size="0.875rem" />
		</span>
	</summary>
	<div class="faq__answer text-sm leading-relaxed color-subtle">
		<p>{answer}</p>
	</div>
</details>

<style>
	.faq {
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-2xl);
	}
	.faq__question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-5) var(--space-6);
		list-style: none;
		cursor: pointer;
		transition: background-color var(--transition);
	}
	.faq__question::-webkit-details-marker {
		display: none;
	}
	.faq__question:hover {
		background: var(--color-surface-alt);
	}
	.faq__heading {
		font-size: inherit;
		color: var(--color-text);
	}
	.faq__icon {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: var(--radius-full);
		background: var(--color-surface-brand-soft);
		transition: transform var(--transition);
	}
	.faq[open] .faq__icon {
		transform: rotate(45deg);
	}
	.faq__answer {
		padding: 0 var(--space-6) var(--space-5);
	}
</style>
