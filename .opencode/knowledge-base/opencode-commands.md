# OpenCode Commands — Summary for LLM Agents

Purpose: concise reference for LLM agents that will create, invoke, or design OpenCode custom commands. Focuses on where commands live, how they're configured, how prompts use placeholders, and options/subtask behavior.

## What commands are

- Commands are user-defined shortcuts invoked in the TUI with a leading `/` (e.g., `/test`).
- They let you run a predefined prompt/template against the current project, optionally with arguments, shell output, and file content injected.
- Commands complement built-in commands like `/init`, `/undo`, `/redo`, `/share`, `/help` and can override them.

## Where to define commands

- Project-level markdown: `.opencode/command/<name>.md`
- Global markdown: `~/.config/opencode/command/<name>.md`
- JSON config: `opencode.json` under the top-level `command` key.

Example project markdown (creates `/test`):

```
---
description: Run tests with coverage
agent: build
model: anthropic/claude-3-5-sonnet-20241022
---
Run the full test suite with coverage report and show any failures. Focus on the failing tests and suggest fixes.
```

Example JSON command:

```
{ "command": { "test": { "template": "Run the full test suite with coverage...", "description": "Run tests with coverage", "agent": "build" } } }
```

## Prompt placeholders and helpers (important for LLMs)

- `$ARGUMENTS` → all arguments passed after the command.
- `$1`, `$2`, `$3`, ... → positional arguments.
- `!`backtick`command` → injects shell output (run from project root) into the prompt. Use for dynamic context like `!`npm test`` or `!`git log --oneline -10``.
- `@path/to/file` → injects the content of a project file directly into the prompt.

Use these to build contextual, reproducible prompts that combine repo state, command output, and user inputs.

## Key options to set

- `template` (required in JSON): the LLM prompt sent when the command runs.
- `description`: short description shown in the TUI (helpful for users and UIs).
- `agent`: optional — specify which agent should execute the command (e.g., `build`, `plan`). If omitted, the current agent runs it.
- `subtask` (boolean): when `true`, force the command to run as a subagent (isolates the context from the primary session).
- `model`: optional per-command model override.

## Agent / subtask interactions (guidance for LLMs)

- If `agent` points to a subagent, the command triggers that subagent automatically. This is useful for focused tasks (e.g., `plan` for read-only analysis).
- `subtask: true` forces a subagent invocation even if the referenced agent is primary — useful to avoid polluting the main conversation.
- Pick `agent` and `subtask` intentionally: use `build` for file edits and bash, `plan` for safe analysis.

## Practical patterns (recommended for agents)

- Use positional args (`$1`, `$2`) for structured inputs and `$ARGUMENTS` for free-form user text.
- Combine `!` shell-output injection with `@` file references to give the LLM exact, up-to-date project context.
- Keep `template` focused and deterministic for reproducible results; set a low `temperature` on the invoking agent when running code-oriented commands.
- Use `subtask: true` for long-running analysis or when you want the command result in an isolated session.

## Safety and UX

- Avoid embedding secrets in shell commands or files; the prompt will include any referenced outputs and files.
- Commands can override built-ins — be explicit and careful when naming custom commands.
- Provide clear `description` text so users choose the correct command from the TUI.

## Built-in commands

- OpenCode ships with `/init`, `/undo`, `/redo`, `/share`, `/help`, etc. Custom commands can override these names.

## Quick reference (LLM checklist)

- Define command file: `.opencode/command/<name>.md` or add to `opencode.json`.
- Use `$ARGUMENTS`, `$1`, `!`shell`` and `@file` to craft rich prompts.
- Set `agent` and `subtask` to control execution context and permissions.
- Prefer low temperature and targeted templates for code tasks; use higher creativity for brainstorming commands.

---

File: `.opencode/knowledge-base/opencode-commands.md`
Generated: summary targeted to LLM agents with examples and practical guidance.
