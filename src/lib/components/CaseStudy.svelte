<script lang="ts">
	import { caseStudy } from '../content/caseStudy';
	import { images } from '../content/images';
	import CheckList from './CheckList.svelte';
	import Image from './Image.svelte';
	import QuoteCard from './QuoteCard.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import StatCard from './StatCard.svelte';
</script>

<Section id="case-study" tone="alt">
	<SectionHeader eyebrow="Case Study" title={caseStudy.title} lead={caseStudy.lead} />

	<div class="study">
		<figure class="study__photo">
			<div class="study__image">
				<Image
					src={images.install}
					alt="Union EV charge point installed on site"
					class="img-fill"
				/>
			</div>
			<figcaption class="study__caption">{caseStudy.caption}</figcaption>
		</figure>

		<div class="study__lists">
			<div>
				<h3 class="study__heading">The Challenge</h3>
				<p class="study__summary">{caseStudy.challengeSummary}</p>
				<CheckList items={[...caseStudy.challenge]} variant="bad" />
			</div>
			<div>
				<h3 class="study__heading">The Union EV Solution</h3>
				<CheckList items={[...caseStudy.solution]} variant="good" />
			</div>
		</div>
	</div>

	<div class="grid grid--3 study__stats">
		{#each caseStudy.stats as stat (stat.label)}
			<StatCard value={stat.value} label={stat.label} />
		{/each}
	</div>
	{#if caseStudy.reportedAt}
		<p class="study__asof">Figures as of {caseStudy.reportedAt}.</p>
	{/if}

	<div class="grid grid--2">
		{#each caseStudy.quotes as q (q.author)}
			<QuoteCard quote={q.quote} author={q.author} role={q.role} />
		{/each}
	</div>
</Section>

<style>
	.study {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: start;
		margin-bottom: 4rem;
	}
	.study__photo {
		margin: 0;
		overflow: hidden;
		border-radius: var(--radius-3xl);
		box-shadow: var(--shadow-lg);
	}
	.study__image {
		height: 20rem;
	}
	.study__caption {
		padding: 1rem 1.5rem;
		background: var(--green-900);
		color: var(--white);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.3125rem;
	}
	.study__lists {
		display: grid;
		gap: 2.5rem;
	}
	.study__heading {
		margin-bottom: 1rem;
		color: var(--gray-900);
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
	}
	.study__summary {
		margin-bottom: 1rem;
		color: var(--gray-600);
		font-size: 0.9375rem;
		line-height: 1.625;
	}
	.study__stats {
		margin-bottom: 3rem;
	}
	.study__asof {
		margin: -2rem 0 3rem;
		color: var(--gray-500);
		font-size: 0.8125rem;
		text-align: center;
	}
	@media (min-width: 1024px) {
		.study {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
