import { TMDB_AUTH_KEY } from '$env/static/private';

export async function load({ params, fetch }) {
    const { id } = params;

    const API = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${TMDB_AUTH_KEY}`,
            accept: 'application/json'
        }
    })

    const recommendation = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${TMDB_AUTH_KEY}`,
            accept: 'application/json'
        }
    })

    const TV = await API.json();
    const recommendations = await recommendation.json();
    console.log(TV);

    return { TV, recommendations };

}