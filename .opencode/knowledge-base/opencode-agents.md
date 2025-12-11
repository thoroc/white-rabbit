# OpenCode Agents — Summary for LLM Agents

Purpose: a concise, actionable reference for LLM-based agents working with OpenCode. Focus is on how agents are typed, configured, and used, plus best-practices and example configs an LLM should follow when acting as or designing agents.

## Key Concepts

- Agents are specialized AI assistants configured for specific tasks and workflows.
- Two agent types:
  - Primary agents: the main assistants you interact with (e.g., `build`, `plan`).
  - Subagents: invoked by primary agents or manually via `@name` (e.g., `general`, `explore`).
- Agents control model, prompt, tools, permissions, and iteration behavior (agentic steps).

## Built-in Agents

- `build` (primary): default full-access agent. Typical for implementing changes and running tools (file edits, bash, etc.).
- `plan` (primary): restricted planning/analysis agent. Defaults to asking before running `file edits` and `bash` — suitable for suggesting changes without making them.
- `general` (subagent): general-purpose helper for research, searching, and multi-step tasks.
- `explore` (subagent): fast codebase exploration (file/keyword search) optimized for quick discovery.

## How Agents Are Used

- Switch primary agents with `Tab` or configured `switch_agent` keybind.
- Invoke subagents automatically or manually with `@agent-name` in chat (e.g., `@general find the function foo`).
- Subagents may create child sessions; navigate sessions via configured keybinds (child cycle commands).

## Configuration Formats

- JSON: `opencode.json` top-level `agent` block.
- Markdown: per-agent files in `~/.config/opencode/agent/` (global) or `.opencode/agent/` (project). The filename (without extension) becomes the agent name.

Example JSON snippet (minimal):

```
{
  "agent": {
    "build": {
      "mode": "primary",
      "model": "anthropic/claude-sonnet-4-20250514",
      "prompt": "{file:./prompts/build.txt}",
      "tools": { "write": true, "edit": true, "bash": true }
    },
    "plan": {
      "mode": "primary",
      "model": "anthropic/claude-haiku-4-20250514",
      "tools": { "write": false, "edit": false, "bash": false }
    }
  }
}
```

Example Markdown agent (project-level `.opencode/agent/review.md`):

```
---
description: Reviews code for best practices and potential issues
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
---
You are in code review mode. Focus on:
- Code quality and best practices
- Potential bugs and edge cases
- Performance implications
- Security considerations
```

## Important Options (what LLM agents should care about)

- `description` (required): one-line description of agent purpose.
- `temperature`: controls response creativity; recommended ranges:
  - 0.0–0.2 for deterministic code analysis/planning
  - 0.3–0.5 for balanced development tasks
  - 0.6–1.0 for brainstorming/creative tasks
- `maxSteps`: limits agentic iterations; useful for cost control and forcing summarized outputs when reached.
- `disable`: set to `true` to disable the agent.
- `prompt`: custom system prompt file path (relative to config file).
- `model`: override the default model for task-specific needs (fast vs high-capability).
- `tools`: enable/disable tools (e.g., `write`, `edit`, `bash`) per-agent. Agent-level config overrides global tools.
- `permissions`: granular control for `edit`, `bash`, `webfetch` with `ask` / `allow` / `deny`. `bash` rules may use glob patterns for specific commands.
- `mode`: `primary`, `subagent`, or `all` — determines where the agent can be used.
- `additional`: provider-specific model options are passed through (e.g., `reasoningEffort`, `textVerbosity`).

## Permissions and Safety Guidelines

- Use `permission` to require `ask` for destructive capabilities by default (edits, shell commands, web fetch).
- Prefer `deny` for high-risk abilities on review or audit agents.
- For `plan` agents, default `ask` for edits and bash is recommended so the agent suggests changes but does not apply them.
- Use command-level `bash` permissions (e.g., `"git push": "ask"` or `"git *": "ask"`) to allow safe commands while gating risky ones.

## Best Practices for LLM Agents (operational guidance)

- Keep agent prompts focused and provide task-specific instructions in `prompt` files.
- Set `temperature` low for analysis and code-writing agents to avoid hallucinations.
- Use `maxSteps` to bound agentic action loops and force progress summaries.
- Disable write/edit for agents meant only to analyze or review.
- Limit tool access to the minimum required for the agent’s purpose (principle of least privilege).
- Provide clear `description` so users and UIs can choose the right agent.
- When designing a multi-step workflow, use subagents for specialized work (search, exploration, auditing).

## Common Use Cases

- Build agent: full development (edits, bash, file writes).
- Plan agent: architecture or change planning with read-only analysis.
- Review agent: static review and suggestions, no direct edits.
- Debug agent: investigative tasks with read and selective bash access.
- Docs agent: documentation authoring with file operations but no system commands.

## Examples LLM Agents Should Know

- Documentation writer (subagent): `tools.bash=false` — focus on content and file writes.
- Security auditor (subagent): `tools.write=false` and `tools.edit=false` — focus on identifying vulnerabilities and reporting.

## How to Create Agents (CLI)

- Run `opencode agent create` — interactive flow to scaffold an agent file (global or project).
- Typical flow collects: target location, description, sample prompt, and tool permissions.

## Quick Reference (for an LLM using or designing agents)

- Switch to `plan` for read-only analysis and ask before edits.
- Use `build` when you need the agent to perform edits and run commands.
- Invoke `@explore` or `@general` for fast search/exploration tasks.
- Configure `permission` per-agent to enforce safety (`ask`/`deny`/`allow`).
- Use low `temperature` and `maxSteps` for deterministic, cost-controlled behavior.

---

File: `.opencode/knowledge-base/opencode-agents.md`
Generated: summary targeted to LLM agents with examples and operational guidance.
