# Conventional Commits — knowledge base (v1.0.0 summary)

## Purpose

- Short reference for the `git-specialist` subagent and contributors on how to craft commit messages that follow https://www.conventionalcommits.org/en/v1.0.0/

## Core format

- Commit message format: `type(scope?): subject`

    body

    footer

- `type` is REQUIRED and must be one of the allowed types (see list).
- `scope` is OPTIONAL (single token describing the area changed).
- `subject` is REQUIRED: short summary in imperative mood (50 characters recommended max).
- `body` is OPTIONAL: more detailed explanation; wrap at ~72 chars.
- `footer` is OPTIONAL: references to issues or breaking changes. Use `BREAKING CHANGE: <description>` for breaking changes.

## Allowed types (recommended)

- feat: a new feature
- fix: a bug fix
- docs: documentation only changes
- style: formatting, missing semi-colons, no code changes
- refactor: code change that neither fixes a bug nor adds a feature
- perf: a code change that improves performance
- test: adding missing tests or correcting existing tests
- build: changes that affect the build system or external dependencies
- ci: changes to CI configuration files and scripts
- chore: other changes that don't modify src or test files
- revert: reverts a previous commit; format: `revert: <subject>`

## Breaking changes

- Add `BREAKING CHANGE: ` in the footer or include `!` after the type/scope (e.g., `feat!: subject`) to indicate a breaking change.
- When present, clearly describe what breaks and migration steps.

### Examples

- `feat(parser): add support for arrays`
- `fix(auth): reject invalid tokens during login`
- `docs(readme): add usage examples for the CLI`
- `perf(core): reduce memory usage in query planner`
- `refactor(api): simplify request validation logic`
- `feat!: drop support for node 10 (BREAKING CHANGE: ...)`

## Validation (suggested)

- Basic validation regex (subject line): `^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^)]+\))?(!)?:\s.+`
    - This enforces allowed types, optional scope, optional `!` for breaking changes, colon, and a subject.
- Enforce subject length (recommend <= 50 chars) and body wrap at ~72 chars.

## How `git-specialist` will use this knowledge-base

- When the user requests a commit, the agent will prompt for: `type`, optional `scope`, `subject`, optional `body`, and optional `footer` (or accept a single full message that matches the format).
- The agent will validate the provided message against the rules above and suggest fixes if the message doesn't conform.
- For convenience, the agent can auto-generate a conventional message from changed files (summary + suggested type) but will always present the suggestion and ask for user confirmation before committing.
- The agent will refuse to perform commits that do not conform to conventional commits unless the user explicitly asks to bypass validation.

## References

- Official spec: https://www.conventionalcommits.org/en/v1.0.0/
- Conventional Commits cheat sheet: https://www.conventionalcommits.org/en/v1.0.0/#summary
