<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CaseStudyPreview from './CaseStudyPreview.svelte';

	const { Story } = defineMeta({
		title: 'Sections/CaseStudyPreview',
		component: CaseStudyPreview,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'A one-line proof point near the top of the page that links down to the full case study. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
