---
description: Comprehensive listing of all MCP servers, custom tools, and
  built-in tools available in the current OpenCode environment
type: task
category: Development
mode: task
temperature: 0.2
version: 1.0.0
last_updated: 2025-11-19
estimated_duration: 2-5 minutes
tags:
  - mcp
  - tools
  - listing
  - discovery
  - configuration
  - inventory
title: List Mcp Tools Task
---

This task provides comprehensive discovery and listing of all tools available in the OpenCode environment, including
built-in tools, MCP server tools, custom tools, and plugin tools.

## Purpose

Enumerate all available tools to help users and agents understand:

- Which tools are currently accessible
- How to reference tools in configurations
- What MCP servers are configured
- Which custom tools and plugins are loaded
- Tool categories and purposes

This task enables:

- **Agent configuration** - Know which tools to enable/disable
- **Workflow planning** - Understand available capabilities
- **Troubleshooting** - Verify tool availability
- **Documentation** - Generate tool inventories

## When to Use This Task

Use this task when you need to:

- Create or configure an agent with specific tool access
- Audit available tools in the environment
- Troubleshoot tool availability issues
- Document the OpenCode configuration
- Plan workflows that require specific tools
- Understand MCP server capabilities

**Do NOT use this task if:**

- You only need built-in tool documentation (use knowledge-base instead)
- You need detailed tool API documentation (use official docs)
- You're looking for tool usage examples (use knowledge-base/opencode-tools-reference.md)

## Input Requirements

### Required Information

None - this task executes autonomously based on the current OpenCode environment.

### Optional Information

- **Filter by category**: Limit output to specific categories (built-in, mcp, custom, plugin)
- **Include descriptions**: Whether to include tool descriptions (default: true)
- **Format**: Output format preference (markdown, json, yaml)

## Task Execution Steps

### Step 1: Discover Built-in Tools

**Actions:**

1. List all OpenCode built-in tools
2. Categorize by functionality
3. Document tool names and purposes

**Tools Used:**

- Internal tool registry inspection
- Documentation references

**Built-in Tools to List:**

File Operations:

- `read` - Read file contents
- `write` - Create/overwrite files
- `edit` - Modify existing files with string replacement
- `patch` - Apply patch files
- `list` - List directory contents

Search Operations:

- `grep` - Search file contents using regex
- `glob` - Find files by pattern

Execution:

- `bash` - Execute shell commands

Task Management:

- `todowrite` - Manage todo lists
- `todoread` - Read todo lists

Network:

- `webfetch` - Fetch web content

**Outputs:**

- Complete list of built-in tools with descriptions
- Tool categories
- Default enabled state (all true)

---

### Step 2: Discover MCP Servers

**Actions:**

1. Check for `opencode.json` or `~/.config/opencode/opencode.json`
2. Parse `mcpServers` configuration section
3. Extract server names, commands, and arguments
4. Identify MCP server tool prefixes

**Tools Used:**

- `read` - Read configuration files
- `grep` - Search for mcpServers configuration

**Configuration Locations:**

- Project: `./opencode.json`
- Global: `~/.config/opencode/opencode.json`
- Alternative: `.opencode/opencode.json`

**Outputs:**

- List of configured MCP server names
- Server commands and startup arguments
- Tool name prefixes (e.g., `aws-cdk_*`, `database_*`)

---

### Step 3: Enumerate MCP Server Tools

**Actions:**

1. For each discovered MCP server:
   - Document server name
   - List all tools provided by that server
   - Note tool naming pattern (prefix_toolname)
   - Extract tool descriptions if available

**Tools Used:**

- MCP server introspection (if available)
- Configuration analysis
- Tool registry inspection

**MCP Tool Naming Pattern:**

```
{server-name}_{tool-name}
```

Examples:

- `aws-cdk_CDKGeneralGuidance`
- `aws-cloudwatch_describe_log_groups`
- `playwright_browser_click`

**Outputs:**

- Complete list of MCP tools grouped by server
- Tool descriptions
- Server-specific tool count
- Wildcard patterns for configuration

---

### Step 4: Discover Custom Tools

**Actions:**

1. Check for `customTools` in configuration
2. Parse custom tool definitions
3. Extract tool names, descriptions, and execute paths

**Tools Used:**

- `read` - Read configuration files
- `grep` - Search for customTools section

**Custom Tool Configuration Pattern:**

```json
{
  "customTools": {
    "myTool": {
      "description": "My custom tool",
      "args": { "input": { "type": "string" } },
      "execute": "path/to/script.js"
    }
  }
}
```

**Outputs:**

- List of custom tool names
- Tool descriptions
- Execute script paths

---

### Step 5: Discover Plugin Tools

**Actions:**

1. Check for `plugin` configuration
2. List loaded plugins
3. Identify tools provided by each plugin

**Tools Used:**

- `read` - Read configuration files
- Plugin registry inspection

**Plugin Configuration Pattern:**

```json
{
  "plugin": ["file:///path/to/plugin", "opencode-plugin-name@1.0.0"]
}
```

**Outputs:**

- List of loaded plugins
- Tools provided by each plugin
- Plugin versions

---

### Step 6: Generate Tool Configuration Examples

**Actions:**

1. For each tool category, generate configuration examples
2. Show how to enable/disable tools
3. Provide wildcard patterns for MCP servers
4. Include preset patterns (read-only, docs, full-access)

**Tools Used:**

- Documentation generation
- Pattern recognition

**Configuration Examples:**

```json
{
  "tools": {
    // Built-in tools
    "write": false,
    "edit": true,
    "bash": false,

    // MCP server tools (wildcard)
    "aws-cdk_*": false,
    "playwright_*": true,

    // Custom tools
    "myCustomTool": true
  }
}
```

**Outputs:**

- Configuration examples for common patterns
- Wildcard usage documentation
- Agent-specific configuration examples

---

### Step 7: Format and Present Results

**Actions:**

1. Organize tools by category
2. Format output according to requested format
3. Include tool counts and statistics
4. Add configuration guidance

**Tools Used:**

- Markdown formatting
- Data organization

**Output Format:**

````markdown
# Available OpenCode Tools

## Summary

- Built-in tools: 11
- MCP servers: 3
- MCP tools: 47
- Custom tools: 2
- Plugin tools: 5
- **Total: 65 tools**

## Built-in Tools (11)

### File Operations

- `read` - Read file contents
- `write` - Create/overwrite files
- `edit` - Modify existing files
- `patch` - Apply patches
- `list` - List directory contents

### Search Operations

- `grep` - Search file contents using regex
- `glob` - Find files by pattern

### Execution

- `bash` - Execute shell commands

### Task Management

- `todowrite` - Manage todo lists
- `todoread` - Read todo lists

### Network

- `webfetch` - Fetch web content

## MCP Server Tools (47)

### aws-cdk (15 tools)

Wildcard pattern: `aws-cdk_*`

- `aws-cdk_CDKGeneralGuidance` - Get prescriptive CDK advice
- `aws-cdk_ExplainCDKNagRule` - Explain CDK Nag rules
- [... more tools ...]

### aws-cloudwatch (12 tools)

Wildcard pattern: `aws-cloudwatch_*`

- `aws-cloudwatch_describe_log_groups` - List CloudWatch log groups
- `aws-cloudwatch_execute_log_insights_query` - Execute Logs Insights query
- [... more tools ...]

### playwright (20 tools)

Wildcard pattern: `playwright_*`

- `playwright_browser_click` - Click on element
- `playwright_browser_snapshot` - Take accessibility snapshot
- [... more tools ...]

## Custom Tools (2)

- `myCustomTool` - Custom tool description
- `anotherTool` - Another custom tool

## Plugin Tools (5)

### staged-formatter

- `staged_format` - Format staged files

### resource-loader

- `resource_list` - List available resources
- `resource_search` - Search resources
- `resource_info` - Get resource info

## Configuration Examples

### Read-Only Agent

```json
{
  "agent": {
    "analyzer": {
      "tools": {
        "write": false,
        "edit": false,
        "bash": false,
        "aws-cdk_*": false,
        "playwright_*": false
      }
    }
  }
}
```
````

### Documentation Agent

```json
{
  "agent": {
    "docs": {
      "tools": {
        "write": true,
        "edit": true,
        "bash": false,
        "webfetch": true
      }
    }
  }
}
```

### Full Access Agent

```json
{
  "agent": {
    "build": {
      "tools": {
        "*": true // Enable all tools
      }
    }
  }
}
```

```

**Outputs:**

- Comprehensive formatted tool listing
- Tool counts and statistics
- Configuration examples
- Wildcard patterns

---

## Task Output Summary

The task generates one primary output:

1. **Tool Inventory Report** (Markdown or JSON)
   - Categorized tool listing
   - Tool descriptions
   - Tool counts by category
   - Configuration examples
   - Wildcard patterns for MCP servers
   - Preset configuration patterns

## Success Criteria

- ✅ All built-in tools listed (11 tools)
- ✅ All configured MCP servers discovered
- ✅ All MCP server tools enumerated with descriptions
- ✅ Custom tools identified from configuration
- ✅ Plugin tools listed if plugins are loaded
- ✅ Tools categorized by type and server
- ✅ Wildcard patterns documented for each MCP server
- ✅ Configuration examples provided
- ✅ Tool counts accurate
- ✅ Output formatted clearly

## Quality Checks

### Completeness Check

- [ ] All 11 built-in tools listed
- [ ] All MCP servers from config discovered
- [ ] Each MCP server's tools enumerated
- [ ] Custom tools section included (if applicable)
- [ ] Plugin tools section included (if applicable)
- [ ] Configuration examples provided
- [ ] Wildcard patterns documented

### Accuracy Check

- [ ] Tool names match exact function names
- [ ] Tool descriptions are clear and accurate
- [ ] MCP server names match configuration
- [ ] Wildcard patterns follow naming conventions
- [ ] Tool counts are correct
- [ ] No duplicate tools listed

### Clarity Check

- [ ] Tools grouped by logical categories
- [ ] Clear section headings
- [ ] Tool descriptions are concise
- [ ] Configuration examples are valid
- [ ] Output is easy to scan
- [ ] Wildcard patterns are explained

## Error Handling

### Common Issues and Resolutions

**Issue: Configuration file not found**
- Check multiple locations: `./opencode.json`, `~/.config/opencode/opencode.json`, `.opencode/opencode.json`
- Fall back to built-in tools only if no config found
- Report which configuration locations were checked

**Issue: MCP server tools not enumerable**
- Document server name and configuration
- Note that tools cannot be enumerated without running server
- Suggest common tool patterns based on server name
- Recommend checking server documentation

**Issue: No MCP servers configured**
- Report only built-in tools
- Note that MCP servers can be added to configuration
- Provide example MCP server configuration

**Issue: Custom tools or plugins not found**
- Skip those sections
- Note in summary which tool types were found
- Focus on available tools

## Examples

### Example 1: Basic Environment (Built-in Tools Only)

**Input:**
- No MCP servers configured
- No custom tools
- No plugins

**Task Execution:**
1. Discovered 11 built-in tools
2. No MCP servers in configuration
3. No custom tools defined
4. No plugins loaded
5. Generated listing of built-in tools only

**Outputs:**
- Tool listing with 11 built-in tools
- Note: "No MCP servers configured"
- Configuration examples for built-in tools

---

### Example 2: AWS Development Environment

**Input:**
- Built-in tools (default)
- MCP servers: aws-cdk, aws-cloudwatch, aws-documentation
- No custom tools
- Plugin: staged-formatter

**Task Execution:**
1. Listed 11 built-in tools
2. Discovered 3 MCP servers
3. Enumerated 40+ AWS-related tools
4. Found 1 plugin tool
5. Generated wildcard patterns for AWS tools
6. Created AWS-specific configuration examples

**Outputs:**
- Total: 52+ tools
- MCP sections for each AWS server
- Wildcard patterns: `aws-cdk_*`, `aws-cloudwatch_*`, `aws-documentation_*`
- AWS-focused configuration examples

---

### Example 3: Full-Featured Environment

**Input:**
- Built-in tools (default)
- MCP servers: aws-cdk, playwright, chrome-devtools
- Custom tools: myLinter, myBuilder
- Plugins: staged-formatter, resource-loader

**Task Execution:**
1. Listed 11 built-in tools
2. Discovered 3 MCP servers
3. Enumerated 50+ MCP tools
4. Found 2 custom tools
5. Found 2 plugins with 5 tools
6. Generated comprehensive configuration examples

**Outputs:**
- Total: 68+ tools
- Complete categorization
- Multiple wildcard patterns
- Diverse configuration examples
- Preset patterns for common agent types

---

## Task Parameters

### Output Format Options

- **markdown** (default): Human-readable formatted output
- **json**: Machine-readable JSON structure
- **yaml**: Configuration-friendly YAML format

### Filtering Options

- **category**: Filter by tool category (built-in, mcp, custom, plugin)
- **server**: Show tools from specific MCP server only
- **includeDescriptions**: Include tool descriptions (default: true)

### Verbosity Options

- **summary**: Tool counts only
- **standard** (default): Tools with descriptions
- **detailed**: Tools with descriptions, examples, and configuration patterns

## Maintenance

### Review Triggers

- New MCP servers added to configuration
- Built-in tools updated in OpenCode releases
- Custom tools added or modified
- Plugins installed or updated
- Tool availability changes

### Update Process

1. Review task when OpenCode version updates
2. Verify built-in tool list matches current version
3. Update tool count expectations
4. Refresh configuration examples
5. Update tool descriptions if changed

## References

- **Built-in Tools**: `.opencode/knowledge-base/opencode-tools-reference.md`
- **Agent Configuration**: `.opencode/knowledge-base/agent-configuration-reference.md`
- **MCP Servers**: https://opencode.ai/docs/mcp-servers/
- **Custom Tools**: https://opencode.ai/docs/custom-tools/
- **Plugin Architecture**: `.opencode/knowledge-base/plugin-architecture.md`
- **Official Tools Docs**: https://opencode.ai/docs/tools/
```
