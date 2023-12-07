export interface RimInfo {
	rimId: string;
	brand: string;
	name: string;
	config: RImConfig[];
	minPrice: number[];
	diameters: string[];
	image: string;
}

interface RImConfig {
	width: number;
	offset: number;
	diameter: number;
	boltPattern: string;
	centralBore: number;
	price: number;
}

export interface ConfigOptions {
	pcd: string;
	rims: { width: string; diameter: string }[];
}
