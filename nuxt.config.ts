// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			title: "Home",
			meta: [{ name: "description", content: "Ipesa" }],
			script: [{ children: `` }],
			link: [{ rel: "icon", type: "image/x-icon", href: "/ipesa-favicon.png" }],
		},
	},

	ssr: false,
	nitro: {
		preset: "static",
	},
	devtools: { enabled: true },
	imports: {
		dirs: ["stores"],
	},
	css: ["~/assets/css/main.styl"],
	plugins: [],

	vite: {
		define: {
			global: {},
		},
	},

	runtimeConfig: {
		public: {
			apiBaseUrl: "",
			// apiBaseUrl: 'http://127.0.0.1:8000'
		},
	},

	modules: [
		"@pinia/nuxt",
		"floating-vue/nuxt",
		"@sentry/nuxt/module",
		"@nuxt/ui",
	],
	sourcemap: { client: true },
	compatibilityDate: "2024-08-08",
});
