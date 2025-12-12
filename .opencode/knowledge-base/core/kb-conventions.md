# Knowledge‑base filename conventions

## Purpose

- Record project policy for naming knowledge-base files so agents and contributors follow a consistent pattern.

## Rule

- All new knowledge-base filenames must be lowercase and use kebab-case (dash-separated). Examples:
  - `conventional-commits.md`
  - `opencode-agents.md`
  - `tool-usage.md`

## Why

- Lowercase kebab-case improves cross-platform compatibility and keeps filenames predictable for tooling and agents.

## Enforcement

- Agents that create or validate knowledge-base items must:
  - Reject or suggest a corrected filename if the provided name is not lowercase kebab-case.
  - Offer an auto-converted filename suggestion when possible (e.g., `CONVENTIONAL_COMMITS.md` → `conventional-commits.md`).
  - Update existing references to use the new kebab-cased filenames when renames are performed.

## Notes

- This rule applies to newly created KB files; existing files may be migrated separately if desired.
