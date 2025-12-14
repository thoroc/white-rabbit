---
description: Instruct the agent to limit all work to a specific directory
type: command
category: Development
tags:
    - command
    - limit
    - scope
    - instruct
    - agent
version: 1.0.0
last_updated: 2025-11-19
---

Limit the agent's session scope so the agent considers and operates only on files
under a single directory. This command sets a hard boundary for the session: the
agent MUST NOT read, list, edit, or consider files outside the specified directory.

Usage

- Invocation: `/limit-scope <directory-path>`
- Example: `/limit-scope ./foo` (where `foo` is a directory under the current working directory)

Behavior

1. Resolve the provided $ARGUMENTS to an absolute, canonical path (expand `~`, resolve `.` and `..`).
2. Validate the path:
    - It must exist and be a directory.
    - It must be inside the current user's home directory. Valid if equal to `$HOME` or begins with `$HOME/`.
    - It must NOT be `/` or any path outside the user's home directory.
3. If validation fails, respond with a clear error message and do NOT change scope.
4. If validation succeeds, the agent MUST restrict all future file operations to the given directory and its descendants.
5. After successfully setting the scope, the agent MUST output the following exact acknowledgment (replace $ARGUMENTS with the resolved absolute path):

    ACKNOLEDGED - I will be working only on <directory-path>

Notes and safety constraints

- DO NOT UNDER ANY CIRCUMSTANCE point the scope to `/` or to a directory outside the current user's `HOME` directory.
- If the user supplies a path that normalizes outside `$HOME`, reject it and explain why.
- If the user later asks the agent to access files outside the set scope, the agent must refuse and ask the user to change the scope explicitly.

Validation examples (for implementers)

- Shell-style validation (conceptual):
    - Resolve: `realpath --canonicalize-existing "<path>"` or use language builtins to expand and canonicalize.
    - Check directory: `[ -d "<resolved>" ]`
    - Check containment: `case "$resolved" in "$HOME"|"$HOME"/*) ;; *) invalid ;; esac`

Example session

- User: `/limit-scope ./foo`
- Agent (on success): `ACKNOLEDGED - I will be working only on /Users/alice/projects/repo/foo`
- From that point, the agent will ignore files outside `/Users/alice/projects/repo/foo` and will prompt the user to change scope for any out-of-scope requests.

Implementation guidance

- This file is a command specification — implementers should enforce the containment check in the runtime that handles commands, and ensure the session's file-access layer respects the chosen scope.
- If the runtime has a dry-run or preview mode, the scope command should still validate but not change file-access policies until a real session is active.
