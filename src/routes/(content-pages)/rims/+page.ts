import type { PageLoad } from "../.././$types";
import { aiApi } from "../../../api";

export const ssr = false;

export const load: PageLoad = async () => {
	const getPageinfo = async () => {
		return Promise.all([await aiApi.getBrands(), await aiApi.getAllRims()]).then(values => {
			return { brands: values[0].message, rimInfo: values[1].message };
		});
	};
	return await getPageinfo();
};
