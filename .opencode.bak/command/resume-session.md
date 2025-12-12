---
description: Resume an OpenCode session from a markdown summary file
type: command
category: Development
tags:
  - command
  - resume
  - session
  - opencode
  - markdown
version: 1.0.0
last_updated: 2025-11-19
---

Resume an OpenCode session using context from a previously generated session summary file.

## Find Available Session Summaries

List available session summary files in the `.sessions` directory:
!`ls -la .sessions/session-summary-*.md 2>/dev/null | head -10 || echo "No session summary files found in .sessions directory"`

## Select Summary File

If multiple summary files exist, you should ask the user which one to use, or use the most recent one by default.

Most recent summary file: !`ls -t .sessions/session-summary-*.md 2>/dev/null | head -1 || echo "none"`

## Load and Process Summary

1. **Read the summary file**: Load the content of the selected session summary file
2. **Parse the context**: Extract key information from the summary including:
   - Previous working directory and git status
   - Tasks that were completed
   - Current state of files and changes
   - Tools and technologies used
   - Key decisions and context
   - Next steps and TODOs

3. **Set up context**:
   - Verify current directory matches the summary (or note differences)
   - Check current git status: !`git status --porcelain 2>/dev/null || echo "Not a git repository"`
   - Compare current state with the summary to identify what has changed

4. **Present session context**: Provide a clear summary of:
   - What was accomplished in the previous session
   - Current state vs. previous state
   - Recommended next actions from the summary
   - Any discrepancies between expected and actual current state

## Instructions for Resume

After loading the context:

1. **Acknowledge the loaded session**: Confirm what session was loaded and key context
2. **Identify changes**: Note any differences between the summary and current state
3. **Suggest next steps**: Based on the "Next Steps" section from the summary
4. **Ask for direction**: Ask the user what they'd like to work on next

## Usage

To use this command:

1. Run `/resume-session`
2. If multiple summaries exist, specify which one: `/resume-session .sessions/session-summary-YYYY-MM-DD-HHMMSS.md`
3. The assistant will load the context and help you continue where you left off

This command helps maintain continuity across OpenCode sessions by preserving and restoring the working context.
