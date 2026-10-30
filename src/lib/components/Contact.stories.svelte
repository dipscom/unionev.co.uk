<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Contact from './Contact.svelte';

	const { Story } = defineMeta({
		title: 'Sections/Contact',
		component: Contact,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'The contact section around the enquiry form. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
