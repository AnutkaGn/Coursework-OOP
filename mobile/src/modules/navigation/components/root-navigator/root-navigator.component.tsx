import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavContainer } from "../nav-container/nav-container.component";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "../../types/navigation.type";
import { useAuthStore } from "src/store";
import { PRIVATE_SCREENS, PUBLICE_SCREENS } from "../../constants";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	const isAuth = useAuthStore((store) => store.isAuth);

	return (
		<NavContainer>
			<Stack.Navigator>
				{isAuth ? PRIVATE_SCREENS : PUBLICE_SCREENS}
			</Stack.Navigator>
		</NavContainer>
	);
};
