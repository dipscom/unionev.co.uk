import { create } from 'storybook/theming';
import logo from '../src/lib/images/union_logo.svg';

// Hex values cannot read CSS variables: keep them in sync with src/styles/tokens.css
const base = {
	brandTitle: 'Union EV design system',
	brandUrl: 'https://www.unionev.co.uk',
	brandTarget: '_blank',
	colorPrimary: '#023a31', // --color-brand
	colorSecondary: '#8f2f0d', // --color-action
	fontBase: "'Inter Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
	textColor: '#111827', // --color-text
	textMutedColor: '#4b5563', // --color-text-muted
	appBorderRadius: 8
} as const;

export const managerTheme = create({
	base: 'light',
	...base,
	brandImage: logo,
	appBg: '#f9fafb', // --color-surface-alt
	appContentBg: '#fff',
	appBorderColor: '#e5e7eb' // --color-border-strong
});

export const docsTheme = create({ base: 'light', ...base });
