import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./layout.styles";
import { SafeAreaView } from "react-native-safe-area-context";

type LayoutProps = {
	children: React.ReactNode;
	isScrollable?: boolean;
};

export const Layout: React.FC<LayoutProps> = ({
	children,
	isScrollable = true,
}) => {
	const content = <View style={styles.content}>{children}</View>;

	return (
		<SafeAreaView style={styles.safe_area}>
			{isScrollable ? (
				<ScrollView
					contentContainerStyle={styles.scroll_container}
					showsVerticalScrollIndicator={false}
				>
					{content}
				</ScrollView>
			) : (
				content
			)}
		</SafeAreaView>
	);
};
