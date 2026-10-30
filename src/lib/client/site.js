// Progressive enhancement for the static pages: closing the mobile menu when a link in it is
// followed, and a placeholder for images that fail to load. Everything else (the menu, FAQ,
// audience cards) is native HTML, so the pages work in full without it.
// Every function is named, so stack traces and the minified output stay readable.

function onClick(event) {
	// Following a link in the mobile menu closes it
	const menu = event.target.closest('[popover]');
	if (menu && event.target.closest('a')) menu.hidePopover();
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
// `error` does not bubble, so listen in the capture phase. Images that failed before this
// script ran are caught by the sweep below.
document.addEventListener('error', onError, true);
for (const img of document.querySelectorAll('img.image')) {
	if (img.complete && img.naturalWidth === 0) markFailed(img);
}
