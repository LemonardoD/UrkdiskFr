import { aiApi } from "../api";
import { isEqual } from "lodash";
import type { RimConfig } from "./types";
import { clientCar, crossFading, currentConfig, currentPhoto, currentPhotoIndex, fitToClientCar } from "./stores";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const url4ChangeCar = (url: URL) => {
	const carBrand = url.searchParams.get("carBrand") || "";
	const carModel = url.searchParams.get("carModel") || "";
	const carYear = url.searchParams.get("carYear") || "";
	if (typeof window !== "undefined" && window.innerWidth < 550) {
		return "/search";
	}
	if (carBrand.length > 0) {
		return `/rims-by-car?brand=${carBrand}&model=${carModel}&year=${carYear}&rimBrand=all&selectedDiameters=all`;
	}
	return "/rims?selectedDiameters=all";
};

export const setMainImage = (imageUrl: string, images: string[]) => {
	currentPhoto.set(imageUrl);
	currentPhotoIndex.set(images.indexOf(imageUrl));
};

export const nextImg = (images: string[]) => {
	let index = 0;
	currentPhotoIndex.subscribe(value => (index = value));
	if (index + 1 < images.length) {
		currentPhoto.set(images[index + 1]);
		currentPhotoIndex.update(el => el + 1);
	} else {
		currentPhoto.set(images[0]);
		currentPhotoIndex.set(0);
	}
};

export const previousImg = (images: string[]) => {
	let index = 0;
	currentPhotoIndex.subscribe(value => (index = value));
	if (index - 1 >= 0) {
		currentPhoto.set(images[index - 1]);
		currentPhotoIndex.update(el => el - 1);
	} else {
		currentPhoto.set(images.slice(-1)[0]);
		currentPhotoIndex.set(images.length - 1);
	}
};

export const onLoad = async () => {
	let photo = "";
	crossFading.set(true);
	await sleep(150);
	crossFading.set(false);
	currentPhoto.subscribe(value => (photo = value));
	return photo;
};

export const setCurrentConfig = (configurations: RimConfig[], page: URL) => {
	configurations.forEach(el => {
		if (
			el.boltPattern === page.searchParams.get("pcd") &&
			el.diameter === page.searchParams.get("diameter") &&
			el.width === page.searchParams.get("width")
		) {
			currentConfig.set(el);
		}
	});
};

export const changeConfig = async (config: RimConfig, url: URL, rimBrand: string) => {
	const newUrl = new URL(url);
	newUrl.searchParams.set("diameter", config.diameter);
	newUrl.searchParams.set("width", config.width);
	newUrl.searchParams.set("pcd", config.boltPattern);
	history.replaceState(history.state, "", newUrl.toString());
	currentConfig.set(config);
	if (typeof url.searchParams.get("carBrand") === "string") {
		await fitToCar(rimBrand, url, config);
	}
};

export const fitToCar = async (rimBrand: string, url: URL, passedConfig: RimConfig) => {
	const carBrand = url.searchParams.get("carBrand") || "";
	const carModel = url.searchParams.get("carModel") || "";
	const carYear = url.searchParams.get("carYear") || "";
	const requestData = {
		brand: carBrand,
		model: carModel,
		year: Number(carYear),
		rimBrand: rimBrand,
	};
	const apiInfo = await aiApi.getByCar(requestData);
	const { rimList } = apiInfo.message;
	fitToClientCar.set(false);
	rimList.forEach(rim => {
		rim.config.forEach(config => {
			if (isEqual(config, passedConfig)) {
				fitToClientCar.set(true);
			}
		});
	});
	clientCar.set(`${carBrand} ${carModel} ${carYear}`);
	return;
};
