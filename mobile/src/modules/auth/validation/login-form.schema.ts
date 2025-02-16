import { Messages, Regex } from "src/shared/constants";
import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
	email: yup.string().email(Messages.INVALID_EMAIL).required(Messages.REQUIRED),
	password: yup
		.string()
		.matches(Regex.PASSWORD, Messages.PASSWORD_RULES)
		.required(Messages.REQUIRED),
});

export type LoginFormValues = yup.InferType<typeof loginFormSchema>;
