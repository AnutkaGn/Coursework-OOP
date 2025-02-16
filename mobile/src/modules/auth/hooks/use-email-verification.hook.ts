import { useMutation } from "@tanstack/react-query";
import { authService } from "src/services/auth";
import {
	VerifyEmailPayload,
	VerifyEmailResponse,
} from "src/services/auth/auth.types";
import { IServerError } from "src/shared/services/types";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { Messages } from "src/shared/constants";

export const useEmailVerification = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const verifyEmail = async ({
		email,
		verificationCode,
	}: VerifyEmailPayload): Promise<VerifyEmailResponse> => {
		return await authService.verifyEmail({ email, verificationCode });
	};

	const { mutateAsync, isPending } = useMutation<
		VerifyEmailResponse,
		AxiosError<IServerError>,
		VerifyEmailPayload
	>({
		mutationFn: verifyEmail,
		onSuccess: () => {
			navigation.navigate(NAVIGATION_KEYS.REGISTERED_SUCCESSFULLY);
			showToast(ToastType.SUCCESS, Messages.VERIFICATION_SUCCESSFUL);
		},
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, Messages.VERIFICATION_FAILED, errorMessage);
		},
	});

	return {
		verifyEmail: mutateAsync,
		isPending,
	};
};
