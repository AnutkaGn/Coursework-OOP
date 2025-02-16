import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
	orderService,
	GetOrderResponse,
	DeleteOrderDetailResponce,
} from "src/services/order";
import { AxiosError } from "axios";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { IServerError } from "src/shared/services/types";
import { useNavigation } from "@react-navigation/native";
import { useOrderStore } from "src/store";
import { Messages } from "src/shared/constants";

export const useOrderDetails = (id: string) => {
	const navigation = useNavigation();
	const { setOrderDetails, removeOrderById } = useOrderStore();
	const [orderDeleted, setOrderDeleted] = useState(false);

	const fetchOrderDetails = async (
		orderId: string,
	): Promise<GetOrderResponse> => {
		return await orderService.getOrderById(orderId);
	};

	const deleteOrderDetail = async (
		orderDetailId: string,
	): Promise<DeleteOrderDetailResponce> => {
		return await orderService.deleteOrderDetail(orderDetailId);
	};

	const {
		mutateAsync: fetchOrder,
		isPending,
		data,
		error,
	} = useMutation<GetOrderResponse, AxiosError<IServerError>, string>({
		mutationFn: fetchOrderDetails,
		onSuccess: (response) => {
			setOrderDetails(response.data.orderDetails);
		},
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	const { mutateAsync: removeItem } = useMutation<
		DeleteOrderDetailResponce,
		AxiosError<IServerError>,
		string
	>({
		mutationFn: deleteOrderDetail,
		onSuccess: () => {
			showToast(ToastType.SUCCESS, Messages.ITEM_DELETE);
		},
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	useEffect(() => {
		if (id && !orderDeleted) {
			fetchOrder(id);
		}
	}, [id, orderDeleted]);

	const handleDelete = async (orderDetailId: string) => {
		if (data?.data.orderDetails.length === 1) {
			await removeItem(orderDetailId);
			showToast(ToastType.SUCCESS, Messages.ORDER_DELETE);
			setOrderDeleted(true);
			removeOrderById(id);
			navigation.goBack();
		} else {
			await removeItem(orderDetailId);
			fetchOrder(id);
		}
	};

	return {
		orderDetails: data,
		loading: isPending,
		error,
		handleDelete,
	};
};
