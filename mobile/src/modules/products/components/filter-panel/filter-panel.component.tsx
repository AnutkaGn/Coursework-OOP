import React, { useCallback, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { CrossIcon } from "assets/icons/cross";
import { RightArrowIcon } from "assets/icons/right-arrow";
import useDebounceEffect from "src/shared/hooks/use-debounce-effect.hooks";
import { COLORS } from "src/shared/styles";
import { SORT_ORDER, SortOrder } from "src/shared/enum/sort-order.enum";
import { styles } from "./filter-panel.styles";

interface FilterPanelProps {
	onFilterChange: (filters: {
		name: string;
		sortByPrice: SortOrder | undefined | string;
	}) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
	const [name, setName] = useState<string>("");
	const [sortByPrice, setSortByPrice] = useState<SortOrder | undefined | string>(
		undefined,
	);

	const debouncedName = useDebounceEffect(name, 800);

	const handleSearch = useCallback(() => {
		onFilterChange({ name: debouncedName, sortByPrice });
	}, [debouncedName, sortByPrice]);

	useEffect(() => {
		handleSearch();
	}, [debouncedName, sortByPrice]);

	const handleReset = () => {
		setName("");
		setSortByPrice(undefined);
		onFilterChange({ name: "", sortByPrice: undefined });
	};

	const handleSort = (direction: SortOrder | string) => {
		setSortByPrice(direction);
		onFilterChange({ name: debouncedName, sortByPrice: direction });
	};

	return (
		<View style={styles.container}>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder="Enter product name"
				style={styles.input}
			/>
			<View style={styles.icon_container}>
				<View style={styles.icon_buttons_container}>
					<TouchableOpacity
						onPress={() => handleSort("ASC")}
						style={styles.icon_up_button}
					>
						<RightArrowIcon
							fillColor={
								sortByPrice === "ASC"
									? COLORS.background_blue
									: COLORS.text_primary
							}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleSort("DESC")}
						style={styles.icon_down_button}
					>
						<RightArrowIcon
							fillColor={
								sortByPrice === "DESC"
									? COLORS.background_blue
									: COLORS.text_primary
							}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={handleReset}
					style={styles.icon_cross_button}
				>
					<CrossIcon />
				</TouchableOpacity>
			</View>
		</View>
	);
};
