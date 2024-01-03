<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	import InputEl from "../components/searchField.svelte";
	import { aiApi } from "../api";
	import { goto } from "$app/navigation";

	export let brands: string[];
	export let withHeader: boolean;
	export let rimBrand: string;
	export let byCar: boolean;
	export let allBrands: boolean;

	let models: string[] = [];
	let years: number[] = [];
	let selectedBrand = $page.url.searchParams.get("brand") || "";
	let selectedModel = $page.url.searchParams.get("model") || "";
	let selectedYear = $page.url.searchParams.get("year") || "";
	let fieldsError = false;

	const fetchModels = async () => {
		models = (await aiApi.getModels(selectedBrand)).message;
		years = [];
		selectedModel = "";
		selectedYear = "";
	};
	const fetchYears = async () => {
		years = (await aiApi.getYears(selectedBrand, selectedModel)).message;
		selectedYear = "";
	};

	const findByCar = async () => {
		if (selectedBrand.length === 0 || selectedModel.length === 0 || selectedYear.length === 0) {
			fieldsError = true;
		} else {
			goto(`/rims-by-car?brand=${selectedBrand}&model=${selectedModel}&year=${selectedYear}&rimBrand=${rimBrand}`);
		}
	};

	onMount(async () => {
		if (selectedBrand.length > 0 && selectedModel.length > 0 && selectedYear.length > 0) {
			models = (await aiApi.getModels(selectedBrand)).message;
			years = (await aiApi.getYears(selectedBrand, selectedModel)).message;
		}
	});
	$: {
		if (selectedBrand.length > 0 && selectedModel.length > 0 && selectedYear.toString().length > 0) {
			fieldsError = false;
		}
	}
</script>

<div class="carSelector">
	{#if withHeader}
		<p class="selectTitle">Подбор по авто</p>
	{/if}
	<InputEl
		bind:selected={selectedBrand}
		disabledVal="Марка"
		change={fetchModels}
		array={brands.sort()}
	/>
	<InputEl
		bind:selected={selectedModel}
		disabledVal="Модель"
		change={fetchYears}
		array={models.sort()}
	/>
	<InputEl
		bind:selected={selectedYear}
		disabledVal="Год"
		array={years.sort((el1, el2) => {
			return el2 - el1;
		})}
	/>
	<p
		class={fieldsError
			? `errorMessage ${
					withHeader ? "messageMain" : allBrands ? "allBrandsErrmessage" : byCar ? "messageSecondaryByCar" : "messageSecondary"
			  }`
			: "hideErrMessage"}
	>
		Пожалуйста, заполните все поля
	</p>
	<button
		class="searchByCarBtn {withHeader ? 'main' : 'rimSec'}"
		on:click={findByCar}>Подобрать</button
	>
</div>

<style>
	.messageMain {
		bottom: 62px;
	}
	.messageSecondaryByCar {
		bottom: 54px;
	}
	.messageSecondary {
		bottom: 54px;
	}
	.allBrandsErrmessage {
		bottom: 74px;
	}
	.hideErrMessage {
		display: none;
	}
	.errorMessage {
		position: absolute;
		margin: 0;
		font-family: inherit;
		font-size: 10.5px;
		color: red;
	}
	.selectTitle {
		margin: 2px 0px 2px;
		font-family: inherit;
		font-size: 18px;
		letter-spacing: 0.6px;
		font-weight: 500;
		color: #425f80c7;
	}
	.main {
		margin-top: 32px;
		font-weight: 500;
	}
	.rimSec {
		margin-top: 16px;
	}
	.searchByCarBtn:hover {
		opacity: 0.9;
	}
	.searchByCarBtn {
		cursor: pointer;
		width: 100%;
		height: 36px;
		font-family: inherit;
		font-size: 14px;
		letter-spacing: 0.5px;
		opacity: 1;
		border: none;
		border-radius: 2px;
		color: #fff;
		background-color: #507298;
	}
	.carSelector {
		width: 212px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	@media (max-width: 800px) {
		.messageSecondaryByCar {
			bottom: 134px;
		}
		.messageSecondary {
			bottom: 154px;
		}
	}
	@media (max-width: 500px) {
		.selectTitle {
			font-size: 14px;
			letter-spacing: 0.5px;
		}
	}
</style>
