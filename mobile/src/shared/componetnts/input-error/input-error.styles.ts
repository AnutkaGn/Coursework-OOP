import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	error: {
		marginBlockStart: 6,
		fontSize: 14,
		fontFamily: FONTS.POPPINS_MEDIUM,
		color: COLORS.danger,
	},
});
