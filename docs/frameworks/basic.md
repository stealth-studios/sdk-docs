---
outline: [2, 3]
---

# Basic Framework

Welcome to the Basic Framework - your starting point for building AI-powered applications with Stealth SDK. This framework provides a streamlined interface that makes it easy to get up and running quickly, while still giving you all the essential features you need.

## 📦 What's Included

The Basic Framework comes with everything you need for building conversational AI applications:

- **Conversation Management**: Keep track of ongoing conversations and their states
- **Smart Context Tracking**: Maintain context across multiple messages for more natural interactions
- **Message Handling**: Process incoming messages and generate appropriate responses
- **Response Generation**: Generate human-like responses using state-of-the-art AI models

## 🚀 Installation

Get started by adding the Basic Framework to your project:

::: code-group

```sh [npm]
npm install @stealthstudios/sdk-framework-basic
```

```sh [yarn]
yarn add @stealthstudios/sdk-framework-basic
```

```sh [pnpm]
pnpm add @stealthstudios/sdk-framework-basic
```

```sh [bun]
bun add @stealthstudios/sdk-framework-basic
```

:::

## 🔧 Usage

To use the basic framework, you need to create an instance of the `BasicFramework` class and pass it the necessary configuration options. Here's a simple example:

```typescript
const core = new Core({
	adapter: new SQLiteAdapter({
		file: process.env.DATABASE_URL!,
	}),
	framework: new BasicFramework({ // [!code focus]
		apiKey: process.env.API_KEY!, // [!code focus]
		provider: "openai", // [!code focus]
		model: "chatgpt-4o-latest", // [!code focus]
		memorySize: 15, // How many messags of context should the framework remember? // [!code focus]
	}), // [!code focus]
	config: {
		host: "0.0.0.0",
		port: 3000,
		endpointAuth: "YOUR_ENDPOINT_AUTH",
	},
});
```

That's all you need to set up a backend using the basic framework! Use any supported client to integrate with the backend and start building your conversational AI application.

## 📝 Configuration

The Basic Framework supports the following configuration options:

- `apiKey`: Your API key for the AI model provider
- `apiUrl`: The base URL for the AI model provider. This is useful for using providers that clone existing API designs, like DeepSeek.
- `provider`: The API endpoint design to use for generating responses (supported: `openai`, `anthropic`)
- `model`: The specific AI model to use for generating responses. Ensure that the model is supported by the provider.
- `memorySize`: The number of previous messages to remember for context tracking.

  :::info
  Per message sent by the user, 3 messages will be stored in context (The system message containing game context, the user's message and the AI's response).
  :::

## 🤖 Character Format

The Basic Framework uses a structured format for defining AI characters. Here's the format with explanations for each field:

```typescript
interface Character {
	functions: {
		name: string; // Name of the function
		description: string; // Description of what the function does
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
	messageExamples: {
		// Example conversations to help shape character behavior
		user: string; // The user's message
		content: string; // The character's response
	}[][];
}
```

### Field Descriptions

- **functions**: Array of functions the character can execute in the game world
  - Each function includes a name, parameters it accepts, and the callback to execute
- **bio**: Core traits and characteristics that define the character's personality and role
- **lore**: Background information that shapes the character's context and history
- **knowledge**: Specific facts and information the character has access to
- **messageExamples**: Sample conversations that demonstrate how the character should interact

### Example

Here's a simple example of a character definition:

```typescript
{
    functions: [{
        name: "greet",
        description: "Greets the player",
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
    ]]
}
```
