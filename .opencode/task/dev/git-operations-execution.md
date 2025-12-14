---
description: Expert workflows for complex Git operations including commit squashing, branch recovery, and merge conflict resolution
type: task
category: Operations
version: 1.0.0
last_updated: 2025-12-03
estimated_duration: 20-40 minutes
prerequisites: [git-fundamentals, published-branch-experience]
tags: [git, rebase, merge, recovery, operations]
related_resources:
    - knowledge-base/knowledge-base-git-operations-reference.md
    - checklist/checklist-git-operations-pre-commit.md
    - template/template-git-command-execution-report.md
---

# Git Operations Execution Workflows

Step-by-step workflows for expert-level Git tasks. Each scenario includes prerequisites, command sequence, verification, and failure handling.

---

## Scenario 1: Squashing Commits Before Merge

**Use case:** Compress multiple local commits into one clean commit before merging to main.

**Prerequisites:**

- Branch is local (not pushed to shared remote)
- You have 3+ commits to consolidate
- No teammates are pulling from this branch

### Workflow

#### Step 1: Verify Branch State

```bash
git fetch origin
git log --oneline HEAD~5..HEAD
```

**Verification:** Confirm 3+ commits appear, all unpushed (no `origin/` references).

**Failure mode:** If you see commits already in remote, abort: `git rebase --abort` and use `git revert` instead.

#### Step 2: Start Interactive Rebase

```bash
# Rebase the last 3 commits (adjust number as needed)
git rebase -i HEAD~3
```

**What happens:** Editor opens showing commits. You'll see:

```
pick a1b2c3d First implementation
pick d4e5f6g Add feature refinement
pick h7i8j9k Fix edge case
```

#### Step 3: Squash Commits

Edit the file to:

```
pick a1b2c3d First implementation
squash d4e5f6g Add feature refinement
squash h7i8j9k Fix edge case
```

Save and close editor.

#### Step 4: Edit Combined Commit Message

Editor opens again with combined commit message. Clean it up:

```
Implement user authentication with edge case handling

- Added core auth logic
- Refined validation flow
- Fixed null pointer edge case
```

Save and close.

#### Step 5: Verify Result

```bash
git log --oneline HEAD~1..HEAD
```

**Expected:** Single commit with your combined message.

#### Step 6: Update Branch

```bash
git push -u origin feature/your-branch
```

**If branch already pushed:** Use `git push --force-with-lease` (safer than `--force`). This pushes only if no one else updated it.

### Failure Handling

**Conflict during rebase:**

```bash
# Resolve conflicts, then
git add <resolved-files>
git rebase --continue

# Or abandon
git rebase --abort
```

**Commits disappeared:** Check `git reflog` to recover.

---

## Scenario 2: Recovering a Deleted Branch

**Use case:** Restore a branch deleted locally or remotely (accidental deletion or recovery after forced push).

**Prerequisites:**

- Branch was published to remote at some point
- Deletion occurred recently (reflog retention depends on config)

### Workflow

#### Step 1: Find the Deleted Branch

```bash
git reflog | grep <branch-name>
```

**Example output:**

```
a1b2c3d (HEAD -> main) HEAD@{12}: reset: moving to origin/main
d4e5f6g HEAD@{13}: checkout: moving from feature/user-auth to main
h7i8j9k HEAD@{14}: commit: Finalize auth implementation
```

Look for the commit that represents your branch's HEAD.

#### Step 2: Verify the Commit

```bash
git show h7i8j9k --stat
```

**Verification:** Confirm this commit contains your work (check files modified, messages).

#### Step 3: Recreate the Branch

```bash
git checkout -b feature/user-auth h7i8j9k
```

#### Step 4: Verify Commits

```bash
git log --oneline -10
```

**Expected:** Your commits are present.

#### Step 5: Publish Branch

```bash
git push -u origin feature/user-auth
```

**If the remote branch still exists and you want to match it:**

```bash
git push origin --force-with-lease
```

### Failure Handling

**Reflog expired (unlikely):** If the commit is truly gone, check git garbage collection settings or examine `.git/objects/pack`. Contact team lead if critical work is lost.

**Wrong commit recovered:** Delete the branch and try again.

```bash
git branch -D feature/user-auth
```

---

## Scenario 3: Resolving Complex Merge Conflicts

**Use case:** Resolve merge conflicts when integrating a feature branch or pulling from main.

**Prerequisites:**

- Merge has started (`git merge` ran and conflict detected)
- You understand the intent of both sides of the conflict

### Workflow

#### Step 1: Identify Conflicts

```bash
git status
```

**Output shows:** Files with conflicts marked as "both modified".

#### Step 2: Examine Conflict Detail

```bash
git diff
```

**Look for conflict markers:**

```
<<<<<<< HEAD
your current code
=======
incoming code
>>>>>>> branch-name
```

#### Step 3: Resolve Each Conflict

For each conflicted file:

1. Open in editor
2. Decide: keep local, keep incoming, or combine
3. Remove conflict markers (`<<<<`, `====`, `>>>>`)
4. Save file

**Example - keeping local with incoming addition:**

```bash
# Original conflict
<<<<<<< HEAD
const userAuth = new Auth()
=======
const userAuth = new Auth()
userAuth.configure(config)
>>>>>>> feature/enhanced-auth

# Resolution (combined)
const userAuth = new Auth()
userAuth.configure(config)
```

#### Step 4: Mark Resolved

```bash
git add <resolved-file>
```

Repeat for each conflicted file.

#### Step 5: Verify Resolution

```bash
git diff --cached
```

**Check:** Verify your changes are correct; no remaining conflict markers.

#### Step 6: Complete Merge

```bash
git commit -m "Merge feature/enhanced-auth into main"
```

**Message format:** Describe what was integrated and any resolution context.

#### Step 7: Test Integration

```bash
# Run tests, build, verification
npm test  # or your test command
```

**Critical:** Never push without verifying tests pass post-merge.

### Failure Handling

**Merge went wrong:** Abort and restart.

```bash
git merge --abort
```

**Wrong resolution chosen:** If you pushed already, use `git revert`.

```bash
git revert -m 1 <merge-commit-sha>
```

**Tool-assisted resolution:** For large conflicts, use mergetool.

```bash
git mergetool
```

---

## Scenario 4: Rebasing a Branch on Updated Main

**Use case:** Update an unpublished feature branch to align with latest main, resolving conflicts during rebase if needed.

**Prerequisites:**

- Branch is local (no teammates pulling it)
- Main has new commits since you branched
- You want linear history

### Workflow

#### Step 1: Fetch Latest

```bash
git fetch origin
```

#### Step 2: Start Rebase

```bash
git rebase origin/main
```

**Output indicates:**

- `Successfully rebased...` - no conflicts, done!
- `Conflict (...)` - conflicts detected, continue to step 3.

#### Step 3: If Conflicts Occur

```bash
git status
```

**Shows:** Conflicted files during rebase.

**Resolve each file:**

1. Open file, resolve conflict markers (same as merge)
2. `git add <file>`

#### Step 4: Continue Rebase

```bash
git rebase --continue
```

**If another commit has conflicts, repeat step 3.**

#### Step 5: Verify Result

```bash
git log --oneline origin/main..HEAD
```

**Expected:** Your commits listed, no merge commit, clean linear history.

#### Step 6: Force Push (if previously pushed)

```bash
git push --force-with-lease origin feature/my-branch
```

**Safety note:** `--force-with-lease` prevents overwriting if someone else pushed.

### Failure Handling

**Rebase got complicated:** Abort and use merge instead.

```bash
git rebase --abort
git merge origin/main
```

**Teammate updated shared branch:** If branch was published and pulled by others, abort rebase and switch to merge.

```bash
git rebase --abort
git merge origin/main
```

---

## General Verification Patterns

Use these after any operation to confirm correctness:

```bash
# See what changed relative to origin/main
git log --oneline origin/main..HEAD

# Verify all your commits made it through
git log --oneline -5

# Check for untracked files or uncommitted changes
git status

# Review differences if integrating branches
git diff origin/main
```

---

## When to Escalate

- **Conflicts in multiple files:** Coordinate with teammates on resolution strategy
- **Rebasing changes pushed commits:** Check if teammates pulled; use merge instead
- **Reflog expired:** Contact team lead; restoration may require manual recovery
- **Forced push rejected:** Remote may have branch protection; coordinate with team or admins

---

## References

- [Git Rebase Documentation](https://git-scm.com/docs/git-rebase)
- [Git Merge Documentation](https://git-scm.com/docs/git-merge)
- [Git Interactive Rebase](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
- [Git Reflog Documentation](https://git-scm.com/docs/git-reflog)
