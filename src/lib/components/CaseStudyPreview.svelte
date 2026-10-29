<script lang="ts">
	import { caseStudy } from '../content/caseStudy';
</script>

<!-- Not named by its heading: the full case study section further down already is -->
<section class="preview region" aria-label="Case study summary: {caseStudy.title}">
	<div class="wrapper" style="--wrapper-max: var(--w-4xl)">
		<div class="preview__card grid bg-surface-alt" data-layout="split-md">
			<div class="preview__copy">
				<span class="eyebrow">Case Study</span>
				<h2 class="preview__title">{caseStudy.title}</h2>
				<p class="preview__summary leading-relaxed color-muted">{caseStudy.summary}</p>
				<!-- The link's ::after covers the card, so the whole card stays clickable
				     while the link's accessible name stays short -->
				<a href="#case-study" class="preview__link text-sm weight-semibold color-brand"
					>Read the case study →</a
				>
			</div>
			<div>
				<dl class="preview__stats">
					{#each caseStudy.stats as stat (stat.label)}
						<div class="preview__stat">
							<dt class="preview__label text-sm color-muted">{stat.label}</dt>
							<dd class="preview__value weight-extrabold color-brand">{stat.value}</dd>
						</div>
					{/each}
				</dl>
				{#if caseStudy.reportedAt}
					<p class="preview__asof text-xs color-subtle">As of {caseStudy.reportedAt}</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.preview {
		--region-space: var(--space-20);
	}
	.preview__card {
		--gap: var(--space-8);
		--grid-cols: 3fr 2fr;
		--grid-align: center;
		position: relative;
		padding: var(--space-8);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-2xl);
		transition:
			border-color var(--transition),
			box-shadow var(--transition);
	}
	.preview__card:has(.preview__link:hover) {
		border-color: var(--color-border-hover);
		box-shadow: var(--shadow-md);
	}
	.preview__title {
		margin: var(--space-2) 0 var(--space-3);
		font-size: var(--text-2xl);
		line-height: var(--leading-2xl);
	}
	.preview__summary {
		margin-bottom: var(--space-5);
	}
	.preview__link {
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
		gap: var(--space-4);
		margin: 0;
	}
	.preview__stat {
		display: flex;
		flex-direction: column-reverse;
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--color-border-strong);
	}
	.preview__stat:last-of-type {
		padding-bottom: 0;
		border-bottom: 0;
	}
	.preview__value {
		margin: 0;
		font-size: var(--text-3xl);
		line-height: var(--leading-3xl);
	}
	.preview__asof {
		margin-top: var(--space-4);
	}
	@media (min-width: 768px) {
		.preview__card {
			--gap: var(--space-12);
			padding: var(--space-10);
		}
	}
</style>
