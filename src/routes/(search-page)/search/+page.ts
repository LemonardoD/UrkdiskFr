import { error } from "@sveltejs/kit";
import type { PageLoad } from "../.././$types";

export const load: PageLoad = async ({ fetch }) => {
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

		return { brands: apiInfo.message };
	};

	return await getCarBrands();
};
