import type { PageLoad } from "../../.././$types";
import { aiApi } from "../../../../api";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	const getPageinfo = async () => {
		return Promise.all([await aiApi.getBrands(), await aiApi.getRimsByBrand(params.rimBrand)]).then(values => {
			return { brands: values[0].message, rimInfo: values[1].message, rimBrand: params.rimBrand };
		});
	};
	return await getPageinfo();
};
