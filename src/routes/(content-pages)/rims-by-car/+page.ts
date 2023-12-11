import { error } from "@sveltejs/kit";
import type { PageLoad } from "../../$types";
import type { RimInfo } from "../../../types";

export const load: PageLoad = async ({ fetch, url }) => {
	const requestData = {
		brand: url.searchParams.get("brand"),
		model: url.searchParams.get("model"),
		year: Number(url.searchParams.get("year")),
		rimBrand: url.searchParams.get("rimBrand"),
	};
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
				throw error(apiResponse.status);
			}
			const apiInfo: { message: string[] } = await apiResponse.json();

			return apiInfo.message;
		};
		const getRims = async () => {
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
				throw error(apiResponse.status);
			}
			const apiInfo: { message: { rimList: RimInfo[]; diameters: string[] } } = await apiResponse.json();
			return apiInfo.message;
		};
		return { brands: await getCarBrands(), rimInfo: await getRims() };
	};

	return await getPageinfo();
};
