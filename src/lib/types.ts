export interface RimInfo {
	rimId: string;
	brand: string;
	name: string;
	config: RimConfig[];
	minPrice: number[];
	diameters: string[];
	image: string;
}
export interface OrderConfig {
	width: string;
	offset: number;
	diameter: string;
	boltPattern: string;
	centralBore: number;
	price: number;
	rimId: string;
	link: string;
}
export interface OneRimInfo {
	rimId: string;
	brand: string;
	name: string;
	config: RimConfig[];
	minPrice: number[];
	diameters: string[];
	images: string[];
}

export interface RimConfig {
	width: string;
	offset: number;
	diameter: string;
	boltPattern: string;
	centralBore: number;
	price: number;
}

export interface ConfigOptions {
	pcd: string;
	rims: { width: string; diameter: string }[];
}

export type CarDetailsResp = {
	message: string[];
};

export type RimInfoResp = {
	message: RimInfo[];
};

export type SearchByCarBody = {
	brand: string;
	model: string;
	year: number;
	rimBrand: string;
};

export type RimAndDiameterInfoResp = { message: { rimList: RimInfo[]; diameters: string[] } };

export type DiameterEventChange = { detail: { selected: boolean[] } };

export type SearchByConfig = {
	diameter: string;
	width: string;
	mountingHoles: string;
};

export type OrderRimBody = { name: string; phone: string; email: string; config: RimConfig; url: string; rimId: string };

export type OrderPhCallBody = { phone: string };
export type OrderQuestBody = {
	question: string;
	phone: string;
	email?: string;
};
