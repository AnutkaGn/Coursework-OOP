import React from "react";
import { FlatList, RefreshControl, Text } from "react-native";
import { ProductItem } from "../product-item";
import { ProductListItem } from "src/services/product";
import { Loader } from "src/shared/componetnts";
import { styles } from "./product-list.styles";

interface ProductListProps {
	products: ProductListItem[];
	loading: boolean;
	onLoadMore: () => void;
	onRefresh: () => void;
	refreshing: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
	products,
	loading,
	onLoadMore,
	onRefresh,
	refreshing,
}) => {
	const renderItem = ({ item }: { item: any }) => (
		<ProductItem
			id={item.id}
			title={item.name}
			category={item.category}
			price={item.price}
		/>
	);

	const renderEmptyList = () => (
		<Text style={styles.text}>No products available.</Text>
	);

	return (
		<FlatList
			data={products}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			onEndReached={onLoadMore}
			ListFooterComponent={loading && products.length > 0 ? <Loader /> : null}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			ListEmptyComponent={renderEmptyList}
			showsVerticalScrollIndicator={false}
		/>
	);
};
