<script lang="ts">
	import { page } from "$app/stores";
	import { handleDiameterChange, filterRimList, searchDiameters } from "$lib/rimsHelpers";
	import type { RimInfo } from "../../../../lib/types";
	import RimContent from "../../../../components/rimContent.svelte";
	import SearchCard from "../../../../components/searchSection.svelte";

	export let data;
	const { brands, rimInfo, rimBrand } = data;

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
	byCar={false}
	title={rimBrand}
	{brands}
	diameters={rimInfo.diameters}
	{rimBrand}
/>
<RimContent rimData={filteredRimList} />
