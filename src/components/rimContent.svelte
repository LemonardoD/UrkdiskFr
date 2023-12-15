<script lang="ts">
	import type { RimInfo } from "../types";
	import RimCard from "./rimCard.svelte";

    export let rimData: RimInfo[]

    let rimInfo: RimInfo[]
    let currentPage = 1

    $:{
        rimInfo = rimData
        rimInfo = rimInfo.slice(0, currentPage*40)
    }

</script>

{#if rimInfo.length === 0}
    <div class="dontFind">
        <p>Диски не найдены</p>
    </div>
{:else if rimInfo.length < 4}
    <div class="rimContentSmall">
        {#each rimInfo as rim}
            <RimCard rimId={rim.rimId} diameters={rim.diameters} price={rim.minPrice} img={rim.image} brand={rim.brand} name={rim.name} config={rim.config}/>
        {/each}
    </div>
{:else}
    <div class="rimContent">
        {#each rimInfo as rim}
            <RimCard rimId={rim.rimId} diameters={rim.diameters} price={rim.minPrice} img={rim.image} brand={rim.brand} name={rim.name} config={rim.config}/>
        {/each}
    </div>
{/if}
{#if currentPage * 40 < rimData.length}
    <div class="btnWraper">
        <button class="showMoreBtn" on:click={ ()=>{currentPage+=1}}>Показать еще</button>
    </div>
{/if}



<style> 
    .dontFind{
        display: flex;
        justify-content: space-around;
        text-align: center;
        font-family: inherit;
        font-size: 18px;
        margin: 40px;
        color: #333333;
    }
    .btnWraper{
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }
    .showMoreBtn:hover{
        opacity: 0.8;
    }
    .showMoreBtn{
        cursor: pointer;
        text-decoration: none;
        padding: 14px;
        width: 460px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        color: #425f80;
        line-height: 12px;
        letter-spacing: 0.5px;
        text-align: center;
        overflow: hidden;
        border: none;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: #51739833 0px 2px 4px 0px;
    }
    .rimContentSmall{
        margin: 32px auto 10px;
        height: auto;
        display: flex;
        width: 992px;
        gap: 26.6px;
        justify-content: flex-start;
    }
    .rimContent{
        margin: 10px auto 12px;
        height: auto;
        display: grid;
    }
    @media(min-width: 375px) and (max-width: 554px){
        .showMoreBtn{
            width: 65%;
        }
        .rimContentSmall{
            width: 360px;
            align-items: center;
            flex-direction: column;
        }
        .rimContent{
            width: 90%;
            justify-content: space-evenly;
            grid-template-columns: auto; 
        }
    }
    @media(min-width: 555px) and (max-width: 1024px){
        .rimContentSmall{
            width: 80%;
            display: grid;
            justify-content: space-between;
            grid-template-columns: auto auto auto; 
        }
        .rimContent{
            width: 100%;
            column-gap: 16px;
            row-gap: 0px;
            grid-template-columns: auto auto auto; 
        }
    }
    @media(min-width: 810px) and (max-width: 1044px){
        .rimContentSmall{
            width: 90%;
            justify-content: center;
        }
        .rimContent{
            row-gap: 0px;
            width: 80%;
            justify-content: space-evenly;
            grid-template-columns: auto auto auto; 
        }
    }
    @media(min-width: 1045px){
        .rimContent{
            width: 992px;
            justify-content: space-between;
            grid-template-columns: auto auto auto auto;
        }
    }
</style>