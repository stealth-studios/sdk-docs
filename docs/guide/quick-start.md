# Quickstart Guide

Welcome to the Stealth SDK Quickstart Guide! This guide will walk you through the process of setting up Stealth SDK in your project and creating your first AI-powered experience.

## 🚀 Getting Started

Before you begin, we recommend the following prerequisites:

- [Node 23 or higher](https://nodejs.org/)
- Any preferred Node package manager (NPM, PNPM, Yarn, Bun, etc)

Now you're ready to get started!

First, create a new project directory and navigate into it:

```sh
mkdir my-stealth-project
cd my-stealth-project
```

Next, initialize a new Node project:

```sh
npm init -y
```

## 📦 Installation

The SDK runs on a core package, used to connect the framework and adapters together. You can install it as follows:

::: code-group

```sh [npm]
npm install @stealthstudios/sdk-core
```

```sh [yarn]
yarn add @stealthstudios/sdk-core
```

```sh [pnpm]
pnpm add @stealthstudios/sdk-core
```

```sh [bun]
bun add @stealthstudios/sdk-core
```

:::

## 🔧 Setting Up The Backend

For the sake of simplicity, we will be using the [Basic Framework](../frameworks/basic) and the [SQLite Adapter](../adapters/sqlite) in this guide. You can replace these with any other framework or adapter of your choice.

Install these packages using your preferred package manager:

::: code-group

```sh [npm]
npm install @stealthstudios/sdk-framework-basic @stealthstudios/sdk-adapter-sqlite
```

```sh [yarn]
yarn add @stealthstudios/sdk-framework-basic @stealthstudios/sdk-adapter-sqlite
```

```sh [pnpm]
pnpm add @stealthstudios/sdk-framework-basic @stealthstudios/sdk-adapter-sqlite
```

```sh [bun]
bun add @stealthstudios/sdk-framework-basic @stealthstudios/sdk-adapter-sqlite
```

:::

To get your backend up and running, you'll need to create a new instance of the SDK core package. Here's how you can do it:

```js
import { Core } from "@stealthstudios/sdk-core";
import BasicFramework from "@stealthstudios/sdk-framework-basic";
import SQLiteAdapter from "@stealthstudios/sdk-adapter-sqlite";

const core = new Core({
	adapter: new SQLiteAdapter({
		connectionString: "file:./db.sqlite",
	}),
	framework: new BasicFramework({
		apiKey: "YOUR_AI_API_KEY", // Replace with your OpenAI API key, preferably from a .env file
		provider: "openai", // Or any other provider - supported: openai, anthropic, deepseek
		model: "chatgpt-4o-latest", // Or any other model that your provider supports
		memorySize: 15, // How many previous messages should be stored in context? Higher values = higher token usage
	}),
	config: {
		host: "0.0.0.0",
		port: 3000, // Port to run the server on
		endpointAuth: "YOUR_ENDPOINT_AUTH", // Key to authenticate with the server
	},
});

core.start();
```

You can run this script using Node:

```sh
node index.js
```

Now you have a basic backend setup with the Basic Framework and SQLite Adapter. You can customize this setup further by using different frameworks and adapters, as well as tweaking the configuration options to suit your needs.

## 🎮 Creating Your First AI-Powered Experience

There are many ways to integrate AI into your project using Stealth SDK, through any of our available clients. You may view the documentation for all clients in the sidebar, which will feature examples and guides on how to use them.
