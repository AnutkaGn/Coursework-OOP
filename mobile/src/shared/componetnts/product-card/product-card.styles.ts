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
		flexDirection: "row",
		minHeight: 72,
		justifyContent: "space-between",
	},
	card_content: {
		flexDirection: "column",
		justifyContent: "space-between",
		width: "72%",
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
	},
	container_price_amount: {
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "space-between",
	},
	container_price: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "baseline",
	},
	container_amount: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	bold_text: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
	},
	icon: {
		width: "15%",
		justifyContent: "center",
		alignItems: "center",
	},
});
