import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	card: {
		backgroundColor: COLORS.background,
		borderColor: COLORS.text_secondary,
		borderWidth: 1,
		paddingHorizontal: 8,
		paddingVertical: 6,
		marginBottom: 16,
		borderRadius: 10,
		flexDirection: "row",
		minHeight: 82,
		justifyContent: "space-between",
	},
	card_content: {
		flexDirection: "column",
		justifyContent: "space-between",
		width: "60%",
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
	},
	container_price: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		alignItems: "baseline",
		width: "37%",
	},
	container_category: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "baseline",
	},
	bold_text: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
	},
});
