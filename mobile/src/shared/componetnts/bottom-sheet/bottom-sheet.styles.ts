import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: 30,
		paddingVertical: 12,
	},
	title: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		textAlign: "center",
		fontSize: 18,
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
	},
	active_text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		color: COLORS.success,
		marginRight: 22,
	},
	option: {
		flexDirection: "row",
		marginBlockStart: 18,
	},
});
