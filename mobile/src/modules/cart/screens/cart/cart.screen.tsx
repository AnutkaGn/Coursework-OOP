import React from "react";
import { Header } from "src/shared/componetnts/header";
import { Button, Layout } from "src/shared/componetnts";
import { Text, View } from "react-native";
import { styles } from "./cart.styles";
import { ProductCardList } from "src/shared/componetnts/product-card-list";
import { useCartStore } from "src/store";
import { useCreateOrder } from "../../hooks/use-create-order.hook";
import { NAVIGATION_KEYS } from "src/modules/navigation/types";

export const CartScreen = () => {
	const { cart, removeItemFromCart, totalPrice, clearCart } = useCartStore();
	const { createOrder, loading } = useCreateOrder();

	const handleSubmit = async () => {
		const orderDetails = cart.map((product) => ({
			productId: product.id,
			quantity: product.amount,
			priceAtPurchase: product.price,
		}));

		const payload = {
			totalAmount: totalPrice,
			orderDetails,
		};

		await createOrder(payload);
		clearCart();
	};

	return (
		<Layout isScrollable={false}>
			<Header title="Cart" showBackButton />
			<Text style={styles.text}>Total amount: ${totalPrice.toFixed(2)}</Text>
			<ProductCardList
				products={cart}
				onDeleteProduct={removeItemFromCart}
				navigationKey={NAVIGATION_KEYS.EDIT_CART_ITEM}
			/>
			<View style={styles.container_button}>
				<Button
					title="Create Order"
					onPress={handleSubmit}
					disabled={loading || cart.length === 0}
				/>
			</View>
		</Layout>
	);
};
