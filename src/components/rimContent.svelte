<script lang="ts">
	import type { RimInfo } from "../types";
	import RimCard from "./rimCard.svelte";

    export let rimData: RimInfo[]

    let rimInfo: RimInfo[]

    $:{
        rimInfo = rimData
    }
</script>
{#if rimInfo.length < 4}
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




<style>
    .rimContentSmall{
        margin: 32px auto 10px;
        height: auto;
        display: flex;
        width: 1024px;
        gap: 26.6px;
        justify-content: flex-start;
    }
    .rimContent{
        margin: 32px auto 10px;
        height: auto;
        display: grid;
    }
    @media(min-width: 375px) and (max-width: 554px){
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
    @media(min-width: 555px) and (max-width: 809px){
        .rimContentSmall{
            width: 80%;
            display: grid;
            justify-content: space-evenly;
            grid-template-columns: auto auto; 
        }
        .rimContent{
            width: 90%;
            justify-content: space-evenly;
            grid-template-columns: auto auto; 
        }
    }
    @media(min-width: 810px) and (max-width: 1044px){
        .rimContentSmall{
            width: 90%;
            justify-content: center;
        }
        .rimContent{
            width: 90%;
            justify-content: space-evenly;
            grid-template-columns: auto auto auto; 
        }
    }
    @media(min-width: 1045px){
        .rimContent{
            width: 1024px;
            justify-content: space-between;
            grid-template-columns: auto auto auto auto;
        }
    }
</style>