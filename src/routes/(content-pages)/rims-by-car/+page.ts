import type { PageLoad } from "../../$types";
import { aiApi } from "../../../api";
export const ssr = false;

export const load: PageLoad = async ({ url }) => {
	const requestData = {
		brand: url.searchParams.get("brand")!,
		model: url.searchParams.get("model")!,
		year: Number(url.searchParams.get("year")),
		rimBrand: url.searchParams.get("rimBrand")!,
	};
	const getPageinfo = async () => {
		return Promise.all([await aiApi.getBrands(), await aiApi.getByCar(requestData)]).then(values => {
			return { brands: values[0].message, rimInfo: values[1].message };
		});
	};
	return await getPageinfo();
};
