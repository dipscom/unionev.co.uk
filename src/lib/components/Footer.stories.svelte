<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Footer from './Footer.svelte';

	const { Story } = defineMeta({
		title: 'Chrome/Footer',
		component: Footer,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'The dark inverse footer: logo on a white plate, tagline, quick links, contact and the legal line built from `site.ts` (company number and registered office appear once set). Pass `base="/"` on pages other than the home page; the Privacy link gets `aria-current` on /privacy.'
				}
			}
		},
		args: { base: '' }
	});
</script>

<Story name="Home page" />

<Story
	name="On the privacy page"
	args={{ base: '/' }}
	parameters={{
		sveltekit_experimental: {
			state: { page: { url: new URL('https://www.unionev.co.uk/privacy') } }
		}
	}}
/>
