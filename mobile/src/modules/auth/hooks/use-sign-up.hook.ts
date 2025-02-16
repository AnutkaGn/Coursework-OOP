import { useMutation } from "@tanstack/react-query";
import { authService } from "src/services/auth";
import { SignUpResponse, SignUpPayload } from "src/services/auth";
import { IServerError } from "src/shared/services/types";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchema, SignUpFormValues } from "../validation";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { Messages } from "src/shared/constants";

export const useSignUp = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<SignUpFormValues>({
		mode: "all",
		reValidateMode: "onChange",
		resolver: yupResolver(signUpFormSchema),
	});

	const signUp = async (values: SignUpPayload): Promise<SignUpResponse> => {
		return await authService.signUp(values);
	};

	const { mutateAsync, isPending } = useMutation<
		SignUpResponse,
		AxiosError<IServerError>,
		SignUpPayload
	>({
		mutationFn: signUp,
		onSuccess: (_response, variables) => {
			navigation.navigate(NAVIGATION_KEYS.EMEIL_VERIFICATION, {
				email: variables.email,
			});
			showToast(ToastType.SUCCESS, Messages.REGISTRATION_SUCCESS);
		},
		onError: (error: AxiosError<IServerError>) => {
			const errorMessage = getErrorMessage(error.response?.data as undefined);

			showToast(ToastType.ERROR, Messages.REGISTRATION_FAILED, errorMessage);
		},
	});

	const onSubmit = async (data: SignUpFormValues) => {
		await mutateAsync(data);
	};

	return {
		control,
		handleSubmit: handleSubmit(onSubmit),
		isPending,
		isValid,
	};
};
