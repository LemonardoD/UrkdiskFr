export interface RimInfo {
	rimId: string;
	brand: string;
	name: string;
	config: RimConfig[];
	minPrice: number[];
	diameters: string[];
	image: string;
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
