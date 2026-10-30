<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon, { iconNames } from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'Components/Primitives/Icon',
		component: Icon,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'Inline SVG icons drawn from Lucide stroke paths on a 24×24 grid, 2px stroke, round caps and joins, `currentColor`. Always `aria-hidden`: pair each icon with visible text. Sizes used on the site: 0.875rem, 1rem, 1.25rem, 1.5rem (default) and 1.75rem.'
				}
			}
		},
		args: { name: 'plug', size: '1.5rem' },
		argTypes: {
			name: { control: 'select', options: iconNames },
			size: { control: 'text' }
		}
	});
</script>

<Story name="Default" />

<Story name="Gallery" asChild>
	<ul class="icon-gallery">
		{#each iconNames as name (name)}
			<li class="card text-center flow" style="--flow-space: var(--space-3)">
				<span class="color-brand" style="display: flex; justify-content: center">
					<Icon {name} size="2rem" />
				</span>
				<code class="text-xs color-muted">{name}</code>
			</li>
		{/each}
	</ul>
</Story>

<Story name="Sizes" asChild>
	<div class="cluster" style="--cluster-justify: flex-start; --cluster-align: flex-end">
		{#each ['0.875rem', '1rem', '1.25rem', '1.5rem', '1.75rem'] as size (size)}
			<div class="text-center flow" style="--flow-space: var(--space-2)">
				<span class="color-brand" style="display: flex; justify-content: center">
					<Icon name="plug" {size} />
				</span>
				<code class="text-xs color-muted">{size}</code>
			</div>
		{/each}
	</div>
</Story>

<style>
	.icon-gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
		gap: var(--space-4);
	}
	.icon-gallery :global(.card) {
		padding: var(--space-5);
	}
</style>
