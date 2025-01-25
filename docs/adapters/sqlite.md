# 🚀 SQLite Adapter

The SQLite Adapter is a database adapter for the Stealth SDK that allows you to store conversation data in a SQLite database. This adapter is useful for applications that require a lightweight and easy-to-use storage solution for conversation data.

## 🚧 Installation

To use the SQLite Adapter, you need to add it to your project:

::: code-group

```sh [npm]
npm install @stealthstudios/sdk-adapter-sqlite
```

```sh [yarn]
yarn add @stealthstudios/sdk-adapter-sqlite
```

```sh [pnpm]
pnpm add @stealthstudios/sdk-adapter-sqlite
```

```sh [bun]
bun add @stealthstudios/sdk-adapter-sqlite
```

:::

## 🚀 Usage

To use the adapter, you need to create an instance of the `SQLiteAdapter` class and pass it the necessary configuration options. Here's a simple example:

```typescript
const core = new Core({
	adapter: new SQLiteAdapter({ // [!code focus]
		connectionString: "file:./db.sqlite", // [!code focus]
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

Ensure that the database URL conforms to libSQL's URL format. The library will automatically create the necessary tables in the database.

## 🛠️ Configuration

The SQLite Adapter supports the following configuration options:

- `file`: The path to your SQLite database file. Prefix the path with `file:` to use a local file.
