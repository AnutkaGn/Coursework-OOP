import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	text_container: {
		marginBlockStart: 40,
	},
	text: {
		textAlign: "center",
		color: COLORS.danger,
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
	},
});
