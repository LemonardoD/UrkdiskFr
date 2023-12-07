<script>
    import LinkGroup from "../../../../../../components/searchLinks.svelte";
    import OptButtons from '../../../../../../components/optionButtons.svelte';
    import Loader from "../../../../../../lib/icons/whiteLoader.svelte"
    import { page } from '$app/stores';
    let loader = Loader

    export let data
    const {configs} = data
    const path = $page.url.pathname
</script>



<div class="page">
    {#if !configs}
        <svelte:component this={loader} />
    {:else}
        <OptButtons number={4} url={path}/>
        <LinkGroup configs={configs.rims} url={path} pcd={configs.pcd}/>
        
    {/if}
</div>


<style>
    .page{
        margin: 16px auto 16px;
        padding: 16px;
        width: 90%;
        min-width: 370px;
        max-width: 992px;
        height: auto;
        background-color: #fefeff;
        box-shadow: #00000036 0px 1px 6px, #00000036 0px 1px 4px;
        border-radius: 4px;
    }
</style>
