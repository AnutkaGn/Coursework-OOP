import React from "react";
import { Layout } from "src/shared/componetnts";
import { NAVIGATION_KEYS } from "src/modules/navigation/types";
import { Logo } from "../../components/logo";
import { LoginForm } from "../../components/login-form";
import { AuthNav } from "../../components/auth-nav";

export const LoginScreen: React.FC = () => {
	return (
		<Layout>
			<Logo />
			<LoginForm />
			<AuthNav
				redirectText="Don't have an account? "
				linkText="Sign Up"
				navigationTarget={NAVIGATION_KEYS.SIGNUP}
			/>
		</Layout>
	);
};
