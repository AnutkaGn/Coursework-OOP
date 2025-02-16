import * as React from "react";
import {
	TouchableOpacity,
	Text,
	ViewStyle,
	TextStyle,
	View,
} from "react-native";
import { styles } from "./button.styles";

type ButtonProps = {
	onPress: () => void;
	title: React.ReactNode | string;
	buttonStyle?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
};

export const Button = ({
	onPress,
	title,
	buttonStyle,
	textStyle,
	disabled = false,
}: ButtonProps) => {
	return (
		<View style={styles.sticky_container}>
			<TouchableOpacity
				onPress={!disabled ? onPress : undefined}
				style={[styles.button, buttonStyle, disabled && styles.disabled_button]}
				activeOpacity={disabled ? 1 : 0.7}
			>
				{typeof title === "string" ? (
					<Text style={[styles.button_text, textStyle]}>{title}</Text>
				) : (
					title
				)}
			</TouchableOpacity>
		</View>
	);
};
