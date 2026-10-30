<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Hero from './Hero.svelte';

	const { Story } = defineMeta({
		title: 'Sections/Hero',
		component: Hero,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'The dark gradient hero: headline with an accent line, lead with the funding sentence, both calls to action, and the offset-framed photo from 1024px. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
