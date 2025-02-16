import React from "react";
import { Button, Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { ChangePasswordForm } from "../../components/change-password-form";
import { useChangePassword } from "../../hooks/use-change-password.hook";

export const ChangePasswordScreen = () => {
	const { control, handleSubmit, isValid } = useChangePassword();
	return (
		<Layout>
			<Header title="Change password" showBackButton />
			<ChangePasswordForm control={control} />
			<Button title="Save" onPress={() => handleSubmit()} disabled={!isValid} />
		</Layout>
	);
};
