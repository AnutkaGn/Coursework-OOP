import BottomSheet from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Loader } from "src/shared/componetnts";
import { CustomBottomSheet } from "src/shared/componetnts/bottom-sheet";
import {
	BottomSheetContext,
	useBottomSheet,
} from "src/shared/context/bottom-sheet.context";
import { FONTS } from "src/shared/styles";
import { RootNavigator } from "../navigation/components/root-navigator";

const queryClient = new QueryClient();

export const App = () => {
	const [fontsLoaded] = useFonts({
		[FONTS.POPPINS_BOLD]: require("../../../assets/fonts/Poppins-Bold.ttf"),
		[FONTS.POPPINS_SEMIBOLD]: require("../../../assets/fonts/Poppins-SemiBold.ttf"),
		[FONTS.POPPINS_REGULAR]: require("../../../assets/fonts/Poppins-Regular.ttf"),
		[FONTS.POPPINS_MEDIUM]: require("../../../assets/fonts/Poppins-Medium.ttf"),
		[FONTS.KAUSHAN_SCRIPT]: require("../../../assets/fonts/KaushanScript-Regular.ttf"),
	});
	const snapPoints = ["10%", "34%"];
	const bottomSheetRef = useRef<BottomSheet>(null);

	const bottomSheet = useBottomSheet(bottomSheetRef);

	if (!fontsLoaded) {
		return <Loader />;
	}

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<GestureHandlerRootView>
					<BottomSheetContext.Provider value={bottomSheet}>
						<RootNavigator />
						<Toast />
						<BottomSheet
							ref={bottomSheetRef}
							index={-1}
							snapPoints={snapPoints}
							enablePanDownToClose
						>
							<CustomBottomSheet />
						</BottomSheet>
					</BottomSheetContext.Provider>
				</GestureHandlerRootView>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
};
