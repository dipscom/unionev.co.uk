import { audiences } from '../content/audiences';

/** Shared by the form (instant feedback) and the Worker (the authority). No dependencies, so both can bundle it. */

export const siteTypes = [
	...audiences.map(({ slug, label }) => ({ slug: slug as string, label: label as string })),
	{ slug: 'other', label: 'Something else' }
];

export const fields = ['name', 'email', 'organisation', 'postcode', 'siteType', 'details'] as const;
export type Field = (typeof fields)[number];

export const utmKeys = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_term',
	'utm_content'
] as const;

export type Enquiry = {
	name: string;
	email: string;
	organisation: string;
	postcode: string;
	siteType: string;
	details: string;
};

/** Lead-tracking values captured by the form; optional and never validated as errors */
export type Tracking = { referrer: string } & Partial<Record<(typeof utmKeys)[number], string>>;

export const limits = { name: 100, email: 254, organisation: 150, postcode: 10, details: 2000 };

export const fieldLabels: Record<Field, string> = {
	name: 'Your name',
	email: 'Email address',
	organisation: 'Organisation',
	postcode: 'Site postcode',
	siteType: 'Type of site',
	details: 'Project details'
};

// UK postcode: outward + inward code, space optional
const postcodePattern = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ValidationResult =
	{ ok: true; data: Enquiry } | { ok: false; errors: Partial<Record<Field, string>> };

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export function validateEnquiry(input: Record<string, unknown>): ValidationResult {
	const data: Enquiry = {
		name: text(input.name),
		email: text(input.email),
		organisation: text(input.organisation),
		postcode: text(input.postcode).toUpperCase(),
		siteType: text(input.siteType),
		details: text(input.details)
	};
	const errors: Partial<Record<Field, string>> = {};

	if (!data.name) errors.name = 'Enter your name.';
	else if (data.name.length > limits.name) errors.name = `Use ${limits.name} characters or fewer.`;

	if (!data.email) errors.email = 'Enter your email address.';
	else if (!emailPattern.test(data.email) || data.email.length > limits.email)
		errors.email = 'Enter a valid email address, like name@example.com.';

	if (!data.organisation) errors.organisation = 'Enter your organisation.';
	else if (data.organisation.length > limits.organisation)
		errors.organisation = `Use ${limits.organisation} characters or fewer.`;

	if (!data.postcode) errors.postcode = 'Enter the postcode of the site.';
	else if (!postcodePattern.test(data.postcode))
		errors.postcode = 'Enter a UK postcode, like SW1A 1AA.';

	if (!siteTypes.some((type) => type.slug === data.siteType))
		errors.siteType = 'Choose the type of site.';

	if (data.details.length > limits.details)
		errors.details = `Use ${limits.details} characters or fewer.`;

	return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

/** Keep tracking values short and single-line; they end up in an email */
export function cleanTracking(input: Record<string, unknown>): Tracking {
	const clean = (value: unknown) =>
		text(value)
			.replace(/[\r\n]+/g, ' ')
			.slice(0, 300);
	const tracking: Tracking = { referrer: clean(input.referrer) };
	for (const key of utmKeys) {
		const value = clean(input[key]);
		if (value) tracking[key] = value;
	}
	return tracking;
}
