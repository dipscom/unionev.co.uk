<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NewTabHint from './NewTabHint.svelte';

	const { Story } = defineMeta({
		title: 'Components/Primitives/NewTabHint',
		component: NewTabHint,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'Goes inside every `target="_blank"` link: a visible arrow sized to the text, and "(opens in a new tab)" for screen readers.'
				}
			}
		}
	});
</script>

<Story name="In a link" asChild>
	<a
		href="https://www.linkedin.com/company/union-ev"
		target="_blank"
		rel="noopener noreferrer"
		class="color-brand weight-semibold"
	>
		Union EV on LinkedIn<NewTabHint />
	</a>
</Story>
