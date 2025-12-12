---
description: Invoke centralized feature template to generate a feature specification
agent: feature
subtask: true
template_path: .opencode/template/core/feature-tmpl.yml
schema_path: .opencode/schema/feature.schema.json

# Validation
# After generating the markdown file from the template, run the opencode validator to ensure the frontmatter conforms to the schema:
# bun .opencode/tool/validate-doc.ts --schema .opencode/schema/feature.schema.json --file .context/features/<generated-file>.md
---

This command delegates feature-spec generation to the centralized YAML template at `.opencode/template/core/feature-tmpl.yml`.

Behavior:

- The agent must read the user's prompt from `$ARGUMENTS`, render the template, and produce a Markdown feature specification.
- Write the generated Markdown to `.context/features/<slug>.md` following the template's slug and overwrite rules.
- Do not overwrite existing files without explicit confirmation.

Prompt Enhancement:

- If the user prompt is unclear, vague, or lacks specificity, consider using `/refine-prompt` to enhance it first
- The refined prompt will provide better structure and detail for generating a comprehensive feature specification
- See the Prompt Engineering section below for quality assessment and enhancement resources

User prompt: $ARGUMENTS

## References & further reading

### Core Resources

- Relevant knowledge-base:
    - `.opencode/knowledge-base/core/kb-conventions.md` — knowledge-base naming conventions
    - `.opencode/knowledge-base/core/template.md` — template authoring guidance

- Templates:
    - `.opencode/template/core/feature-tmpl.yml` — canonical feature output schema and filename rules
    - `.opencode/template/core/research-tmpl.yml` — researcher output schema (for background research used in features)

- Agent guidance:
    - `.opencode/agent/feature.md` — feature subagent behavior and filesystem rules
    - `.opencode/agent/researcher.md` — researcher subagent expectations when providing evidence

### Prompt Engineering Resources

- Commands:
    - `.opencode/command/refine-prompt.md` — enhance and refine prompts using structured methodology

- Agents:
    - `.opencode/agent/prompt-enhancer-expert.md` — multi-agent brainstorming for prompt enhancement (Mind Mapping, Six Hats, SCAMPER)

- Knowledge-base:
    - `.opencode/knowledge-base/core/prompt-engineering.md` — patterns, methodologies, and best practices for prompt design

- Templates:
    - `.opencode/template/core/prompt-evaluation-tmpl.yaml` — structured prompt quality assessment template

- Checklists:
    - `.opencode/checklist/core/prompt-quality.md` — comprehensive quality criteria for evaluating prompts

### Best Practices

- Include explicit `source_prompt` and provenance when external research informs a feature
- Use prompt enhancement resources when user prompts are vague or incomplete
- Apply prompt engineering patterns (role-based, few-shot, constrained generation) as appropriate
- Evaluate prompt quality before generating features to ensure comprehensive specifications
