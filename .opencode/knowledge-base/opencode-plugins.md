# OpenCode Plugins — Summary for LLM Agents

Purpose: concise reference for LLM agents that need to understand OpenCode plugin capabilities, structure, events, and how plugins can add custom tools or enforce safety.

## What plugins are

- Plugins are JavaScript/TypeScript modules that extend OpenCode by hooking into events and adding features (notifications, protections, custom tools, integrations).
- Plugins run in your environment and receive a context object to interact with the project and OpenCode SDK.

## Where to place plugins

- Project-level: `.opencode/plugin/` directory
- Global: `~/.config/opencode/plugin/`

The filename and exported functions are loaded as plugin entries.

## Basic structure

- Export an async function that receives `{ project, client, $, directory, worktree }` and returns hooks.
- `project`, `directory`, `worktree`: project metadata and paths.
- `client`: Opencode SDK client for interacting with AI services.
- `$`: Bun shell API for running commands.

Example minimal plugin:

```
export const MyPlugin = async ({ project, client, $, directory, worktree }) => {
  console.log("Plugin initialized!")
  return {
    // Hook implementations
  }
}
```

## TypeScript support

- Import plugin types from `@opencode-ai/plugin` and type your exported plugin function as `Plugin` for type safety.

## Events you can hook

- Command events: `command.executed`
- File events: `file.edited`, `file.watcher.updated`
- Installation events: `installation.updated`
- LSP events: `lsp.client.diagnostics`, `lsp.updated`
- Message events: `message.*` variants (removed/updated/part.*)
- Permission events: `permission.*`
- Server events: `server.connected`
- Session events: `session.created`, `session.idle`, `session.updated`, `session.diff`, etc.
- Todo events: `todo.updated`
- Tool events: `tool.execute.before`, `tool.execute.after`
- TUI events: `tui.prompt.append`, `tui.command.execute`, `tui.toast.show`

Plugins can implement handlers keyed by event names in the returned hooks object.

## Examples & common uses

- Notifications: trigger OS notifications on `session.idle` or other events using `$` to run system commands.
- .env protection: intercept `tool.execute.before` and block reads of `.env` files to prevent leaks.
- Custom tools: define `tool` helpers that register new callable tools with typed args and an `execute` function.

Custom tool example (TypeScript):

```
export const CustomToolsPlugin: Plugin = async (ctx) => {
  return {
    tool: {
      mytool: tool({
        description: "This is a custom tool",
        args: { foo: tool.schema.string() },
        async execute(args, ctx) { return `Hello ${args.foo}!` }
      })
    }
  }
}
```

## Security & operational guidance for LLM agents

- Plugins execute code in the host environment — review plugins for safety before enabling.
- Use `.env` protection patterns or plugins to avoid accidental secret leakage.
- Prefer minimal, auditable plugins; avoid arbitrary remote code execution unless trusted.
- Leverage event hooks to enforce project policies (e.g., block certain file accesses or commands).

## Development workflow tips

- Test plugins in a safe environment before installing globally.
- Use TypeScript for better type safety when integrating with the SDK.
- Use `client` and `tool` helpers to interact with OpenCode features rather than shelling out when possible.

## Quick reference (LLM checklist)

- Plugin location: `.opencode/plugin/` or `~/.config/opencode/plugin/`.
- Entry point: export async function returning hooks.
- Use `tool.execute.before` to intercept and gate tool usage.
- Use `todo.updated` and `session.*` hooks to monitor agent activity.
- Register custom tools via the `tool` helper and Zod schemas for strong typing.

---

File: `.opencode/knowledge-base/opencode-plugins.md`
Generated: summary targeted to LLM agents with examples and safety guidance.
