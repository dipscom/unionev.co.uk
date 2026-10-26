<script lang="ts">
	import { caseStudy } from '../content/caseStudy';
</script>

<section class="section section--md preview">
	<div class="container container--narrow">
		<div class="preview__card">
			<div class="preview__copy">
				<span class="eyebrow">Case Study</span>
				<h2 class="preview__title">{caseStudy.title}</h2>
				<p class="preview__summary">{caseStudy.summary}</p>
				<!-- The link's ::after covers the card, so the whole card stays clickable
				     while the link's accessible name stays short -->
				<a href="#case-study" class="preview__link">Read the case study →</a>
			</div>
			<div>
				<dl class="preview__stats">
					{#each caseStudy.stats as stat (stat.label)}
						<div class="preview__stat">
							<dt class="preview__label">{stat.label}</dt>
							<dd class="preview__value">{stat.value}</dd>
						</div>
					{/each}
				</dl>
				{#if caseStudy.reportedAt}
					<p class="preview__asof">As of {caseStudy.reportedAt}</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.preview__card {
		position: relative;
		display: grid;
		gap: 2rem;
		padding: 2rem;
		background: var(--gray-50);
		border: 1px solid var(--gray-100);
		border-radius: var(--radius-2xl);
		transition:
			border-color var(--transition),
			box-shadow var(--transition);
	}
	.preview__card:has(.preview__link:hover) {
		border-color: rgb(2 58 49 / 0.2);
		box-shadow: var(--shadow-md);
	}
	.preview__title {
		margin: 0.5rem 0 0.75rem;
		color: var(--gray-900);
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
	}
	.preview__summary {
		margin-bottom: 1.25rem;
		color: var(--gray-600);
		line-height: 1.625;
	}
	.preview__link {
		color: var(--green-900);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}
	.preview__link::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
	}
	.preview__stats {
		display: grid;
		gap: 1rem;
		margin: 0;
	}
	.preview__stat {
		display: flex;
		flex-direction: column-reverse;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--gray-200);
	}
	.preview__stat:last-of-type {
		padding-bottom: 0;
		border-bottom: 0;
	}
	.preview__value {
		margin: 0;
		color: var(--green-900);
		font-size: 1.875rem;
		line-height: 2.25rem;
		font-weight: 800;
	}
	.preview__label {
		color: var(--gray-600);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	.preview__asof {
		margin-top: 1rem;
		color: var(--gray-500);
		font-size: 0.75rem;
	}
	@media (min-width: 768px) {
		.preview__card {
			grid-template-columns: 3fr 2fr;
			align-items: center;
			gap: 3rem;
			padding: 2.5rem;
		}
	}
</style>
