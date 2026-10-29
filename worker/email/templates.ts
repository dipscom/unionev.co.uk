import {
	siteTypes,
	fieldLabels,
	utmKeys,
	type Enquiry,
	type Tracking
} from '../../src/lib/enquiry/schema';
import { site } from '../../src/lib/content/site';

type Content = { subject: string; text: string; html: string };

const escapeHtml = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

/** Anything that ends up in a subject or header must be a single line */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

const siteTypeLabel = (slug: string) => siteTypes.find((type) => type.slug === slug)?.label ?? slug;

/** `botChecked` is false for the plain form, which has no Turnstile: read those with more care */
export function enquiryNotification(
	data: Enquiry,
	tracking: Tracking,
	receivedAt: Date,
	botChecked = true
): Content {
	const rows: [string, string][] = [
		[fieldLabels.name, data.name],
		[fieldLabels.email, data.email],
		[fieldLabels.organisation, data.organisation],
		[fieldLabels.postcode, data.postcode],
		[fieldLabels.siteType, siteTypeLabel(data.siteType)],
		[fieldLabels.details, data.details || '(none given)'],
		['Referrer', tracking.referrer || '(direct)'],
		...utmKeys.flatMap((key): [string, string][] => (tracking[key] ? [[key, tracking[key]]] : [])),
		['Received', receivedAt.toISOString()],
		...(botChecked ? [] : [['Bot check', 'Not run: sent with the plain form'] as [string, string]])
	];
	return {
		subject: oneLine(`${site.enquirySubject}: ${data.organisation} (${data.postcode})`),
		text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
		html: `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">${rows
			.map(
				([label, value]) =>
					`<tr><th align="left" valign="top">${escapeHtml(label)}</th><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
			)
			.join('')}</table>`
	};
}

export function enquiryAcknowledgement(data: Enquiry): Content {
	const text = [
		`Hello ${oneLine(data.name)},`,
		'',
		`Thanks for getting in touch with ${site.name}. We have your enquiry about ${data.organisation} (${data.postcode}).`,
		'',
		`${site.responseCommitment} If anything needs correcting, just reply to this email.`,
		'',
		`${site.name}`
	].join('\n');
	const html = text
		.split('\n\n')
		.map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll('\n', '<br>')}</p>`)
		.join('');
	return { subject: `We've received your enquiry | ${site.name}`, text, html };
}
