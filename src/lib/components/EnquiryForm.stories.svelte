<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { validateEnquiry } from '../enquiry/schema';
	import EnquiryForm from './EnquiryForm.svelte';

	const { Story } = defineMeta({
		title: 'Sections/EnquiryForm',
		component: EnquiryForm,
		tags: ['autodocs'],
		parameters: {
			tone: 'dark',
			docs: {
				description: {
					component:
						'The enquiry form, as it renders without JavaScript: it posts to `/api/enquiry` and the Worker validates it with `src/lib/enquiry/schema.ts`. `enquiry.js` (not loaded in Storybook) adds Turnstile, fetch, the error summary and the success panel. The error story reproduces what `enquiry.js` does with the real messages from `validateEnquiry`.'
				}
			}
		}
	});

	/** What enquiry.js does with a failed validation: summary, inline errors, aria-invalid */
	function showErrors(canvas: HTMLElement) {
		const result = validateEnquiry({});
		if (result.ok) return;
		const form = canvas.querySelector('form')!;
		const summary = form.querySelector<HTMLElement>('.enquiry__summary')!;
		const items = Object.entries(result.errors).map(([field, message]) => {
			const input = form.elements.namedItem(field) as HTMLElement | null;
			const error = form.querySelector<HTMLElement>(`[data-error="${field}"]`);
			if (error) {
				error.textContent = message ?? '';
				error.hidden = false;
			}
			input?.setAttribute('aria-invalid', 'true');
			const item = document.createElement('li');
			const link = document.createElement('a');
			link.href = `#${input?.id}`;
			link.textContent = message ?? '';
			item.append(link);
			return item;
		});
		summary.querySelector('h3')!.textContent = 'Please fix the following';
		summary.querySelector('ul')!.replaceChildren(...items);
		summary.hidden = false;
	}
</script>

<Story name="Default" />

<!-- autoplay: the docs page only runs play functions for stories that ask -->
<Story
	name="With errors"
	parameters={{ docs: { story: { autoplay: true } } }}
	play={({ canvasElement }) => showErrors(canvasElement)}
/>
