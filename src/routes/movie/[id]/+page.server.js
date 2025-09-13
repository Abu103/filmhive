import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const { id } = params;

	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
		headers: {
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYyMjk3NTNkNTlkMWUzYTAzZWFlZmJlODk4ZGZkYiIsIm5iZiI6MTc1NTMyNTMwNy4wMTEwMDAyLCJzdWIiOiI2OGEwMjM3YjNjMzk3ZTFlNmJlZDExMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UIjbWBDFgklKnpNxAhny63YhJF2NKfRL1JAeTQr7KgU',
			accept: 'application/json'
		}
	});

	if (!res.ok) {
		console.error(`TMDB API Error ${res.status}: ${res.statusText}`);
		throw error(res.status, 'Failed to fetch movie details');
	}

	const movie = await res.json();

	return { movie };
}
