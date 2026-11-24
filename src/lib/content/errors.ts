/** Copy for the error pages (src/routes/404/ and src/routes/+error.svelte) */
export const notFound = {
	status: 404,
	heading: 'Page not found',
	message: "The page you're looking for doesn't exist or has moved."
};

export const serverError = {
	heading: 'Something went wrong',
	message: 'An unexpected error occurred. Please try again in a moment.'
};
