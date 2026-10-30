/**
 * Reads the design tokens straight from the CSS, so the Storybook catalogue cannot drift from
 * src/styles/tokens.css. Used by the MDX pages in this folder only; nothing here ships to the site.
 */
import tokensCss from '../styles/tokens.css?raw';
import utilitiesCss from '../styles/utilities.css?raw';

export type Token = {
	name: string;
	/** As written, e.g. `var(--color-action)` */
	value: string;
	/** With every var() reference followed, e.g. `#8f2f0d` */
	resolved: string;
	/** The token this one points at, when its value is a single var() */
	alias: string | null;
	/** The comment directly above the token, if any */
	note: string | null;
};

/** The custom properties declared in the first rule for `selector` */
function parseRule(css: string, selector: string) {
	const start = css.indexOf(`${selector} {`);
	if (start === -1) return [];
	const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('\n}', start));

	const tokens: Omit<Token, 'resolved'>[] = [];
	let note: string | null = null;
	// Comments and declarations in source order
	for (const [, comment, name, value] of body.matchAll(
		/\/\*([\s\S]*?)\*\/|(--[\w-]+):\s*([^;]+);/g
	)) {
		if (comment !== undefined) {
			note = comment
				.split('\n')
				.map((line) => line.replace(/^\s*\*\s?/, '').trim())
				.filter(Boolean)
				.join(' ');
			continue;
		}
		const alias = value.match(/^var\((--[\w-]+)\)$/)?.[1] ?? null;
		tokens.push({ name, value: value.trim(), alias, note });
		note = null;
	}
	return tokens;
}

const raw = parseRule(tokensCss, ':root');
const byName = new Map(raw.map((token) => [token.name, token.value]));

function resolve(value: string, depth = 0): string {
	if (depth > 10) return value;
	return value.replace(/var\((--[\w-]+)\)/g, (match, name: string) => {
		const target = byName.get(name);
		return target === undefined ? match : resolve(target, depth + 1);
	});
}

export const tokens: Token[] = raw.map((token) => ({ ...token, resolved: resolve(token.value) }));

/** Tokens whose name starts with any of the prefixes, in source order */
export const tokensWith = (...prefixes: string[]) =>
	tokens.filter((token) => prefixes.some((prefix) => token.name.startsWith(prefix)));

/** The roles `.theme-dark` reassigns (src/styles/utilities.css) */
export const darkRoles = parseRule(utilitiesCss, '.theme-dark').map((token) => ({
	...token,
	resolved: resolve(token.value)
}));

/** Colour tokens grouped by role. Order matters: a token joins the first group it matches */
const colourGroups: [string, RegExp][] = [
	['Borders and dividers', /^--color-(border|divider)/],
	['Text and icons', /^--color-(text|heading|icon)/],
	['Surfaces', /^--(color-surface|gradient)/],
	['Status', /^--color-danger/],
	['Action and accent (orange)', /^--color-(action|accent|focus)/],
	['Brand (green)', /^--color-(brand|success)/]
];

export const colourTokens = () => {
	const groups = new Map<string, Token[]>(colourGroups.map(([title]) => [title, []]));
	for (const token of tokensWith('--color-', '--gradient-')) {
		const group = colourGroups.find(([, pattern]) => pattern.test(token.name));
		groups.get(group ? group[0] : 'Other')?.push(token);
	}
	// Brand first, as the page reads
	return [...groups].reverse().filter(([, list]) => list.length > 0);
};

/** `--text-lg` with its matching `--leading-lg`, for the type scale */
export const typeScale = () =>
	tokensWith('--text-').map((size) => ({
		...size,
		leading: tokens.find((t) => t.name === size.name.replace('--text-', '--leading-')) ?? null
	}));

/** rem/px value in px, for drawing the scales */
export const toPx = (value: string) => {
	const number = parseFloat(value);
	if (value.endsWith('rem')) return number * 16;
	if (value.endsWith('px')) return number;
	return number;
};

/* WCAG 2 contrast, for opaque hex colours only */
function luminance(hex: string) {
	const full = hex.length === 4 ? hex.replace(/\w/g, (c) => c + c) : hex;
	const channels = [1, 3, 5].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
	const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const isHex = (value: string) => /^#([\da-f]{3}|[\da-f]{6})$/i.test(value);

/** Contrast ratio between two hex colours, e.g. 8.1 */
export function contrast(a: string, b: string) {
	const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return Math.round(((light + 0.05) / (dark + 0.05)) * 10) / 10;
}

/** The WCAG level a ratio meets for normal-size text */
export const level = (ratio: number) =>
	ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large / UI' : 'Fails';

export const value = (name: string) => tokens.find((token) => token.name === name)?.resolved ?? '';
