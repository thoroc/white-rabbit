---
title: VCS Detection Task
description: Detect and identify the version control system in use (Git, Jujutsu, or other)
type: task
category: Operations
version: 1.0.0
tags:
    - git
    - jujutsu
    - version-control
    - vcs
    - detection
mode: task
temperature: 0.1
last_updated: 2025-12-03
estimated_duration: 1-2 minutes
---

Comprehensive detection of version control systems in a repository. Determines which VCS is active and provides context for VCS-specific operations.

## Purpose

This task identifies:

- **Git only** - Standard Git repository (.git directory)
- **Jujutsu only** - Jujutsu VCS (.jj directory)
- **Colocated setup** - Both Git and Jujutsu (.git and .jj directories coexist)
- **None detected** - No version control system initialized

## VCS Detection Logic

### Step 1: Check Directory Structure

Examine the repository root for VCS indicators:

- **Git indicator:** `.git` directory exists
- **Jujutsu indicator:** `.jj` directory exists
- **Colocated indicator:** Both `.git` and `.jj` directories exist
- **No VCS:** Neither directory exists

### Step 2: Determine Active Configuration

If both Git and Jujutsu are present:

- Check if Jujutsu is colocated (managed via `jj git` commands)
- Verify Git is the underlying storage layer
- Confirm Jujutsu is the working interface

### Step 3: Gather VCS Information

For detected VCS, gather:

- **Git:** Current branch, remote tracking info, staging status
- **Jujutsu:** Current workspace state, change tracking info
- **Configuration:** VCS-specific settings and preferences

## Detection Decision Tree

```
Repository root
│
├─ Does .git exist?
│  ├─ Yes
│  │  └─ Does .jj also exist?
│  │     ├─ Yes → COLOCATED SETUP (Jujutsu + Git)
│  │     │        Use: Jujutsu for workflow, Git for compatibility
│  │     │        Commands: jj <command>
│  │     │
│  │     └─ No → GIT ONLY
│  │            Use: Standard Git workflow
│  │            Commands: git <command>
│  │
│  └─ No
│     └─ Does .jj exist?
│        ├─ Yes → JUJUTSU ONLY
│        │        Use: Jujutsu workflow
│        │        Commands: jj <command>
│        │
│        └─ No → NO VCS DETECTED
│               Action: Initialize Git or Jujutsu
```

## VCS-Specific Workflows

### Git Only Workflow

For repositories with only `.git`:

1. Show status: `git status`
2. List staged changes: `git diff --cached`
3. Interactive staging: `git add -p` (hunk-by-hunk selection)
4. Create commit: `git commit -m "<message>"`
5. Verify: `git log --oneline -1`

### Jujutsu Only Workflow

For repositories with only `.jj`:

1. Show workspace: `jj status`
2. Review changes: `jj diff`
3. Create changeset: Workflow depends on pending changes
4. Record change: `jj commit -m "<message>"`
5. Verify: `jj log --limit 1`

### Colocated (Jujutsu + Git) Workflow

For repositories with both `.jj` and `.git`:

1. Show workspace: `jj status`
2. Review changes: `jj diff`
3. Stage for Git: `jj commit -m "<message>"` (Jujutsu handles staging)
4. Verify in Git: `git log --oneline -1`
5. Push to remote: `git push` (standard Git push)

**Key point:** Jujutsu abstracts the Git working tree; commits made in Jujutsu automatically stage in Git.

## Initialization Guidance

If no VCS is detected, provide setup guidance:

### Initialize Git

```
To initialize a Git repository:
  git init
  git add .
  git commit -m "Initial commit"
```

### Initialize Jujutsu (Standalone)

```
To initialize Jujutsu only:
  jj init
```

### Initialize Colocated (Jujutsu + Git)

```
To initialize Jujutsu with Git colocated setup:
  jj git init

This creates:
- .jj/ directory for Jujutsu workspace state
- .git/ directory for Git repository storage
- Git becomes the underlying backend
- Use jj <command> for all operations
```

### Add Jujutsu to Existing Git Repository

```
To add Jujutsu to an existing Git repository:
  jj git init --colocate

This:
- Keeps existing .git directory intact
- Creates .jj directory for Jujutsu state
- Migrates current Git working tree into Jujutsu
- Allows using jj commands going forward
```

## Output Format

This task outputs VCS detection results as:

```
Detected VCS: [Git Only | Jujutsu Only | Colocated | None]

For Git Only:
- Current branch: [branch-name]
- Remote tracking: [origin/branch-name or none]
- Staged files: [count]
- Unstaged changes: [count]

For Jujutsu Only:
- Workspace state: [clean | modified]
- Pending changes: [count]
- Recent commits: [last 3]

For Colocated:
- Active interface: Jujutsu
- Git backend: Available
- Workspace state: [clean | modified]
- Staged in Git: [count]

For None:
- No VCS detected
- Suggestion: Initialize with 'git init' or 'jj git init'
```

## Integration with Commands

Commands that need VCS detection should reference this task:

```markdown
## Version Control Detection

Uses `@task/vcs-detection.md` to identify the repository's version control system:

- **Git Only:** Use standard Git workflow with `git` commands
- **Jujutsu Only:** Use Jujutsu workflow with `jj` commands
- **Colocated:** Use Jujutsu interface with Git backend
- **None:** Provide initialization guidance

Based on detection, route user to appropriate workflow.
```

## Decision Matrix for Commands

| Detected VCS | Staging Command        | Commit Command  | Verification           |
| ------------ | ---------------------- | --------------- | ---------------------- |
| Git Only     | `git add -p`           | `git commit -m` | `git log --oneline -1` |
| Jujutsu Only | Via `jj` interface     | `jj commit -m`  | `jj log --limit 1`     |
| Colocated    | `jj` handles staging   | `jj commit -m`  | `git log --oneline -1` |
| None         | N/A (initialize first) | N/A             | N/A                    |

## Related Resources

- **Commit Command:** `@command/commit.md` - Uses this task for VCS detection
- **Git Specialist Agent:** `@agent/git-vcs-specialist.md` - Provides expert guidance
- **Git Operations Reference:** `@knowledge-base/git-operations-reference.md` - Workflow decisions
- **Pre-Commit Checklist:** `@checklist/git-operations-pre-commit.md` - Validation steps

## Notes

- VCS detection should happen before any staging or commit operations
- Jujutsu colocated mode is becoming more common; treat as first-class support
- Provide clear initialization guidance if no VCS is detected
- Keep detection lightweight (checking directory structure, not probing Git/Jujutsu internals)
