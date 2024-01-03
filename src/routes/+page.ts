import { aiApi } from "../api";
import type { PageLoad } from "./(content-pages)/rim/$types";
export const ssr = false;

export const load: PageLoad = async () => {
	const getPageinfo = async () => {
		return Promise.all([await aiApi.getBrands(), await aiApi.getPopularRims()]).then(values => {
			return { brands: values[0].message, popularRims: values[1].message };
		});
	};
	return await getPageinfo();
};
