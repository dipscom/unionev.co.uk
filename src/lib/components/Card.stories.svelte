<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';

	const { Story } = defineMeta({
		title: 'Components/Primitives/Card',
		component: Card,
		tags: ['autodocs'],
		parameters: {
			tone: 'alt',
			docs: {
				description: {
					component:
						'The `.card` block (`src/styles/blocks/card.css`): white surface, hairline border, `--radius-2xl`, `--space-8` padding. Only cards that go somewhere (`a.card`, `button.card`, `summary.card`) get the hover state. `StatCard`, `QuoteCard` and the audience cards build on it.'
				}
			}
		},
		args: { shadow: false }
	});
</script>

<Story name="Default">
	<h3>Fully managed</h3>
	<p class="color-muted">We design, install, operate and maintain the chargers.</p>
</Story>

<Story name="With shadow" args={{ shadow: true }}>
	<h3>Fully managed</h3>
	<p class="color-muted">We design, install, operate and maintain the chargers.</p>
</Story>

<Story name="Link card (hover state)" asChild>
	<a href="#case-study" class="card flow shadow-sm" style="display: block; max-width: 24rem">
		<h3>Apsley Marina</h3>
		<p class="color-muted">Hover to see the border and shadow change.</p>
	</a>
</Story>
