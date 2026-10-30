<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { caseStudy } from '../content/caseStudy';
	import CheckList from './CheckList.svelte';

	const { Story } = defineMeta({
		title: 'Components/Content/CheckList',
		component: CheckList,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'`.check-list` block: a tick (`good`, `--color-success`) or cross (`bad`, decorative red) beside each item. The icon is centred on the first line of text.'
				}
			}
		},
		args: { items: [...caseStudy.solution], variant: 'good' },
		argTypes: { variant: { control: 'inline-radio', options: ['good', 'bad'] } }
	});
</script>

<Story name="Good" />

<Story name="Bad" args={{ items: [...caseStudy.challenge], variant: 'bad' }} />
