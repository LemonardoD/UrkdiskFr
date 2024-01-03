import HttpClient from "../api/httpClient";
import type { CarDetailsResp, RimInfo } from "./types";

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
		return this.instance.get<CarDetailsResp>("/car/brands");
	};

	public getModels = (brand: string) => {
		return this.instance.get<CarDetailsResp>(`/car/models/${brand}`);
	};

	public getYears = (brand: string, model: string) => {
		return this.instance.get<{ message: number[] }>(`/car/years/${brand}/${model}`);
	};

	public getPopularRims = () => this.instance.get<{ message: RimInfo[] }>(`/rims/popular`);

	public search = (rimName: string) => this.instance.get<{ message: RimInfo[] }>(`/search/by-naming/${rimName}`);

	public getDiyOrder = (orderId: string | number) => this.instance.get<GetDiyOrder>(`/admin/orders/normalDiy/${orderId}`);

	public getFollowerOrder = (orderId: string | number) =>
		this.instance.get<GetShopOrder>(`/admin/orders/influencerShop/${orderId}`);

	public getInfluencers = (limit: number, offset: number, search: string) => {
		const body: GetInfluencersReqBody = {
			limit,
			offset,
		};
		if (search) body.search = search;
		return this.instance.post<GetInfluencersResBody>("/admin/influencers", body);
	};

	public getInfluencer = (id: string | number) => this.instance.get<GetInfluencerResBody>(`/admin/influencers/${id}`);

	public setInfluencerScents = (body: SetInfluencerScentsReqBody) => this.instance.put("/admin/update-influencer-scents", body);

	public getScents = (orderId: number | string) => this.instance.get<GetScentsResBody>(`/admin/scents?orderId=${orderId}`);

	public setDiyScents = (body: SetScentsReqBody) => this.instance.put("/admin/orders/normalDiy/scents", body);

	public setInfluencerDiyScents = (body: SetInfluencerDiyScentsReqBody) =>
		this.instance.put("/admin/orders/influencerDiy/scents", body);

	public setShopOrderScents = (body: SetShopOrderScentsReqBody) => this.instance.put("/admin/orders/influencerShop/scents", body);

	public saveDiecut = (formData: FormData): Promise<string> => this.instance.postForm("/admin/upload-diecut", formData);

	public saveInfluencerDiecut = (formData: FormData): Promise<string> =>
		this.instance.postForm("/admin/upload-diecut-influencer", formData);

	public getAllScents = () => this.instance.get<GetAllScentsResBody>("/admin/influencer/scents");

	public approveOrder = (orderId: number | string) => this.instance.put("/admin/orders/approve", { orderId });

	public getFollowerDiyJSON = (orderNames: string[]) =>
		this.instance.post<GetFollowerDiyJson>("/admin/influencerDiy-csv", { orderNames });
}

export default Ai;
