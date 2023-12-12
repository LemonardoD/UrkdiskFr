<script lang="ts">
	import { getCarYears, getCarModels } from "$lib";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

    import InputEl from "../components/searchField.svelte"

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
        models = await getCarModels(selectedBrand);
        years = []
        selectedModel = ""
        selectedYear = ""
    }
    const fetchYears = async () => {
        years = await getCarYears(selectedBrand, selectedModel);
        selectedYear = ""
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
    <InputEl bind:selected={selectedBrand} disabledVal="Марка" change={fetchModels} array={brands}/>
    <InputEl bind:selected={selectedModel} disabledVal="Модель" change={fetchYears} array={models}/>
    <InputEl bind:selected={selectedYear} disabledVal="Год" array={years}/>
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
    .carSelector{
        width: 212px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
</style>