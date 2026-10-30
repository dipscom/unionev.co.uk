<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const { Story } = defineMeta({
		title: 'Layout/Section',
		component: Section,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'A page band: `.region` padding, a centred `.wrapper` and a `.flow` with `--space-16` after the header. `tone` sets the background (`dark` applies `.theme-dark`, which reassigns the colour roles inside), `size` the vertical padding (24, 20 or 16 on the space scale) and `width` the content width (`--w-6xl`, `--w-4xl`, `--w-3xl`). Every Section contains a `SectionHeader`, which names it.'
				}
			}
		},
		args: { tone: 'white', size: 'lg', width: 'wide' },
		argTypes: {
			tone: { control: 'inline-radio', options: ['white', 'alt', 'dark'] },
			size: { control: 'inline-radio', options: ['lg', 'md', 'sm'] },
			width: { control: 'inline-radio', options: ['wide', 'narrow', 'text'] }
		},
		render: template
	});
</script>

{#snippet template(args: {
	tone?: 'white' | 'alt' | 'dark';
	size?: 'lg' | 'md' | 'sm';
	width?: 'wide' | 'narrow' | 'text';
})}
	<Section {...args}>
		<SectionHeader
			eyebrow="Eyebrow"
			title="Section title"
			lead="The lead paragraph sits under the title, at most 42rem wide."
		/>
		<div class="card text-center color-muted">Section content</div>
	</Section>
{/snippet}

<Story name="White" />

<Story name="Alt" args={{ tone: 'alt' }} />

<Story name="Dark" args={{ tone: 'dark' }} />

<Story name="Narrow, small" args={{ width: 'narrow', size: 'sm' }} />
