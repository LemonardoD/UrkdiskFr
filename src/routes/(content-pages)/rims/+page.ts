import { error } from "@sveltejs/kit";
import type { PageLoad } from "../.././$types";
import type { RimInfo } from "../../../types";

export const load: PageLoad = async ({ fetch }) => {
	const getPageinfo = async () => {
		const getCarBrands = async () => {
			const apiResponse = await fetch(`https://ukrdisk-be.fly.dev/car/brands`, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "error",
				referrerPolicy: "no-referrer",
			});
			if (apiResponse.status !== 200) {
				throw error(apiResponse.status, apiResponse.statusText);
			}
			const apiInfo: { message: string[] } = await apiResponse.json();

			return apiInfo.message;
		};
		const getCPopularRims = async () => {
			const apiResponse = await fetch(`https://ukrdisk-be.fly.dev/rims/by-brand/all`, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "error",
				referrerPolicy: "no-referrer",
			});
			if (apiResponse.status !== 200) {
				throw error(apiResponse.status, apiResponse.statusText);
			}
			const apiInfo: { message: { rimList: RimInfo[]; diameters: string[] } } = await apiResponse.json();

			return apiInfo.message;
		};
		return { brands: await getCarBrands(), rimInfo: await getCPopularRims() };
	};

	return await getPageinfo();
};
