import type { PageLoad } from "../../../.././$types";
import { aiApi } from "../../../../../api";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	return { years: (await aiApi.getYears(params.brand, params.model)).message };
};
