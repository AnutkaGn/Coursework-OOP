import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_KEYS, RootStackParamList } from "../types";
import { OrdersScreen } from "src/modules/orders/screens/orders";
import { SCREEN_OPTIONS } from "../constants";

export const OrdersStack = createNativeStackNavigator<RootStackParamList>();

export const OrdersStackScreens = () => {
	return (
		<OrdersStack.Navigator>
			<OrdersStack.Screen
				name={NAVIGATION_KEYS.ORDERS}
				component={OrdersScreen}
				options={SCREEN_OPTIONS}
			/>
		</OrdersStack.Navigator>
	);
};
