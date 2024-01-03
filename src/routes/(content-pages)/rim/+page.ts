import type { PageLoad } from "./$types";
import { aiApi } from "../../../api";

export const ssr = false;

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get("id");

	const apiResp = await aiApi.getRimById(id!);

	return apiResp.message;
};
