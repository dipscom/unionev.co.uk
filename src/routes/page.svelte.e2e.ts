import { expect, test } from '@playwright/test';

test.describe('home page', () => {
	test('has title, description and canonical', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle('Union EV | Smart EV Charging for Residential Communities');
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			'content',
			/zero-CAPEX electric vehicle charging/
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
			['The Full Picture', '#what-we-do'],
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
		await expect(page.locator('#mobile-menu')).toHaveCount(0);
		await toggle.click();
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');
		await page.locator('#mobile-menu').getByRole('link', { name: 'How It Works' }).click();
		await expect(page.locator('#mobile-menu')).toHaveCount(0);
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
	});

	test('FAQ item expands to show its answer', async ({ page }) => {
		await page.goto('/');
		const question = page.getByRole('button', { name: 'Who owns the chargers?' });
		const answer = page.getByText('Union EV owns and operates the charging infrastructure.');
		await expect(answer).toBeHidden();
		await question.click();
		await expect(question).toHaveAttribute('aria-expanded', 'true');
		await expect(answer).toBeVisible();
		await question.click();
		await expect(answer).toBeHidden();
	});

	test('contact links use mailto with subject', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('link', { name: /Email Us/ })).toHaveAttribute(
			'href',
			'mailto:grant@uevcl.com?subject=EV%20Charging%20Enquiry'
		);
	});

	test('images load or fall back to a placeholder', async ({ page }) => {
		await page.goto('/');
		await page.locator('.tile').first().scrollIntoViewIfNeeded();
		const broken = await page.evaluate(
			() => [...document.images].filter((img) => img.complete && img.naturalWidth === 0).length
		);
		expect(broken).toBe(0);
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
