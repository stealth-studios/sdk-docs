---
outline: deep
---

# Custom Framework

## 📝 Overview

A framework is a class that extends the abstract `Framework` class. These frameworks are used to provide the AI bindings for the framework.

## 🛠️ Creating a Framework

To create a framework, you need to extend the `Framework` class and define the options for the framework.

```typescript
import { Framework } from "@stealthstudios/sdk-core";

interface MyFrameworkOptions {
	// ...
}

export class MyFramework extends Framework<MyFrameworkOptions> {
	// ...
}
```

Then, define the constructor for the framework. These options will be passed to the framework when it is instantiated.

```typescript
constructor(protected readonly options: MyFrameworkOptions) {
    super(options);
}
```

### Custom Classes

It is recommended to define custom classes for the framework, so it is easier to manage the data and methods for the framework. Have a look at the [Basic Framework](https://github.com/stealth-studios/sdk-framework-basic/blob/main/src/index.ts) for an example.

### Default Options

The default options for the framework are as follows:

- `adapter`: The adapter to use for the framework. This will always inherit from the `Adapter` class.

## 🧰 Methods

### Start

```typescript
abstract start(adapter: Adapter): AsyncOrSync<void>;
```

The `start` method is used to start the framework. It will be called when the framework is instantiated. Do not call `adapter.init()` in this method.

---

### Stop

```typescript
abstract stop(): AsyncOrSync<void>;
```

The `stop` method is used to stop the framework. It should clean up any resources and stop any running processes.

---

### Validate Character

```typescript
abstract validateCharacter(data: unknown): AsyncOrSync<boolean>;
```

The `validateCharacter` method is used to validate a character. It should return true if the character is valid, and false if it is not.
Any data can be passed in, so ensure that all fields are present and valid.

You may throw an error if the character is not valid to provide more information to the user.

---

### Get or Create Character

```typescript
abstract getOrCreateCharacter(
    data: unknown,
): AsyncOrSync<Character | undefined>;
```

The `getOrCreateCharacter` method is used to get or create a character. It should return the character if it exists, or create a new one if it does not.
You may use the `getCharacter` and `createCharacter` adapter methods to get or create the character.

---

### Load Character

```typescript
abstract loadCharacter(character: Character): AsyncOrSync<void>;
```

The `loadCharacter` method is used to load a character. It should load the character data into memory so it can be retrieved later.

---

### Contains Character

```typescript
abstract containsCharacter(character: Character): AsyncOrSync<boolean>;
```

The `containsCharacter` method is used to check if a character exists. It should return true if the character exists in memory, and false if it does not.

---

### Get Character Hash

```typescript
abstract getCharacterHash(character: Character): AsyncOrSync<string>;
```

The `getCharacterHash` method is used to get the hash of a character. It should return the hash of the character data.

---

### Create Conversation

```typescript
abstract createConversation(params: {
    character: Character;
    users: User[];
    persistenceToken?: string;
}): AsyncOrSync<Conversation | undefined>;
```

The `createConversation` method is used to create a new conversation. It should return the conversation if it is created successfully, or undefined if it is not.
You may use the `createConversation` adapter method to create the conversation.

---

### Set Conversation Users

```typescript
abstract setConversationUsers(
    conversation: Conversation,
    users: User[],
): AsyncOrSync<void>;
```

The `setConversationUsers` method is used to set the users of a conversation. It should update the users of the conversation with the provided users.
You may use the `setConversationUsers` adapter method to set the users of the conversation.

---

### Set Conversation Character

```typescript
abstract setConversationCharacter(
    conversation: Conversation,
    character: Character,
): AsyncOrSync<void>;
```

The `setConversationCharacter` method is used to set the character of a conversation. It should update the character of the conversation with the provided character. The specific behaviour of this is dependent on the framework and adapter, but, assume that whenever this is called, all messages in the conversation will be removed in order to ensure the previous character's prompts will not affect the new character.

---

### Send To Conversation

```typescript
abstract sendToConversation(
    conversation: Conversation,
    message: string,
    playerId: string,
    context: MessageContext[],
): AsyncOrSync<SendResponse>;
```

The `sendToConversation` method is used to send a message to a conversation. It should return a response indicating if the message was sent successfully.

You can use the `addMessageToConversation` adapter method to add the message to the conversation so it is stored in context, if the framework does not handle this internally.

---

### Get Conversation By

```typescript
abstract getConversationBy(params: {
    id?: number;
    secret?: string;
    persistenceToken?: string;
}): AsyncOrSync<Conversation | undefined>;
```

The `getConversationBy` method is used to get a conversation by its id, secret, or persistence token. It should return the conversation if it exists, or undefined if it does not.

You may use the `getConversationBy` adapter method to get the conversation.

---

### Finish Conversation

```typescript
abstract finishConversation(conversation: Conversation): AsyncOrSync<void>;
```

The `finishConversation` method is used to finish a conversation. It should remove the conversation from memory and clean up any resources associated with it.
You may use the `finishConversation` adapter method to finish the conversation.
