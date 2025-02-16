import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	text: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		alignSelf: "center",
		marginBlockStart: "30%",
		color: COLORS.text_primary,
		fontSize: 16,
	},
});
