import React, { useState } from "react";
import { Button, Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { ConfirmationModal } from "../../components/confirmation-modal";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./personal-info.styles";
import { PersonalInfoForm } from "../../components/personal-info-from";
import { usePersonalInfo } from "../../hooks/use-personal-info.hook";

export const PersonalInfoScreen = () => {
	const [isModalVisible, setModalVisible] = useState<boolean>(false);
	const { control, handleSubmit, handleDeleteUser, isUpdating, isValid } =
		usePersonalInfo();

	return (
		<Layout>
			<Header title="Personal info" showBackButton />
			<PersonalInfoForm control={control} />
			<TouchableOpacity
				style={styles.text_container}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.text}>Delete Account</Text>
			</TouchableOpacity>
			<Button
				title="Save"
				onPress={() => handleSubmit()}
				disabled={isUpdating || !isValid}
			/>
			<ConfirmationModal
				visible={isModalVisible}
				onConfirm={handleDeleteUser}
				onCancel={() => setModalVisible(false)}
			/>
		</Layout>
	);
};
