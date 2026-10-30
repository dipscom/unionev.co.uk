<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { caseStudy } from '../content/caseStudy';
	import StatCard from './StatCard.svelte';

	const { Story } = defineMeta({
		title: 'Components/Content/StatCard',
		component: StatCard,
		tags: ['autodocs'],
		parameters: {
			tone: 'alt',
			docs: {
				description: {
					component:
						'A card with a large extrabold figure in brand green and a muted label. Used for the case-study results; the figures are point-in-time (see docs/open-points.md).'
				}
			}
		},
		args: { ...caseStudy.stats[0] }
	});
</script>

<Story name="Default" />

<Story name="Case-study row" asChild>
	<div class="grid" data-layout="thirds">
		{#each caseStudy.stats as stat (stat.label)}
			<StatCard {...stat} />
		{/each}
	</div>
</Story>
