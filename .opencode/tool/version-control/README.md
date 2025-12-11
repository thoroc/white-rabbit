opencode commit tool

Usage:

- `opencode-commit "your commit message"` — stages all changes and creates a commit with the given message.
- If no message is provided, a default message will be used.

Notes:

- The tool runs `git add --all` then `git commit -m`.
- Exit codes mirror `git` behavior; if there are no changes to commit the tool exits successfully.
