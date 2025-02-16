import { useMutation } from "@tanstack/react-query";
import { userService } from "src/services/user";
import { UpdatePasswordPayload, UserResponse } from "src/services/user";
import { IServerError } from "src/shared/services/types";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema, ChangePasswordFormValues } from "../validation";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { Messages } from "src/shared/constants";

export const useChangePassword = () => {
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<ChangePasswordFormValues>({
		mode: "all",
		reValidateMode: "onChange",
		resolver: yupResolver(changePasswordSchema),
	});

	const changePassword = async (
		values: UpdatePasswordPayload,
	): Promise<UserResponse> => {
		return await userService.updatePassword(values);
	};

	const { mutateAsync, isPending } = useMutation<
		UserResponse,
		AxiosError<IServerError>,
		UpdatePasswordPayload
	>({
		mutationFn: changePassword,
		onSuccess: () => {
			showToast(ToastType.SUCCESS, Messages.PASSWORD_CHANGE);
		},
		onError: (error: AxiosError<IServerError>) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	const onSubmit = async (data: ChangePasswordFormValues) => {
		await mutateAsync({
			oldPassword: data.currentPassword,
			newPassword: data.newPassword,
		});
	};

	return {
		control,
		handleSubmit: handleSubmit(onSubmit),
		isPending,
		isValid,
	};
};
