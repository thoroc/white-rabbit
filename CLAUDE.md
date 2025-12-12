# Claude instructions

## Domain path convention

- The pure `opencode` related specs (domain=opencode) are to be under the path `*/opencode/*`. This include `agent`, `command`, `plugin` and `tool`.
- The `core` related specs (domain=core) are to be under the path `*/core/*`. This includes `checklist`, `knowledge-base`, `schema`, `template` and `task`.
- The `docs` related specs (domain=docs) are to be under the path `*/docs/*`. This includes tutorial, guide, faq, how-to and overview.
- the `dev` related specs (domain=dev) are to be under the path `*/dev/*`. This include instructions to write code, diagrams or manage project/issues
- The rest should be considered common (domain=common) and placed under the path `*/common/*`.
- Any file that is under one of the path above should not duplicate the domain name in its filename.

Keep any new specification files at 300 lines (+/-10%). This is not a hard limit, but a goal we aim for.

## Specification file convention

- References are important
- examples are NOT important
- cross reference to other specification files are important

## Git convention

- use conventional commit
- DO NOT ADD co-authoring with AI Assistant
