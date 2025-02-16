import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: COLORS.background_blur,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: COLORS.white,
		padding: 30,
		borderRadius: 10,
		width: "80%",
		alignItems: "center",
		justifyContent: "center",
	},
	modalText: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		marginBottom: 16,
		textAlign: "center",
	},
	buttonGroup: {
		flexDirection: "row",
	},
	yesButton: {
		backgroundColor: COLORS.background_blue,
		width: 80,
		alignSelf: "center",
	},
	noButton: {
		width: 80,
		backgroundColor: COLORS.background_red,
		alignSelf: "center",
	},
});
