import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.background_blue,
		height: 48,
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},
	button_text: {
		color: COLORS.white,
		fontSize: 16,
		fontFamily: FONTS.POPPINS_BOLD,
	},
	disabled_button: {
		backgroundColor: COLORS.background_inactive,
	},
	sticky_container: {
		flex: 1,
		justifyContent: "flex-end",
	},
});
