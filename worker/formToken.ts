/**
 * The Worker stamps every page that has the enquiry form with a signed timestamp as it sends
 * it. Without JavaScript there is no Turnstile, so this is the proof that the form came from
 * this Worker, and how long ago. A bot that posts without loading the page, or posts it back
 * at once, is turned away. Stateless, so a token can be replayed within its lifetime; the
 * rate limits bound that.
 */

/** Nobody fills in six fields in less time */
export const MIN_AGE_MS = 15_000;
/** A page can sit open in a tab for a day */
export const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type TokenCheck = 'valid' | 'invalid' | 'too-fast' | 'expired';

const encoder = new TextEncoder();

const importKey = (secret: string, usage: KeyUsage) =>
	crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
		usage
	]);

const toHex = (bytes: ArrayBuffer) =>
	[...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('');

const fromHex = (hex: string) =>
	Uint8Array.from(hex.match(/../g) ?? [], (pair) => Number.parseInt(pair, 16));

export async function issueFormToken(secret: string, now = Date.now()): Promise<string> {
	const issued = String(now);
	const signature = await crypto.subtle.sign(
		'HMAC',
		await importKey(secret, 'sign'),
		encoder.encode(issued)
	);
	return `${issued}.${toHex(signature)}`;
}

export async function checkFormToken(
	token: string,
	secret: string,
	now = Date.now()
): Promise<TokenCheck> {
	const [issued, signature, ...extra] = token.split('.');
	if (!issued || !signature || extra.length) return 'invalid';
	if (!/^\d{10,15}$/.test(issued) || !/^[0-9a-f]{64}$/.test(signature)) return 'invalid';

	// verify() compares in constant time
	const genuine = await crypto.subtle.verify(
		'HMAC',
		await importKey(secret, 'verify'),
		fromHex(signature),
		encoder.encode(issued)
	);
	if (!genuine) return 'invalid';

	const age = now - Number(issued);
	if (age < MIN_AGE_MS) return 'too-fast';
	if (age > MAX_AGE_MS) return 'expired';
	return 'valid';
}
