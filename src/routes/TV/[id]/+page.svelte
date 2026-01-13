<script lang="ts">
	import { goto } from '$app/navigation';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Heart } from 'lucide-svelte';
	import { onMount } from 'svelte';

	$: loading = false;

	export let data;
	$: TV = data.TV;
	$: recommendation = data.recommendations;

	let isFavorite = false;

	function checkFavorite() {
		if (typeof localStorage === 'undefined') return;
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		isFavorite = favorites.some((fav: any) => fav.id === TV.id && fav.type === 'tv');
	}

	function toggleFavorite() {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		if (isFavorite) {
			const newFavorites = favorites.filter((fav: any) => !(fav.id === TV.id && fav.type === 'tv'));
			localStorage.setItem('favorites', JSON.stringify(newFavorites));
		} else {
			favorites.push({
				id: TV.id,
				type: 'tv',
				title: TV.name, // Mapping 'name' to 'title' for consistency if listing them together later, or keep as name? I'll keep consistency where possible or just store what is there. Let's use 'title' for unified list rendering if needed, or store 'name' and handle it later. Let's store 'name' as well.
				name: TV.name,
				poster_path: TV.poster_path, // TV specific
				overview: TV.overview,
				first_air_date: TV.first_air_date,
				vote_average: TV.vote_average
			});
			localStorage.setItem('favorites', JSON.stringify(favorites));
		}
		isFavorite = !isFavorite;
	}

	$: if (TV) checkFavorite();

	function goToDetailpage(url: number, type: string) {
		if (type === 'movie') {
			goto(`/movie/${url}`, { replaceState: false });
		} else if (type === 'tv') {
			goto(`/TV/${url}`, { replaceState: false });
		}
	}
</script>

<!-- {#if loading}
	<Spinner />
{/if} -->

<div class="relative min-h-screen w-full">
	<!-- Hero Background -->
	<div class="absolute inset-0 h-[70vh] w-full overflow-hidden">
		<img
			src={`https://image.tmdb.org/t/p/original/${TV.backdrop_path || TV.poster_path}`}
			alt={TV.name}
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
				src={`https://image.tmdb.org/t/p/original/${TV.poster_path}`}
				alt={TV.name}
				class="w-full rounded-xl shadow-2xl transition-transform hover:scale-[1.02]"
				loading="eager"
			/>
		</div>

		<!-- Details -->
		<div class="flex flex-col gap-6 lg:w-2/3">
			<div>
				<h1 class="text-5xl font-black tracking-tight text-white sm:text-6xl">{TV.name}</h1>
				{#if TV.tagline}
					<p class="mt-2 text-xl font-light text-muted-foreground italic">"{TV.tagline}"</p>
				{/if}
			</div>

			<div class="flex flex-wrap gap-2">
				{#each TV.genres as genre}
					<Badge variant="secondary" class="px-3 py-1 text-sm">{genre.name}</Badge>
				{/each}
			</div>

			<div class="space-y-4 text-lg text-gray-300">
				<p class="leading-relaxed">{TV.overview}</p>

				<div class="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
					<div>
						<span class="block text-muted-foreground">First Air Date</span>
						<span class="font-medium text-white">{TV.first_air_date}</span>
					</div>
					<div>
						<span class="block text-muted-foreground">Status</span>
						<span class="font-medium text-white">{TV.status}</span>
					</div>
					<div>
						<span class="block text-muted-foreground">Seasons</span>
						<span class="font-medium text-white">{TV.number_of_seasons}</span>
					</div>
					<div>
						<span class="block text-muted-foreground">Episodes</span>
						<span class="font-medium text-white">{TV.number_of_episodes}</span>
					</div>
				</div>

				<div class="flex gap-4 pt-4">
					{#if TV.homepage}
						<a
							href={TV.homepage}
							target="_blank"
							class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
						>
							Website
						</a>
					{/if}

					<button
						onclick={toggleFavorite}
						class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors {isFavorite
							? 'bg-red-500 text-white hover:bg-red-600'
							: 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'}"
					>
						<Heart class="h-4 w-4 {isFavorite ? 'fill-current' : ''}" />
						{isFavorite ? 'Saved' : 'Add to Favorites'}
					</button>
				</div>
			</div>

			{#if TV.production_companies?.length}
				<div class="border-t border-white/10 pt-6">
					<p class="mb-3 text-sm font-medium text-muted-foreground">Production</p>
					<div class="flex flex-wrap gap-3">
						{#each TV.production_companies as company}
							<span class="text-sm text-gray-400">{company.name}</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</main>
</div>

{#if TV.seasons?.length > 0}
	<div class="mx-auto max-w-7xl px-6 py-12">
		<h2 class="mb-6 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
			Seasons
		</h2>
		<Carousel.Root opts={{ align: 'start' }} class="w-full">
			<Carousel.Content class="-ml-4">
				{#each TV.seasons as item}
					<Carousel.Item class="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/5">
						<div class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
							<img
								src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
								alt={item.name}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div
								class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								<h3 class="text-lg leading-tight font-bold text-white">{item.name}</h3>
								<p class="mt-2 text-xs font-medium tracking-wider text-gray-300 uppercase">
									{item.air_date?.split('-')[0] || 'N/A'} • {item.episode_count} Eps
								</p>
							</div>
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
								alt={item.name}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div
								class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								<h3 class="text-lg leading-tight font-bold text-white">{item.name}</h3>
								<p class="mt-2 text-xs font-medium tracking-wider text-gray-300 uppercase">
									{item.first_air_date?.split('-')[0] || 'N/A'}
								</p>
							</div>
							<button
								class="absolute inset-0 h-full w-full cursor-pointer"
								onclick={() => goToDetailpage(item.id, item.media_type)}
								aria-label={`View ${item.name}`}
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
