import React from "react";
import { FlatList, RefreshControl, Text } from "react-native";
import { Order } from "src/services/order";
import { Loader } from "src/shared/componetnts";
import { OrderCard } from "../order-card";
import { styles } from "./order-list.styles";

interface OrderListProps {
	orders: Order[];
	loading: boolean;
	onLoadMore: () => void;
	onRefresh: () => void;
	refreshing: boolean;
}

export const OrderList: React.FC<OrderListProps> = ({
	orders,
	loading,
	onLoadMore,
	onRefresh,
	refreshing,
}) => {
	const renderItem = ({ item }: { item: Order }) => <OrderCard order={item} />;

	const renderEmptyList = () => <Text style={styles.text}>No orders.</Text>;

	return (
		<FlatList
			data={orders}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			onEndReached={onLoadMore}
			ListFooterComponent={loading && orders.length > 0 ? <Loader /> : null}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			ListEmptyComponent={renderEmptyList}
		/>
	);
};
