import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container_link: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30,
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		color: COLORS.text_primary,
	},
	linkText: {
		fontSize: 16,
		fontFamily: FONTS.POPPINS_BOLD,
		color: COLORS.background_blue,
		textDecorationLine: "none",
	},
});
