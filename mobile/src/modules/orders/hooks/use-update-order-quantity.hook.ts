import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
	orderService,
	UpdateOrderDetailsPayload,
	OrderResponce,
} from "src/services/order";
import { Messages } from "src/shared/constants";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { IServerError } from "src/shared/services/types";
import { useOrderStore } from "src/store";

export const useUpdateOrderDetailQuantity = (orderId: string) => {
	const { setTotalAmount } = useOrderStore();

	const updateOrderDetail = async (
		payload: UpdateOrderDetailsPayload,
	): Promise<OrderResponce> => {
		return await orderService.updateOrderDetailQuantity(orderId, payload);
	};

	const { mutateAsync, isPending, error } = useMutation<
		OrderResponce,
		AxiosError<IServerError>,
		UpdateOrderDetailsPayload
	>({
		mutationFn: updateOrderDetail,
		onSuccess: (response) => {
			showToast(ToastType.SUCCESS, Messages.QUANTITY_UPDATED);
			setTotalAmount(orderId, response.data.totalAmount);
		},
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	return {
		updateQuantity: mutateAsync,
		isLoading: isPending,
		error,
	};
};
