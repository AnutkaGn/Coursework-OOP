import { useMutation } from "@tanstack/react-query";
import {
	GetProductsResponse,
	productService,
	ProductListItem,
	GetProductsParams,
} from "src/services/product";
import { IServerError } from "src/shared/services/types";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { AxiosError } from "axios";
import { useState } from "react";

const PAGE_LIMIT = 10;

export const useProducts = () => {
	const [page, setPage] = useState(1);
	const [products, setProducts] = useState<ProductListItem[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [filters, setFilters] = useState<Partial<GetProductsParams>>({
		name: "",
		sortByPrice: undefined,
	});
	const [refreshing, setRefreshing] = useState(false);

	const fetchProducts = async (
		params: Partial<GetProductsParams>,
		currentPage: number,
	): Promise<GetProductsResponse> => {
		return await productService.getProducts({
			page: currentPage,
			limit: PAGE_LIMIT,
			...params,
		});
	};

	const { mutateAsync, isPending } = useMutation<
		GetProductsResponse,
		AxiosError<IServerError>,
		{ params: Partial<GetProductsParams>; currentPage: number }
	>({
		mutationFn: ({ params, currentPage }) => fetchProducts(params, currentPage),
		onSuccess: (response, { currentPage }) => {
			if (response.statusCode === 404) {
				setProducts([]);
				return;
			}
			setProducts((prevProducts) =>
				currentPage === 1
					? response.data.data
					: [...prevProducts, ...response.data.data],
			);
			setTotal(response.data.total);
		},
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	const updateFilters = (newFilters: Partial<GetProductsParams>) => {
		const updatedFilters = { ...filters, ...newFilters };
		setFilters(updatedFilters);
		setPage(1);
		mutateAsync({ params: updatedFilters, currentPage: 1 });
	};

	const loadMoreProducts = () => {
		if (products.length < total) {
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
		products,
		loading: isPending,
		loadMoreProducts,
		updateFilters,
		refreshing,
		onRefresh,
	};
};
