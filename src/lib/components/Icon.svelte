<script lang="ts" module>
	// Stroke paths from Lucide (https://lucide.dev, ISC licence), drawn on a 24×24 grid.
	const paths = {
		plug: [
			'M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z',
			'm2 22 3-3',
			'M7.5 13.5 10 11',
			'M10.5 16.5 13 14',
			'm18 3-4 4h6l-4 4'
		],
		pound: ['M18 7c0-5.333-8-5.333-8 0', 'M10 7v14', 'M6 21h12', 'M6 13h10'],
		wrench: [
			'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'
		],
		chart: ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
		building: [
			'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z',
			'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2',
			'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2',
			'M10 6h4',
			'M10 10h4',
			'M10 14h4',
			'M10 18h4'
		],
		house: [
			'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8',
			'M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
		],
		clipboard: [
			'M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z',
			'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2',
			'M12 11h4',
			'M12 16h4',
			'M8 11h.01',
			'M8 16h.01'
		],
		users: [
			'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
			'M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
			'M22 21v-2a4 4 0 0 0-3-3.87',
			'M16 3.13a4 4 0 0 1 0 7.75'
		],
		truck: [
			'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2',
			'M15 18H9',
			'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
			'M19 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
			'M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'
		],
		landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2l8 5H4z'],
		briefcase: [
			'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
			'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z'
		],
		check: ['M20 6 9 17l-5-5'],
		chevron: ['m6 9 6 6 6-6'],
		external: ['M7 7h10v10', 'M7 17 17 7'],
		cross: ['M18 6 6 18', 'm6 6 12 12'],
		plus: ['M5 12h14', 'M12 5v14'],
		refresh: [
			'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8',
			'M21 3v5h-5',
			'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16',
			'M8 16H3v5'
		]
	} satisfies Record<string, string[]>;

	export type IconName = keyof typeof paths;

	/** Every icon, for the Storybook gallery */
	export const iconNames = Object.keys(paths) as IconName[];
</script>

<script lang="ts">
	type Props = {
		name: IconName;
		/** Rendered width and height */
		size?: string;
	};

	let { name, size = '1.5rem' }: Props = $props();
</script>

<svg
	class="icon"
	viewBox="0 0 24 24"
	width={size}
	height={size}
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#each paths[name] as d (d)}
		<path {d} />
	{/each}
</svg>

<style>
	.icon {
		flex-shrink: 0;
	}
</style>
