import { expect, test } from '@playwright/test';
import worker from './index';
import type { Env, RateLimiter } from './env';
import { issueFormToken, MAX_AGE_MS, MIN_AGE_MS } from './formToken';

// Runs the Worker's fetch handler directly: no browser, with Brevo, Cloudflare and the built site
// stubbed

const SECRET = 'test-secret';
const allow: RateLimiter = { limit: async () => ({ success: true }) };
const deny: RateLimiter = { limit: async () => ({ success: false }) };

// What the build puts in the prerendered form (EnquiryForm.svelte)
const page = '<!doctype html><form><input type="hidden" name="ft" value=""/></form>';
const assets = {
	fetch: async (request: Request) => {
		const { pathname } = new URL(request.url);
		if (pathname === '/') {
			return new Response(request.method === 'HEAD' ? null : page, {
				headers: {
					'content-type': 'text/html',
					etag: '"abc"',
					'content-length': String(page.length)
				}
			});
		}
		if (pathname === '/robots.txt')
			return new Response('User-agent: *', { headers: { 'content-type': 'text/plain' } });
		return new Response('Not found', { status: 404 });
	}
};

const env = (overrides: Partial<Env> = {}): Env => ({
	ASSETS: assets,
	ENQUIRY_TO: 'inbox@example.com',
	ENQUIRY_FROM: 'Union EV <hello@example.com>',
	BREVO_API_KEY: 'key',
	TURNSTILE_SECRET: 'turnstile-secret',
	FORM_SECRET: SECRET,
	ENQUIRY_LIMITER: allow,
	PLAIN_LIMITER: allow,
	RECIPIENT_LIMITER: allow,
	...overrides
});

const valid = {
	name: 'Ada Lovelace',
	email: 'ada@example.com',
	organisation: 'Analytical Estates',
	postcode: 'SW1A 1AA',
	siteType: 'fleet-operators'
};

type Sent = { to: { email: string }[]; subject: string; textContent: string };
let sent: Sent[];
let turnstilePasses: boolean;
const realFetch = globalThis.fetch;

test.beforeEach(() => {
	sent = [];
	turnstilePasses = true;
	globalThis.fetch = async (input, init) => {
		const url = String(input);
		if (url.includes('challenges.cloudflare.com')) {
			return Response.json({ success: turnstilePasses });
		}
		if (url.includes('api.brevo.com')) {
			sent.push(JSON.parse(String(init?.body)));
			return Response.json({});
		}
		throw new Error(`Unexpected request to ${url}`);
	};
});
test.afterEach(() => {
	globalThis.fetch = realFetch;
});

const post = (fields: Record<string, string>, headers: Record<string, string> = {}, e = env()) =>
	worker.fetch(
		new Request('https://example.com/api/enquiry', {
			method: 'POST',
			headers: { 'CF-Connecting-IP': '203.0.113.7', ...headers },
			body: new URLSearchParams(fields)
		}),
		e
	);

const agedToken = (ms: number) => issueFormToken(SECRET, Date.now() - ms);

test.describe('the home page', () => {
	const get = (method = 'GET', path = '/') =>
		worker.fetch(new Request(`https://example.com${path}`, { method }), env());

	test('is stamped with a signed timestamp, and is not cached', async () => {
		const response = await get();
		expect(response.status).toBe(200);
		expect(response.headers.get('cache-control')).toBe('private, no-cache');
		expect(response.headers.has('etag')).toBe(false);
		expect(await response.text()).toMatch(/name="ft" value="\d+\.[0-9a-f]{64}"/);
	});

	test('gets a new timestamp on every visit', async () => {
		const first = await get();
		await new Promise((resolve) => setTimeout(resolve, 5));
		const second = await get();
		const token = async (response: Response) =>
			(await response.text()).match(/value="([^"]+)"/)![1];
		expect(await token(first)).not.toBe(await token(second));
	});

	test('answers HEAD without a body, and leaves other files alone', async () => {
		expect(await (await get('HEAD')).text()).toBe('');
		const robots = await get('GET', '/robots.txt');
		expect(await robots.text()).toBe('User-agent: *');
		expect((await get('GET', '/nowhere')).status).toBe(404);
	});
});

test.describe('without Turnstile (no JavaScript, or it was blocked)', () => {
	test('sends one email to the team, and no confirmation to the address typed', async () => {
		const ft = await agedToken(MIN_AGE_MS + 1000);
		const response = await post({ ...valid, ft });
		expect(response.status).toBe(303);
		expect(response.headers.get('location')).toBe('https://example.com/thank-you');
		expect(sent).toHaveLength(1);
		expect(sent[0].to[0].email).toBe('inbox@example.com');
		expect(sent[0].textContent).toContain('Bot check: Not run');
	});

	test('a script gets JSON saying no confirmation is on its way', async () => {
		const ft = await agedToken(MIN_AGE_MS + 1000);
		const response = await post({ ...valid, ft }, { Accept: 'application/json' });
		expect(await response.json()).toEqual({ ok: true, confirmation: false });
		expect(sent).toHaveLength(1);
	});

	test('turns away a post with no signed timestamp, keeping what was typed', async () => {
		const response = await post(valid);
		expect(response.status).toBe(400);
		const page = await response.text();
		expect(page).toContain('role="alert"');
		expect(page).toContain('value="Ada Lovelace"');
		expect(sent).toHaveLength(0);
	});

	test('turns away a tampered, too-quick or expired timestamp', async () => {
		const good = await agedToken(MIN_AGE_MS + 1000);
		const tampered = good.replace(/.$/, (c) => (c === '0' ? '1' : '0'));
		for (const ft of [
			tampered,
			await agedToken(0),
			await agedToken(MAX_AGE_MS + 1000),
			'nonsense'
		]) {
			expect((await post({ ...valid, ft })).status).toBe(400);
		}
		// Signed with another secret
		const forged = await issueFormToken('another-secret', Date.now() - 60_000);
		expect((await post({ ...valid, ft: forged })).status).toBe(400);
		expect(sent).toHaveLength(0);
	});

	test('reuses a still-good timestamp when it re-shows the form for a typo', async () => {
		const ft = await agedToken(MIN_AGE_MS + 1000);
		const page = await (await post({ ...valid, postcode: '12345', ft })).text();
		expect(page).toContain(`name="ft" value="${ft}"`);
		expect(page).toContain('Enter a UK postcode');
		expect(page).toContain('aria-invalid="true"');
	});

	test('rejects web links, which are what spam is made of', async () => {
		const ft = await agedToken(MIN_AGE_MS + 1000);
		const response = await post({ ...valid, details: 'Cheap pills https://spam.example', ft });
		expect(response.status).toBe(400);
		expect(await response.text()).toContain('Leave out web links');
		expect(sent).toHaveLength(0);
	});

	test('is rate limited', async () => {
		const ft = await agedToken(MIN_AGE_MS + 1000);
		expect((await post({ ...valid, ft }, {}, env({ PLAIN_LIMITER: deny }))).status).toBe(429);
		expect(sent).toHaveLength(0);
	});

	test('a script posting with no timestamp gets JSON, not the form', async () => {
		const response = await post(valid, { Accept: 'application/json' });
		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			ok: false,
			errors: { form: 'We could not confirm you are not a robot. Please send the form again.' }
		});
	});
});

test.describe('with Turnstile', () => {
	const token = { 'cf-turnstile-response': 'token' };

	test('sends the team the enquiry and the visitor a confirmation', async () => {
		const response = await post({ ...valid, ...token }, { Accept: 'application/json' });
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true, confirmation: true });
		expect(sent.map((message) => message.to[0].email)).toEqual([
			'inbox@example.com',
			'ada@example.com'
		]);
		expect(sent[0].textContent).not.toContain('Bot check');
	});

	test('rejects a token Cloudflare does not accept', async () => {
		turnstilePasses = false;
		const response = await post({ ...valid, ...token }, { Accept: 'application/json' });
		expect(response.status).toBe(400);
		expect(sent).toHaveLength(0);
	});

	test('skips the confirmation, not the enquiry, when the address has had enough', async () => {
		const response = await post(
			{ ...valid, ...token },
			{ Accept: 'application/json' },
			env({ RECIPIENT_LIMITER: deny })
		);
		expect(response.status).toBe(200);
		expect(sent.map((message) => message.to[0].email)).toEqual(['inbox@example.com']);
	});

	test('is rate limited per IP', async () => {
		const response = await post(
			{ ...valid, ...token },
			{ Accept: 'application/json' },
			env({ ENQUIRY_LIMITER: deny })
		);
		expect(response.status).toBe(429);
		expect(sent).toHaveLength(0);
	});
});

test('the honeypot pretends to succeed and sends nothing', async () => {
	const response = await post({ ...valid, website: 'http://bot.example' });
	expect(response.status).toBe(303);
	expect(sent).toHaveLength(0);
});
