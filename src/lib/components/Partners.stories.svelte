<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Partners from './Partners.svelte';

	const { Story } = defineMeta({
		title: 'Sections/Partners',
		component: Partners,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'"Powered by trusted partners": partner names (logos only once a partner approves their use), linking out in a new tab where a website is confirmed. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
