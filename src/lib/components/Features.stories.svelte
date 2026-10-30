<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Features from './Features.svelte';

	const { Story } = defineMeta({
		title: 'Sections/Features',
		component: Features,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'What Union EV does, as cards led by an IconTile. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
