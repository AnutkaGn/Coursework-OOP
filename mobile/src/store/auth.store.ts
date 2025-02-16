import { asyncStorage } from "src/shared/services/async-storage.service";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
	accessToken: string | null;
	isAuth: boolean;
	setisAuth: (Auth: boolean) => void;
	setAccessToken: (token: string | null) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set, _get) => ({
			accessToken: null,
			isAuth: false,
			setisAuth: (Auth: boolean) =>
				set({
					isAuth: Auth,
				}),
			setAccessToken: (token: string | null) =>
				set({
					accessToken: token,
					isAuth: token !== null,
				}),

			logout: () => set({ accessToken: null, isAuth: false }),
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => asyncStorage),
		},
	),
);
