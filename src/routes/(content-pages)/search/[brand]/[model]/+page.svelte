<script>
    import Loader from "../../../../../lib/icons/whiteLoader.svelte"
    import { page } from '$app/stores';
    let loader = Loader

    export let data
    const {years} = data
</script>



<div class="page">
    {#if !years}
        <svelte:component this={loader} />
    {:else}
        <div class="header">
            <button class="optionBtns">Все машины</button>
            <button class="optionBtns">Все модели</button>
        </div>
        <div class="linksGrid">
            {#each years as year}
                <a href={`${$page.url}/${year}`} class="link">{year}</a>
            {/each}
        </div>  
    {/if}
</div>


<style>
    .optionBtns:hover{
        text-decoration: underline;
    }
    .optionBtns{
        margin: 4px 2px;
        padding: 8px 16px;
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        min-height: 36px;
        height: auto;
        border-radius: 4px;
        border: none;
        font-family: var(--font-roboto);
        font-size: 14px;
        letter-spacing: 0.1px;
        line-height: 20px;
        color: rgb(54, 77, 102);
        background-color: rgb(228, 232, 237);
    }
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
        min-height: 60vh;
        min-width: 370px;
        max-width: 992px;
        height: auto;
        background-color: #fefeff;
        box-shadow: #00000036 0px 1px 6px, #00000036 0px 1px 4px;
        border-radius: 4px;
    }
</style>
