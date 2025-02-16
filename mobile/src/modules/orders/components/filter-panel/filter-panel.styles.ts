import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	wrapper: {
		marginVertical: 18,
	},
	title: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
		marginBlockEnd: 8,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	bold_text: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		color: COLORS.success,
	},
});
