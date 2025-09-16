<script>
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let data;
	$: movie  = data.movie;

	console.log(movie);
</script>

<div class="flex min-h-screen place-self-center py-10 pt-20">
	<main class="flex min-h-[80vh] flex-col place-content-center lg:flex-row-reverse">
		<div class="flex w-full items-center justify-center place-self-center lg:w-1/2">
			<img
				src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
				alt={movie.title}
				class="w-3/5 rounded-md"
				loading="eager"
			/>
		</div>
		<div class="flex w-full flex-col items-start justify-center gap-5 pt-10 pl-10 lg:w-1/2">
			<h1 class="text-start text-3xl font-bold">{movie.title}</h1>
			<p>
				<i>
					{movie.overview}
				</i>
			</p>
			<p><strong>Tagline:</strong> {movie.tagline}</p>
			<div class="flex flex-wrap gap-2">
				<strong>Genres:</strong>
				{#each movie.genres as genres}
					<Badge>{genres.name}</Badge>
				{/each}
			</div>
			<p>
				<strong>Release date:</strong>
				{movie.release_date}
			</p>
			<p><strong>Runtime:</strong> {movie.runtime} min</p>
			<p>
				<strong>IMDb: </strong>
				<a
					href={`https://www.imdb.com/title/${movie.imdb_id}`}
					target="_blank"
					class=" text-blue-600 hover:underline"
				>
					{movie.title}</a
				>
			</p>
			{#if movie.homepage}
				<p>
					<strong>Homepage: </strong>
					<a href={movie.homepage} target="_blank" class="text-blue-600 hover:underline">
						{movie.title}</a
					>
				</p>
			{/if}
			<p><strong>Budget: </strong> {movie.budget}$</p>
			<p><strong>Revenue: </strong> {movie.revenue}$</p>
			<p><strong>Status: </strong> {movie.status}</p>
			{#if movie.production_companies}
				<section class="flex flex-wrap gap-2 w-11/12">
					<p>Production Companies:</p>
						{#each movie.production_companies as item}
							<Badge>{item.name}</Badge>
						{/each}
				</section>
			{/if}
			{#if movie.production_countries}
				<section class="flex flex-wrap gap-2 w-11/12">
					<p>Production Country(s):</p>
					{#each movie.production_countries as item}
						<Badge>{item.name}</Badge>
					{/each}
				</section>
			{/if}
		</div>
	</main>
</div>

<!-- <h1>{movie.title}</h1> -->
