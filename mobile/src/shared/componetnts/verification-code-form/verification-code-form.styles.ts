import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		marginBlockStart: 100,
		fontFamily: FONTS.POPPINS_BOLD,
		fontSize: 16,
		marginBottom: 50,
		textAlign: "center",
		color: COLORS.text_primary,
	},
	subtitle: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 14,
		marginBottom: 50,
		textAlign: "center",
		color: COLORS.text_secondary,
	},
	codeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 75,
	},
	codeBox: {
		width: 44,
		height: 50,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.border,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
	},
	focusedCodeBox: {
		borderColor: COLORS.border_focus,
	},
	codeText: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		color: COLORS.text_primary,
	},
	hiddenInput: {
		position: "absolute",
		opacity: 0,
		width: 1,
		height: 1,
	},
	button: {
		position: "absolute",
		bottom: 10,
		alignSelf: "center",
		width: "100%",
	},
});
