// Images are hotlinked from the original site's CDN for now (see docs/open-points.md).
// Set an entry to `null` to render the placeholder instead.
const cdn = (hash: string, key: string) =>
	`https://cdn.sintra.ai/img/${hash}/g:ce/rs:fill:0:0:0/${key}.jpg`;

export const images = {
	hero: cdn(
		'ASL2WbfoRws5AqajMHXXcygd5z8ZD2lNjyQ_fPuCQ3o',
		'czM6Ly9zaW50cmEtYnJhaW5haS1tZWRpYS9jZjk4MDNjMC02NTAwLTRmOWItOTZhNS0yNGQzYzZkOGI5MWQvMWFkMzE5M2UtNTMzNy00MWZlLThhYWMtNGU4NjU3NzQxN2E5LUNoYXJnaW5nX2NhYmxlX2RldGFpbA'
	),
	gallery1: cdn(
		'ApaISehdrRrZsxqfmsjOThhpLK7wjgf0hO4Iftk9tSE',
		'czM6Ly9zaW50cmEtYnJhaW5haS1tZWRpYS9rbm93bGVkZ2UtcHJvZmlsZXMvY2Y5ODAzYzAtNjUwMC00ZjliLTk2YTUtMjRkM2M2ZDhiOTFkL2Fzc2V0cy81ZWYzMjBlNy0zZDNmLTQ2MGEtYTk2Zi05NTNhNmI4OTE5NDQvRFNDMDAyODkuanBn'
	),
	gallery2: cdn(
		'Ux-vPbX6LZ5lqZ_UEjqF8j49cnn7i1PWlLHwpJzG20s',
		'czM6Ly9zaW50cmEtYnJhaW5haS1tZWRpYS9rbm93bGVkZ2UtcHJvZmlsZXMvY2Y5ODAzYzAtNjUwMC00ZjliLTk2YTUtMjRkM2M2ZDhiOTFkL2Fzc2V0cy9mNjljMjMyYy0wYTg5LTRkNjYtODNmYi1iOTMwYzMwYzgyOWEvRFNDMDAwMTMuanBn'
	),
	install: cdn(
		'3vN3PiiVEHBR1-fpaOgxtvrBO6wkE_x0mGrWc0J-DZo',
		'czM6Ly9zaW50cmEtYnJhaW5haS1tZWRpYS9jZjk4MDNjMC02NTAwLTRmOWItOTZhNS0yNGQzYzZkOGI5MWQvYWVjNWM0MjctNmM1Ny00ZTcyLWIwNzEtMWFiNzU3Zjk3YzFmLVVuaW9uX0VWX0FuZ2xlc2V5X1NpdGVfSW5zdGFsbF9QaG90bw'
	)
} satisfies Record<string, string | null>;
