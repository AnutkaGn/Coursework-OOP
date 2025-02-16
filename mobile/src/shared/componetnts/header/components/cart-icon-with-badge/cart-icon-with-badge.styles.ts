import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	badge: {
		position: "absolute",
		width: 19,
		height: 19,
		borderRadius: 100,
		backgroundColor: COLORS.danger,
		justifyContent: "center",
		alignItems: "center",
		top: 12,
		left: 13,
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 8,
		color: COLORS.white,
	},
});
