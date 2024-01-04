<script lang="ts">
	import { page } from "$app/stores";
	import { filterRimList, handleDiameterChange, searchDiameters } from "$lib/rimsHelpers";
	import type { RimInfo } from "../../../lib/types";
	import RimContent from "../../../components/rimContent.svelte";
	import SearchCard from "../../../components/searchSection.svelte";

	export let data;
	const { brands, rimInfo } = data;

	let rimBrand = $page.url.searchParams.get("rimBrand");

	let selected: boolean[] = [];
	let selectedDiameters: string[] = searchDiameters($page.url.searchParams.get("selectedDiameters"), rimInfo.diameters);
	let filteredRimList: RimInfo[];

	$: {
		selectedDiameters = rimInfo.diameters.filter((o, i) => selected[i]);
		if (selectedDiameters.length > 0) {
			filteredRimList = filterRimList(rimInfo.rimList, selectedDiameters);
		} else {
			filteredRimList = rimInfo.rimList;
		}
	}
</script>

<SearchCard
	on:diameterChange={event => {
		selected = handleDiameterChange(event, rimInfo.diameters, $page.url);
	}}
	byCar={true}
	title={`${rimBrand === "all" ? "на авто" : rimBrand}`}
	{brands}
	diameters={rimInfo.diameters}
	ifSearch={true}
	rimBrand={rimBrand || "all"}
/>
<RimContent rimData={filteredRimList} />
