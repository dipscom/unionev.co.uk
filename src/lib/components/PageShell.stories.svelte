<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageShell from './PageShell.svelte';
	import Section from './Section.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const { Story } = defineMeta({
		title: 'Layout/PageShell',
		component: PageShell,
		tags: ['autodocs'],
		parameters: {
			tone: false,
			docs: {
				story: { inline: false, iframeHeight: 720 },
				description: {
					component:
						'Every page: skip link (press Tab to reveal it), `Nav`, a focusable `<main id="main">` and `Footer`. `base` is passed to both so their anchors point home from other pages.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<div style="padding-top: var(--nav-height)">
		<Section>
			<SectionHeader title="Page content" lead="Everything between the nav and the footer." />
		</Section>
	</div>
</Story>
