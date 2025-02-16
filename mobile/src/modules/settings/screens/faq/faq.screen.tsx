import React from "react";
import { Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { FAQItem } from "../../components/faq-item";
import { faqData } from "../../constants/faq-data.constant";

export const FaqScreen: React.FC = () => {
	return (
		<Layout>
			<Header title="FAQ" showBackButton />
			{faqData.map((item, index) => (
				<FAQItem key={index} question={item.question} answer={item.answer} />
			))}
		</Layout>
	);
};
