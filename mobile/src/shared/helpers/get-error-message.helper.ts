export const getErrorMessage = (
	error?: string[] | string | { message: string; [key: string]: unknown },
): string => {
	if (typeof error === "string") {
		return error;
	}
	if (Array.isArray(error)) {
		return error.join(", ");
	}
	if (typeof error === "object" && error !== null && "message" in error) {
		return error.message;
	}
	return "Something went wrong. Please try again.";
};
