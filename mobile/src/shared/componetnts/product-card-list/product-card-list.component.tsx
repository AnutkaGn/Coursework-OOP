import React from "react";
import { FlatList, Text } from "react-native";
import { ProductCard } from "../product-card";
import { styles } from "./product-card.styles";
import { NAVIGATION_KEYS } from "src/modules/navigation/types";

interface ProductCardItem {
	id: string;
	title: string;
	amount: number;
	price: number;
}

interface ProductCardListProps {
	products: ProductCardItem[];
	onDeleteProduct?: (id: string) => void;
	navigationKey?: NAVIGATION_KEYS.EDIT_CART_ITEM | NAVIGATION_KEYS.EDIT_ORDER;
}

export const ProductCardList: React.FC<ProductCardListProps> = ({
	products,
	onDeleteProduct,
	navigationKey,
}) => {
	const renderItem = ({ item }: { item: ProductCardItem }) => (
		<ProductCard
			id={item.id}
			title={item.title}
			amount={item.amount}
			price={item.price}
			onDelete={onDeleteProduct}
			navigationKey={navigationKey}
		/>
	);

	const renderEmptyList = () => (
		<Text style={styles.text}>Your list is empty.</Text>
	);

	return (
		<FlatList
			data={products}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			ListEmptyComponent={renderEmptyList}
		/>
	);
};
