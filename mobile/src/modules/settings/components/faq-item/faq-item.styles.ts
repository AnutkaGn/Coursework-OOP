import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		marginBlockStart: 24,
		overflow: "hidden",
	},
	card_header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		backgroundColor: COLORS.background_light_grey,
	},
	title: {
		fontFamily: FONTS.POPPINS_MEDIUM,
		fontSize: 16,
		width: "90%",
	},
	arrow: {
		alignItems: "center",
		justifyContent: "center",
	},
	card_body: {
		backgroundColor: COLORS.background_light_grey,
	},
	text: {
		fontSize: 16,
		fontFamily: FONTS.POPPINS_REGULAR,
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	hidden_content: {
		position: "absolute",
		left: 0,
		right: 0,
	},
});
