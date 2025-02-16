import React from "react";
import { Button, Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { Text, View } from "react-native";
import { useOrderDetails } from "../../hooks/use-order-details.hook";
import { ProductCardList } from "src/shared/componetnts/product-card-list";
import { Loader } from "src/shared/componetnts";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { useOrderStore } from "src/store/order.store";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PayIcon } from "assets/icons/pay";
import { styles } from "./order-details.styles";
import { PAYMENT_STATUS } from "src/shared/enum/payment-status.enum";
import { usePayment } from "src/modules/payment/hooks/use-payment";

export const OrderDetailsScreen: React.FC = ({}) => {
	const {
		params: { id },
	} = useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.ORDERS_DETAILS>>();
	const { loading, handleDelete } = useOrderDetails(id);
	const { orderDetails, getTotalAmount, getPaymentStatus } = useOrderStore();
	const { createPayment, loading: createPaymentLoading } = usePayment();

	const totalAmount = getTotalAmount(id);
	const isPaymentSuccessful = getPaymentStatus(id) === PAYMENT_STATUS.SUCCESS;

	if (loading || !orderDetails) {
		return <Loader />;
	}

	if (createPaymentLoading) {
		return (
			<View style={styles.container}>
				<Loader />
			</View>
		);
	}

	return (
		<Layout isScrollable={false}>
			<Header title="Order Details" showBackButton />
			<Text style={styles.text}>Total amount: ${totalAmount?.toFixed(2)}</Text>

			<ProductCardList
				products={orderDetails.map((detail) => ({
					id: detail.id,
					title: detail.product.name,
					amount: detail.quantity,
					price: detail.priceAtPurchase,
				}))}
				onDeleteProduct={!isPaymentSuccessful ? handleDelete : undefined}
				navigationKey={
					!isPaymentSuccessful ? NAVIGATION_KEYS.EDIT_ORDER : undefined
				}
			/>

			{!isPaymentSuccessful && (
				<Button
					title={
						<>
							<PayIcon />
							<Text style={styles.botton_title}>Pay</Text>
						</>
					}
					onPress={() =>
						createPayment({ orderId: id, totalAmount: totalAmount! })
					}
				/>
			)}
		</Layout>
	);
};
