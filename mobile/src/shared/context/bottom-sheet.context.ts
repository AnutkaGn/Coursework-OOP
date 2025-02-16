import { createContext, RefObject, useState } from "react";
import { PaymentStatus } from "../enum/payment-status.enum";
import { DeliveryStatus } from "../enum/delivery-status.enum";
import { SORT_ORDER, SortOrder } from "../enum/sort-order.enum";
import BottomSheet from "@gorhom/bottom-sheet";

type ValueOf<T> = T[keyof T];

export enum BottomSheetData {
	PAYMENT_STATUS = "payment",
	DELIVERY_STATUS = "delivery",
	DATE = "date",
}

export interface IBottomSheetContext {
	sheetView?: ValueOf<typeof BottomSheetData>;
	showSheet?: (view: ValueOf<typeof BottomSheetData>) => void;
	paymentStatusFilter?: PaymentStatus | null;
	setPaymentStatusFilter?: (value: PaymentStatus | null) => void;
	deliveryStatusFilter?: DeliveryStatus | null;
	setDeliveryStatusFilter?: (value: DeliveryStatus | null) => void;
	sortOrderFilter?: SortOrder;
	setSortOrderFilter?: (value: SortOrder) => void;
}

export const BottomSheetContext = createContext<IBottomSheetContext>({});

export const useBottomSheet = (
	bottomSheetRef: RefObject<BottomSheet>,
): IBottomSheetContext => {
	const [sheetView, setSheetView] = useState<ValueOf<typeof BottomSheetData>>(
		BottomSheetData.PAYMENT_STATUS,
	);

	const showSheet = (view: ValueOf<typeof BottomSheetData>) => {
		setSheetView(view);
		bottomSheetRef.current?.expand();
	};

	const [paymentStatusFilter, setPaymentStatusFilter] =
		useState<PaymentStatus | null>(null);
	const [deliveryStatusFilter, setDeliveryStatusFilter] =
		useState<DeliveryStatus | null>(null);
	const [sortOrderFilter, setSortOrderFilter] = useState<SortOrder>(
		SORT_ORDER.DESC,
	);

	return {
		sheetView,
		showSheet,
		paymentStatusFilter,
		setPaymentStatusFilter,
		deliveryStatusFilter,
		setDeliveryStatusFilter,
		sortOrderFilter,
		setSortOrderFilter,
	};
};
