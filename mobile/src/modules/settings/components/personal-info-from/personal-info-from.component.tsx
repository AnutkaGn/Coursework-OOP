import React from "react";
import { Control } from "react-hook-form";
import { Input } from "src/shared/componetnts";
import { View } from "react-native";
import { styles } from "./personal-info-from.styles";
import { useUserStore } from "src/store";
import { PersonalInfoFormValues } from "../../validation";

interface PersonalInfoFormProps {
	control: Control<PersonalInfoFormValues>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
	control,
}) => {
	const user = useUserStore((store) => store.user);

	return (
		<View style={styles.container}>
			<Input
				name="email"
				control={control}
				defaultValue={user!.email}
				label="Email"
				disabled
			/>
			<Input
				name="fullName"
				control={control}
				defaultValue={user!.fullName}
				label="Full Name"
			/>
			<Input
				name="phoneNumber"
				control={control}
				defaultValue={user!.phoneNumber}
				label="Phone Number"
			/>
			<Input
				name="shippingAddress"
				control={control}
				defaultValue={user!.shippingAddress}
				label="Shipping Address"
			/>
		</View>
	);
};
