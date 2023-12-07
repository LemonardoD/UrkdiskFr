<script>
    import { page } from '$app/stores';
    import Loader from "../../../../../../../lib/icons/whiteLoader.svelte";
    import LinkGroup from "../../../../../../../components/searchLinks.svelte";
    import OptButtons from '../../../../../../../components/optionButtons.svelte';

    let loader = Loader

    export let data
    const {rims} = data
</script>



{#if !data}
    <svelte:component this={loader} />
{:else}
    <OptButtons number={5} url={$page.url.pathname}/>
    <LinkGroup rims={rims}/> 
{/if}
