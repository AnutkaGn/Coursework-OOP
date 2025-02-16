import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { styles } from "./auth-nav.styles";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";

type RedirectProps = {
	redirectText: string;
	linkText: string;
	navigationTarget: NAVIGATION_KEYS.LOGIN | NAVIGATION_KEYS.SIGNUP;
};

export const AuthNav: React.FC<RedirectProps> = ({
	redirectText,
	linkText,
	navigationTarget,
}) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<View style={styles.container_link}>
			<Text style={styles.text}>{redirectText}</Text>
			<TouchableOpacity onPress={() => navigation.navigate(navigationTarget)}>
				<Text style={styles.linkText}>{linkText}</Text>
			</TouchableOpacity>
		</View>
	);
};
