<script lang="ts">
	type Props = {
		quote: string;
		author: string;
		/** e.g. "Chair, Residents' Association"; only for named, permission-approved testimonials */
		role?: string | null;
	};

	let { quote, author, role }: Props = $props();
</script>

<figure class="card card--shadow quote">
	<div class="quote__mark" aria-hidden="true">“</div>
	<blockquote class="quote__text">{quote}</blockquote>
	<figcaption class="quote__author">
		— {author}{#if role}<span class="quote__role">, {role}</span>{/if}
	</figcaption>
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
		line-height: 1.3125rem;
	}
	.quote__role {
		font-weight: 400;
	}
</style>
