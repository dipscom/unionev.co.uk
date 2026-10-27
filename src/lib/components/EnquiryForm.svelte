<script lang="ts">
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';
	import { mailto, site } from '../content/site';
	import {
		fieldLabels,
		limits,
		siteTypes,
		utmKeys,
		validateEnquiry,
		type Enquiry,
		type Field
	} from '../enquiry/schema';

	type TurnstileApi = {
		render: (el: HTMLElement, options: Record<string, unknown>) => string;
		reset: (widgetId?: string) => void;
	};

	const uid = $props.id();
	const id = (name: string) => `${uid}-${name}`;

	let form: HTMLFormElement;
	let turnstileEl: HTMLDivElement;
	let summaryEl = $state<HTMLElement>();
	let successEl = $state<HTMLElement>();
	let widgetId: string | undefined;

	let siteType = $state('');
	let referrer = $state('');
	let utm = $state<Record<string, string>>({});
	let token = $state('');
	let errors = $state<Partial<Record<Field | 'form', string>>>({});
	let status = $state<'idle' | 'sending' | 'sent'>('idle');
	let sent = $state<Enquiry>();

	const errorList = $derived(
		Object.entries(errors).filter((entry): entry is [Field | 'form', string] => !!entry[1])
	);

	onMount(() => {
		const params = page.url.searchParams;
		const type = params.get('type');
		if (type && siteTypes.some((t) => t.slug === type)) siteType = type;
		referrer = document.referrer;
		utm = Object.fromEntries(
			utmKeys.flatMap((key) => (params.has(key) ? [[key, params.get(key)!]] : []))
		);
	});

	// Loaded on first use, not on every page view: keeps the page free of third-party
	// requests (and Turnstile's checks) for visitors who never touch the form
	let turnstileRequested = false;
	function loadTurnstile() {
		if (turnstileRequested) return;
		turnstileRequested = true;
		// Managed mode: the widget stays invisible unless Cloudflare needs more proof, and
		// refreshes its own token when it expires (WCAG 2.2.3), so the person never starts again
		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
		script.async = true;
		script.onload = () => {
			const turnstile = (window as unknown as { turnstile: TurnstileApi }).turnstile;
			widgetId = turnstile.render(turnstileEl, {
				sitekey: site.turnstileSiteKey,
				appearance: 'interaction-only',
				callback: (value: string) => (token = value),
				'expired-callback': () => (token = ''),
				'refresh-expired': 'auto'
			});
		};
		document.head.append(script);
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'sending') return;
		const body = new FormData(form);
		const result = validateEnquiry(Object.fromEntries(body));
		errors = result.ok ? {} : { ...result.errors };
		if (result.ok && !token) {
			errors = {
				form: "We're still checking that you're not a robot. Please try again in a moment."
			};
		}
		if (errorList.length) {
			await tick();
			summaryEl?.focus();
			return;
		}

		status = 'sending';
		body.set('cf-turnstile-response', token);
		try {
			const response = await fetch(form.action, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new URLSearchParams(body as unknown as Record<string, string>)
			});
			const payload = (await response.json().catch(() => ({}))) as {
				ok?: boolean;
				errors?: typeof errors;
			};
			if (response.ok && payload.ok) {
				sent = result.ok ? result.data : undefined;
				status = 'sent';
				await tick();
				successEl?.focus();
				return;
			}
			errors = payload.errors ?? { form: 'Something went wrong. Please email us instead.' };
		} catch {
			errors = { form: 'We could not reach the server. Please email us instead.' };
		}
		status = 'idle';
		(window as unknown as { turnstile?: TurnstileApi }).turnstile?.reset(widgetId);
		token = '';
		await tick();
		summaryEl?.focus();
	}

	const describedBy = (field: Field, hint?: boolean) =>
		[hint && id(`${field}-hint`), errors[field] && id(`${field}-error`)]
			.filter(Boolean)
			.join(' ') || undefined;
</script>

<div aria-live="polite" class="enquiry">
	{#if status === 'sent' && sent}
		<div class="enquiry__success" tabindex="-1" bind:this={successEl}>
			<h3>Thank you, {sent.name}. We have your enquiry.</h3>
			<p>{site.responseCommitment} A confirmation is on its way to {sent.email}.</p>
			<dl>
				{#each [['organisation', sent.organisation], ['postcode', sent.postcode], ['siteType', siteTypes.find((t) => t.slug === sent!.siteType)?.label]] as [field, value] (field)}
					<dt>{fieldLabels[field as Field]}</dt>
					<dd>{value}</dd>
				{/each}
			</dl>
			<p>
				Something to correct? Reply to the confirmation email or write to
				<a href={mailto}>{site.email}</a>.
			</p>
		</div>
	{/if}
</div>

<form
	bind:this={form}
	class="enquiry__form"
	method="post"
	action="/api/enquiry"
	novalidate
	hidden={status === 'sent'}
	onsubmit={submit}
	onfocusin={loadTurnstile}
>
	{#if errorList.length}
		<div class="enquiry__summary" role="alert" tabindex="-1" bind:this={summaryEl}>
			<h3>{errors.form ? 'Your enquiry was not sent' : 'Please fix the following'}</h3>
			<ul>
				{#each errorList as [field, message] (field)}
					<li>
						{#if field === 'form'}
							{message} <a href={mailto}>Email {site.email}</a>
						{:else}
							<a href="#{id(field)}">{message}</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<p class="enquiry__required">Fields marked "(required)" must be filled in.</p>

	<div class="field">
		<label for={id('name')}>Your name (required)</label>
		<input
			id={id('name')}
			name="name"
			autocomplete="name"
			required
			maxlength={limits.name}
			aria-invalid={errors.name ? 'true' : undefined}
			aria-describedby={describedBy('name')}
		/>
		{#if errors.name}<p class="field__error" id={id('name-error')}>{errors.name}</p>{/if}
	</div>

	<div class="field">
		<label for={id('email')}>Email address (required)</label>
		<input
			id={id('email')}
			name="email"
			type="email"
			autocomplete="email"
			required
			maxlength={limits.email}
			aria-invalid={errors.email ? 'true' : undefined}
			aria-describedby={describedBy('email')}
		/>
		{#if errors.email}<p class="field__error" id={id('email-error')}>{errors.email}</p>{/if}
	</div>

	<div class="field">
		<label for={id('organisation')}>Organisation (required)</label>
		<input
			id={id('organisation')}
			name="organisation"
			autocomplete="organization"
			required
			maxlength={limits.organisation}
			aria-invalid={errors.organisation ? 'true' : undefined}
			aria-describedby={describedBy('organisation')}
		/>
		{#if errors.organisation}<p class="field__error" id={id('organisation-error')}>
				{errors.organisation}
			</p>{/if}
	</div>

	<div class="field">
		<label for={id('postcode')}>Site postcode (required)</label>
		<p class="field__hint" id={id('postcode-hint')}>
			We use it to check grid and funding options for the site.
		</p>
		<input
			id={id('postcode')}
			name="postcode"
			autocomplete="postal-code"
			required
			maxlength={limits.postcode}
			aria-invalid={errors.postcode ? 'true' : undefined}
			aria-describedby={describedBy('postcode', true)}
		/>
		{#if errors.postcode}<p class="field__error" id={id('postcode-error')}>
				{errors.postcode}
			</p>{/if}
	</div>

	<div class="field">
		<label for={id('siteType')}>Type of site (required)</label>
		<p class="field__hint" id={id('siteType-hint')}>
			Pick the closest match; "Something else" is fine.
		</p>
		<select
			id={id('siteType')}
			name="siteType"
			required
			bind:value={siteType}
			aria-invalid={errors.siteType ? 'true' : undefined}
			aria-describedby={describedBy('siteType', true)}
		>
			<option value="">Choose one</option>
			{#each siteTypes as type (type.slug)}
				<option value={type.slug}>{type.label}</option>
			{/each}
		</select>
		{#if errors.siteType}<p class="field__error" id={id('siteType-error')}>
				{errors.siteType}
			</p>{/if}
	</div>

	<div class="field">
		<label for={id('details')}>Project details (optional)</label>
		<p class="field__hint" id={id('details-hint')}>
			For example the number of parking spaces, or your timescale.
		</p>
		<textarea
			id={id('details')}
			name="details"
			rows="4"
			maxlength={limits.details}
			aria-invalid={errors.details ? 'true' : undefined}
			aria-describedby={describedBy('details', true)}></textarea>
		{#if errors.details}<p class="field__error" id={id('details-error')}>{errors.details}</p>{/if}
	</div>

	<!-- Lead tracking (feedback §16) -->
	<input type="hidden" name="referrer" value={referrer} />
	{#each Object.entries(utm) as [key, value] (key)}
		<input type="hidden" name={key} {value} />
	{/each}

	<!-- Honeypot: people never see or reach it; bots fill it in -->
	<div class="enquiry__trap" aria-hidden="true">
		<label for={id('website')}>Leave this field empty</label>
		<input id={id('website')} name="website" tabindex="-1" autocomplete="off" />
	</div>

	<div bind:this={turnstileEl}></div>

	<button class="btn btn--primary enquiry__submit" type="submit" disabled={status === 'sending'}>
		{status === 'sending' ? 'Sending…' : 'Send enquiry'}
	</button>

	<noscript>
		<p class="field__error">
			This form needs JavaScript to check that you are not a robot. Please
			<a href={mailto}>email {site.email}</a> instead.
		</p>
	</noscript>
</form>

<style>
	.enquiry__form,
	.enquiry__success {
		margin-top: 2rem;
		border-radius: var(--radius-2xl);
		padding: 2rem;
		background: var(--white);
		color: var(--gray-900);
		text-align: left;
		--focus-ring: var(--orange);
	}
	.enquiry__form[hidden] {
		display: none;
	}
	.enquiry__form > * + * {
		margin-top: 1.25rem;
	}
	.enquiry__required {
		color: var(--gray-600);
		font-size: 0.875rem;
	}
	.field label {
		display: block;
		margin-bottom: 0.375rem;
		font-weight: 600;
	}
	.field__hint {
		margin-bottom: 0.375rem;
		color: var(--gray-600);
		font-size: 0.875rem;
	}
	input:not([type='hidden']),
	select,
	textarea {
		display: block;
		width: 100%;
		min-height: 2.75rem;
		border: 1px solid var(--gray-500);
		border-radius: var(--radius-lg);
		padding: 0.625rem 0.75rem;
		background: var(--white);
		color: var(--gray-900);
		font: inherit;
	}
	[aria-invalid='true'] {
		border: 2px solid var(--error);
	}
	.field__error {
		margin-top: 0.375rem;
		color: var(--error);
		font-size: 0.875rem;
		font-weight: 600;
	}
	.enquiry__summary {
		border: 2px solid var(--error);
		border-radius: var(--radius-lg);
		padding: 1rem 1.25rem;
		color: var(--error);
	}
	.enquiry__summary h3 {
		font-size: 1rem;
		font-weight: 700;
	}
	.enquiry__summary ul {
		margin-top: 0.5rem;
		padding-left: 1.25rem;
		list-style: disc;
	}
	.enquiry__summary a,
	.field__error a,
	.enquiry__success a {
		color: inherit;
		text-decoration: underline;
		font-weight: 700;
	}
	.enquiry__trap {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
	.enquiry__submit {
		cursor: pointer;
	}
	.enquiry__submit:disabled {
		cursor: progress;
		opacity: 0.8;
	}
	.enquiry__success h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--green-900);
	}
	.enquiry__success > * + * {
		margin-top: 1rem;
	}
	.enquiry__success dt {
		color: var(--gray-600);
		font-size: 0.875rem;
	}
	.enquiry__success dd {
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
</style>
