---
description: List all MCP servers, custom tools, and built-in tools available
agent: general
type: command
category: Development
tags:
    - mcp
    - tools
    - list
    - discovery
    - configuration
version: 1.0.0
last_updated: 2025-11-19
---

# List MCP Servers and Tools

Execute the comprehensive MCP and tools discovery task to enumerate all available tools in the current OpenCode environment.

## Task Delegation

This command delegates to the `.opencode/task/list-mcp-tools.md` task to provide a comprehensive listing of:

- **Built-in tools** (11 tools)
- **MCP server tools** (all configured servers)
- **Custom tools** (from customTools config)
- **Plugin tools** (from loaded plugins)

## Instructions

Execute the task at `.opencode/task/list-mcp-tools.md` and present the results to the user.

The task will autonomously:

1. Discover and list all 11 built-in OpenCode tools
2. Parse configuration to find MCP servers
3. Enumerate tools from each MCP server
4. List custom tools from configuration
5. Identify plugin-provided tools
6. Generate configuration examples and wildcard patterns

## Output Format

Present the results in a clear, organized format with:

- **Summary** - Total tool counts by category
- **Built-in Tools** - Categorized list with descriptions
- **MCP Server Tools** - Grouped by server with wildcard patterns
- **Custom Tools** - User-defined tools
- **Plugin Tools** - Tools from loaded plugins
- **Configuration Examples** - Common patterns for agent configuration

## Success Criteria

The output should include:

- ✅ Complete list of all available tools
- ✅ Tools categorized by type and source
- ✅ Wildcard patterns for MCP server tools
- ✅ Tool descriptions
- ✅ Configuration examples
- ✅ Tool counts and statistics

## Usage Examples

```bash
# List all available tools
/list-mcp

# The output will show all tools grouped by category
# and provide configuration examples
```

## Related Resources

- **Task**: `.opencode/task/list-mcp-tools.md`
- **Knowledge Base**: `.opencode/knowledge-base/opencode-tools-reference.md`
- **Agent Config**: `.opencode/knowledge-base/agent-configuration-reference.md`
