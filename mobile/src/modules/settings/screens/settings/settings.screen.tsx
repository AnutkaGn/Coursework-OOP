import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { styles } from "./settings.styles";
import { useAuthStore } from "src/store";
import { useFetchUser } from "../../hooks/use-fetch-user.hook";

export const SettingsScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { logout } = useAuthStore();
	const { fetchUser } = useFetchUser();

	useEffect(() => {
		fetchUser();
	}, []);

	const navigateToPersonalInfo = () => {
		navigation.navigate(NAVIGATION_KEYS.PERSONAL_INFO);
	};
	const navigateToChangePassword = () => {
		navigation.navigate(NAVIGATION_KEYS.CHANGE_PASSWORD);
	};
	const navigateToFAQ = () => {
		navigation.navigate(NAVIGATION_KEYS.FAQ);
	};

	return (
		<Layout>
			<Header title="Settings" />
			<TouchableOpacity onPress={navigateToPersonalInfo}>
				<Text style={styles.text}>Personal info</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={navigateToChangePassword}>
				<Text style={styles.text}>Change password</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={navigateToFAQ}>
				<Text style={styles.text}>FAQ</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={logout}>
				<Text style={styles.logout_text}>Logout</Text>
			</TouchableOpacity>
		</Layout>
	);
};
