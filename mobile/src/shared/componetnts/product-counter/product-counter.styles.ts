import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	title: {
		fontSize: 16,
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		marginHorizontal: 5,
		marginTop: 20,
	},
	container: {
		flexDirection: "column",
	},
	button: {
		width: 46,
		height: 48,
		borderRadius: 100,
		backgroundColor: COLORS.background_blue,
		justifyContent: "center",
		alignItems: "center",
	},
	button_text: {
		fontSize: 24,
		color: COLORS.white,
		fontFamily: FONTS.POPPINS_BOLD,
		paddingTop: 4,
	},
	counter_container: {
		flexDirection: "row",
		alignSelf: "center",
		marginTop: 15,
	},
	counter: {
		width: 44,
		height: 50,
		borderRadius: 10,
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
		borderColor: COLORS.background_inactive,
		borderWidth: 1,
		marginHorizontal: 20,
	},
	counter_text: {
		fontSize: 16,
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		paddingTop: 4,
	},
	disabled_button: {
		backgroundColor: COLORS.background_grey,
	},
});
