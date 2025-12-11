---
description: Develop and enhance a user prompt into a feature specification and save it as markdown
agent: feature
subtask: true
---

Create a complete, implementation-ready feature specification from the user's prompt. The user's raw prompt appears as `$ARGUMENTS` in the template — treat it as the authoritative intent and respect it faithfully.

Instructions for the invoked subagent:

- Read the user prompt from `$ARGUMENTS` and produce a high-quality feature specification in Markdown.
- The spec must include (at minimum):
  - YAML metadata: `title`, `created_at` (ISO 8601), `slug`, `source_prompt` (the raw `$ARGUMENTS`).
  - Short summary and goals
  - Target users / personas
  - User stories
  - Acceptance criteria
  - Implementation plan with actionable tasks and rough time estimates
  - Technical considerations and files to change/create
  - Risks, shortcomings and mitigation suggestions
  - Suggested improvements and alternatives (while keeping original intent)
  - Estimated effort and milestones

- Name the output file using a kebab-case `slug` derived from a short title.
- After drafting the Markdown, write it to `.context/features/<slug>.md` using the project's write tool (ensure the file is UTF-8, UTF-8 safe filename, and does not overwrite existing files without confirmation unless explicitly asked).

- Keep the tone professional and use clear headings in the Markdown output.

User prompt: $ARGUMENTS
