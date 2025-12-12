# OpenCode Agents Reference

This document provides comprehensive documentation for all available OpenCode agents.

## Table of Contents

- [OpenCode Agents Reference](#opencode-agents-reference)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Available Agents](#available-agents)
    - [AI Tool Reviewer](#ai-tool-reviewer)
    - [Atlassian](#atlassian)
    - [Documentalist](#documentalist)
    - [Jenkins](#jenkins)
    - [PHP Logging Quality Agent](#php-logging-quality-agent)
    - [Pipeline Architect](#pipeline-architect)
    - [Prompt Enhancer Expert](#prompt-enhancer-expert)
  - [Using Agents](#using-agents)
    - [Invoking Agents](#invoking-agents)
    - [Agent Selection Guide](#agent-selection-guide)
    - [Best Practices](#best-practices)
  - [Extending Agents](#extending-agents)
  - [Related Documentation](#related-documentation)

## Overview

OpenCode agents are specialized AI assistants configured for specific tasks. Each agent has:

- **Description**: Purpose and capabilities
- **Mode**: Execution mode (subagent, all)
- **Temperature**: Response creativity level (0.1-0.3 for deterministic, higher for creative)
- **Tools**: Available tools for file operations, API calls, etc.
- **Permissions**: Specific access controls

## Available Agents

### AI Tool Reviewer

**File**: `agent/ai-tool-reviewer.md`

**Description**: Specialist in reviewing AI and open source tools for organizational approval, assessing privacy,
security, compliance, and operational risks.

**Mode**: subagent  
**Temperature**: 0.3 (balanced for analysis)

**Capabilities**:

- Guide users through comprehensive AI tool evaluation per RFC 98
- Assess data privacy, security, compliance, and operational risks
- Generate structured approval requests for RFC forum submission
- Review open source software for licensing and maintenance
- Create risk assessments and mitigation strategies

**Key Use Cases**:

- Evaluating new AI tools before organizational adoption
- Generating RFC submissions for tool approval
- Assessing data privacy and security implications
- Reviewing open source licensing compatibility
- Creating monitoring and review plans

**Tools Available**:

- File operations (write, edit, read)
- Search tools (grep, glob, list)
- Bash execution (all commands allowed)
- Web fetching for documentation review
- GitLab integration

**Integration Points**:

- RFC Forum for submissions
- Confluence Registry (AI Tools Registry)
- Vendor vetting processes

### Atlassian

**File**: `agent/atlassian.md`

**Description**: Retrieves data from Atlassian tools (JIRA and Confluence), handles ticket creation, analysis, and
management.

**Mode**: all  
**Temperature**: 0.1 (highly deterministic)

**Capabilities**:

- Fetch JIRA issues, projects, and user data
- Retrieve Confluence pages, spaces, and content
- Create well-structured JIRA tickets with MoSCoW prioritization
- Analyze and resolve JIRA tickets
- Extract comments, links, and attachments
- Track visited documents for session management

**Key Use Cases**:

- Querying JIRA project status and open issues
- Accessing Confluence documentation
- Creating new JIRA tickets (stories, bugs, tasks, epics)
- Analyzing existing tickets for resolution
- Tracking dependencies and related work

**Tools Available**:

- File operations (write, edit, read)
- Search tools (grep, glob, list)
- Bash execution
- Web fetching
- Atlassian MCP integration
- GitLab MCP integration

**Required Environment Variables**:

- `JIRA_API_TOKEN`
- `JIRA_URL`
- `JIRA_USERNAME`
- `CONFLUENCE_API_TOKEN`
- `CONFLUENCE_URL`
- `CONFLUENCE_USERNAME`
- `GITLAB_API_URL`
- `GITLAB_PERSONAL_ACCESS_TOKEN`

**Workflows**:

1. **Data Retrieval**: Parse query → Identify tool → Authenticate → API calls → Format data
2. **Ticket Creation**: Gather info → Apply MoSCoW → Write acceptance criteria → Review → Generate
3. **Ticket Analysis**: Retrieve ticket → Extract links/comments → Analyze → Propose resolution

### Documentalist

**File**: `agent/documentalist.md`

**Description**: Specialist in documenting codebases with comprehensive analysis and professional documentation.

**Mode**: subagent  
**Temperature**: 0.2 (slightly creative for documentation)

**Capabilities**:

- Analyze codebase structure and dependencies
- Create comprehensive README files
- Generate API documentation with examples
- Develop architecture documentation with diagrams
- Write development and contribution guidelines
- Produce deployment and maintenance documentation

**Key Use Cases**:

- Creating new project documentation
- Updating existing documentation
- Generating specialized docs (API, architecture, deployment)
- Onboarding documentation for new team members
- CI/CD pipeline documentation

**Tools Available**:

- File operations (write, edit, read)
- Search tools (list, glob, grep)
- Bash execution
- Web fetching disabled (focuses on local analysis)

**Available Commands**:

- `/api-docs`: API-specific documentation
- `/arch-docs`: Architecture documentation
- `/deploy-docs`: Deployment documentation
- `/dev-docs`: Development documentation
- `/pipeline-docs`: CI/CD pipeline documentation
- `/onboard-docs`: Onboarding documentation
- `/document`: Quick comprehensive docs
- `/documentalist`: Full documentation suite
- `/generate-docs-strict`: Complete suite with strict standards

**Documentation Standards**:

- Mermaid diagrams for visual elements
- Consistent heading hierarchy
- Clear setup and installation instructions
- Code examples with proper formatting
- Troubleshooting sections
- Output location: `./docs/` directory

### Jenkins

**File**: `agent/jenkins.md`

**Description**: Designs, audits, and maintains Jenkins scripted pipelines (Groovy).

**Mode**: all  
**Model**: openai/gpt-5-mini  
**Temperature**: Not specified

**Capabilities**:

- Author and refactor Jenkins scripted pipelines
- Implement best practices for deterministic builds
- Manage credentials and secrets safely
- Handle Docker-based builds
- Implement resilient pipeline patterns
- Parameterize deployments with guardrails

**Key Use Cases**:

- Creating new Jenkins pipelines
- Auditing existing pipeline security and reliability
- Refactoring pipelines to follow company standards
- Implementing multi-environment deployment strategies
- Adding resilience and retry logic

**Tools Available**:

- File operations (write, edit, read)
- Search tools (grep, glob, list)
- Bash execution
- Web fetching

**Golden Rules**:

- Scripted pipelines only (not declarative)
- All stages must be named and idempotent
- Production deploys require commit pinning and approval
- junit publishing guarded by existence checks
- cleanWs in post/finally blocks
- Retry external calls with bounded backoff (3 attempts)
- Credentials via withCredentials only
- Container builds using docker.image().inside()

**Pipeline Patterns**:

- SCM and metadata capture
- Environment/DSAP flows with deployment rules
- Container and toolchain management
- ECR image tagging strategies
- Ansible integration with Galaxy roles
- Workspace hygiene and parallelism

### PHP Logging Quality Agent

**File**: `agent/php-logging-quality-agent.md`

**Description**: Analyzes and improves PHP logging quality by fixing severity levels, implementing structured logging,
and ensuring comprehensive error coverage.

**Mode**: subagent  
**Model**: anthropic/claude-sonnet-4-20250514  
**Temperature**: 0.1 (highly deterministic)

**Capabilities**:

- Analyze PHP logging patterns and anti-patterns
- Fix incorrect exception severity levels
- Convert string concatenation to structured logging
- Eliminate silent failure patterns
- Migrate to PSR-3 interfaces
- Implement payload redaction for security

**Key Use Cases**:

- Auditing PHP codebase logging quality
- Fixing exceptions logged at wrong severity
- Implementing structured logging standards
- Adding logging to silent try-catch blocks
- Security improvements (PII redaction)

**Tools Available**:

- File operations (write, edit, read)
- Search tools (grep, glob, list)
- Bash disabled (focuses on code analysis)
- Patch tool for precise changes

**Transformation Rules**:

- Exception handlers: info → error level
- String concatenation → structured arrays
- Silent catches → logged failures with context
- Old interfaces → PSR-3 LoggerInterface
- Raw payloads → redacted logging

**Target Metrics**:

- 0% exceptions at info level
- 95% structured format adoption
- 98% error coverage
- <5 silent failure patterns
- 100% PSR-3 interface usage

### Pipeline Architect

**File**: `agent/pipeline-architect.md`

**Description**: Specializes in creating and optimizing CI/CD pipeline configurations for all major platforms.

**Mode**: subagent  
**Temperature**: 0.2 (balanced for technical design)

**Capabilities**:

- Design CI/CD pipelines for GitLab CI, Jenkins, GitHub Actions, Azure DevOps, CircleCI
- Create Infrastructure as Code (Terraform, CDK, CloudFormation, Pulumi, Ansible, Helm)
- Implement container and orchestration strategies
- Security-first pipeline design
- Performance optimization and cost reduction
- Cross-platform pipeline migration

**Key Use Cases**:

- Creating new CI/CD pipelines from scratch
- Migrating between CI/CD platforms
- Optimizing existing pipelines for performance/cost
- Implementing security and compliance requirements
- Modernizing legacy deployment processes

**Tools Available**:

- File operations (write, edit, read)
- Search tools (grep, glob, list)
- Bash execution (with permission controls for destructive ops)
- Web fetching for documentation

**Platform Expertise**:

- GitLab CI/CD (.gitlab-ci.yml)
- Jenkins (Jenkinsfile, declarative & scripted)
- GitHub Actions (workflows, custom actions)
- Azure DevOps (YAML pipelines)
- CircleCI (config.yml, orbs)
- AWS CodePipeline
- Google Cloud Build
- Bitbucket Pipelines

**Best Practices**:

- Zero-trust security model
- GitOps workflows
- Progressive deployment (blue-green, canary)
- Infrastructure drift detection
- Comprehensive monitoring
- Self-service deployment capabilities

### Prompt Enhancer Expert

**File**: `agent/prompt-enhancer-expert.md`

**Description**: Enhances user-provided prompts using multi-agent collaboration and brainstorming methodologies.

**Mode**: all  
**Temperature**: 0.1 (deterministic for analysis)

**Capabilities**:

- Evaluate prompt quality (clarity, specificity, effectiveness)
- Deploy four specialized emulated agents for brainstorming
- Apply proven methodologies (Mind Mapping, Six Thinking Hats, SCAMPER)
- Synthesize improvements into enhanced prompts
- Iterative refinement with scoring

**Key Use Cases**:

- Improving vague or unclear prompts
- Adding structure and specificity to requests
- Enhancing prompts for better AI responses
- Expanding prompts with relevant context
- Refining prompts through iterative improvement

**Tools Available**:

- File operations (write, edit, read)
- Search tools (grep, glob, list)
- Bash execution
- Web fetching

**Enhancement Process**:

1. Evaluate original prompt (score 1-10)
2. Identify subject/domain
3. Deploy four specialized agents
4. Apply brainstorming methodologies
5. Synthesize improvements
6. Evaluate enhanced prompt
7. Iterate up to 3 times if needed

**Emulated Agents**:

- Agent 1: Fundamental concepts expert
- Agent 2: Practical applications specialist
- Agent 3: Creative thinker
- Agent 4: Pattern and trend analyst

**Brainstorming Methods**:

- Mind Mapping: Visual organization
- Six Thinking Hats: Multiple perspectives
- SCAMPER: Creative techniques

## Using Agents

### Invoking Agents

Agents are typically invoked through the Task tool or directly via agent configuration:

```bash
# Through OpenCode
opencode --agent documentalist

# Via Task tool in prompts
Use the documentalist agent to create comprehensive documentation
```

### Agent Selection Guide

- **Documentation needs**: Documentalist
- **CI/CD pipelines**: Pipeline Architect or Jenkins
- **Tool evaluation**: AI Tool Reviewer
- **JIRA/Confluence**: Atlassian
- **PHP logging**: PHP Logging Quality Agent
- **Prompt improvement**: Prompt Enhancer Expert

### Best Practices

1. **Choose the right agent**: Match capabilities to your task
2. **Provide context**: Include necessary information upfront
3. **Set expectations**: Understand agent temperature and approach
4. **Review outputs**: Agents provide starting points, review and refine
5. **Leverage tools**: Agents have specific tool access, use appropriately

## Extending Agents

To create or modify agents:

1. Create markdown file in `agent/` directory
2. Include frontmatter with:
   - `description`: Clear purpose statement
   - `mode`: Execution mode
   - `temperature`: Response style
   - `tools`: Available tool access
   - `permission`: Access controls if needed
3. Write comprehensive instructions
4. Test with realistic scenarios

## Related Documentation

- [Commands Reference](commands.md) - All available commands
- [Knowledge Base](../knowledge-base/) - Reusable patterns and best practices
- [Checklists](../checklist/) - Comprehensive requirement lists
- [Templates](../template/) - Standard document templates
