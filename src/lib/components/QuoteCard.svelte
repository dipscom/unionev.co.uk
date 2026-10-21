<script lang="ts">
	type Props = {
		quote: string;
		author: string;
	};

	let { quote, author }: Props = $props();
</script>

<figure class="card card--shadow quote">
	<div class="quote__mark" aria-hidden="true">“</div>
	<blockquote class="quote__text">{quote}</blockquote>
	<figcaption class="quote__author">— {author}</figcaption>
</figure>

<style>
	.quote {
		margin: 0;
	}
	.quote__mark {
		margin-bottom: 0.75rem;
		color: var(--orange);
		font-size: 1.5rem;
		line-height: 2rem;
	}
	.quote__text {
		margin: 0 0 1rem;
		color: var(--gray-700);
		font-size: 1rem;
		line-height: 1.625;
	}
	.quote__author {
		color: var(--gray-500);
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.25rem;
	}
</style>
