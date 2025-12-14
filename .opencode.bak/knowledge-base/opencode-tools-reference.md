---
title: OpenCode Tools Reference Guide
description: Comprehensive reference for OpenCode's built-in tools, configuration patterns, and tool management strategies
type: knowledge-base
category: Development
version: 1.0.0
last_updated: 2025-11-19
tags:
    - opencode
    - tools
    - configuration
    - reference
    - built-in
    - custom-tools
difficulty: intermediate
audience:
    - developers
    - agents
    - configuration-managers
related_resources:
    - knowledge-base/plugin-architecture.md
    - knowledge-base/agent-configuration-reference.md
    - knowledge-base/loading-strategy.md
---

# OpenCode Tools Reference Guide

> **Source**: [OpenCode Tools Documentation](https://opencode.ai/docs/tools/)  
> **Last Verified**: 2025-11-19

## Overview

Tools enable LLMs to perform actions in your codebase. OpenCode provides a comprehensive set of built-in tools that can be extended with custom tools and MCP servers. By default, all tools are enabled and don't require permission to run.

### Key Concepts

- **Default State**: All tools enabled (`true`) by default
- **Configuration Scope**: Global or per-agent
- **Permission Model**: Configurable through `opencode.json`
- **Extensibility**: Custom tools and MCP server integration
- **Override Hierarchy**: Agent-specific configs override global settings

---

## Tool Configuration

### Global Configuration

Configure tools globally using the `tools` option in `opencode.json`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "tools": {
        "write": false,
        "bash": false,
        "webfetch": true
    }
}
```

**Wildcard Support:**

Control multiple tools at once using wildcards:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "tools": {
        "mymcp_*": false // Disable all tools from 'mymcp' MCP server
    }
}
```

### Per-Agent Configuration

**In opencode.json:**

Override global settings for specific agents:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "tools": {
        "write": true,
        "bash": true
    },
    "agent": {
        "plan": {
            "tools": {
                "write": false,
                "bash": false
            }
        }
    }
}
```

**In Agent Markdown:**

Configure tools directly in agent definition files:

```markdown
---
description: Read-only analysis agent
mode: subagent
tools:
    write: false
    edit: false
    bash: false
---

Analyze code without making any modifications.
```

**See Also**: [Agent Configuration Reference](./agent-configuration-reference.md)

---

## Built-in Tools Reference

### File System Tools

#### `read` - Read File Contents

**Purpose**: Read files from the codebase with optional line ranges

**Configuration**:

```json
{
    "tools": {
        "read": true
    }
}
```

**Features**:

- Read entire files or specific line ranges
- Efficient for large files with range support
- Primary tool for code exploration

**Use Cases**:

- Reviewing existing code
- Loading configuration files
- Reading documentation
- Analyzing file contents

---

#### `write` - Create/Overwrite Files

**Purpose**: Create new files or overwrite existing ones

**Configuration**:

```json
{
    "tools": {
        "write": true
    }
}
```

**Behavior**:

- Creates new files if they don't exist
- **Overwrites existing files completely**
- Use with caution on existing files

**Use Cases**:

- Creating new source files
- Generating configuration files
- Writing documentation
- Creating test files

**Security Consideration**: Disable for read-only agents or in sensitive environments.

---

#### `edit` - Modify Existing Files

**Purpose**: Perform precise edits using exact string replacements

**Configuration**:

```json
{
    "tools": {
        "edit": true
    }
}
```

**Features**:

- Exact text match and replace
- Primary tool for code modifications
- Preserves file structure
- Line-by-line precision

**Use Cases**:

- Updating existing code
- Refactoring functions
- Fixing bugs
- Modifying configurations

**Best Practice**: Prefer `edit` over `write` for existing files to avoid accidental overwrites.

---

#### `patch` - Apply Patches

**Purpose**: Apply patch files to the codebase

**Configuration**:

```json
{
    "tools": {
        "patch": true
    }
}
```

**Features**:

- Apply unified diff format patches
- Handle multiple file changes
- Conflict detection

**Use Cases**:

- Applying diffs from external sources
- Batch file modifications
- Version control operations
- Code migration

---

#### `list` - List Directory Contents

**Purpose**: List files and directories with optional filtering

**Configuration**:

```json
{
    "tools": {
        "list": true
    }
}
```

**Features**:

- Directory traversal
- Glob pattern filtering
- Respects `.gitignore` by default

**Use Cases**:

- Exploring project structure
- Finding specific directories
- Verifying file existence
- Directory audits

---

### Search Tools

#### `grep` - Search File Contents

**Purpose**: Fast content search using regular expressions

**Configuration**:

```json
{
    "tools": {
        "grep": true
    }
}
```

**Features**:

- Full regex syntax support
- File pattern filtering
- Fast search powered by [ripgrep](https://github.com/BurntSushi/ripgrep)
- Respects `.gitignore` patterns

**Use Cases**:

- Finding specific code patterns
- Searching for function calls
- Locating error messages
- Code archaeology

**Performance**: Optimized for large codebases using ripgrep.

---

#### `glob` - Find Files by Pattern

**Purpose**: Search for files using glob patterns

**Configuration**:

```json
{
    "tools": {
        "glob": true
    }
}
```

**Features**:

- Glob pattern matching (`**/*.js`, `src/**/*.ts`)
- Results sorted by modification time
- Fast file discovery

**Use Cases**:

- Finding files by extension
- Locating test files
- Finding configuration files
- Project structure analysis

**Examples**:

- `**/*.test.js` - All test files
- `src/**/*.ts` - All TypeScript files in src
- `*.json` - All JSON files in current directory

---

### Execution Tools

#### `bash` - Execute Shell Commands

**Purpose**: Run terminal commands in project environment

**Configuration**:

```json
{
    "tools": {
        "bash": true
    }
}
```

**Features**:

- Execute any shell command
- Access to project environment
- Command output capture
- Exit code handling

**Use Cases**:

- Running build scripts
- Installing dependencies (`npm install`, `bun install`)
- Git operations (`git status`, `git commit`)
- Running tests
- Executing custom scripts

**Security Consideration**: Disable for untrusted agents or in production environments.

**Common Commands**:

```bash
npm install          # Install dependencies
git status          # Check repository status
npm test            # Run tests
npm run build       # Build project
```

---

### Task Management Tools

#### `todowrite` - Manage Todo Lists

**Purpose**: Create and update task lists during coding sessions

**Configuration**:

```json
{
    "tools": {
        "todowrite": true
    }
}
```

**Features**:

- Task creation and updates
- Progress tracking
- Multi-step task organization
- Status management

**Use Cases**:

- Breaking down complex tasks
- Tracking implementation progress
- Agent work planning
- Session continuity

**Best Practice**: Agents should proactively use this for complex multi-step operations.

---

#### `todoread` - Read Todo Lists

**Purpose**: Read current todo list state

**Configuration**:

```json
{
    "tools": {
        "todoread": true
    }
}
```

**Features**:

- Current task status
- Pending task list
- Completed task history

**Use Cases**:

- Checking progress
- Resuming interrupted sessions
- Task status verification

---

### Network Tools

#### `webfetch` - Fetch Web Content

**Purpose**: Fetch and read web pages

**Configuration**:

```json
{
    "tools": {
        "webfetch": true
    }
}
```

**Features**:

- HTTP/HTTPS requests
- HTML to markdown conversion
- Content extraction

**Use Cases**:

- Reading documentation
- Researching APIs
- Fetching external resources
- Looking up best practices

**Example Uses**:

- Fetching library documentation
- Reading API references
- Accessing online guides
- Checking compatibility tables

---

## Tool Configuration Patterns

### Pattern 1: Read-Only Agent

**Use Case**: Code analysis without modifications

```json
{
    "agent": {
        "analyzer": {
            "tools": {
                "write": false,
                "edit": false,
                "bash": false,
                "patch": false,
                "read": true,
                "grep": true,
                "glob": true,
                "list": true
            }
        }
    }
}
```

**Enabled**: read, grep, glob, list  
**Disabled**: write, edit, bash, patch

---

### Pattern 2: Documentation Agent

**Use Case**: Generate and update documentation only

```json
{
    "agent": {
        "documentalist": {
            "tools": {
                "write": true,
                "edit": true,
                "bash": false,
                "read": true,
                "grep": true,
                "webfetch": true
            }
        }
    }
}
```

**Enabled**: write, edit, read, grep, webfetch  
**Disabled**: bash

---

### Pattern 3: Build & Test Agent

**Use Case**: Run builds, tests, and installations

```json
{
    "agent": {
        "builder": {
            "tools": {
                "bash": true,
                "read": true,
                "write": false,
                "edit": false
            }
        }
    }
}
```

**Enabled**: bash, read  
**Disabled**: write, edit

---

### Pattern 4: Full Access Agent

**Use Case**: General-purpose development agent

```json
{
    "agent": {
        "general": {
            "tools": {
                "write": true,
                "edit": true,
                "bash": true,
                "read": true,
                "grep": true,
                "glob": true,
                "list": true,
                "patch": true,
                "webfetch": true,
                "todowrite": true,
                "todoread": true
            }
        }
    }
}
```

**All tools enabled** for maximum capability.

---

### Pattern 5: Security-Conscious Agent

**Use Case**: Prevent destructive operations

```json
{
    "agent": {
        "secure": {
            "tools": {
                "write": false,
                "edit": true,
                "bash": false,
                "patch": false
            }
        }
    }
}
```

**Allowed**: edit (controlled modifications)  
**Denied**: write, bash, patch (destructive operations)

---

## Tool Extension

### Custom Tools

Define custom functions that the LLM can call:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "customTools": {
        "myTool": {
            "description": "My custom tool",
            "args": {
                "input": { "type": "string" }
            },
            "execute": "path/to/script.js"
        }
    }
}
```

**See**: [Custom Tools Documentation](https://opencode.ai/docs/custom-tools/)

### MCP Servers

Integrate external tools and services via Model Context Protocol:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "mcpServers": {
        "database": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-postgres"]
        }
    }
}
```

**See**: [MCP Servers Documentation](https://opencode.ai/docs/mcp-servers/)

---

## Internals & Implementation Details

### Underlying Technology

**Search Tools** (`grep`, `glob`, `list`):

- Powered by [ripgrep](https://github.com/BurntSushi/ripgrep)
- Respects `.gitignore` by default
- High performance on large codebases

### Ignore Patterns

**Default Behavior**:

- Respects `.gitignore` patterns
- Excludes ignored files from searches and listings

**Override with `.ignore` file**:

Create `.ignore` in project root to include normally-ignored paths:

```
!node_modules/
!dist/
!build/
```

**Use Cases**:

- Include `node_modules` in searches
- Search in build output directories
- Include generated files

---

## Best Practices

### 1. Principle of Least Privilege

**Guideline**: Only enable tools agents actually need

**Example**:

```json
{
    "agent": {
        "linter": {
            "tools": {
                "read": true,
                "grep": true,
                "bash": false, // Not needed for linting
                "write": false // Not needed for linting
            }
        }
    }
}
```

### 2. Separate Read and Write Agents

**Guideline**: Create distinct agents for analysis vs modification

**Example**:

- **Analyzer Agent**: read, grep, glob only
- **Developer Agent**: full access with write, edit, bash

### 3. Use Edit Over Write

**Guideline**: Prefer `edit` for existing files to avoid accidental overwrites

**Rationale**:

- `edit`: Precise, targeted modifications
- `write`: Complete file replacement (risky)

### 4. Disable Bash in Production

**Guideline**: Disable `bash` tool for agents running in production

**Rationale**:

- Prevents arbitrary command execution
- Reduces security risk
- Limits blast radius

### 5. Use Wildcards for MCP Tools

**Guideline**: Control entire MCP server tool sets with wildcards

**Example**:

```json
{
    "tools": {
        "database_*": false // Disable all database MCP tools
    }
}
```

### 6. Context Window Management

**Guideline**: Balance tool availability with context efficiency

**Strategy**:

- Limit tools to reduce prompt size
- Enable only necessary tools per agent
- Use agent-specific configurations

### 7. Tool Combinations

**Guideline**: Enable complementary tool sets

**Good Combinations**:

- `read` + `grep` + `glob` = Effective code search
- `edit` + `read` + `grep` = Safe code modification
- `bash` + `read` = Build and test workflows
- `write` + `read` + `webfetch` = Documentation generation

---

## Common Patterns & Recipes

### Recipe 1: Safe Code Review

```json
{
    "agent": {
        "reviewer": {
            "tools": {
                "read": true,
                "grep": true,
                "glob": true,
                "list": true,
                "write": false,
                "edit": false,
                "bash": false
            }
        }
    }
}
```

### Recipe 2: Documentation Writer

```json
{
    "agent": {
        "docs": {
            "tools": {
                "read": true,
                "write": true,
                "edit": true,
                "grep": true,
                "glob": true,
                "webfetch": true,
                "bash": false
            }
        }
    }
}
```

### Recipe 3: Test Runner

```json
{
    "agent": {
        "tester": {
            "tools": {
                "bash": true,
                "read": true,
                "grep": true,
                "write": false,
                "edit": false
            }
        }
    }
}
```

### Recipe 4: Refactoring Agent

```json
{
    "agent": {
        "refactor": {
            "tools": {
                "read": true,
                "edit": true,
                "grep": true,
                "glob": true,
                "bash": false,
                "write": false
            }
        }
    }
}
```

---

## Troubleshooting

### Issue: Tool Not Working

**Symptoms**: Tool calls fail or are ignored

**Checks**:

1. Verify tool is enabled in config
2. Check agent-specific overrides
3. Verify wildcard patterns don't disable tool
4. Check permissions configuration

**Solution**:

```json
{
    "tools": {
        "mytool": true // Explicitly enable
    }
}
```

---

### Issue: Files Not Found in Search

**Symptoms**: `grep` or `glob` don't find expected files

**Cause**: `.gitignore` is excluding files

**Solution**: Create `.ignore` file:

```
!path/to/include/
```

---

### Issue: Agent Can't Write Files

**Symptoms**: Write operations fail

**Checks**:

1. Verify `write` tool is enabled
2. Check agent-specific configuration
3. Verify file permissions on filesystem

**Solution**:

```json
{
    "agent": {
        "myagent": {
            "tools": {
                "write": true
            }
        }
    }
}
```

---

### Issue: Bash Commands Not Executing

**Symptoms**: `bash` tool calls have no effect

**Checks**:

1. Verify `bash` is enabled
2. Check if agent mode allows bash
3. Verify command syntax

**Security Note**: Bash may be intentionally disabled for security.

---

## Performance Considerations

### Tool Performance Characteristics

| Tool        | Speed     | Memory Usage | Network | Disk I/O |
| ----------- | --------- | ------------ | ------- | -------- |
| `read`      | Fast      | Low          | No      | Yes      |
| `write`     | Fast      | Low          | No      | Yes      |
| `edit`      | Fast      | Low          | No      | Yes      |
| `grep`      | Very Fast | Low          | No      | Yes      |
| `glob`      | Very Fast | Low          | No      | Yes      |
| `list`      | Fast      | Low          | No      | Yes      |
| `bash`      | Variable  | Variable     | Maybe   | Maybe    |
| `webfetch`  | Slow      | Medium       | Yes     | No       |
| `patch`     | Fast      | Low          | No      | Yes      |
| `todoread`  | Fast      | Low          | No      | No       |
| `todowrite` | Fast      | Low          | No      | No       |

### Optimization Tips

1. **Use `grep` and `glob` over `bash`** for file operations
2. **Batch `read` operations** when possible
3. **Limit `webfetch` calls** due to network latency
4. **Use `edit` over `write`** for better performance on large files
5. **Enable only needed tools** to reduce prompt size

---

## Security Implications

### High-Risk Tools

**`bash`**:

- Can execute arbitrary commands
- Full system access
- Recommendation: Disable in production and for untrusted agents

**`write`**:

- Can overwrite any file
- Potential data loss
- Recommendation: Use `edit` when possible

**`patch`**:

- Can apply complex changes
- May introduce vulnerabilities
- Recommendation: Review patches before applying

### Low-Risk Tools

**`read`, `grep`, `glob`, `list`**:

- Read-only operations
- Safe for all agents
- No security concerns

**`edit`**:

- Controlled modifications
- Lower risk than `write`
- Requires exact match (safer)

### Security Best Practices

1. **Disable `bash` by default**, enable per-agent as needed
2. **Use `edit` instead of `write`** for existing files
3. **Create read-only agents** for analysis tasks
4. **Review agent tool permissions** regularly
5. **Use wildcards** to control entire tool groups
6. **Apply least privilege principle** to all agents

---

## Migration & Compatibility

### Migrating from Command-Based Systems

**Old Pattern** (Command-based):

```bash
# In .opencode/command/analyze.md
analyze_project() {
  grep -r "pattern" .
  ls -la
}
```

**New Pattern** (Tool-based):

```json
{
    "agent": {
        "analyzer": {
            "tools": {
                "grep": true,
                "list": true
            }
        }
    }
}
```

**Benefits**:

- Better performance
- Native integration
- Type safety
- Permission control

**See Also**: [Plugin Architecture](./plugin-architecture.md)

---

## References

- **Official Documentation**: <https://opencode.ai/docs/tools/>
- **Custom Tools Guide**: <https://opencode.ai/docs/custom-tools/>
- **MCP Servers Guide**: <https://opencode.ai/docs/mcp-servers/>
- **Permissions Guide**: <https://opencode.ai/docs/permissions/>
- **Agent Configuration**: <https://opencode.ai/docs/agents/>
- **Ripgrep Documentation**: <https://github.com/BurntSushi/ripgrep>

---

## Quick Reference Table

| Tool        | Purpose                | Risk Level | Default | Use Case              |
| ----------- | ---------------------- | ---------- | ------- | --------------------- |
| `read`      | Read files             | Low        | Enabled | Code review           |
| `write`     | Create/overwrite files | High       | Enabled | File creation         |
| `edit`      | Modify files           | Medium     | Enabled | Code modification     |
| `patch`     | Apply patches          | Medium     | Enabled | Batch changes         |
| `bash`      | Execute commands       | High       | Enabled | Build/test            |
| `grep`      | Search content         | Low        | Enabled | Code search           |
| `glob`      | Find files             | Low        | Enabled | File discovery        |
| `list`      | List directories       | Low        | Enabled | Structure exploration |
| `todowrite` | Manage todos           | Low        | Enabled | Task tracking         |
| `todoread`  | Read todos             | Low        | Enabled | Progress checking     |
| `webfetch`  | Fetch web content      | Medium     | Enabled | Research              |

---

## Changelog

| Version | Date       | Changes                         |
| ------- | ---------- | ------------------------------- |
| 1.0.0   | 2025-11-19 | Initial comprehensive reference |
