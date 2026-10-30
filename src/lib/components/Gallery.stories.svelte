<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Gallery from './Gallery.svelte';

	const { Story } = defineMeta({
		title: 'Sections/Gallery',
		component: Gallery,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'Captioned project photos. Captions should name the location and what was delivered. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
