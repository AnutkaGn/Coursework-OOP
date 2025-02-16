import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { styles } from "./order-card.styles";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { Order } from "src/services/order";
import { formatDate, convertToTitleCase } from "src/shared/helpers";

interface OrderCardProps {
	order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(NAVIGATION_KEYS.ORDERS_DETAILS, { id: order.id });
	};

	return (
		<TouchableOpacity onPress={handlePress} style={styles.card}>
			<View style={styles.container}>
				<Text style={styles.bold_text}>Date: </Text>
				<Text style={styles.text}>{formatDate(order.createdAt)}</Text>
			</View>
			<View style={styles.container}>
				<Text style={styles.bold_text}>ID: </Text>
				<Text style={styles.text}>{order.id}</Text>
			</View>
			<View style={styles.container}>
				<Text style={styles.bold_text}>Payment Status: </Text>
				<Text style={styles.text}>
					{convertToTitleCase(order.paymentStatus)}
				</Text>
			</View>
			<View style={styles.container}>
				<Text style={styles.bold_text}>Delivery Status: </Text>
				<Text style={styles.text}>
					{convertToTitleCase(order.deliveryStatus)}
				</Text>
			</View>
			<View style={styles.container}>
				<Text style={styles.bold_text}>Total: </Text>
				<Text style={styles.text}>${order.totalAmount.toFixed(2)}</Text>
			</View>
		</TouchableOpacity>
	);
};
