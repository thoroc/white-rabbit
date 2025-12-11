opencode commit tool

Usage:

- `opencode-commit "your commit message"` — stages all changes and creates a commit with the given message.
- If no message is provided, a default message will be used.

Requirements:

- This project uses Bun + TypeScript. The script runs under the `bun` runtime (shebang: `#!/usr/bin/env bun`). Ensure `bun` is installed and available in your `PATH`.

Behavior:

- `status` runs `git status --porcelain` and prints changed files in porcelain format. If there are no changes, the command exits `0` and prints nothing.
- `commit` runs `git add --all`, then checks for staged files (`git diff --cached --name-only`). If no files are staged, it prints `No changes to commit.` and exits `0`. Otherwise it runs `git commit -m "..."` and surfaces any git errors or hook failures.

Notes:

- The tool stages all changes before committing. Hooks (pre-commit, commit-msg) will run as normal and may cause `git commit` to fail — those errors are surfaced to the user.
- The script requires Bun / TypeScript as a project cardinal rule; do not change the shebang unless you intend to run under another runtime.
