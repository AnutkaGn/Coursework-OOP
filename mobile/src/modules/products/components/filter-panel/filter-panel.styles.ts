import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		marginBlockStart: 18,
	},
	icon_container: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBlockStart: 10,
		marginHorizontal: 10,
	},
	icon_buttons_container: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: 80,
		marginBlockEnd: 10,
	},
	icon_up_button: {
		padding: 6,
		transform: [{ rotate: "-90deg" }],
	},
	icon_down_button: {
		padding: 6,
		transform: [{ rotate: "90deg" }],
	},
	icon_cross_button: {
		padding: 6,
	},
	input: {
		width: "100%",
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 16,
		borderWidth: 1,
		borderRadius: 10,
		fontFamily: FONTS.POPPINS_REGULAR,
		color: COLORS.text_primary,
		borderColor: COLORS.border,
		backgroundColor: COLORS.white,
	},
});
