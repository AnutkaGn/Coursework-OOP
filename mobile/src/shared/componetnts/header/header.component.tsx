import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CartIcon } from "assets/icons/basket";
import { styles } from "./header.styles";
import { BackArrowIcon } from "assets/icons/back-arrow";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { CartIconWithBadge } from "./components/cart-icon-with-badge/cart-icon-with-badge.component";

interface HeaderProps {
	title: string;
	showBackButton?: boolean;
	onBackPress?: () => void;
	showCartIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
	title,
	showBackButton = false,
	onBackPress,
	showCartIcon = false,
}) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const handleCartPress = () => {
		navigation.navigate(NAVIGATION_KEYS.CART);
	};

	return (
		<View style={styles.container}>
			{showBackButton && (
				<TouchableOpacity
					onPress={onBackPress || navigation.goBack}
					style={styles.icon_button}
				>
					<BackArrowIcon />
				</TouchableOpacity>
			)}

			<Text style={styles.title}>{title}</Text>

			{showCartIcon && (
				<TouchableOpacity onPress={handleCartPress} style={styles.icon_button}>
					<CartIconWithBadge />
				</TouchableOpacity>
			)}
		</View>
	);
};
