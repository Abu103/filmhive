import { TMDB_AUTH_KEY } from "$env/static/private";

export async function load({params}) {
    try {
        const API = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TMDB_AUTH_KEY}`,
                "accept": "application/json"
            }

        });
        const APIPopular = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TMDB_AUTH_KEY}`,
                "accept": "application/json"
            }
        })
        const APIUpcoming = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TMDB_AUTH_KEY}`,
                "accept": "application/json"
            }
        })
        const TVPopular = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TMDB_AUTH_KEY}`,
                "accept": "application/json"
            }
        })
        const TVTopRated = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TMDB_AUTH_KEY}`,
                "accept": "application/json"
            }
        })
        const movies = await API.json();
        const populars = await APIPopular.json();
        const upcomings = await APIUpcoming.json();
        const TVPopulars = await TVPopular.json();
        const TVTopRateds = await TVTopRated.json()
        return { movies, populars, upcomings, TVPopulars, TVTopRateds }

    } catch (err) {
        console.log(err);
        return {
            movies: {
                results: []
            }
        }

    }
}