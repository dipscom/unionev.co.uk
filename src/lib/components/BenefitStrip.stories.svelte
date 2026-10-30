<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BenefitStrip from './BenefitStrip.svelte';

	const { Story } = defineMeta({
		title: 'Sections/BenefitStrip',
		component: BenefitStrip,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'A brand-green strip of three ticked benefits, directly under the hero. It has no visible heading, so it is named with `aria-label`. Takes no props: its copy comes from `src/lib/content/`.'
				}
			}
		}
	});
</script>

<Story name="Default" />
