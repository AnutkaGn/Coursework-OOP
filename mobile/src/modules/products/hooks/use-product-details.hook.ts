import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { productService, GetProductByIdResponse } from "src/services/product";
import { AxiosError } from "axios";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { IServerError } from "src/shared/services/types";

export const useProductDetails = (id: string) => {
	const fetchProduct = async (
		productId: string,
	): Promise<GetProductByIdResponse> => {
		return await productService.getProductById(productId);
	};

	const { mutateAsync, isPending, data, error } = useMutation<
		GetProductByIdResponse,
		AxiosError<IServerError>,
		string
	>({
		mutationFn: fetchProduct,
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	useEffect(() => {
		if (id) {
			mutateAsync(id);
		}
	}, [id]);

	return {
		product: data?.data,
		loading: isPending,
		error,
	};
};
