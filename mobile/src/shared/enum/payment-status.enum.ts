export enum PAYMENT_STATUS {
	SUCCESS = "SUCCESS",
	FAILED = "FAILED",
	PENDING = "PENDING",
}

export type PaymentStatus =
	(typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
