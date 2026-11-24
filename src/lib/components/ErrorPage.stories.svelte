<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ErrorPage from './ErrorPage.svelte';
	import { notFound, serverError } from '../content/errors';

	const { Story } = defineMeta({
		title: 'Sections/ErrorPage',
		component: ErrorPage,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'The body of the error pages: the status, a heading, a short explanation and a way home. Used by `src/routes/404/` (prerendered to `404.html`, which Cloudflare serves for unknown paths) and `src/routes/+error.svelte`.'
				}
			}
		}
	});
</script>

<Story name="Not found" args={notFound} />

<Story name="Server error" args={{ status: 500, ...serverError }} />
