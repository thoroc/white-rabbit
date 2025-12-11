# Template Tool

This CLI helps create and validate YAML-based templates with the `-tmpl.yml` suffix.

Commands:

- `template create <templateFile> [-d data.json|data.yml] [-o out.txt]` — render template
- `template validate [files...]` — validate templates against the Zod schema

This project targets Bun + TypeScript and uses `zod` for schema validation.
