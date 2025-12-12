---
title: Technology Detection Task
description: Comprehensive technology stack detection for programming languages,
  frameworks, and tools
type: task
category: Development
version: 1.0.0
tags:
  - analysis
  - technology
  - detection
  - stack
  - framework
  - language
mode: task
temperature: 0.3
last_updated: 2025-11-19
estimated_duration: 2-4 minutes
---

This consolidated task provides comprehensive technology stack detection for any codebase, combining programming language identification, framework detection, and project type classification into a single, optimized analysis.

## Core Technology Analysis

### Universal Technology Stack Detection

```bash
# Single-pass comprehensive technology detection
echo "=== Technology Stack Analysis ==="

# 1. Language Detection (file count and percentage)
echo "## Programming Languages"
find . -type f \( -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.java" -o -name "*.kt" -o -name "*.scala" -o -name "*.go" -o -name "*.rs" -o -name "*.cpp" -o -name "*.c" -o -name "*.h" -o -name "*.cs" -o -name "*.fs" -o -name "*.vb" -o -name "*.php" -o -name "*.rb" -o -name "*.swift" -o -name "*.m" -o -name "*.dart" -o -name "*.r" -o -name "*.R" -o -name "*.jl" -o -name "*.pl" -o -name "*.sh" -o -name "*.ps1" -o -name "*.lua" -o -name "*.clj" -o -name "*.ex" -o -name "*.exs" -o -name "*.erl" -o -name "*.hrl" \) 2>/dev/null | awk -F. '{print $NF}' | sort | uniq -c | sort -nr | head -10

# 2. Configuration Files Detection
echo "## Configuration Files"
find . -maxdepth 2 -name "package.json" -o -name "pyproject.toml" -o -name "requirements*.txt" -o -name "Pipfile" -o -name "pom.xml" -o -name "build.gradle" -o -name "Cargo.toml" -o -name "go.mod" -o -name "composer.json" -o -name "Gemfile" -o -name "*.csproj" -o -name "*.sln" -o -name "*.fsproj" -o -name "*.vbproj" 2>/dev/null
```

### Framework and Library Detection

```bash
# 3. Framework Detection (single grep across all config files)
echo "## Frameworks and Libraries"
for file in package.json pyproject.toml requirements.txt Pipfile pom.xml build.gradle Cargo.toml go.mod composer.json Gemfile; do
  if [ -f "$file" ]; then
    echo "=== $file ==="
    # Detect major frameworks across all ecosystems
    grep -E -i "(react|vue|angular|svelte|ember|next|nuxt|gatsby)|(express|fastify|koa|hapi)|(flask|django|fastapi|tornado|pyramid|bottle|starlette|quart)|(spring|hibernate|struts|wicket)|(gin|echo|fiber|beego|revel)|(rocket|actix|warp|tide)|(rails|sinatra|hanami)|(laravel|symfony|codeigniter)|(asp.net|blazor)" "$file" | head -5 || echo "No major frameworks detected"
    echo ""
  fi
done
```

### Build Tools and Package Managers

```bash
# 4. Build Tools Detection
echo "## Build Tools and Package Managers"

# Package managers
echo "Package managers found:"
[ -f "package.json" ] && echo "- npm/yarn/pnpm (Node.js)"
[ -f "requirements.txt" ] || [ -f "pyproject.toml" ] || [ -f "Pipfile" ] && echo "- pip/poetry/pipenv (Python)"
[ -f "go.mod" ] && echo "- go modules (Go)"
[ -f "Cargo.toml" ] && echo "- cargo (Rust)"
[ -f "pom.xml" ] && echo "- maven (Java)"
[ -f "build.gradle" ] && echo "- gradle (Java/Kotlin)"
[ -f "composer.json" ] && echo "- composer (PHP)"
[ -f "Gemfile" ] && echo "- bundler (Ruby)"

# Build tools
echo "Build tools found:"
find . -maxdepth 2 -name "Makefile" -o -name "*.mk" -o -name "webpack*.js" -o -name "webpack*.ts" -o -name "rollup*.js" -o -name "vite*.js" -o -name "gulpfile.js" -o -name "Gruntfile.js" -o -name "tsconfig.json" -o -name "babel.config.*" -o -name ".babelrc*" -o -name "CMakeLists.txt" -o -name "meson.build" -o -name "BUILD" -o -name "WORKSPACE" 2>/dev/null | head -10
```

### Testing Frameworks

```bash
# 5. Testing Framework Detection (single grep across all files)
echo "## Testing Frameworks"
grep -r -i -E "(jest|mocha|jasmine|vitest|cypress|playwright|selenium|webdriver|puppeteer)|(pytest|unittest|nose|behave|hypothesis)|(junit|testng|spock|mockito)|(rspec|minitest|cucumber)|(phpunit|pest|codeception)|(xunit|nunit|mstest)" package.json requirements*.txt pyproject.toml pom.xml build.gradle Cargo.toml go.mod composer.json Gemfile 2>/dev/null | head -10 | cut -d: -f1 | sort -u | sed 's/^/- Testing config in: /'

# Test directories
find . -maxdepth 3 -name "*test*" -o -name "*spec*" -type d 2>/dev/null | head -5 | sed 's/^/- Test directory: /'
```

## Project Type Classification

### Project Type Detection Logic

```bash
# 6. Project Type Classification
echo "## Project Type Analysis"

# Web Application Detection
if [ -f "package.json" ]; then
  if grep -q -E "(react|vue|angular|svelte|next|nuxt|gatsby)" package.json 2>/dev/null; then
    echo "Project Type: Frontend Web Application"
  elif grep -q -E "(express|fastify|koa|hapi)" package.json 2>/dev/null; then
    echo "Project Type: Backend API/Web Service"
  fi
fi

# Python Project Types
if [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
  if grep -q -E "(flask|django|fastapi|tornado)" requirements*.txt pyproject.toml 2>/dev/null; then
    echo "Project Type: Python Web Application/API"
  elif grep -q -E "(pandas|numpy|jupyter|sklearn|tensorflow|pytorch)" requirements*.txt pyproject.toml 2>/dev/null; then
    echo "Project Type: Data Science/ML Project"
  fi
fi

# Mobile Application Detection
if [ -d "android" ] && [ -d "ios" ]; then
  echo "Project Type: Cross-platform Mobile Application"
elif [ -f "pubspec.yaml" ]; then
  echo "Project Type: Flutter Mobile Application"
elif find . -name "*.xcodeproj" -o -name "*.xcworkspace" | head -1 | grep -q .; then
  echo "Project Type: iOS Application"
elif find . -name "AndroidManifest.xml" | head -1 | grep -q .; then
  echo "Project Type: Android Application"
fi

# Desktop Application Detection
if grep -q -E "(electron|tauri)" package.json 2>/dev/null; then
  echo "Project Type: Desktop Application (Electron/Tauri)"
fi

# Library/Package Detection
if [ -f "package.json" ] && ! grep -q -E '"main"|"bin"|"scripts".*"start"' package.json 2>/dev/null; then
  echo "Project Type: Library/Package"
elif [ -f "setup.py" ] || ([ -f "pyproject.toml" ] && grep -q "build-system" pyproject.toml 2>/dev/null); then
  echo "Project Type: Python Package/Library"
fi

# Microservices Detection
dockerfile_count=$(find . -name "Dockerfile*" 2>/dev/null | wc -l)
if [ "$dockerfile_count" -gt 1 ]; then
  echo "Project Type: Microservices Architecture (Multiple Dockerfiles found)"
fi
```

## Language-Specific Deep Analysis

### Dominant Language Analysis

```bash
# 7. Detailed Analysis for Primary Language
echo "## Primary Language Deep Analysis"

# Determine primary language
primary_lang=$(find . -type f \( -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.java" -o -name "*.go" -o -name "*.rs" -o -name "*.php" -o -name "*.rb" -o -name "*.cs" \) 2>/dev/null | awk -F. '{print $NF}' | sort | uniq -c | sort -nr | head -1 | awk '{print $2}')

case "$primary_lang" in
  "py")
    echo "Primary Language: Python"
    find . -name "*.py" -type f | wc -l | sed 's/^/Python files: /'
    [ -f "pyproject.toml" ] && echo "Build system: pyproject.toml (modern Python)" || echo "Build system: Traditional (requirements.txt/setup.py)"
    find . -name "__pycache__" -type d | head -3 | sed 's/^/Cache directory: /'
    ;;
  "js"|"ts"|"jsx"|"tsx")
    echo "Primary Language: JavaScript/TypeScript"
    find . -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" -type f | wc -l | sed 's/^/JS/TS files: /'
    [ -f "tsconfig.json" ] && echo "TypeScript configuration found"
    find . -name "node_modules" -type d | head -3 | sed 's/^/Dependencies: /'
    ;;
  "java")
    echo "Primary Language: Java"
    find . -name "*.java" -type f | wc -l | sed 's/^/Java files: /'
    [ -f "pom.xml" ] && echo "Build system: Maven" || [ -f "build.gradle" ] && echo "Build system: Gradle"
    ;;
  "go")
    echo "Primary Language: Go"
    find . -name "*.go" -type f | wc -l | sed 's/^/Go files: /'
    [ -f "go.mod" ] && echo "Go modules enabled" && head -3 go.mod
    ;;
  "rs")
    echo "Primary Language: Rust"
    find . -name "*.rs" -type f | wc -l | sed 's/^/Rust files: /'
    [ -f "Cargo.toml" ] && echo "Cargo configuration found"
    ;;
  *)
    echo "Primary Language: Multiple or Other"
    ;;
esac
```

## Development Environment Detection

### Development Tools and Configuration

```bash
# 8. Development Environment Analysis
echo "## Development Environment"

# IDE/Editor configuration
echo "IDE/Editor configuration:"
find . -maxdepth 2 -name ".vscode" -o -name ".idea" -o -name "*.iml" -o -name ".eclipse" -type d 2>/dev/null | sed 's/^/- /'

# Linting and formatting
echo "Code quality tools:"
find . -maxdepth 2 -name ".eslintrc*" -o -name ".prettierrc*" -o -name ".pylintrc" -o -name "pyproject.toml" -o -name ".flake8" -o -name ".black" -o -name "rustfmt.toml" -o -name ".rubocop.yml" 2>/dev/null | sed 's/^/- /'
grep -l -E "(eslint|prettier|black|flake8|pylint|rustfmt|rubocop)" package.json requirements*.txt pyproject.toml Cargo.toml Gemfile 2>/dev/null | sed 's/^/- Config in: /'

# Environment files
echo "Environment configuration:"
find . -maxdepth 2 -name ".env*" -o -name "*.env" 2>/dev/null | sed 's/^/- /'
```

## Quick Detection Commands

### Rapid Technology Assessment

```bash
# 9. Quick Technology Summary (for fast commands)
echo "=== Quick Technology Summary ==="
echo "Languages: $(find . -type f \( -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.java" -o -name "*.go" -o -name "*.rs" -o -name "*.php" -o -name "*.rb" -o -name "*.cs" \) 2>/dev/null | awk -F. '{print $NF}' | sort -u | tr '\n' ' ')"
echo "Package managers: $(ls package.json pyproject.toml requirements.txt go.mod Cargo.toml pom.xml build.gradle composer.json Gemfile 2>/dev/null | tr '\n' ' ')"
echo "Config files: $(find . -maxdepth 2 -name "*.json" -o -name "*.toml" -o -name "*.yaml" -o -name "*.yml" -o -name "*.ini" -o -name "*.cfg" 2>/dev/null | wc -l | sed 's/^/Count: /')"
```

## Usage Instructions

This task provides multiple levels of analysis:

1. **Comprehensive Analysis**: Use the full technology stack detection for complete documentation
2. **Focused Analysis**: Use specific sections (e.g., just framework detection) for targeted information
3. **Quick Assessment**: Use the rapid summary for fast technology identification
4. **Deep Dive**: Use language-specific analysis for detailed examination

## Integration with Commands

Commands should reference this task for all technology-related detection:

```markdown
## Technology Analysis

Uses `.opencode/task/core/technology-detection.md` for comprehensive technology stack analysis:

!`[appropriate detection command based on documentation needs]`
```

This consolidated approach eliminates redundancy while providing comprehensive technology detection across any project type or language ecosystem.
