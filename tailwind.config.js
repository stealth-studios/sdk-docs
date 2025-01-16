const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./docs/.vitepress/**/*.js",
		"./docs/.vitepress/**/*.vue",
		"./docs/.vitepress/**/*.ts",
	],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			keyframes: {
				blur: {
					"0%": {
						filter: "blur(100px)",
						opacity: "var(--tw-blur-opacity, 0.2)",
					},
					"50%": {
						filter: "blur(0px)",
						opacity: "var(--tw-blur-opacity, 0.3)",
					},
					"100%": {
						filter: "blur(100px)",
						opacity: "var(--tw-blur-opacity, 0.2)",
					},
				},
			},
			animation: {
				blur: "blur 6s cubic-bezier(0.4, 0.0, 0.6, 1.0) infinite",
			},
		},
		colors: {
			amber: colors.amber,
			zinc: colors.zinc,
			white: colors.white,
			indigo: colors.indigo,
		},
	},
	plugins: [],
};
