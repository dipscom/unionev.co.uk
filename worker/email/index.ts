import type { Env } from '../env';
import { createLettermintProvider } from './lettermint';
import type { EmailProvider } from './types';

/**
 * The only place that knows which providers exist. To switch provider:
 *   1. add worker/email/<name>.ts that returns an EmailProvider (see lettermint.ts),
 *   2. add a case below,
 *   3. set EMAIL_PROVIDER and the provider's secret.
 */
export function createEmailProvider(env: Env): EmailProvider {
	switch (env.EMAIL_PROVIDER ?? 'lettermint') {
		case 'lettermint':
			return createLettermintProvider(env.LETTERMINT_API_TOKEN);
		default:
			throw new Error(`Unknown EMAIL_PROVIDER "${env.EMAIL_PROVIDER}"`);
	}
}
