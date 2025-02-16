export type SignUpPayload = {
	email: string;
	password: string;
	fullName: string;
	phoneNumber: string;
	shippingAddress: string;
};

export type SignUpResponse = {
	message: string;
	statusCode: number;
};

export type LoginPayload = {
	email: string;
	password: string;
};

export type AuthResponse = {
	data: string;
	message: string;
	statusCode: number;
};

export type VerifyEmailPayload = {
	email: string;
	verificationCode: number;
};

export type VerifyEmailResponse = {
	message: string;
	statusCode: number;
};
