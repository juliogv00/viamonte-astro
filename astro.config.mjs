import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			plugins: [formsPlugin()],
		}),
	],
	devToolbar: { enabled: false },
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ["astro:zod", "emdash", "@emdash-cms/cloudflare", "@emdash-cms/plugin-forms"],
		},
		ssr: {
			external: [
				"@tiptap/extension-collaboration",
				"@tiptap/y-tiptap",
				"yjs",
				"y-protocols",
			],
		},
	},
});
