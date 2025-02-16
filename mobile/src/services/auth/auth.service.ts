import { HttpFactoryService } from "src/shared/services/http-factory.service";
import type {
	SignUpPayload,
	LoginPayload,
	AuthResponse,
	VerifyEmailPayload,
	VerifyEmailResponse,
} from "./auth.types";

export class AuthService {
	private httpService = new HttpFactoryService().createHttpService();

	public async signUp(payload: SignUpPayload): Promise<AuthResponse> {
		return this.httpService.post<AuthResponse, SignUpPayload>(
			"auth/register",
			payload,
		);
	}

	public async login(payload: LoginPayload): Promise<AuthResponse> {
		return this.httpService.post<AuthResponse, LoginPayload>(
			"auth/login",
			payload,
		);
	}

	public async verifyEmail(
		payload: VerifyEmailPayload,
	): Promise<VerifyEmailResponse> {
		return await this.httpService.post<VerifyEmailResponse, VerifyEmailPayload>(
			"auth/verify",
			payload,
		);
	}

	public async logout(): Promise<void> {
		return this.httpService.post<void, {}>("auth/logout", {});
	}
}

export const authService = new AuthService();
