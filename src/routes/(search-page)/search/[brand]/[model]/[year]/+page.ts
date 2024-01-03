import type { PageLoad } from "../../../../.././$types";
import { aiApi } from "../../../../../../api";
export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	return { configs: (await aiApi.getCarConfig(params.brand, params.model, params.year)).message };
};
