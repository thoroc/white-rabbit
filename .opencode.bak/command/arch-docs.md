---
description: Generate architecture documentation for the project
agent: general
subtask: true
type: command
category: Development
tags:
  - command
  - arch
  - docs
  - generate
  - architecture
version: 1.0.0
last_updated: 2025-11-19
---

# Architecture Documentation Generation

Create comprehensive architecture documentation by analyzing the codebase structure, dependencies, and design patterns.

## Architecture Analysis

**EFFICIENCY FIRST**: Use lightweight shell commands for initial assessment. Load tasks only when needed for
comprehensive analysis.

**TASK REFERENCES**: See `.opencode/template/task-reference-template.md` for complete list. Relevant tasks:

- **Project Context**: `.opencode/task/project-context.md` - Quick lightweight analysis (use first)
- **Technology Detection**: `.opencode/task/technology-detection.md` - Comprehensive programming languages, frameworks,
  project types
- **Infrastructure Analysis**: `.opencode/task/infrastructure-analysis.md` - Databases, messaging, architecture patterns
- **Deployment Strategy**: `.opencode/task/deployment-strategy.md` - CI/CD, containers, cloud platforms, IaC

### Lightweight Project Context

**Use commands from**: `.opencode/task/project-context.md`

Run specific analysis commands from the task as needed:

- Technology Stack Summary
- Container and Orchestration Detection
- Infrastructure as Code Detection

For comprehensive architecture analysis, load these tasks:

- `.opencode/task/infrastructure-analysis.md` - Database, messaging, and service patterns
- `.opencode/task/deployment-strategy.md` - Deployment architecture and cloud platforms

## Architecture Documentation Requirements

**IMPORTANT**: Follow the comprehensive architecture documentation checklist to ensure complete coverage.

**CHECKLIST REFERENCE**: `.opencode/checklist/architecture-documentation.md`

- Load this checklist file for comprehensive requirements (161+ detailed requirements)
- Contains specialized sections for Cloud-Native, Serverless, Microservices, etc.
- Only load when beginning documentation work to avoid unnecessary context usage

**DIAGRAM KNOWLEDGE BASE**: `.opencode/knowledge-base/mermaid-diagrams.md`

- Reference for Mermaid diagram examples and best practices
- Load when creating visual architecture documentation

## Architecture Focus

$ARGUMENTS

## Instructions

**Load and use the checklist reference above as your primary guide**. Work through each section systematically to ensure
complete coverage:

1. **Follow the Checklist**: Address every ✅ item in the architecture documentation checklist
2. **Quality Standards**: Meet all diagram and technical accuracy requirements
3. **Specialized Sections**: Include relevant specialized sections (Cloud-Native, Serverless, etc.)
4. **Review Criteria**: Ensure final documentation passes all review checks

**Architecture Focus Areas** (adapt based on detected technologies):

- System architecture patterns (microservices, serverless, monolithic)
- Data architecture and storage solutions
- API architecture and communication patterns
- Deployment and infrastructure architecture
- Security architecture and access controls
- Monitoring, logging, and observability setup
- Integration patterns with external systems
- Scalability and performance architecture

## Existing Documentation Discovery

**CRITICAL**: Before creating new architecture documentation, discover ALL existing documentation:

**📋 Discovery Resources**:

- **Full Discovery Task**: `.opencode/task/documentation-discovery.md` - Comprehensive discovery at all depths
- **Analysis Checklist**: `.opencode/checklist/documentation-discovery.md` - 85+ verification points

**Quick Architecture Documentation Search**:

!`echo "## Searching for existing architecture documentation"; find . -type f \( -name "*arch*.md" -o -name "*ARCH*.md" -o -name "*architecture*.md" -o -name "*design*.md" -o -name "*system*.md" \) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/vendor/*" ! -path "*/build/*" ! -path "*/dist/*" 2>/dev/null | sort; echo ""; echo "## Architecture Decision Records (ADRs):"; find . -type d -name "adr" -o -path "*/docs/adr" 2>/dev/null`

**Common locations for architecture documentation:**

- `./docs/architecture.md` or `./docs/ARCHITECTURE.md`
- `./documentation/architecture.md`
- `./ARCHITECTURE.md` or `./architecture.md` (root level)
- `./docs/design.md` or `./docs/system-design.md`
- `./packages/*/docs/architecture.md` (monorepos)
- `./.github/docs/architecture.md`
- `./wiki/architecture.md`
- `./adr/` or `./docs/adr/` (Architecture Decision Records)

**If existing documentation is found:**

1. **READ the existing file(s)** to understand current structure, content, and diagrams
2. **UPDATE in place** - modify the existing file at its EXACT location (don't move it)
3. **Preserve valuable content** - existing diagrams, ADRs, design rationale
4. **Enhance gaps** - add missing sections, update outdated information
5. **Respect existing conventions** - naming, format, diagram style
6. Note what was updated in your response

**If no architecture docs exist**, check if README or other docs contain architecture information that should be
extracted and expanded.

## Output Requirements

**IMPORTANT**:

- **If existing architecture documentation was found**: Update that file in its current location
- **If no existing documentation was found**: Create `./docs/architecture.md` (create ./docs directory if needed)

**Standard Documentation Structure**: See `.opencode/template/standard-doc-structure.md` for complete structure.

**Default output location** (if no existing docs found): `./docs/architecture.md`

Create documentation that helps developers understand the system's design decisions, constraints, and how components
interact with each other. The documentation should include proper markdown formatting.

**When updating existing documentation:**

- Preserve the existing file location and name
- Maintain any Architecture Decision Records (ADRs)
- Keep existing diagrams and enhance them if needed
- Preserve custom sections or project-specific design patterns
- Add missing required sections from the checklist
- Update outdated information

**DIAGRAM REQUIREMENTS**: All visual documentation MUST use Mermaid syntax. Include multiple relevant diagram types such
as:

- System architecture (flowchart or graph)
- Component interactions (sequence diagrams)
- Data relationships (entity relationship diagrams)
- Deployment flow (flowchart)

Ensure all Mermaid diagrams are properly formatted with
```mermaid code blocks and render correctly. See `.opencode/knowledge-base/mermaid-diagrams.md` for examples and best
practices.
