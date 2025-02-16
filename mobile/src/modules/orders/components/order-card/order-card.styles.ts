import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	card: {
		backgroundColor: COLORS.background,
		borderColor: COLORS.text_secondary,
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 8,
		marginBottom: 16,
		borderRadius: 10,
		flexDirection: "column",
		minHeight: 72,
	},
	container: {
		flexDirection: "row",
		alignItems: "baseline",
		width: "80%",
	},
	bold_text: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
	},
});
