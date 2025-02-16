import React from "react";
import { Text } from "react-native";
import { Layout } from "src/shared/componetnts";
import { styles } from "./sign-up.styles";
import { NAVIGATION_KEYS } from "src/modules/navigation/types";
import { SignUpForm } from "../../components/sign-up-form";
import { AuthNav } from "../../components/auth-nav";

export const SignUpScreen = () => {
	return (
		<Layout>
			<Text style={styles.title}>Sign Up</Text>
			<SignUpForm />
			<AuthNav
				redirectText="Have you already registered? "
				linkText="Sign In"
				navigationTarget={NAVIGATION_KEYS.LOGIN}
			/>
		</Layout>
	);
};
