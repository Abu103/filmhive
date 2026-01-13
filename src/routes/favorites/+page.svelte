<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let favorites: any[] = [];
	let mounted = false;

	onMount(() => {
		const storedFavorites = localStorage.getItem('favorites');
		if (storedFavorites) {
			favorites = JSON.parse(storedFavorites);
		}
		mounted = true;
	});

	function goToDetailpage(id: number, type: string) {
		if (type === 'movie') {
			goto(`/movie/${id}`);
		} else if (type === 'tv') {
			goto(`/TV/${id}`);
		}
	}
</script>

<div class="min-h-screen w-full bg-background pt-32 pb-10">
	<div class="mx-auto max-w-7xl px-6">
		<h1 class="mb-10 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
			Your Favorites
		</h1>

		{#if mounted}
			{#if favorites.length === 0}
				<div
					in:fade
					class="flex h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/25 bg-muted/10 text-center"
				>
					<p class="text-xl font-medium text-muted-foreground">No favorites yet</p>
					<p class="mt-2 text-sm text-muted-foreground/60">
						Start adding movies and TV shows to your collection
					</p>
					<a
						href="/"
						class="mt-6 rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition-transform hover:scale-105"
					>
						Explore Content
					</a>
				</div>
			{:else}
				<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{#each favorites as item (item.id)}
						<div
							in:fade
							class="group relative aspect-[2/3] overflow-hidden rounded-xl bg-muted shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl"
						>
							<img
								src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
								alt={item.title || item.name}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>

							<div
								class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								<h3 class="line-clamp-2 text-sm font-bold text-white">
									{item.title || item.name}
								</h3>
								<div class="mt-1 flex items-center justify-between text-xs text-gray-300">
									<span class="capitalize">{item.type === 'tv' ? 'TV Show' : 'Movie'}</span>
									<!-- Display year if available -->
									<span>
										{(item.release_date || item.first_air_date || '').split('-')[0]}
									</span>
								</div>
							</div>

							<button
								class="absolute inset-0 h-full w-full cursor-pointer"
								onclick={() => goToDetailpage(item.id, item.type)}
								aria-label={`View ${item.title || item.name}`}
							></button>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>
