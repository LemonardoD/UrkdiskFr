<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
    import CarSelector from "../components/carSelector.svelte"
	import { page } from "$app/stores";

    export let title: string
    export let brands: string[]
    export let diameters: string[]
    export let rimBrand = "all"
    export let ifSearch = false

    let selectedBrand =  $page.url.searchParams.get("brand");
    let selectedModel = $page.url.searchParams.get("model");
    let selectedYear = $page.url.searchParams.get("year");
	let selected = diameters.map(() => false)

    const dispatch = createEventDispatcher();

    onMount(() => {
        const urlDiameters = $page.url.searchParams.get("selectedDiameters") || "all";
        selected = diameters.map((diameter) => urlDiameters.split(',').includes(diameter));
        dispatch('diameterChange', { selected });
    });

    $: {
        dispatch('diameterChange', { selected });
    }
</script>

<div class="card">
    <div class="cardContent">
        <div class="cardTitle">
            <p class="title">Литые диски {title}<br></p>
            {#if ifSearch}
                <p class="text">{`Диски на ${selectedBrand} ${selectedModel} ${selectedYear}`}</p>
            {:else}
                <p class="text">Вы можете выбрать ваш автомобиль в фильтрах</p>
            {/if}
        </div>
        <div class="searchBycar">
            <div class="fieldTitle">Авто</div>
            <div class="fieldSection">
                <CarSelector withHeader={false} brands={brands} rimBrand={rimBrand}/>
            </div>
        </div>
        <div class="diameters">
            <div class="fieldTitle">Диаметр</div>
            <div class="fieldSection selDiameters">
                {#each diameters as diameter, index}
                    <div class="diameterPick">
                        <input id={diameter} 
                        class="checkBox" 
                        type="checkbox" 
                        value={diameter} 
                        name={diameter}
                        bind:checked={selected[index]}>
                        <label for={diameter}>{diameter}’’</label>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>


<style>
    .diameterPick{
        margin: 1px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    label{    
        width: 100%;
        font-family: inherit;
        font-size: 12px;
        color: #333333;
    }
    .checkBox{
        width: 14px;
        height: 14px;
        accent-color: #517399;
        border: 2px solid #517399;
        border-radius: 2px;
        margin-right: 4px;
    }

    .fieldSection{
        margin-top: 4px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    .text{
        font-size: 15px;
        letter-spacing: 0.71px;
        color: #404040;
        margin: 6px 0px 4px 16px;
    }
    .title{
        font-size: 20px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.71px;
        color: #181818;
        font-family: "Roboto-Medium", sans-serif;
        margin: 24px 0px 4px 16px;
    }

    .cardContent{
        padding: 0px;
        min-height: 218px;
        display: flex;
        background-color: white;
        border-radius: 4px;
        box-shadow: #0000001f 0px 1px 6px, #0000001f 0px 1px 4px;
    }
    .selDiameters{
        padding: 12px 16px 16px 16px;
    }
    .card{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
    }
    @media(max-width: 1044px){
        .text{
            text-align: center;
        }
        .card{
            margin:  16px auto 16px auto;
            width: 100%;
        }
        .fieldSection{
            padding: 20px 8px;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-evenly;
        }
        .fieldTitle{
            text-align: center;
            padding: 8px 8px 8px 14px;
            font-family: inherit;
            font-size: 13px;
            color: #000000de;
            background-color: #f4f9fa;
        }
        
        .cardTitle{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .searchBycar{
            width: 100%;
        }

        .diameters{
            width: 100%;
        }
        .cardContent{
            width: 90%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .diameterPick{
            width: 10%;
        }
    }
    @media(min-width: 1045px){
        .diameterPick{
            width: 100%;
        }
        .title{
            width: 100%;
        }
        .fieldTitle{
            padding: 8px 8px 8px 14px;
            font-family: inherit;
            font-size: 13px;
            border-left: 2px solid #517399;
            color: #000000de;
            background-color: #f4f9fa;
        }
        .card{
            margin-top: 16px;
            margin-bottom: 16px;
            position: relative;
            width: 100%;
        }
        .searchBycar{
            width: 25%;
        }

        .diameters{
            width: 25%;
        }
        .cardTitle{
            width: 50%;
        }
        .cardContent{
            width: 992px;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }
    
   
</style>