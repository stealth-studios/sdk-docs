---
outline: deep
---

# Custom Adapters

## 📝 Overview

An adapter is a class that extends the abstract `Adapter` class. These adapters can then be used by a framework to store and retrieve character, user and conversation data.

### Database Schema

We recommend using [Drizzle](https://orm.drizzle.team/) to handle your database. Existing schemas can be found in existing adapters, for example, [here](https://github.com/stealth-studios/sdk-adapter-sqlite/blob/main/src/db/schema.ts).

## 🛠️ Creating an Adapter

To create an adapter, you need to extend the `Adapter` class.

```typescript
import { Adapter } from "@stealth-studios/sdk-core";

export class MyAdapter extends Adapter {
	// ...
}
```

You then want to define an interface that defines the options for this adapter.

```typescript
interface MyAdapterOptions {
	// ...
}
```

Then, define the constructor for the adapter. These options will be passed to the adapter when it is instantiated.

```typescript
constructor(protected readonly options: MyAdapterOptions) {
    super(options);
}
```

You can then implement the methods that are required by the adapter. These methods are as follows:

## 🧰 Methods

### Init

```typescript
abstract init(): AsyncOrSync<void>;
```

The `init` method is used to initialize the adapter. It will be called when the adapter is instantiated.
Ensure that this method populates the database with the necessary tables, per the database schema.

---

### Get Character

```typescript
abstract getCharacter(
    hash: string,
): AsyncOrSync<CharacterResponse | undefined>;
```

The `getCharacter` method is used to retrieve a character by its hash. A character should contain the following fields:

- `name`: The name of the character
- `hash`: The hash of all character data
- `data`: The data of the character. This can contain anything and should, in most cases, be stored as JSON. Ensure that the returned data is not a JSON string, but rather a parsed JSON object.

---

### Create Character

```typescript
abstract createCharacter<T extends Character>(
    character: T,
): AsyncOrSync<CharacterResponse | undefined>;
```

The `createCharacter` method is used to create a new character. Ensure that the returned object meets the requirements listed above (under `Get Character`).

---

### Create Conversation

```typescript
abstract createConversation(params: {
    character: Character;
    users: User[];
    persistenceToken?: string;
}): AsyncOrSync<ConversationResponse | undefined>;
```

The `createConversation` method is used to create a new conversation. The returned object should contain the following fields:

- `id`: The id of the conversation
- `secret`: The secret of the conversation

---

### Get Conversation Messages

```typescript
abstract getConversationMessages(id: number): AsyncOrSync<MessageData[]>;
```

The `getConversationMessages` method is used to retrieve the messages of a conversation.

The MessageData interface is as follows:

```typescript
interface MessageContext {
	key: string;
	value: string;
}

interface MessageData {
	senderId?: string;
	content: string;
	role: string;
	context: MessageContext[];
}
```

---

### Get Conversation By

```typescript
abstract getConversationBy(params: {
    id?: number;
    secret?: string;
    persistenceToken?: string;
}): AsyncOrSync<unknown | null>;
```

The `getConversationBy` method is used to retrieve a conversation by its id, secret, persistence token, or data.
Ensure that unspecified fields are not used in the query, but all specified fields are used.

This should return all data that is contained in the conversation, including the nested values (character, users, etc.).
This function is used by a framework to create a conversation object from the data returned by this method.

---

### Set Conversation Users

```typescript
abstract setConversationUsers(id: number, users: User[]): AsyncOrSync<void>;
```

The `setConversationUsers` method is used to update the users of a conversation.

The User interface is as follows:

```typescript
interface User {
	id: string;
	name: string;
}
```

This method should update the users of the conversation with the provided users.

---

### Set Conversation Character

```typescript
abstract setConversationCharacter(
    conversation: Conversation,
    character: Character,
): AsyncOrSync<void>;
```

The `setConversationCharacter` method is used to set the character of a conversation. It should update the character of the conversation with the provided character. The specific behaviour of this is dependent on the framework and adapter, but, whenever this is called, the conversation should adapt to the new character, even if this means wiping all context.

---

### Set Conversation Data

```typescript
abstract setConversationData(id: number, data: unknown): AsyncOrSync<void>;
```

The `setConversationData` method is used to update the data of a conversation. This data should be stored as JSON.

---

### Add Message To Conversation

```typescript
abstract addMessageToConversation(
    id: number,
    message: MessageData,
): AsyncOrSync<void>;
```

The `addMessageToConversation` method is used to add a message to a conversation.

The MessageData interface is as follows:

```typescript
interface MessageContext {
	key: string;
	value: string;
}

interface MessageData {
	senderId?: string;
	content: string;
	role: string;
	context: MessageContext[];
}
```

---

### Finish Conversation

```typescript
abstract finishConversation(id: number): AsyncOrSync<void>;
```

The `finishConversation` method is used to finish a conversation. This method should be called when the conversation is finished, and the conversation should be removed from the database, removing all of the data associated with it as well.
