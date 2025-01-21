---
outline: [2, 3]
---

# Custom Client

## 📝 Overview

A client is an integration with a language or platform that interacts with the Stealth SDK backend. Clients should be able to keep track of users, conversations and characters and be able to display messages.

## 🛠️ Creating a Client

There is no standardized way to create a client - it should be created based on the language or platform that it is being integrated with. However, the client should be able to interact with the Stealth SDK backend. The available endpoints are documented below, along with expected responses. You may also access an API reference when running a backend by appending `/reference` to the URL.

## 📡 Endpoints

### Create Conversation

```http
POST /api/create
```

This endpoint is used to create a new conversation with the given users. It will also fetch a persistent conversation if the persistenceToken is provided and the conversation exists.

#### Request

```typescript
interface CreateConversationRequest {
	// "character" is defined by the framework that the backend is using.
	// View the "Character Format" section for your framework in the docs for more information.
	character: any;
	users: {
		name: string;
		id: string;
	}[];
	persistenceToken?: string;
}
```

#### Response

```typescript
interface CreateConversationResponse {
	id: string;
	secret: string;
}
```

#### Errors

- **400: Invalid request**: This error occurs when the request body is malformed or missing required fields.
- **403: Invalid API key**: This error occurs when the API key provided in the Authorization header is invalid or missing.
- **404: Conversation not found**: This error occurs when the conversation with the provided persistenceToken does not exist.

---

### Finish Conversation

```http
POST /api/finish
```

This endpoint is used to finish a conversation. Do not call if conversation data should persist.

#### Request

```typescript
interface FinishConversationRequest {
	secret: string;
}
```

#### Response

```typescript
interface FinishConversationResponse {}
```

#### Errors

- **404: Conversation not found**: This error occurs when the conversation with the provided secret does not exist.
- **500: Failed to end conversation**: This error occurs when there is an internal error preventing the conversation from being finished.

---

### Send Message

```http
POST /api/send
```

This endpoint is used to send a message from a player to a conversation.

#### Request

```typescript
interface SendMessageRequest {
	secret: string;
	message: string;
	playerId: string;
	context: {
		key: string;
		value: string;
	}[];
}
```

#### Response

```typescript
interface SendMessageResponse {
	flagged: boolean;
	cancelled: boolean;
	content: string;
	calls: {
		name: string;
		message: string;
		parameters: {
			[key: string]: string;
		};
	}[];
}
```

#### Errors

- **403: Invalid API key or conversation secret**: This error occurs when the API key provided in the Authorization header or the conversation secret is invalid or missing.
- **404: Conversation not found**: This error occurs when the conversation with the provided secret does not exist.
- **422: Content moderated or error in Provider API**: This error occurs when the content of the message is moderated or there is an error in the Provider API.
- **429: Conversation is busy**: This error occurs when the conversation is currently busy and cannot process the message.

---

### Update Conversation

```http
POST /api/update
```

This endpoint is used to update a conversation.

#### Request

```typescript
interface UpdateConversationRequest {
	secret: string;
	users: {
		name: string;
		id: string;
	}[];
}
```

#### Response

```typescript
interface UpdateConversationResponse {
	message: string;
}
```

#### Errors

- **404: Conversation not found**: This error occurs when the conversation with the provided secret does not exist.
