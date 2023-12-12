import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { OneRimInfo } from "../../../types";

export const load: PageLoad = async ({ fetch, url }) => {
	const id = url.searchParams.get("id");

	const getRimByCOnfig = async () => {
		const apiResponse = await fetch(`https://ukrdisk-be.fly.dev/rims/by-id/${id}`, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			referrerPolicy: "no-referrer",
		});
		if (apiResponse.status !== 200) {
			throw error(apiResponse.status, apiResponse.statusText);
		}
		const apiInfo: { message: OneRimInfo } = await apiResponse.json();

		return { rimInfo: apiInfo.message };
	};

	return await getRimByCOnfig();
};
