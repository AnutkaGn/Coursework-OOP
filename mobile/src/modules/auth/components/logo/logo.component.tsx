import React from "react";
import { Image, Text } from "react-native";
import { styles } from "./logo.styles";

export const Logo: React.FC = () => {
	return (
		<>
			<Image source={require("assets/images/logo.png")} style={styles.image} />
			<Text style={styles.title}>Awesome Store</Text>
		</>
	);
};
