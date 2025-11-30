import { TMDB_AUTH_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    const { query } = params;

    const API = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TMDB_AUTH_KEY}`,
            "accept": "application/json"
        }
    }
    )
    if (!API.ok) {
        error(API.status, "Error");
    }
    const movies = await API.json();

    return { movies, query }
}