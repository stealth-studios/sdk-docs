# 🚀 Postgres Adapter

The Postgres Adapter is a database adapter for the Stealth SDK that allows you to store conversation data in a PostgreSQL database. This adapter is useful for applications that require a more robust and scalable storage solution for conversation data.

## 🚧 Installation

In order to use the Postgres Adapter, you first need to set up a PostgreSQL database. The recommended way to do so is [through Docker](https://docs.docker.com/engine/examples/postgresql_service/).

Get started by adding the Postgres Adapter to your project:

::: code-group

```sh [npm]
npm install @stealthstudios/sdk-adapter-postgres
```

```sh [yarn]
yarn add @stealthstudios/sdk-adapter-postgres
```

```sh [pnpm]
pnpm add @stealthstudios/sdk-adapter-postgres
```

```sh [bun]
bun add @stealthstudios/sdk-adapter-postgres
```

:::

## 🚀 Usage

To use the adapter, you need to create an instance of the `PostgresAdapter` class and pass it the necessary configuration options. Here's a simple example:

```typescript
const core = new Core({
	adapter: new PostgresAdapter({ // [!code focus]
		connectionString: "CONNECTION_STRING_HERE", // [!code focus]
	}), // [!code focus]
	framework: new BasicFramework({
		apiKey: process.env.API_KEY!,
		provider: "openai",
		model: "chatgpt-4o-latest",
		memorySize: 15,
	}),
	config: {
		host: "0.0.0.0",
		port: 3000,
		endpointAuth: "YOUR_ENDPOINT_AUTH",
	},
});
```

Ensure that you have a PostgreSQL database set up and running, and replace `CONNECTION_STRING_HERE` with the connection string for your database. The library will automatically create the necessary tables in the database through Drizzle.

## 🛠️ Configuration

The Postgres Adapter supports the following configuration options:

- `connectionString`: The connection string for your PostgreSQL database
