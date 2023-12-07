<script>
    import Loader from "../../../lib/icons/whiteLoader.svelte";
    import LinkGroup from "../../../components/searchLinks.svelte";
    let loader = Loader

    export let data
    const {brands} = data

</script>



<div class="page">
    {#if !brands}
        <svelte:component this={loader} />
    {:else}
        <div class="header"/>
        <LinkGroup url="/search" array={brands}/>
    {/if}
</div>


<style>
    .header{
        padding: 0px;
        width: 100%;
        min-height: 60px;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
    }
   
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
