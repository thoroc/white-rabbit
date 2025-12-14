---
title: GitHub Workflow Safety Checklist
description: Use this checklist to ensure safe execution of GitHub workflows (branch creation, commits, PRs, and merges).
type: checklist
category: development
version: 1.0.0
tags:
    - checklist
    - development
    - github
    - workflow
    - safety
last_updated: 2025-11-19
---

# GitHub Workflow Safety Checklist

Use this checklist to ensure safe execution of GitHub workflows (branch creation, commits, PRs, and merges).

## 📋 Purpose and Usage

### Purpose

This checklist ensures that GitHub workflows are executed safely with proper validation, avoiding destructive operations
and ensuring all prerequisites are met before performing git operations, creating pull requests, and merging changes.

### When to Use

- Before executing automated GitHub workflows
- Before running the `/gh-flow` command
- When creating, pushing, and merging branches in one workflow
- Before any automated git operations that combine multiple steps

### How to Use

1. Verify all safety checks **before** starting workflow
2. Stop workflow if any check fails
3. Resolve issues before proceeding
4. Use as pre-flight checklist for git automation

---

## ✅ 1. Repository State Validation

### Working Directory

- [ ] **Working directory is clean** or has only intended changes
- [ ] No untracked files that shouldn't be committed
- [ ] No uncommitted changes from previous work sessions
- [ ] `.gitignore` properly configured (not committing build artifacts, secrets, etc.)

### Branch State

- [ ] **Current branch is appropriate** for branching from (usually `main` or `master`)
- [ ] Current branch is up to date with remote
- [ ] No merge conflicts present
- [ ] Branch protection rules understood

---

## ✅ 2. Remote Configuration Validation

### Remote Settings

- [ ] **Remote origin is configured** correctly
- [ ] Remote URL is correct (not a fork unless intended)
- [ ] Remote is accessible (network connectivity)
- [ ] Using correct repository (not accidentally targeting wrong repo)

### Permissions

- [ ] **User has push permissions** to the repository
- [ ] User has permission to create branches
- [ ] User has permission to create pull requests
- [ ] User has permission to merge (if auto-merge intended)

---

## ✅ 3. GitHub CLI Validation

### CLI Availability

- [ ] **GitHub CLI (`gh`) is installed** and available
- [ ] `gh` CLI version is recent and compatible
- [ ] Running `which gh` or `gh --version` succeeds

### Authentication

- [ ] **GitHub CLI is authenticated** (run `gh auth status`)
- [ ] Authentication token has required scopes:
    - [ ] `repo` scope (for private repos)
    - [ ] `workflow` scope (if triggering workflows)
    - [ ] `write:org` scope (if org-level operations)
- [ ] Authentication hasn't expired
- [ ] Correct GitHub account authenticated (personal vs org)

---

## ✅ 4. Branch Safety Checks

### Branch Naming

- [ ] **Branch name is provided** (not empty)
- [ ] Branch name follows team conventions (e.g., `feature/`, `fix/`, `docs/`)
- [ ] Branch name is descriptive and meaningful
- [ ] Branch name doesn't conflict with existing branches
- [ ] Branch name contains no special characters that could cause issues

### Branch Creation

- [ ] Source branch is correct (usually `main`)
- [ ] Source branch is clean (no uncommitted changes)
- [ ] Creating branch from latest commit
- [ ] Not accidentally creating from detached HEAD

---

## ✅ 5. Commit Safety Checks

### Commit Content

- [ ] **Changes staged are intentional** and reviewed
- [ ] No secrets, tokens, or credentials in changes
- [ ] No large binary files (unless intended)
- [ ] No sensitive data (passwords, API keys, private info)
- [ ] Changes related to single logical unit of work

### Commit Message

- [ ] **Commit message follows conventions** (Conventional Commits format)
- [ ] Message is descriptive and clear
- [ ] Message explains "why" not just "what"
- [ ] Message follows team's commit message format

---

## ✅ 6. Pull Request Safety Checks

### PR Content

- [ ] **PR title is descriptive** and follows conventions
- [ ] PR body includes:
    - [ ] Summary of changes
    - [ ] Related issues (if any)
    - [ ] Testing notes
    - [ ] Breaking changes (if any)
- [ ] Target branch is correct (usually `main`)
- [ ] PR type is appropriate (feature, fix, docs, etc.)

### PR Metadata

- [ ] Appropriate labels applied (if required)
- [ ] Reviewers assigned (if required)
- [ ] Linked to related issues/projects
- [ ] Milestone set (if applicable)

---

## ✅ 7. Merge Safety Checks

### Pre-Merge Validation

- [ ] **CI/CD checks pass** (if configured)
- [ ] Required reviews obtained (if branch protection enabled)
- [ ] No merge conflicts
- [ ] Tests pass
- [ ] Security scans pass (if configured)
- [ ] Code quality gates pass

### Merge Strategy

- [ ] **Merge strategy is appropriate**:
    - [ ] `--merge` for merge commit (preserves history)
    - [ ] `--squash` for single commit (cleaner history)
    - [ ] `--rebase` for linear history
- [ ] Merge strategy matches team conventions
- [ ] Understanding of what will happen after merge

### Post-Merge Actions

- [ ] **Branch cleanup planned**:
    - [ ] `--delete-branch` flag used (or manual deletion planned)
    - [ ] Local branch will be cleaned up
    - [ ] Remote branch will be cleaned up
- [ ] Team notified (if required)

---

## ✅ 8. Error Recovery Preparation

### Rollback Plan

- [ ] **Know how to undo changes** if something goes wrong
- [ ] Understand how to revert commits
- [ ] Understand how to close PR if needed
- [ ] Know who to contact if issues arise

### Backup

- [ ] Important changes backed up elsewhere (if critical)
- [ ] Can recover if local changes lost
- [ ] Remote tracking branch will preserve changes

---

## 🎯 Workflow Execution Checklist

### Step 1: Branch Creation

- [ ] Safety checks 1-4 passed
- [ ] Branch created successfully
- [ ] On correct new branch (`git branch --show-current`)

### Step 2: Commit

- [ ] Safety check 5 passed
- [ ] Changes staged successfully
- [ ] Commit created with proper message
- [ ] Commit includes all intended changes

### Step 3: Push

- [ ] Push succeeds without errors
- [ ] Remote branch created/updated
- [ ] No force-push used (unless explicitly intended)
- [ ] Push includes all commits

### Step 4: Pull Request

- [ ] Safety check 6 passed
- [ ] PR created successfully
- [ ] PR URL obtained
- [ ] PR appears in repository

### Step 5: Merge

- [ ] Safety check 7 passed
- [ ] Merge completes successfully
- [ ] Branch deleted (if intended)
- [ ] Changes appear in target branch

---

## 🚨 Stop Conditions

**DO NOT PROCEED if any of the following are true:**

- [ ] ❌ Working directory has unexpected changes
- [ ] ❌ Remote origin is incorrect or inaccessible
- [ ] ❌ GitHub CLI is not authenticated
- [ ] ❌ User lacks required permissions
- [ ] ❌ Branch name conflicts with existing branch
- [ ] ❌ Commit contains secrets or sensitive data
- [ ] ❌ Required CI/CD checks are failing
- [ ] ❌ Merge conflicts are present
- [ ] ❌ No rollback plan exists

**If any stop condition is true:** Halt workflow, resolve issue, verify safety checks again.

---

## 🔧 Troubleshooting Guide

### "Permission denied" errors

1. Verify GitHub CLI authentication: `gh auth status`
2. Re-authenticate if needed: `gh auth login`
3. Check repository permissions in GitHub settings
4. Verify correct account is authenticated

### "Branch already exists" errors

1. Check if branch name conflicts: `git branch -a`
2. Delete local branch if appropriate: `git branch -D <branch>`
3. Choose different branch name
4. Pull latest changes if remote branch exists

### "Push rejected" errors

1. Pull latest changes: `git pull origin main`
2. Resolve any conflicts
3. Try push again
4. Check if branch protection rules prevent push

### "CI checks failing" errors

1. Review CI check output
2. Fix failing tests or checks
3. Commit fixes
4. Push and wait for checks to pass
5. Do not force merge with failing checks

---

## 📊 Safety Compliance Scoring

### Pre-Flight Checks (Must be 100%)

**Total Critical Checks:** 26 **Checks Passed:** **\_ / 26 **Pass Rate:** \_\_**%

**Minimum Required:** 100% (all checks must pass)

### Stop Conditions (Must be 0)

**Stop Conditions Present:** \_\_\_ / 10 **Safe to Proceed:** Only if 0 stop conditions present

---

## 🔍 Review Checklist

Before executing GitHub workflow:

- [ ] All repository state validations passed
- [ ] All remote configuration validations passed
- [ ] GitHub CLI is available and authenticated
- [ ] Branch safety checks passed
- [ ] Commit safety checks passed
- [ ] PR safety checks passed (if creating PR)
- [ ] Merge safety checks passed (if merging)
- [ ] Error recovery plan in place
- [ ] No stop conditions present
- [ ] Workflow steps understood
- [ ] Rollback procedure known

---

## References

- **GitHub CLI Documentation**: <https://cli.github.com/manual/>
- **Conventional Commits**: `.opencode/data/conventional-commits.md`
- **GitHub Workflow Command**: `.opencode/command/gh-flow.md`
- **Commit Command**: `.opencode/command/commit.md`
- **Git Best Practices**: Team documentation or wiki

---

## Related Checklists

- **JIRA Ticket Creation**: `.opencode/checklist/jira-ticket-creation.md` (for linking PRs to tickets)
- **Documentation Discovery**: `.opencode/checklist/documentation-discovery.md` (for doc changes)

---

## Emergency Contacts

**If workflow fails or causes issues:**

1. **Stop immediately** - Don't make situation worse
2. **Assess damage** - What was changed? Can it be reverted?
3. **Contact team lead** - Get help if needed
4. **Document incident** - Note what went wrong for future reference
5. **Fix root cause** - Update checklist or process to prevent recurrence
