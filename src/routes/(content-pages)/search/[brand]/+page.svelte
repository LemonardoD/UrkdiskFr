<script>
    import LinkGroup from "../../../../components/searchLinks.svelte";
    import OptButtons from '../../../../components/optionButtons.svelte';
    import Loader from "../../../../lib/icons/whiteLoader.svelte"
    import { page } from '$app/stores';
    let loader = Loader

    export let data
    const {models} = data
</script>



<div class="page">
    {#if !models}
        <svelte:component this={loader} />
    {:else}
        <OptButtons number={2} url={$page.url.pathname}/>
        <LinkGroup array={models} url={$page.url.pathname}/>
    {/if}
</div>


<style>
    .page{
        margin: 16px auto 16px;
        padding: 16px;
        width: 90%;
        min-height: 60vh;
        min-width: 370px;
        max-width: 992px;
        height: auto;
        background-color: #fefeff;
        box-shadow: #00000036 0px 1px 6px, #00000036 0px 1px 4px;
        border-radius: 4px;
    }
</style>
