---
outline: "deep"
---

# TypeScript Client

Stealth SDK provides a versatile client for TypeScript, enabling you to easily integrate AI models into your applications.

## 📋 Overview

The TypeScript client provides a simple yet powerful interface for interacting with AI models. It handles all the complexity of communicating with the backend while providing a clean and type-safe API for your application.

## 🌟 Example

An example project using discord.js is provided [here](https://github.com/stealth-studios/sdk-client-ts/tree/main/example).

## 🚧 Installation

Installation can be done through any preferred package manager:

::: code-group

```sh [npm]
npm install @stealthstudios/sdk-client-ts
```

```sh [yarn]
yarn add @stealthstudios/sdk-client-ts
```

```sh [pnpm]
pnpm add @stealthstudios/sdk-client-ts
```

```sh [bun]
bun add @stealthstudios/sdk-client-ts
```

:::

## 🚀 Usage

To get started, you need to create an instance of the `StealthClient` class and pass it the necessary configuration options. An example using the [Basic Framework](../frameworks/basic.md) is shown below:

```typescript
import StealthClient from "@stealthstudios/sdk-client-ts";

// Create a new StealthClient instance
const client = new StealthClient({
	url: "BACKEND_URL",
	auth: "ENDPOINT_AUTH",
	openCloudKey: "OPTIONAL_OPEN_CLOUD_KEY", // This allows you to use Roblox's Open Cloud API to retrieve DataStore entries
});

// Define our character
const character = client.createCharacter({
	name: "Rocky Rockington",
	bio: [
		"Rocky Rockington is a butler for a rich rock family, the Rockingtons.",
		"Will assist the player with their needs in the world of StealthSDK RPG.",
		"Answers in a polite and helpful manner.",
		"Does not express opinions or beliefs, stating only facts.",
	],
	lore: [
		"Is a butler for a rich rock family, the Rockingtons.",
		"Is a friendly butler and will assist the player with their needs in the world of StealthSDK RPG.",
		"Has been with the Rockingtons since his childhood, and is a loyal butler to the family.",
	],
	knowledge: [
		"The Rockingtons' favorite color is gray. It's their favourite color because it's the color of a rock.",
		"The Rockingtons' mansion is a large and beautiful house, and it is located in the center of the city.",
		"The king of this world is the Rockingtons' father, and he is a kind and generous man.",
		"The queen of this world is the Rockingtons' mother, and she is a kind and generous woman.",
	],
	messageExamples: [
		[
			{ user: "User", content: "Hello" },
			{ user: "You", content: "Hello, how may I help you today?" },
		],
		[
			{ user: "User", content: "What is the Rockingtons' favorite color?" },
			{
				user: "You",
				content:
					"The Rockingtons' favorite color is gray. It's their favourite color because it's the color of a rock.",
			},
		],
		[
			{ user: "User", content: "What is the Rockingtons' favorite food?" },
			{
				user: "You",
				content: "I'm afraid that information is not up to me to share.",
			},
		],
		[
			{ user: "User", content: "Can I live in the Rockingtons' mansion?" },
			{ user: "You", content: "Only the Rockingtons may live in the mansion." },
		],
		[
			{ user: "User", content: "Who is the king of this world??" },
			{
				user: "You",
				content: "The king of this world is the Rockingtons' father.",
			},
		],
	],
	functions: [
		{
			name: "print",
			description: "Prints a message to the console.",
			parameters: {
				message: {
					description: "The message to print.",
					type: "string",
				},
			},
			callback: (
				conversation: Conversation,
				playerId: string,
				params: { message: string }
			) => {
				console.log(params.message);
			},
		},
	],
});

// Create a conversation for user "Player" with ID 1
const conversation = await character.createConversation({
	id: 1,
	name: "Player",
});

// Send a message to the conversation
const response = await conversation.send(1, "Hi there!");

// If the response was cancelled or flagged, don't display it and log it instead
if (response.cancelled || response.flagged) {
	console.log("The response was cancelled or flagged.");
} else {
	console.log(response.content);

	// If the response contains function calls,
	if (response.calls) {
		// run the functions
		await character.executeFunctions(1, conversation, response.calls);
	}
}
```

### Datastores

You can interact with ROBLOX data stores through the Open Cloud API. This requires setting the `openCloudKey` option when creating the client.

To retrieve data from a data store, provide the `datastores` key in the `context` parameter of the `send` method:

```typescript
const response = await conversation.send(1, "Hi there!", {
	datastores: [
		{
			type: "standard", // "ordered" or "standard"
			universeId: "1", // The universe ID of the game
			datastoreName: "Datastore",
			entryKey: "1",
			scope: "global", // "global" by default - this value is optional.
			fieldsMutator: (fields) => {
				// The raw datastore entry will be passed into this function. Return the fields you wish to inject into the context.
				// This function is only called if the datastore type is "standard".
				return {
					Wins: fields.Win,
					Cash: fields.Cash,
				};
			},
		},
	],
});
```

## API Overview

### Character

The Character class manages conversations and function execution for an AI character.

#### `character.createConversation`

```typescript
createConversation(
	user: User,
	persistenceToken?: string
): Promise<Conversation>
```

Creates a new conversation for the character with a specific user. If a persistence token is provided, the conversation can be restored across sessions.

Returns a Promise that resolves to the created Conversation object.

---

#### `character.finishConversation`

```typescript
finishConversation(conversation: Conversation): Promise<void>
```

Ends a conversation and removes it from the character's active conversations.

---

#### `character.getConversation`

```typescript
getConversation(
    user: User,
    persistenceToken?: string
): Promise<Conversation>
```

Gets an existing conversation for a user or creates a new one if none exists.

Returns a Promise that resolves to the Conversation object.

---

#### `character.updateSelf`

```typescript
updateSelf(self: Character): Promise<void>
```

Updates the character's information and all active conversations.
This is identical to setting `this.character` and calling `conversation.updateCharacter` on all active conversations.

---

#### `character.executeFunctions`

```typescript
executeFunctions(
	playerId: number,
	conversation: Conversation,
    calls?: Array<{
        name: string;
        parameters: Record<string, any>
    }>
): Promise<void>
```

Executes functions called by the AI in response to a message.

---

#### `character.destroy`

```typescript
destroy(): void
```

Cleans up the character by destroying all active conversations and clearing the conversations array.

### Conversation

The Conversation class manages user interactions and message handling for an AI conversation.

#### `conversation.addUser`

```typescript
addUser(user: User): Promise<void>
```

Adds a user to the conversation and updates the backend.

---

#### `conversation.removeUser`

```typescript
removeUser(user: User): Promise<void>
```

Removes a user from the conversation and updates the backend.

---

#### `conversation.updateCharacter`

```typescript
updateCharacter(character: Character): Promise<void>
```

Updates the character of the conversation.

---

#### `conversation.send`

```typescript
send(
    id: number,
    message: string,
    context?: Record<string, any>
): Promise<{
    flagged: boolean;
    content: string;
} | null>
```

Sends a message to the AI model and returns the response.

Returns a Promise that resolves to:

- `flagged`: Whether the message was flagged as inappropriate
- `content`: The AI's response
  or:
- `null`: If the message failed to send

---

#### `conversation.containsPlayer`

```typescript
containsPlayer(player: { id: number }): boolean
```

Checks if a specific player is part of the conversation.

Returns `true` if the player is in the conversation, `false` otherwise.

---

#### `conversation.isEmpty`

```typescript
isEmpty(): boolean
```

Checks if the conversation has any participating users.

Returns `true` if there are no users in the conversation, `false` otherwise.
