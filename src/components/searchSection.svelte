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
            {#if ifSearch}
                <p class="byCar">{`Подбор по авто / ${selectedBrand} / ${selectedModel} / ${selectedYear}`}</p>
            {/if}
            <p class="title">Литые диски {title}<br></p>
            {#if ifSearch}
                <p class="text">{`Диски на ${selectedBrand} ${selectedModel} ${selectedYear}`}</p>
            {:else}
                <p class="text">Вы можете выбрать ваш автомобиль в фильтрах</p>
            {/if}
        </div>
        <div class="searchBycar">
            <div class="fieldTitle">Авто</div>
            <div class="fieldSection selCar">
                <CarSelector withHeader={false} brands={brands} rimBrand={rimBrand}/>
            </div>
        </div>
        <div class="diameters">
            <div class="fieldTitle diameterTitle">Диаметр</div>
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
    .diameterTitle{
        border-top-right-radius: 4px;
    }
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
        padding-left: 2px;
    }
    .checkBox{
        border-radius: 2px !important;
        border: 2px solid #517399;
        cursor: pointer;
        width: 15px;
        height: 14px;
        appearance: none;
        accent-color: #517399;
        margin-right: 4px;
    }
    .checkBox:checked {
        border: 2px solid #517399;
        cursor: pointer;
        width: 15px;
        height: 14px;
        appearance: auto;
        accent-color: #517399;
        margin-right: 4.5px;
    }
    .fieldSection{
        margin-top: 4px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    .text{
        height: 18px;
        font-size: 15px;
        letter-spacing: 0.71px;
        color: #404040;
        margin: 0;
    }
    .byCar{
        height: 15px;
        margin: 0px;
        font-family: inherit;
        font-size: 13px;
        letter-spacing: 0.71px;
        color: #7d7d7d;
    }
    .title{
        margin-top: 5px;
        margin-bottom: 4px;
        font-size: 20px;
        height: 20px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.71px;
        color: #181818;
        font-family: "Roboto", sans-serif;
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
    .fieldTitle{
        padding: 8.5px 8px 8.5px 14px;
        font-family: inherit;
        font-size: 13px;
        color: #000000de;
        letter-spacing: 0.3px;
        background-color: #f4f9fa;
    }
    
    @media(max-width: 800px){
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
    @media(min-width: 801px){
        .diameterPick{
            width: 100%;
        }
        .title{
            width: 100%;
        }
        .fieldTitle{
            border-left: 2px solid #517399;
        }
        .selCar{
            margin-right: 16px;
        }
        .card{
            margin-top: 16px;
            margin-bottom: 16px;
            position: relative;
            width: 100%;
        }
        .searchBycar{
            width: 251px;
        }

        .diameters{
            width: 235px;
        }
        .cardTitle{
            padding-top: 16px;
            padding-left: 16px;
            width: 490px;
            display: flex;
            flex-direction: column;
            align-items: start;
        }
        .cardContent{
            width: 96%;
            max-width: 992px;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }
    
   
</style>