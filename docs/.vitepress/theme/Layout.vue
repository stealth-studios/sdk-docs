<template>
	<div class="h-[100vh]">
		<DefaultTheme.Layout class="!block">
			<template #home-features-after> </template>
		</DefaultTheme.Layout>
		<div
			v-if="frontmatter.layout === 'home'"
			class="pointer-events-none z-[-1] h-[100vh] absolute top-0 w-full hero-gradient blur-lg animate-blur overflow-hidden"
		/>
	</div>
</template>

<script setup>
	import DefaultTheme, { VPImage } from "vitepress/theme";
	import { useData, withBase } from "vitepress";
	import { useFavicon } from "@vueuse/core";

	const { frontmatter } = useData();

	// use favicon-dark and light depending on the theme (check for dark class on html)
	const icon = useFavicon();

	const updateFavicon = () => {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			// dark mode
			icon.value = withBase("/favicon-dark.ico");
		} else {
			// light mode
			icon.value = withBase("/favicon-light.ico");
		}
	};

	// Initial favicon set
	updateFavicon();

	// Watch for theme changes
	if (typeof window !== "undefined") {
		const observer = new MutationObserver(updateFavicon);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
	}
</script>
