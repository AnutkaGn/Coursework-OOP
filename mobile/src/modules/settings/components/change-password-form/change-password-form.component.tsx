import React from "react";
import { Control } from "react-hook-form";
import { Input } from "src/shared/componetnts";
import { View } from "react-native";
import { styles } from "./change-password-form.styles";
import { ChangePasswordFormValues } from "../../validation";

interface ChangePasswordFormProps {
	control: Control<ChangePasswordFormValues>;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
	control,
}) => {
	return (
		<View style={styles.container}>
			<Input
				name="currentPassword"
				control={control}
				defaultValue=""
				label="Current Password"
			/>
			<Input
				name="newPassword"
				control={control}
				defaultValue=""
				label="New Password"
				secureTextEntry={true}
			/>
			<Input
				name="confirmPassword"
				control={control}
				defaultValue=""
				label="Confirm Password"
				secureTextEntry={true}
			/>
		</View>
	);
};
