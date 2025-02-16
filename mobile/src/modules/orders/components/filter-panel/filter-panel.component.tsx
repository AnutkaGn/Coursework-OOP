import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
	BottomSheetContext,
	BottomSheetData,
	IBottomSheetContext,
} from "src/shared/context/bottom-sheet.context";
import { SORT_ORDER } from "src/shared/enum/sort-order.enum";
import { convertToTitleCase } from "src/shared/helpers";
import { styles } from "./filter-panel.styles";
import { GetAllOrdersQuery } from "src/services/order";

interface FilterPanelProps {
	onFilterChange: (filters: Partial<GetAllOrdersQuery>) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
	const {
		showSheet,
		paymentStatusFilter,
		deliveryStatusFilter,
		sortOrderFilter,
	} = useContext<IBottomSheetContext>(BottomSheetContext);

	useEffect(() => {
		onFilterChange({
			paymentStatus: paymentStatusFilter ?? undefined,
			deliveryStatus: deliveryStatusFilter ?? undefined,
			sortDirection: sortOrderFilter,
		});
	}, [paymentStatusFilter, deliveryStatusFilter, sortOrderFilter]);

	return (
		<View style={styles.wrapper}>
			<Text style={styles.title}>Filter by</Text>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => showSheet?.(BottomSheetData.PAYMENT_STATUS)}
				>
					<Text style={styles.bold_text}>Payment:</Text>
					<Text style={styles.text}>
						{convertToTitleCase(paymentStatusFilter) ?? "All"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => showSheet?.(BottomSheetData.DELIVERY_STATUS)}
				>
					<Text style={styles.bold_text}>Delivery:</Text>
					<Text style={styles.text}>
						{convertToTitleCase(deliveryStatusFilter) ?? "All"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => showSheet?.(BottomSheetData.DATE)}>
					<Text style={styles.bold_text}>Date:</Text>
					<Text style={styles.text}>
						{sortOrderFilter === SORT_ORDER.ASC ? "Desc > Asc" : "Asc > Desc"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
