<script lang="ts">
	import { page } from "$app/stores";
	import { changeDiameters, filterRimList } from "$lib";
	import type { DiameterEventChange, RimInfo } from "../../../lib/types";
	import RimContent from "../../../components/rimContent.svelte";
	import SearchCard from "../../../components/searchSection.svelte";

	export let data;
	const { brands, rimInfo } = data;

	let urlDiameters = $page.url.searchParams.get("selectedDiameters") || "all";

	let selected: boolean[] = [];
	let selectedDiameters: string[] = urlDiameters === "all" ? rimInfo.diameters : urlDiameters.split(",");
	let filteredRimList: RimInfo[];

	const handleDiameterChange = (event: DiameterEventChange) => {
		selected = event.detail.selected;
		const newlySelectedDiameters = rimInfo.diameters.filter((o, i) => selected[i]);
		changeDiameters(newlySelectedDiameters, $page.url);
	};

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
	on:diameterChange={handleDiameterChange}
	title="на авто"
	byCar={false}
	{brands}
	diameters={rimInfo.diameters}
	allBrands={true}
/>
<RimContent rimData={filteredRimList} />
