import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    const { query } = params;

    const API = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYyMjk3NTNkNTlkMWUzYTAzZWFlZmJlODk4ZGZkYiIsIm5iZiI6MTc1NTMyNTMwNy4wMTEwMDAyLCJzdWIiOiI2OGEwMjM3YjNjMzk3ZTFlNmJlZDExMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UIjbWBDFgklKnpNxAhny63YhJF2NKfRL1JAeTQr7KgU",
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