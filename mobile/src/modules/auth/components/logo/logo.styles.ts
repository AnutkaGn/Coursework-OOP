import { StyleSheet } from "react-native";
import { FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	title: {
		fontFamily: FONTS.KAUSHAN_SCRIPT,
		fontSize: 40,
		marginBottom: 20,
		textAlign: "center",
	},
	image: {
		marginBlockStart: 85,
		marginBottom: 30,
		alignSelf: "center",
		width: 50,
		height: 45,
	},
});
