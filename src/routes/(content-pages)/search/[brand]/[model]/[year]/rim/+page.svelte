<script>
    import Loader from "../../../../../../../lib/icons/whiteLoader.svelte"
    import { page } from '$app/stores';
    import OptButtons from '../../../../../../../components/optionButtons.svelte';
    import LinkGroup from "../../../../../../../components/searchLinks.svelte";

    let loader = Loader

    export let data
    const {rims} = data
    console.log("file: +page.svelte:11 ~ rims:", rims.length)
</script>



<div class="page">
    {#if !data}
        <svelte:component this={loader} />
    {:else}
        <OptButtons number={5} url={$page.url.pathname}/>
        <LinkGroup rims={rims}/> 
    {/if}
</div>


<style>
   
    a{
        text-decoration: none;
    }

    .link:hover{
        text-decoration: underline;
    }

    .link{
        cursor: pointer;
        margin: 8px;
        padding: 12px;
        height: auto;
        font-family: inherit;
        font-size: 16px;
        line-height: 18px;
        color: #507299;
    }
    .linksGrid{
        padding: 16px;
        display: grid;
        justify-content: space-around;
        grid-template-columns: auto auto auto;
        justify-items: center;
    }
    .page{
        margin: 16px auto 16px;
        padding: 16px;
        width: 90%;
        min-height: 20vh;
        min-width: 370px;
        max-width: 992px;
        height: auto;
        background-color: #fefeff;
        box-shadow: #00000036 0px 1px 6px, #00000036 0px 1px 4px;
        border-radius: 4px;
    }
</style>
