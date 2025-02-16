import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { Button, Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { ProductCounter } from "src/shared/componetnts/product-counter";
import { ProductInfo } from "src/shared/componetnts/product-info";
import { useOrderStore } from "src/store";
import { useUpdateOrderDetailQuantity } from "../../hooks/use-update-order-quantity.hook";

export const EditOrderScreen = () => {
	const navigation = useNavigation();
	const { getOrderDetailById, updateOrderDetailQuantity, updateProductStock, getOrderIdByDetailId } =
		useOrderStore();

	const {
		params: { id },
	} = useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.EDIT_ORDER>>();



	const orderDetail = getOrderDetailById(id);
	const orderId = getOrderIdByDetailId(id)
	const { updateQuantity, isLoading } = useUpdateOrderDetailQuantity(
		orderId!,
	);
	const [count, setCount] = useState<number>(orderDetail!.quantity);

	const handleSubmit = async () => {
		const quantityChange = count - orderDetail!.quantity;
		await updateQuantity({ orderDetailId: orderDetail!.id, quantity: count });
		updateOrderDetailQuantity(orderDetail!.id, count);
		updateProductStock(orderDetail!.product.id, quantityChange);
		navigation.goBack();
	};

	return (
		<Layout isScrollable={false}>
			<Header title="Edit Order Item" showBackButton />
			<ProductInfo product={orderDetail!.product} />
			<ProductCounter
				count={count}
				onChange={setCount}
				maxCount={orderDetail!.product.stock}
			/>
			<Button title="Save" onPress={handleSubmit} disabled={isLoading} />
		</Layout>
	);
};
