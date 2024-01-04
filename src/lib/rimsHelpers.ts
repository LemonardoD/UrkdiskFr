import type { DiameterEventChange, RimInfo } from "./types";

export const handleDiameterChange = (event: DiameterEventChange, diameters: string[], url: URL) => {
	const selected = event.detail.selected;
	const newlySelectedDiameters = diameters.filter((o, i) => selected[i]);
	changeDiameters(newlySelectedDiameters, url);
	return selected;
};

const changeDiameters = (diameters: string[], url: URL) => {
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

export const rimDiametersOnCard = (diameters: string[]) => {
	if (diameters.length > 2) {
		return `${diameters[0]}’’ - ${diameters[diameters.length - 1]}`;
	}
	if (diameters.length === 2) {
		return `${diameters[0]}’’, ⌀${diameters[diameters.length - 1]}`;
	}
	return diameters[0];
};

export const searchDiameters = (paramDiameters: string | null, diameters: string[]) => {
	if (!paramDiameters) return diameters;
	return paramDiameters.split(",");
};
