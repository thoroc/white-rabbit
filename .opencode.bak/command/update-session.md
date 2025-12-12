---
description: Update an existing session summary with current findings and progress
type: command
category: Development
tags:
  - command
  - update
  - session
  - existing
  - summary
version: 1.0.0
last_updated: 2025-11-19
---

Update an existing session summary by comparing the current state with a previously saved session and merging the new
findings.

## Find Available Session Summaries

List available session summary files in the `.sessions` directory:
!`ls -la .sessions/session-summary-*.md 2>/dev/null | head -10 || echo "No session summary files found in .sessions directory"`

## Select Session to Update

Most recent summary file (default): !`ls -t .sessions/session-summary-*.md 2>/dev/null | head -1 || echo "none"`

If the user specifies a particular session file, use that one. Otherwise, use the most recent one.

## Current Session Context

Capture current session state:

### Current State

- Working directory: !`pwd`
- Current git status: !`git status --porcelain 2>/dev/null || echo "Not a git repository"`
- Recent git commits since last session: !`git log --oneline -5 2>/dev/null || echo "No git history"`
- Modified files: !`git diff --name-only HEAD 2>/dev/null || echo "No git changes"`

## Load and Compare Existing Session

1. **Read the existing session summary**: Load the content of the selected session file
2. **Compare states**: Identify what has changed since the last session:
   - New files created or modified
   - Git commits added
   - Tasks completed or progressed
   - New challenges encountered

## Update Process

1. **Preserve Original Context**: Keep the original session overview and initial context
2. **Append New Findings**: Add a new section with timestamp for this update
3. **Update Current State**: Refresh the current state section with latest information
4. **Merge Tasks**: Combine completed tasks from both sessions
5. **Update Next Steps**: Revise next steps based on current progress

## Updated Session Structure

The updated session should maintain the original structure but include:

### New Section: "Session Updates"

- **Update [Current Timestamp]**: !`date +"%Y-%m-%d %H:%M:%S"`
  - Progress made since last session
  - New tasks completed
  - Additional challenges encountered
  - New insights or decisions

### Updated Sections

- **Current State**: Refreshed with latest git status and file changes
- **Tasks Completed**: Merged list from original + new tasks
- **Next Steps**: Updated based on current progress

## Save Updated Session

1. **Backup original**: Create a backup of the original session file
2. **Save updated version**: Overwrite the original session file with updated content
3. **Confirm update**: Show summary of what was added/changed

## Usage Examples

1. Update most recent session: `/update-session`
2. Update specific session: `/update-session .sessions/session-summary-2024-01-15-143022.md`
3. The command will merge current findings with the existing session

## Instructions for Update

After identifying the session to update:

1. **Load existing session**: Read and parse the existing session summary
2. **Capture current state**: Get current git status, recent commits, and changes
3. **Identify differences**: Compare current state with the session's "Current State"
4. **Generate update**: Create comprehensive update section with new findings
5. **Merge content**: Combine original content with new findings
6. **Save updated session**: Write the updated session back to the same file
7. **Provide summary**: Show user what was updated and added

This command enables continuous session tracking across multiple opencode runs while maintaining a single, evolving
session record.
