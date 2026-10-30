<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Audiences from './Audiences.svelte';

	const { Story } = defineMeta({
		title: 'Sections/Audiences',
		component: Audiences,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'Who Union EV works with: AudienceItem cards that open one panel at a time. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
