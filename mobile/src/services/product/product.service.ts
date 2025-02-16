import { HttpFactoryService } from "src/shared/services/http-factory.service";
import type {
	GetProductsResponse,
	GetProductByIdResponse,
	GetProductsParams,
} from "./product.types";

export class ProductService {
	private httpService = new HttpFactoryService().createAuthHttpService();

	public async getProducts(
		params: GetProductsParams,
	): Promise<GetProductsResponse> {
		const url = this.httpService.createQueryLink("product", params);
		return this.httpService.get<GetProductsResponse>(url);
	}

	public async getProductById(id: string): Promise<GetProductByIdResponse> {
		return this.httpService.get<GetProductByIdResponse>(`product/${id}`);
	}
}
export const productService = new ProductService();
