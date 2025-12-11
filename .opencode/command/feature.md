---
description: Invoke centralized feature template to generate a feature specification
agent: feature
subtask: true
template_path: .opencode/template/feature-tmpl.yml
---

This command delegates feature-spec generation to the centralized YAML template at `.opencode/template/feature-tmpl.yml`.

Behavior:
- The agent must read the user's prompt from `$ARGUMENTS`, render the template, and produce a Markdown feature specification.
- Write the generated Markdown to `.context/features/<slug>.md` following the template's slug and overwrite rules.
- Do not overwrite existing files without explicit confirmation.

User prompt: $ARGUMENTS
