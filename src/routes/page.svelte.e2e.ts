import { expect, test } from '@playwright/test';

test.describe('home page', () => {
	test('has title, description and canonical', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(
			'Union EV | Managed EV Charging for Residential Sites, Workplaces & Depots'
		);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			'content',
			/Managed EV charging for residential sites/
		);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://www.unionev.co.uk/'
		);
		await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
		await expect(page.locator('h1')).toBeVisible();
	});

	test('nav anchors scroll to their sections', async ({ page }) => {
		await page.goto('/');
		const links = [
			['Services', '#what-we-do'],
			['How It Works', '#how-it-works'],
			['Case Study', '#case-study'],
			['Get In Touch', '#contact']
		];
		for (const [label, hash] of links) {
			await page.locator('nav .nav__links').getByRole('link', { name: label }).click();
			await expect(page).toHaveURL(new RegExp(`${hash}$`));
			await expect(page.locator(hash)).toBeInViewport();
		}
	});

	test('mobile menu opens and closes', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 800 });
		await page.goto('/');
		const toggle = page.getByRole('button', { name: 'Toggle menu' });
		await expect(page.locator('#mobile-menu')).toBeHidden();
		await toggle.click();
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');
		await expect(page.locator('#mobile-menu')).toBeVisible();
		await page.locator('#mobile-menu').getByRole('link', { name: 'How It Works' }).click();
		await expect(page.locator('#mobile-menu')).toBeHidden();
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
	});

	test('FAQ item expands to show its answer', async ({ page }) => {
		await page.goto('/');
		const question = page.getByRole('button', { name: 'Who owns the chargers?' });
		const answer = page.getByText('It depends on the funding model.');
		await expect(answer).toBeHidden();
		await question.click();
		await expect(question).toHaveAttribute('aria-expanded', 'true');
		await expect(answer).toBeVisible();
		await question.click();
		await expect(answer).toBeHidden();
	});

	test('audience panels open one at a time and link to the enquiry', async ({ page }) => {
		await page.goto('/');
		const fleet = page.getByRole('button', { name: 'Fleet Operators' });
		const businesses = page.getByRole('button', { name: 'Businesses & Employers' });
		const fleetPanel = page.locator(`#${await fleet.getAttribute('aria-controls')}`);
		const businessesPanel = page.locator(`#${await businesses.getAttribute('aria-controls')}`);

		await expect(fleetPanel).toBeHidden();
		await fleet.click();
		await expect(fleet).toHaveAttribute('aria-expanded', 'true');
		await expect(fleetPanel).toBeVisible();
		await expect(fleetPanel.getByRole('link')).toHaveAttribute(
			'href',
			'?type=fleet-operators#contact'
		);

		await businesses.click();
		await expect(businessesPanel).toBeVisible();
		await expect(fleetPanel).toBeHidden();
		await expect(fleet).toHaveAttribute('aria-expanded', 'false');

		await businesses.click();
		await expect(businessesPanel).toBeHidden();
	});

	test('partners link out and explain their role', async ({ page }) => {
		await page.goto('/');
		const monta = page.getByRole('link', { name: 'Monta' });
		await expect(monta).toHaveAttribute('href', 'https://monta.com/');
		await expect(monta).toHaveAttribute('target', '_blank');
		await expect(page.getByText('Operating platform & driver app')).toBeVisible();
	});

	test('case study preview links to the case study', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: /Read the case study/ }).click();
		await expect(page).toHaveURL(/#case-study$/);
		await expect(page.locator('#case-study')).toBeInViewport();
	});

	test('footer offers a separate driver support route', async ({ page }) => {
		await page.goto('/');
		await expect(
			page.getByRole('contentinfo').getByRole('link', { name: 'Driver support' })
		).toHaveAttribute('href', /^mailto:.+\?subject=Driver%20support$/);
	});

	test('contact section offers the enquiry form', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#contact form')).toBeVisible();
	});

	test('images load or fall back to a placeholder', async ({ page }) => {
		await page.goto('/');
		await page.locator('.tile').first().scrollIntoViewIfNeeded();
		const broken = await page.evaluate(
			() => [...document.images].filter((img) => img.complete && img.naturalWidth === 0).length
		);
		expect(broken).toBe(0);
	});

	test('images are self-hosted, sized and served as AVIF', async ({ page, viewport }) => {
		const external: string[] = [];
		const avif: string[] = [];
		page.on('request', (request) => {
			const { hostname, pathname } = new URL(request.url());
			if (hostname !== 'localhost' && hostname !== '127.0.0.1') external.push(request.url());
			if (pathname.endsWith('.avif')) avif.push(pathname);
		});
		await page.goto('/');
		await page.locator('.tile').first().scrollIntoViewIfNeeded();
		await page.locator('#case-study').scrollIntoViewIfNeeded();
		await page.waitForLoadState('networkidle');

		expect(external).toEqual([]);
		expect(avif.length).toBeGreaterThan(0);
		const unsized = await page.evaluate(
			() => [...document.images].filter((img) => !img.getAttribute('width')).length
		);
		expect(unsized).toBe(0);
		// The hero photo is hidden below 1024px, so it must not be downloaded there
		const heroLoaded = avif.some((path) => path.includes('hero-'));
		expect(heroLoaded).toBe((viewport?.width ?? 1280) >= 1024);
	});
});

test.describe('other routes', () => {
	test('privacy page renders and is linked from the footer', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('contentinfo').getByRole('link', { name: 'Privacy' }).click();
		await expect(page).toHaveURL(/\/privacy$/);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy & Cookie Notice');
	});

	test('unknown route shows the 404 page', async ({ page }) => {
		const response = await page.goto('/does-not-exist');
		expect(response?.status()).toBe(404);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
	});

	test('robots.txt and sitemap.xml are served', async ({ request }) => {
		const robots = await request.get('/robots.txt');
		expect(await robots.text()).toContain('Sitemap: https://www.unionev.co.uk/sitemap.xml');
		const sitemap = await request.get('/sitemap.xml');
		const xml = await sitemap.text();
		expect(xml).toContain('<loc>https://www.unionev.co.uk/</loc>');
		expect(xml).toContain('<loc>https://www.unionev.co.uk/privacy</loc>');
	});
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('the page ships only two small inline scripts and keeps its content readable', async ({
		page
	}) => {
		await page.goto('/');
		await expect(page.locator('script[src]')).toHaveCount(0);
		await expect(page.locator('script[type="module"]')).toHaveCount(2);
		await expect(page.getByText('It depends on the funding model.')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeHidden();
	});
});
