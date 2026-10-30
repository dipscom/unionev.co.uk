<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Process from './Process.svelte';

	const { Story } = defineMeta({
		title: 'Sections/Process',
		component: Process,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'Four numbered steps from the first conversation to live chargers, each with what is needed from the client. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
