<script lang="ts">
	import enquiryScript from '#lib/client/enquiry.js?inline-script';
	import { mailto, site } from '../content/site';
	import { fieldLabels, limits, siteTypes } from '../enquiry/schema';

	const uid = $props.id();
	const id = (name: string) => `${uid}-${name}`;
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="module">${enquiryScript}</` + `script>`}
</svelte:head>

<div aria-live="polite" class="enquiry">
	<!-- Filled in and revealed by enquiry.js once the enquiry is sent -->
	<div class="enquiry__success flow" tabindex="-1" hidden>
		<h3>Thank you, <span data-sent="name"></span>. We have your enquiry.</h3>
		<p>
			{site.responseCommitment} A confirmation is on its way to <span data-sent="email"></span>.
		</p>
		<dl>
			{#each ['organisation', 'postcode', 'siteType'] as const as field (field)}
				<dt>{fieldLabels[field]}</dt>
				<dd data-sent={field}></dd>
			{/each}
		</dl>
		<p>
			Something to correct? Reply to the confirmation email or write to
			<a href={mailto}>{site.email}</a>.
		</p>
	</div>
</div>

{#snippet error(field: string)}
	<p
		class="field__error text-sm weight-semibold"
		id={id(`${field}-error`)}
		data-error={field}
		hidden
	></p>
{/snippet}

<form
	class="enquiry__form flow"
	method="post"
	action="/api/enquiry"
	novalidate
	data-turnstile-sitekey={site.turnstileSiteKey}
	data-mailto={mailto}
	data-email={site.email}
>
	<div class="enquiry__summary" role="alert" tabindex="-1" hidden>
		<!-- svelte-ignore a11y_missing_content -->
		<h3></h3>
		<ul></ul>
	</div>

	<p class="enquiry__required text-sm color-muted">Fields marked "(required)" must be filled in.</p>

	<div class="field">
		<label for={id('name')}>Your name (required)</label>
		<input
			id={id('name')}
			name="name"
			autocomplete="name"
			required
			maxlength={limits.name}
			aria-describedby={id('name-error')}
		/>
		{@render error('name')}
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
			aria-describedby={id('email-error')}
		/>
		{@render error('email')}
	</div>

	<div class="field">
		<label for={id('organisation')}>Organisation (required)</label>
		<input
			id={id('organisation')}
			name="organisation"
			autocomplete="organization"
			required
			maxlength={limits.organisation}
			aria-describedby={id('organisation-error')}
		/>
		{@render error('organisation')}
	</div>

	<div class="field">
		<label for={id('postcode')}>Site postcode (required)</label>
		<p class="field__hint text-sm color-muted" id={id('postcode-hint')}>
			We use it to check grid and funding options for the site.
		</p>
		<input
			id={id('postcode')}
			name="postcode"
			autocomplete="postal-code"
			required
			maxlength={limits.postcode}
			aria-describedby="{id('postcode-hint')} {id('postcode-error')}"
		/>
		{@render error('postcode')}
	</div>

	<div class="field">
		<label for={id('siteType')}>Type of site (required)</label>
		<p class="field__hint text-sm color-muted" id={id('siteType-hint')}>
			Pick the closest match; "Something else" is fine.
		</p>
		<select
			id={id('siteType')}
			name="siteType"
			required
			aria-describedby="{id('siteType-hint')} {id('siteType-error')}"
		>
			<option value="">Choose one</option>
			{#each siteTypes as type (type.slug)}
				<option value={type.slug}>{type.label}</option>
			{/each}
		</select>
		{@render error('siteType')}
	</div>

	<div class="field">
		<label for={id('details')}>Project details (optional)</label>
		<p class="field__hint text-sm color-muted" id={id('details-hint')}>
			For example the number of parking spaces, or your timescale.
		</p>
		<textarea
			id={id('details')}
			name="details"
			rows="4"
			maxlength={limits.details}
			aria-describedby="{id('details-hint')} {id('details-error')}"></textarea>
		{@render error('details')}
	</div>

	<!-- Lead tracking (feedback §16): enquiry.js fills the referrer and adds any utm_* values -->
	<input type="hidden" name="referrer" value="" />

	<!-- Honeypot: people never see or reach it; bots fill it in -->
	<div class="enquiry__trap" aria-hidden="true">
		<label for={id('website')}>Leave this field empty</label>
		<input id={id('website')} name="website" tabindex="-1" autocomplete="off" />
	</div>

	<div data-turnstile></div>

	<button class="btn enquiry__submit" data-variant="primary" type="submit">Send enquiry</button>

	<noscript>
		<p class="field__error text-sm weight-semibold">
			This form needs JavaScript to check that you are not a robot. Please
			<a href={mailto}>email {site.email}</a> instead.
		</p>
	</noscript>
</form>

<style>
	/* Empty until the enquiry is sent; its parent's flow must not add a gap before the form */
	.enquiry {
		margin-top: 0;
	}
	.enquiry__form,
	.enquiry__success {
		margin-top: var(--space-8);
		border-radius: var(--radius-2xl);
		padding: var(--space-8);
		background: var(--color-surface);
		color: var(--color-text);
		text-align: left;
		--color-focus: var(--color-action);
	}
	.enquiry__form:global([hidden]),
	.enquiry__success[hidden] {
		display: none;
	}
	.enquiry__form {
		--flow-space: var(--space-5);
	}
	.field label {
		display: block;
		margin-bottom: var(--space-1-5);
		font-weight: 600;
	}
	.field__hint {
		margin-bottom: var(--space-1-5);
	}
	.field__error {
		margin-top: var(--space-1-5);
		color: var(--color-danger);
	}
	.enquiry__summary[hidden] {
		display: none;
	}
	.enquiry__summary {
		border: 2px solid var(--color-danger);
		border-radius: var(--radius-lg);
		padding: var(--space-4) var(--space-5);
		color: var(--color-danger);
	}
	.enquiry__summary h3 {
		color: inherit;
		font-size: var(--text-base);
		line-height: var(--leading-snug);
	}
	.enquiry__summary ul {
		margin-top: var(--space-2);
		padding-left: var(--space-5);
		list-style: disc;
	}
	.enquiry__summary :global(a),
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
	.enquiry__success {
		--flow-space: var(--space-4);
	}
	.enquiry__success h3 {
		font-size: var(--text-xl);
		line-height: var(--leading-snug);
		color: var(--color-brand);
	}
	.enquiry__success dt {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.enquiry__success dd {
		margin-bottom: var(--space-2);
		font-weight: 600;
	}
</style>
