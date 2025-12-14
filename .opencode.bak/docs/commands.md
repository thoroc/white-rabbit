# OpenCode Commands Reference

This document provides comprehensive documentation for all available OpenCode commands.

## Table of Contents

- [Overview](#overview)
- [Documentation Commands](#documentation-commands)
- [Development Commands](#development-commands)
- [JIRA/Atlassian Commands](#jiraatlassian-commands)
- [Session Management Commands](#session-management-commands)
- [Utility Commands](#utility-commands)
- [Command Usage Guide](#command-usage-guide)

## Overview

OpenCode commands are slash commands (prefixed with `/`) that execute specialized tasks. Each command:

- Has a clear description of its purpose
- May use a specific agent (general, documentalist, atlassian, etc.)
- Can be marked as a subtask (used by other commands)
- Can accept arguments for customization

### Command Format

```
/command-name [optional arguments]
```

### Command Types

- **Documentation Commands**: Generate various types of project documentation
- **Development Commands**: Support development workflows
- **JIRA Commands**: Interact with JIRA and Confluence
- **Session Commands**: Manage OpenCode sessions
- **Utility Commands**: Helper and convenience commands

## Documentation Commands

### `/document`

**Description**: Generate quick project documentation (lightweight, general agent)

**Agent**: general  
**Subtask**: No

**Purpose**: Create quick, lightweight project documentation using the general agent. Ideal for rapid documentation
generation without overhead of specialized agents.

**Usage**:

```bash
/document
/document Focus on API endpoints and authentication
```

**When to Use**:

- Quick documentation turnaround needed
- Single document generation (typically README.md)
- Lightweight analysis is sufficient
- Don't need comprehensive multi-document suites

**Output**: README.md or updates to existing documentation

**Related**: For comprehensive documentation suites, use `/documentalist` instead

---

### `/documentalist`

**Description**: Generate comprehensive documentation suites with quality review

**Agent**: documentalist (specialized)  
**Subtask**: No

**Purpose**: Orchestrate creation of complete documentation suites using the documentalist agent for quality and
consistency.

**Usage**:

```bash
/documentalist
/documentalist Include microservices architecture details
```

**When to Use**:

- Complete documentation suites needed
- Quality review and consistency important
- Professional, production-ready docs required
- Multiple documentation types needed

**Output**: Multiple documentation files in `./docs/` directory

**Features**:

- Uses specialized documentalist agent
- Orchestrates multiple documentation commands
- Quality review built-in
- Comprehensive coverage

---

### `/generate-docs-strict`

**Description**: Complete documentation suite with strict formatting standards

**Agent**: documentalist  
**Subtask**: No

**Purpose**: Generate all documentation types with strict adherence to checklists and formatting standards.

**Usage**:

```bash
/generate-docs-strict
```

**When to Use**:

- Strict formatting standards required
- All documentation types needed
- Comprehensive coverage with exact checklist adherence
- Enterprise-grade documentation

**Output**: Complete documentation suite (API, architecture, deployment, development, onboarding)

**Includes**:

- API documentation
- Architecture documentation
- Deployment documentation
- Development documentation
- Onboarding documentation
- Full checklist compliance

---

### `/api-docs`

**Description**: Generate API documentation for the project

**Agent**: general  
**Subtask**: Yes (used by other commands)

**Purpose**: Create comprehensive API documentation by analyzing endpoints, functions, and interfaces.

**Usage**:

```bash
/api-docs
/api-docs Focus on REST APIs and authentication patterns
```

**Checklist**: `.opencode/checklist/api-documentation.md` (150+ requirements)

**Focus Areas**:

- REST API endpoints and HTTP methods
- Function/Lambda APIs
- Database operations
- External service integrations
- Error handling
- Authentication and authorization
- Request/response schemas
- Rate limiting

**Output**: `./docs/api.md` (or updates existing API documentation)

---

### `/arch-docs`

**Description**: Generate architecture documentation for the project

**Agent**: general  
**Subtask**: Yes

**Purpose**: Create comprehensive architecture documentation with system diagrams and design patterns.

**Usage**:

```bash
/arch-docs
/arch-docs Include microservices architecture and data flow diagrams
```

**Checklist**: `.opencode/checklist/architecture-documentation.md` (161+ requirements)

**Focus Areas**:

- System architecture patterns
- Data architecture and storage
- API architecture
- Deployment infrastructure
- Security architecture
- Monitoring and observability
- Integration patterns
- Scalability and performance

**Output**: `./docs/architecture.md` (or updates existing)

**Diagram Requirements**: All diagrams must use Mermaid syntax

---

### `/deploy-docs`

**Description**: Generate deployment and operational documentation

**Agent**: general  
**Subtask**: Yes

**Purpose**: Create deployment procedures, environment management, and maintenance operations documentation.

**Usage**:

```bash
/deploy-docs
/deploy-docs Focus on container deployment and CI/CD pipelines
```

**Checklist**: `.opencode/checklist/deployment-documentation.md` (183+ requirements)

**Focus Areas**:

- Deployment procedures
- Environment configuration
- CI/CD pipelines
- Infrastructure setup
- Rollback procedures
- Monitoring and alerts
- Disaster recovery
- Maintenance operations

**Output**: `./docs/deployment.md` (or updates existing)

---

### `/dev-docs`

**Description**: Generate development setup and workflow documentation

**Agent**: general  
**Subtask**: Yes

**Purpose**: Document development environment setup, workflows, and contribution guidelines.

**Usage**:

```bash
/dev-docs
/dev-docs Focus on testing frameworks and debugging
```

**Checklist**: `.opencode/checklist/development-documentation.md` (181+ requirements)

**Focus Areas**:

- Environment setup
- Dependencies and prerequisites
- Build and run instructions
- Testing strategies
- Debugging procedures
- Code organization
- Development workflows
- Contribution guidelines

**Output**: `./docs/development.md` (or updates existing)

---

### `/pipeline-docs`

**Description**: Generate CI/CD pipeline documentation

**Agent**: general  
**Subtask**: Yes

**Purpose**: Document CI/CD pipeline configurations, stages, and troubleshooting.

**Usage**:

```bash
/pipeline-docs
/pipeline-docs Focus on Jenkins pipeline stages
```

**Focus Areas**:

- Pipeline stages and jobs
- Build configuration
- Test automation
- Deployment pipelines
- Environment promotion
- Troubleshooting
- Performance optimization
- Security scanning

**Output**: `./docs/pipeline.md` (or updates existing)

---

### `/onboard-docs`

**Description**: Generate new team member onboarding documentation

**Agent**: general  
**Subtask**: Yes

**Purpose**: Create comprehensive onboarding guide for new team members.

**Usage**:

```bash
/onboard-docs
/onboard-docs Focus on first week tasks and quick start
```

**Checklist**: `.opencode/checklist/onboarding-documentation.md` (150+ requirements)

**Focus Areas**:

- Getting started guide
- First day/week tasks
- Team structure and contacts
- Development environment setup
- Code walkthrough
- Key concepts and terminology
- Resources and references
- FAQ

**Output**: `./docs/onboarding.md` (or updates existing)

---

### `/docs-help`

**Description**: Documentation directory structure and command overview

**Agent**: general  
**Subtask**: No

**Purpose**: Display documentation system overview, available commands, and directory structure.

**Usage**:

```bash
/docs-help
```

**Provides**:

- List of all documentation commands
- Current documentation structure
- Command selection guidance
- Resource loading strategy
- Best practices

---

## Development Commands

### `/commit`

**Description**: Stage and commit changes with conventional commit message

**Agent**: general  
**Subtask**: No

**Purpose**: Automatically stage changes and create a conventional commit message following best practices.

**Usage**:

```bash
/commit
```

**Features**:

- Detects version control system (Git, Jujutsu, colocated)
- Shows current status
- Analyzes changes
- Generates conventional commit message
- Executes commit

**VCS Support**:

- Git only (`.git`)
- Jujutsu only (`.jj`)
- Jujutsu colocated (both `.git` and `.jj`)

**Commit Format**: Follows [Conventional Commits](https://www.conventionalcommits.org/)

**Reference**: `../data/conventional-commits.md`

---

### `/feature`

**Description**: Refine and enhance a user prompt for LLMs

**Agent**: plan  
**Subtask**: No

**Purpose**: Transform basic prompts into detailed, precise, and actionable prompts with structure, context, and quality
standards.

**Usage**:

```bash
/feature Create a user registration system
```

**Process**:

1. Preserves original intent
2. Clarifies objectives
3. Adds context and assumptions
4. Specifies format and constraints
5. Defines acceptance criteria

**Output Structure**:

- Title
- Goal
- Context
- Inputs
- Deliverables
- Constraints & Limitations
- Quality Standards
- Style & Tone
- Clarifying Questions
- Example Output
- "Do not do" list

**Quality Checklist**: Validates goal matches intent, deliverables are concrete, criteria are measurable

---

### `/refine-prompt`

**Description**: Enhance and improve prompts using structured methodology

**Agent**: prompt-enhancer-expert  
**Subtask**: No

**Purpose**: Use multi-agent collaboration and brainstorming methodologies to enhance prompts.

**Usage**:

```bash
/refine-prompt [original prompt]
```

**Features**:

- Evaluates prompt quality (1-10 score)
- Deploys four specialized agents
- Applies brainstorming methodologies
- Iterative refinement
- Quality validation

**Methodologies**:

- Mind Mapping
- Six Thinking Hats
- SCAMPER

**Output**: Enhanced prompt with justification or improvement suggestions

---

### `/limit-scope`

**Description**: Limit the scope of work based on project constraints

**Agent**: general  
**Subtask**: No

**Purpose**: Help define realistic scope boundaries for projects or features.

**Usage**:

```bash
/limit-scope
```

---

## JIRA/Atlassian Commands

### `/create-ticket`

**Description**: Create a new JIRA ticket with standardized templates

**Agent**: atlassian  
**Subtask**: No

**Purpose**: Guide users through creating well-structured JIRA tickets with MoSCoW prioritization and acceptance
criteria.

**Usage**:

```bash
/create-ticket
```

**Process**:

1. Initial information gathering (type, project, description)
2. Deep dive based on ticket type
3. Apply MoSCoW prioritization
4. Write acceptance criteria
5. Add technical details
6. Identify dependencies
7. Review with checklist
8. Generate final description
9. Present to user
10. Provide post-creation guidance

**Resources Used**:

- `knowledge-base/moscow-prioritization.md`
- `knowledge-base/acceptance-criteria.md`
- `checklist/jira-ticket-creation.md`
- `template/jira-ticket-description.md`

**Ticket Types Supported**:

- User Stories
- Bugs
- Tasks
- Epics

**Features**:

- MoSCoW prioritization
- Testable acceptance criteria
- Template-based descriptions
- Quality validation
- Stakeholder identification

**Output**: Complete formatted ticket ready to paste into JIRA

---

## Session Management Commands

### `/list-sessions`

**Description**: List all available OpenCode sessions

**Agent**: general  
**Subtask**: No

**Purpose**: Display list of all sessions with metadata for selection or review.

**Usage**:

```bash
/list-sessions
```

---

### `/save-session`

**Description**: Save current OpenCode session with summary

**Agent**: general  
**Subtask**: No

**Purpose**: Save the current session state and create a summary for future reference.

**Usage**:

```bash
/save-session
```

---

### `/resume-session`

**Description**: Resume a previously saved OpenCode session

**Agent**: general  
**Subtask**: No

**Purpose**: Load and continue working with a previously saved session.

**Usage**:

```bash
/resume-session [session-id]
```

---

### `/update-session`

**Description**: Update metadata or summary of current session

**Agent**: general  
**Subtask**: No

**Purpose**: Modify session information without ending the session.

**Usage**:

```bash
/update-session
```

---

## Utility Commands

### `/hello-world`

**Description**: Simple test command that displays a greeting

**Agent**: general  
**Subtask**: No

**Purpose**: Test command to verify command system is working correctly.

**Usage**:

```bash
/hello-world
```

**Output**: "Hello, World!" message

---

### `/review-tool`

**Description**: Review AI tools and open source software for approval

**Agent**: ai-tool-reviewer  
**Subtask**: No

**Purpose**: Conduct comprehensive evaluation of tools per RFC 98 approval process.

**Usage**:

```bash
/review-tool [tool-name]
```

**Evaluation Areas**:

- Data privacy and security
- Compliance and legal
- Security assessment
- Operational considerations

**Output**: Structured approval request with risk assessment

---

## Command Usage Guide

### How to Use Commands

1. **In OpenCode CLI**:

    ```bash
    opencode /command-name
    opencode /command-name with arguments
    ```

2. **In Chat Interface**:

    ```
    /command-name
    /command-name with specific focus areas
    ```

### Command Selection Decision Tree

```
Need documentation?
├─ Quick single doc → /document
├─ Complete suite → /documentalist
├─ Strict standards → /generate-docs-strict
└─ Specific type
   ├─ API → /api-docs
   ├─ Architecture → /arch-docs
   ├─ Deployment → /deploy-docs
   ├─ Development → /dev-docs
   ├─ Pipeline → /pipeline-docs
   └─ Onboarding → /onboard-docs

Need JIRA help?
└─ Create ticket → /create-ticket

Need development help?
├─ Commit changes → /commit
├─ Refine prompt → /feature or /refine-prompt
└─ Scope definition → /limit-scope

Need session management?
├─ List sessions → /list-sessions
├─ Save current → /save-session
├─ Resume previous → /resume-session
└─ Update current → /update-session

Need tool review?
└─ Evaluate tool → /review-tool
```

### Best Practices

1. **Use Specific Commands**: Choose targeted commands over general ones when possible
2. **Provide Context**: Add arguments to focus the command output
3. **Check Existing Docs**: Commands update existing files rather than creating duplicates
4. **Follow Output Locations**: Commands use standard locations (./docs/ directory)
5. **Review Generated Content**: Always review and refine command outputs
6. **Combine Commands**: Use multiple commands for comprehensive coverage

### Command Arguments

Most commands accept optional arguments to focus their output:

```bash
# Without arguments - generates complete documentation
/api-docs

# With arguments - focuses on specific aspects
/api-docs Focus on REST APIs and authentication patterns
```

### Efficiency Tips

1. **Start with /docs-help**: Understand available commands and structure
2. **Use subtasks commands directly**: `/api-docs`, `/arch-docs`, etc. for specific needs
3. **Leverage orchestration**: `/documentalist` for complete suites with review
4. **Apply strict standards**: `/generate-docs-strict` for enterprise requirements
5. **Update, don't duplicate**: Commands automatically update existing documentation

### Resource Management

Commands use lazy loading strategy:

- **Lightweight analysis first**: Shell commands for quick assessment
- **Load checklists only when needed**: Avoid unnecessary context usage
- **Task-based detection**: Use detection tasks for comprehensive analysis
- **Knowledge base on demand**: Load diagram templates and patterns when creating visuals

### Output Conventions

All documentation commands follow these conventions:

- **Main project docs**: `./docs/` directory
- **README**: Project root (`./README.md`)
- **File naming**: Lowercase with `.md` extension
- **Diagram format**: Mermaid syntax only
- **Update existing**: Preserve and enhance existing documentation
- **Standard structure**: Follow templates and checklists

## Creating Custom Commands

To create a new command:

1. Create markdown file in `command/` directory
2. Include frontmatter:

    ```yaml
    ---
    description: Clear description of command purpose
    agent: general # or specific agent name
    subtask: false # true if used by other commands
    ---
    ```

3. Write comprehensive instructions
4. Include usage examples
5. Reference related resources (checklists, templates, knowledge base)
6. Test with realistic scenarios

## Related Documentation

- [Agents Reference](agents.md) - All available agents
- [Checklists](../checklist/) - Comprehensive requirement lists
- [Templates](../template/) - Standard document templates
- [Knowledge Base](../knowledge-base/) - Reusable patterns and best practices
- [Tasks](../task/) - Automated analysis tasks

## Command Index

Quick reference of all commands:

### Documentation

- `/document` - Quick lightweight documentation
- `/documentalist` - Comprehensive documentation suite
- `/generate-docs-strict` - Complete suite with strict standards
- `/api-docs` - API documentation
- `/arch-docs` - Architecture documentation
- `/deploy-docs` - Deployment documentation
- `/dev-docs` - Development documentation
- `/pipeline-docs` - Pipeline documentation
- `/onboard-docs` - Onboarding documentation
- `/docs-help` - Documentation system help

### Development

- `/commit` - Conventional commit
- `/feature` - Enhance prompts
- `/refine-prompt` - Multi-agent prompt enhancement
- `/limit-scope` - Scope management

### JIRA/Atlassian

- `/create-ticket` - Create JIRA tickets

### Session Management

- `/list-sessions` - List all sessions
- `/save-session` - Save current session
- `/resume-session` - Resume saved session
- `/update-session` - Update session metadata

### Utility

- `/hello-world` - Test command
- `/review-tool` - Tool approval review
