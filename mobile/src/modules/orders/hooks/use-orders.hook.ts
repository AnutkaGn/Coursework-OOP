import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
	GetAllOrdersQuery,
	GetOrdersResponse,
	orderService,
} from "src/services/order";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { IServerError } from "src/shared/services/types";
import { useOrderStore } from "src/store";

const PAGE_LIMIT = 10;

export const useOrders = () => {
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState<number>(0);
	const [filters, setFilters] = useState<Partial<GetAllOrdersQuery>>({});
	const [refreshing, setRefreshing] = useState(false);

	const { orders, setOrders } = useOrderStore();

	const fetchOrders = async (
		params: Partial<GetAllOrdersQuery>,
		currentPage: number,
	): Promise<GetOrdersResponse> => {
		return await orderService.getOrders({
			page: currentPage,
			limit: PAGE_LIMIT,
			...params,
		});
	};

	const { mutateAsync, isPending } = useMutation<
		GetOrdersResponse,
		AxiosError<IServerError>,
		{ params: Partial<GetAllOrdersQuery>; currentPage: number }
	>({
		mutationFn: ({ params, currentPage }) => fetchOrders(params, currentPage),
		onSuccess: (response, { currentPage }) => {
			if (response.statusCode === 404) {
				setOrders([]);
				return;
			}
			setOrders(
				currentPage === 1
					? response.data.data
					: [...orders, ...response.data.data],
			);
			setTotal(response.data.total);
		},
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	useEffect(() => {
		mutateAsync({ params: filters, currentPage: 1 });
	}, []);

	const updateFilters = (newFilters: Partial<GetAllOrdersQuery>) => {
		const updatedFilters = { ...filters, ...newFilters };
		setFilters(updatedFilters);
		setPage(1);
		mutateAsync({ params: updatedFilters, currentPage: 1 });
	};

	const loadMoreOrders = () => {
		if (orders.length < total) {
			const nextPage = page + 1;
			setPage(nextPage);
			mutateAsync({ params: filters, currentPage: nextPage });
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		setPage(1);
		await mutateAsync({ params: filters, currentPage: 1 });
		setRefreshing(false);
	};

	return {
		loading: isPending,
		loadMoreOrders,
		updateFilters,
		refreshing,
		onRefresh,
	};
};
