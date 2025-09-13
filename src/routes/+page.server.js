// export async function load() {
//     try {
//         const API = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en&page=1", {
//             method: "GET",
//             headers: {
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYyMjk3NTNkNTlkMWUzYTAzZWFlZmJlODk4ZGZkYiIsIm5iZiI6MTc1NTMyNTMwNy4wMTEwMDAyLCJzdWIiOiI2OGEwMjM3YjNjMzk3ZTFlNmJlZDExMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UIjbWBDFgklKnpNxAhny63YhJF2NKfRL1JAeTQr7KgU",
//                 "accept": "application/json"
//             }

//         });
//         const movies = await API.json();
//         // console.log(movies);
//         return { movies }

//     } catch (err) {
//         console.log(err);
//         return {
//             movies: {
//                 results: []
//             }
//         }

//     }
// }