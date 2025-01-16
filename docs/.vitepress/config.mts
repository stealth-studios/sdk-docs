import defineVersionedConfig from "vitepress-versioning-plugin";
import { fileURLToPath, URL } from "url";
import fs from "fs";
import path from "path";
import {
	groupIconVitePlugin,
	groupIconMdPlugin,
} from "vitepress-plugin-group-icons";

// https://vitepress.dev/reference/site-config
export default defineVersionedConfig(
	{
		title: "Stealth SDK",
		base: "/docs/",
		description:
			"Seamlessly deploy sophisticated intelligences into dynamic game worlds.",
		cleanUrls: true,
		head: [
			[
				"link",
				{
					rel: "icon",
					href: "/docs/favicon-light.ico",
					media: "(prefers-color-scheme: light)",
				},
			],
			[
				"link",
				{
					rel: "icon",
					href: "/docs/favicon-dark.ico",
					media: "(prefers-color-scheme: dark)",
				},
			],
		],
		themeConfig: {
			editLink: {
				pattern:
					"https://github.com/stealth-studios/sdk-docs/edit/main/docs/:path",
			},
			versionSwitcher: false,
			// https://vitepress.dev/reference/default-theme-config
			nav: [
				{ text: "Home", link: "/" },
				{ text: "Guide", link: "/guide/overview" },
				...(() => {
					const categories = ["adapters", "clients", "frameworks"];
					const result: {
						text: string;
						items: {
							text: string;
							link: string;
						}[];
					}[] = [];

					categories.forEach((category) => {
						const categoryPath = path.join(__dirname, "../", category);
						let items: {
							text: string;
							link: string;
						}[] = [];

						if (fs.existsSync(categoryPath)) {
							items = fs
								.readdirSync(categoryPath)
								.filter((file) => file.endsWith(".md"))
								.map((file) => ({
									text: path
										.basename(file, ".md")
										.split("-")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" "),
									link: `/${category}/${path.basename(file, ".md")}`,
								}));
						}

						result.push({
							text: category.charAt(0).toUpperCase() + category.slice(1),
							items: items,
						});
					});

					return result;
				})(),
				{
					component: "VersionSwitcher",
				},
			],

			sidebar: {
				"/": [
					{
						text: "Introduction",
						items: [
							{ text: "Overview", link: "/guide/overview" },
							{ text: "Quick Start", link: "/guide/quick-start" },
							{ text: "FAQ", link: "/guide/faq" },
						],
					},
					{
						text: "Clients",
						items: [
							{ text: "Roblox", link: "/clients/roblox" },
							{ text: "TypeScript", link: "/clients/typescript" },
						],
					},
					{
						text: "Frameworks",
						items: [
							{ text: "Basic", link: "/frameworks/basic" },
							{ text: "Eliza", link: "/frameworks/eliza" },
						],
					},
					{
						text: "Adapters",
						items: [{ text: "PostgreSQL", link: "/adapters/postgres" }],
					},
				],
			},

			socialLinks: [
				{ icon: "github", link: "https://github.com/stealth-studios" },
				{ icon: "x", link: "https://x.com/StealthSDK" },
			],
		},
		markdown: {
			config(md) {
				md.use(groupIconMdPlugin);
			},
		},
		vite: {
			plugins: [groupIconVitePlugin()],
			resolve: {
				alias: [
					{
						find: /^.*\/VPFeature\.vue$/,
						replacement: fileURLToPath(
							new URL("./theme/CustomVPFeature.vue", import.meta.url)
						),
					},
					{
						find: /^.*\/VPFeatures\.vue$/,
						replacement: fileURLToPath(
							new URL("./theme/CustomVPFeatures.vue", import.meta.url)
						),
					},
					{
						find: /^.*\/VPHero\.vue$/,
						replacement: fileURLToPath(
							new URL("./theme/CustomVPHero.vue", import.meta.url)
						),
					},
					{
						find: /^.*\/VPButton\.vue$/,
						replacement: fileURLToPath(
							new URL("./theme/CustomVPButton.vue", import.meta.url)
						),
					},
				],
			},
		},
		versioning: {
			latestVersion: "1.0.0",
		},
	},
	__dirname
);
