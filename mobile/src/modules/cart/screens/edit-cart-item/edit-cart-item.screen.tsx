import React, { useState } from "react";
import { Header } from "src/shared/componetnts/header";
import { Button, Layout, Loader } from "src/shared/componetnts";
import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { ProductInfo } from "src/shared/componetnts/product-info";
import { ProductCounter } from "src/shared/componetnts/product-counter";
import { useCartStore } from "src/store/cart.store";
import { useProductDetails } from "src/modules/products/hooks/use-product-details.hook";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { styles } from "./edit-cart-item.styles";

export const EditCartItemScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const {
		params: { id },
	} = useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.EDIT_CART_ITEM>>();
	const { updateItemAmount, getItemAmount, removeItemFromCart } =
		useCartStore();
	const [count, setCount] = useState<number>(getItemAmount(id));
	const { product, loading } = useProductDetails(id);

	if (!product) {
		return null;
	}

	const handleSubmit = () => {
		updateItemAmount(id, count);
		navigation.goBack();
	};

	const handleremoveItemFromCart = () => {
		removeItemFromCart(id);
		navigation.goBack();
	};
	return (
		<Layout>
			<Header title="Product Information" showBackButton />
			{loading ? (
				<Loader />
			) : (
				<>
					<ProductInfo product={product} />
					<ProductCounter
						count={count}
						onChange={setCount}
						maxCount={product.stock}
					/>
					<TouchableOpacity
						style={styles.container_remove_text}
						onPress={handleremoveItemFromCart}
					>
						<Text style={styles.remove_text}>Remove from the cart</Text>
					</TouchableOpacity>
					<Button title="Save" onPress={handleSubmit} />
				</>
			)}
		</Layout>
	);
};
