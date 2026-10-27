import { cleanTracking, validateEnquiry, type Field } from '../src/lib/enquiry/schema';
import { createEmailProvider } from './email';
import { enquiryAcknowledgement, enquiryNotification } from './email/templates';
import type { Env } from './env';
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

const wantsJson = (request: Request) => request.headers.get('accept')?.includes('application/json');

function respond(
	request: Request,
	status: number,
	payload: { ok: boolean; errors?: Partial<Record<Field | 'form', string>> }
) {
	if (wantsJson(request)) return Response.json(payload, { status });
	if (payload.ok) return Response.redirect(`${new URL(request.url).origin}/thank-you`, 303);
	// No JavaScript: a plain page naming the problem, with a way back
	const message = Object.values(payload.errors ?? {})[0] ?? 'Something went wrong.';
	return new Response(
		`<!doctype html><html lang="en-GB"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Enquiry not sent | Union EV</title><body style="font-family:sans-serif;max-width:36rem;margin:4rem auto;padding:0 1.5rem"><h1>Your enquiry was not sent</h1><p>${message.replace(/[<>&"]/g, '')}</p><p><a href="/#contact">Back to the form</a></p>`,
		{ status, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
	);
}

async function handleEnquiry(request: Request, env: Env): Promise<Response> {
	const body = await readBody(request);
	if (!body) return respond(request, 400, { ok: false, errors: { form: 'Invalid request.' } });

	// Honeypot: pretend it worked so bots learn nothing
	if (typeof body.website === 'string' && body.website !== '') {
		return respond(request, 200, { ok: true });
	}

	const result = validateEnquiry(body);
	if (!result.ok) return respond(request, 400, { ok: false, errors: result.errors });

	const token =
		typeof body['cf-turnstile-response'] === 'string' ? body['cf-turnstile-response'] : '';
	const human = await verifyTurnstile(
		token,
		env.TURNSTILE_SECRET,
		request.headers.get('CF-Connecting-IP')
	);
	if (!human) {
		return respond(request, 400, {
			ok: false,
			errors: { form: 'We could not confirm you are not a robot. Please try again.' }
		});
	}

	const { data } = result;
	const email = createEmailProvider(env);
	const submissionId = crypto.randomUUID();
	const notification = enquiryNotification(data, cleanTracking(body), new Date());

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
		return respond(request, 502, {
			ok: false,
			errors: { form: 'We could not send your enquiry. Please email us instead.' }
		});
	}

	// The lead is already safe; a failed acknowledgement must not fail the submission
	try {
		await email.send({
			from: env.ENQUIRY_FROM,
			to: [data.email],
			...enquiryAcknowledgement(data),
			idempotencyKey: `ack-${submissionId}`
		});
	} catch (error) {
		console.error('Enquiry acknowledgement failed', error);
	}

	return respond(request, 200, { ok: true });
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
		return new Response('Not found', { status: 404 });
	}
};
