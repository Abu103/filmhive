<script>
	import { goto } from '$app/navigation';
	import * as Carousel from '$lib/components/ui/carousel';
	//@ts-ignore
	function goToDetailpage(url) {
		goto(`/movie/${url}`, { replaceState: false });
	}
	//@ts-ignore
	function goToSeriesDetail(url) {
		goto(`/TV/${url}`, { replaceState: false });
	}
	export let data;
	$: movies = data.movies;
	$: populars = data.populars;
	$: upcomings = data.upcomings;
	$: TVPopulars = data.TVPopulars;
	$: TVTopRateds = data.TVTopRateds;
</script>

<main>
	<section class="relative h-[80vh] w-full overflow-hidden">
		<div class="absolute inset-0">
			<img
				src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnsjBOjhuWOht-gfnfj6YgCdjA4sxOukRErKC5gA0WcpLL6P24KJGkTPwF9SL_g9WmIp-BXV4ibRJuuUqRm3iScqA1vEUM3ixkgMr8JPn4vG7ZasljWw26g3_i5jFmf6VlV0cway5pSH6-/w1680-h1050-c/avengers-endgame-movie-characters-uhdpaper.com-4K-52.jpg"
				alt="Hero"
				class="h-full w-full object-cover opacity-50 grayscale transition-all duration-1000 hover:grayscale-0"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
			></div>
		</div>

		<div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
			<h1 class="text-7xl font-black tracking-tighter text-foreground opacity-90 sm:text-9xl">
				FILMHIVE
			</h1>
			<p class="mt-4 text-lg font-light tracking-[0.3em] text-muted-foreground uppercase">
				Cinematic Universe
			</p>
		</div>
	</section>

	<div class="flex w-full flex-col gap-8 py-12" id="top-rated">
		<h2 class="px-12 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
			Top Rated
		</h2>
		<Carousel.Root opts={{ align: 'start' }} class="w-full px-12">
			<Carousel.Content class="-ml-4">
				{#each movies.results as movie (movie.id)}
					<Carousel.Item class="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/5">
						<div class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
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
	<div class="flex w-full flex-col gap-8 py-12" id="upcoming">
		<h2 class="px-12 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
			Upcoming
		</h2>
		<Carousel.Root opts={{ align: 'start' }} class="w-full px-12">
			<Carousel.Content class="-ml-4">
				{#each upcomings.results as movie (movie.id)}
					<Carousel.Item class="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/5">
						<div class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
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
	<div class="flex w-full flex-col gap-8 py-12" id="popular">
		<h2 class="px-12 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
			Popular
		</h2>
		<Carousel.Root opts={{ align: 'start' }} class="w-full px-12">
			<Carousel.Content class="-ml-4">
				{#each populars.results as movie (movie.id)}
					<Carousel.Item class="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/5">
						<div class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
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
	<div class="flex w-full flex-col gap-8 py-12" id="TV-Series">
		<h2 class="px-12 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
			TV Popular
		</h2>
		<Carousel.Root opts={{ align: 'start' }} class="w-full px-12">
			<Carousel.Content class="-ml-4">
				{#each TVPopulars.results as movie (movie.id)}
					<Carousel.Item class="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/5">
						<div class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div
								class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								<h3 class="text-lg leading-tight font-bold text-white">{movie.name}</h3>
								<p class="mt-2 text-xs font-medium tracking-wider text-gray-300 uppercase">
									{movie.first_air_date?.split('-')[0] || 'N/A'}
								</p>
							</div>
							<button
								class="absolute inset-0 h-full w-full cursor-pointer"
								onclick={() => goToSeriesDetail(movie.id)}
								aria-label={`View ${movie.name}`}
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
	<div class="flex w-full flex-col gap-8 py-12" id="TV-Top-rated">
		<h2 class="px-12 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
			TV Top Rated
		</h2>
		<Carousel.Root opts={{ align: 'start' }} class="w-full px-12">
			<Carousel.Content class="-ml-4">
				{#each TVTopRateds.results as movie (movie.id)}
					<Carousel.Item class="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/5">
						<div class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div
								class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								<h3 class="text-lg leading-tight font-bold text-white">{movie.name}</h3>
								<p class="mt-2 text-xs font-medium tracking-wider text-gray-300 uppercase">
									{movie.first_air_date?.split('-')[0] || 'N/A'}
								</p>
							</div>
							<button
								class="absolute inset-0 h-full w-full cursor-pointer"
								onclick={() => goToSeriesDetail(movie.id)}
								aria-label={`View ${movie.name}`}
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
</main>

<style>
</style>
