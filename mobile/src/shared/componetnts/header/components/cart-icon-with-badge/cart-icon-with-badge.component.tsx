import React from "react";
import { Text, View } from "react-native";
import { CartIcon } from "assets/icons/basket";
import { styles } from "./cart-icon-with-badge.styles";
import { useCartStore } from "src/store";

export const CartIconWithBadge: React.FC = () => {
	const { getTotalItems } = useCartStore();
	const totalItems = getTotalItems();
	return (
		<View>
			<CartIcon />
			{totalItems > 0 ? (
				<View style={styles.badge}>
					<Text style={styles.text}>{totalItems}</Text>
				</View>
			) : null}
		</View>
	);
};
