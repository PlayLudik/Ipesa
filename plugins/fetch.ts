import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();

	const fetchWithToken = (
		url: string,
		options: { headers?: Record<string, string> } = {}
	) => {
		const authStore = useAuthStore(); // Obtén el store dinámicamente
		const token = authStore.token; // Accede al token actualizado

		const baseUrl = config.public.apiBaseUrl;

		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
		};

		return $fetch(`${baseUrl}/api/v1${url}`, options);
	};

	const fetchWithoutToken = (
		url: string,
		options: { headers?: Record<string, string> } = {}
	) => {
		const baseUrl = config.public.apiBaseUrl;
		return $fetch(`${baseUrl}/api/v1${url}`, options);
	};

	const fetchNoApi = (
		url: string,
		options: { headers?: Record<string, string> } = {}
	) => {
		return $fetch(`${url}`, options);
	};

	return {
		provide: {
			fetch: fetchWithoutToken,
			fetchWithToken: fetchWithToken,
			fetchNoApi,
		},
	};
});
