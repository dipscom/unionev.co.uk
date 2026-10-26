import { site } from '../../lib/content/site';

export const prerender = true;

const paths = ['/', '/privacy'];

export const GET = () => {
	const urls = paths.map((path) => `\t<url><loc>${site.origin}${path}</loc></url>`).join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
