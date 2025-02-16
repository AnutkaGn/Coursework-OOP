import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_KEYS, RootStackParamList } from "../types";
import { SCREEN_OPTIONS } from "./screen-options";
import { BottomTab } from "../components/bottom-tab";
import { ProductInformationScreen } from "src/modules/products/screens/product-information";
import { CartScreen } from "src/modules/cart/screens/cart";
import { EditCartItemScreen } from "src/modules/cart/screens/edit-cart-item";
import { EditOrderScreen } from "src/modules/orders/screens/edit-order";
import { PersonalInfoScreen } from "src/modules/settings/screens/personal-info";
import { ChangePasswordScreen } from "src/modules/settings/screens/change-password";
import { PaymentSuccessfullyScreen } from "src/modules/payment/screens/payment-successfully";
import { OrderDetailsScreen } from "src/modules/orders/screens/order-details";
import { FaqScreen } from "src/modules/settings/screens/faq";

const PrivateStack = createNativeStackNavigator<RootStackParamList>();

export const PRIVATE_SCREENS = (
	<>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.BOTTOM_TAB}
			component={BottomTab}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.PRODUCT_INFORMATION}
			component={ProductInformationScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.CART}
			component={CartScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.EDIT_CART_ITEM}
			component={EditCartItemScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.ORDERS_DETAILS}
			component={OrderDetailsScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.EDIT_ORDER}
			component={EditOrderScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.PAYMENT_SUCCESSFULLY}
			component={PaymentSuccessfullyScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.PERSONAL_INFO}
			component={PersonalInfoScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.CHANGE_PASSWORD}
			component={ChangePasswordScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.FAQ}
			component={FaqScreen}
			options={SCREEN_OPTIONS}
		/>
	</>
);
