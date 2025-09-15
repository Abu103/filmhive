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
		goto(`/search/${inputValue.replace(" ", "+")}`, { replaceState: false });
		inputValue = ""
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav
	class="fixed flex w-full items-center justify-between bg-black/60 px-5 py-3 text-xl text-white backdrop-blur-sm"
>
	<a href="/" draggable="false">
		<span class="text-2xl font-extrabold tracking-tight text-white mx-3 lg:mx-0">
			Film<span class="text-[#ffe0c2]">Hive</span>
		</span>
	</a>

	<div>
			<Input
				type="text"
				class="w-full rounded-full bg-transparent pl-5 text-foreground"
				placeholder="E.g Avengers"
				bind:value={inputValue}
				onkeydown={(e) => e.key === 'Enter' && handleSearch()}
			/>
	</div>
	<ul class="hidden gap-4 lg:flex items-center">
		<a href="/">Home</a>
		<a href="/contact	">Contact</a>
		<a href="/about">About</a>
		<a href="/help">Help</a>
		<Button onclick={toggleMode} variant="outline" size="icon">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</ul>
</nav>

<ModeWatcher />
{@render children?.()}
