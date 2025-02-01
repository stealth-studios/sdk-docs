---
outline: "deep"
---

# Roblox Client

Stealth SDK provides a first-class client for Roblox, enabling you to seamlessly integrate AI models into your Roblox games. This client is built with performance and ease of use in mind, allowing you to make anything from simple NPC chatbots to complex AI companions.

## 📋 Overview

The Roblox client functions on the assumption that NPCs will always be inherently connected to objects in the world. This means that the client is designed to be attached to specific objects in the game, and will handle all interactions with the AI models for that object.

In the context of Roblox, the client has the following responsibilities:

- Tracking all characters and their associated models
- Handling chat interactions with these models, sending them to the character which then sends them to the backend for processing
- Receiving responses from the backend and displaying them in the chat in custom chat bubbles (using [Fusion 0.3](https://elttob.uk/Fusion/0.3/)), designed to mimic the look and feel of Roblox chat bubbles

## 🌟 Example

A demo file is provided in the repository to help you get started with the client. View the guide on how to get it set up [here](https://github.com/stealth-studios/sdk-client-luau/tree/main?tab=readme-ov-file#%EF%B8%8F-development). You do need a backend server to run the client, so ensure this is configured before running the demo.

## 🛠️ Installation

Installation can be done through [Wally](https://wally.run/package/stealth-studios/sdk-client-luau) or through our [GitHub Releases](https://github.com/stealth-studios/sdk-client-roblox/releases).

### Wally

Add the client to your `wally.toml` file:

```toml
[dependencies]
sdk-client-roblox="stealth-studios/sdk-client-roblox@<version>"
```

Then run `wally install` to install the client.

### GitHub Releases

1. Download the latest `.rbxm` file from the [GitHub Releases](https://github.com/stealth-studios/sdk-client-roblox/releases).
2. Insert the `.rbxm` file into your game using Roblox Studio.
3. Require the client in your scripts, and use it as normal.

## 📝 Usage

### Client

Let's first get the client-side code set up. This will allow clients to receive messages from the server and display them.

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")
require(ReplicatedStorage.path.to.stealthsdk).client()
```

### Characters

This will set up the client to listen for messages from the server.

Now, let's get a character folder set up. This allows you to define all characters in the game.
Create a folder on the server, called anything you like, and insert a `ModuleScript` for each character. An example for the [Basic Framework](../frameworks/basic.md) is shown below:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local client = require(ReplicatedStorage.path.to.stealthsdk).server()

return client.createCharacter({
	characterConfig = {
		name = "Rocky Rockington", -- This name is injected into the character field below.
		persistent = false,
		individualInteractions = false,
		-- The character field depends on the framework you are using.
		-- View the specific fields for the framework you are using in the documentation.
		character = {
			functions = {
				{
					name = "color",
					description = "Changes the color of the baseplate",
					parameters = {
						{
							name = "r",
							description = "The R component of the color to change to",
							type = "number",
						},
						{
							name = "g",
							description = "The G component of the color to change to",
							type = "number",
						},
						{
							name = "b",
							description = "The B component of the color to change to",
							type = "number",
						},
					},
					callback = function(
						player,
						conversation,
						data: {
							r: number,
							g: number,
							b: number,
						}
					)
						game.Workspace.Baseplate.Color = Color3.fromRGB(data.r, data.g, data.b)
					end,
				},
			},
			bio = {
				"Rocky Rockington is a butler for a rich rock family, the Rockingtons.",
				"Will assist the player with their needs in the world of StealthSDK RPG.",
				"Answers in a polite and helpful manner.",
				"Does not express opinions or beliefs, stating only facts.",
			},
			lore = {
				"Is a butler for a rich rock family, the Rockingtons.",
				"Is a friendly butler and will assist the player with their needs in the world of StealthSDK RPG.",
				"Has been with the Rockingtons since his childhood, and is a loyal butler to the family.",
			},
			knowledge = {
				"The Rockingtons' favorite color is gray. It's their favourite color because it's the color of a rock.",
				"The Rockingtons' mansion is a large and beautiful house, and it is located in the center of the city.",
				"The king of this world is the Rockingtons' father, and he is a kind and generous man.",
				"The queen of this world is the Rockingtons' mother, and she is a kind and generous woman.",
			},
			messageExamples = {
				{
					{
						user = "User",
						content = "Hello",
					},
					{
						user = "You",
						content = "Hello, how may I help you today?",
					},
				},
				{
					{
						user = "User",
						content = "What is the Rockingtons' favorite color?",
					},
					{
						user = "You",
						content = "The Rockingtons' favorite color is gray. It's their favourite color because it's the color of a rock.",
					},
				},
				{
					{
						user = "User",
						content = "What is the Rockingtons' favorite food?",
					},
					{
						user = "You",
						content = "I'm afraid that information is not up to me to share.",
					},
				},
				{
					{
						user = "User",
						content = "Can I live in the Rockingtons' mansion?",
					},
					{
						user = "You",
						content = "Only the Rockingtons may live in the mansion.",
					},
				},
				{
					{
						user = "User",
						content = "Who is the king of this world??",
					},
					{
						user = "You",
						content = "The king of this world is the Rockingtons' father.",
					},
				},
			},
			topics = {
				"StealthSDK RPG",
			},
			adjectives = {
				"polite",
				"concise",
			},
			style = {
				"speaks in a polite and helpful manner",
			},
		},
	},

	modelConfig = {
		interestRadius = 10,
	},
})
```

A character file consists of the following sections:

- `characterConfig`: This section contains all the information about the character.
  - `persistent`: Should this conversation persist through sessions? If true, this message will not be deleted when the player leaves the game or ends the conversation.
  - `individualInteractions`: Should this character have individual interactions? If true, this character will have a separate conversation with each player.
  - `character`: The format of this field depends on the framework you are using. Each framework features a character format that you can use to define your characters.
- `modelConfig`: This section contains information about the model associated with the character. This includes the interest radius, which determines how far the character can hear and respond to messages.
  - `interestRadius`: The radius in studs within which the character can hear and respond to messages.
- `events`: View the [Events](#events) section for more information.

You must link your character to an NPC by adding the `EngineNPC` tag to the model. This model must have a `PrimaryPart` set.
Next, add a `Character` attribute. This attribute should correspond to the `name` field in the character configuration.

This is enough to get your characters set up and ready to interact with players in your game. However, if you're looking for extra customization, you may do so through the following attributes:

- `BubbleOffset`: A number that determines the vertical offset of the chat bubble from the character's head.
- `BubbleDistanceMultiplier`: By default, bubbles start fading out at 30 studs from the character. However, in cases where a larger interest radius is preferred or the character is large, you may adjust this value to increase the distance at which bubbles start fading out. If you set this to `0.5`, bubbles will start fading out at 60 studs from the character.
- `ShowMessagesInChat`: Whether to show messages in the chat. If set to `true`, messages will be displayed in the chat as well as in the chat bubble.
- `ChatChannelName`: If `ShowMessagesInChat` is set to `true`, this attribute determines the name of the chat channel in which messages will be displayed. This is needed to display messages in the chat and will display a warning if not set.
- `MessageMarkup`: Rich Text markup that can be used to format messages from this NPC in the chat. `string.format` is used to insert your text content, so `%s` will be replaced with the message content.
- `NameMarkup`: Rich Text markup that can be used to format the name of the NPC in the chat. `string.format` is used to insert your text content, so `%s` will be replaced with the NPC's name. Keep in mind that spaces at the end will be normalized, so consider wrapping your entire string in a tag to allow for spaces after the name. The default value is `%s: `.

**By default, all fields beside `character` on the character file are merged with the default character config. This file can be found [here](https://github.com/stealth-studios/sdk-client-luau/blob/main/src/server/defaultCharacterConfig.luau).**

### Server

Next, we need to set up the server-side code.

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local client = require(ReplicatedStorage.path.to.stealthsdk).server()
local client = engine.new({
	url = "http://path-to-your-server",
	auth = "YOUR_AUTH_KEY",
})

client:loadFolder(path.to.characters.folder)
client:start()
```

### Events

Each character allows for events to be defined. This allows for greater control over the conversation process and allows you to define your own functionality for various aspects of the character's behavior.

These events are used by the default character configuration to provide basic functionality. However, you may override these events if you'd like more specific behavior.

Available events:

```luau
type Events = {
	-- Called when a player enters the character's interest radius
	onRadiusEnter: ((self: Character, player: Player) -> ())?,
	-- Called when a player leaves the character's interest radius
	onRadiusLeft: ((self: Character, player: Player, conversation: conversation.Conversation?) -> ())?,
	-- Called when a player sends a message within the interest radius of the character
	-- By default, this event creates a conversation with the player and the character
	onChatted: ((self: Character, player: Player, message: string) -> ())?,
	-- Called when a player starts a conversation with the character
	onConversationStart: ((self: Character, conversation: conversation.Conversation) -> ())?,
	-- Called when a conversation ends.
	onConversationFinish: ((self: Character, conversation: conversation.Conversation) -> ())?,
	-- Called when a conversation is empty. Empty is defined as no more participants in the conversation.
	-- By default, this event ends the conversation.
	onConversationEmpty: ((self: Character, conversation: conversation.Conversation) -> ())?,
}
```

You may define these under the events field in the character file. For example:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local client = require(ReplicatedStorage.path.to.stealthsdk).server()

return client.createCharacter({
	characterConfig = {
		name = "Rocky Rockington",
		persistent = false,
		individualInteractions = false,
		character = {
			-- Character fields
		},
	},
	events = {
			onRadiusEnter = function(self, player)
				print("Player entered radius")
			end,
			onRadiusLeft = function(self, player, conversation)
				print("Player left radius")
			end,
			onChatted = function(self, player, message)
				print("Player chatted")
			end,
			onConversationStart = function(self, conversation)
				print("Conversation started")
			end,
			onConversationFinish = function(self, conversation)
				print("Conversation finished")
			end,
			onConversationEmpty = function(self, conversation)
				print("Conversation empty")
			end,
		},
})
```

### Functions

You may define functions for your character to execute in the character config. These functions are passed into AI APIs and can be executed by the character in response to player messages.

Example for the Basic Framework:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local client = require(ReplicatedStorage.path.to.stealthsdk).server()

return client.createCharacter({
	characterConfig = {
		character = {
			functions = {
				{
					name = "color",
					description = "Changes the color of the baseplate",
					parameters = {
						{
							name = "r",
							description = "The R component of the color to change to",
							type = "number",
						},
						{
							name = "g",
							description = "The G component of the color to change to",
							type = "number",
						},
						{
							name = "b",
							description = "The B component of the color to change to",
							type = "number",
						},
					},
					callback = function(
						player,
						conversation,
						data: {
							r: number,
							g: number,
							b: number,
						}
					)
						game.Workspace.Baseplate.Color = Color3.fromRGB(data.r, data.g, data.b)
					end,
				},
			},
		},
	},
})
```

Parameters may only be of type `number`, `string`, or `boolean`. All functions are passed the player who executed the function, the conversation object, and the data object containing the parameters.

## 🚀 API Overview

This library contains a lot of valuable methods and properties that can be used to provide a more interactive experience for players. Let's have a look at all the methods available per class now.

### Engine

#### `engine.new`

```luau
engine.new(config: EngineConfig): Engine

type EngineConfig = {
	url: string,
	auth: Secret | string,
}
```

This function initializes a new engine with the provided configuration. It sets up the engine and registers it in the `activeEngines` table.

---

#### `engine.createCharacter`

```luau
engine.createCharacter(config: Config): Character

type Config = {
	characterConfig: {
		name: string?,
		individualInteractions: boolean?,
		persistent: boolean?,
		character: any & {
			functions: {
				{
					callback: (
						player: Player,
						conversation: conversation.Conversation,
						data: { [string]: any }
					) -> { success: boolean, message: string? }?,
					description: string?,
					parameters: {
						{
							name: string,
							description: string,
							type: "string" | "number" | "boolean",
						}
					},
				}
			}?,
		}, -- framework-specific character data
	},
	modelConfig: {
		interestRadius: number?,
	}?,
	events: {
		onRadiusEnter: ((self: Character, player: Player) -> ())?,
		onRadiusLeft: ((self: Character, player: Player, conversation: Conversation?) -> ())?,
		onChatted: ((self: Character, player: Player, message: string) -> ())?,
		onConversationStart: ((self: Character, conversation: Conversation) -> ())?,
		onConversationFinish: ((self: Character, conversation: Conversation) -> ())?,
		onConversationEmpty: ((self: Character, conversation: Conversation) -> ())?,
	}?,
}
```

This function creates a new character.

---

#### `engine.registerCharacter`

```luau
engine:registerCharacter(character: Character): nil
```

This function registers a new character with the engine. It merges the default character configuration with the character's full configuration, sets the character's events and configuration, and adds the character to the `characters` table.

---

#### `engine.setDefaultCharacterConfig`

```luau
engine:setDefaultCharacterConfig(config: Config): nil
```

This function sets the default character configuration for the engine.

---

#### `engine.loadFolder`

```luau
engine:loadFolder(folder: Instance): nil
```

This function loads all character modules from the provided folder and registers them with the engine.

---

### Character

#### `character:executeFunctions`

```luau
character:executeFunctions(player: Player, functions: {
	{
		name: string,
		parameters: {
			[string]: number | string | boolean
		}
	}
})
```

This function looks up all functions in the character configuration and executes all functions that match the names in the `functions` parameter.

---

#### `character:getInteractingModel`

```luau
character:getInteractingModel(player: Player): characterModel.CharacterModel?
```

This function returns the character model that the player is currently interacting with.

---

#### `character:getConversationForPlayer`

```luau
character:getConversationForPlayer(
	player: Player,
	createNew: boolean?
): conversation.Conversation?
```

This function returns the conversation object for the player. If `createNew` is set to `true`, a new conversation will be created if one does not exist.

---

#### `character:updateSelf`

```luau
character:updateSelf(
	newCharacter: any & { name: string }
)
```

Updates the character's information and applies it to all active conversations. New conversations will use the updated character information.

---

#### `character:createConversation`

```luau
character:createConversation(
	model: CharacterModel,
	player: Player?
): Conversation?
```

Creates a new conversation for the character with an optional player. If the character is configured as persistent and a player is provided, the conversation will persist across sessions using a unique token. Returns the created conversation object or nil if creation fails.

---

#### `character:finishConversation`

```luau
character:finishConversation(
	target: Conversation
)
```

Ends a conversation and cleans up associated resources. Will trigger the `onConversationFinish` event if defined.

---

### CharacterModel

#### `model:getPlayersInRadius`

```luau
model:getPlayersInRadius(radius: number): { Player }
```

Returns an array of players within the specified radius of the character model.

---

#### `model:isInteractingWithPlayer`

```luau
model:isInteractingWithPlayer(player: Player): boolean
```

Checks if a specific player is currently within the model's interaction radius.

---

#### `model:createChat`

```luau
model:createChat(chatConversation: Conversation): string
```

Creates a new chat instance for a conversation and notifies all participating players. Returns a unique chat ID.

---

#### `model:provideActionFeedback`

```luau
model:provideActionFeedback(
    chatId: string,
    feedback: { success: boolean, message: string? }
)
```

Sends feedback about an action to all participants in a chat. This can be used to inform players about the outcome of a function call.
It will set the chat bubble connected to the chat to green or red, depending on the status, and display the message in the chat bubble.

---

#### `model:cancelChat`

```luau
model:cancelChat(chatId: string)
```

Cancels an active chat and notifies all participants.

---

#### `model:flagChat`

```luau
model:flagChat(chatId: string)
```

Flags a chat as inappropriate and notifies all participants.

---

#### `model:setChatContent`

```luau
model:setChatContent(chatId: string, player: Player, content: string)
```

Sets the content of a chat message and notifies the specified player. This function takes a player specifically because players may receive different messages based on their privacy settings and age. You should always filter chat content based on the player receiving the message.

---

#### `model:cleanChat`

```luau
model:cleanChat(chatId: string)
```

Removes a chat from the model's internal chat storage. This should always be called when a chat is no longer needed to free up memory and prevent race conditions.

---

#### `model:cancelChats`

```luau
model:cancelChats(target: Conversation)
```

Cancels all chats associated with a specific conversation. This is equivalent to calling `model:cancelChat` for each chat in the conversation.

---

#### `model:cancelChatsForPlayer`

```luau
model:cancelChatsForPlayer(player: Player, target: Conversation)
```

Cancels all chats for a specific player in a conversation. This function is called when a player exits the interest radius while a message is being sent.

### Conversation

---

#### `conversation:send`

```luau
conversation:send(
    player: Player,
    message: string,
    context: { [string]: string }?
): Response?

type Response = {
    flagged: boolean, -- Whether the message was flagged as inappropriate
    content: string, -- The AI's response
    cancelled: boolean?, -- Whether the message was cancelled
    calls: { -- Any function calls the AI wants to make
		{
			name: string,
			parameters: { [string]: number | boolean | string }
    	}
	}?
}
```

Sends a message to the AI model and returns the response.

---

#### `conversation:addPlayer`

```luau
conversation:addPlayer(player: Player)
```

Adds a player to the conversation and updates the player list on the backend.

---

#### `conversation:removePlayer`

```luau
conversation:removePlayer(player: Player)
```

Removes a player from the conversation and updates the backend.

---

#### `conversation:setCharacter`

```luau
conversation:setCharacter(character: any & { name: string })
```

Sets the character for the conversation. You must pass all character data (the data that you would normally pass to the `character` field in the character config) to this function.

---

#### `conversation:getPlayers`

```luau
conversation:getPlayers(): { Player }
```

Returns an array of all players currently in the conversation.

---

#### `conversation:containsPlayer`

```luau
conversation:containsPlayer(player: Player): boolean
```

Checks if a specific player is part of the conversation.

---

#### `conversation:isEmpty`

```luau
conversation:isEmpty(): boolean
```

Checks if the conversation has any participating players.

Returns `true` if there are no players in the conversation, `false` otherwise.
