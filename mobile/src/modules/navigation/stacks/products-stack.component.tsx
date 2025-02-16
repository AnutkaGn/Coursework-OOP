import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_KEYS, RootStackParamList } from "../types";
import { ProductsScreen } from "src/modules/products/screens/products";
import { SCREEN_OPTIONS } from "../constants";

export const ProductsStack = createNativeStackNavigator<RootStackParamList>();

export const ProductsStackScreens = () => {
	return (
		<ProductsStack.Navigator>
			<ProductsStack.Screen
				name={NAVIGATION_KEYS.PRODUCTS}
				component={ProductsScreen}
				options={SCREEN_OPTIONS}
			/>
		</ProductsStack.Navigator>
	);
};
