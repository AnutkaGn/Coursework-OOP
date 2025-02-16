import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		padding: 20,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	message: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		color: COLORS.text_primary,
		textAlign: "center",
		marginBlockStart: 20,
	},
	button: {
		width: "100%",
	},
});
