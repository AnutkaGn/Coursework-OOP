import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./loader.styles";
import { COLORS } from "src/shared/styles";

export const Loader: React.FC = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={60} color={COLORS.background_blue} />
		</View>
	);
};
