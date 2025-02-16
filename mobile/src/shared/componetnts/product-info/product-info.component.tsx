import React from "react";
import { View, Text } from "react-native";
import { Product } from "src/services/product";
import { styles } from "./product-info.styles";

interface ProductInfoProps {
	product: Partial<Product>;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
	return (
		<View style={styles.container}>
			<View style={styles.item_container}>
				<Text style={styles.bold_text}>Name: </Text>
				<Text style={styles.text}>{product.name}</Text>
			</View>
			<View style={styles.item_container}>
				<Text style={styles.bold_text}>Description: </Text>
				<Text style={styles.text}>{product.description}</Text>
			</View>
			<View style={styles.item_container}>
				<Text style={styles.bold_text}>In Stock: </Text>
				<Text style={styles.text}>{product.stock}</Text>
			</View>
			<View style={styles.item_container}>
				<Text style={styles.bold_text}>Price: </Text>
				<Text style={styles.text}>${product.price}</Text>
			</View>
			<View style={styles.item_container}>
				<Text style={styles.bold_text}>Category: </Text>
				<Text style={styles.text}>{product.category}</Text>
			</View>
		</View>
	);
};
