import { error } from "@sveltejs/kit";
import type { RimInfo } from "../types";

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
