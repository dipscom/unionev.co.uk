/**
 * A daily cap on enquiries sent without Turnstile: a circuit breaker for a slow, spread-out flood
 * that the per-IP rate limits can't see. Once the day's limit is reached, that path pauses until
 * midnight UTC; enquiries that passed Turnstile are never counted or capped.
 *
 * The count lives in Workers KV. KV is eventually consistent (another location can read a count
 * up to about a minute old) and has no atomic increment, so a burst can overshoot the limit
 * somewhat. That is fine for a circuit breaker; a Durable Object would be exact if it ever matters.
 */

/** The part of a KV namespace the cap uses */
export interface CounterStore {
	get(key: string): Promise<string | null>;
	put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

/** Counts outlive their day a little, then KV deletes them */
const TWO_DAYS = 2 * 24 * 60 * 60;

/** Used when PLAIN_DAILY_LIMIT is missing or not a number, so the cap can't silently turn off */
export const DEFAULT_DAILY_LIMIT = 20;

export function parseLimit(value: string | undefined): number {
	const limit = Number(value);
	return value !== undefined && value.trim() !== '' && Number.isInteger(limit) && limit >= 0
		? limit
		: DEFAULT_DAILY_LIMIT;
}

export const capKey = (now: Date) => `plain-enquiries:${now.toISOString().slice(0, 10)}`;

/**
 * Takes one of today's slots. Returns false when the day is full, or when the store fails: during
 * a flood, pausing the path is safer than sending everything.
 */
export async function takeDailySlot(
	store: CounterStore,
	limit: number,
	now = new Date()
): Promise<boolean> {
	const key = capKey(now);
	try {
		const count = Number(await store.get(key)) || 0;
		if (count >= limit) {
			// Logged on every refusal, so `wrangler tail` or Workers Logs shows when the cap is hit
			console.warn(`Daily cap reached for enquiries without Turnstile (${count}/${limit})`);
			return false;
		}
		await store.put(key, String(count + 1), { expirationTtl: TWO_DAYS });
		return true;
	} catch (error) {
		console.error('Daily cap store failed; refusing the enquiry', error);
		return false;
	}
}
