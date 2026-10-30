<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { audiences } from '../content/audiences';
	import AudienceItem from './AudienceItem.svelte';

	const { Story } = defineMeta({
		title: 'Components/Content/AudienceItem',
		component: AudienceItem,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'A card that opens a full-width panel below its row. It is a `<details name="audiences">`, so the browser keeps one open at a time, and `display: contents` makes the summary the grid cell. It must sit in a `.grid` with `grid-auto-flow: dense`, as the Audiences section does.'
				}
			}
		},
		args: { audience: audiences[0] },
		argTypes: { audience: { control: false } },
		render: template
	});
</script>

{#snippet template(args: { audience: (typeof audiences)[number] })}
	<ul class="grid" data-layout="quarters-2up" style="--gap: var(--space-4); grid-auto-flow: dense">
		<li style="display: contents"><AudienceItem {...args} /></li>
	</ul>
{/snippet}

<Story name="Closed" />

<!-- autoplay: the docs page only runs play functions for stories that ask -->
<Story
	name="Open"
	parameters={{ docs: { story: { autoplay: true } } }}
	play={({ canvasElement }) => {
		canvasElement.querySelector('details')?.setAttribute('open', '');
	}}
/>

<Story name="All audiences" asChild>
	<ul class="grid" data-layout="quarters-2up" style="--gap: var(--space-4); grid-auto-flow: dense">
		{#each audiences as audience (audience.slug)}
			<li style="display: contents"><AudienceItem {audience} /></li>
		{/each}
	</ul>
</Story>
