/** Checks a Turnstile token with Cloudflare. Fails closed. */
export async function verifyTurnstile(
	token: string,
	secret: string,
	ip: string | null
): Promise<boolean> {
	if (!token) return false;
	const body = new FormData();
	body.set('secret', secret);
	body.set('response', token);
	if (ip) body.set('remoteip', ip);
	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body
		});
		const result = (await response.json()) as { success?: boolean };
		return result.success === true;
	} catch {
		return false;
	}
}
