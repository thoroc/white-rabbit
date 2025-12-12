---
description: Pre-commit validation checklist for Git operations covering staging, repository health, and publication readiness
type: checklist
category: Operations
version: 1.0.0
last_updated: 2025-12-03
reference: https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository
applies_to: [version-control, git-workflow, ci-cd]
tags: [git, checklist, pre-commit, validation, operations]
related_resources:
  - knowledge-base/knowledge-base-git-operations-reference.md
  - task/task-git-operations-execution.md
  - template/template-git-command-execution-report.md
---

# Git Pre-Commit Operations Checklist

Machine-readable checklist for validating Git repository state before committing and pushing. Each item includes a verification command.

---

## Pre-Commit: Staging Verification

Verify staged changes are intentional and complete.

- [ ] **Review staged changes:** Run `git diff --cached` and verify every line is intentional
  - **Failure case:** Debug code, temporary variables, or credential snippets staged
  - **Action:** `git reset HEAD <file>` to unstage; edit and restage with `git add -p`

- [ ] **Check for unintended files:** Run `git status` and verify no unexpected files appear
  - **Failure case:** Build artifacts, `.env` files, or IDE config committed
  - **Action:** Add to `.gitignore` and `git rm --cached <file>`

- [ ] **Verify staged additions only (no deletions):** Run `git diff --cached --name-status`
  - **Failure case:** Important files marked for deletion that should remain
  - **Action:** `git reset HEAD <file>` and verify intent

- [ ] **No whitespace-only changes:** Run `git diff --cached | grep '^+\s*$'` (should return empty)
  - **Failure case:** Formatting changes mixed with logic changes
  - **Action:** Either keep formatting changes intentional or reset and re-stage with `git add -p`

---

## Pre-Commit: Message and History

Verify commit message clarity and local history state.

- [ ] **Commit message is clear and actionable:** Draft message explains _what_ changed and _why_
  - **Failure case:** Message is vague: "fix stuff", "wip", "update"
  - **Example of good message:** "Fix null pointer in user authentication flow to handle missing session"

- [ ] **Related commits are not orphaned:** Run `git log --oneline HEAD~5..HEAD` and verify logical grouping
  - **Failure case:** Related changes split across multiple commits that should be one
  - **Action:** Consider squashing: `git rebase -i HEAD~5`

- [ ] **No WIP or TODO commits in history:** Run `git log --oneline | head -10` and verify no commits start with "wip", "todo", "temp"
  - **Failure case:** Incomplete work pushed
  - **Action:** Amend or rebase to clean up

- [ ] **Commit is not repeating recent work:** Run `git log --oneline origin/main..HEAD` and verify no duplicate fixes
  - **Failure case:** Same fix committed multiple times
  - **Action:** Verify upstream doesn't already have this fix; rebase to align

---

## Pre-Commit: Branch State

Verify local branch is in valid state for pushing.

- [ ] **Branch is up to date with remote:** Run `git fetch origin` then `git log --oneline HEAD..origin/<branch>`
  - **Failure case:** Remote has commits not in local branch (conflict risk)
  - **Action:** `git pull --no-rebase` (or `git merge origin/<branch>` if specific branch)

- [ ] **No conflicted state:** Run `git status` and verify no "both modified" entries
  - **Failure case:** Merge or rebase in progress with unresolved conflicts
  - **Action:** `git merge --abort` or `git rebase --abort` and restart

- [ ] **Branch name is descriptive:** Verify branch name follows pattern: `feature/<desc>`, `bugfix/<id>`, `hotfix/<version>`
  - **Failure case:** Branch named "main-v2", "temp-branch", or other vague names
  - **Action:** Rename: `git branch -m old-name new-name` and update remote: `git push origin --delete old-name` then `git push -u origin new-name`

- [ ] **No uncommitted changes remain:** Run `git status` and verify "nothing to commit, working tree clean"
  - **Failure case:** Unsaved files or untracked changes
  - **Action:** Stash: `git stash` or commit with `git add` and `git commit`

---

## Pre-Push: Remote Readiness

Final checks before pushing to remote.

- [ ] **Local commits are not duplicating remote:** Run `git log --oneline origin/<branch>..HEAD` and verify expected commits
  - **Failure case:** Multiple copies of same commit (rebase gone wrong)
  - **Action:** Review with `git log --decorate` and reset if needed: `git reset --hard origin/<branch>`

- [ ] **Remote branch is not protected without review process:** Verify with team or repo settings
  - **Failure case:** Pushing directly to `main` without PR/MR
  - **Action:** Push to feature branch: `git push origin <branch>`, then create PR/MR

- [ ] **No secrets or sensitive data in commits:** Run `git diff origin/<branch>..HEAD` and scan for credentials, API keys, tokens
  - **Failure case:** Password or key visible in diff
  - **Action:** **Do not push.** Rewrite history: `git rebase -i origin/<branch>` and remove sensitive line

- [ ] **All tests pass locally:** Run project test suite (e.g., `npm test`, `pytest`, `go test`)
  - **Failure case:** Failing tests
  - **Action:** Fix failures locally before pushing

- [ ] **Linting and formatting pass:** Run formatter (e.g., `prettier`, `black`, `gofmt`)
  - **Failure case:** Code doesn't match project style
  - **Action:** Auto-format: `prettier --write .` (or equivalent)

---

## Post-Push: Verification

After pushing, verify remote state is correct.

- [ ] **Pushed commits appear on remote:** Run `git log --oneline origin/<branch> | head -5` and verify your commits
  - **Failure case:** Push appeared to succeed but commits missing
  - **Action:** Check network; retry push

- [ ] **Remote branch is aligned with local:** Run `git log --oneline HEAD..origin/<branch>` (should be empty)
  - **Failure case:** Remote and local diverged
  - **Action:** `git pull --no-rebase` and resolve

- [ ] **CI/CD pipeline triggered (if applicable):** Check your repository's CI/CD service (GitHub Actions, GitLab CI, etc.)
  - **Failure case:** Pipeline didn't trigger
  - **Action:** Check branch protection rules or pipeline configuration

- [ ] **PR/MR created if required:** Verify pull/merge request is open
  - **Failure case:** Changes pushed but PR/MR not created
  - **Action:** Create PR/MR in web interface; link to related issues

---

## Repository Health Checks

Run these periodically to maintain repository quality.

- [ ] **No dangling commits:** Run `git fsck --full` (should report no errors)
  - **Failure case:** Orphaned commits or corruption
  - **Action:** Contact team lead; may indicate data corruption

- [ ] **Reflog is healthy:** Run `git reflog` and verify recent history is intact
  - **Failure case:** Reflog appears truncated or empty
  - **Action:** Normal if no operations recently; no action needed

- [ ] **Local branches match remote state:** Run `git fetch origin --prune` to clean deleted remotes
  - **Failure case:** Stale local tracking branches
  - **Action:** After running prune, deleted branches no longer tracked locally

- [ ] **No excessive loose objects:** Run `git count-objects` and verify object count is reasonable
  - **Failure case:** Count in millions (indicates bloat)
  - **Action:** `git gc --aggressive` to compact repository

---

## Quick Reference Commands

Use these one-liners for common checks:

```bash
# Review changes before commit
git diff --cached

# Check if branch is up to date
git fetch origin && git log --oneline HEAD..origin/main

# List commits to be pushed
git log --oneline origin/main..HEAD

# Verify no sensitive data in last 10 commits
git log -p -10 | grep -i "password\|secret\|token\|key" && echo "FOUND SENSITIVE DATA!" || echo "No sensitive data found"

# See local vs remote state
git status -sb

# Quick repository health check
git fsck --full && echo "Repository OK" || echo "Repository has issues"
```

---

## Failure Scenarios and Recovery

### Scenario: Committed debug code

**Detection:** Run `git show HEAD` and see `console.log`, `debugger`, or similar

**Recovery:**

```bash
git reset HEAD~1  # Undo commit, keep changes staged
# Remove debug code
git add -p        # Stage only clean changes
git commit -m "Your message"
```

### Scenario: Committed unintended file

**Detection:** Run `git show --name-only HEAD`

**Recovery (before push):**

```bash
git reset HEAD~1
git rm --cached <file>
git commit -m "Your message"
```

**Recovery (after push):**

```bash
git revert -m 1 <commit-sha>  # Creates new commit that undoes it
git push
```

### Scenario: Staging includes .env or secrets

**Detection:** Run `git diff --cached | grep -E "\.env|password|secret|api_key"`

**Recovery:**

```bash
git reset HEAD .env           # Unstage
echo ".env" >> .gitignore     # Ignore future changes
git add .gitignore
git commit -m "Add .env to gitignore"
```

---

## References

- [Git Staging Documentation](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
- [Git Diff Documentation](https://git-scm.com/docs/git-diff)
- [Pre-commit Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
