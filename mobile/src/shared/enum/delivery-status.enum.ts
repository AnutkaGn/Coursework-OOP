export enum DELIVERY_STATUS {
	PLACED = "PLACED",
	IN_TRANSIT = "IN_TRANSIT",
	DELIVERED = "DELIVERED",
}

export type DeliveryStatus =
	(typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];
