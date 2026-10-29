<script lang="ts">
	import Icon from './Icon.svelte';

	type Props = {
		question: string;
		answer: string;
	};

	let { question, answer }: Props = $props();

	const uid = $props.id();
</script>

<div class="faq">
	<!-- Heading wrapper lets screen reader users jump between questions -->
	<h3 class="faq__heading">
		<button
			type="button"
			class="faq__question"
			data-disclosure
			aria-expanded="false"
			aria-controls="{uid}-answer"
		>
			<span class="faq__text text-sm weight-semibold">{question}</span>
			<span class="faq__icon color-brand"><Icon name="plus" size="0.875rem" /></span>
		</button>
	</h3>
	<div
		id="{uid}-answer"
		class="faq__answer text-sm leading-relaxed color-subtle"
		data-disclosure-panel
		hidden
	>
		<p>{answer}</p>
	</div>
</div>

<style>
	.faq {
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-2xl);
	}
	.faq__heading {
		font-size: inherit;
		font-weight: inherit;
	}
	.faq__question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--space-5) var(--space-6);
		text-align: left;
		transition: background-color var(--transition);
	}
	.faq__question:hover {
		background: var(--color-surface-alt);
	}
	.faq__text {
		padding-right: var(--space-4);
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
	.faq__question:global([aria-expanded='true']) .faq__icon {
		transform: rotate(45deg);
	}
	.faq__answer {
		padding: 0 var(--space-6) var(--space-5);
	}
</style>
