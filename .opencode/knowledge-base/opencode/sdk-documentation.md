# OpenCode AI SDK Documentation

## Overview

The `@opencode-ai/sdk` (v1.0.146) provides a comprehensive TypeScript/JavaScript SDK for interacting with OpenCode AI servers and building custom integrations.

## Package Structure

The SDK provides multiple entry points:

- **Main Export** (`@opencode-ai/sdk`): Combined client and server functionality
- **Client** (`@opencode-ai/sdk/client`): Client-only functionality for connecting to OpenCode servers
- **Server** (`@opencode-ai/sdk/server`): Server creation and TUI (Terminal User Interface) functionality
- **V2 API** (`@opencode-ai/sdk/v2/*`): Next-generation API (mirrors main API structure)

## Installation

```bash
npm install @opencode-ai/sdk
# or
bun add @opencode-ai/sdk
```

## Core Concepts

### 1. Client

The `OpencodeClient` provides methods to interact with an OpenCode server instance.

#### Creating a Client

```typescript
import { createOpencodeClient } from '@opencode-ai/sdk/client';

const client = createOpencodeClient({
    directory: '/path/to/project', // optional
    // additional Config options
});
```

### 2. Server

Create and manage OpenCode server instances.

#### Creating a Server

```typescript
import { createOpencodeServer } from '@opencode-ai/sdk/server';

const server = await createOpencodeServer({
    hostname: 'localhost',
    port: 3000,
    signal: abortSignal, // optional AbortSignal
    timeout: 30000, // optional timeout in ms
    config: {}, // optional Config object
});

// Server provides:
// - server.url: string
// - server.close(): void
```

#### Creating a TUI (Terminal UI)

```typescript
import { createOpencodeTui } from '@opencode-ai/sdk/server';

const tui = createOpencodeTui({
    project: '/path/to/project',
    model: 'anthropic/claude-3-5-sonnet',
    session: 'session-id',
    agent: 'build',
    signal: abortSignal,
    config: {},
});

// Close TUI
tui.close();
```

### 3. Combined Setup

```typescript
import { createOpencode } from '@opencode-ai/sdk';

const { client, server } = await createOpencode({
    // ServerOptions
    hostname: 'localhost',
    port: 3000,
    config: {},
});

// Use client and server
// ...

// Cleanup
server.close();
```

## API Reference

### OpencodeClient Methods

The client is organized into namespaced modules:

#### Global Events

```typescript
// Subscribe to global events across all projects
const events = await client.global.event();
```

#### Project Management

```typescript
// List all projects
const projects = await client.project.list();

// Get current project
const current = await client.project.current({
    query: { directory: '/path/to/project' },
});
```

#### Session Management

```typescript
// List all sessions
const sessions = await client.session.list();

// Create a new session
const session = await client.session.create({
    body: {
        parentID: 'parent-session-id', // optional
        title: 'My Session',
    },
});

// Get session details
const sessionInfo = await client.session.get({
    path: { id: 'session-id' },
});

// Update session
await client.session.update({
    path: { id: 'session-id' },
    body: { title: 'New Title' },
});

// Delete session
await client.session.delete({
    path: { id: 'session-id' },
});

// Get session status
const status = await client.session.status();

// Get session children
const children = await client.session.children({
    path: { id: 'session-id' },
});

// Fork a session
const forked = await client.session.fork({
    path: { id: 'session-id' },
    body: { messageID: 'message-id' },
});

// Abort a session
await client.session.abort({
    path: { id: 'session-id' },
});
```

#### Session Messaging

```typescript
// Send a prompt to a session
const response = await client.session.prompt({
    path: { id: 'session-id' },
    body: {
        parts: [{ type: 'text', text: 'Hello, OpenCode!' }],
        agent: 'build', // optional
        model: { providerID: 'anthropic', modelID: 'claude-3-5-sonnet' },
    },
});

// Send async prompt (non-blocking)
await client.session.promptAsync({
    path: { id: 'session-id' },
    body: {
        /* same as prompt */
    },
});

// List messages in session
const messages = await client.session.messages({
    path: { id: 'session-id' },
});

// Get specific message
const message = await client.session.message({
    path: {
        id: 'session-id',
        messageID: 'message-id',
    },
});

// Execute a command
await client.session.command({
    path: { id: 'session-id' },
    body: {
        name: 'command-name',
        arguments: 'arg1 arg2',
    },
});

// Run shell command
const result = await client.session.shell({
    path: { id: 'session-id' },
    body: {
        command: 'ls -la',
        cwd: '/path/to/dir',
    },
});
```

#### Session Utilities

```typescript
// Get session diff
const diff = await client.session.diff({
    path: { id: 'session-id' },
});

// Summarize session
const summary = await client.session.summarize({
    path: { id: 'session-id' },
});

// Get todo list
const todos = await client.session.todo({
    path: { id: 'session-id' },
});

// Share session
const shareInfo = await client.session.share({
    path: { id: 'session-id' },
});

// Unshare session
await client.session.unshare({
    path: { id: 'session-id' },
});

// Revert message
await client.session.revert({
    path: { id: 'session-id' },
    body: { messageID: 'message-id' },
});

// Restore reverted messages
await client.session.unrevert({
    path: { id: 'session-id' },
});
```

#### Configuration

```typescript
// Get current config
const config = await client.config.get();

// Update config
await client.config.update({
    body: {
        model: 'anthropic/claude-3-5-sonnet',
        theme: 'dark',
        // ... other config options
    },
});

// List providers
const providers = await client.config.providers();
```

#### Provider Management

```typescript
// List all providers
const providers = await client.provider.list();

// Get provider auth methods
const authMethods = await client.provider.auth({
    query: { id: 'provider-id' },
});

// OAuth authorization
const authUrl = await client.provider.oauth.authorize({
    path: { id: 'provider-id' },
});

// OAuth callback
await client.provider.oauth.callback({
    path: { id: 'provider-id' },
    query: { code: 'auth-code' },
});
```

#### File Operations

```typescript
// List files
const files = await client.file.list({
    body: { path: '/path/to/dir' },
});

// Read file
const content = await client.file.read({
    body: { path: '/path/to/file.ts' },
});

// Get file status
const status = await client.file.status();
```

#### Find/Search Operations

```typescript
// Find text in files
const textResults = await client.find.text({
    body: {
        pattern: 'searchTerm',
        include: '*.ts',
    },
});

// Find files
const fileResults = await client.find.files({
    body: { pattern: '*.json' },
});

// Find workspace symbols
const symbols = await client.find.symbols({
    body: { query: 'functionName' },
});
```

#### Tool Management

```typescript
// List all tool IDs
const toolIds = await client.tool.ids();

// List tools for specific provider/model
const tools = await client.tool.list({
    query: {
        provider: 'anthropic',
        model: 'claude-3-5-sonnet',
    },
});
```

#### Command Management

```typescript
// List all commands
const commands = await client.command.list();
```

#### Agent Management

```typescript
// List all agents
const agents = await client.app.agents();
```

#### PTY (Pseudo Terminal) Management

```typescript
// List PTY sessions
const ptys = await client.pty.list();

// Create PTY session
const pty = await client.pty.create({
    body: {
        command: 'bash',
        args: ['-l'],
        cwd: '/path/to/dir',
        title: 'My Terminal',
        env: { FOO: 'bar' },
    },
});

// Get PTY info
const ptyInfo = await client.pty.get({
    path: { id: 'pty-id' },
});

// Update PTY
await client.pty.update({
    path: { id: 'pty-id' },
    body: {
        title: 'New Title',
        size: { rows: 24, cols: 80 },
    },
});

// Connect to PTY
await client.pty.connect({
    path: { id: 'pty-id' },
});

// Remove PTY
await client.pty.remove({
    path: { id: 'pty-id' },
});
```

#### MCP (Model Context Protocol) Server Management

```typescript
// Get MCP server status
const mcpStatus = await client.mcp.status();

// Add MCP server dynamically
await client.mcp.add({
    body: {
        name: 'my-mcp-server',
        config: {
            type: 'local',
            command: ['node', 'server.js'],
            environment: { API_KEY: 'key' },
        },
    },
});

// Connect MCP server
await client.mcp.connect({
    body: { name: 'server-name' },
});

// Disconnect MCP server
await client.mcp.disconnect({
    body: { name: 'server-name' },
});

// MCP OAuth authentication
await client.mcp.auth.start({
    path: { name: 'server-name' },
});

await client.mcp.auth.callback({
    path: { name: 'server-name' },
    query: { code: 'auth-code' },
});

await client.mcp.auth.authenticate({
    path: { name: 'server-name' },
});

await client.mcp.auth.remove({
    path: { name: 'server-name' },
});
```

#### LSP (Language Server Protocol) Management

```typescript
// Get LSP server status
const lspStatus = await client.lsp.status();
```

#### Formatter Management

```typescript
// Get formatter status
const formatterStatus = await client.formatter.status();
```

#### TUI Control

```typescript
// Append to TUI prompt
await client.tui.appendPrompt({
    body: { text: 'Additional text' },
});

// Execute TUI command
await client.tui.executeCommand({
    body: { command: 'agent_cycle' },
});

// Show toast notification
await client.tui.showToast({
    body: {
        title: 'Success',
        message: 'Operation completed',
        variant: 'success',
        duration: 3000,
    },
});

// Publish TUI event
await client.tui.publish({
    body: { event: { type: 'custom.event', properties: {} } },
});

// Open dialogs
await client.tui.openHelp();
await client.tui.openSessions();
await client.tui.openThemes();
await client.tui.openModels();

// Prompt operations
await client.tui.submitPrompt();
await client.tui.clearPrompt();
```

#### Event Subscription

```typescript
// Subscribe to events
const eventStream = await client.event.subscribe();

// Process events
for await (const event of eventStream) {
    console.log(event);
}
```

#### Path and VCS Information

```typescript
// Get path information
const pathInfo = await client.path.get();
// Returns: { state, config, worktree, directory }

// Get VCS info
const vcsInfo = await client.vcs.get();
// Returns: { branch }
```

#### Instance Management

```typescript
// Dispose the current instance
await client.instance.dispose();
```

#### Logging

```typescript
// Write log entry
await client.app.log({
    body: {
        level: 'info',
        message: 'Log message',
    },
});
```

#### Authentication

```typescript
// Set authentication credentials
await client.auth.set({
    body: {
        providerID: 'provider-id',
        auth: {
            type: 'api',
            key: 'api-key',
        },
    },
});
```

## Type Definitions

### Key Types

#### Config

Comprehensive configuration object supporting:

- Theme customization
- Keybinds
- TUI settings
- Commands
- Agents
- Providers
- MCP servers
- LSP servers
- Formatters
- Permissions
- Tools
- Experimental features

#### Session

```typescript
type Session = {
    id: string;
    projectID: string;
    directory: string;
    parentID?: string;
    summary?: {
        additions: number;
        deletions: number;
        files: number;
        diffs?: Array<FileDiff>;
    };
    share?: { url: string };
    title: string;
    version: string;
    time: {
        created: number;
        updated: number;
        compacting?: number;
    };
    revert?: {
        messageID: string;
        partID?: string;
        snapshot?: string;
        diff?: string;
    };
};
```

#### Message

Messages can be either `UserMessage` or `AssistantMessage`:

```typescript
type UserMessage = {
    id: string;
    sessionID: string;
    role: 'user';
    time: { created: number };
    summary?: {
        title?: string;
        body?: string;
        diffs: Array<FileDiff>;
    };
    agent: string;
    model: {
        providerID: string;
        modelID: string;
    };
    system?: string;
    tools?: { [key: string]: boolean };
};

type AssistantMessage = {
    id: string;
    sessionID: string;
    role: 'assistant';
    time: {
        created: number;
        completed?: number;
    };
    error?: Error;
    parentID: string;
    modelID: string;
    providerID: string;
    mode: string;
    path: { cwd: string; root: string };
    summary?: boolean;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: { read: number; write: number };
    };
    finish?: string;
};
```

#### Parts

Message parts include:

- `TextPart`: Text content
- `ReasoningPart`: Reasoning traces
- `FilePart`: File attachments
- `ToolPart`: Tool invocations
- `StepStartPart` / `StepFinishPart`: Execution steps
- `SnapshotPart`: State snapshots
- `PatchPart`: File patches
- `AgentPart`: Agent information
- `RetryPart`: Retry attempts
- `CompactionPart`: Compaction events

#### Event Types

Comprehensive event system including:

- `server.instance.disposed`
- `installation.updated`
- `lsp.updated`
- `message.updated`
- `message.part.updated`
- `permission.updated`
- `session.status`
- `session.created`
- `session.updated`
- `session.deleted`
- `session.diff`
- `file.edited`
- `todo.updated`
- `command.executed`
- `pty.created`
- `pty.updated`
- And many more...

#### Agent Configuration

```typescript
type AgentConfig = {
    model?: string;
    temperature?: number;
    top_p?: number;
    prompt?: string;
    tools?: { [key: string]: boolean };
    disable?: boolean;
    description?: string;
    mode?: 'subagent' | 'primary' | 'all';
    color?: string;
    maxSteps?: number;
    permission?: {
        edit?: 'ask' | 'allow' | 'deny';
        bash?:
            | 'ask'
            | 'allow'
            | 'deny'
            | { [key: string]: 'ask' | 'allow' | 'deny' };
        webfetch?: 'ask' | 'allow' | 'deny';
        doom_loop?: 'ask' | 'allow' | 'deny';
        external_directory?: 'ask' | 'allow' | 'deny';
    };
};
```

#### MCP Server Configuration

```typescript
type McpLocalConfig = {
    type: 'local';
    command: Array<string>;
    environment?: { [key: string]: string };
    enabled?: boolean;
    timeout?: number;
};

type McpRemoteConfig = {
    type: 'remote';
    url: string;
    enabled?: boolean;
    headers?: { [key: string]: string };
    oauth?: McpOAuthConfig | false;
    timeout?: number;
};
```

## Error Handling

All client methods support a `ThrowOnError` generic parameter:

```typescript
// Throws on error (default behavior)
const result = await client.session.get({
    path: { id: 'session-id' },
});

// Returns error in response
const result = await client.session.get<true>({
    path: { id: 'session-id' },
});
if (result.error) {
    console.error(result.error);
}
```

Common error types:

- `BadRequestError` (400)
- `NotFoundError` (404)
- `ProviderAuthError`
- `UnknownError`
- `MessageOutputLengthError`
- `MessageAbortedError`
- `ApiError`

## V2 API

The V2 API (`@opencode-ai/sdk/v2`) provides an identical structure to the main API but represents the next-generation interface. Import paths:

```typescript
import { createOpencode } from '@opencode-ai/sdk/v2';
import { createOpencodeClient } from '@opencode-ai/sdk/v2/client';
import {
    createOpencodeServer,
    createOpencodeTui,
} from '@opencode-ai/sdk/v2/server';
```

## Best Practices

1. **Always specify directory**: Include the `directory` parameter in queries to ensure operations target the correct project.

2. **Handle errors gracefully**: Wrap client calls in try-catch blocks or use the error response pattern.

3. **Use event streams for real-time updates**: Subscribe to events for monitoring session progress and file changes.

4. **Clean up resources**: Always call `server.close()` or `tui.close()` when done.

5. **Type safety**: Import types from the SDK for full TypeScript support:

    ```typescript
    import type {
        Config,
        Session,
        Message,
        Event,
    } from '@opencode-ai/sdk/client';
    ```

6. **Permissions**: Configure agent permissions appropriately for your security requirements.

7. **MCP servers**: Use the MCP API for extending OpenCode with custom tools and integrations.

## Examples

### Complete Session Workflow

```typescript
import { createOpencode } from '@opencode-ai/sdk';

async function runSession() {
    const { client, server } = await createOpencode({ port: 3000 });

    try {
        // Create session
        const session = await client.session.create({
            body: { title: 'My Task' },
        });

        // Send prompt
        await client.session.prompt({
            path: { id: session.data.id },
            body: {
                parts: [{ type: 'text', text: 'Implement feature X' }],
                agent: 'build',
                model: {
                    providerID: 'anthropic',
                    modelID: 'claude-3-5-sonnet',
                },
            },
        });

        // Subscribe to events
        const events = await client.event.subscribe({
            query: { directory: session.data.directory },
        });

        for await (const event of events) {
            if (event.type === 'session.idle') {
                console.log('Session completed');
                break;
            }
            if (event.type === 'message.part.updated') {
                console.log('Update:', event.properties.part);
            }
        }

        // Get final diff
        const diff = await client.session.diff({
            path: { id: session.data.id },
        });

        console.log('Changes:', diff.data);
    } finally {
        server.close();
    }
}
```

### Custom MCP Server Integration

```typescript
import { createOpencodeClient } from '@opencode-ai/sdk/client';

const client = createOpencodeClient();

// Add custom MCP server
await client.mcp.add({
    body: {
        name: 'custom-tools',
        config: {
            type: 'local',
            command: ['npx', '-y', '@modelcontextprotocol/server-everything'],
            enabled: true,
        },
    },
});

// Connect the server
await client.mcp.connect({
    body: { name: 'custom-tools' },
});

// Check status
const status = await client.mcp.status();
console.log('MCP Status:', status.data);
```

## References

- **Package Version**: 1.0.146
- **Type**: ES Module
- **TypeScript**: Full type definitions included
- **Build Tool**: @hey-api/openapi-ts
