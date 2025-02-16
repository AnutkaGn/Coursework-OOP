import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SuccessMessage } from "src/shared/componetnts";
import { Text } from "react-native";
import { CheckCircleIcon } from "assets/icons/checkmark-circle-white";
import { styles } from "./payment-successfully.styles";

export const PaymentSuccessfullyScreen = () => {
	const navigation = useNavigation();

	const handleButtonPress = () => {
		navigation.goBack();
	};

	return (
		<SuccessMessage
			message="Payment successful!"
			buttonText={
				<>
					<CheckCircleIcon />
					<Text style={styles.botton_title}>Ok</Text>
				</>
			}
			onButtonPress={handleButtonPress}
		/>
	);
};
