---
description: Invoke centralized feature template to generate a feature specification
agent: feature
subtask: true
template_path: .opencode/template/feature-tmpl.yml
schema_path: .opencode/schema/feature.schema.json

# Validation
# After generating the markdown file from the template, run the opencode validator to ensure the frontmatter conforms to the schema:
# bun .opencode/tool/validate-doc.ts --schema .opencode/schema/feature.schema.json --file .context/features/<generated-file>.md
---

This command delegates feature-spec generation to the centralized YAML template at `.opencode/template/feature-tmpl.yml`.

Behavior:

- The agent must read the user's prompt from `$ARGUMENTS`, render the template, and produce a Markdown feature specification.
- Write the generated Markdown to `.context/features/<slug>.md` following the template's slug and overwrite rules.
- Do not overwrite existing files without explicit confirmation.

User prompt: $ARGUMENTS

## References & further reading

- Relevant knowledge-base:
    - `.opencode/knowledge-base/kb-conventions.md`
    - `.opencode/knowledge-base/opencode/template.md`

- Templates:
    - `.opencode/template/feature-tmpl.yml` — canonical feature output schema and filename rules
    - `.opencode/template/research-tmpl.yml` — researcher output schema (for background research used in features)
- Agent guidance:
    - `.opencode/agent/feature.md` — feature subagent behavior and filesystem rules
    - `.opencode/agent/researcher.md` — researcher subagent expectations when providing evidence
- Knowledge-base:
    - `.opencode/knowledge-base/knowledge-base-conventions.md` — filename conventions for KB items
    - `.opencode/knowledge-base/opencode-templates.md` — template authoring guidance
- Best practices for agents: include explicit `source_prompt` and provenance when external research informs a feature.
