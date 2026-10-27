import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// Same rule set as docs/accessibility-audit.md
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

async function expectNoViolations(page: Page) {
	const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
	const summary = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`);
	expect(summary).toEqual([]);
}

test.describe('accessibility (axe)', () => {
	for (const path of ['/', '/privacy', '/thank-you', '/does-not-exist']) {
		test(`${path} has no violations`, async ({ page }) => {
			await page.goto(path);
			await expectNoViolations(page);
		});
	}

	test('home has no violations with an audience panel and FAQ open', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Fleet Operators' }).click();
		await page.getByRole('button', { name: 'Who owns the chargers?' }).click();
		await expectNoViolations(page);
	});

	test('home has no violations on mobile with the menu open', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 800 });
		await page.goto('/');
		await page.getByRole('button', { name: 'Toggle menu' }).click();
		await expectNoViolations(page);
	});
});

test.describe('keyboard', () => {
	test('skip link is the first tab stop and moves focus to main', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Tab');
		const skip = page.getByRole('link', { name: 'Skip to main content' });
		await expect(skip).toBeFocused();
		await expect(skip).toBeInViewport();
		await page.keyboard.press('Enter');
		await expect(page.locator('main')).toBeFocused();
	});

	test('Escape closes the mobile menu and returns focus to the toggle', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 800 });
		await page.goto('/');
		const toggle = page.getByRole('button', { name: 'Toggle menu' });
		await toggle.click();
		await expect(page.locator('#mobile-menu')).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.locator('#mobile-menu')).toBeHidden();
		await expect(toggle).toBeFocused();
	});
});
