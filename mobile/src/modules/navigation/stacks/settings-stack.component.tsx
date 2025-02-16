import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_KEYS, RootStackParamList } from "../types";
import { SettingsScreen } from "src/modules/settings/screens/settings";
import { SCREEN_OPTIONS } from "../constants";

export const SettingsStack = createNativeStackNavigator<RootStackParamList>();

export const SettingsStackScreens = () => {
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen
				name={NAVIGATION_KEYS.SETTINGS}
				component={SettingsScreen}
				options={SCREEN_OPTIONS}
			/>
		</SettingsStack.Navigator>
	);
};
