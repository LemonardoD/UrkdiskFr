export interface RimInfo {
	rimId: string;
	brand: string;
	name: string;
	config: RImConfig[];
	minPrice: number[];
	diameters: string[];
	image: string;
}

export interface RImConfig {
	width: number;
	offset: number;
	diameter: number;
	boltPattern: string;
	centralBore: number;
	price: number;
}
