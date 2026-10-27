import type { Env } from '../env';
import { createBrevoProvider } from './brevo';
import type { EmailProvider } from './types';

/**
 * The only place that knows which providers exist. To switch provider:
 *   1. add worker/email/<name>.ts that returns an EmailProvider (see brevo.ts),
 *   2. add a case below,
 *   3. set EMAIL_PROVIDER and the provider's secret.
 * Alternative from docs/feedback-plan.md: Lettermint (POST /v1/send, `x-lettermint-token` header).
 */
export function createEmailProvider(env: Env): EmailProvider {
	switch (env.EMAIL_PROVIDER ?? 'brevo') {
		case 'brevo':
			return createBrevoProvider(env.BREVO_API_KEY);
		default:
			throw new Error(`Unknown EMAIL_PROVIDER "${env.EMAIL_PROVIDER}"`);
	}
}
