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
</style>
