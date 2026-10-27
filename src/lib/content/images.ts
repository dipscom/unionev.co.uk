// Photos are built by `npm run images` (scripts/image-manifest.mjs) into src/lib/images/<name>/<crop>-<width>.<ext>.
// Set an entry to `null` to render the placeholder instead.
const files = import.meta.glob<string>('../images/*/*.{avif,webp,jpg}', {
	eager: true,
	query: '?url',
	import: 'default'
});

export type Picture = {
	/** AVIF then WebP, in order of preference */
	sources: { type: string; srcset: string }[];
	/** JPEG fallback for the <img> element, which also carries the intrinsic size */
	src: string;
	width: number;
	height: number;
};

const types = { avif: 'image/avif', webp: 'image/webp' } as const;

function picture(name: string, crop: string, aspect: number): Picture {
	const prefix = `../images/${name}/${crop}-`;
	const variants = Object.entries(files)
		.filter(([path]) => path.startsWith(prefix))
		.map(([path, url]) => {
			const [, width, ext] = path.slice(prefix.length).match(/^(\d+)\.(\w+)$/)!;
			return { width: Number(width), ext, url };
		})
		.sort((a, b) => a.width - b.width);

	const sources = (Object.keys(types) as (keyof typeof types)[]).map((ext) => ({
		type: types[ext],
		srcset: variants
			.filter((v) => v.ext === ext)
			.map((v) => `${v.url} ${v.width}w`)
			.join(', ')
	}));
	const fallback = variants.find((v) => v.ext === 'jpg')!;
	return {
		sources,
		src: fallback.url,
		width: fallback.width,
		height: Math.round(fallback.width / aspect)
	};
}

export const images = {
	hero: picture('hero', 'hero', 448 / 384),
	gallery1: picture('gallery1', 'tile', 4 / 3),
	gallery2: picture('gallery2', 'tile', 4 / 3),
	installTile: picture('install', 'tile', 4 / 3),
	installStudy: picture('install', 'study', 33 / 20)
} satisfies Record<string, Picture | null>;
