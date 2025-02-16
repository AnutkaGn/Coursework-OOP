export const formatDate = (
	dateString: string,
	format: string = "DD.MM.YYYY",
): string => {
	const date = new Date(dateString);

	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	const formatMap: { [key: string]: string } = {
		"DD": day,
		"MM": month,
		"YYYY": year.toString(),
	};

	return Object.entries(formatMap).reduce((formattedDate, [key, value]) => {
		return formattedDate.replace(key, value);
	}, format);
};
