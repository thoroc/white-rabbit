# OpenCode Builder Quick Reference

Quick guide for using the `/build` command to create OpenCode resources.

## Usage

```bash
# For agents and commands, use specialized commands:
/create-agent [description of agent to create]
/create-command [description of command to create]

# For tasks, checklists, knowledge bases, and templates, use @ mention:
@opencode Create a checklist for API design validation
@opencode Create a knowledge base for Docker best practices
@opencode Create a task for security audits
@opencode Create a template for database configuration
```

## What You Can Build

### 1. Agents

**Purpose**: Specialized AI assistants for specific tasks

**When to create**:

- Need specialized expertise (documentation, security, DevOps)
- Want focused behavior and tool access
- Building workflow-specific assistants
- Need @ mentionable subagents

**Example**:

```bash
/build Create a security audit agent that reviews code for vulnerabilities
```

**What you specify**:

- Agent purpose and focus areas
- Required capabilities (code analysis, file operations, etc.)
- Mode (subagent for specialized, all for versatile)
- Related resources needed (checklists, knowledge bases)

---

### 2. Commands

**Purpose**: Slash commands for common workflows

**When to create**:

- Repetitive tasks that need automation
- Workflows combining multiple steps
- Context-dependent operations
- Team standardization needs

**Example**:

```bash
/build Create a command to run security scans and generate reports
```

**What you specify**:

- Command purpose
- Required context (files, shell output, etc.)
- Processing steps
- Output format

---

### 3. Tasks

**Purpose**: Reusable workflow definitions for complex processes

**When to create**:

- Multi-step processes needing standardization
- Analysis workflows with specific outputs
- Repeatable procedures with validation
- Complex operations requiring structure

**Example**:

```bash
/build Create a task for comprehensive security audits with reporting
```

**What you specify**:

- Task objectives
- Input requirements
- Sequential steps with tools
- Success criteria
- Expected outputs

---

### 4. Checklists

**Purpose**: Comprehensive validation and quality standards

**When to create**:

- Quality assurance needs
- Compliance validation
- Process verification
- Standards enforcement

**Example**:

```bash
/build Create a checklist for API design quality validation
```

**What you specify**:

- Validation purpose
- Coverage areas
- Quality standards
- Item organization
- Target size (quick: 15-30, standard: 40-80, comprehensive: 100-200)

---

### 5. Knowledge Bases

**Purpose**: Patterns, best practices, and reference documentation

**When to create**:

- Documenting proven patterns
- Capturing best practices
- Creating reference guides
- Sharing team knowledge

**Example**:

```bash
/build Create a knowledge base for Docker best practices and common patterns
```

**What you specify**:

- Topic scope
- Core concepts to cover
- Common patterns to document
- Examples to include
- Best practices vs anti-patterns

---

### 6. Templates

**Purpose**: Standard structures for resource types

**When to create**:

- Defining configuration formats
- Establishing structure standards
- Creating reusable patterns
- Standardizing documentation
- Need validation frameworks

**Example**:

```bash
/build Create a template for database connection configurations
```

**What you specify**:

- Resource type to structure
- Required vs optional components
- Configuration options
- Common patterns
- Size target (250-300 lines)
- Integration points

---

## Builder Process

The OpenCode builder follows this process:

### 1. Requirements Gathering

- Asks clarifying questions
- Understands purpose and scope
- Identifies target users
- Determines integration needs

### 2. Template Review

- Reads appropriate template
- Reviews similar examples
- Understands structure requirements

### 3. Resource Creation

- Follows template structure
- Includes all required sections
- Adds working examples
- Creates cross-references

### 4. Validation

- Checks against template
- Verifies completeness
- Tests examples
- Validates integration

### 5. Delivery

- Creates complete resource
- Explains usage
- Documents integration points
- Provides next steps

---

## Quick Examples

### Create Documentation Agent

```bash
/create-agent Create an agent specialized in API documentation that uses OpenAPI specs
```

### Create Testing Command

```bash
/create-command Create a command to run tests, analyze coverage, and identify gaps
```

### Create Code Review Task

```bash
/build Create a task for systematic code review covering security, performance, and maintainability
```

### Create Deployment Checklist

```bash
/build Create a comprehensive checklist for production deployment validation
```

### Create CI/CD Knowledge Base

```bash
/build Create a knowledge base for GitHub Actions workflows with reusable patterns
```

---

## Tips for Better Results

### Be Specific

❌ "Create a documentation agent"
✅ "Create an agent for API documentation that analyzes OpenAPI specs and generates reference docs"

### Mention Context

❌ "Create a testing command"
✅ "Create a command to run Jest tests, analyze coverage reports, and suggest missing test cases"

### Specify Scope

❌ "Create a security checklist"
✅ "Create a comprehensive security checklist for web API deployments covering authentication, authorization, and data protection"

### Include Examples

❌ "Create a Docker knowledge base"
✅ "Create a Docker knowledge base with patterns for multi-stage builds, layer optimization, and common troubleshooting scenarios"

---

## Resource Sizes

### Agents

- System prompt: 100-300 lines
- Includes: resource references, workflows, examples
- Configuration: mode, temperature, tools, permissions

### Commands

- Typical: 50-150 lines
- Includes: context gathering, instructions, resource references
- Uses: shell commands, file references, template variables

### Tasks

- Standard: 200-400 lines
- Sections: 8-12 major sections
- Steps: 3-7 execution steps
- Examples: 2-3 complete scenarios

### Checklists

- Quick: 15-30 items (3-5 sections)
- Standard: 40-80 items (6-10 sections)
- Comprehensive: 100-200 items (10-15 sections)
- Exhaustive: 200+ items (12-20 sections)

### Knowledge Bases

- Core concepts: 2-4 with examples
- Common patterns: 3-5 with implementations
- Examples: 2-3 complete working scenarios
- Sections: 8-12 major sections

---

## Templates Referenced

All resources follow these OpenCode-specific templates:

- **Agents**: `template/opencode-agent-tmpl.yaml`
- **Commands**: `template/opencode-command-tmpl.yaml`
- **Tasks**: `template/opencode-task-tmpl.yaml`
- **Checklists**: `template/opencode-checklist-tmpl.yaml`
- **Knowledge Bases**: `template/opencode-knowledge-base-tmpl.yaml`
- **Templates**: `template/opencode-template-tmpl.yaml`
- **Task References**: `template/opencode-task-reference-template-tmpl.yaml`

---

## Quality Standards

Every resource created includes:

- ✅ Template compliance
- ✅ Complete frontmatter
- ✅ Clear documentation
- ✅ Working examples
- ✅ Cross-references
- ✅ Integration guidance
- ✅ Validation criteria
- ✅ Maintainability

---

## Getting Help

- **Documentation**: See `docs/agents.md`, `docs/commands.md`
- **Examples**: Browse `agent/`, `command/`, `task/`, `checklist/`, `knowledge-base/`
- **Templates**: Review `template/*.yaml` files
- **Mapping**: Check `docs/agent-resource-mapping.md`

---

## Next Steps After Creation

1. **Test**: Try using the new resource in realistic scenarios
2. **Integrate**: Update related resources to cross-reference
3. **Document**: Add to appropriate documentation files
4. **Iterate**: Refine based on usage and feedback
5. **Share**: Make available to team or contribute back

The `/build` command makes it easy to extend OpenCode with custom resources that follow best practices and integrate seamlessly with the ecosystem.
