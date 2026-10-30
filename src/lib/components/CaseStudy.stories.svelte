<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CaseStudy from './CaseStudy.svelte';

	const { Story } = defineMeta({
		title: 'Sections/CaseStudy',
		component: CaseStudy,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'The full Apsley Marina case study: challenge and solution lists, photo, stats and quotes. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
