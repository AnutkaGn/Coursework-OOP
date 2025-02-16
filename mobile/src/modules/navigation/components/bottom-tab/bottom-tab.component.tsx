import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, FONTS } from "src/shared/styles";
import { NAVIGATION_KEYS } from "../../types";
import {
	OrdersStackScreens,
	ProductsStackScreens,
	SettingsStackScreens,
} from "../../stacks";
import { SettingsIcon } from "assets/icons/settings";
import { ProductsIcon } from "assets/icons/products";
import { OrdersIcon } from "assets/icons/orders";

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: COLORS.background_blue,
				tabBarInactiveTintColor: COLORS.text_primary,
				tabBarStyle: {
					height: 73,
					paddingBottom: 10,
					paddingTop: 8,
					elevation: 0,
					shadowOpacity: 0,
					borderTopWidth: 0,
					backgroundColor: COLORS.white,
				},
				tabBarLabelStyle: {
					marginTop: 4,
					fontSize: 14,
					fontFamily: FONTS.POPPINS_REGULAR,
				},
			}}
		>
			<Tab.Screen
				name={NAVIGATION_KEYS.PRODUCTS_STACK}
				component={ProductsStackScreens}
				options={{
					title: "Products",
					tabBarLabel: "Products",
					tabBarIcon: ({ color }) => <ProductsIcon fillColor={color} />,
				}}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.ORDERS_STACK}
				component={OrdersStackScreens}
				options={{
					title: "Orders",
					tabBarLabel: "Orders",
					tabBarIcon: ({ color }) => <OrdersIcon fillColor={color} />,
				}}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.SETTINGS_STACK}
				component={SettingsStackScreens}
				options={{
					title: "Settings",
					tabBarLabel: "Settings",
					tabBarIcon: ({ color }) => <SettingsIcon fillColor={color} />,
				}}
			/>
		</Tab.Navigator>
	);
};
