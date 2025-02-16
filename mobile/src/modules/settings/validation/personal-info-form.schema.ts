import { Messages, Regex } from "src/shared/constants";
import * as yup from "yup";

export const personalInfoFormSchema = yup.object().shape({
	email: yup.string().email(Messages.INVALID_EMAIL).required(Messages.REQUIRED),
	fullName: yup.string().required(Messages.REQUIRED),
	phoneNumber: yup
		.string()
		.matches(Regex.PHONE_NUMBER, Messages.INVALID_PHONE)
		.required(Messages.REQUIRED),
	shippingAddress: yup.string().required(Messages.REQUIRED),
});

export type PersonalInfoFormValues = yup.InferType<
	typeof personalInfoFormSchema
>;
