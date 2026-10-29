import { site } from '../src/lib/content/site';
import { fieldLabels, limits, siteTypes, type Field } from '../src/lib/enquiry/schema';

export type FormValues = Partial<Record<Field, string>>;
export type FormErrors = Partial<Record<Field | 'form', string>>;

const escape = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

// Colours and sizes mirror src/styles/tokens.css; this page has no access to the site's CSS
const styles = `
body{margin:0;background:#f9fafb;color:#111827;font:16px/1.5 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
main{max-width:36rem;margin:0 auto;padding:2rem 1.5rem 4rem}
a{color:#023a31;font-weight:600}
h1{margin:1.5rem 0 .5rem;font-size:1.875rem;line-height:1.25}
form{display:grid;gap:1.25rem;margin-top:1.5rem;padding:2rem;background:#fff;border:1px solid #f3f4f6;border-radius:1rem}
label{display:block;margin-bottom:.375rem;font-weight:600}
.hint{margin:0 0 .375rem;color:#4b5563;font-size:.875rem}
input,select,textarea{display:block;width:100%;min-height:2.75rem;box-sizing:border-box;padding:.625rem .75rem;border:1px solid #6b7280;border-radius:.5rem;background:#fff;color:inherit;font:inherit}
input[aria-invalid],select[aria-invalid],textarea[aria-invalid]{border:2px solid #991b1b}
.error{margin:.375rem 0 0;color:#991b1b;font-size:.875rem;font-weight:600}
.summary{padding:1rem 1.25rem;border:2px solid #991b1b;border-radius:.5rem;color:#991b1b}
.summary h2{margin:0;font-size:1rem}
.summary ul{margin:.5rem 0 0;padding-left:1.25rem}
.summary a{color:inherit;font-weight:700}
button{min-height:2.75rem;padding:1rem 2rem;border:2px solid #ed4f22;border-radius:.75rem;background:#8f2f0d;color:#fff;font:inherit;font-weight:700;cursor:pointer}
button:hover{background:#6f240a}
:focus-visible{outline:2px solid #8f2f0d;outline-offset:2px}
.trap{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
`;

function page(title: string, body: string): string {
	return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${escape(title)} | ${site.name}</title><style>${styles}</style></head><body><main>${body}</main></body></html>`;
}

const backLink = `<a href="/">Back to ${site.name}</a>`;

export function renderPlainMessage(title: string, message: string): string {
	return page(
		title,
		`${backLink}<h1>${escape(title)}</h1><p>${escape(message)}</p><p><a href="/#contact">Back to the form</a></p>`
	);
}

type Control = {
	name: Field;
	required?: boolean;
	hint?: string;
	autocomplete?: string;
	type?: string;
};

const controls: Control[] = [
	{ name: 'name', required: true, autocomplete: 'name' },
	{ name: 'email', required: true, autocomplete: 'email', type: 'email' },
	{ name: 'organisation', required: true, autocomplete: 'organization' },
	{
		name: 'postcode',
		required: true,
		autocomplete: 'postal-code',
		hint: 'We use it to check grid and funding options for the site.'
	},
	{
		name: 'siteType',
		required: true,
		hint: 'Pick the closest match; "Something else" is fine.'
	},
	{ name: 'details', hint: 'For example the number of parking spaces, or your timescale.' }
];

function renderControl(control: Control, values: FormValues, errors: FormErrors): string {
	const { name } = control;
	const id = `f-${name}`;
	const value = values[name] ?? '';
	const error = errors[name];
	const describedBy = [control.hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
	const common = `id="${id}" name="${name}"${control.required ? ' required' : ''}${
		describedBy.length ? ` aria-describedby="${describedBy.join(' ')}"` : ''
	}${error ? ' aria-invalid="true"' : ''}`;

	let input: string;
	if (name === 'siteType') {
		input = `<select ${common}><option value="">Choose one</option>${siteTypes
			.map(
				(type) =>
					`<option value="${escape(type.slug)}"${type.slug === value ? ' selected' : ''}>${escape(type.label)}</option>`
			)
			.join('')}</select>`;
	} else if (name === 'details') {
		input = `<textarea ${common} rows="4" maxlength="${limits.details}">${escape(value)}</textarea>`;
	} else {
		input = `<input ${common} type="${control.type ?? 'text'}"${
			control.autocomplete ? ` autocomplete="${control.autocomplete}"` : ''
		} maxlength="${limits[name as keyof typeof limits]}" value="${escape(value)}">`;
	}

	return `<div><label for="${id}">${escape(fieldLabels[name])} (${control.required ? 'required' : 'optional'})</label>${
		control.hint ? `<p class="hint" id="${id}-hint">${escape(control.hint)}</p>` : ''
	}${input}${error ? `<p class="error" id="${id}-error">${escape(error)}</p>` : ''}</div>`;
}

function renderSummary(errors: FormErrors): string {
	const items = Object.entries(errors)
		.filter(([, message]) => message)
		.map(([field, message]) =>
			field === 'form'
				? `<li>${escape(message!)}</li>`
				: `<li><a href="#f-${field}">${escape(message!)}</a></li>`
		);
	if (!items.length) return '';
	const heading = errors.form ? 'Your enquiry was not sent' : 'Please fix the following';
	return `<div class="summary" role="alert" tabindex="-1" autofocus><h2>${heading}</h2><ul>${items.join('')}</ul></div>`;
}

/**
 * The enquiry form again, after a post without JavaScript that needs another go: the static page
 * cannot show errors. `token` is a signed timestamp (formToken.ts).
 */
export function renderPlainForm(
	token: string,
	values: FormValues = {},
	errors: FormErrors = {}
): string {
	return page(
		site.primaryCta,
		`${backLink}<h1>${escape(site.primaryCta)}</h1><p>Tell us about your site and we will come back with a clear picture of what is possible. ${escape(site.responseCommitment)}</p>` +
			`<form method="post" action="/api/enquiry" novalidate>${renderSummary(errors)}<p>Fields marked "(required)" must be filled in.</p>${controls
				.map((control) => renderControl(control, values, errors))
				.join('')}` +
			`<input type="hidden" name="ft" value="${escape(token)}">` +
			// Honeypot: people never see or reach it; bots fill it in
			`<div class="trap" aria-hidden="true"><label for="f-website">Leave this field empty</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>` +
			`<button type="submit">Send enquiry</button></form>`
	);
}
