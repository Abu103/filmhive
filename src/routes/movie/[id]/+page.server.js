import { TMDB_AUTH_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const { id } = params;

	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
		headers: {
			Authorization: `Bearer ${TMDB_AUTH_KEY}`,
			accept: 'application/json'
		}
	});

	const rec = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
		headers: {
			Authorization: `Bearer ${TMDB_AUTH_KEY}`,
			accept: 'application/json'
		}
	})

	if (!res.ok) {
		console.error(`TMDB API Error ${res.status}: ${res.statusText}`);
		throw error(res.status, 'Failed to fetch movie details');
	}

	const movie = await res.json();
	const recommendation = await rec.json();

	return { movie, recommendation };
}
