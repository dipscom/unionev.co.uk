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

	<div class="grid" data-layout="split" style="--gap: var(--space-12); --grid-align: start">
		<figure class="study__photo">
			<div class="study__image">
				<Image
					src={images.installStudy}
					sizes="(min-width: 1024px) 528px, calc(100vw - 3rem)"
					alt="Union EV charge point installed on site"
					class="img-fill"
				/>
			</div>
			<figcaption class="study__caption text-sm bg-brand">{caseStudy.caption}</figcaption>
		</figure>

		<div class="flow" style="--flow-space: var(--space-10)">
			<div>
				<h3 class="study__heading">The Challenge</h3>
				<p class="study__summary color-muted">{caseStudy.challengeSummary}</p>
				<CheckList items={[...caseStudy.challenge]} variant="bad" />
			</div>
			<div>
				<h3 class="study__heading">The Union EV Solution</h3>
				<CheckList items={[...caseStudy.solution]} variant="good" />
			</div>
		</div>
	</div>

	<div class="grid" data-layout="thirds">
		{#each caseStudy.stats as stat (stat.label)}
			<StatCard value={stat.value} label={stat.label} />
		{/each}
	</div>
	{#if caseStudy.reportedAt}
		<p class="study__asof color-subtle text-center" style="--flow-space: var(--space-4)">
			Figures as of {caseStudy.reportedAt}.
		</p>
	{/if}

	<div class="grid" data-layout="halves" style="--flow-space: var(--space-12)">
		{#each caseStudy.quotes as q (q.author)}
			<QuoteCard quote={q.quote} author={q.author} role={q.role} />
		{/each}
	</div>
</Section>

<style>
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
		padding: var(--space-4) var(--space-6);
		color: var(--color-text-on-dark);
		font-weight: 500;
	}
	.study__heading {
		margin-bottom: var(--space-4);
		font-size: var(--text-xl);
		line-height: var(--leading-lg);
	}
	.study__summary {
		margin-bottom: var(--space-4);
		font-size: var(--text-15);
		line-height: var(--leading-relaxed);
	}
	.study__asof {
		font-size: var(--text-13);
	}
</style>
