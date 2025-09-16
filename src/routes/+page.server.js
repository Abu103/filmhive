import { Award } from "lucide-svelte";

export async function load() {
    try {
        const API = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en", {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYyMjk3NTNkNTlkMWUzYTAzZWFlZmJlODk4ZGZkYiIsIm5iZiI6MTc1NTMyNTMwNy4wMTEwMDAyLCJzdWIiOiI2OGEwMjM3YjNjMzk3ZTFlNmJlZDExMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UIjbWBDFgklKnpNxAhny63YhJF2NKfRL1JAeTQr7KgU",
                "accept": "application/json"
            }

        });
        const APIPopular = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US', {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYyMjk3NTNkNTlkMWUzYTAzZWFlZmJlODk4ZGZkYiIsIm5iZiI6MTc1NTMyNTMwNy4wMTEwMDAyLCJzdWIiOiI2OGEwMjM3YjNjMzk3ZTFlNmJlZDExMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UIjbWBDFgklKnpNxAhny63YhJF2NKfRL1JAeTQr7KgU",
                "accept": "application/json"
            }
        })
        const APIUpcoming = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYyMjk3NTNkNTlkMWUzYTAzZWFlZmJlODk4ZGZkYiIsIm5iZiI6MTc1NTMyNTMwNy4wMTEwMDAyLCJzdWIiOiI2OGEwMjM3YjNjMzk3ZTFlNmJlZDExMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UIjbWBDFgklKnpNxAhny63YhJF2NKfRL1JAeTQr7KgU",
                "accept": "application/json"
            }
        })
        const TVPopular = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYyMjk3NTNkNTlkMWUzYTAzZWFlZmJlODk4ZGZkYiIsIm5iZiI6MTc1NTMyNTMwNy4wMTEwMDAyLCJzdWIiOiI2OGEwMjM3YjNjMzk3ZTFlNmJlZDExMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UIjbWBDFgklKnpNxAhny63YhJF2NKfRL1JAeTQr7KgU",
                "accept": "application/json"
            }
        })
        const TVTopRated = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYyMjk3NTNkNTlkMWUzYTAzZWFlZmJlODk4ZGZkYiIsIm5iZiI6MTc1NTMyNTMwNy4wMTEwMDAyLCJzdWIiOiI2OGEwMjM3YjNjMzk3ZTFlNmJlZDExMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UIjbWBDFgklKnpNxAhny63YhJF2NKfRL1JAeTQr7KgU",
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