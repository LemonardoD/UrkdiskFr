import type { PageLoad } from "../../../../../.././$types";
import { aiApi } from "../../../../../../../api";

export const load: PageLoad = async ({ url }) => {
	const requestData = {
		diameter: url.searchParams.get("diameter") || "",
		width: url.searchParams.get("width") || "",
		mountingHoles: url.searchParams.get("pcd") || "",
	};
	return { rims: (await aiApi.searchByConfig(requestData)).message.rimList };
};
