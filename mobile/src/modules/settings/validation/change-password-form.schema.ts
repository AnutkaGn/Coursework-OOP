import { Messages, Regex } from "src/shared/constants";
import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
	currentPassword: yup.string().required(Messages.REQUIRED),
	newPassword: yup
		.string()
		.matches(Regex.PASSWORD, Messages.PASSWORD_RULES)
		.required(Messages.REQUIRED),
	confirmPassword: yup
		.string()
		.required(Messages.REQUIRED)
		.oneOf([yup.ref("newPassword")], Messages.PASSWORDS_DO_NOT_MATCH),
});

export type ChangePasswordFormValues = yup.InferType<
	typeof changePasswordSchema
>;
