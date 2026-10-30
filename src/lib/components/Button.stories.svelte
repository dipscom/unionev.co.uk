<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { site } from '../content/site';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Components/Primitives/Button',
		component: Button,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'A link styled as a button (`.btn` in `src/styles/blocks/button.css`). Variants and sizes are data attributes. The site has one primary call to action, `site.primaryCta`, and every instance links to `#contact`. A real `<button>` uses the same block: `<button class="btn" data-variant="primary">`, as the enquiry form does.'
				}
			}
		},
		args: { href: '#contact', variant: 'primary', size: 'md' },
		argTypes: {
			variant: { control: 'inline-radio', options: ['primary', 'outline'] },
			size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
			href: { control: 'text' }
		},
		render: template
	});
</script>

{#snippet template(args: {
	href: string;
	variant?: 'primary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
})}
	<Button {...args}>{site.primaryCta}</Button>
{/snippet}

<Story name="Primary" />

<Story name="Outline" args={{ variant: 'outline', href: '#case-study' }}>
	{#snippet template(args)}
		<Button {...args}>See the case study</Button>
	{/snippet}
</Story>

<Story name="Small" args={{ size: 'sm' }} />

<Story name="Large" args={{ size: 'lg' }} />

<Story name="On dark" parameters={{ tone: 'dark' }}>
	{#snippet template()}
		<div class="switcher">
			<Button href="#contact">{site.primaryCta}</Button>
			<Button href="#case-study" variant="outline">See the case study</Button>
		</div>
	{/snippet}
</Story>

<Story name="All variants and sizes" asChild>
	<div class="flow" style="--flow-space: var(--space-6)">
		{#each ['primary', 'outline'] as const as variant (variant)}
			<div class="cluster" style="--cluster-justify: flex-start">
				{#each ['sm', 'md', 'lg'] as const as size (size)}
					<Button href="#contact" {variant} {size}>{variant} {size}</Button>
				{/each}
			</div>
		{/each}
		<div class="cluster" style="--cluster-justify: flex-start">
			<button class="btn" data-variant="primary" type="button">&lt;button class="btn"&gt;</button>
		</div>
	</div>
</Story>
