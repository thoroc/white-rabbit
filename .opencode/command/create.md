---
description: Create an OpenCode `agent` or `command` document from instructions
agent: plan
subtask: true
---

Usage

- `$1`: document type — `agent` or `command`
- `$ARGUMENTS`: the instructions describing what the agent/command should achieve (aim/goal)

This command will:

1. Validate the provided instructions against the appropriate JSON Schema (`.opencode/schema/opencode/agent.schema.json` or `.opencode/schema/opencode/command.schema.json`).
2. Produce a ready-to-save document (agent markdown or command markdown) using the relevant template.
3. Output a single JSON object with `path` and `content` so tooling can write the file.

Schemas (injected):

- Agent schema: `@.opencode/schema/opencode/agent.schema.json`
- Command schema: `@.opencode/schema/opencode/command.schema.json`

Template (how the command runner should behave)

When invoked, follow these steps exactly:

1. Parse inputs:
    - `type = $1` (must be `agent` or `command`).
    - `instructions = $ARGUMENTS` (string describing what the agent/command should aim to achieve).

2. Build a minimal payload using the instructions. For example:
    - For `agent`: { "name": "<slugified-name>", "description": "Short description", "goal": "<instructions>", "mode": "primary" }
    - For `command`: { "name": "<slugified-name>", "description": "Short description", "agent": "build", "template": "<short prompt template>" }

3. Validate the payload against the chosen schema (injected above). If validation fails, return a clear error listing the schema violations.

4. If validation passes, render the document using the appropriate output template:

- Agent output template (YAML frontmatter file in `.opencode/agent/<name>.md`):

    ***

    description: "{{description}}"
    mode: {{mode}}
    agent: {{name}}

    ***

    # Goal

    {{goal}}

    # Suggested Tools / Permissions

    ```json
    {{tools}}
    ```

- Command output template (markdown file in `.opencode/command/<name>.md`):

    ***

    description: "{{description}}"
    agent: {{agent}}

    ***

    Usage: describe how to call the command and what `$1` and `$ARGUMENTS` mean.

    Template:

    ```
    {{template}}
    ```

5. Return a JSON object with the exact `path` where the file should be written and the `content` string for the file content. Example:

{
"path": ".opencode/agent/my-agent.md",
"content": "---\ndescription: \"...\"\n---\n# Goal\n..."
}

Example invocation

- `/create agent "Create an agent that reviews PRs and suggests labels"`
- `/create command "Create a command that runs tests and summarizes failures"`

Notes

- This command runs as a subagent (`subtask: true`) and should be executed via a plan-style subagent; it will not mandate a specific `model` in generated documents. Include a `model` field only if explicitly provided in the instructions or payload.
- The command validates payloads against the injected schemas but leaves `model` optional so generated agent documents stay portable.
- The generated `name` should be slugified (lowercase, dash-separated).
