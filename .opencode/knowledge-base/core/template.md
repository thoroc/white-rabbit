# Creating Opencode Templates

This document explains how to create and structure opencode templates used by subagents. Store templates under `.opencode/template/` and name them with the `-tmpl.yml` suffix (for example: `feature-tmpl.yml`).

## Required top-level keys

- `template_version` (integer): template schema version.
- `description` (string): short human-friendly description.
- `agent` (string): the agent that will use the template, e.g., `feature`, `research`.
- `output_dir` (string): the output directory where rendered files should be saved (absolute or workspace-relative path).
- `filename_pattern` (string): a pattern describing rendered filenames (e.g., `{{slug}}.md` or `{{created_at | datetime('%Y%m%dT%H%M%S')}}_{{slug}}.md`).
- `required_fields` (list): names of required template fields used during rendering.
- `template` (literal block) OR structured `frontmatter` + `body`: the rendering skeleton.

## Template formats

- Simple markdown skeleton: include a `template: |` literal that contains the final markdown with `{{placeholders}}` for interpolation.
- Structured schema: use `frontmatter` and `body` keys to define data fields that will be serialized into a markdown file.

## Good practices

- Use placeholders like `{{title}}`, `{{created_at}}`, and `{{slug}}` in the frontmatter.
- Keep `template` renderable: prefer a markdown skeleton instead of large free-form instructions.
- Include `rendering_notes` or `instructions` for humans, but keep machine-facing keys consistent.
- Ensure the YAML is a single document (do not include a trailing `---`).
- Validate templates with a YAML parser before committing.

## Filename and slug rules

- Slugs should be kebab-case, lowercase, and safe for filenames.
- Limit slug length to 50 characters when practical.
- If a rendering would overwrite an existing file, the agent should avoid writing and instead return a conflict message unless explicit overwrite confirmation is provided.

## Example minimal header

```yaml
template_version: 1
description: 'Short description'
agent: feature
output_dir: .context/features
filename_pattern: '{{slug}}.md'
required_fields: [title, created_at, slug, source_prompt]
```
