import React from "react";
import { View, Text, Modal } from "react-native";
import { Button } from "src/shared/componetnts";
import { styles } from "./confirmation-modal.styles";

type ConfirmationModalProps = {
	visible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	visible,
	onConfirm,
	onCancel,
}) => {
	return (
		<Modal
			transparent
			visible={visible}
			animationType="fade"
			onRequestClose={onCancel}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.modalText}>
						Are you sure you want to delete your account?
					</Text>
					<View style={styles.buttonGroup}>
						<Button
							title="No"
							onPress={onCancel}
							buttonStyle={styles.noButton}
						/>
						<Button
							title="Yes"
							onPress={onConfirm}
							buttonStyle={styles.yesButton}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};
