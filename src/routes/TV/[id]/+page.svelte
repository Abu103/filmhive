<script>
	import { goto } from '$app/navigation';
	// import Spinner from '$lib/components/Spinner.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';

	$: loading = false;

	export let data;
	$: TV = data.TV;
	$: recommendations = data.recommendations;
	// @ts-ignore
	function goToDetailpage(url) {
		loading = true;
		goto(`/TV/${url}`, { replaceState: false });
		loading = false;
	}
	console.log(data.TV);
</script>

<!-- {#if loading}
	<Spinner />
{/if} -->

<div class="flex min-h-screen place-self-center py-10 pt-20">
	<main class="flex min-h-[80vh] flex-col place-content-center lg:flex-row-reverse">
		<div class="flex w-full items-center justify-center place-self-center lg:w-1/2">
			<img
				src={`https://image.tmdb.org/t/p/original/${TV.poster_path}`}
				alt={TV.title}
				class="w-3/5 rounded-md"
				loading="eager"
			/>
		</div>
		<div class="flex w-full flex-col items-start justify-center gap-5 pt-10 pl-10 lg:w-1/2">
			<h1 class="text-start text-3xl font-bold">{TV.name}</h1>
			<p class="w-4/5 py-0">
				<i>
					{TV.overview}
				</i>
			</p>
			<p><strong>Tagline:</strong> {TV.tagline}</p>
			<div class="flex w-10/12 flex-wrap gap-2">
				<strong>Genres:</strong>
				{#each TV.genres as genres}
					<Badge>{genres.name}</Badge>
				{/each}
			</div>
			<p>
				<strong>Release date:</strong>
				{TV.first_air_date}
			</p>
			{#if TV.homepage}
				<p>
					<strong>Homepage: </strong>
					<a href={TV.homepage} target="_blank" class="text-blue-600 hover:underline"> {TV.name}</a>
				</p>
			{/if}
			<p><strong>Status: </strong> {TV.status}</p>
			{#if TV.production_companies}
				<section class="flex w-10/12 flex-wrap gap-2">
					<p>Production Companies:</p>
					{#each TV.production_companies as item}
						<Badge>{item.name}</Badge>
					{/each}
				</section>
			{/if}
			{#if TV.production_countries}
				<section class="flex w-11/12 flex-wrap gap-2">
					<p>Production Country(s):</p>
					{#each TV.production_countries as item}
						<Badge>{item.name}</Badge>
					{/each}
				</section>
			{/if}
		</div>
	</main>
</div>
<section>
	<p class="text-xl pl-10">Seasons:</p>
	<!-- Scroll container -->
	<div class="flex space-x-4 overflow-x-auto px-4 whitespace-nowrap pl-10 py-5">
		{#each TV.seasons as item}
			<div
				class="relative inline-block h-[300px] w-[200px] flex-shrink-0 overflow-hidden rounded-md"
			>
				<img
					src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
					alt={item.name}
					class="h-full w-full object-cover"
				/>

				<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

				<div class="absolute bottom-4 left-4 z-10 text-white">
					<h3 class="text-md font-semibold">{item.name}</h3>
					<p>{item.air_date}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
