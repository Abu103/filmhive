<script>
	import { CardTitle } from '$lib/components/ui/card';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';

	export let data;
	let { movies } = data;

	// console.log(movies);
</script>

{#if movies.results.length === 0}
	<main
		class="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white"
	>
		<h1 class="text-6xl font-bold text-[#ffe0c2]">404</h1>
		<p class="mt-4 text-xl">Oops! The page you're looking for doesn't exist.</p>
		<p class="mt-2 text-sm text-gray-400">It might have been moved or never existed.</p>

		<a
			href="/"
			class="mt-6 inline-block rounded bg-[#ffe0c2] px-6 py-3 text-black transition hover:bg-[#ffe0c2aa]"
		>
			Go back home
		</a>
	</main>
{/if}
<main class="px-4 pt-20">
	<!-- Responsive Grid -->
	<div class="columns-[300px]">
		{#each movies.results as movie}
			{#if movie.poster_path}
				<Card class="break-inside-avoid bg-gray-600/20 mb-5">
					<CardContent class="flex flex-col items-center ">
						<a href={`/movie/${movie.id}`} class="flex flex-col items-center">
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
								alt={movie.title}
								loading="eager"
								class="w-full max-w-[250px] rounded-md object-cover"
							/>

							<CardTitle class="mt-4 text-center   text-xl font-semibold break-words">
								{movie.title}
							</CardTitle>
						</a>
					</CardContent>
				</Card>
			{/if}
		{/each}
	</div>
</main>
