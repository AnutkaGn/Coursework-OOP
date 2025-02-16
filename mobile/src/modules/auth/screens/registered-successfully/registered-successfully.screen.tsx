import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { SuccessMessage } from "src/shared/componetnts";

export const RegisteredSuccessfullyScreen = () => {
	const navigation =
		useNavigation<NavigationProp<RootStackParamList, NAVIGATION_KEYS.LOGIN>>();
	const handleButtonPress = () => {
		navigation.navigate(NAVIGATION_KEYS.LOGIN);
	};

	return (
		<SuccessMessage
			message="Account successfully registered!"
			buttonText="Sign In"
			onButtonPress={handleButtonPress}
		/>
	);
};
