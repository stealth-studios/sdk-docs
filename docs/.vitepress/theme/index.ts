// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import "./style.css";
import VersionSwitcher from "vitepress-versioning-plugin/src/components/VersionSwitcher.vue";
import Layout from "./Layout.vue";
import "virtual:group-icons.css";

export default {
	extends: Theme,
	Layout: () => {
		return h(Layout);
	},
	enhanceApp({ app, router, siteData }) {
		app.component("VersionSwitcher", VersionSwitcher);
	},
};
