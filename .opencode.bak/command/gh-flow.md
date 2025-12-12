---
description: Create branch, commit, push, create PR, and merge in one workflow
agent: general
type: command
category: Development
tags:
  - command
  - flow
  - create
  - branch,
version: 1.0.0
last_updated: 2025-11-19
---

You are tasked with executing a complete GitHub workflow: create a new branch, commit changes, push to origin, create a
pull request, and merge it.

## Current Repository Status

!`git status --porcelain`

## Current Branch

!`git branch --show-current`

## Repository Information

!`git remote get-url origin`

## Workflow Steps

Execute the following GitHub workflow with the branch name: **$ARGUMENTS**

If no branch name is provided, generate a descriptive branch name based on the changes detected in git status.

### Step 1: Create New Branch

Create a new branch from the current branch:

- Branch name: `$ARGUMENTS` (or auto-generated if not provided)
- Command: `git checkout -b <branch-name>`

### Step 2: Stage and Commit Changes

Stage all changes and create a conventional commit:

- Review the changes shown in git status above
- Follow conventions from @../data/conventional-commits.md
- Create an appropriate conventional commit message (feat:, fix:, docs:, etc.)
- Stage changes: `git add .`
- Commit: `git commit -m "<conventional-message>"`

### Step 3: Push to Origin

Push the new branch to origin:

- Command: `git push -u origin <branch-name>`

### Step 4: Create Pull Request

Create a pull request using GitHub CLI:

- Check if `gh` CLI is available: `which gh`
- If available, create PR: `gh pr create --title "<title>" --body "<description>" --base main`
- Title should be the commit message
- Body should include:
  - Summary of changes
  - Related issues (if any)
  - Testing notes
- If `gh` CLI is not available, provide instructions for creating PR manually via GitHub web interface

### Step 5: Merge Pull Request

Merge the pull request:

- If using `gh` CLI: `gh pr merge --merge --delete-branch`
- If manual, provide instructions:
  1. Navigate to the PR URL
  2. Review the changes
  3. Click "Merge pull request"
  4. Confirm merge
  5. Delete the branch

## Safety Checks

**IMPORTANT**: Use the comprehensive GitHub workflow safety checklist before executing.

**SAFETY CHECKLIST REFERENCE**: `.opencode/checklist/github-workflow-safety.md`

- Load this checklist for complete safety validation (26+ critical checks)
- Validates repository state, remote config, GitHub CLI auth, and permissions
- Includes pre-flight checks, stop conditions, and error recovery
- Must verify ALL safety checks before executing workflow

### Quick Safety Summary

Before executing, verify these critical items (full checklist in referenced file):

- [ ] **Working directory clean**: Only intended changes present
- [ ] **Current branch correct**: Branching from main/master
- [ ] **Remote configured**: Origin points to correct repository
- [ ] **Push permissions verified**: User can push to repository
- [ ] **GitHub CLI authenticated**: `gh auth status` succeeds
- [ ] **No stop conditions**: No blocking issues present

**If ANY check fails**: Stop workflow, consult full safety checklist, resolve issues before proceeding.

## Error Handling

If any step fails:

1. Report the specific error
2. Show the current state (which steps completed)
3. Provide recovery instructions
4. Do not proceed to next steps if a critical step fails

## Conventional Commit Format

Use conventional commit format for the commit message:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add user authentication module`

## GitHub CLI Authentication

If `gh` CLI is not authenticated, provide instructions:

```bash
gh auth login
```

Follow the prompts to authenticate with GitHub.

## Notes

- This command assumes you have appropriate permissions for the repository
- The merge step will only succeed if PR checks pass (if configured)
- Consider using `--squash` or `--rebase` merge strategies if preferred
- The `--delete-branch` flag automatically cleans up the branch after merge

## Alternative: Manual Workflow

If you prefer to execute steps manually or if automation fails, here's the manual workflow:

1. **Create branch**: `git checkout -b <branch-name>`
2. **Commit changes**: `git add . && git commit -m "<message>"`
3. **Push**: `git push -u origin <branch-name>`
4. **Create PR**: Visit GitHub repository and click "New Pull Request"
5. **Merge PR**: Review and merge via GitHub web interface
