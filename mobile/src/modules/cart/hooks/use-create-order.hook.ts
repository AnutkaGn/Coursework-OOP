import { useMutation } from "@tanstack/react-query";
import {
	orderService,
	CreateOrderPayload,
	OrderResponce,
} from "src/services/order";
import { AxiosError } from "axios";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { IServerError } from "src/shared/services/types";
import { Messages } from "src/shared/constants";

export const useCreateOrder = () => {
	const createOrder = async (
		data: CreateOrderPayload,
	): Promise<OrderResponce> => {
		return await orderService.createOrder(data);
	};

	const { mutateAsync, isPending, data, error } = useMutation<
		OrderResponce,
		AxiosError<IServerError>,
		CreateOrderPayload
	>({
		mutationFn: createOrder,
		onSuccess: (data) => {
			showToast(ToastType.SUCCESS, Messages.ORDER_CREATED);
		},
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	return {
		createOrder: mutateAsync,
		loading: isPending,
		data,
		error,
	};
};
