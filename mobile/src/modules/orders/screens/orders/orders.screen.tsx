import React from "react";
import { Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { OrderList } from "../../components/orders-list";
import { FilterPanel } from "../../components/filter-panel";
import { useOrders } from "../../hooks/use-orders.hook";
import { useOrderStore } from "src/store";

export const OrdersScreen = () => {
	const { loading, loadMoreOrders, updateFilters, refreshing, onRefresh } =
		useOrders();
	const { orders } = useOrderStore();

	return (
		<Layout isScrollable={false}>
			<Header title="Orders" />
			<FilterPanel onFilterChange={updateFilters} />
			<OrderList
				orders={orders}
				loading={loading}
				onLoadMore={loadMoreOrders}
				onRefresh={onRefresh}
				refreshing={refreshing}
			/>
		</Layout>
	);
};
