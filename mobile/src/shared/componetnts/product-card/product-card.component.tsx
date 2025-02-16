import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { styles } from "./product-card.styles";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { TrashBinIcon } from "assets/icons/trash-bin";

interface ProductCardProps {
	id: string;
	title: string;
	amount: number;
	price: number;
	onDelete?: (id: string) => void;
	navigationKey?: NAVIGATION_KEYS.EDIT_CART_ITEM | NAVIGATION_KEYS.EDIT_ORDER;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	id,
	title,
	amount,
	price,
	onDelete,
	navigationKey,
}) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const handlePress = () => {
		if (navigationKey) {
			navigation.navigate(navigationKey, { id });
		}
	};

	return (
		<TouchableOpacity
			onPress={navigationKey ? handlePress : undefined}
			style={styles.card}
		>
			<View style={styles.card_content}>
				<Text style={styles.text}>{title}</Text>
				<View style={styles.container_price_amount}>
					<View style={styles.container_price}>
						<Text style={styles.bold_text}>Total: </Text>
						<Text style={styles.text}>${(price * amount).toFixed(2)}</Text>
					</View>
					<View style={styles.container_amount}>
						<Text style={styles.bold_text}>Amount: </Text>
						<Text style={styles.text}>{amount}</Text>
					</View>
				</View>
			</View>
			{onDelete && (
				<TouchableOpacity onPress={() => onDelete(id)} style={styles.icon}>
					<TrashBinIcon />
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
};
