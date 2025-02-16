export interface User {
	id: string;
	fullName: string;
	phoneNumber: string;
	email: string;
	shippingAddress: string;
}

export interface UpdatePersonalInfoPayload {
	fullName: string;
	phoneNumber: string;
	shippingAddress: string;
}

export interface UpdatePasswordPayload {
	oldPassword: string;
	newPassword: string;
}

export interface UserResponse {
	statusCode: number;
	message: string;
	data: User;
}

export interface DeleteUserResponce {
	statusCode: number;
	message: string;
}
