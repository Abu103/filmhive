<script>
	import { goto } from '$app/navigation';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
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
	<section
		class="relative -z-1 h-[100vh] min-h-full w-full bg-cover bg-center bg-no-repeat pt-20"
		style={`background-image: url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnsjBOjhuWOht-gfnfj6YgCdjA4sxOukRErKC5gA0WcpLL6P24KJGkTPwF9SL_g9WmIp-BXV4ibRJuuUqRm3iScqA1vEUM3ixkgMr8JPn4vG7ZasljWw26g3_i5jFmf6VlV0cway5pSH6-/w1680-h1050-c/avengers-endgame-movie-characters-uhdpaper.com-4K-52.jpg)`}
	>
		<div class="bg-opacity-50 absolute inset-0 bg-black/40"></div>

		<div
			class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
		>
			<h1 class="mb-4 text-4xl font-bold sm:text-5xl">Welcome to FilmHive</h1>
			<p class="mb-6 max-w-2xl text-lg sm:text-xl">
				Discover top-rated movies, hidden gems, and your next favorite watch – all in one place.
			</p>
		</div>
	</section>

	<div class="flex w-full flex-col gap-5 py-10" id="top-rated">
		<p class="pl-3 text-2xl font-bold">Top Rated</p>
		<div class="no-scrollbar flex w-full gap-5 overflow-x-scroll px-3">
			{#each movies.results as movie (movie.id)}
				<Card
					class="min-h-fit w-full cursor-pointer bg-gray-500/30"
					onclick={() => goToDetailpage(movie.id)}
				>
					<CardContent
						class="flex min-h-fit min-w-[100px] flex-row place-content-center gap-5 lg:min-h-[100px] lg:min-w-[300px]"
					>
						<div class="flex-row">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
								loading="lazy"
								class="min-h-[100px] max-w-[150px] rounded-md md:max-w-[200px] lg:max-w-[250px]"
							/>

							<CardTitle class="text-md pt-5 pb-3 text-center font-bold">{movie.title}</CardTitle>

							<CardDescription class="text-center">
								<section class="text-md">
									<p>
										Popularity:
										<strong>
											{movie.popularity}
										</strong>
									</p>
									<p>
										Release Date:
										<strong>
											{movie.release_date}
										</strong>
									</p>
								</section>
							</CardDescription>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col gap-5 py-10" id="upcoming">
		<p class="pl-3 text-2xl font-bold">Upcoming</p>
		<div class="no-scrollbar flex w-full gap-5 overflow-x-scroll px-3">
			{#each upcomings.results as movie (movie.id)}
				<Card
					class="min-h-fit w-full cursor-pointer bg-gray-500/30"
					onclick={() => goToDetailpage(movie.id)}
				>
					<CardContent
						class="flex min-h-fit min-w-[100px] flex-row place-content-center gap-5 lg:min-h-[100px] lg:min-w-[300px]"
					>
						<div class="flex-row">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
								loading="lazy"
								class="min-h-[100px] max-w-[150px] rounded-md md:max-w-[200px] lg:max-w-[250px]"
							/>

							<CardTitle class="text-md pt-5 pb-3 text-center font-bold ">{movie.title}</CardTitle>
							<CardDescription class="text-center">
								<section class="text-md">
									<p>
										Popularity:
										<strong>
											{movie.popularity}
										</strong>
									</p>
									<p>
										Release Date:
										<strong>
											{movie.release_date}
										</strong>
									</p>
								</section>
							</CardDescription>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col gap-5 py-10" id="popular">
		<p class="pl-3 text-2xl font-bold">Popular</p>
		<div class="no-scrollbar flex w-full gap-5 overflow-x-scroll px-3">
			{#each populars.results as movie (movie.id)}
				<Card
					class="min-h-fit w-full  cursor-pointer bg-gray-500/30"
					onclick={() => goToDetailpage(movie.id)}
				>
					<CardContent
						class="flex min-h-fit min-w-[100px] flex-row place-content-center gap-5 lg:min-h-[100px] lg:min-w-[300px]"
					>
						<div class="flex-row">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
								loading="lazy"
								class="min-h-[100px] max-w-[150px] rounded-md md:max-w-[200px] lg:max-w-[250px]"
							/>

							<CardTitle class="text-md pt-5 pb-3 text-center font-bold ">{movie.title}</CardTitle>
							<CardDescription class="text-center">
								<section class="text-md">
									<p>
										Popularity:
										<strong>
											{movie.popularity}
										</strong>
									</p>
									<p>
										Release Date:
										<strong>
											{movie.release_date}
										</strong>
									</p>
								</section>
							</CardDescription>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col gap-5 py-10" id="TV-Series">
		<p class="pl-3 text-2xl font-bold">TV Popular</p>
		<div class="no-scrollbar flex w-full gap-5 overflow-x-scroll px-3">
			{#each TVPopulars.results as movie (movie.id)}
				<Card
					class="min-h-fit w-full  cursor-pointer bg-gray-500/30"
					onclick={() => goToSeriesDetail(movie.id)}
				>
					<CardContent
						class="flex min-h-fit min-w-[100px] flex-row place-content-center gap-5 lg:min-h-[100px] lg:min-w-[300px]"
					>
						<div class="flex-row">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
								loading="lazy"
								class="min-h-[100px] max-w-[150px] rounded-md md:max-w-[200px] lg:max-w-[250px]"
							/>

							<CardTitle class="text-md pt-5 pb-3 text-center font-bold ">{movie.name}</CardTitle>
							<CardDescription class="text-center">
								<section class="text-md">
									<p>
										Popularity:
										<strong>
											{movie.popularity}
										</strong>
									</p>
									<p>
										Release Date:
										<strong>
											{movie.first_air_date}
										</strong>
									</p>
								</section>
							</CardDescription>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col gap-5 py-10" id="TV-Top-rated">
		<p class="pl-3 text-2xl font-bold">TV Top Rated</p>
		<div class="no-scrollbar flex w-full gap-5 overflow-x-scroll px-3">
			{#each TVTopRateds.results as movie (movie.id)}
				<Card
					class="min-h-fit w-full  cursor-pointer bg-gray-500/30"
					onclick={() => goToSeriesDetail(movie.id)}
				>
					<CardContent
						class="flex min-h-fit min-w-[100px] flex-row place-content-center gap-5 lg:min-h-[100px] lg:min-w-[300px]"
					>
						<div class="flex-row">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
								loading="lazy"
								class="min-h-[100px] max-w-[150px] rounded-md md:max-w-[200px] lg:max-w-[250px]"
							/>

							<CardTitle class="text-md pt-5 pb-3 text-center font-bold ">{movie.name}</CardTitle>
							<CardDescription class="text-center">
								<section class="text-md">
									<p>
										Popularity:
										<strong>
											{movie.popularity}
										</strong>
									</p>
									<p>
										Release Date:
										<strong>
											{movie.first_air_date}
										</strong>
									</p>
								</section>
							</CardDescription>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</main>

<style>
	.no-scrollbar {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
