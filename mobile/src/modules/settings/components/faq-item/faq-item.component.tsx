import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
	useSharedValue,
} from "react-native-reanimated";
import { RightArrowIcon } from "assets/icons/right-arrow";
import { styles } from "./faq-item.styles";

interface FAQItemProps {
	question: string;
	answer: string;
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentHeight = useSharedValue(0);
	const rotation = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		height: withTiming(isOpen ? contentHeight.value : 0, {
			duration: 300,
		}),
	}));

	const arrowStyle = useAnimatedStyle(() => ({
		transform: [
			{
				rotate: withTiming(isOpen ? "90deg" : "0deg", {
					duration: 300,
				}),
			},
		],
	}));

	const toggleExpand = () => {
		setIsOpen((prev) => !prev);
		rotation.value = isOpen ? 45 : 90;
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.card_header} onPress={toggleExpand}>
				<Text style={styles.title}>{question}</Text>
				<Animated.View style={[styles.arrow, arrowStyle]}>
					<RightArrowIcon />
				</Animated.View>
			</TouchableOpacity>

			<Animated.View style={[styles.card_body, animatedStyle]}>
				<View
					style={styles.hidden_content}
					onLayout={(e) => {
						contentHeight.value = e.nativeEvent.layout.height;
					}}
				>
					<Text style={styles.text}>{answer}</Text>
				</View>
			</Animated.View>
		</View>
	);
};
