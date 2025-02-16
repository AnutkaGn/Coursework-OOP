import { HttpFactoryService } from "src/shared/services/http-factory.service";
import type {
	DeleteUserResponce,
	UpdatePasswordPayload,
	UpdatePersonalInfoPayload,
	UserResponse,
} from "./user.type";

export class UserService {
	private httpService = new HttpFactoryService().createAuthHttpService();

	public async getUser(): Promise<UserResponse> {
		return this.httpService.get<UserResponse>("user");
	}

	async updatePersonalInfo(
		payload: UpdatePersonalInfoPayload,
	): Promise<UserResponse> {
		return this.httpService.patch<UserResponse, UpdatePersonalInfoPayload>(
			"user/profile",
			payload,
		);
	}

	public async updatePassword(
		payload: UpdatePasswordPayload,
	): Promise<UserResponse> {
		return this.httpService.patch<UserResponse, UpdatePasswordPayload>(
			"user/change-password",
			payload,
		);
	}

	public async delete(): Promise<DeleteUserResponce> {
		return this.httpService.delete<DeleteUserResponce>("user");
	}
}

export const userService = new UserService();
