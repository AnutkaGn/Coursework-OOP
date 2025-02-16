import { SortOrder } from "src/shared/enum/sort-order.enum";

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	stock: number;
}

export interface GetProductsParams {
	page: number;
	limit: number;
	name?: string;
	sortByPrice?: SortOrder;
	[key: string]: unknown;
}

export interface GetProductsResponse {
	statusCode: number;
	message: string;
	data: {
		data: ProductListItem[];
		total: number;
	};
}

export interface GetProductByIdResponse {
	statusCode: number;
	message: string;
	data: Product;
}

export interface ProductListItem {
	id: string;
	name: string;
	price: number;
	category: string;
}
