<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { faqs } from '../content/faqs';
	import FaqItem from './FaqItem.svelte';

	const { Story } = defineMeta({
		title: 'Components/Content/FaqItem',
		component: FaqItem,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'A native `<details>` disclosure, so it works without JavaScript. The question is an `<h3>` inside the `<summary>` so screen-reader users can jump between questions; the plus turns 45° into a cross when open.'
				}
			}
		},
		args: { question: faqs[0].q, answer: faqs[0].a }
	});
</script>

<Story name="Closed" />

<!-- autoplay: the docs page only runs play functions for stories that ask -->
<Story
	name="Open"
	parameters={{ docs: { story: { autoplay: true } } }}
	play={({ canvasElement }) => {
		canvasElement.querySelector('details')?.setAttribute('open', '');
	}}
/>
