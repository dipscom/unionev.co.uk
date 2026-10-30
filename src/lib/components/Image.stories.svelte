<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { images } from '../content/images';
	import Image from './Image.svelte';

	const { Story } = defineMeta({
		title: 'Components/Primitives/Image',
		component: Image,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'Responsive `<picture>` (AVIF, then WebP, with a JPEG `<img>`) from `src/lib/content/images.ts`, or a plain URL. `src={null}` renders a brand-gradient placeholder; an image that fails to load is given the same look by `site.js` (`data-state="failed"`). Always set `ratio` or a width and height so the layout never shifts.'
				}
			}
		},
		args: {
			src: images.installTile,
			alt: 'Union EV charge post serving bays 2 and 4, beside a stone wall',
			ratio: '4 / 3',
			sizes: '24rem'
		},
		argTypes: {
			src: { control: false },
			fit: { control: 'inline-radio', options: ['cover', 'contain'] },
			loading: { control: 'inline-radio', options: ['lazy', 'eager'] }
		},
		render: template
	});
</script>

{#snippet template(args: Record<string, unknown>)}
	<div style="max-width: 24rem; border-radius: var(--radius-2xl); overflow: hidden">
		<Image {...args as { src: null; alt: string }} />
	</div>
{/snippet}

<Story name="Picture" />

<Story name="Placeholder" args={{ src: null, alt: 'Photo to follow' }} />

<Story name="Failed to load" asChild>
	<div style="max-width: 24rem; border-radius: var(--radius-2xl); overflow: hidden">
		<Image src="/missing.jpg" alt="A photo that failed to load" ratio="4 / 3" data-state="failed" />
	</div>
</Story>
