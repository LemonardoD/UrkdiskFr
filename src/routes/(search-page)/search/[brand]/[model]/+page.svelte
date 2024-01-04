<script>
	// @ts-nocheck
	import { page } from "$app/stores";
	import Loader from "../../../../../lib/icons/whiteLoader.svelte";
	import LinkGroup from "../../../../../components/searchLinks.svelte";
	import OptButtons from "../../../../../components/optionButtons.svelte";

	let loader = Loader;

	export let data;
	const { years } = data;
	const path = $page.url.pathname;
</script>

{#if !years}
	<svelte:component this={loader} />
{:else}
	<OptButtons
		number={3}
		url={path}
	/>
	<LinkGroup
		url={path}
		array={years.sort((a, b) => b - a)}
	/>
{/if}
