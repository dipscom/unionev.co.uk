import {
	cleanTracking,
	validateEnquiry,
	type Enquiry,
	type Field
} from '../src/lib/enquiry/schema';
import { createEmailProvider } from './email';
import { enquiryAcknowledgement, enquiryNotification } from './email/templates';
import type { Env } from './env';
import { checkFormToken, issueFormToken, type TokenCheck } from './formToken';
import { renderPlainForm, renderPlainMessage, type FormErrors, type FormValues } from './plainForm';
import { screenPlainEnquiry } from './screening';
import { verifyTurnstile } from './turnstile';

const MAX_BODY_BYTES = 20_000;

type Body = Record<string, unknown>;

async function readBody(request: Request): Promise<Body | null> {
	const length = Number(request.headers.get('content-length') ?? 0);
	if (length > MAX_BODY_BYTES) return null;
	try {
		if (request.headers.get('content-type')?.includes('application/json')) {
			const json = await request.json();
			return json && typeof json === 'object' ? (json as Body) : null;
		}
		return Object.fromEntries(await request.formData());
	} catch {
		return null;
	}
}

const text = (value: unknown) => (typeof value === 'string' ? value : '');

const wantsJson = (request: Request) => request.headers.get('accept')?.includes('application/json');

const htmlHeaders = {
	'Content-Type': 'text/html; charset=utf-8',
	// The form carries a signed timestamp, so it must never be cached
	'Cache-Control': 'no-store',
	'X-Robots-Tag': 'noindex'
};

const html = (body: string, status = 200) => new Response(body, { status, headers: htmlHeaders });

function respond(
	request: Request,
	status: number,
	payload: { ok: boolean; confirmation?: boolean; errors?: Partial<Record<Field | 'form', string>> }
) {
	if (wantsJson(request)) return Response.json(payload, { status });
	if (payload.ok) return Response.redirect(`${new URL(request.url).origin}/thank-you`, 303);
	// No JavaScript: a plain page naming the problem, with a way back
	const message = Object.values(payload.errors ?? {})[0] ?? 'Something went wrong.';
	return html(renderPlainMessage('Your enquiry was not sent', message), status);
}

const clientIp = (request: Request) => request.headers.get('CF-Connecting-IP') ?? 'unknown';

const tooMany = (request: Request) =>
	respond(request, 429, {
		ok: false,
		errors: { form: 'Too many enquiries from your connection. Please wait a minute and try again.' }
	});

const tokenProblems: Record<Exclude<TokenCheck, 'valid'>, string> = {
	invalid: 'We could not confirm you are not a robot. Please send the form again.',
	'too-fast': 'That was sent too quickly. Check your details, then send it again.',
	expired: 'The form timed out. Check your details, then send it again.'
};

/** The plain form again, with what the visitor typed, and what to fix */
async function showPlainForm(
	env: Env,
	status: number,
	body: Body,
	errors: FormErrors,
	reuseToken: boolean
) {
	const fields: Field[] = ['name', 'email', 'organisation', 'postcode', 'siteType', 'details'];
	const values: FormValues = Object.fromEntries(fields.map((field) => [field, text(body[field])]));
	// A token that is still good keeps its age, so fixing a typo does not mean waiting again
	const token = reuseToken ? text(body.ft) : await issueFormToken(env.FORM_SECRET);
	return html(renderPlainForm(token, values, errors), status);
}

async function handleEnquiry(request: Request, env: Env): Promise<Response> {
	const body = await readBody(request);
	if (!body) return respond(request, 400, { ok: false, errors: { form: 'Invalid request.' } });

	// Honeypot: pretend it worked so bots learn nothing
	if (typeof body.website === 'string' && body.website !== '') {
		return respond(request, 200, { ok: true });
	}

	// Turnstile only runs with JavaScript. Without its token the enquiry takes the plain path:
	// the page's signed timestamp instead, stricter limits and screening, and no confirmation email.
	const turnstileToken = text(body['cf-turnstile-response']);
	const plain = !turnstileToken;
	const limiter = plain ? env.PLAIN_LIMITER : env.ENQUIRY_LIMITER;
	if (!(await limiter.limit({ key: clientIp(request) })).success) return tooMany(request);

	// A browser posting the form itself (no JavaScript) gets a page back; a script gets JSON
	const showForm = plain && !wantsJson(request);

	const result = validateEnquiry(body);
	if (!result.ok) {
		if (showForm) {
			const check = await checkFormToken(text(body.ft), env.FORM_SECRET);
			return showPlainForm(env, 400, body, result.errors, check === 'valid');
		}
		return respond(request, 400, { ok: false, errors: result.errors });
	}
	const { data } = result;

	if (plain) {
		const check = await checkFormToken(text(body.ft), env.FORM_SECRET);
		const errors: FormErrors = {
			...screenPlainEnquiry(data),
			...(check !== 'valid' && { form: tokenProblems[check] })
		};
		if (Object.keys(errors).length) {
			if (showForm) return showPlainForm(env, 400, body, errors, check === 'valid');
			return respond(request, 400, { ok: false, errors });
		}
	} else {
		const ip = request.headers.get('CF-Connecting-IP');
		if (!(await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET, ip))) {
			return respond(request, 400, {
				ok: false,
				errors: { form: 'We could not confirm you are not a robot. Please try again.' }
			});
		}
	}

	return sendEnquiry(request, env, body, data, plain, showForm);
}

async function sendEnquiry(
	request: Request,
	env: Env,
	body: Body,
	data: Enquiry,
	plain: boolean,
	showForm: boolean
): Promise<Response> {
	const email = createEmailProvider(env);
	const submissionId = crypto.randomUUID();
	const notification = enquiryNotification(data, cleanTracking(body), new Date(), !plain);

	try {
		await email.send({
			from: env.ENQUIRY_FROM,
			to: [env.ENQUIRY_TO],
			replyTo: data.email,
			...notification,
			idempotencyKey: `enquiry-${submissionId}`
		});
	} catch (error) {
		console.error('Enquiry notification failed', error);
		if (showForm) {
			return showPlainForm(
				env,
				502,
				body,
				{ form: 'We could not send your enquiry. Please try again in a few minutes.' },
				true
			);
		}
		return respond(request, 502, {
			ok: false,
			errors: { form: 'We could not send your enquiry. Please try again in a few minutes.' }
		});
	}

	// The confirmation goes to an address the visitor typed, so anyone could aim it at someone
	// else. Only enquiries that passed Turnstile get one, and at most a couple a minute per address.
	if (!plain) {
		try {
			const recipient = data.email.toLowerCase();
			if ((await env.RECIPIENT_LIMITER.limit({ key: recipient })).success) {
				await email.send({
					from: env.ENQUIRY_FROM,
					to: [data.email],
					...enquiryAcknowledgement(data),
					idempotencyKey: `ack-${submissionId}`
				});
			}
		} catch (error) {
			// The lead is already safe; a failed acknowledgement must not fail the submission
			console.error('Enquiry acknowledgement failed', error);
		}
	}

	// `confirmation` tells the page whether to say an email is on its way
	return respond(request, 200, { ok: true, confirmation: !plain });
}

/** Where the signed timestamp goes in the prerendered form (EnquiryForm.svelte) */
const tokenField = 'name="ft" value=""';

/**
 * The home page, with the enquiry form stamped with the time it was sent. The page itself is the
 * prerendered static file; only this one hidden field differs per visit, so the page must not be
 * cached.
 */
async function serveHome(request: Request, env: Env): Promise<Response> {
	const asset = await env.ASSETS.fetch(request);
	if (!asset.ok || !asset.headers.get('content-type')?.includes('text/html')) return asset;

	const page = await asset.text();
	const token = await issueFormToken(env.FORM_SECRET);
	// A function, so `$` in the token could never be read as a replacement pattern
	const stamped = page.replace(tokenField, () => `name="ft" value="${token}"`);

	// The body changed, so these no longer describe it
	const headers = new Headers(asset.headers);
	for (const name of ['content-length', 'content-encoding', 'etag', 'last-modified']) {
		headers.delete(name);
	}
	headers.set('Cache-Control', 'private, no-cache');
	return new Response(request.method === 'HEAD' ? null : stamped, {
		status: asset.status,
		headers
	});
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const { pathname } = new URL(request.url);
		if (pathname === '/api/enquiry') {
			if (request.method !== 'POST') {
				return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
			}
			return handleEnquiry(request, env);
		}
		if (pathname === '/' && (request.method === 'GET' || request.method === 'HEAD')) {
			return serveHome(request, env);
		}
		// Everything else is a static file
		return env.ASSETS.fetch(request);
	}
};
