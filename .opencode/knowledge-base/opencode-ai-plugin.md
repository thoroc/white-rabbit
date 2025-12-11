# @opencode-ai/plugin — Project Plugin Guide

Overview

- Package: `@opencode-ai/plugin` (installed in this project).
- Purpose: Provides a lightweight framework for building OpenCode plugins that hook into OpenCode events and register custom tools or protections. Plugins run inside the OpenCode environment and receive a context object with helpers for interacting with the project and runtime.

Installed version in this repo

- Declared dependency: `@opencode-ai/plugin` ^1.0.146 (see workspace `package.json`).

Where plugins live

- Project-level plugins: `.opencode/plugin/`
- Global plugins: `~/.config/opencode/plugin/`

Basic plugin structure

- Export an async function that receives a context object and returns an object of hooks and tools.
- Typical function signature:

```ts
import type { Plugin } from '@opencode-ai/plugin'

export const MyPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  // initialization
  return {
    // hook implementations, e.g.:
    // 'command.executed': async (ev) => { ... }
    // 'file.edited': async (ev) => { ... }
    // 'tool': { ... } to register custom tools
  };
};
```

Common hooks and capabilities

- Command events: `command.executed`
- File events: `file.edited`, `file.watcher.updated`
- Installation events: `installation.updated`
- LSP and diagnostics events: `lsp.client.diagnostics`, `lsp.updated`
- Session events: `session.created`, `session.updated`, etc.
- Tool lifecycle events: `tool.execute.before`, `tool.execute.after`

Security and best practices

- Review plugin source before enabling global plugins; plugins execute within the host environment and may run shell commands.
- Use `tool.execute.before` to protect sensitive files (e.g., block `.env` reads).
- Prefer minimal surface area: only register the hooks/tools you need.
- If a plugin must shell out or access network resources, document and gate those behaviors.

Quick checklist for creating a plugin

- Create file under `.opencode/plugin/<name>.ts` (this project uses Bun + TypeScript).
- Export an async function that returns hooks/tools.
- Keep initialization idempotent and fast.
- Use `project` and `client` helpers instead of arbitrary shell commands when possible.

Bun + TypeScript starter plugin (no custom tool registration)

- File path: `.opencode/plugin/bun-typescript-starter.ts`
- Purpose: Minimal, safe starter that demonstrates a TypeScript plugin running under Bun and registers a safety hook to prevent accidental `.env` file access.

Example (excerpt):

```ts
export const BunTypescriptStarter = async ({ project, client, $ }) => {
  return {
    "tool.execute.before": async (ev) => {
      // Defensive: block attempts to read files named .env
      try {
        const path = ev?.args?.[0] || ev?.file;
        if (typeof path === "string" && path.endsWith(".env")) {
          throw new Error("Access to .env blocked by plugin");
        }
      } catch (err) {
        throw err;
      }
    },
  };
};
```

Installed dependencies (from this repo `package.json`)

- `@opencode-ai/plugin` ^1.0.146
