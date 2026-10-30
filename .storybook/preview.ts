// The same stylesheets src/routes/+layout.svelte loads, so stories render exactly as the site does
import '@fontsource-variable/inter/wght.css';
import '../src/styles/global.css';
import './docs.css';
import type { Preview } from '@storybook/sveltekit';
import ToneDecorator from './ToneDecorator.svelte';
import { docsTheme } from './theme';

// The breakpoints in src/styles/tokens.css, plus 640px where .switcher becomes a row
const viewport = (name: string, width: number) => ({
	name,
	styles: { width: `${width}px`, height: '900px' },
	type: width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
});

const preview: Preview = {
	globalTypes: {
		tone: {
			description: 'Background context: white, alt (.bg-surface-alt) or dark (.theme-dark)',
			toolbar: {
				title: 'Tone',
				icon: 'contrast',
				items: [
					{ value: 'white', title: 'White' },
					{ value: 'alt', title: 'Alt surface' },
					{ value: 'dark', title: 'Dark (theme-dark)' }
				],
				dynamicTitle: true
			}
		}
	},
	initialGlobals: { tone: 'white' },
	decorators: [(_, context) => ({ Component: ToneDecorator, props: { context } })],
	parameters: {
		layout: 'fullscreen',
		controls: { expanded: true },
		docs: { theme: docsTheme },
		// The tags src/routes/a11y.e2e.ts checks the pages against (WCAG 2.2 AA)
		a11y: {
			options: {
				runOnly: {
					type: 'tag',
					values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']
				}
			},
			test: 'error'
		},
		viewport: {
			options: {
				mobile: viewport('Mobile (375)', 375),
				sm: viewport('Small (640)', 640),
				md: viewport('md (768)', 768),
				lg: viewport('lg (1024)', 1024),
				xl: viewport('xl (1280)', 1280)
			}
		},
		options: {
			storySort: {
				order: [
					'Brand',
					['Introduction', 'Logo', 'Voice and copy', 'Iconography', 'Photography'],
					'Foundations',
					['Colour', 'Typography', 'Spacing', 'Radius, shadow and motion', 'Breakpoints'],
					'Accessibility',
					'Layout',
					'Components',
					['Primitives', 'Content'],
					'Chrome',
					'Sections',
					'Pages'
				]
			}
		}
	}
};

export default preview;
