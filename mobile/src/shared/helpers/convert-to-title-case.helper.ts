export const convertToTitleCase = <T extends string | undefined | null>(
	text: T,
): T | null => {
	if (!text) return null;
	return text
		.toLowerCase()
		.replace(/_/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase()) as T;
};
