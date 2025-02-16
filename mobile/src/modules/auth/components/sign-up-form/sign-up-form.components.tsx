import React from "react";
import { Input, Button } from "src/shared/componetnts";
import { useSignUp } from "../../hooks";

export const SignUpForm = () => {
	const { control, handleSubmit, isPending, isValid } = useSignUp();

	return (
		<>
			<Input name="email" control={control} defaultValue="" label="Email" />
			<Input
				name="fullName"
				control={control}
				defaultValue=""
				label="Full name"
			/>
			<Input
				name="phoneNumber"
				control={control}
				defaultValue=""
				label="Phone number"
			/>
			<Input
				name="shippingAddress"
				control={control}
				defaultValue=""
				label="Shipping address"
			/>
			<Input
				name="password"
				control={control}
				defaultValue=""
				label="Password"
				secureTextEntry={true}
			/>
			<Input
				name="confirmPassword"
				control={control}
				defaultValue=""
				label="Confirm password"
				secureTextEntry={true}
			/>
			<Button
				onPress={handleSubmit}
				title="Sign Up"
				disabled={isPending || !isValid}
			/>
		</>
	);
};
