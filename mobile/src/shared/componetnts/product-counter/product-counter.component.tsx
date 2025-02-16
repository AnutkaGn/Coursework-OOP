import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./product-counter.styles";

interface ProductCounterProps {
	count: number;
	onChange: (newCount: number) => void;
	maxCount: number;
}

export const ProductCounter: React.FC<ProductCounterProps> = ({
	count,
	onChange,
	maxCount,
}) => {
	const increment = () => {
		if (count < maxCount) {
			onChange(count + 1);
		}
	};

	const decrement = () => {
		if (count > 1) {
			onChange(count - 1);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Amount:</Text>
			<View style={styles.counter_container}>
				<TouchableOpacity
					style={[styles.button, count <= 1 && styles.disabled_button]}
					onPress={decrement}
					disabled={count <= 1}
				>
					<Text style={[styles.button_text]}>-</Text>
				</TouchableOpacity>

				<View style={styles.counter}>
					<Text style={styles.counter_text}>{count}</Text>
				</View>

				<TouchableOpacity
					style={[styles.button, count >= maxCount && styles.disabled_button]}
					onPress={increment}
					disabled={count >= maxCount}
				>
					<Text style={[styles.button_text]}>+</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
