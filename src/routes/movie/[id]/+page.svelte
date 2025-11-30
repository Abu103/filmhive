<script>
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import { goto } from '$app/navigation';

	export let data;
	$: movie = data.movie;
	$: recommendation = data.recommendation;

	//@ts-ignore
	function goToDetailpage(url) {
		goto(`/movie/${url}`, { replaceState: false });
	}
</script>

<div class="relative min-h-screen w-full">
	<!-- Hero Background -->
	<div class="absolute inset-0 h-[70vh] w-full overflow-hidden">
		<img
			src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
			alt={movie.title}
			class="h-full w-full object-cover opacity-40 blur-sm transition-all duration-1000"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background"
		></div>
	</div>

	<main class="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-6 pt-32 lg:flex-row">
		<!-- Poster -->
		<div class="flex-shrink-0 lg:w-1/3">
			<img
				src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
				alt={movie.title}
				class="w-full rounded-xl shadow-2xl transition-transform hover:scale-[1.02]"
				loading="eager"
			/>
		</div>

		<!-- Details -->
		<div class="flex flex-col gap-6 lg:w-2/3">
			<div>
				<h1 class="text-5xl font-black tracking-tight text-white sm:text-6xl">{movie.title}</h1>
				{#if movie.tagline}
					<p class="mt-2 text-xl font-light text-muted-foreground italic">"{movie.tagline}"</p>
				{/if}
			</div>

			<div class="flex flex-wrap gap-2">
				{#each movie.genres as genre}
					<Badge variant="secondary" class="px-3 py-1 text-sm">{genre.name}</Badge>
				{/each}
			</div>

			<div class="space-y-4 text-lg text-gray-300">
				<p class="leading-relaxed">{movie.overview}</p>

				<div class="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
					<div>
						<span class="block text-muted-foreground">Release Date</span>
						<span class="font-medium text-white">{movie.release_date}</span>
					</div>
					<div>
						<span class="block text-muted-foreground">Runtime</span>
						<span class="font-medium text-white">{movie.runtime} min</span>
					</div>
					<div>
						<span class="block text-muted-foreground">Status</span>
						<span class="font-medium text-white">{movie.status}</span>
					</div>
					<div>
						<span class="block text-muted-foreground">Budget</span>
						<span class="font-medium text-white">${movie.budget.toLocaleString()}</span>
					</div>
					<div>
						<span class="block text-muted-foreground">Revenue</span>
						<span class="font-medium text-white">${movie.revenue.toLocaleString()}</span>
					</div>
				</div>

				<div class="flex gap-4 pt-4">
					{#if movie.imdb_id}
						<a
							href={`https://www.imdb.com/title/${movie.imdb_id}`}
							target="_blank"
							class="inline-flex items-center gap-2 rounded-full bg-[#f5c518] px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105"
						>
							IMDb
						</a>
					{/if}
					{#if movie.homepage}
						<a
							href={movie.homepage}
							target="_blank"
							class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
						>
							Website
						</a>
					{/if}
				</div>
			</div>

			{#if movie.production_companies?.length}
				<div class="border-t border-white/10 pt-6">
					<p class="mb-3 text-sm font-medium text-muted-foreground">Production</p>
					<div class="flex flex-wrap gap-3">
						{#each movie.production_companies as company}
							<span class="text-sm text-gray-400">{company.name}</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</main>
</div>

{#if recommendation.results.length > 0}
	<div class="mx-auto max-w-7xl px-6 py-12">
		<h2 class="mb-6 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
			Recommendations
		</h2>
		<Carousel.Root opts={{ align: 'start' }} class="w-full">
			<Carousel.Content class="-ml-4">
				{#each recommendation.results as item}
					<Carousel.Item class="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/5">
						<div class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
							<img
								src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
								alt={item.title}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div
								class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								<h3 class="text-lg leading-tight font-bold text-white">{item.title}</h3>
								<p class="mt-2 text-xs font-medium tracking-wider text-gray-300 uppercase">
									{item.release_date?.split('-')[0] || 'N/A'}
								</p>
							</div>
							<button
								class="absolute inset-0 h-full w-full cursor-pointer"
								onclick={() => goToDetailpage(item.id)}
								aria-label={`View ${item.title}`}
							></button>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous
				class="left-4 border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80"
			/>
			<Carousel.Next
				class="right-4 border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80"
			/>
		</Carousel.Root>
	</div>
{/if}
