<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoonIcon, SunIcon } from 'lucide-svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { goto } from '$app/navigation';

	let { children } = $props();

	let inputValue = $state('');

	function handleSearch() {
		goto(`/search/${inputValue.replace(' ', '+')}`, { replaceState: false });
		inputValue = '';
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav
	class="fixed z-50 flex w-full items-center justify-between bg-black/30 px-8 py-6 transition-all duration-300"
>
	<a href="/" draggable="false" class="group">
		<span
			class="text-2xl font-bold tracking-tighter text-white transition-opacity group-hover:opacity-80"
		>
			FilmHive
		</span>
	</a>

	<div class="flex items-center gap-6">
		<a
			href="/favorites"
			class="text-sm font-medium text-white/70 transition-colors hover:text-white"
		>
			Favorites
		</a>
		<div class="relative hidden md:block">
			<Input
				type="text"
				class="h-9 w-64 rounded-full border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20 focus:ring-0"
				placeholder="Search movies..."
				bind:value={inputValue}
				onkeydown={(e) => e.key === 'Enter' && handleSearch()}
			/>
		</div>

		<Button
			onclick={toggleMode}
			variant="ghost"
			size="icon"
			class="text-white hover:bg-white/10 hover:text-white"
		>
			<SunIcon class="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<MoonIcon
				class="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</nav>

<ModeWatcher />
{@render children?.()}
