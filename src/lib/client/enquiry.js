// Enhances the enquiry form: posts it with fetch, shows the Worker's validation errors in an
// accessible summary, and loads Cloudflare Turnstile on first use. The Worker validates
// (worker/index.ts); nothing is duplicated here. Without JavaScript the form still posts, and the
// Worker checks the signed timestamp in the form (`ft`) instead of Turnstile.
// Every function is named, so stack traces and the minified output stay readable.

const form = document.querySelector('form.enquiry__form');
const summary = form?.querySelector('.enquiry__summary');
const submit = form?.querySelector('button[type="submit"]');
const success = document.querySelector('.enquiry__success');
const turnstileEl = form?.querySelector('[data-turnstile]');
const params = new URLSearchParams(location.search);

let token = '';
let widgetId;
let sending = false;
let turnstileRequested = false;

function hasValue(select, value) {
	for (const option of select.options) {
		if (option.value === value) return true;
	}
	return false;
}

// Pre-select the site type from ?type=, ignoring unknown values
function preselectSiteType() {
	const type = params.get('type');
	if (type && hasValue(form.elements.siteType, type)) form.elements.siteType.value = type;
}

// Lead tracking: referrer plus any utm_* values
function trackLead() {
	form.elements.referrer.value = document.referrer;
	for (const [key, value] of params) {
		if (!/^utm_(source|medium|campaign|term|content)$/.test(key)) continue;
		const input = document.createElement('input');
		input.type = 'hidden';
		input.name = key;
		input.value = value;
		form.append(input);
	}
}

function setToken(value) {
	token = value;
}

function clearToken() {
	token = '';
}

function renderTurnstile() {
	widgetId = window.turnstile.render(turnstileEl, {
		sitekey: form.dataset.turnstileSitekey,
		appearance: 'interaction-only',
		callback: setToken,
		'expired-callback': clearToken,
		'refresh-expired': 'auto'
	});
}

// Loaded on first use, not on every page view: keeps the page free of third-party
// requests (and Turnstile's checks) for visitors who never touch the form
function loadTurnstile() {
	if (turnstileRequested) return;
	turnstileRequested = true;
	// Managed mode: the widget stays invisible unless Cloudflare needs more proof, and
	// refreshes its own token when it expires (WCAG 2.2.3), so the person never starts again
	const script = document.createElement('script');
	script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
	script.async = true;
	script.onload = renderTurnstile;
	document.head.append(script);
}

function clearErrors() {
	summary.hidden = true;
	for (const element of form.querySelectorAll('[data-error]')) {
		element.hidden = true;
		element.textContent = '';
		form.elements[element.dataset.error]?.removeAttribute('aria-invalid');
	}
}

function createLink(href, text) {
	const link = document.createElement('a');
	link.href = href;
	link.textContent = text;
	return link;
}

function createErrorItem(field, message) {
	const item = document.createElement('li');
	if (field === 'form') {
		item.append(message);
		return item;
	}
	const input = form.elements[field];
	const error = form.querySelector('[data-error="' + field + '"]');
	if (error) {
		error.textContent = message;
		error.hidden = false;
	}
	input?.setAttribute('aria-invalid', 'true');
	item.append(createLink('#' + input?.id, message));
	return item;
}

function showErrors(errors) {
	clearErrors();
	const items = [];
	for (const [field, message] of Object.entries(errors)) {
		if (message) items.push(createErrorItem(field, message));
	}
	summary.querySelector('h3').textContent = errors.form
		? 'Your enquiry was not sent'
		: 'Please fix the following';
	summary.querySelector('ul').replaceChildren(...items);
	summary.hidden = false;
	summary.focus();
}

function showSuccess(confirmed) {
	// Enquiries sent without Turnstile do not get a confirmation email
	success.querySelector('[data-confirmation]').hidden = !confirmed;
	for (const element of success.querySelectorAll('[data-sent]')) {
		const control = form.elements[element.dataset.sent];
		element.textContent =
			control instanceof HTMLSelectElement
				? control.selectedOptions[0].textContent
				: control.value.trim();
	}
	form.hidden = true;
	success.hidden = false;
	success.focus();
}

function setSending(value) {
	sending = value;
	submit.disabled = value;
	submit.textContent = value ? 'Sending…' : 'Send enquiry';
}

async function onSubmit(event) {
	event.preventDefault();
	if (sending) return;
	setSending(true);

	const body = new URLSearchParams(new FormData(form));
	body.set('cf-turnstile-response', token);
	let errors;
	try {
		const response = await fetch(form.action, {
			method: 'POST',
			headers: { Accept: 'application/json' },
			body
		});
		const payload = await response.json().catch(returnEmpty);
		if (response.ok && payload.ok) {
			showSuccess(payload.confirmation !== false);
			return;
		}
		errors = payload.errors ?? { form: 'Something went wrong. Please try again.' };
	} catch {
		errors = { form: 'We could not reach the server. Please try again.' };
	} finally {
		setSending(false);
	}

	// A Turnstile token is single use
	window.turnstile?.reset(widgetId);
	clearToken();
	showErrors(errors);
}

// Stands in for a response body that is not JSON
function returnEmpty() {
	return {};
}

if (form) {
	// Not in the markup, so that without JavaScript the browser checks required fields itself
	form.noValidate = true;
	preselectSiteType();
	trackLead();
	form.addEventListener('focusin', loadTurnstile);
	form.addEventListener('submit', onSubmit);
}
