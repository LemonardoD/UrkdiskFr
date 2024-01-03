import type { PageLoad } from "../../.././$types";
import { aiApi } from "../../../../api";
export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	return { models: (await aiApi.getModels(params.brand)).message };
};
