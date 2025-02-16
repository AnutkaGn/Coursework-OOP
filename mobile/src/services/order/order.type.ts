import { DeliveryStatus } from "src/shared/enum/delivery-status.enum";
import { PaymentStatus } from "src/shared/enum/payment-status.enum";
import { SortOrder } from "src/shared/enum/sort-order.enum";

// export interface Order {
// 	id: string;
// 	userId: string;
// 	totalAmount: number;
// 	paymentStatus: PaymentStatus;
// 	deliveryStatus: DeliveryStatus;
// 	createdAt: string;
// }

export interface GetAllOrdersQuery {
	paymentStatus?: PaymentStatus;
	deliveryStatus?: DeliveryStatus;
	sortDirection?: SortOrder;
	page: number;
	limit: number;
	[key: string]: unknown;
}

export interface GetOrdersResponse {
	statusCode: number;
	message: string;
	data: {
		data: Order[];
		total: number;
	};
}

// interface ProductInfo {
// 	name: string;
// 	description: string;
// 	price: number;
// 	stock: number;
// 	category: string;
// }

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
	createdAt: string;
	updatedAt: string;
}

export interface OrderDetailInfo {
	id: string;
	product: Product;
	quantity: number;
	priceAtPurchase: number;
}

export interface Order {
	id: string;
	totalAmount: number;
	paymentStatus: PaymentStatus;
	deliveryStatus: DeliveryStatus;
	createdAt: string;
	updatedAt: string;
	orderDetails: OrderDetailInfo[];
	payment: any | null;
}


// export interface OrderDetailInfo {
// 	id: string;
// 	orderId: string;
// 	productId: string;
// 	quantity: number;
// 	priceAtPurchase: number;
// 	product: ProductInfo;
// }

interface FullOrderInfo extends Order {
	orderDetails: OrderDetailInfo[];
}

export interface GetOrderResponse {
	statusCode: number;
	message: string;
	data: FullOrderInfo;
}

export interface CreateOrderDetails {
	productId: string;
	quantity: number;
	priceAtPurchase: number;
}

export interface CreateOrderPayload {
	totalAmount: number;
	orderDetails: CreateOrderDetails[];
}

export interface OrderResponce {
	statusCode: number;
	message: string;
	data: Order;
}

export interface UpdateOrderDetailsPayload {
	orderDetailId: string;
	quantity: number;
}

export interface DeleteOrderDetailResponce {
	statusCode: number;
	message: string;
}
