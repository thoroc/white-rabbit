---
title: Project Context Task
description: This task provides lightweight, quick project context analysis
  using shell commands. Use this for rapid project
type: task
category: Development
version: 1.0.0
tags:
  - analysis
  - project
  - context
  - orientation
  - overview
  - shell
mode: task
temperature: 0.3
last_updated: 2025-11-19
estimated_duration: 1-2 minutes
---

This task provides lightweight, quick project context analysis using shell commands. Use this for rapid project
orientation before generating documentation.

## Purpose

- **Quick project orientation** without loading full analysis tasks
- **Lightweight shell commands** that run in < 2 seconds
- **Minimal context usage** - provides just enough information to start
- **Foundation for deeper analysis** - use before loading comprehensive tasks

## When to Use This Task

- At the start of documentation generation commands
- When you need quick project overview
- Before deciding which comprehensive tasks to load
- For initial project classification and tech stack identification

## Related Resources

**For Comprehensive Analysis** (load after using this task if needed):

- **Technology Detection**: `.opencode/task/technology-detection.md` - Detailed language, framework, and tool detection
- **Infrastructure Analysis**: `.opencode/task/infrastructure-analysis.md` - Database, messaging, architecture patterns
- **Deployment Strategy**: `.opencode/task/deployment-strategy.md` - CI/CD, containers, cloud platforms

**Reference**:

- **Common Shell Commands**: `.opencode/template/common-shell-commands-tmpl.yaml` - Additional analysis patterns

## Quick Project Context Commands

### 1. Project Type Classification

Quickly identify if this is a frontend, backend, or full-stack project.

```bash
echo "## Project Type Analysis"
if [ -f "package.json" ]; then
  if grep -q -E "(react|vue|angular|svelte|next|nuxt|gatsby)" package.json 2>/dev/null; then
    echo "Project Type: Frontend Web Application"
  elif grep -q -E "(express|fastify|koa|hapi)" package.json 2>/dev/null; then
    echo "Project Type: Backend API/Web Service"
  fi
fi
```

### 2. Development Environment Detection

Identify primary package managers and development tools.

```bash
echo "## Development Environment"
echo "Package managers found:"
[ -f "package.json" ] && echo "- npm/yarn/pnpm (Node.js)"
[ -f "requirements.txt" ] || [ -f "pyproject.toml" ] || [ -f "Pipfile" ] && echo "- pip/poetry/pipenv (Python)"
[ -f "go.mod" ] && echo "- go modules (Go)"
[ -f "Cargo.toml" ] && echo "- cargo (Rust)"
[ -f "pom.xml" ] || [ -f "build.gradle" ] && echo "- maven/gradle (Java)"
[ -f "Gemfile" ] && echo "- bundler (Ruby)"
[ -f "composer.json" ] && echo "- composer (PHP)"
```

### 3. Deployment Configuration Quick Check

Identify containerization and CI/CD platforms.

```bash
echo "## Deployment Configuration"
container_strategy="None"
[ -f "Dockerfile" ] && container_strategy="Docker"
[ -f "docker-compose.yml" ] && container_strategy="Docker Compose"
echo "Container: $container_strategy"

cicd_platform="None"
[ -d ".github/workflows" ] && cicd_platform="GitHub Actions"
[ -f ".gitlab-ci.yml" ] && cicd_platform="GitLab CI"
[ -f "Jenkinsfile" ] && cicd_platform="Jenkins"
echo "CI/CD: $cicd_platform"
```

### 4. Technology Stack Summary

Get a quick count of primary file types.

```bash
echo "=== Technology Stack Analysis ==="
find . -type f \( \
  -name "*.py" -o \
  -name "*.js" -o \
  -name "*.ts" -o \
  -name "*.jsx" -o \
  -name "*.tsx" -o \
  -name "*.java" -o \
  -name "*.kt" -o \
  -name "*.go" -o \
  -name "*.rs" -o \
  -name "*.cpp" -o \
  -name "*.c" -o \
  -name "*.cs" -o \
  -name "*.php" -o \
  -name "*.rb" -o \
  -name "*.swift" -o \
  -name "*.dart" \
) ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  2>/dev/null | \
  awk -F. '{print $NF}' | \
  sort | \
  uniq -c | \
  sort -nr | \
  head -5
```

### 5. Package Managers and Build Tools

List available package management files.

```bash
echo "## Package Managers and Build Tools"
echo "Node.js:"
ls -la package.json package-lock.json yarn.lock pnpm-lock.yaml bun.lockb 2>/dev/null || echo "- None found"
echo "Python:"
ls -la requirements.txt requirements-dev.txt pyproject.toml Pipfile poetry.lock 2>/dev/null || echo "- None found"
echo "Java:"
ls -la pom.xml build.gradle build.gradle.kts 2>/dev/null || echo "- None found"
echo "Go:"
ls -la go.mod go.sum 2>/dev/null || echo "- None found"
```

### 6. Project Configuration Files

Identify main project configuration files.

```bash
echo "## Project Configuration"
ls -la package.json \
  pyproject.toml \
  requirements.txt \
  pom.xml \
  build.gradle \
  Cargo.toml \
  go.mod \
  Makefile \
  cdk.json \
  serverless.yml \
  2>/dev/null || echo "No major config files found"
```

### 7. Git Repository Information

Get basic git repository context.

```bash
echo "## Git Repository"
echo "Repository root:"
basename $(git rev-parse --show-toplevel 2>/dev/null) || echo "- Not a git repository"
echo ""
echo "Current branch:"
git branch --show-current 2>/dev/null || echo "- N/A"
echo ""
echo "Uncommitted changes:"
git status --porcelain 2>/dev/null | wc -l || echo "- N/A"
```

### 8. Project Structure Overview

Get a high-level view of the project structure.

```bash
echo "## Project Structure"
find . -type f \( \
  -name "*.py" -o \
  -name "*.ts" -o \
  -name "*.js" -o \
  -name "*.json" -o \
  -name "*.md" -o \
  -name "*.yml" -o \
  -name "*.yaml" -o \
  -name "*.toml" -o \
  -name "*.groovy" -o \
  -name "Dockerfile" -o \
  -name "Makefile" \
) ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  2>/dev/null | head -30
```

## Specialized Quick Checks

### API Framework Detection

Quick check for common API frameworks.

```bash
echo "## API Frameworks and Libraries"
for file in package.json pyproject.toml requirements.txt pom.xml build.gradle Cargo.toml go.mod composer.json Gemfile; do
  if [ -f "$file" ]; then
    echo "=== $file ==="
    grep -E -i "(express|fastify|koa|hapi|flask|django|fastapi|tornado|spring|gin|echo|rails|laravel|asp.net)" "$file" | head -5 || echo "No major API frameworks detected"
    echo ""
  fi
done
```

### Container and Orchestration Quick Check

```bash
echo "=== Container and Orchestration ==="
echo "## Docker Configuration"
find . -maxdepth 2 -name "Dockerfile*" -o -name "docker-compose*.yml" -o -name "docker-compose*.yaml" -o -name ".dockerignore" 2>/dev/null || echo "- None found"
echo "## Kubernetes"
find . -maxdepth 2 -name "*.k8s.yml" -o -name "*.k8s.yaml" 2>/dev/null || echo "- None found"
```

### CI/CD Platform Detection

```bash
echo "## CI/CD Platforms and Pipelines"
echo "### GitHub Actions"
find .github/workflows -name "*.yml" -o -name "*.yaml" 2>/dev/null || echo "- None found"
echo "### GitLab CI"
find . -maxdepth 2 -name ".gitlab-ci.yml" 2>/dev/null || echo "- None found"
echo "### Jenkins"
find . -maxdepth 2 -name "Jenkinsfile*" 2>/dev/null || echo "- None found"
echo "### Other CI/CD"
find . -maxdepth 2 \( -name ".travis.yml" -o -name "azure-pipelines.yml" -o -name ".circleci" \) 2>/dev/null || echo "- None found"
```

### Testing Framework Detection

```bash
echo "## Testing Frameworks"
for file in package.json pyproject.toml requirements*.txt pom.xml build.gradle go.mod Cargo.toml; do
  if [ -f "$file" ]; then
    echo "=== $file ==="
    grep -E -i "(jest|mocha|cypress|playwright|vitest|pytest|unittest|junit|testng|rspec|minitest|phpunit)" "$file" | head -3 || echo "No test frameworks detected"
    echo ""
  fi
done
```

### Development Configuration Check

```bash
echo "## Development Configuration"
echo "Linting/Formatting:"
ls -la .eslintrc* .prettierrc* .pylintrc pyproject.toml .rubocop.yml 2>/dev/null || echo "- None found"
echo "Git Hooks:"
ls -la .husky .git/hooks 2>/dev/null || echo "- None found"
echo "Editor Config:"
ls -la .editorconfig .vscode 2>/dev/null || echo "- None found"
```

### Infrastructure as Code Detection

```bash
echo "## Infrastructure as Code"
echo "### Terraform"
find . -maxdepth 2 -name "*.tf" -o -name "*.tfvars" 2>/dev/null | head -5 || echo "- None found"
echo "### CloudFormation/CDK"
find . -maxdepth 2 -name "*.cf.yml" -o -name "cdk.json" -o -name "template.yml" 2>/dev/null || echo "- None found"
echo "### Other IaC"
find . -maxdepth 2 -name "Pulumi.yaml" -o -name "ansible.cfg" -o -name "*.bicep" 2>/dev/null || echo "- None found"
```

## Usage in Commands

### Standard Pattern

Commands should reference this task and use specific commands as needed:

```markdown
## Project Analysis

**EFFICIENCY FIRST**: Use lightweight shell commands for initial assessment.

**Task Reference**: `.opencode/task/project-context.md`

### Quick Project Type

!`[copy Project Type Classification command from task]`

### Development Environment

!`[copy Development Environment Detection command from task]`
```

### When to Load Comprehensive Tasks

After running quick context commands, decide if comprehensive tasks are needed:

**Load technology-detection.md when:**

- Need detailed framework analysis
- Need build tool configuration details
- Creating comprehensive technology documentation

**Load infrastructure-analysis.md when:**

- Need database and messaging system details
- Creating architecture documentation
- Need service discovery and orchestration info

**Load deployment-strategy.md when:**

- Need detailed CI/CD pipeline analysis
- Creating deployment documentation
- Need cloud platform deployment details

## Performance Notes

- **Fast**: All commands run in < 2 seconds combined
- **Efficient**: Uses simple find/grep/ls commands
- **Safe**: Read-only operations
- **Minimal Context**: Provides just enough info to proceed

## Best Practices

### DO

- ✅ Use this task for initial quick context
- ✅ Run specific commands as needed (not all at once)
- ✅ Load comprehensive tasks only when needed
- ✅ Reference this task in commands instead of embedding scripts

### DON'T

- ❌ Run all commands if you only need specific info
- ❌ Use this for comprehensive analysis (use dedicated tasks)
- ❌ Embed these scripts directly in commands
- ❌ Skip this and go straight to heavy tasks

## Integration with Documentation Commands

This task is referenced by:

- `/document` - Quick documentation generation
- `/api-docs` - API documentation (for framework detection)
- `/arch-docs` - Architecture docs (for tech stack overview)
- `/deploy-docs` - Deployment docs (for CI/CD detection)
- `/dev-docs` - Development docs (for dev environment)
- `/onboard-docs` - Onboarding docs (for project overview)
- `/pipeline-docs` - Pipeline docs (for CI/CD detection)

## Example: Minimal Command Integration

Instead of embedding scripts, commands should reference this task:

```markdown
## Project Context

**Task**: `.opencode/task/project-context.md` provides lightweight project analysis commands.

**Quick Analysis** (select commands as needed from task):

### Project Type

!`echo "## Project Type Analysis"; if [ -f "package.json" ]; then if grep -q -E "(react|vue|angular|svelte|next|nuxt|gatsby)" package.json 2>/dev/null; then echo "Project Type: Frontend Web Application"; elif grep -q -E "(express|fastify|koa|hapi)" package.json 2>/dev/null; then echo "Project Type: Backend API/Web Service"; fi; fi`
```

## Version History

- **v1.0.0** (2025-11-13): Initial project context task extracted from command duplicates
