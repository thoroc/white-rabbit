---
description: Expert-level Git operations reference covering workflows, branching strategies, and merge/rebase decisions
type: knowledge-base
category: Operations
version: 1.0.0
last_updated: 2025-12-03
difficulty: expert
audience: [devops, developers, ci-cd-engineers]
tags: [git, version-control, operations, branching, merge-strategy]
related_resources:
  - checklist/checklist-git-operations-pre-commit.md
  - task/task-git-operations-execution.md
  - template/template-git-command-execution-report.md
---

# Git Operations Reference

Expert-level operational guidance for Git workflows. This resource assumes Git fundamentals mastery; focus is on high-impact operational decisions and patterns.

## Rebasing vs. Merging: When to Choose Each

**Core principle:** Linear history is maintained by rebasing; full history is preserved by merging. Choose based on whether the branch is published.

### Rebase (Local Branches Only)

Use **before pushing** to local-only branches.

- **Command:** `git rebase origin/main`
- **Behavior:** Replays your commits on top of the target branch, creating linear history
- **When:** You have unpushed commits on your branch and want a clean history before integration
- **Why:** Eliminates merge commits, keeps log readable, simplifies bisection for debugging

**Rule:** If a branch is shared or published, never rebase—it rewrites history and breaks other checkouts.

**Example:**

```bash
# Feature branch with 3 local commits
git rebase origin/main
# Your commits now sit cleanly atop main's latest commit
```

### Merge (Shared or Published Branches)

Use **for any branch others depend on** or after pushes begin.

- **Command:** `git merge origin/main`
- **Behavior:** Creates a merge commit preserving full history
- **When:** Integrating changes from protected/shared branches or merging published feature branches
- **Why:** Preserves collaboration context; does not rewrite history

**Rule:** Merge commits are appropriate for integrating long-lived feature branches or release commits.

**Example:**

```bash
git merge origin/release/v2.0
# Creates merge commit recording the integration point
```

---

## Branch Lifecycle: Creation, Update, and Publication

### Creating Feature Branches

**Establish consistent naming:** `feature/<description>`, `bugfix/<id>`, `hotfix/<version>`

```bash
# Create from latest main
git checkout -b feature/user-auth origin/main

# Publish immediately to prevent loss
git push -u origin feature/user-auth
```

**Why:** Publishing immediately establishes a backup and signals work-in-progress to teammates.

### Keeping Branches Current

For **local branches not yet pushed:**

```bash
git fetch origin
git rebase origin/main
```

For **published branches:**

```bash
git fetch origin
git merge origin/main
```

**Decision rule:** If teammates might be pulling your branch → use merge. If only you have it → use rebase.

### Handling Diverged Branches

When your branch has diverged significantly from main:

```bash
# Safest approach: merge
git merge origin/main

# Alternative (if branch is unpublished): rebase
git rebase origin/main
```

**Divergence indicator:** `git log --oneline HEAD..origin/main` shows commits on main your branch lacks.

---

## Commit Hygiene and Staging

### Selective Staging

Only stage changes you intend to commit.

```bash
# Interactive staging (select hunks)
git add -p

# Review before commit
git diff --cached
```

**Why:** Prevents accidental commits of debug code, temporary changes, or unrelated fixes.

### Amending Commits (Unpublished Only)

Correct the last commit without creating a new one:

```bash
# Fix files
git add <files>
git commit --amend --no-edit
```

**Constraint:** Only amend commits not yet pushed. Once pushed, use `git revert` instead.

### Splitting Commits

If you committed multiple unrelated changes:

```bash
# Start interactive rebase
git rebase -i HEAD~1

# Mark commit as 'edit'
# Make changes, stage selectively
git add <partial-files>
git commit --amend --no-edit
# Continue with remaining changes
git rebase --continue
```

---

## Merge Conflict Resolution

### Preventing Conflicts

The simplest conflict is one you prevent.

```bash
# Before starting work
git fetch origin
git merge origin/main

# If the branch is unpublished
git rebase origin/main
```

### Resolving Conflicts

When conflicts occur:

```bash
# See conflict status
git status

# View conflict details
git diff

# Mark resolved (after manual edits)
git add <resolved-file>

# Complete merge
git commit -m "Resolve merge conflict in <file>"
```

**Conflict markers format:**

```shell
<<<<<<< HEAD
your changes
=======
incoming changes
>>>>>>> origin/main
```

**Decision at conflict:** Keep local, keep incoming, or combine. Edit the file and `git add` to mark resolved.

### Aborting Failed Merges

If conflict resolution goes wrong:

```bash
git merge --abort
# Start over with different strategy
```

---

## Publishing and Remote Synchronization

### Pushing to Remote

```bash
# First push (establish tracking)
git push -u origin feature/my-feature

# Subsequent pushes
git push
```

**Never force push to shared branches.** Force push only on branches no one else pulls.

### Pulling Changes

```bash
# Fetch + merge (safest)
git pull --no-rebase

# Fetch + rebase (linear history, if no one else pulls your branch)
git pull --rebase
```

**Default behavior:** `git pull` typically uses merge; verify with `git config pull.rebase`.

### Synchronizing Forks

When your fork diverges from upstream:

```bash
# Add upstream remote if not present
git remote add upstream <original-repo-url>

# Fetch upstream
git fetch upstream

# Rebase local work on upstream/main (if your branch unpublished)
git rebase upstream/main

# Or merge (if published)
git merge upstream/main

# Push to your fork
git push
```

---

## Cleaning Up and Maintenance

### Deleting Branches Locally

```bash
# Delete merged branch
git branch -d feature/old-feature

# Force delete (even if unmerged)
git branch -D feature/abandoned
```

### Deleting Remote Branches

```bash
git push origin --delete feature/old-feature

# Alternative syntax
git push origin :feature/old-feature
```

### Pruning Remote References

```bash
# Remove local tracking branches for deleted remotes
git fetch origin --prune
```

---

## Recovery Patterns

### Finding Lost Commits

Commits are rarely truly lost; they linger in `git reflog`:

```bash
# View reference history
git reflog

# Recover commit by SHA
git cherry-pick <sha>

# Or reset to that point
git reset --hard <sha>
```

### Undoing Pushed Commits

For commits already pushed to shared branches:

```bash
# Create a revert (new commit that undoes changes)
git revert <sha>
git push
```

**Never use `git reset --hard` on shared branches; always use `git revert`.**

### Recovering Deleted Branches

```bash
# Find deleted branch in reflog
git reflog | grep <branch-name>

# Recreate from SHA
git checkout -b <branch-name> <sha>
```

---

## Advanced Patterns

### Cherry-Picking Specific Commits

Copy a specific commit to your current branch:

```bash
git cherry-pick <sha>
```

**Use case:** Applying a bug fix from one branch to another without merging the entire branch.

### Stashing Work in Progress

Temporarily save uncommitted changes:

```bash
# Save changes
git stash

# List stashes
git stash list

# Apply most recent
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

### Interactive Rebase for History Cleanup

Compact, reorder, or edit commits before pushing:

```bash
git rebase -i origin/main
```

**Options in interactive mode:**

- `pick` - keep commit
- `squash` (or `s`) - combine with previous
- `reword` (or `r`) - edit commit message
- `drop` (or `d`) - remove commit

**Constraint:** Only rebase unpublished history.

---

## Operational Checklists by Scenario

### Before Starting Work

1. `git fetch origin` - ensure you have latest remote state
2. `git pull --no-rebase` - merge in latest changes to your branch
3. Branch is up to date relative to main

### Before Pushing

1. `git diff origin/main` - review all your changes
2. `git log --oneline origin/main..HEAD` - verify commit messages are clear
3. No sensitive data, credentials, or debug code committed

### Merging a Feature Branch

1. `git merge --no-ff <branch>` - use explicit merge commit for clarity
2. Verify tests pass post-merge
3. Delete branch locally and remotely: `git branch -d` and `git push origin --delete`

---

## References

- [Git Branching Model](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
- [Git Documentation: Rebase](https://git-scm.com/docs/git-rebase)
- [Git Documentation: Merge](https://git-scm.com/docs/git-merge)
- [Git Documentation: Reflog](https://git-scm.com/docs/git-reflog)
