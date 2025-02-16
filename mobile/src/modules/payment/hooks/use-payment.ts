import { useMutation } from "@tanstack/react-query";
import {
	paymentService,
	CreatePaymentPayload,
	PaymentResponce,
} from "src/services/payment";
import { AxiosError } from "axios";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { IServerError } from "src/shared/services/types";
import { useOrderStore } from "src/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { PAYMENT_STATUS } from "src/shared/enum/payment-status.enum";
import { Messages } from "src/shared/constants";

export const usePayment = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { setPaymentStatus } = useOrderStore();

	const createPayment = async (
		data: CreatePaymentPayload,
	): Promise<PaymentResponce> => {
		return await paymentService.create(data);
	};

	const { mutateAsync, isPending } = useMutation<
		PaymentResponce,
		AxiosError<IServerError>,
		CreatePaymentPayload
	>({
		mutationFn: createPayment,
		onSuccess: (response) => {
			setPaymentStatus(response.data.orderId, response.data.paymentStatus);
			if (response.data.paymentStatus === PAYMENT_STATUS.FAILED) {
				showToast(ToastType.ERROR, Messages.PAYMENT_FAILD);
			} else {
				navigation.navigate(NAVIGATION_KEYS.PAYMENT_SUCCESSFULLY);
			}
		},
		onError: (error) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	return {
		createPayment: mutateAsync,
		loading: isPending,
	};
};
