import React from "react";
import { Input, Button } from "src/shared/componetnts";
import { styles } from "./login-form.styles";
import { useLogin } from "../../hooks";

export const LoginForm: React.FC = () => {
	const { control, handleSubmit, isPending } = useLogin();
	return (
		<>
			<Input name="email" control={control} defaultValue="" label="Email" />
			<Input
				name="password"
				control={control}
				defaultValue=""
				label="Password"
				secureTextEntry={true}
			/>
			<Button
				title="Sign in"
				onPress={handleSubmit}
				buttonStyle={styles.button}
				disabled={isPending}
			/>
		</>
	);
};
