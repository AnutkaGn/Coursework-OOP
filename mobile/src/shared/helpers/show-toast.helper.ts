import Toast from "react-native-toast-message";
import { FONTS } from "../styles";

export enum ToastType {
	SUCCESS = "success",
	ERROR = "error",
	INFO = "info",
}

export const showToast = (
	type: ToastType,
	title: string,
	message?: string,
): void => {
	Toast.show({
		type,
		text1: title,
		text2: message,
		visibilityTime: 1000,
		position: "top",
		topOffset: 70,
		text1Style: {
			fontFamily: FONTS.POPPINS_SEMIBOLD,
			fontSize: 14,
		},
		text2Style: {
			fontFamily: FONTS.POPPINS_REGULAR,
			fontSize: 12,
		},
	});
};
