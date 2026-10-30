<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Nav from './Nav.svelte';

	const { Story } = defineMeta({
		title: 'Chrome/Nav',
		component: Nav,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			// The bar is position: fixed, so give each story its own frame in the docs page
			docs: {
				story: { inline: false, iframeHeight: 360 },
				description: {
					component:
						'The fixed, translucent top bar: logo, in-page links and the primary call to action. Below 768px the links move into a native popover opened by the menu button, so the browser handles opening, closing, Escape and focus with or without JavaScript. Pass `base="/"` on pages other than the home page.'
				}
			}
		},
		args: { base: '' }
	});
</script>

<Story name="Desktop" />

<Story name="Mobile" globals={{ viewport: { value: 'mobile' } }} />

<Story
	name="Mobile, menu open"
	globals={{ viewport: { value: 'mobile' } }}
	play={({ canvasElement }) => {
		canvasElement.querySelector<HTMLElement>('[popover]')?.showPopover();
	}}
/>
