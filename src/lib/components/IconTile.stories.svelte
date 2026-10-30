<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { iconNames } from './Icon.svelte';
	import IconTile from './IconTile.svelte';

	const { Story } = defineMeta({
		title: 'Components/Primitives/IconTile',
		component: IconTile,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'A 2.5rem accent-wash square with a 1.25rem icon in `--color-accent`. Leads each card in the Features section.'
				}
			}
		},
		args: { icon: 'plug' },
		argTypes: { icon: { control: 'select', options: iconNames } }
	});
</script>

<Story name="Default" />

<Story name="Feature icons" asChild>
	<div class="cluster" style="--cluster-justify: flex-start">
		{#each ['plug', 'pound', 'wrench', 'chart'] as const as icon (icon)}
			<IconTile {icon} />
		{/each}
	</div>
</Story>
