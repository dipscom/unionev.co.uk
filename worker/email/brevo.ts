import { EmailError, type EmailProvider } from './types';

/** "Name <a@b.co>" or "a@b.co" -> Brevo's { name, email } */
function parseAddress(value: string): { name?: string; email: string } {
	const match = value.match(/^\s*(?:"?([^"<]*?)"?\s*)?<([^>]+)>\s*$/);
	return match ? { ...(match[1] && { name: match[1] }), email: match[2] } : { email: value.trim() };
}

export function createBrevoProvider(apiKey: string): EmailProvider {
	return {
		name: 'brevo',
		// Brevo has no idempotency header, so message.idempotencyKey is not used
		async send(message) {
			const response = await fetch('https://api.brevo.com/v3/smtp/email', {
				method: 'POST',
				headers: {
					'api-key': apiKey,
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					sender: parseAddress(message.from),
					to: message.to.map(parseAddress),
					replyTo: message.replyTo ? parseAddress(message.replyTo) : undefined,
					subject: message.subject,
					textContent: message.text,
					htmlContent: message.html
				})
			});
			if (!response.ok) {
				const body = (await response.json().catch(() => null)) as { message?: string } | null;
				throw new EmailError('brevo', response.status, body?.message ?? response.statusText);
			}
		}
	};
}
