import { HttpFactoryService } from "src/shared/services/http-factory.service";
import type {
	CreateOrderPayload,
	DeleteOrderDetailResponce,
	GetAllOrdersQuery,
	GetOrderResponse,
	GetOrdersResponse,
	OrderResponce,
	UpdateOrderDetailsPayload,
} from "./order.type";

export class OrderService {
	private httpService = new HttpFactoryService().createAuthHttpService();

	public async getOrders(
		params: GetAllOrdersQuery,
	): Promise<GetOrdersResponse> {
		const url = this.httpService.createQueryLink("order", params);
		return this.httpService.get<GetOrdersResponse>(url);
	}

	public async getOrderById(id: string): Promise<GetOrderResponse> {
		return this.httpService.get<GetOrderResponse>(`order/${id}`);
	}

	public async createOrder(data: CreateOrderPayload): Promise<OrderResponce> {
		return this.httpService.post<OrderResponce, CreateOrderPayload>(
			"order",
			data,
		);
	}

	public async updateOrderDetailQuantity(
		id: string,
		payload: UpdateOrderDetailsPayload,
	): Promise<OrderResponce> {
		return this.httpService.patch<OrderResponce, UpdateOrderDetailsPayload>(
			`order/${id}`,
			payload,
		);
	}

	public async deleteOrderDetail(
		id: string,
	): Promise<DeleteOrderDetailResponce> {
		return this.httpService.delete<DeleteOrderDetailResponce>(
			`order/order-details/${id}`,
		);
	}
}
export const orderService = new OrderService();
