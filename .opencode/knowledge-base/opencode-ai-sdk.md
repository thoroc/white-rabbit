@opencode-ai/sdk — Reference & Cookbook

Overview

- The `@opencode-ai/sdk` is the official OpenCode SDK for programmatic interactions with OpenCode services from Node.js and Deno projects.
- It exposes a typed client, helpers for working with projects, sessions, plugins, tools, files, events, and authentication utilities.

Quick install

- npm: `npm install @opencode-ai/sdk`
- pnpm: `pnpm add @opencode-ai/sdk`

Core Concepts

- Client: the primary entrypoint used to call OpenCode APIs.
- Namespaces: common surfaces exposed on the client include `projects`, `sessions`, `plugins`, `tools`, `files`, `events`, and `todos`.
- Auth: token-based authentication (environment variables or explicit token arguments).
- Types: the SDK is authored in TypeScript and exports rich typings for requests, responses, and plugin hooks.

Creating a client

- The SDK provides a factory for creating an authenticated client. Example:

```ts
import { createOpenCodeClient } from "@opencode-ai/sdk";

const client = createOpenCodeClient({
  token: process.env.OPENCODE_API_TOKEN,
  baseUrl: process.env.OPENCODE_API_URL, // optional override
});
```

Authentication

- Use environment variables for long-lived tokens: `OPENCODE_API_TOKEN`.
- For short-lived or per-request tokens, pass `token` into `createOpenCodeClient` or the per-call options object.
- Follow least-privilege practices: request only the scopes you need for plugins or automation.

Core API surface (illustrative / commonly used methods)

- Projects
  - `client.projects.list(opts?)` → list accessible projects
  - `client.projects.get(projectId)` → get project metadata
  - `client.projects.create(payload)` → create a new project

- Sessions
  - `client.sessions.create(projectId, options?)` → create an interactive session
  - `client.sessions.sendMessage(sessionId, { role: 'user'|'assistant'|'system', content })` → send a message
  - `client.sessions.history(sessionId)` → fetch message history

- Plugins
  - `client.plugins.register(projectId, pluginManifest)` → register a plugin
  - `client.plugins.list(projectId)` → list registered plugins
  - `client.plugins.unregister(projectId, pluginId)` → remove plugin

- Tools / Commands
  - `client.tools.execute(projectId, toolName, args)` → invoke a named tool (runs in project context)
  - `client.tools.list(projectId)` → list available tools

- Files
  - `client.files.upload(projectId, path, content|stream)` → upload or overwrite a file
  - `client.files.get(projectId, path)` → download a file
  - `client.files.list(projectId, opts?)` → enumerate files

- Events
  - `client.events.subscribe(projectId, eventName, handler)` → subscribe to project events (webhooks)
  - `client.events.emit(projectId, eventName, payload)` → emit an event programmatically

- Todos / Tasking
  - `client.todos.create(projectId, { title, description })` → create a todo
  - `client.todos.list(projectId)` → list todos

Error handling and retries

- Most SDK methods throw structured errors with status codes and a `code` property. Wrap calls in try/catch and implement retries for idempotent operations (uploads, emits).

TypeScript typing examples

- Use exported types for strong checks:

```ts
import { createOpenCodeClient, OpenCodeError } from "@opencode-ai/sdk";

const client = createOpenCodeClient({ token: process.env.OPENCODE_API_TOKEN });

try {
  const projects = await client.projects.list();
  projects.forEach((p) => console.log(p.id, p.name));
} catch (err) {
  if (err instanceof OpenCodeError) {
    console.error("API error", err.code, err.status);
  } else throw err;
}
```

API Cookbook — Practical Recipes

Recipe 1 — List projects (CLI helper)

```ts
import { createOpenCodeClient } from "@opencode-ai/sdk";

async function main() {
  const client = createOpenCodeClient({
    token: process.env.OPENCODE_API_TOKEN,
  });
  const projects = await client.projects.list();
  for (const p of projects) console.log(`${p.id}\t${p.name}`);
}
```

Recipe 2 — Scaffold a plugin (project-level plugin)

- Create a file `./.opencode/plugin/my-plugin.ts` with the following:

```ts
import type { Plugin } from "@opencode-ai/plugin";

export const MyPlugin: Plugin = async ({
  project,
  client,
  $,
  directory,
  worktree,
}) => {
  // Initialization
  console.log("MyPlugin initialized for", project.id);

  return {
    // Hook into file edits or commands
    "command.executed": async (payload) => {
      // react to commands
    },
  };
};
```

- Register the plugin via the SDK or project UI:

```ts
await client.plugins.register(projectId, {
  name: "my-plugin",
  entry: ".opencode/plugin/my-plugin.ts",
});
```

Recipe 3 — Create an interactive session and send messages

```ts
const session = await client.sessions.create(projectId, {
  model: "gpt-like",
  name: "dev-help",
});
await client.sessions.sendMessage(session.id, {
  role: "user",
  content: "Run tests and report failures",
});
const history = await client.sessions.history(session.id);
console.log(history.map((m) => m.content).join("\n---\n"));
```

Recipe 4 — Execute a named tool (run tests or linters)

```ts
const result = await client.tools.execute(projectId, "run-tests", {
  args: ["--watch", "false"],
});
console.log("Tool output:", result.stdout);
if (result.exitCode !== 0) throw new Error("Tests failed");
```

Recipe 5 — Subscribe to project events (webhook-style)

- Polling/subscription example using an SDK helper or webhook endpoint registration:

```ts
await client.events.subscribe(projectId, "file.edited", async (payload) => {
  console.log("File edited:", payload.path, "by", payload.author);
  // react, trigger CI, or open a todo
});
```

Recipe 6 — Upload a file to the project

```ts
const content = Buffer.from('console.log("hello")');
await client.files.upload(projectId, "src/hello.js", content);
```

Repository installed dependencies (current)

- The repository's current dependency list (from `package.json`) contains:
  - `@opencode-ai/plugin`: `1.0.146` (`.opencode/package.json:1`)

Best practices & tips

- Keep the client creation centralized (single factory) so tokens and baseUrl overrides are easy to manage.
- Use TypeScript types exported by the SDK for plugin manifests and hook implementations.
- Protect API tokens in CI and local environments using secrets managers or environment variables.
- When writing plugins, prefer event-driven handlers that do small, testable units of work.

References & further reading

- Official SDK docs and API reference (link to the SDK repo/docs)
- `@opencode-ai/plugin` — helper types and runtime for plugin development (`.opencode/plugin` patterns)
