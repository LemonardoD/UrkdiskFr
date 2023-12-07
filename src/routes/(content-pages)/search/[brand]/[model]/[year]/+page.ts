import { error } from "@sveltejs/kit";
import type { PageLoad } from "../../../../.././$types";
import type { ConfigOptions } from "../../../../../../types";

export const load: PageLoad = async ({ fetch, params }) => {
	const getCarConfig = async (brand: string, model: string, year: string) => {
		const apiResponse = await fetch(`https://ukrdisk-be.fly.dev/car/config/${brand}/${model}/${year}`, {
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
		const apiInfo: { message: ConfigOptions } = await apiResponse.json();

		return { configs: apiInfo.message };
	};

	return await getCarConfig(params.brand, params.model, params.year);
};
