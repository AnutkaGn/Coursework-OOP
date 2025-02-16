import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_KEYS, RootStackParamList } from "../types";
import { SCREEN_OPTIONS } from "./screen-options";
import { LoginScreen } from "src/modules/auth/screens/login";
import { SignUpScreen } from "src/modules/auth/screens/sign-up";
import { EmailVerificationScreen } from "src/modules/auth/screens/email-verification";
import { RegisteredSuccessfullyScreen } from "src/modules/auth/screens/registered-successfully";

const PubliceStack = createNativeStackNavigator<RootStackParamList>();

export const PUBLICE_SCREENS = (
	<>
		<PubliceStack.Screen
			name={NAVIGATION_KEYS.LOGIN}
			component={LoginScreen}
			options={SCREEN_OPTIONS}
		/>
		<PubliceStack.Screen
			name={NAVIGATION_KEYS.SIGNUP}
			component={SignUpScreen}
			options={SCREEN_OPTIONS}
		/>
		<PubliceStack.Screen
			name={NAVIGATION_KEYS.EMEIL_VERIFICATION}
			component={EmailVerificationScreen}
			options={SCREEN_OPTIONS}
		/>
		<PubliceStack.Screen
			name={NAVIGATION_KEYS.REGISTERED_SUCCESSFULLY}
			component={RegisteredSuccessfullyScreen}
			options={SCREEN_OPTIONS}
		/>
	</>
);
