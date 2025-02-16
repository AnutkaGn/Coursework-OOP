import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container_remove_text: {
		alignItems: "center",
		marginBlockStart: 30,
	},
	remove_text: {
		color: COLORS.danger,
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
	},
});
