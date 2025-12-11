Validate documents against a JSON Schema

This opencode tool validates either:

- YAML or JSON files, or
- Markdown files with YAML frontmatter (extracted from the top `---` block)

Usage:

`bun .opencode/tools/validate.ts --schema .opencode/schema/feature.schema.json --file path/to/doc.md`

This tool is intended to be used by commands and agents when creating or editing documents so outputs can be validated programmatically against canonical JSON Schemas stored under `.opencode/schema/`.
