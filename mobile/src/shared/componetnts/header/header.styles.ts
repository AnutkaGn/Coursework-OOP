import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 12,
		backgroundColor: COLORS.background,
		margin: -20,
	},
	icon_button: {
		paddingVertical: 8,
	},
	title: {
		fontSize: 24,
		color: COLORS.text_primary,
		fontFamily: FONTS.POPPINS_BOLD,
		textAlign: "center",
		flex: 1,
	},
});
