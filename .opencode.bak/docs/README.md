# OpenCode Documentation Index

Welcome to the OpenCode configuration documentation. This repository contains agents, commands, knowledge bases, checklists, and templates for extending OpenCode functionality.

## Quick Navigation

- **[Agents Reference](agents.md)** - All available specialized AI agents
- **[Commands Reference](commands.md)** - All available slash commands
- **[Builder Quick Reference](builder-quick-reference.md)** - Create new agents, commands, tasks, checklists, and knowledge bases
- **Existing Guides**:
  - [AI Tool Approval System](ai-tool-approval-system-summary.md)
  - [AI Tool Review Guide](ai-tool-review-guide.md)
  - [JIRA Ticket Creation System](jira-ticket-creation-system.md)
  - [JIRA Quick Reference](jira-ticket-quick-reference.md)

## What's in This Repository

This OpenCode configuration directory contains:

```
.config/opencode/
├── agent/              # Specialized AI agents
├── command/            # Slash commands for workflows
├── checklist/          # Comprehensive requirement checklists
├── knowledge-base/     # Reusable patterns and best practices
├── template/           # Standard document templates
├── task/              # Automated analysis tasks
├── data/              # Reference data and guides
└── docs/              # This documentation
```

### Directory Architecture Principle

**IMPORTANT**: There is a critical distinction between documentation types:

- **`docs/`** - System documentation (how OpenCode works)
  - ❌ NEVER referenced by runtime resources (agents, tasks, commands)
  - ✅ Documentation FOR humans ABOUT the OpenCode system
  - Examples: `docs/README.md`, `docs/agents.md`, `docs/commands.md`

- **`knowledge-base/`** - Domain knowledge (patterns, best practices)
  - ✅ Referenced by runtime resources as `@knowledge-base/*.md`
  - ✅ Knowledge FOR AI agents to reference when working
  - Examples: `pipeline-best-practices.md`, `mermaid-diagrams.md`

- **External docs** - Official OpenCode documentation
  - ✅ Referenced via URLs: `https://opencode.ai/docs/agents/`
  - ✅ Always use external URLs, never local `docs/` paths

**Valid references in runtime resources:**

```yaml
# ✅ Correct
resources:
  - "@knowledge-base/pipeline-best-practices.md"
  - "@template/jira-ticket-description-tmpl.yaml"
  - "@checklist/api-documentation.md"
  - "https://opencode.ai/docs/agents/"

# ❌ Incorrect
resources:
  - "@docs/agents.md"           # docs/ is system documentation
  - "docs/architecture.md"       # Never reference local docs/
```

**Note**: References to `./docs/*.md` as OUTPUT locations (where files will be CREATED) are correct - this principle applies only to INPUT references.

## Core Concepts

### Agents

Agents are specialized AI assistants configured for specific tasks. Each agent has:

- Specific capabilities and tools
- Configured temperature for response style
- Permission controls
- Integration with external systems

**Available Agents**: See [Agents Reference](agents.md)

### Commands

Commands are slash commands (e.g., `/api-docs`) that execute specialized workflows. They:

- Can use specific agents
- Accept optional arguments
- Follow standard output conventions
- Can be composed together

**Available Commands**: See [Commands Reference](commands.md)

### Checklists

Comprehensive requirement lists ensuring complete coverage:

- API Documentation (150+ items)
- Architecture Documentation (161+ items)
- Development Documentation (181+ items)
- Deployment Documentation (183+ items)
- Onboarding Documentation (150+ items)
- JIRA Ticket Creation (comprehensive)
- AI Tool Approval (detailed criteria)
- OpenCode Agent Configuration (625+ items)
- OpenCode Command Configuration (829+ items)

### Knowledge Base

Reusable patterns, best practices, and reference materials:

- Acceptance criteria patterns
- MoSCoW prioritization guide
- Mermaid diagram templates
- Pipeline best practices
- GitHub Actions templates
- GitLab CI examples
- Jenkins patterns
- AI tool approval patterns

### Templates

Standard document structures:

- JIRA ticket descriptions (Story, Bug, Task, Epic)
- AI tool RFC submission
- AI tool assessment report
- Standard documentation structure
- Task reference template

### Tasks

Automated analysis for efficient codebase understanding:

- Technology detection (languages, frameworks, tools)
- Infrastructure analysis (databases, messaging, monitoring)
- Deployment strategy (containers, CI/CD, cloud platforms)
- Pipeline architect (CI/CD configuration generation)
- AI tool approval research (automated tool evaluation)
- OpenCode resource creation (agents, commands, tasks, checklists, knowledge bases)

## Common Workflows

### Documentation Generation

1. **Quick single document**:

   ```bash
   /document
   ```

2. **Comprehensive suite**:

   ```bash
   /documentalist
   ```

3. **Specific documentation type**:

   ```bash
   /api-docs
   /arch-docs
   /deploy-docs
   ```

4. **With strict standards**:

   ```bash
   /generate-docs-strict
   ```

### JIRA Ticket Creation

1. **Create new ticket**:

   ```bash
   /create-ticket
   ```

2. **Follows process**:
   - Information gathering
   - MoSCoW prioritization
   - Acceptance criteria
   - Quality validation

### Development Workflows

1. **Commit changes**:

   ```bash
   /commit
   ```

2. **Enhance prompts**:

   ```bash
   /feature [basic prompt]
   /refine-prompt [prompt to improve]
   ```

### Tool Evaluation

1. **Review AI tools**:

   ```bash
   /review-tool [tool-name]
   ```

2. **Comprehensive assessment** per RFC 98

## Getting Started

### For New Users

1. **Understand available resources**: Browse this index
2. **Review agents**: Check [Agents Reference](agents.md) for specialized capabilities
3. **Learn commands**: Read [Commands Reference](commands.md) for available workflows
4. **Try a simple command**: Start with `/hello-world` or `/docs-help`

### For Documentation Needs

1. **Check existing docs**: `/docs-help`
2. **Choose approach**:
   - Quick: `/document`
   - Comprehensive: `/documentalist`
   - Specific type: `/api-docs`, `/arch-docs`, etc.
3. **Review output**: Commands update existing docs when found
4. **Enhance as needed**: Refine generated documentation

### For JIRA Ticket Creation

1. **Start command**: `/create-ticket`
2. **Follow guided process**: Answer questions about type, requirements
3. **Apply MoSCoW**: Identify Must/Should/Could/Won't Have
4. **Review acceptance criteria**: Ensure testable and clear
5. **Paste into JIRA**: Copy formatted output

### For Tool Evaluation

1. **Initiate review**: `/review-tool [tool-name]`
2. **Provide information**: Answer questions about tool
3. **Review assessment**: Check privacy, security, compliance analysis
4. **Submit to RFC**: Use generated submission document

## Resource Loading Strategy

OpenCode uses **lazy loading** to avoid unnecessary context usage:

1. **Lightweight analysis first**: Shell commands for quick assessment
2. **Load checklists only when needed**: Specific documentation work
3. **Task-based detection**: Comprehensive analysis when required
4. **Knowledge base on demand**: Load patterns when creating specific content

**Reference**: `.opencode/knowledge-base/loading-strategy.md`

## Extending OpenCode

### Using the Builder Agent (Recommended)

The easiest way to create new OpenCode resources is using the specialized builder commands:

```bash
# Create agents
/create-agent Create a security audit agent that reviews code for vulnerabilities

# Create commands
/create-command Create a command to run tests and analyze coverage
```

For tasks, checklists, or knowledge bases, invoke the opencode builder agent directly with @ mention:

```bash
@opencode Create a checklist for API design validation
@opencode Create a knowledge base for Docker best practices
@opencode Create a task for security audits
```

**Benefits**:

- Automatically follows templates
- Includes all required sections
- Creates proper cross-references
- Validates against standards
- Integrates with ecosystem

**See**: [Builder Quick Reference](builder-quick-reference.md) for detailed usage

### Creating Resources Manually

#### Creating a New Agent

1. Create file in `agent/` directory
2. Add frontmatter with description, mode, temperature, tools
3. Write comprehensive instructions
4. Define capabilities and workflows
5. Test with realistic scenarios

**Example**: See `agent/documentalist.md` or use `/build`

#### Creating a New Command

1. Create file in `command/` directory
2. Add frontmatter with description, agent, subtask flag
3. Write instructions and usage examples
4. Reference relevant checklists, templates, knowledge base
5. Test command execution

**Example**: See `command/api-docs.md` or use `/build`

#### Creating a New Checklist

1. Create file in `checklist/` directory
2. Organize by sections with ✅ items
3. Include quality criteria
4. Add specialized sections for different project types
5. Document review criteria

**Example**: See `checklist/api-documentation.md` or use `/build`

#### Adding to Knowledge Base

1. Create file in `knowledge-base/` directory
2. Focus on reusable patterns and best practices
3. Include examples and templates
4. Link to related resources
5. Keep content evergreen

**Example**: See `knowledge-base/mermaid-diagrams.md` or use `/build`

## Best Practices

### Using Agents

1. **Choose the right agent**: Match capabilities to task
2. **Provide context**: Include necessary information upfront
3. **Understand temperature**: Low for deterministic, higher for creative
4. **Review outputs**: Agents provide starting points, refine as needed
5. **Check permissions**: Verify agent has required tool access

### Using Commands

1. **Start with help**: Use `/docs-help` to understand options
2. **Use specific commands**: Target exactly what you need
3. **Provide arguments**: Focus output with optional arguments
4. **Check for existing docs**: Commands update rather than duplicate
5. **Combine commands**: Use multiple for comprehensive coverage

### Resource Management

1. **Lazy load**: Don't load all resources upfront
2. **Check before loading**: Use lightweight analysis first
3. **Load checklists when working**: Active documentation work only
4. **Use tasks efficiently**: Comprehensive analysis when needed
5. **Cache results**: Reuse analysis when possible

### Documentation Standards

1. **Use Mermaid for diagrams**: All visual documentation
2. **Follow structure templates**: Standard document organization
3. **Update existing files**: Don't create duplicates
4. **Output to ./docs/**: Standard location except README
5. **Include table of contents**: For longer documents

## Integration Points

### JIRA/Confluence

- **Atlassian agent**: Fetch data, create tickets, analyze issues
- **Environment variables**: Required for API access
- **MCP integration**: Atlassian MCP for API calls

### GitLab

- **GitLab MCP**: File operations, repository management
- **Environment variables**: GITLAB_API_URL, GITLAB_PERSONAL_ACCESS_TOKEN
- **Integration**: Used by multiple agents

### Version Control

- **Git support**: Native git operations
- **Jujutsu support**: Modern VCS alternative
- **Colocated support**: Both git and jujutsu together

### CI/CD Platforms

- **GitLab CI**: Pipeline configuration and optimization
- **GitHub Actions**: Workflow templates and patterns
- **Jenkins**: Scripted pipeline design and audit
- **Multi-platform**: Azure DevOps, CircleCI, etc.

## Troubleshooting

### Command Not Found

- Verify command name (check `command/` directory)
- Ensure proper syntax: `/command-name`
- Check if command is marked as subtask

### Agent Not Available

- Verify agent file exists in `agent/` directory
- Check agent configuration in command frontmatter
- Ensure required tools are available

### Missing Environment Variables

- Check agent requirements
- Set required variables:
  - JIRA: `JIRA_API_TOKEN`, `JIRA_URL`, `JIRA_USERNAME`
  - Confluence: `CONFLUENCE_API_TOKEN`, `CONFLUENCE_URL`, `CONFLUENCE_USERNAME`
  - GitLab: `GITLAB_API_URL`, `GITLAB_PERSONAL_ACCESS_TOKEN`

### Documentation Not Generated

- Check for existing documentation first
- Verify output directory permissions
- Review command logs for errors
- Ensure required checklists are accessible

## Additional Resources

### External Documentation

- [OpenCode Official Docs](https://opencode.ai/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Mermaid Diagram Syntax](https://mermaid.js.org/)
- [MoSCoW Prioritization](https://en.wikipedia.org/wiki/MoSCoW_method)

### Internal References

- `data/conventional-commits.md` - Commit message standards
- `data/opencode-plugin-development-guide.md` - Plugin development
- Sessions summaries in `.sessions/`

## Contributing

To contribute to this OpenCode configuration:

1. **Add new agents**: Create specialized agents for new domains
2. **Create commands**: Build workflows for common tasks
3. **Expand checklists**: Add comprehensive requirements
4. **Share patterns**: Contribute to knowledge base
5. **Improve documentation**: Keep this index current

## Version Information

This documentation reflects the OpenCode configuration as of the latest update. The configuration is continuously evolving with new agents, commands, and best practices.

For the most current information:

- Check file modification dates
- Review recent session summaries
- Test commands in your environment

## Quick Reference

### Most Used Commands

```bash
/create-agent         # Create specialized agents
/create-command       # Create slash commands
/document             # Quick documentation
/api-docs             # API documentation
/arch-docs            # Architecture docs
/commit               # Conventional commit
/create-ticket        # JIRA ticket creation
/docs-help            # Documentation help
```

### Most Used Agents

- **opencode**: Builder for creating new agents, commands, tasks, checklists, knowledge bases
- **documentalist**: Comprehensive documentation
- **atlassian**: JIRA/Confluence operations
- **pipeline-architect**: CI/CD pipeline design
- **ai-tool-reviewer**: Tool evaluation

### Key Directories

- `agent/` - 8 specialized agents (including opencode builder)
- `command/` - 23 slash commands (including /create-agent, /create-command)
- `checklist/` - 9 comprehensive checklists (including opencode-agent, opencode-command)
- `knowledge-base/` - 11 best practice guides
- `template/` - 12 templates (7 OpenCode-specific templates for builder)
- `task/` - 11 tasks (5 analysis tasks + 6 creation tasks: agent, command, checklist, task, knowledge-base, template)
- `docs/` - You are here

## Support

For issues or questions:

- Review this documentation
- Check command-specific help
- Review agent descriptions
- Consult knowledge base
- Check session summaries in `.sessions/`

---

**Last Updated**: 2025-11-11  
**Configuration Version**: Current working directory setup
