import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../button";
import { styles } from "./verification-code-form.styles";

interface VerificationCodeFormProps {
	title: string;
	subtitle: string;
	codeLength?: number;
	onSubmit: (verificationCode: number) => void;
	isDisabledButtom: boolean;
}

export const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
	title,
	subtitle,
	codeLength = 4,
	onSubmit,
	isDisabledButtom,
}) => {
	const [code, setCode] = useState("");
	const inputRef = useRef<TextInput>(null);

	const handleInputChange = (text: string) => {
		if (text.length <= codeLength) {
			setCode(text);
		}
	};

	const handleFocus = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const handleVerify = () => {
		onSubmit(Number(code));
	};

	return (
		<KeyboardAwareScrollView
			style={styles.container}
			contentContainerStyle={{ flexGrow: 1 }}
			extraScrollHeight={20}
		>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>

			<View style={styles.codeContainer}>
				{Array(codeLength)
					.fill(0)
					.map((_, index) => (
						<TouchableWithoutFeedback key={index} onPress={handleFocus}>
							<View
								style={[
									styles.codeBox,
									index === code.length && styles.focusedCodeBox,
								]}
							>
								<Text style={styles.codeText}>{code[index] || ""}</Text>
							</View>
						</TouchableWithoutFeedback>
					))}
			</View>

			<TextInput
				ref={inputRef}
				value={code}
				onChangeText={handleInputChange}
				keyboardType="number-pad"
				maxLength={codeLength}
				style={styles.hiddenInput}
				autoFocus
			/>

			<Button
				onPress={handleVerify}
				title="Submit"
				buttonStyle={styles.button}
				disabled={isDisabledButtom}
			/>
		</KeyboardAwareScrollView>
	);
};
