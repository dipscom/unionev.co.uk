<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { caseStudy } from '../content/caseStudy';
	import QuoteCard from './QuoteCard.svelte';

	const { Story } = defineMeta({
		title: 'Components/Content/QuoteCard',
		component: QuoteCard,
		tags: ['autodocs'],
		parameters: {
			tone: 'alt',
			docs: {
				description: {
					component:
						'A testimonial as `<figure>`, `<blockquote>` and `<figcaption>`. Give a `role` only for named, permission-approved testimonials.'
				}
			}
		},
		args: { quote: caseStudy.quotes[0].quote, author: caseStudy.quotes[0].author }
	});
</script>

<Story name="Default" />

<Story name="With role" args={{ author: 'Jane Smith', role: "Chair, Residents' Association" }} />
