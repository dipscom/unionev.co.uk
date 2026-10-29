// Progressive enhancement for the static pages: disclosures (mobile menu, FAQ, audience
// panels) and a placeholder for images that fail to load. Without it the pages still read
// in full; see the <noscript> styles in app.html.
// Every function is named, so stack traces and the minified output stay readable.

function panelFor(button) {
	return document.getElementById(button.getAttribute('aria-controls'));
}

function setExpanded(button, expanded) {
	button.setAttribute('aria-expanded', String(expanded));
	const panel = panelFor(button);
	if (panel) panel.hidden = !expanded;
}

function onClick(event) {
	const button = event.target.closest('[data-disclosure]');
	if (button) {
		const expanded = button.getAttribute('aria-expanded') !== 'true';
		const group = button.dataset.disclosureGroup;
		if (group && expanded) {
			// Only one panel in a group is open at a time
			for (const other of document.querySelectorAll('[data-disclosure-group="' + group + '"]')) {
				if (other !== button) setExpanded(other, false);
			}
		}
		setExpanded(button, expanded);
		return;
	}

	// Following a link in the mobile menu closes it
	if (event.target.closest('[data-menu] a')) {
		const toggle = document.querySelector('[data-menu-toggle]');
		if (toggle) setExpanded(toggle, false);
	}
}

function onKeydown(event) {
	if (event.key !== 'Escape') return;
	const toggle = document.querySelector('[data-menu-toggle]');
	if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
		setExpanded(toggle, false);
		toggle.focus();
	}
}

function markFailed(img) {
	img.dataset.state = 'failed';
}

function onError(event) {
	if (event.target instanceof HTMLImageElement && event.target.classList.contains('image')) {
		markFailed(event.target);
	}
}

document.addEventListener('click', onClick);
document.addEventListener('keydown', onKeydown);
// `error` does not bubble, so listen in the capture phase. Images that failed before this
// script ran are caught by the sweep below.
document.addEventListener('error', onError, true);
for (const img of document.querySelectorAll('img.image')) {
	if (img.complete && img.naturalWidth === 0) markFailed(img);
}
