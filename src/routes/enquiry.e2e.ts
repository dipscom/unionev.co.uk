import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { validateEnquiry } from '../lib/enquiry/schema';

// Turnstile is a third-party iframe; replace it with a stub that hands out a token at once
async function stubTurnstile(page: Page) {
	await page.route('https://challenges.cloudflare.com/**', (route) =>
		route.fulfill({
			contentType: 'text/javascript',
			body: `window.turnstile = { render: (el, o) => { o.callback('test-token'); return 'w1'; }, reset() {} };`
		})
	);
}

// The Worker is the only validator; answer like it does, using the same schema
async function stubWorker(page: Page) {
	await page.route('**/api/enquiry', (route) => {
		const result = validateEnquiry(
			Object.fromEntries(new URLSearchParams(route.request().postData() ?? ''))
		);
		return result.ok
			? route.fulfill({ json: { ok: true } })
			: route.fulfill({ status: 400, json: { ok: false, errors: result.errors } });
	});
}

async function fillValid(page: Page) {
	const form = page.locator('#contact form');
	await form.getByLabel('Your name').fill('Ada Lovelace');
	await form.getByLabel('Email address').fill('ada@example.com');
	await form.getByLabel('Organisation').fill('Analytical Estates');
	await form.getByLabel('Site postcode').fill('sw1a 1aa');
	await form.getByLabel('Type of site').selectOption('fleet-operators');
}

const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
async function expectNoViolations(page: Page) {
	const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
	expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
}

test.describe('enquiry form', () => {
	test.beforeEach(async ({ page }) => {
		await stubTurnstile(page);
		await stubWorker(page);
	});

	test('pre-selects the site type from ?type=', async ({ page }) => {
		await page.goto('/?type=local-authorities#contact');
		await expect(page.getByLabel('Type of site')).toHaveValue('local-authorities');
	});

	test('ignores an unknown ?type=', async ({ page }) => {
		await page.goto('/?type=nonsense#contact');
		await expect(page.getByLabel('Type of site')).toHaveValue('');
	});

	test('shows an error summary, moves focus to it and links to the fields', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Send enquiry' }).click();
		const summary = page.getByRole('alert');
		await expect(summary).toBeFocused();
		await expect(summary.getByRole('link')).toHaveCount(5);

		const name = page.getByLabel('Your name');
		await expect(name).toHaveAttribute('aria-invalid', 'true');
		await expect(name).toHaveAccessibleDescription('Enter your name.');
		await summary.getByRole('link', { name: 'Enter your name.' }).click();
		await expect(name).toBeFocused();
	});

	test('rejects a malformed postcode and email', async ({ page }) => {
		await page.goto('/');
		await fillValid(page);
		await page.getByLabel('Site postcode').fill('12345');
		await page.getByLabel('Email address').fill('not-an-email');
		await page.getByRole('button', { name: 'Send enquiry' }).click();
		await expect(page.getByRole('alert').getByRole('link')).toHaveText([
			'Enter a valid email address, like name@example.com.',
			'Enter a UK postcode, like SW1A 1AA.'
		]);
	});

	test('posts the fields with referrer and UTM values, then confirms', async ({ page }) => {
		let posted: URLSearchParams | undefined;
		await page.route('**/api/enquiry', async (route) => {
			posted = new URLSearchParams(route.request().postData() ?? '');
			await route.fulfill({ json: { ok: true } });
		});
		await page.goto('/?utm_source=newsletter&utm_campaign=autumn#contact', {
			referer: 'https://example.org/links'
		});
		await fillValid(page);
		await page.getByRole('button', { name: 'Send enquiry' }).click();

		const success = page.getByText('Thank you, Ada Lovelace. We have your enquiry.');
		await expect(success).toBeVisible();
		await expect(page.locator('.enquiry__success')).toBeFocused();
		await expect(page.locator('#contact form')).toBeHidden();

		expect(Object.fromEntries(posted!)).toMatchObject({
			name: 'Ada Lovelace',
			email: 'ada@example.com',
			organisation: 'Analytical Estates',
			siteType: 'fleet-operators',
			referrer: 'https://example.org/links',
			utm_source: 'newsletter',
			utm_campaign: 'autumn',
			'cf-turnstile-response': 'test-token',
			website: ''
		});
	});

	test('shows a server failure with an email fallback and keeps the input', async ({ page }) => {
		await page.route('**/api/enquiry', (route) =>
			route.fulfill({
				status: 502,
				json: {
					ok: false,
					errors: { form: 'We could not send your enquiry. Please email us instead.' }
				}
			})
		);
		await page.goto('/');
		await fillValid(page);
		await page.getByRole('button', { name: 'Send enquiry' }).click();
		const summary = page.getByRole('alert');
		await expect(summary).toBeFocused();
		await expect(summary).toContainText('We could not send your enquiry');
		await expect(summary.getByRole('link', { name: /grant@uevcl.com/ })).toBeVisible();
		await expect(page.getByLabel('Your name')).toHaveValue('Ada Lovelace');
	});

	test('the honeypot is not reachable by keyboard or assistive tech', async ({ page }) => {
		await page.goto('/');
		const trap = page.locator('input[name="website"]');
		await expect(trap).toHaveAttribute('tabindex', '-1');
		await expect(page.locator('.enquiry__trap')).toHaveAttribute('aria-hidden', 'true');
	});

	test('has no axe violations with errors showing', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Send enquiry' }).click();
		await expectNoViolations(page);
	});

	test('has no axe violations after a successful send', async ({ page }) => {
		await page.goto('/');
		await fillValid(page);
		await page.getByRole('button', { name: 'Send enquiry' }).click();
		await expect(page.locator('.enquiry__success')).toBeVisible();
		await expectNoViolations(page);
	});
});

test('thank-you page is noindex and stands on its own', async ({ page, request }) => {
	await page.goto('/thank-you');
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'Thank you for getting in touch'
	);
	expect(await (await request.get('/sitemap.xml')).text()).not.toContain('thank-you');
});
