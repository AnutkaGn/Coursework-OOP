import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: COLORS.text_primary,
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
		textAlign: "center",
		marginVertical: 30,
	},
	botton_title: {
		color: COLORS.white,
		fontSize: 16,
		fontFamily: FONTS.POPPINS_BOLD,
		marginLeft: 10,
	},
});
