<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Calendar, Star, Film } from 'lucide-svelte';

	export let data;
	let { movies, query } = data;
</script>

<main class="min-h-screen w-full px-4 pt-32 pb-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header Section -->
		<div class="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
			<div class="space-y-2">
				<h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Results for "<span class="text-primary">{query}</span>"
				</h1>
				<p class="text-muted-foreground">
					Found {movies.results.length}
					{movies.results.length === 1 ? 'result' : 'results'}
				</p>
			</div>
		</div>

		{#if movies.results.length === 0}
			<div
				in:fade={{ duration: 300 }}
				class="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed bg-card/50 px-4 py-16 text-center"
			>
				<div class="mb-6 flex size-24 items-center justify-center rounded-full bg-muted">
					<Film class="size-10 text-muted-foreground/50" />
				</div>
				<h2 class="text-2xl font-bold text-foreground">No movies found</h2>
				<p class="mt-2 max-w-md text-muted-foreground">
					We couldn't find any matches for "{query}". Try checking for typos or using broader
					keywords.
				</p>
				<a
					href="/"
					class="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
				>
					Back Home
				</a>
			</div>
		{:else}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
				{#each movies.results as movie, i (movie.id)}
					{#if movie.poster_path}
						<a
							href={`/movie/${movie.id}`}
							in:fly={{ y: 20, duration: 400, delay: i * 50 }}
							class="group relative flex flex-col overflow-hidden rounded-xl bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
						>
							<div class="aspect-[2/3] w-full overflow-hidden bg-muted">
								<img
									src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
									alt={movie.title}
									loading="lazy"
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								></div>
							</div>

							<div class="flex flex-1 flex-col p-4">
								<h3
									class="line-clamp-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary"
								>
									{movie.title}
								</h3>

								<div
									class="mt-auto flex items-center justify-between pt-3 text-xs text-muted-foreground"
								>
									<div class="flex items-center gap-1">
										<Calendar class="size-3.5" />
										<span>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
									</div>
									{#if movie.vote_average}
										<div class="flex items-center gap-1 font-medium text-amber-500">
											<Star class="size-3.5 fill-current" />
											<span>{movie.vote_average.toFixed(1)}</span>
										</div>
									{/if}
								</div>
							</div>
						</a>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</main>
