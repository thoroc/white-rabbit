This folder contains JSON Schemas and YAML templates used by opencode commands and agents.

- `schema/` holds canonical JSON Schema files (machine contract).
- `template/` holds human-editable YAML templates that authors may edit; these should be converted/validated against the corresponding JSON Schema before use.

Quick validation example:

1. Install dependencies: `npm install` (adds `ajv` and `js-yaml`).
2. Validate a document or markdown frontmatter against a schema:

    `node scripts/validate-doc.js --schema .opencode/schema/feature.schema.json --file path/to/doc.md`

Notes:

- The validator extracts YAML frontmatter from Markdown files if present, otherwise it will attempt to parse the whole file as YAML/JSON.
- For model-driven generation, include a compact JSON Schema snippet in prompts and always run server-side validation after generation.
