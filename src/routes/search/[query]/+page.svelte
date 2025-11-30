<script>
	import { goto } from '$app/navigation';

	export let data;
	let { movies } = data;

	//@ts-ignore
	function goToDetailpage(url) {
		goto(`/movie/${url}`, { replaceState: false });
	}
</script>

{#if movies.results.length === 0}
	<main class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
		<h1 class="text-8xl font-black text-muted-foreground opacity-20">404</h1>
		<p class="mt-4 text-xl font-medium text-foreground">No movies found</p>
		<p class="mt-2 text-sm text-muted-foreground">Try searching for something else.</p>

		<a
			href="/"
			class="mt-8 rounded-full bg-white/10 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
		>
			Go back home
		</a>
	</main>
{/if}
<main class="mx-auto max-w-7xl px-6 py-32">
	<h1 class="mb-12 text-3xl font-bold tracking-tight">Search Results</h1>

	<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each movies.results as movie (movie.id)}
			{#if movie.poster_path}
				<div class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
					<img
						src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
						alt={movie.title}
						loading="lazy"
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div
						class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					>
						<h3 class="text-lg leading-tight font-bold text-white">{movie.title}</h3>
						<p class="mt-2 text-xs font-medium tracking-wider text-gray-300 uppercase">
							{movie.release_date?.split('-')[0] || 'N/A'}
						</p>
					</div>
					<button
						class="absolute inset-0 h-full w-full cursor-pointer"
						onclick={() => goToDetailpage(movie.id)}
						aria-label={`View ${movie.title}`}
					></button>
				</div>
			{/if}
		{/each}
	</div>
</main>
