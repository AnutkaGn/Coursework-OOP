import { PaymentStatus } from "src/shared/enum/payment-status.enum";

export interface Payment {
	id: string;
	orderId: string;
	transactionId: string;
	totalAmount: number;
	paymentStatus: PaymentStatus;
}

export interface PaymentResponce {
	statusCode: number;
	message: string;
	data: Payment;
}

export interface CreatePaymentPayload {
	orderId: string;
	totalAmount: number;
}
