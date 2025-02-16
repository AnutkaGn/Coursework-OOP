import { Messages, Regex } from "src/shared/constants";
import * as yup from "yup";

export const signUpFormSchema = yup.object().shape({
	email: yup.string().email(Messages.INVALID_EMAIL).required(Messages.REQUIRED),
	fullName: yup.string().required(Messages.REQUIRED),
	phoneNumber: yup
		.string()
		.matches(Regex.PHONE_NUMBER, Messages.INVALID_PHONE)
		.required(Messages.REQUIRED),
	shippingAddress: yup.string().required(Messages.REQUIRED),
	password: yup
		.string()
		.matches(Regex.PASSWORD, Messages.PASSWORD_RULES)
		.required(Messages.REQUIRED),
	confirmPassword: yup
		.string()
		.required(Messages.REQUIRED)
		.oneOf([yup.ref("password")], Messages.PASSWORDS_DO_NOT_MATCH),
});

export type SignUpFormValues = yup.InferType<typeof signUpFormSchema>;
