import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";
import { Ionicons } from "@expo/vector-icons";

export const styles = StyleSheet.create({
	container: {
		position: "relative",
		paddingBottom: 20,
		marginBottom: 10,
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
	label: {
		marginBottom: 6,
		fontSize: 14,
		color: COLORS.text_secondary,
		fontFamily: FONTS.POPPINS_MEDIUM,
	},
	focused: {
		borderWidth: 1,
		borderColor: COLORS.border_focus,
	},
	wrong: {
		borderWidth: 1,
		borderColor: COLORS.danger,
	},
	correct: {
		borderWidth: 1,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		fontSize: 27,
	},
	iconContainer: {
		position: "absolute",
		right: 15,
		top: 45,
	},
	disabled: {
		backgroundColor: COLORS.background_light_grey,
		color: COLORS.text_secondary,
	},
});
