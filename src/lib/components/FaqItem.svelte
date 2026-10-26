<script lang="ts">
	type Props = {
		question: string;
		answer: string;
	};

	let { question, answer }: Props = $props();

	const uid = $props.id();
	let open = $state(false);
</script>

<div class="faq">
	<!-- Heading wrapper lets screen reader users jump between questions -->
	<h3 class="faq__heading">
		<button
			type="button"
			class="faq__question"
			aria-expanded={open}
			aria-controls="{uid}-answer"
			onclick={() => (open = !open)}
		>
			<span class="faq__text">{question}</span>
			<span class={['faq__icon', open && 'faq__icon--open']} aria-hidden="true">+</span>
		</button>
	</h3>
	<div id="{uid}-answer" class="faq__answer" hidden={!open}>
		<p>{answer}</p>
	</div>
</div>

<style>
	.faq {
		overflow: hidden;
		border: 1px solid var(--gray-100);
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
		padding: 1.25rem 1.5rem;
		text-align: left;
		transition: background-color var(--transition);
	}
	.faq__question:hover {
		background: var(--gray-50);
	}
	.faq__text {
		padding-right: 1rem;
		color: var(--gray-900);
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
	}
	.faq__icon {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: var(--radius-full);
		background: var(--mint-tint);
		color: var(--green-900);
		font-size: 0.875rem;
		font-weight: 700;
		transition: transform var(--transition);
	}
	.faq__icon--open {
		transform: rotate(45deg);
	}
	.faq__answer {
		padding: 0 1.5rem 1.25rem;
		color: var(--gray-500);
		font-size: 0.875rem;
		line-height: 1.625;
	}
</style>
