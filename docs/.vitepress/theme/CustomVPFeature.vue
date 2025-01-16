<script setup lang="ts">
	import type { DefaultTheme } from "vitepress/theme";
	import { VPImage } from "vitepress/theme";

	defineProps<{
		icon?: DefaultTheme.FeatureIcon;
		title: string;
		details?: string;
		link?: string;
		linkText?: string;
		rel?: string;
		target?: string;
	}>();
</script>

<template>
	<div
		class="block border shadow-md border-zinc-200 dark:border-zinc-800 rounded-xl h-full bg-white/50 backdrop-blur-md dark:bg-zinc-900/50 transition-all ease-out duration-200 hover:border-amber-400 dark:hover:border-amber-300 hover:scale-[1.01] hover:shadow-lg hover:-translate-y-0.5 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
	>
		<article class="box">
			<div v-if="typeof icon === 'object' && icon.wrap" class="icon">
				<VPImage
					:image="icon"
					:alt="icon.alt"
					:height="icon.height || 48"
					:width="icon.width || 48"
				/>
			</div>
			<VPImage
				v-else-if="typeof icon === 'object'"
				:image="icon"
				:alt="icon.alt"
				:height="icon.height || 48"
				:width="icon.width || 48"
			/>
			<div v-else-if="icon" class="icon" v-html="icon"></div>
			<h2 class="title" v-html="title"></h2>
			<p v-if="details" class="details" v-html="details"></p>

			<div v-if="linkText" class="link-text">
				<p class="link-text-value">
					{{ linkText }} <span class="vpi-arrow-right link-text-icon" />
				</p>
			</div>
		</article>
	</div>
</template>

<style scoped>
	.VPFeature.link:hover {
		border-color: var(--vp-c-brand-1);
	}

	.box {
		display: flex;
		flex-direction: column;
		padding: 24px;
		height: 100%;
	}

	.box > :deep(.VPImage) {
		margin-bottom: 20px;
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
		border-radius: 6px;
		background-color: var(--vp-c-default-soft);
		width: 48px;
		height: 48px;
		font-size: 24px;
		transition: background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.title {
		line-height: 24px;
		font-size: 16px;
		font-weight: 600;
		transition: color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.details {
		flex-grow: 1;
		padding-top: 8px;
		line-height: 24px;
		font-size: 14px;
		font-weight: 500;
		color: var(--vp-c-text-2);
		transition: color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.link-text {
		padding-top: 8px;
	}

	.link-text-value {
		display: flex;
		align-items: center;
		font-size: 14px;
		font-weight: 500;
		color: var(--vp-c-brand-1);
	}

	.link-text-icon {
		margin-left: 6px;
		transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.link-text-value:hover .link-text-icon {
		transform: translateX(4px);
	}
</style>
