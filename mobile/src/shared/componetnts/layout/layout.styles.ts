import { StyleSheet } from "react-native";
import { COLORS } from "src/shared/styles";

export const styles = StyleSheet.create({
	safe_area: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	scroll_container: {
		flexGrow: 1,
	},
	content: {
		flex: 1,
		padding: 20,
	},
});
