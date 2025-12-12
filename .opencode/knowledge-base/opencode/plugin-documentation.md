---
title: '@opencode-ai/plugin - Complete Plugin Development Guide'
description: 'Comprehensive guide and API reference for building OpenCode plugins with hooks, tools, and authentication'
type: knowledge-base
category: opencode
version: 1.0.0
difficulty: intermediate
tags: [opencode, plugin, api, typescript, hooks, tools, authentication, sdk]
---

# OpenCode Plugin Development - Complete Guide

> Complete documentation for the `@opencode-ai/plugin` package (v1.0.146)

## Table of Contents

- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Plugin Structure](#plugin-structure)
- [API Reference](#api-reference)
- [Hooks](#hooks)
- [Tools](#tools)
- [Authentication](#authentication)
- [Shell Interface](#shell-interface)
- [Best Practices](#best-practices)
- [Security](#security)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Quick Reference](#quick-reference)

---

## Quick Start

### Installation

The `@opencode-ai/plugin` package is included in OpenCode projects:

```json
{
    "dependencies": {
        "@opencode-ai/plugin": "^1.0.146"
    }
}
```

### Plugin Locations

- **Project-level plugins**: `.opencode/plugin/`
- **Global plugins**: `~/.config/opencode/plugin/`

### Basic Plugin Template

```typescript
import type { Plugin } from '@opencode-ai/plugin';
import { tool } from '@opencode-ai/plugin/tool';

export default (async ({ client, project, directory, worktree, $ }) => {
    // Plugin initialization
    console.log(`Initializing plugin for ${project.name}`);

    return {
        // Register custom tools
        tool: {
            'my-tool': tool({
                description: 'Custom tool description',
                args: {
                    input: tool.schema.string(),
                },
                async execute(args, context) {
                    return `Processed: ${args.input}`;
                },
            }),
        },

        // Hook into events
        async 'chat.message'(input, output) {
            console.log(`New message in session ${input.sessionID}`);
        },

        async 'tool.execute.before'(input, output) {
            console.log(`Executing tool: ${input.tool}`);
        },
    };
}) satisfies Plugin;
```

---

## Core Concepts

### Concept 1: Plugin Function

**Definition:** A plugin is an async function that receives initialization context and returns an object of lifecycle hooks.

**Purpose:**

- Enables extensibility without modifying OpenCode core
- Provides isolated execution contexts per plugin
- Allows plugins to register tools, handle events, and modify behavior

**Type Signature:**

```typescript
type Plugin = (input: PluginInput) => Promise<Hooks>;
```

**PluginInput Properties:**

- `client: ReturnType<typeof createOpencodeClient>` - SDK client for API operations
- `project: Project` - Current project metadata
- `directory: string` - Plugin directory path
- `worktree: string` - Git worktree path
- `$: BunShell` - Shell execution interface

---

### Concept 2: Hooks System

**Definition:** Hooks are lifecycle callbacks that plugins implement to integrate with OpenCode's execution pipeline.

**Purpose:**

- Intercept and modify OpenCode behavior at specific points
- React to events (messages, tool executions, config changes)
- Extend functionality without core modifications

**Available Hooks:**

- **Configuration**: `config`, `event`
- **Authentication**: `auth`
- **Chat**: `chat.message`, `chat.params`
- **Tools**: `tool`, `tool.execute.before`, `tool.execute.after`
- **Permissions**: `permission.ask`
- **Experimental**: `experimental.text.complete`

---

### Concept 3: Tool Definition

**Definition:** Tools are structured functions with Zod-validated arguments that plugins can register for use by AI agents.

**Purpose:**

- Extend AI capabilities with custom operations
- Provide type-safe argument validation
- Integrate external systems and APIs

**Type Signature:**

```typescript
function tool<Args extends z.ZodRawShape>(input: {
    description: string;
    args: Args;
    execute(
        args: z.infer<z.ZodObject<Args>>,
        context: ToolContext
    ): Promise<string>;
}): ToolDefinition;
```

---

### Concept 4: Shell Interface

**Definition:** BunShell provides a type-safe interface for executing shell commands with streaming, buffering, and error handling.

**Purpose:**

- Execute system commands from plugins
- Process command output in various formats
- Control working directory and environment

**Interface:**

```typescript
interface BunShell {
    (
        strings: TemplateStringsArray,
        ...expressions: ShellExpression[]
    ): BunShellPromise;
    braces(pattern: string): string[];
    escape(input: string): string;
    env(newEnv?: Record<string, string | undefined>): BunShell;
    cwd(newCwd?: string): BunShell;
    nothrow(): BunShell;
    throws(shouldThrow: boolean): BunShell;
}
```

---

## Plugin Structure

### Package Exports

The package provides two entry points:

1. **Main Export:** `@opencode-ai/plugin`
    - Runtime: `./dist/index.js`
    - Types: `./dist/index.d.ts`
    - Exports: All types, `Plugin`, `Hooks`, `PluginInput`, tool utilities

2. **Tool Export:** `@opencode-ai/plugin/tool`
    - Runtime: `./dist/tool.js`
    - Types: `./dist/tool.d.ts`
    - Exports: `tool()` function, `ToolDefinition`, `ToolContext`

### File Organization

```
.opencode/plugin/
├── my-plugin.ts          # Individual plugin file
├── security-plugin.ts    # Security-focused plugin
└── api-integration.ts    # External API integration
```

### Plugin Checklist

- ✅ Create file under `.opencode/plugin/<name>.ts`
- ✅ Export an async function that returns hooks/tools
- ✅ Keep initialization idempotent and fast (<100ms)
- ✅ Use `project` and `client` helpers instead of arbitrary shell commands when possible
- ✅ Document any network or shell access requirements
- ✅ Review security implications before deployment

---

## API Reference

### Type: PluginInput

Context object passed to plugin initialization function.

**Properties:**

```typescript
type PluginInput = {
    client: ReturnType<typeof createOpencodeClient>;
    project: Project;
    directory: string;
    worktree: string;
    $: BunShell;
};
```

**Usage:**

```typescript
export default (async ({ client, project, directory, worktree, $ }) => {
    // Access project info
    console.log(project.name);

    // Execute shell commands
    const files = await $`ls ${directory}`.text();

    // Use SDK client
    const config = await client.config.get();

    return {
        /* hooks */
    };
}) satisfies Plugin;
```

---

### Interface: Hooks

Object returned by plugin function containing lifecycle hook implementations.

---

## Hooks

### Hook: config

Called when configuration changes.

**Signature:**

```typescript
config?: (input: Config) => Promise<void>
```

**Usage:**

```typescript
return {
    async config(input) {
        console.log('Config updated:', input);
        // React to configuration changes
    },
};
```

---

### Hook: event

Generic event handler for system events.

**Signature:**

```typescript
event?: (input: { event: Event }) => Promise<void>
```

**Event Types:**
System events include various lifecycle events like `session.created`, `message.updated`, `file.edited`, etc. Note that these are Event types from the SDK, not hook names.

**Usage:**

```typescript
return {
    async event(input) {
        console.log('Event received:', input.event.type);

        if (input.event.type === 'session.created') {
            console.log('New session started');
        }
    },
};
```

---

### Hook: tool

Register custom tools for AI agent use.

**Signature:**

```typescript
tool?: {
    [key: string]: ToolDefinition;
}
```

**Usage:**

```typescript
return {
    tool: {
        'my-tool': tool({
            description: 'Custom tool',
            args: { input: tool.schema.string() },
            async execute(args, context) {
                return `Processed: ${args.input}`;
            },
        }),
    },
};
```

---

### Hook: auth

Register authentication provider with OAuth or API key methods.

**Type:** `AuthHook`

**Structure:**

- `provider: string` - Provider identifier
- `loader?: (auth, provider) => Promise<Record<string, any>>` - Optional auth data loader
- `methods: Array<OAuthMethod | APIMethod>` - Authentication methods

**OAuth Method Properties:**

- `type: "oauth"`
- `label: string`
- `prompts?: Array<TextPrompt | SelectPrompt>`
- `authorize(inputs?) => Promise<AuthOuathResult>`

**API Method Properties:**

- `type: "api"`
- `label: string`
- `prompts?: Array<TextPrompt | SelectPrompt>`
- `authorize?(inputs?) => Promise<AuthResult>`

**Example:**

```typescript
return {
    auth: {
        provider: 'my-service',
        methods: [
            {
                type: 'api',
                label: 'API Key',
                prompts: [
                    {
                        type: 'text',
                        key: 'apiKey',
                        message: 'Enter your API key',
                        validate: (value) =>
                            value.length > 0 ? undefined : 'Required',
                    },
                ],
                async authorize(inputs) {
                    // Validate and store credentials
                    return { type: 'success', key: inputs.apiKey };
                },
            },
        ],
    },
};
```

---

### Hook: chat.message

Called when a new user message is received.

**Signature:**

```typescript
"chat.message"?: (
    input: {
        sessionID: string;
        agent?: string;
        model?: { providerID: string; modelID: string };
        messageID?: string;
    },
    output: {
        message: UserMessage;
        parts: Part[];
    }
) => Promise<void>
```

**Usage:**

```typescript
return {
    async 'chat.message'(input, output) {
        console.log(`Message in session ${input.sessionID}`);
        console.log(`Agent: ${input.agent}`);
        console.log(`Content:`, output.message);
    },
};
```

---

### Hook: chat.params

Modify LLM parameters before inference.

**Signature:**

```typescript
"chat.params"?: (
    input: {
        sessionID: string;
        agent: string;
        model: Model;
        provider: ProviderContext;
        message: UserMessage;
    },
    output: {
        temperature: number;
        topP: number;
        options: Record<string, any>;
    }
) => Promise<void>
```

**Usage:**

```typescript
return {
    async 'chat.params'(input, output) {
        // Increase temperature for creative tasks
        if (input.message.content.includes('brainstorm')) {
            output.temperature = 0.9;
        }
    },
};
```

---

### Hook: permission.ask

Control permission decisions for operations.

**Signature:**

```typescript
"permission.ask"?: (
    input: Permission,
    output: { status: "ask" | "deny" | "allow" }
) => Promise<void>
```

**Usage:**

```typescript
return {
    async 'permission.ask'(input, output) {
        // Auto-deny access to sensitive files
        if (input.path?.includes('.env')) {
            output.status = 'deny';
        }
    },
};
```

---

### Hook: tool.execute.before

Intercept and modify tool arguments before execution.

**Signature:**

```typescript
"tool.execute.before"?: (
    input: {
        tool: string;
        sessionID: string;
        callID: string;
    },
    output: { args: any }
) => Promise<void>
```

**Usage:**

```typescript
return {
    async 'tool.execute.before'(input, output) {
        // Log tool usage
        console.log(`Executing tool: ${input.tool}`);

        // Modify arguments - note: output.args is an object
        if (input.tool === 'bash') {
            output.args.timeout = 30000;
        }
    },
};
```

---

### Hook: tool.execute.after

Modify tool output after execution.

**Signature:**

```typescript
"tool.execute.after"?: (
    input: {
        tool: string;
        sessionID: string;
        callID: string;
    },
    output: {
        title: string;
        output: string;
        metadata: any;
    }
) => Promise<void>
```

**Usage:**

```typescript
return {
    async 'tool.execute.after'(input, output) {
        // Redact sensitive data from output
        output.output = output.output.replace(
            /SECRET_KEY=.+/g,
            'SECRET_KEY=[REDACTED]'
        );
    },
};
```

---

### Hook: experimental.text.complete

Experimental text completion hook.

**Signature:**

```typescript
"experimental.text.complete"?: (
    input: {
        sessionID: string;
        messageID: string;
        partID: string;
    },
    output: { text: string }
) => Promise<void>
```

---

## Tools

### Function: tool()

Creates a tool definition with Zod schema validation.

**Signature:**

```typescript
function tool<Args extends z.ZodRawShape>(input: {
    description: string;
    args: Args;
    execute(
        args: z.infer<z.ZodObject<Args>>,
        context: ToolContext
    ): Promise<string>;
}): ToolDefinition;
```

**Parameters:**

- `description: string` - Human-readable tool description for AI
- `args: z.ZodRawShape` - Zod schema object for argument validation
- `execute: Function` - Async function that implements tool logic

**Returns:** `ToolDefinition` - Tool definition object for registration

**Example:**

```typescript
import { tool } from '@opencode-ai/plugin/tool';

const fetchData = tool({
    description: 'Fetch data from external API',
    args: {
        url: tool.schema.string().url(),
        method: tool.schema.enum(['GET', 'POST']).default('GET'),
        headers: tool.schema.record(tool.schema.string()).optional(),
    },
    async execute(args, context) {
        const response = await fetch(args.url, {
            method: args.method,
            headers: args.headers,
            signal: context.abort,
        });
        return await response.text();
    },
});
```

---

### Property: tool.schema

Alias to Zod library for schema definitions.

**Type:** `typeof z`

**Usage:**

```typescript
// All Zod methods available
tool.schema.string();
tool.schema.number().min(0).max(100);
tool.schema.object({ name: tool.schema.string() });
tool.schema.array(tool.schema.string());
tool.schema.enum(['option1', 'option2']);
tool.schema.optional();
tool.schema.nullable();
```

---

### Type: ToolContext

Context object passed to tool execution function.

**Properties:**

- `sessionID: string` - Current session identifier
- `messageID: string` - Message that triggered tool
- `agent: string` - Agent name executing tool
- `abort: AbortSignal` - Signal for cancellation

**Usage:**

```typescript
async execute(args, context) {
    console.log(`Tool called by ${context.agent} in session ${context.sessionID}`);

    // Support cancellation
    const response = await fetch(url, { signal: context.abort });

    return result;
}
```

---

## Authentication

### Type: ProviderContext

Information about the AI provider being used.

**Properties:**

- `source: "env" | "config" | "custom" | "api"` - Provider configuration source
- `info: Provider` - Provider metadata
- `options: Record<string, any>` - Provider-specific options

---

## Shell Interface

### Interface: BunShell

Shell command execution interface.

**Methods:**

#### Template Literal Execution

```typescript
(strings: TemplateStringsArray, ...expressions: ShellExpression[]): BunShellPromise
```

Execute commands using tagged template literals:

```typescript
const output = await $`echo "Hello, ${name}"`;
```

#### braces(pattern: string): string[]

Perform bash-like brace expansion:

```typescript
$.braces('file{1,2,3}.txt'); // ['file1.txt', 'file2.txt', 'file3.txt']
```

#### escape(input: string): string

Escape strings for shell input:

```typescript
const safe = $.escape(userInput);
await $`echo ${safe}`;
```

#### env(newEnv?: Record<string, string | undefined>): BunShell

Set environment variables:

```typescript
$.env({ NODE_ENV: 'production' })`npm build`;
```

#### cwd(newCwd?: string): BunShell

Set working directory:

```typescript
$.cwd('/path/to/project')`git status`;
```

#### nothrow(): BunShell

Don't throw on non-zero exit codes:

```typescript
const result = await $.nothrow()`command-that-might-fail`;
if (result.exitCode !== 0) {
    console.log('Command failed');
}
```

#### throws(shouldThrow: boolean): BunShell

Configure exception behavior:

```typescript
$.throws(false)`risky-command`;
```

---

### Interface: BunShellPromise

Promise returned by shell command execution.

**Properties:**

- `stdin: WritableStream` - Input stream for command

**Methods:**

#### cwd(newCwd: string): this

Change working directory for this command:

```typescript
$`ls`.cwd('/tmp');
```

#### env(newEnv: Record<string, string>): this

Set environment for this command:

```typescript
$`node app.js`.env({ PORT: '3000' });
```

#### quiet(): this

Buffer output without echoing to stdout:

```typescript
const output = await $`command`.quiet();
```

#### lines(): AsyncIterable<string>

Read output line by line:

```typescript
for await (const line of $`tail -f logfile`.lines()) {
    console.log(line);
}
```

#### text(encoding?: BufferEncoding): Promise<string>

Read output as string:

```typescript
const content = await $`cat file.txt`.text();
```

#### json(): Promise<any>

Parse output as JSON:

```typescript
const data = await $`curl https://api.example.com`.json();
```

#### arrayBuffer(): Promise<ArrayBuffer>

Read output as ArrayBuffer:

```typescript
const buffer = await $`cat image.png`.arrayBuffer();
```

#### blob(): Promise<Blob>

Read output as Blob:

```typescript
const blob = await $`cat video.mp4`.blob();
```

#### nothrow(): this

Don't throw on non-zero exit:

```typescript
const result = await $`test -f missing.txt`.nothrow();
```

#### throws(shouldThrow: boolean): this

Configure throw behavior:

```typescript
$`command`.throws(false);
```

---

### Interface: BunShellOutput

Result object from shell command execution.

**Properties:**

- `stdout: Buffer` - Command standard output
- `stderr: Buffer` - Command error output
- `exitCode: number` - Process exit code

**Methods:**

#### text(encoding?: BufferEncoding): string

Convert stdout to string:

```typescript
const text = result.text('utf-8');
```

#### json(): any

Parse stdout as JSON:

```typescript
const data = result.json();
```

#### arrayBuffer(): ArrayBuffer

Convert stdout to ArrayBuffer:

```typescript
const buffer = result.arrayBuffer();
```

#### bytes(): Uint8Array

Convert stdout to Uint8Array:

```typescript
const bytes = result.bytes();
```

#### blob(): Blob

Convert stdout to Blob:

```typescript
const blob = result.blob();
```

---

### Type: BunShellError

Error thrown by shell commands (extends Error & BunShellOutput).

**Usage:**

```typescript
try {
    await $`failing-command`;
} catch (error) {
    if (error.exitCode !== 0) {
        console.error('Command failed:', error.stderr.toString());
    }
}
```

---

## Best Practices

### DO: Recommended Practices

#### 1. Validate Inputs with Zod

**Why:** Prevents runtime errors and provides clear error messages to AI agents.

```typescript
tool({
    description: 'Process user data',
    args: {
        email: tool.schema.string().email(),
        age: tool.schema.number().int().min(0).max(150),
        role: tool.schema.enum(['admin', 'user', 'guest']),
    },
    async execute(args, context) {
        // args are type-safe and validated
        return `Processed ${args.email}`;
    },
});
```

---

#### 2. Support Cancellation

**Why:** Allows OpenCode to cancel tools when sessions end or users interrupt.

```typescript
async execute(args, context) {
    const controller = new AbortController();
    context.abort.addEventListener('abort', () => controller.abort());

    const response = await fetch(args.url, { signal: controller.signal });
    return await response.text();
}
```

---

#### 3. Return Structured Output

**Why:** Improves AI comprehension and downstream processing.

```typescript
async execute(args, context) {
    const result = await processData(args);

    return JSON.stringify({
        status: 'success',
        data: result,
        timestamp: new Date().toISOString()
    }, null, 2);
}
```

---

#### 4. Use Hook Output Parameters for Modifications

**Why:** Hooks use output parameters for side effects; return values are ignored.

```typescript
return {
    async 'chat.params'(input, output) {
        // ✅ Correct: Modify output parameter
        output.temperature = 0.7;

        // ❌ Wrong: Return values are ignored
        // return { temperature: 0.7 };
    },
};
```

---

#### 5. Scope Shell Commands Safely

**Why:** Prevents unintended side effects and security issues.

```typescript
// ✅ Scoped execution
const result = await $.cwd(project.directory).env({
    NODE_ENV: 'test',
})`npm test`;

// ❌ Affects global state
await $`cd ${project.directory} && npm test`;
```

---

### DON'T: Anti-Patterns to Avoid

#### 1. Don't Block Plugin Initialization

**Problem:** Slow or blocking operations during plugin initialization delay OpenCode startup.

**Bad Example:**

```typescript
export default (async ({ $ }) => {
    // ❌ Blocking network request during init
    const config = await fetch('https://api.example.com/config').then((r) =>
        r.json()
    );

    return {
        /* hooks */
    };
}) satisfies Plugin;
```

**Good Alternative:**

```typescript
export default (async ({ $ }) => {
    let config: any = null;

    return {
        async 'chat.message'(input, output) {
            // ✅ Lazy load on first use
            if (!config) {
                config = await fetch('https://api.example.com/config').then(
                    (r) => r.json()
                );
            }
        },
    };
}) satisfies Plugin;
```

---

#### 2. Don't Ignore Error Handling

**Problem:** Unhandled errors crash plugins and disrupt OpenCode.

**Bad Example:**

```typescript
async execute(args, context) {
    // ❌ No error handling
    const data = await fetch(args.url).then(r => r.json());
    return data.result;
}
```

**Good Alternative:**

```typescript
async execute(args, context) {
    try {
        const response = await fetch(args.url);
        if (!response.ok) {
            return `Error: HTTP ${response.status}`;
        }
        const data = await response.json();
        return JSON.stringify(data.result);
    } catch (error) {
        return `Error: ${error.message}`;
    }
}
```

---

#### 3. Don't Mutate Input Parameters

**Problem:** Modifying input parameters can cause unexpected behavior in OpenCode.

**Bad Example:**

```typescript
async "tool.execute.before"(input, output) {
    // ❌ Mutating input
    input.tool = 'modified-tool';
    input.sessionID = 'new-session';
}
```

**Good Alternative:**

```typescript
async "tool.execute.before"(input, output) {
    // ✅ Only modify output
    output.args.timeout = 30000;

    // ✅ Log input for debugging
    console.log(`Tool: ${input.tool}, Session: ${input.sessionID}`);
}
```

---

#### 4. Don't Register Too Many Tools

**Problem:** Excessive tools clutter the AI's tool set and slow inference.

**Bad Example:**

```typescript
return {
    tool: {
        // ❌ 50+ very specific tools
        'get-user-by-id': tool({
            /* ... */
        }),
        'get-user-by-email': tool({
            /* ... */
        }),
        'get-user-by-username': tool({
            /* ... */
        }),
        // ... 47 more user operations
    },
};
```

**Good Alternative:**

```typescript
return {
    tool: {
        // ✅ Unified tool with parameters
        'user-operations': tool({
            description: 'Perform user operations',
            args: {
                operation: tool.schema.enum([
                    'get',
                    'create',
                    'update',
                    'delete',
                ]),
                lookup: tool.schema
                    .object({
                        by: tool.schema.enum(['id', 'email', 'username']),
                        value: tool.schema.string(),
                    })
                    .optional(),
            },
            async execute(args, context) {
                // Handle all operations
            },
        }),
    },
};
```

---

## Security

### Security Checklist

- ✅ Review plugin source before enabling global plugins
- ✅ Plugins execute within the host environment and may run shell commands
- ✅ Use `tool.execute.before` to protect sensitive files (e.g., block `.env` reads)
- ✅ Prefer minimal surface area: only register the hooks/tools you need
- ✅ Document and gate behaviors that shell out or access network resources
- ✅ Validate all user inputs with Zod schemas
- ✅ Use environment-specific configurations carefully

### Protecting Sensitive Files

```typescript
return {
    async 'permission.ask'(input, output) {
        const path = input.path || '';

        // Block access to sensitive files
        const sensitivePatterns = [
            /\.env(\..+)?$/,
            /\.secret$/,
            /\.key$/,
            /credentials\.json$/,
        ];

        if (sensitivePatterns.some((pattern) => pattern.test(path))) {
            console.warn(`[Security] Blocked access to: ${path}`);
            output.status = 'deny';
        }
    },
};
```

### Redacting Secrets from Outputs

```typescript
return {
    async 'tool.execute.after'(input, output) {
        const secretRegex =
            /(?:api[_-]?key|secret|token|password)[\s=:]+(['"]?)([^\s'"]+)\1/gi;

        const original = output.output;
        output.output = original.replace(
            secretRegex,
            (match, quote, secret) => {
                const visible = secret.slice(0, 4);
                return match.replace(secret, `${visible}...[REDACTED]`);
            }
        );

        if (output.output !== original) {
            console.warn(`[Security] Redacted secrets in ${input.tool} output`);
        }
    },
};
```

---

## Examples

### Example 1: Custom Tool with API Integration

**Scenario:** Create a tool that fetches GitHub repository information.

**Solution:**

```typescript
import type { Plugin } from '@opencode-ai/plugin';
import { tool } from '@opencode-ai/plugin/tool';

export default (async ({ client, project, $ }) => {
    return {
        tool: {
            'github-repo-info': tool({
                description: 'Fetch GitHub repository information',
                args: {
                    owner: tool.schema.string().min(1),
                    repo: tool.schema.string().min(1),
                },
                async execute(args, context) {
                    const url = `https://api.github.com/repos/${args.owner}/${args.repo}`;

                    try {
                        const response = await fetch(url, {
                            signal: context.abort,
                            headers: {
                                Accept: 'application/vnd.github.v3+json',
                                'User-Agent': 'OpenCode-Plugin',
                            },
                        });

                        if (!response.ok) {
                            return `Error: ${response.status} - ${response.statusText}`;
                        }

                        const data = await response.json();

                        return JSON.stringify(
                            {
                                name: data.name,
                                description: data.description,
                                stars: data.stargazers_count,
                                forks: data.forks_count,
                                language: data.language,
                                url: data.html_url,
                            },
                            null,
                            2
                        );
                    } catch (error) {
                        if (error.name === 'AbortError') {
                            return 'Request cancelled';
                        }
                        return `Error: ${error.message}`;
                    }
                },
            }),
        },
    };
}) satisfies Plugin;
```

---

### Example 2: Authentication Provider

**Scenario:** Add authentication for a custom API service with API key and OAuth.

**Solution:**

```typescript
import type { Plugin } from '@opencode-ai/plugin';

export default (async ({ client }) => {
    return {
        auth: {
            provider: 'my-service',
            methods: [
                {
                    type: 'api',
                    label: 'API Key',
                    prompts: [
                        {
                            type: 'text',
                            key: 'apiKey',
                            message: 'Enter your API key',
                            placeholder: 'sk_live_...',
                            validate: (value) => {
                                if (!value.startsWith('sk_')) {
                                    return 'API key must start with sk_';
                                }
                                if (value.length < 32) {
                                    return 'API key too short';
                                }
                                return undefined;
                            },
                        },
                        {
                            type: 'select',
                            key: 'environment',
                            message: 'Select environment',
                            options: [
                                { label: 'Production', value: 'prod' },
                                { label: 'Staging', value: 'staging' },
                                {
                                    label: 'Development',
                                    value: 'dev',
                                    hint: 'Local testing',
                                },
                            ],
                        },
                    ],
                    async authorize(inputs) {
                        try {
                            const response = await fetch(
                                'https://api.my-service.com/verify',
                                {
                                    headers: {
                                        Authorization: `Bearer ${inputs.apiKey}`,
                                        'X-Environment': inputs.environment,
                                    },
                                }
                            );

                            if (response.ok) {
                                return {
                                    type: 'success',
                                    key: inputs.apiKey,
                                    provider: inputs.environment,
                                };
                            } else {
                                return { type: 'failed' };
                            }
                        } catch (error) {
                            return { type: 'failed' };
                        }
                    },
                },
                {
                    type: 'oauth',
                    label: 'OAuth',
                    async authorize() {
                        const authUrl =
                            'https://api.my-service.com/oauth/authorize?client_id=...';

                        return {
                            url: authUrl,
                            instructions:
                                'Click the link to authorize, then return here.',
                            method: 'auto',
                            async callback() {
                                const tokens = await waitForOAuthCallback();

                                return {
                                    type: 'success',
                                    access: tokens.accessToken,
                                    refresh: tokens.refreshToken,
                                    expires: tokens.expiresIn,
                                };
                            },
                        };
                    },
                },
            ],
        },
    };
}) satisfies Plugin;
```

---

### Example 3: Security Plugin with Permission Control

**Scenario:** Prevent access to sensitive files and redact secrets from outputs.

**Solution:**

```typescript
import type { Plugin } from '@opencode-ai/plugin';

export default (async ({ client, project }) => {
    const sensitivePatterns = [
        /\.env(\..+)?$/,
        /\.secret$/,
        /\.key$/,
        /credentials\.json$/,
    ];

    const secretRegex =
        /(?:api[_-]?key|secret|token|password)[\s=:]+(['"]?)([^\s'"]+)\1/gi;

    return {
        async 'permission.ask'(input, output) {
            const path = input.path || '';

            // Block access to sensitive files
            if (sensitivePatterns.some((pattern) => pattern.test(path))) {
                console.warn(`[Security] Blocked access to: ${path}`);
                output.status = 'deny';
            }
        },

        async 'tool.execute.after'(input, output) {
            // Redact secrets from output
            const original = output.output;
            output.output = original.replace(
                secretRegex,
                (match, quote, secret) => {
                    const visible = secret.slice(0, 4);
                    return match.replace(secret, `${visible}...[REDACTED]`);
                }
            );

            // Log if redaction occurred
            if (output.output !== original) {
                console.warn(
                    `[Security] Redacted secrets in ${input.tool} output`
                );
            }
        },
    };
}) satisfies Plugin;
```

---

## Troubleshooting

### Issue 1: Tool Arguments Not Validated

**Symptoms:**

- Runtime errors in tool execution
- Type errors with args parameter
- Zod validation not triggering

**Solution:**

```typescript
// ❌ Wrong: Manual tool definition
return {
    tool: {
        'my-tool': {
            description: '...',
            args: { input: 'string' }, // Not a Zod schema
            execute: async (args) => {
                /* ... */
            },
        },
    },
};

// ✅ Correct: Use tool() function
import { tool } from '@opencode-ai/plugin/tool';

return {
    tool: {
        'my-tool': tool({
            description: '...',
            args: {
                input: tool.schema.string(), // Proper Zod schema
            },
            async execute(args, context) {
                // args is type-safe
            },
        }),
    },
};
```

---

### Issue 2: Hook Not Being Called

**Symptoms:**

- Hook function never executes
- No logs or side effects from hook
- OpenCode doesn't recognize hook

**Solution:**

```typescript
// ❌ Wrong: Typo in hook name
return {
    'chat.mesage': async (input, output) => {
        /* ... */
    }, // Typo: "mesage"
};

// ❌ Wrong: Synchronous return
export default (({ client }) => {
    return {
        /* hooks */
    }; // Missing async/await
}) satisfies Plugin;

// ✅ Correct: Proper hook name and async
export default (async ({ client }) => {
    return {
        'chat.message': async (input, output) => {
            console.log('Message received');
        },
    };
}) satisfies Plugin;
```

**Prevention:**

- Use TypeScript for compile-time hook name validation
- Reference this documentation for exact hook names
- Test hooks with console.log statements

---

### Issue 3: Shell Commands Fail Silently

**Symptoms:**

- Commands don't execute
- No output or error messages
- Exit codes not checked

**Solution:**

```typescript
// ❌ Wrong: Not awaited
$.cwd(directory)`npm install`; // Promise never resolves

// ❌ Wrong: nothrow without checking
const result = await $.nothrow()`command`;
// Doesn't check result.exitCode

// ✅ Correct: Await and check exit codes
const result = await $.nothrow()`npm install`;
if (result.exitCode !== 0) {
    console.error('Installation failed:', result.stderr.toString());
    return 'Error: npm install failed';
}
return result.stdout.toString();
```

**Prevention:**

- Always await shell command promises
- Check `exitCode` when using `.nothrow()`
- Log stderr for debugging

---

### Issue 4: Plugin Slows OpenCode Startup

**Symptoms:**

- Long delay before OpenCode becomes responsive
- Timeout errors during initialization
- Other plugins delayed

**Solution:**

```typescript
// ❌ Wrong: Blocking initialization
export default (async ({ client }) => {
    // Network request blocks startup
    const config = await fetch('https://...').then((r) => r.json());
    const data = await processLargeFile();

    return {
        /* hooks */
    };
}) satisfies Plugin;

// ✅ Correct: Lazy initialization
export default (async ({ client }) => {
    let config: any = null;

    const getConfig = async () => {
        if (!config) {
            config = await fetch('https://...').then((r) => r.json());
        }
        return config;
    };

    return {
        tool: {
            'my-tool': tool({
                description: '...',
                args: {},
                async execute(args, context) {
                    const cfg = await getConfig(); // Lazy load
                    // Use config
                },
            }),
        },
    };
}) satisfies Plugin;
```

**Prevention:**

- Keep plugin initialization fast (<100ms)
- Defer expensive operations to first use
- Use caching for repeated operations

---

## Quick Reference

### Common Hook Signatures

| Hook                  | Input              | Output                           | Purpose                  |
| --------------------- | ------------------ | -------------------------------- | ------------------------ |
| `config`              | `Config`           | N/A                              | React to config changes  |
| `event`               | `{ event: Event }` | N/A                              | Handle system events     |
| `tool`                | N/A                | `Record<string, ToolDefinition>` | Register custom tools    |
| `auth`                | N/A                | `AuthHook`                       | Configure authentication |
| `chat.message`        | Session info       | `{ message, parts }`             | Process new messages     |
| `chat.params`         | Model info         | `{ temperature, topP, options }` | Modify LLM params        |
| `permission.ask`      | `Permission`       | `{ status }`                     | Control permissions      |
| `tool.execute.before` | Tool info          | `{ args }`                       | Pre-process tool args    |
| `tool.execute.after`  | Tool info          | `{ title, output, metadata }`    | Post-process tool output |

---

### Shell Command Patterns

| Pattern            | Usage                                            |
| ------------------ | ------------------------------------------------ |
| Basic execution    | `` await $`command` ``                           |
| Get text output    | ``await $`command`.text()``                      |
| Parse JSON         | ``await $`command`.json()``                      |
| Line-by-line       | ``for await (const line of $`command`.lines())`` |
| Set working dir    | `` await $.cwd(path)`command` ``                 |
| Set environment    | `` await $.env({ VAR: 'value' })`command` ``     |
| Don't throw errors | `` await $.nothrow()`command` ``                 |
| Quiet output       | ``await $`command`.quiet()``                     |
| Brace expansion    | `$.braces('file{1,2,3}.txt')`                    |
| Escape user input  | `$.escape(userInput)`                            |

---

### Zod Schema Quick Reference

| Type     | Schema                                                            |
| -------- | ----------------------------------------------------------------- |
| String   | `tool.schema.string()`                                            |
| Number   | `tool.schema.number()`                                            |
| Boolean  | `tool.schema.boolean()`                                           |
| Enum     | `tool.schema.enum(['a', 'b', 'c'])`                               |
| Object   | `tool.schema.object({ key: tool.schema.string() })`               |
| Array    | `tool.schema.array(tool.schema.string())`                         |
| Optional | `tool.schema.string().optional()`                                 |
| Nullable | `tool.schema.string().nullable()`                                 |
| Default  | `tool.schema.string().default('value')`                           |
| Min/Max  | `tool.schema.number().min(0).max(100)`                            |
| Email    | `tool.schema.string().email()`                                    |
| URL      | `tool.schema.string().url()`                                      |
| Regex    | `tool.schema.string().regex(/pattern/)`                           |
| Record   | `tool.schema.record(tool.schema.string())`                        |
| Union    | `tool.schema.union([tool.schema.string(), tool.schema.number()])` |

---

## Package Information

- **Name:** `@opencode-ai/plugin`
- **Version:** 1.0.146
- **Type:** ESM Module
- **Dependencies:** `@opencode-ai/sdk@1.0.146`, `zod@4.1.8`

## Related Resources

- [OpenCode SDK Documentation](.opencode/knowledge-base/opencode/sdk-documentation.md)
- [Official OpenCode Documentation](https://opencode.ai/docs)
- [Zod Documentation](https://zod.dev)

---

**Last Updated:** 2025-12-12
