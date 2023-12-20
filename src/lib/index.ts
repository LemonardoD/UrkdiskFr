import { error } from "@sveltejs/kit";
import isEqual from "lodash/isEqual";
import type { RimConfig, RimInfo } from "../types";

export const getCarModels = async (brand: string) => {
	const apiResponse = await fetch(` https://ukrdisk-be.fly.dev/car/models/${brand}`, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "error",
		referrerPolicy: "no-referrer",
	});
	if (apiResponse.status !== 200) {
		throw error(apiResponse.status);
	}
	const apiInfo: { message: string[] } = await apiResponse.json();

	return apiInfo.message;
};

export const getCarYears = async (brand: string, model: string) => {
	const apiResponse = await fetch(` https://ukrdisk-be.fly.dev/car/years/${brand}/${model}`, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "error",
		referrerPolicy: "no-referrer",
	});
	if (apiResponse.status !== 200) {
		throw error(apiResponse.status);
	}
	const apiInfo: { message: number[] } = await apiResponse.json();

	return apiInfo.message;
};

export const searchRims = async (rimName: string) => {
	const apiResponse = await fetch(` https://ukrdisk-be.fly.dev/search/by-naming/${rimName}`, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "error",
		referrerPolicy: "no-referrer",
	});
	if (apiResponse.status !== 200) {
		throw error(apiResponse.status);
	}
	const apiInfo: { message: RimInfo[] } = await apiResponse.json();

	return apiInfo.message;
};

export const fitToCar = async (
	rimBrand: string,
	carBrand: string,
	carModel: string,
	carYear: string,
	passedConfig: RimConfig
) => {
	const requestData = {
		brand: carBrand,
		model: carModel,
		year: Number(carYear),
		rimBrand: rimBrand,
	};
	const apiResponse = await fetch(`https://ukrdisk-be.fly.dev/search/by-car`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestData),
		referrerPolicy: "no-referrer",
	});
	if (apiResponse.status !== 200) {
		throw error(apiResponse.status, apiResponse.statusText);
	}
	const apiInfo: { message: { rimList: RimInfo[]; diameters: string[] } } = await apiResponse.json();
	const { rimList } = apiInfo.message;
	let fit = false;
	rimList.forEach(rim => {
		rim.config.forEach(config => {
			if (isEqual(config, passedConfig)) {
				fit = true;
			}
		});
	});
	return fit;
};

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
