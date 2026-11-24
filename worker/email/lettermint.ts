import { EmailError, type EmailProvider } from './types';

/** Lettermint (lettermint.co): POST /v1/send with a project API token */
export function createLettermintProvider(apiToken: string): EmailProvider {
	return {
		name: 'lettermint',
		async send(message) {
			const response = await fetch('https://api.lettermint.co/v1/send', {
				method: 'POST',
				headers: {
					'x-lettermint-token': apiToken,
					'Content-Type': 'application/json',
					Accept: 'application/json',
					// Same key and body within 24 hours returns the original response instead of resending
					...(message.idempotencyKey && { 'Idempotency-Key': message.idempotencyKey })
				},
				body: JSON.stringify({
					from: message.from,
					to: message.to,
					reply_to: message.replyTo ? [message.replyTo] : undefined,
					subject: message.subject,
					text: message.text,
					html: message.html
				})
			});
			if (!response.ok) {
				// Errors come as { message } or { error: { message } }
				const body = (await response.json().catch(() => null)) as {
					message?: string;
					error?: { message?: string };
				} | null;
				throw new EmailError(
					'lettermint',
					response.status,
					body?.message ?? body?.error?.message ?? response.statusText
				);
			}
		}
	};
}
