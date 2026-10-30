<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Home from '../routes/+page.svelte';

	const { Story } = defineMeta({
		title: 'Pages/Home',
		component: Home,
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'The home page itself (`src/routes/+page.svelte`): every section in order inside `PageShell`. Use it to review a change in context.'
				}
			}
		}
	});
</script>

<Story name="Home" />
