import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
	BottomSheetContext,
	BottomSheetData,
	IBottomSheetContext,
} from "src/shared/context/bottom-sheet.context";
import { PAYMENT_STATUS } from "src/shared/enum/payment-status.enum";
import { DELIVERY_STATUS } from "src/shared/enum/delivery-status.enum";
import { SORT_ORDER } from "src/shared/enum/sort-order.enum";
import { styles } from "./bottom-sheet.styles";
import { CheckCircleIcon } from "assets/icons/checkmark-circle-white";
import { COLORS } from "src/shared/styles";

interface Option {
	label: string;
	isSelected: boolean;
	onPress: () => void;
}

const OptionItem: React.FC<Option> = ({ label, isSelected, onPress }) => (
	<TouchableOpacity style={styles.option} onPress={onPress}>
		<Text style={isSelected ? styles.active_text : styles.text}>{label}</Text>
		{isSelected && <CheckCircleIcon color={COLORS.success} />}
	</TouchableOpacity>
);

export const CustomBottomSheet: React.FC = () => {
	const {
		sheetView,
		setPaymentStatusFilter,
		setSortOrderFilter,
		setDeliveryStatusFilter,
		paymentStatusFilter,
		sortOrderFilter,
		deliveryStatusFilter,
	} = useContext<IBottomSheetContext>(BottomSheetContext);

	const renderOptions = () => {
		switch (sheetView) {
			case BottomSheetData.PAYMENT_STATUS:
				return [
					{ label: "All", value: null },
					{ label: "Pending", value: PAYMENT_STATUS.PENDING },
					{ label: "Success", value: PAYMENT_STATUS.SUCCESS },
					{ label: "Failed", value: PAYMENT_STATUS.FAILED },
				].map(({ label, value }) => (
					<OptionItem
						key={label}
						label={label}
						isSelected={paymentStatusFilter === value}
						onPress={() => setPaymentStatusFilter?.(value)}
					/>
				));

			case BottomSheetData.DELIVERY_STATUS:
				return [
					{ label: "All", value: null },
					{ label: "Placed", value: DELIVERY_STATUS.PLACED },
					{ label: "In Transit", value: DELIVERY_STATUS.IN_TRANSIT },
					{ label: "Delivered", value: DELIVERY_STATUS.DELIVERED },
				].map(({ label, value }) => (
					<OptionItem
						key={label}
						label={label}
						isSelected={deliveryStatusFilter === value}
						onPress={() => setDeliveryStatusFilter?.(value)}
					/>
				));

			case BottomSheetData.DATE:
				return [
					{ label: "Desc > Asc", value: SORT_ORDER.DESC },
					{ label: "Asc > Desc", value: SORT_ORDER.ASC },
				].map(({ label, value }) => (
					<OptionItem
						key={label}
						label={label}
						isSelected={sortOrderFilter === value}
						onPress={() => setSortOrderFilter?.(value)}
					/>
				));

			default:
				return null;
		}
	};

	return (
		<BottomSheetView style={styles.contentContainer}>
			<Text style={styles.title}>
				{sheetView === BottomSheetData.PAYMENT_STATUS
					? "Payment Status"
					: sheetView === BottomSheetData.DELIVERY_STATUS
						? "Delivery Status"
						: "By Date"}
			</Text>
			{renderOptions()}
		</BottomSheetView>
	);
};
