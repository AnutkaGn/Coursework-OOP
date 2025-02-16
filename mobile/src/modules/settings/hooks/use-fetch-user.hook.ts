import { useMutation } from "@tanstack/react-query";
import { userService, UserResponse } from "src/services/user";
import { useUserStore } from "src/store";
import { AxiosError } from "axios";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { IServerError } from "src/shared/services/types";

export const useFetchUser = () => {
	const setUser = useUserStore((state) => state.setUser);

	const { mutateAsync: fetchUser } = useMutation<
		UserResponse,
		AxiosError<IServerError>
	>({
		mutationFn: async () => await userService.getUser(),
		onSuccess: (response) => {
			setUser(response.data);
		},
		onError: (error: AxiosError<IServerError>) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	return { fetchUser };
};
