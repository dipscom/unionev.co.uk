<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Faq from './Faq.svelte';

	const { Story } = defineMeta({
		title: 'Sections/Faq',
		component: Faq,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'Frequently asked questions as FaqItem disclosures. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
