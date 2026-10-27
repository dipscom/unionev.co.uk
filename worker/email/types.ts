export type EmailMessage = {
	/** "Name <address@domain>" or a bare address */
	from: string;
	to: string[];
	replyTo?: string;
	subject: string;
	text: string;
	html?: string;
	/** Same key = same email, so a retried submission isn't sent twice (only where the provider supports it; Brevo ignores it) */
	idempotencyKey?: string;
};

/** The only thing the rest of the Worker knows about email. Add a provider by implementing this. */
export interface EmailProvider {
	name: string;
	send(message: EmailMessage): Promise<void>;
}

export class EmailError extends Error {
	constructor(
		readonly provider: string,
		readonly status: number,
		message: string
	) {
		super(`${provider} (${status}): ${message}`);
	}
}
