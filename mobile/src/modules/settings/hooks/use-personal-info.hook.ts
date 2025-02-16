import { useMutation } from "@tanstack/react-query";
import {
	UserResponse,
	userService,
	UpdatePersonalInfoPayload,
	DeleteUserResponce,
} from "src/services/user";
import { IServerError } from "src/shared/services/types";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalInfoFormValues, personalInfoFormSchema } from "../validation";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { Messages } from "src/shared/constants";
import { useFetchUser } from "./use-fetch-user.hook";
import { useAuthStore } from "src/store";

export const usePersonalInfo = () => {
	const { fetchUser } = useFetchUser();
	const logout = useAuthStore((store) => store.logout);
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<PersonalInfoFormValues>({
		mode: "all",
		reValidateMode: "onChange",
		resolver: yupResolver(personalInfoFormSchema),
	});

	const deleteUser = async (): Promise<DeleteUserResponce> => {
		return await userService.delete();
	};

	const updatePersonalInfo = async (
		values: UpdatePersonalInfoPayload,
	): Promise<UserResponse> => {
		return await userService.updatePersonalInfo(values);
	};

	const { mutateAsync: updateUser, isPending: isUpdating } = useMutation<
		UserResponse,
		AxiosError<IServerError>,
		UpdatePersonalInfoPayload
	>({
		mutationFn: updatePersonalInfo,
		onSuccess: () => {
			showToast(ToastType.SUCCESS, Messages.USER_UPDATED);
			fetchUser();
		},
		onError: (error: AxiosError<IServerError>) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	const { mutateAsync: handleDeleteUser } = useMutation<
		DeleteUserResponce,
		AxiosError<IServerError>
	>({
		mutationFn: deleteUser,
		onSuccess: () => {
			logout();
		},
		onError: (error: AxiosError<IServerError>) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	const onSubmit = async (data: PersonalInfoFormValues) => {
		await updateUser(data);
	};

	return {
		control,
		handleSubmit: handleSubmit(onSubmit),
		isUpdating,
		isValid,
		handleDeleteUser,
	};
};
