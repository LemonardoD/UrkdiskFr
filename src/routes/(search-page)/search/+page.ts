import type { PageLoad } from "../.././$types";
import { aiApi } from "../../../api";
export const ssr = false;

export const load: PageLoad = async () => {
	return { brands: (await aiApi.getBrands()).message };
};
