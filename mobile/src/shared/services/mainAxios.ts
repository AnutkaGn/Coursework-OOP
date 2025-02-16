import type { AxiosResponse } from "axios";
import axios from "axios";
import { useAuthStore } from "src/store";

export const mainAxios = axios.create({
	withCredentials: true,
});

mainAxios.interceptors.response.use(
	(response): AxiosResponse<unknown, unknown> => {
		return response;
	},
	async (error) => {
		if (Boolean(error.response) && error.response.status === 401) {
			useAuthStore.getState().setAccessToken(null);
		}
		return Promise.reject(error);
	},
);
