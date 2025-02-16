import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { styles } from "./product-item.styles";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";

interface ProductItemProps {
	id: string;
	title: string;
	category: string;
	price: number;
}

export const ProductItem: React.FC<ProductItemProps> = ({
	id,
	title,
	category,
	price,
}) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(NAVIGATION_KEYS.PRODUCT_INFORMATION, { id });
	};

	return (
		<TouchableOpacity onPress={handlePress} style={styles.card}>
			<View style={styles.card_content}>
				<Text style={styles.text}>{title}</Text>
				<View style={styles.container_category}>
					<Text style={styles.bold_text}>Category: </Text>
					<Text style={styles.text}>{category}</Text>
				</View>
			</View>
			<View style={styles.container_price}>
				<Text style={styles.bold_text}>Price: </Text>
				<Text style={styles.text}>${price.toFixed(2)}</Text>
			</View>
		</TouchableOpacity>
	);
};
