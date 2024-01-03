import { error } from "@sveltejs/kit";
import type { PageLoad } from "../../../../../.././$types";
import type { RimInfo } from "../../../../../../../api/types";

export const load: PageLoad = async ({ fetch, url }) => {
	const requestData = {
		diameter: url.searchParams.get("diameter"),
		width: url.searchParams.get("width"),
		mountingHoles: url.searchParams.get("pcd"),
	};
	const getRimByCOnfig = async () => {
		const apiResponse = await fetch(`https://ukrdisk-be.fly.dev/search/by-config`, {
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

		return { rims: apiInfo.message.rimList };
	};

	return await getRimByCOnfig();
};
