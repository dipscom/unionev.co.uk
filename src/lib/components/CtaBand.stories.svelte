<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CtaBand from './CtaBand.svelte';

	const { Story } = defineMeta({
		title: 'Sections/CtaBand',
		component: CtaBand,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'The dark, narrow call-to-action band: both calls to action and what happens next. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
