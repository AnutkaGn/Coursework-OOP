import { HttpFactoryService } from "src/shared/services/http-factory.service";
import type { CreatePaymentPayload, PaymentResponce } from "./payment.type";

export class PaymentService {
	private httpService = new HttpFactoryService().createAuthHttpService();

	public async create(data: CreatePaymentPayload): Promise<PaymentResponce> {
		return this.httpService.post<PaymentResponce, CreatePaymentPayload>(
			"payment",
			data,
		);
	}
}

export const paymentService = new PaymentService();
