export interface Env {
	/** Which email provider to use; see worker/email/index.ts. Defaults to "brevo" */
	EMAIL_PROVIDER?: string;
	/** Where enquiries are sent (the hello@ mailbox) */
	ENQUIRY_TO: string;
	/** Sender verified with the provider, e.g. "Union EV <hello@unionev.co.uk>" */
	ENQUIRY_FROM: string;
	/** Secrets: `wrangler secret put <NAME>`, or .dev.vars locally */
	BREVO_API_KEY: string;
	TURNSTILE_SECRET: string;
}
