<script lang="ts">
    import drDownIcon from "../lib/icons/down-arrow.png"
	import { getCarYears, getCarModels } from "$lib";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

    export let brands: string[]
    export let withHeader: boolean
    export let rimBrand: string

    let models: string[] = [];
    let years: number[] = [];
    let selectedBrand =  $page.url.searchParams.get("brand") || ""
    let selectedModel = $page.url.searchParams.get("model") || "";
    let selectedYear = $page.url.searchParams.get("year") || "";
    let fieldsError = false
    
    const fetchModels = async () =>{
        selectedModel = ''
        selectedYear = ''
        models = []
        years = []
        models = await getCarModels(selectedBrand);
    }
    const fetchYears = async () => {
        selectedYear = ''
        years = []
        years = await getCarYears(selectedBrand, selectedModel);
    }

    const findByCar = async () =>{
        if (selectedBrand.length === 0|| selectedModel.length === 0 || selectedYear.length === 0) {
            fieldsError = true
        } else {
            await goto(`/rims-by-car?brand=${selectedBrand}&model=${selectedModel}&year=${selectedYear}&rimBrand=${rimBrand}`)
            location.reload()
        }
    }

    onMount(async () => {
        if (selectedBrand.length > 0 && selectedModel.length > 0 && selectedYear.length > 0) {
            models = await getCarModels(selectedBrand);
            years = await getCarYears(selectedBrand, selectedModel);
        }
    })
    $: {
        if (selectedBrand.length > 0 && selectedModel.length > 0 && selectedYear.length > 0) {
            fieldsError = false
        }
    }
</script>


<div class="carSelector">
    {#if withHeader}
        <p class="selectTitle">Подбор по авто</p>
    {/if}
    <div class="selectContainer">
        <select bind:value={selectedBrand} on:change={fetchModels} disabled={brands.length ? false : true}>
            <option value="" disabled selected>Марка</option>
            {#if brands.length > 0}
                {#each brands as brand}
                    <option value={brand}>{brand}</option>
                {/each}
            {/if}
        </select>
        <img  class="drDownIcon" src={drDownIcon} alt="select">
    </div>
    <div class="selectContainer">
        <select bind:value={selectedModel} on:change={fetchYears} disabled={models.length ? false : true}>
            <option value="" disabled selected>Модель</option>
            {#if models.length > 0}
                {#each models as model}
                    <option value={model}>{model}</option>
                {/each}
            {/if}
        </select>
        <img  class="drDownIcon" src={drDownIcon} alt="select">
    </div>
    <div class="selectContainer">
        <select bind:value={selectedYear} disabled={years.length ? false : true}>
            <option value="" disabled selected>Год</option>
            {#if years.length > 0}
                {#each years as year}
                    <option value={year.toString()}>{year}</option>
                {/each}
            {/if}
        </select>
        <img  class="drDownIcon" src={drDownIcon} alt="select">
    </div>
    <p class={fieldsError ? "errorMessage message" : "hideErrMessage"}>Пожалуйста, заполните все поля</p>
    <button class="searchByCarBtn" on:click={findByCar}>Подобрать</button>
</div>

<style>
    .message{
        bottom: 64px;
    }
    .hideErrMessage{
        display: none;
    }
    .errorMessage{
        position: absolute;
        margin: 0;
        font-family: inherit;
        font-size: 10.5px;
        color: red;
    }
    .selectTitle{
        margin: 8px 0px 2px;
        font-family: inherit;
        font-size: 18px;
        letter-spacing: 0.6px;
        font-weight: 550;
        color: #425f80c7;
    }

    .selectContainer {
        position: relative;
        width: 100%;
    }

    .drDownIcon {
        position: absolute;
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
        height: 16px;
        width: 16px;
        pointer-events: none;
    }
    .searchByCarBtn{
        cursor: pointer;
        margin-top: 30px;
        width: 100%;
        height: 36px;
        font-family: inherit;
        font-size: 14px;
        letter-spacing: 0.5px;
        font-weight: 500;
        opacity: 1;
        border: none;
        border-radius: 4px;
        color: #fff;
        background-color: #507298;
    }
    option{
        background-color: #fff;
    }
    select:disabled{
        opacity: 0.5;
        cursor: auto;
    }
    .carSelector{
        width: 212px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    select{
        margin: 4px 0px;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        padding: 0px 8px;
        height: 30px;
        font-family: inherit;
        font-size: 13px;
        letter-spacing: 0px;
        text-overflow: ellipsis;
        color: #364d66;
        border: none;
        border-radius: 4px;
        background-color: #ebf1f4;
        appearance: none;
        overflow: auto;
        cursor: pointer;
        opacity: 0.8;
    }
</style>