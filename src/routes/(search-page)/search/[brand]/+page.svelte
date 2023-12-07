<script>
    import { page } from '$app/stores';
    import Loader from "../../../../lib/icons/whiteLoader.svelte";
    import LinkGroup from "../../../../components/searchLinks.svelte";
    import OptButtons from '../../../../components/optionButtons.svelte';
    
    let loader = Loader

    export let data
    const {models} = data
    const path =$page.url.pathname

</script>

{#if !models}
    <svelte:component this={loader} />
{:else}
    <OptButtons number={2} url={path}/>
    <LinkGroup array={models} url={path}/>
{/if}




