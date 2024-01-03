import isEqual from "lodash/isEqual";
import type { RimConfig, RimInfo } from "./types";
import { aiApi } from "../api";

export const clickHandle = (show: boolean) => {
	return !show;
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const changeDiameters = (diameters: string[], url: URL) => {
	const newUrl = new URL(url);
	newUrl.searchParams.set("selectedDiameters", diameters.join(",") || "all");
	history.replaceState(history.state, "", newUrl.toString());
};

export const filterRimList = (list: RimInfo[], selectedDiameters: string[]) => {
	return list
		.map(rim => {
			const filteredConfigs = rim.config.filter(config => selectedDiameters.includes(config.diameter));
			if (filteredConfigs.length > 0) {
				const minPrice = [...new Set(filteredConfigs.map(config => config.price))];
				const diameters = [...new Set(filteredConfigs.map(config => config.diameter))];
				return {
					...rim,
					config: filteredConfigs,
					minPrice: minPrice,
					diameters,
				};
			}
			return null;
		})
		.filter((rim): rim is RimInfo => rim !== null);
};

export const fitToCar = async (
	rimBrand: string,
	carBrand: string,
	carModel: string,
	carYear: string,
	passedConfig: RimConfig
) => {
	const requestData = {
		brand: carBrand,
		model: carModel,
		year: Number(carYear),
		rimBrand: rimBrand,
	};
	const apiInfo = await aiApi.getByCar(requestData);
	const { rimList } = apiInfo.message;

	let fit = false;
	rimList.forEach(rim => {
		rim.config.forEach(config => {
			if (isEqual(config, passedConfig)) {
				fit = true;
			}
		});
	});
	return fit;
};

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
