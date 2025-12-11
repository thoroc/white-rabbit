# OpenCode Tools — Summary for LLM Agents

Purpose: a concise, agent-focused reference describing the built-in tools OpenCode exposes, how to enable/disable them, agent-level overrides, permissions, custom tools, and operational notes an LLM should follow when using tools.

## Overview

- Tools let agents interact with the codebase and environment (read files, run shell commands, modify files, search, fetch web content, etc.).
- By default, all tools are enabled; you can disable them globally or per-agent via config.
- Agents inherit global tool settings but can override them with agent-specific `tools` config.

## Configure tools

- Global: set the `tools` block in `opencode.json` to enable/disable tools project-wide.
- Per-agent: set `agent.<name>.tools` to override globals for that agent.
- Use wildcards to control groups (e.g., `mymcp_*: false`).

Example to disable dangerous tools globally:

```
{ "tools": { "write": false, "bash": false, "webfetch": true } }
```

Example to make `plan` agent read-only:

```
{ "agent": { "plan": { "tools": { "write": false, "bash": false } } } }
```

## Built-in tools (what each does)

- `bash`: run shell commands in project root (e.g., `git status`, `npm test`). Powerful; gate with permissions.
- `edit`: perform exact string replacements in files (primary edit tool). Requires precise matches and careful usage.
- `write`: create or overwrite files. Use when scaffolding or creating new files.
- `read`: read file contents (supports line ranges) — safe and commonly used.
- `grep`: search file contents using regex — fast, supports file filters.
- `glob`: find files using glob patterns (returns paths sorted by modification time).
- `list`: list directory contents; accepts globs.
- `patch`: apply patch/diff files to codebase.
- `todowrite`: manage todo lists during sessions (create/update). Disabled for subagents by default.
- `todoread`: read existing todo lists. Disabled for subagents by default.
- `webfetch`: fetch web content (HTML/markdown) for research or external references.

## Custom tools & MCP servers

- Custom tools: define functions in config that the agent can call to extend behavior (e.g., run a test harness, call an internal API).
- MCP servers: integrate external services and tools via the Model Context Protocol — useful for databases, APIs, and third-party tooling.
- Use wildcards in `tools` to enable/disable entire MCP tool namespaces.

## Permissions & Safety (practical advice for LLMs)

- Tools are powerful and can be destructive (`write`, `edit`, `bash`). Prefer `ask`/`deny` policies for sensitive capabilities in agent configs.
- Agent-level `tools` config plus `permission` rules give fine-grained control (see `/docs/permissions`).
- For review or audit agents, disable `write` and `edit` and keep `bash` off unless explicitly needed.
- Use `bash` only when necessary; prefer `read`, `grep`, and `glob` for non-destructive inspection.

## Internals & ignore behavior

- `grep`, `glob`, and `list` use `ripgrep` which respects `.gitignore` by default.
- To override ignores and include normally-ignored files, add a `.ignore` file in project root with explicit `!` allow rules (e.g., `!node_modules/`).

## Operational patterns (recommendations for LLM agents)

- Principle of least privilege: request only the tools needed for the task.
- Read first: use `read`, `grep`, and `glob` to gather context before running edits or bash commands.
- When editing, prefer `edit` for targeted changes and `write` for new files. Ensure exact-match context for `edit` operations.
- Use `todowrite` to track multi-step tasks and mark progress (`in_progress` / `completed`).
- Use `webfetch` sparingly and prefer local files for authoritative context.
- When working with MCP or custom tools, ensure agent config permits the relevant tool namespace.

## Quick reference (LLM checklist)

- Check `opencode.json` and agent configs for enabled/disabled tools and permissions.
- Use `read`/`grep`/`glob` before `edit`/`write`/`bash`.
- Request `ask` permission for risky commands in `bash` or for edits when designing a `plan` agent.
- Remember `todowrite` is disabled for subagents by default — enable if planning multi-step changes.
- Be aware of `.gitignore` and use `.ignore` to surface hidden files when needed.

---

File: `.opencode/knowledge-base/opencode-tools.md`
Generated: summary targeted to LLM agents with configuration examples, descriptions, and safe usage patterns.
