import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		marginTop: 24,
		gap: 10,
		paddingHorizontal: 5,
	},
	item_container: {
		flexDirection: "column",
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
	},
	bold_text: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
	},
});
