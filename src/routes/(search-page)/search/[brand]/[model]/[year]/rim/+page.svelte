<script>
    import { page } from '$app/stores';
    import Loader from "../../../../../../../lib/icons/whiteLoader.svelte";
    import LinkGroup from "../../../../../../../components/searchLinks.svelte";
    import OptButtons from '../../../../../../../components/optionButtons.svelte';

    let loader = Loader

    export let data
    const {rims} = data
    const carInfo = $page.url.pathname.replace("/search/", "").split("/")
   
</script>



{#if !data}
    <svelte:component this={loader} />
{:else}
    <OptButtons number={5} url={$page.url.pathname}/>
    <LinkGroup rims={rims} carBrand={carInfo[0]} carModel={carInfo[1]} carYear={carInfo[2]}/> 
{/if}
