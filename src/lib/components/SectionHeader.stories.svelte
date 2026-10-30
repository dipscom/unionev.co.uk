<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const { Story } = defineMeta({
		title: 'Components/Content/SectionHeader',
		component: SectionHeader,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				description: {
					component:
						'Eyebrow, `<h2>` and lead (`.section-head` in `src/styles/blocks/section-head.css`). It takes its heading id from the enclosing `Section`, which is named after it (WCAG 1.3.6), so it must always render inside one. On `.theme-dark` only the colours change.'
				}
			}
		},
		args: {
			eyebrow: 'How It Works',
			title: 'From first call to live charging',
			lead: 'A clear process, with one point of contact from survey to switch-on.',
			titleSize: 'lg',
			leadWidth: '2xl'
		},
		argTypes: {
			titleSize: { control: 'inline-radio', options: ['lg', 'md', 'sm'] },
			leadWidth: { control: 'inline-radio', options: ['xl', '2xl', 'full'] }
		},
		render: template
	});
</script>

{#snippet template(args: {
	eyebrow?: string;
	title: string;
	lead?: string;
	titleSize?: 'lg' | 'md' | 'sm';
	leadWidth?: 'xl' | '2xl' | 'full';
})}
	<Section size="sm">
		<SectionHeader {...args} />
	</Section>
{/snippet}

<Story name="Default" />

<Story name="Title only" args={{ eyebrow: undefined, lead: undefined }} />

<Story name="Medium title" args={{ titleSize: 'md' }} />

<Story name="Small title" args={{ titleSize: 'sm' }} />

<Story name="On dark" asChild>
	<Section size="sm" tone="dark">
		<SectionHeader
			eyebrow="Get Started"
			title="Ready to add charging to your site?"
			lead="Tell us about your site and we will arrange a free assessment."
		/>
	</Section>
</Story>
