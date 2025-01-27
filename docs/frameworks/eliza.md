---
outline: [2, 3]
---

# Eliza Framework

The Eliza Framework is a no-nonsense framework that provides a strong base for building advanced AI agents, powered by [ai16z's Eliza](https://github.com/ai16z/eliza).

## 📦 What's Included

The Eliza framework comes with everything you need for building advanced AI agents:

- **Conversation Management**: Keep track of ongoing conversations and their states
- **Smart Context Tracking**: Eliza uses an advanced RAG (Retrieval-Augmented Generation) system to maintain context across multiple messages for more natural interactions.
- **More customization**: Through full support of the [characterfile format](https://github.com/ai16z/characterfile), even more customization is possible.

## 🚀 Installation

Get started by adding the Eliza Framework to your project:

::: code-group

```sh [npm]
npm install @stealthstudios/sdk-framework-eliza
```

```sh [yarn]
yarn add @stealthstudios/sdk-framework-eliza
```

```sh [pnpm]
pnpm add @stealthstudios/sdk-framework-eliza
```

```sh [bun]
bun add @stealthstudios/sdk-framework-eliza
```

:::

## 🔧 Usage

To use the Eliza framework, you need to create an instance of the `ElizaFramework` class and pass it the necessary configuration options.
The Eliza framework does not use a StealthSDK adapter, but instead uses it's own adapter system. To account for this, the `EmptyAdapter` is used as a placeholder. Available adapters can be found [here](https://elizaos.github.io/eliza/docs/packages/adapters/).

A simple example on how to use the Eliza framework with SQLite can be found below:

```typescript
const core = new Core({
	adapter: new EmptyAdapter({}), // [!code focus]
	framework: new ElizaFramework({ // [!code focus]
		adapter: new SqliteDatabaseAdapter(new Database("./local.db")), // [!code focus]
		provider: "openai", // [!code focus]
		model: "gpt-4o-mini", // [!code focus]
		apiKey: process.env.API_KEY!, // [!code focus]
		elizaConfig: { // [!code focus]
			USE_OPENAI_EMBEDDING: "true", // [!code focus]
		}, // [!code focus]
	}), // [!code focus]
	config: {
		host: "0.0.0.0",
		port: 3000,
		endpointAuth: "YOUR_ENDPOINT_AUTH",
	},
});
```

You may pass additional configuration options to the Eliza framework through the `elizaConfig` field. These are identical to the options that you would normally pass in environment variables to Eliza.

## 📝 Configuration

The Eliza Framework supports the following configuration options:

- `adapter`: The adapter to use for storing and retrieving context.
- `provider`: The AI provider to use for generating responses. Any provider supported by Eliza is supported.
- `model`: The specific AI model to use for generating responses. Ensure that the model is supported by the provider.
- `apiKey`: Your API key for the AI model provider
- `elizaConfig`: The configuration options to pass to Eliza. These are identical to the options that you would normally pass in environment variables to Eliza.

## 🤖 Character Format

The Eliza Framework uses a structured format for defining AI characters. Here's the format with explanations for each field:

```typescript
interface Character {
	functions: {
		name: string; // Name of the function
		description: string; // Description of what the function does
		similes: string[]; // Additional phrases that can trigger the function
		examples: {
			user: string; // The user's message
			content: string; // The character's response.
		}[][];
		parameters: {
			// Parameters the function accepts
			[key: string]: {
				description: string;
				type: string; // Available types are: string, number, boolean
			};
		};
		callback: Function; // Function to execute when called. The specific parameters are explained in each client's documentation
	}[];
	name: string; // Name of the character
	bio: string[]; // Key characteristics and role of the character
	lore: string[]; // Background story and context for the character
	knowledge: string[]; // Specific facts the character knows about
	topics: string[]; // Topics the character is knowledgeable about and can talk about
	adjectives: string[]; // Adjectives that describe the character
	style: string[]; // Style of the character
	messageExamples: {
		// Example conversations to help shape character behavior
		user: string; // The user's message
		content: string; // The character's response
	}[][];
}
```

### Field Descriptions

- **functions**: Array of functions the character can execute in the game world
  - Each function includes a name, similar phrases that can trigger it, examples of how to use it, parameters it accepts, and the callback to execute
- **bio**: Core traits and characteristics that define the character's personality and role
- **lore**: Background information that shapes the character's context and history
- **knowledge**: Specific facts and information the character has access to
- **topics**: Topics the character is knowledgeable about and can talk about
- **adjectives**: Adjectives that describe the character
- **style**: Style of the character
- **messageExamples**: Sample conversations that demonstrate how the character should interact

### Example

Here's a simple example of a character definition:

```typescript
{
    functions: [{
        name: "greet",
        description: "Greets the player",
        similes: ["hello", "hi", "hey"],
        examples: [
            [{ user: "User", content: "Hello" }, { user: "You", content: "Hey there!" }]
        ],
        parameters: {},
        callback: (player) => console.log(`Hello ${player.name}!`)
    }],
    bio: [
        "Friendly town guard",
        "Helps newcomers find their way",
        "Takes their duty seriously"
    ],
    lore: [
        "Has served the town for 20 years",
        "Knows every street and alley"
    ],
    knowledge: [
        "The town square is north of the gate",
        "Market days are every Tuesday"
    ],
    messageExamples: [[
        { user: "User", content: "Where's the market?" },
        { user: "You", content: "The market is held in the town square every Tuesday." }
    ]],
    topics: ["market", "town square"],
    adjectives: ["friendly", "helpful"],
    style: ["formal", "casual"]
}
```
