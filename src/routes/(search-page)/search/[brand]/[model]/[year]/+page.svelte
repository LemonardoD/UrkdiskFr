<script>
    import { page } from '$app/stores';
    import Loader from "../../../../../../lib/icons/whiteLoader.svelte";
    import LinkGroup from "../../../../../../components/searchLinks.svelte";
    import OptButtons from '../../../../../../components/optionButtons.svelte';
    let loader = Loader

    export let data
    const {configs} = data
    const path = $page.url.pathname

</script>



{#if !configs}
    <svelte:component this={loader} />
{:else}
    <OptButtons number={4} url={path}/>
    <LinkGroup configs={configs.rims} url={path} pcd={configs.pcd}/>
{/if}

