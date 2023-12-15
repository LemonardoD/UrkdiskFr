<script lang="ts">
	import { onMount } from "svelte";
    import { page } from "$app/stores";
	import type { RimInfo } from "../../../types";
    import Loader from "../../../lib/icons/loader.svelte";
	import RimContent from "../../../components/rimContent.svelte";
    import SearchCard from "../../../components/searchSection.svelte";

    let loader = Loader
    let loaded =false

    
    export let data
    const {brands, rimInfo} = data

    let urlDiameters = $page.url.searchParams.get("selectedDiameters") || "all"

    const changeDiameters = (diameters: string[]) => {
        const newUrl = new URL($page.url);
        newUrl.searchParams.set('selectedDiameters', diameters.join(',') || "all");
        history.replaceState(history.state, '', newUrl.toString());
    };
    
    let selected: boolean[] = [];
    let selectedDiameters: string[] = urlDiameters === "all" ? rimInfo.diameters : urlDiameters.split(',')
    let filteredRimList: RimInfo[]

    
    onMount(() => {
        loaded = true
        
    });
    

    const handleDiameterChange = (event: { detail: { selected: never[]; }; }) => {
        selected = event.detail.selected;
        const newlySelectedDiameters = rimInfo.diameters.filter((o, i) => selected[i]);
        changeDiameters(newlySelectedDiameters);
    };

   $:{  
        selectedDiameters = rimInfo.diameters.filter((o, i) => selected[i])
        if (selectedDiameters.length > 0) {
            filteredRimList = rimInfo.rimList.map((rim) => {
                const filteredConfigs = rim.config.filter((config) =>
                    selectedDiameters.includes(config.diameter)
                );
                if (filteredConfigs.length > 0) {
                    const minPrice = [...new Set(filteredConfigs.map((config) => config.price))]
                    const diameters = [...new Set(filteredConfigs.map((config) => config.diameter))];
                    return {
                        ...rim,
                        config: filteredConfigs,
                        minPrice: minPrice,
                        diameters,
                    };
                }
                return null;
            }).filter((rim): rim is RimInfo => rim !== null)
        } else {
            filteredRimList = rimInfo.rimList
        }
   }
   
</script>



<SearchCard on:diameterChange={handleDiameterChange} title="на авто" byCar={false} brands={brands} diameters={rimInfo.diameters}/>
{#if !loaded}
    <svelte:component this={loader} />
{:else}
    <RimContent rimData={filteredRimList}/>
{/if}