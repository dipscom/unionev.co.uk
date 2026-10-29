import type { Enquiry, Field } from '../src/lib/enquiry/schema';

const link = /https?:\/\/|www\.|\[url|<a\s/i;

/**
 * Extra checks for enquiries that did not pass Turnstile. Spam is mostly links, and a real
 * enquiry does not need one: we ask for the details when we reply.
 */
export function screenPlainEnquiry(data: Enquiry): Partial<Record<Field, string>> {
	const errors: Partial<Record<Field, string>> = {};
	for (const field of ['name', 'organisation', 'details'] as const) {
		if (link.test(data[field])) {
			errors[field] = 'Leave out web links. We will ask for any details we need when we reply.';
		}
	}
	return errors;
}
