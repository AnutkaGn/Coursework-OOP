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
import { useProductDetails } from "../../hooks/use-product-details.hook";
import { useCartStore } from "src/store/cart.store";
import { showToast, ToastType } from "src/shared/helpers";
import { Messages } from "src/shared/constants";

export const ProductInformationScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [count, setCount] = useState<number>(1);
	const {
		params: { id },
	} =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.PRODUCT_INFORMATION>
		>();

	const { product, loading } = useProductDetails(id);
	const { addItemToCart } = useCartStore();

	if (!product) {
		return null;
	}

	const handleSubmit = () => {
		addItemToCart({
			id: product.id,
			title: product.name,
			price: product.price,
			amount: count,
		});
		showToast(ToastType.SUCCESS, Messages.ADD_CART_SUCCESS);
		navigation.goBack();
	};

	return (
		<Layout>
			<Header title="Product Information" showBackButton showCartIcon />
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

					<Button
						title="Add to Cart"
						onPress={handleSubmit}
						disabled={product.stock === 0}
					/>
				</>
			)}
		</Layout>
	);
};
