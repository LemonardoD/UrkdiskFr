import { error } from "@sveltejs/kit";
import type { PageLoad } from "../../../.././$types";

export const load: PageLoad = async ({ fetch, params }) => {
	const getCaryYears = async (brand: string, model: string) => {
		const apiResponse = await fetch(`https://ukrdisk-be.fly.dev/car/years/${brand}/${model}`, {
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

		return { years: apiInfo.message };
	};

	return await getCaryYears(params.brand, params.model);
};
