---
description: Comprehensive guide to Conventional Commits specification with patterns, examples, and best practices for structured commit history
type: knowledge-base
category: Operations
version: 1.0.0
last_updated: 2025-12-03
difficulty: intermediate
audience: [developers, devops, ci-cd-engineers]
tags: [git, commits, conventional-commits, version-control, versioning]
related_resources:
  - task/task-git-operations-execution.md
  - checklist/checklist-git-operations-pre-commit.md
  - knowledge-base/knowledge-base-git-operations-reference.md
  - command/command-commit.md
estimated_duration: 15-20 minutes
---

# Conventional Commits: Specification and Best Practices

Conventional Commits is a lightweight specification for adding human and machine-readable meaning to commit messages. This resource covers the specification, decision patterns, and practical workflows for teams adopting conventional commits.

## Overview

Conventional Commits enables:

- **Automated CHANGELOG generation** - Tools can parse structured history
- **Automatic semantic versioning** - SemVer bumps determined from commit types
- **Clear communication** - Team and stakeholders understand scope of changes
- **Automated workflows** - CI/CD pipelines can trigger based on commit type
- **Better project exploration** - Organized, searchable commit history
- **Enforced quality** - Structured requirements promote thoughtful commits

---

## Commit Message Structure

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Example

```
feat(auth): add OAuth2 integration

Add support for OAuth2 authentication provider with:
- Token refresh mechanism
- User profile endpoint integration
- Scope-based permission handling

Closes: #234
Related-To: #156
```

---

## Commit Types Reference

### Required Types (SemVer-Relevant)

#### `feat:` - New Feature

Introduces a new feature to the codebase.

- **SemVer Impact:** MINOR version bump
- **Use when:** Adding new functionality
- **Example:** `feat: add dark mode toggle to settings`
- **With scope:** `feat(ui): add dark mode toggle to settings`

#### `fix:` - Bug Fix

Patches a bug in the codebase.

- **SemVer Impact:** PATCH version bump
- **Use when:** Correcting broken functionality
- **Example:** `fix: resolve null pointer exception in user service`
- **With scope:** `fix(auth): resolve null pointer exception in user service`

### Additional Types (Non-Breaking)

#### `build:` - Build System Changes

Changes to build system, dependencies, or dependency versions.

- **Use when:** Updating npm packages, webpack config, Docker setup
- **Example:** `build: upgrade React from 17 to 18`
- **Impact:** No code change; tooling/infrastructure only

#### `chore:` - Maintenance Tasks

Changes that don't modify src or test files (e.g., config files, .gitignore, license updates).

- **Use when:** Repository maintenance, non-functional changes
- **Example:** `chore: update project configuration files`
- **Impact:** No code functionality affected

#### `ci:` - CI/CD Configuration

Changes to CI/CD configuration, scripts, or workflows (GitHub Actions, GitLab CI, Jenkins, etc.).

- **Use when:** Modifying pipelines, adding checks, updating deployment workflows
- **Example:** `ci: add automated security scanning to pipeline`
- **Impact:** Pipeline or automation change; no code change

#### `docs:` - Documentation

Documentation-only changes (README, API docs, comments, etc.).

- **Use when:** Writing or updating documentation
- **Example:** `docs: add API authentication guide`
- **Impact:** No code functionality affected

#### `style:` - Code Style

Changes that do not affect the meaning of code (formatting, linting, missing semicolons, etc.).

- **Use when:** Applying formatters or fixing linting issues
- **Example:** `style: apply prettier formatting to all files`
- **Impact:** No functional change; purely aesthetic

#### `refactor:` - Code Refactoring

Code changes that neither fix bugs nor add features (reorganization, cleanup, optimization).

- **Use when:** Improving code structure without changing behavior
- **Example:** `refactor: extract user service into separate module`
- **Impact:** Same behavior, improved structure

#### `perf:` - Performance Improvements

Code changes that improve performance (caching, algorithm optimization, etc.).

- **Use when:** Optimizing runtime, memory, or resource usage
- **Example:** `perf: implement memoization for expensive calculations`
- **Impact:** Improved performance; same functionality

#### `test:` - Test Changes

Adding missing tests or correcting existing tests.

- **Use when:** Writing tests, fixing test failures, improving coverage
- **Example:** `test: add integration tests for payment module`
- **Impact:** Test coverage increase; no production code change

#### `revert:` - Revert Previous Commit

Reverts a previously merged commit.

- **Format:** `revert: <original commit message>`
- **Example:** `revert: feat(api): add deprecated endpoint`
- **Footer:** Include references: `Refs: a1b2c3d, d4e5f6g`

---

## Breaking Changes

Breaking changes indicate incompatibilities that require action from users/downstream systems.

### Indicating Breaking Changes

#### Method 1: Exclamation Mark

Add `!` before the colon:

```
feat!: remove deprecated login endpoint
fix(api)!: change response format for user endpoint
```

#### Method 2: Footer

Include `BREAKING CHANGE:` footer (uppercase required):

```
feat: add new authentication flow

BREAKING CHANGE: Old login endpoint removed. Use new /auth/v2/login instead.
```

#### Method 3: Combined (Recommended)

Use both for clarity:

```
feat!: redesign user profile API

BREAKING CHANGE: User profile endpoint now returns nested object structure instead of flat keys.
Migration guide: see /docs/migration-v2.md
```

### Breaking Change Examples

```
refactor!: remove support for Node.js 12
BREAKING CHANGE: Node.js 14+ now required

docs!: remove deprecated configuration syntax
BREAKING CHANGE: Old config format no longer supported. Use new format in docs/config.md

perf!: change caching strategy
BREAKING CHANGE: Redis cache now uses different key format. Clear caches before upgrading.
```

---

## Scope: Adding Context

Scopes add context about what part of the codebase changed.

### Format

```
<type>(<scope>): <description>
```

### Examples

```
feat(auth): add OAuth2 integration
fix(database): resolve connection pool exhaustion
docs(api): update endpoint documentation
refactor(ui-components): extract Button component
perf(search): optimize query indexing
```

### Scope Selection

**Choose scopes based on:**

- **Module or file:** `feat(parser)`, `fix(ui)`
- **Feature area:** `feat(auth)`, `feat(checkout)`
- **Component:** `feat(Button)`, `fix(Modal)`
- **Service:** `feat(payment-service)`, `fix(cache-layer)`
- **Domain:** `feat(billing)`, `fix(notifications)`

**Keep scopes:** Consistent, specific, lowercase, singular or plural as appropriate.

---

## Commit Message Best Practices

### Description Line

- **Length:** Keep under 72 characters (fits GitHub UI without wrapping)
- **Tense:** Use imperative mood ("add" not "added" or "adds")
- **Capitalization:** Start with lowercase
- **Period:** Omit trailing period
- **Completeness:** Describe _what_ changed, not _why_ (body is for _why_)

### Good Examples

```
feat: add user authentication module
fix: resolve memory leak in parser
docs: update installation instructions
refactor: simplify promise chain handling
```

### Poor Examples

```
feat: added user authentication         (← "added" instead of imperative)
fix: fixes stuff                        (← vague; what stuff?)
Update documentation                   (← capitalized; doesn't say what)
refactor: Code cleanup and stuff       (← vague; trailing period)
```

### Body

- **Use when:** Explaining _why_ a change was made, not _what_ (diff shows what)
- **Format:** Separate from description by one blank line
- **Length:** Wrap at 72 characters
- **Content:**
  - Problem being solved
  - Design decisions
  - Alternatives considered and rejected
  - Impact on users or systems

### Body Example

```
fix(auth): prevent concurrent session exploits

Sessions were vulnerable to race conditions when multiple
login attempts occurred simultaneously. Implement request
deduplication and session lock mechanism.

Alternative: Implement exponential backoff (considered but
would degrade UX for legitimate users).

Impact: Users with flaky networks may see brief delays but
security vulnerability eliminated.
```

### Footers

- **Use when:** Linking to issues, noting co-authors, indicating impact
- **Format:** `Token: value` (one per line, after body)
- **Common footers:**
  - `Closes: #123` or `Fixes: #456`
  - `Related-To: #789`
  - `Co-Authored-By: Name <email>`
  - `Reviewed-By: Name`
  - `BREAKING CHANGE: description`

### Footer Example

```
feat(billing): add annual payment option

Allow customers to pay annually instead of monthly with
10% discount incentive.

Closes: #145
Related-To: #132
Co-Authored-By: Alice <alice@company.com>
```

---

## Semantic Versioning Integration

Conventional Commits drives SemVer bumps automatically via tooling.

### Version Impact

| Commit Type                                                                 | Footer | SemVer Impact | Action          |
| --------------------------------------------------------------------------- | ------ | ------------- | --------------- |
| `feat:`                                                                     | none   | MINOR bump    | v1.0.0 → v1.1.0 |
| `fix:`                                                                      | none   | PATCH bump    | v1.0.0 → v1.0.1 |
| `feat!:` or `BREAKING CHANGE:`                                              | any    | MAJOR bump    | v1.0.0 → v2.0.0 |
| `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`, `build:`, `ci:` | none   | No auto-bump  | Manual decision |

### Example Release Flow

```
Current version: 1.2.0

Commits since last release:
- fix(parser): handle edge case           → triggers PATCH
- feat(ui): add dark mode                 → triggers MINOR
- fix!: change API response format        → triggers MAJOR

Next version: 2.0.0 (MAJOR takes precedence)
```

---

## Decision Patterns

### When to Use Each Type

#### `feat` vs `refactor` vs `perf`

```
feat(cache):    add Redis cache layer           (new feature)
refactor(cache): restructure caching abstraction (same behavior, better code)
perf(cache):    implement distributed caching   (improved performance)
```

#### `fix` vs `refactor`

```
fix(validation): resolve regex not matching edge cases  (broken → working)
refactor(validation): rewrite regex for clarity        (working → clearer)
```

#### `docs` vs `chore`

```
docs:   update README with new examples          (documentation)
chore:  bump license year to 2025                (non-functional maintenance)
```

#### `ci` vs `chore`

```
ci: add security scanning to GitHub Actions       (workflow automation)
chore: update .editorconfig formatting rules      (repository configuration)
```

### Scope Decision Tree

```
┌─ Is this about a specific feature/module?
│  ├─ Yes → Use scope: feat(module-name)
│  └─ No → Omit scope or use broad scope
│
├─ Does multiple areas change together?
│  ├─ Yes → Consider separate commits per area
│  └─ No → Use single scope
│
└─ Is scope list growing unmanageable?
   ├─ Yes → Review architecture; may indicate loose coupling issue
   └─ No → Scope selection is good
```

---

## Real-World Examples

### Feature Addition

```
feat(auth): implement JWT-based session management

- Add JWT token generation and validation
- Implement refresh token mechanism
- Secure token storage in httpOnly cookies
- Add session expiration handling

Previously used session database; now uses stateless JWT.
Improves scalability for distributed systems.

Closes: #89
Related-To: #45 (GDPR compliance)
```

### Bug Fix with Explanation

```
fix(checkout): prevent race condition in payment processing

Payment confirmation webhook could process duplicate charges
if user clicked submit multiple times during network latency.

Implement idempotency key in payment request and validate
at webhook reception to prevent duplicate processing.

Tested with: jmeter load test (1000 concurrent requests)

Fixes: #234
Reviewed-By: Alice
```

### Breaking Change

```
refactor!: consolidate API endpoints under /api/v2

BREAKING CHANGE: All endpoints moved from /endpoints/* to /api/v2/*
Legacy /endpoints/* paths removed. Migration guide:
see docs/api-migration-v2.md

- /endpoints/users → /api/v2/users
- /endpoints/auth → /api/v2/auth
- etc.

Improves API consistency and enables versioning strategy.

Co-Authored-By: Bob <bob@company.com>
Reviewed-By: Charlie
```

### Maintenance/Non-Functional

```
ci: add automated security scanning

Integrate OWASP dependency-check into GitHub Actions
to scan dependencies on every pull request.

Runs: `npm audit` + OWASP scan
Fails pipeline if high/critical vulnerabilities detected
Allows low/medium with documented exceptions

test: add integration tests for payment module

Add comprehensive test suite for payment processing:
- Happy path: successful charge
- Retry logic: transient failures
- Error handling: declined cards
- Webhook validation: signature verification

Coverage: 85% → 94%
```

---

## Team Adoption Patterns

### Starting Out

**Phase 1: Introduce & Teach**

- Share this document and Conventional Commits spec
- Establish which types your team will use
- Set up pre-commit hooks to enforce format

**Phase 2: Enforce**

- Use git hooks or CI validation to require format
- Reject non-conforming commits
- Provide clear error messages directing to docs

**Phase 3: Leverage**

- Generate automated CHANGELOGs
- Automate SemVer versioning
- Link commits to issues automatically
- Use history for analytics (e.g., which areas change most)

### Pre-Commit Hook Example

```bash
#!/bin/bash
# .git/hooks/commit-msg

# Check commit format against pattern
pattern="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?: .+"

if ! grep -qE "$pattern" "$1"; then
  echo "❌ Commit message does not follow Conventional Commits format"
  echo ""
  echo "Expected format: <type>[scope]: <description>"
  echo "Example: feat(auth): add OAuth2 integration"
  exit 1
fi
```

### CI Validation Example

```yaml
# GitHub Actions
name: Validate Commit Messages

on: [pull_request]

jobs:
  commit-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: commitlint-bot/commitlint-action@v2.0.0
        with:
          configFile: commitlint.config.js
```

---

## Tools and Integrations

### Commit Message Validation

- **commitlint** - Validate commit messages against rules
- **husky** - Git hooks manager (pairs with commitlint)
- **commitizen** - CLI for guided commit creation

### Changelog Generation

- **conventional-changelog** - Generate CHANGELOGs from commits
- **standard-version** - Automate versioning + CHANGELOG
- **semantic-release** - Fully automated releases

### IDE Integration

- **VSCode Extension:** Conventional Commits (create commits with GUI)
- **JetBrains Plugins:** Conventional Commit message template
- **Git GUIs:** Most support custom message templates

### CI/CD Integration

- **GitHub Actions:** Auto-generate releases from commits
- **GitLab CI:** Parse commits for versioning decisions
- **Jenkins:** Trigger different pipelines based on type

---

## Common Mistakes and Fixes

### Mistake 1: Incorrect Type

```
❌ update(parser): fix regex issue        (update is not standard)
✅ fix(parser): handle regex edge cases
```

### Mistake 2: Unclear Scope

```
❌ feat(module1): add stuff
✅ feat(payment): add retry logic with exponential backoff
```

### Mistake 3: Vague Description

```
❌ fix: resolve bug
✅ fix(auth): resolve jwt validation failing on token refresh
```

### Mistake 4: All Commits are `chore`

```
❌ chore: update files
❌ chore: modify code
✅ feat: add caching layer
✅ fix: resolve race condition
✅ refactor: extract utility functions
```

### Mistake 5: Mixing Concerns

```
❌ feat(api): add endpoint, fix bug, update docs
✅ feat(api): add new endpoint
✅ fix(api): resolve validation bug
✅ docs: update API guide
```

---

## References

- [Conventional Commits Official Specification](https://www.conventionalcommits.org/en/v1.0.0/)
- [Semantic Versioning](https://semver.org/)
- [commitlint Documentation](https://commitlint.js.org/)
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)

---

## Related Workflows

See these resources for implementing conventional commits in your workflow:

- **Pre-Commit Validation:** `@checklist/git-operations-pre-commit.md` - Verify commits before pushing
- **Complex Git Operations:** `@task/git-operations-execution.md` - Handle merges, rebases, recovery
- **Git Operations Reference:** `@knowledge-base/git-operations-reference.md` - Branching strategy and merge decisions
- **Stage & Commit Command:** `@command/commit.md` - Interactive staging and committing with conventional format
