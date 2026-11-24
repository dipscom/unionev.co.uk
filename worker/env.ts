/** Cloudflare's Rate Limiting binding; the window is 10 or 60 seconds, counted per key and per location */
export interface RateLimiter {
	limit(options: { key: string }): Promise<{ success: boolean }>;
}

/** The built site (wrangler.jsonc `assets`) */
export interface Assets {
	fetch(request: Request): Promise<Response>;
}

export interface Env {
	ASSETS: Assets;
	/** Which email provider to use; see worker/email/index.ts. Defaults to "lettermint" */
	EMAIL_PROVIDER?: string;
	/** Where enquiries are sent (the hello@ mailbox) */
	ENQUIRY_TO: string;
	/** Sender verified with the provider, e.g. "Union EV <hello@unionev.co.uk>" */
	ENQUIRY_FROM: string;
	/** Where replies to the visitor's confirmation go; the sending address has no mailbox */
	ENQUIRY_REPLY_TO: string;
	/** Secrets: `wrangler secret put <NAME>`, or .dev.vars locally */
	/** Lettermint project API token (lm_...) */
	LETTERMINT_API_TOKEN: string;
	TURNSTILE_SECRET: string;
	/** Signs the form's timestamp (worker/formToken.ts); any long random string */
	FORM_SECRET: string;
	/** Rate limits, per client IP unless noted; the numbers live in wrangler.jsonc */
	/** Enquiries that passed Turnstile */
	ENQUIRY_LIMITER: RateLimiter;
	/** Enquiries without Turnstile (no JavaScript, or Turnstile blocked) */
	PLAIN_LIMITER: RateLimiter;
	/** Per recipient address, for the confirmation email */
	RECIPIENT_LIMITER: RateLimiter;
}
