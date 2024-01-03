import HttpClient from "../api/httpClient";
import type {
	CarDetailsResp,
	ConfigOptions,
	OneRimInfo,
	OrderPhCallBody,
	OrderQuestBody,
	OrderRimBody,
	RimAndDiameterInfoResp,
	RimInfoResp,
	SearchByCarBody,
	SearchByConfig,
} from "../lib/types";

class Ai extends HttpClient {
	private static instanceCached: Ai;

	private constructor() {
		super("https://ukrdisk-be.fly.dev/");
	}

	static getInstance = () => {
		if (!Ai.instanceCached) {
			Ai.instanceCached = new Ai();
		}
		return Ai.instanceCached;
	};

	public getBrands = () => {
		return this.instance.get<any, CarDetailsResp>("/car/brands");
	};

	public getModels = (brand: string) => {
		return this.instance.get<any, CarDetailsResp>(`/car/models/${brand}`);
	};

	public getYears = (brand: string, model: string) => {
		return this.instance.get<any, { message: number[] }>(`/car/years/${brand}/${model}`);
	};

	public getPopularRims = () => this.instance.get<any, RimInfoResp>(`/rims/popular`);

	public search = (rimName: string) => this.instance.get<any, RimInfoResp>(`/search/by-naming/${rimName}`);

	public getByCar = (body: SearchByCarBody) => this.instance.post<any, RimAndDiameterInfoResp>(`/search/by-car`, body);

	public getRimById = (id: string) => this.instance.get<any, { message: OneRimInfo }>(`/rims/by-id/${id}`);

	public getAllRims = () => this.instance.get<any, RimAndDiameterInfoResp>(`/rims/by-brand/all`);

	public getRimsByBrand = (rimBrand: string) => this.instance.get<any, RimAndDiameterInfoResp>(`/rims/by-brand/${rimBrand}`);

	public getCarConfig = (brand: string, model: string, year: string) =>
		this.instance.get<any, { message: ConfigOptions }>(`/car/config/${brand}/${model}/${year}`);

	public searchByConfig = (body: SearchByConfig) => this.instance.post<any, RimAndDiameterInfoResp>(`/search/by-config`, body);

	public sendOrderToApi = (body: OrderRimBody) => this.instance.post<any, { message: string }>(`/order/rims`, body);

	public sendOrderPhCall = (body: OrderPhCallBody) => this.instance.post<any, { message: string }>(`/order/phone-call`, body);

	public sendOrderQuest = (body: OrderQuestBody) => this.instance.post<any, { message: string }>(`/order/question`, body);
}

export default Ai;
