<script lang="ts">
	import type { RimInfo } from "../types";
	import RimCard from "./rimCard.svelte";

    export let rimData: RimInfo[]
   
</script>

<div class="rimContent">
    {#each rimData as rim}
        <RimCard rimId={rim.rimId} diameter={rim.diameters} price={rim.minPrice} img={rim.image} brand={rim.brand} name={rim.name} />
    {/each}
</div>


<style>
    .rimContent{
        margin: 32px auto 10px;
        height: auto;
        display: grid;
    }
 @media(min-width: 375px) and (max-width: 554px){
        .rimContent{
            width: 90%;
            justify-content: space-evenly;
            grid-template-columns: auto; 
        }
    }
    @media(min-width: 555px) and (max-width: 809px){
        .rimContent{
            width: 90%;
            justify-content: space-evenly;
            grid-template-columns: auto auto; 
        }
    }
    @media(min-width: 810px) and (max-width: 1023px){
        .rimContent{
            width: 90%;
            justify-content: space-evenly;
            grid-template-columns: auto auto auto; 
        }
    }
    @media(min-width: 1024px){
        .rimContent{
            width: 1024px;
            justify-content: space-between;
            grid-template-columns: auto auto auto auto;
        }
    }
</style>