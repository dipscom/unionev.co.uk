<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Logo from './Logo.svelte';

	const { Story } = defineMeta({
		title: 'Components/Primitives/Logo',
		component: Logo,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'The Union Electric Vehicle Charging wordmark (`src/lib/images/union_logo.svg`, brand green). `nav` is 2.5rem tall and loads eagerly; `footer` is 2rem and lazy. On dark backgrounds it sits on a white plate, as in the footer. See Brand / Logo for usage.'
				}
			}
		},
		args: { size: 'nav' },
		argTypes: { size: { control: 'inline-radio', options: ['nav', 'footer'] } }
	});
</script>

<Story name="Nav" />

<Story name="Footer" args={{ size: 'footer' }} />

<Story name="On dark (white plate)" parameters={{ tone: 'dark' }} asChild>
	<div
		style="display: flex; width: fit-content; padding: var(--space-1-5) var(--space-3); background: var(--color-surface); border-radius: var(--radius-lg)"
	>
		<Logo size="footer" />
	</div>
</Story>
