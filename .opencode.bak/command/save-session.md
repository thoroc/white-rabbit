---
description: Save a markdown summary of the current OpenCode session
type: command
category: Development
tags:
    - command
    - save
    - session
    - markdown
    - summary
version: 1.0.0
last_updated: 2025-11-19
---

Save a comprehensive markdown summary of the current OpenCode session to a file.

The summary should include:

## Session Summary Structure

1. **Session Overview**
    - Date and time of session
    - Working directory: !`pwd`
    - Git repository status (if applicable): !`git status --porcelain 2>/dev/null || echo "Not a git repository"`

2. **Tasks Completed**
    - List all major tasks and actions performed
    - Include any code changes, file modifications, or configurations updated
    - Note any commands executed and their outcomes

3. **Current State**
    - Files that were created, modified, or deleted
    - Current git status and any uncommitted changes
    - Any ongoing work or incomplete tasks

4. **Tools and Technologies Used**
    - Programming languages, frameworks, or tools involved
    - Dependencies added or removed
    - Configuration files modified

5. **Key Decisions and Context**
    - Important architectural or design decisions made
    - Rationale behind specific implementation choices
    - Any challenges encountered and how they were resolved

6. **Next Steps**
    - Recommended follow-up actions
    - Areas that may need attention in future sessions
    - Any TODOs or pending items

## Save Location

Create the `.sessions` directory if it doesn't exist and save the summary there:

- Directory: `.sessions/` (create if needed): !`mkdir -p .sessions`
- Filename format: `session-summary-YYYY-MM-DD-HHMMSS.md`
- Current timestamp: !`date +"%Y-%m-%d-%H%M%S"`

Generate the complete markdown content and save it to: `.sessions/session-summary-[TIMESTAMP].md` where [TIMESTAMP] is !`date +"%Y-%m-%d-%H%M%S"`

Make the summary detailed enough that someone (including yourself) could understand the context and continue the work
effectively in a future session.
