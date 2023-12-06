<script>
	import { onMount } from "svelte";
    import Loader from "../../../lib/icons/loader.svelte"
    import SearchCard from "../../../components/searchSection.svelte"
	import RimContent from "../../../components/rimContent.svelte";

    let loader = Loader
    let loaded =false

    export let data
    const {brands, rimInfo} = data
    
    onMount(() => {
        loaded = true
    });
</script>



<SearchCard title="на авто" brands={brands} diameters={rimInfo.diameters}/>
{#if !loaded}
    <svelte:component this={loader} />
{:else}
    <RimContent rimData={rimInfo.rimList}/>        
{/if}
