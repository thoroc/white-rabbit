# Agent-to-Resource Mapping

This document maps each agent to their associated commands, checklists, knowledge base articles, tasks, and templates.

## Complete Mapping

### opencode

**Status**: ✅ Complete

**Commands**:

- `/create-agent` - command/create-agent.md
- `/create-command` - command/create-command.md

**Checklists**:

- checklist/opencode-agent.md - Agent configuration quality checklist (625+ items)
- checklist/opencode-command.md - Command configuration quality checklist (829+ items)
- References all other checklists in checklist/ directory as examples

**Knowledge Base**:

- knowledge-base/agent-configuration-reference.md - Complete agent configuration reference (1,108 lines)
- References all knowledge bases in knowledge-base/ directory as examples

**Tasks**:

- task/opencode-agent.md - Agent creation workflow
- task/opencode-command.md - Command creation workflow
- task/opencode-checklist.md - Checklist creation workflow
- task/opencode-task.md - Task creation workflow
- task/opencode-knowledge-base.md - Knowledge base creation workflow
- task/opencode-template.md - Template creation workflow
- References all other tasks in task/ directory as examples

**Example Resources**:

- Can browse agent/, command/, task/, checklist/, knowledge-base/ directories for pattern examples

**Templates**:

- template/opencode-agent-tmpl.yaml
- template/opencode-command-tmpl.yaml
- template/opencode-task-tmpl.yaml
- template/opencode-checklist-tmpl.yaml
- template/opencode-knowledge-base-tmpl.yaml
- template/opencode-template-tmpl.yaml
- template/opencode-task-reference-template-tmpl.yaml

**Documentation**:

- docs/agents.md
- docs/commands.md
- docs/agent-resource-mapping.md
- docs/template-standard.md

**Notes**: Meta-agent for building new OpenCode resources (agents, commands, tasks, checklists, and knowledge bases). Has comprehensive access to all OpenCode-prefixed templates and can browse example directories for patterns. Use `/create-agent` for agents and `/create-command` for commands. Direct invocation for tasks, checklists, and knowledge bases.

---

### ai-tool-reviewer

**Status**: ✅ Complete

**Commands**:

- `/review-tool` - command/review-tool.md

**Checklists**:

- checklist/ai-tool-approval.md

**Knowledge Base**:

- knowledge-base/ai-tool-approval-patterns.md

**Tasks**:

- task/ai-tool-approval-research.md

**Templates**:

- template/ai-tool-assessment-report-tmpl.yaml
- template/ai-tool-rfc-submission-tmpl.yaml

---

### code-architect

**Status**: ✅ Complete

**Commands**:

- None (no architecture-specific commands exist, but could create /arch-review or /design-pattern commands)

**Checklists**:

- checklist/architecture-documentation.md - Architecture documentation standards (161 items)
- checklist/development-documentation.md - Development workflows and practices (181 items)
- checklist/api-documentation.md - API design and documentation (150 items)

**Knowledge Base**:

- knowledge-base/mermaid-diagrams.md - Diagram templates for architecture visualization
- knowledge-base/pipeline-best-practices.md - CI/CD and deployment best practices
- knowledge-base/loading-strategy.md - Efficient resource loading patterns

**Tasks**:

- task/technology-detection.md - Technology stack analysis
- task/infrastructure-analysis.md - Infrastructure and architecture pattern detection
- task/deployment-strategy.md - Deployment strategies and operational patterns

**Templates**:

- template/standard-doc-structure-tmpl.yaml - Standard documentation structure
- template/common-shell-commands-tmpl.yaml - Architecture detection commands

**Notes**: Expert advisor on software architecture, design patterns, and engineering best practices. Provides read-only analysis with comprehensive guidance on architectural styles, design patterns (creational, structural, behavioral), SOLID principles, Clean Architecture, DDD, and microservices patterns. Uses Mermaid diagrams for visualization. Mode set to 'all' for versatility as both primary and subagent.

---

### atlassian

**Status**: ✅ Complete

**Commands**:

- `/create-ticket` - command/create-ticket.md

**Checklists**:

- checklist/jira-ticket-creation.md

**Knowledge Base**:

- knowledge-base/moscow-prioritization.md
- knowledge-base/acceptance-criteria.md

**Templates**:

- template/jira-ticket-description-tmpl.yaml

**Notes**: No Atlassian-specific tasks exist (would require creating task/atlassian-data-fetcher.md if needed)

---

### documentalist

**Status**: ✅ Complete

**Commands**:

- `/api-docs` - command/api-docs.md
- `/arch-docs` - command/arch-docs.md
- `/deploy-docs` - command/deploy-docs.md
- `/dev-docs` - command/dev-docs.md
- `/pipeline-docs` - command/pipeline-docs.md
- `/onboard-docs` - command/onboard-docs.md
- `/document` - command/document.md
- `/documentalist` - command/documentalist.md
- `/generate-docs-strict` - command/generate-docs-strict.md
- `/docs-help` - command/docs-help.md

**Checklists**:

- checklist/api-documentation.md
- checklist/architecture-documentation.md
- checklist/deployment-documentation.md
- checklist/development-documentation.md
- checklist/onboarding-documentation.md

**Knowledge Base**:

- knowledge-base/mermaid-diagrams.md
- knowledge-base/loading-strategy.md

**Tasks**:

- task/technology-detection.md
- task/infrastructure-analysis.md
- task/deployment-strategy.md

**Templates**:

- template/standard-doc-structure-tmpl.yaml
- template/task-reference-template-tmpl.yaml
- template/common-shell-commands-tmpl.yaml

---

### researcher

**Status**: ✅ Complete

**Commands**:

- `/research` - command/research.md

**Checklists**:

- None (general research agent, no specific checklist needed)

**Knowledge Base**:

- knowledge-base/mermaid-diagrams.md - Diagram templates for visualizing research findings
- knowledge-base/loading-strategy.md - Efficient resource loading patterns

**Tasks**:

- task/technology-detection.md - Technology stack analysis for codebase research
- task/infrastructure-analysis.md - Infrastructure pattern detection for system research
- task/deployment-strategy.md - Deployment and operational analysis

**Templates**:

- None (general research agent, no specific templates needed)

**Notes**: Deep research specialist focused on exhaustive, multi-source analysis with internet access (webfetch enabled). Conducts comprehensive research on specific topics using 5-10+ authoritative sources, performs multi-layered analysis (surface/intermediate/expert), triple-verifies critical information, includes historical context and expert perspectives, and delivers scholarly reports with visual diagrams. Read-only agent (write/edit disabled) emphasizing depth over breadth. Mode set to 'subagent' for specialized research tasks invoked via @ mention or `/research` command. Temperature 0.3 for balanced research with analytical rigor.

---

### jenkins

**Status**: ⚠️ Partially Complete (missing checklists and templates)

**Commands**:

- None (no Jenkins-specific commands exist)

**Checklists**:

- None (could create checklist/jenkins-pipeline.md)

**Knowledge Base**:

- knowledge-base/jenkins-patterns.md
- knowledge-base/pipeline-best-practices.md

**Tasks**:

- task/pipeline-architect.md
- task/deployment-strategy.md

**Templates**:

- None (could create template/jenkins-pipeline-tmpl.yaml)

---

### php-logging-quality-agent

**Status**: ❌ No References (specialized agent, no supporting resources)

**Commands**:

- None

**Checklists**:

- None (could create checklist/php-logging-quality.md)

**Knowledge Base**:

- None (could create knowledge-base/php-logging-best-practices.md)

**Tasks**:

- None (could create task/php-logging-analysis.md)

**Templates**:

- None (could create template/php-logging-report-tmpl.yaml)

**Notes**: This is a specialized agent that operates without external resources. Consider creating supporting resources
if the agent is used frequently.

---

### pipeline-architect

**Status**: ✅ Complete

**Commands**:

- `/pipeline-docs` - command/pipeline-docs.md

**Checklists**:

- None (no pipeline-specific checklists exist, but could reference deployment-documentation.md)

**Knowledge Base**:

- knowledge-base/jenkins-patterns.md
- knowledge-base/gitlab-ci-examples.md
- knowledge-base/github-actions-templates.md
- knowledge-base/pipeline-best-practices.md

**Tasks**:

- task/pipeline-architect.md
- task/deployment-strategy.md
- task/infrastructure-analysis.md

**Templates**:

- template/common-shell-commands-tmpl.yaml

---

### prompt-enhancer-expert

**Status**: ❌ No References (specialized agent, no supporting resources)

**Commands**:

- `/refine-prompt` - command/refine-prompt.md

**Checklists**:

- None

**Knowledge Base**:

- None (could create knowledge-base/prompt-engineering.md)

**Tasks**:

- None

**Templates**:

- None (could create template/prompt-evaluation-tmpl.yaml)

**Notes**: This is a specialized agent focused on prompt enhancement. Consider creating supporting resources for prompt
engineering best practices if needed.

---

## Resource Creation Recommendations

### High Priority

1. **jenkins agent**: Create checklist/jenkins-pipeline.md for pipeline quality standards
2. **php-logging-quality-agent**: Add resource references section with potential future resources

### Medium Priority

1. Create template/jenkins-pipeline-tmpl.yaml for common Jenkins patterns
2. Create checklist/php-logging-quality.md for logging audit standards
3. Create knowledge-base/php-logging-best-practices.md for logging patterns

### Low Priority

1. Create knowledge-base/prompt-engineering.md for prompt enhancement patterns
2. Create template/prompt-evaluation-tmpl.yaml for prompt quality assessment

---

## Verification Checklist

When adding a new agent, ensure:

- [ ] Agent has a "Resource References" section
- [ ] All referenced resources exist in the repository
- [ ] Resource paths use correct format (`.opencode/type/filename.md`)
- [ ] Commands use `/command-name` format
- [ ] Agent description clearly states which resources it uses
- [ ] Related agents cross-reference shared resources (e.g., deployment-strategy.md)

---

## Maintenance Notes

**Last Updated**: 2025-11-19

**Verified By**: OpenCode Analysis

**Status Summary**:

- 6 agents fully complete ✅ (opencode, ai-tool-reviewer, code-architect, atlassian, documentalist, researcher, pipeline-architect)
- 1 agent partially complete ⚠️ (jenkins)
- 2 agents with no references ❌ (php-logging-quality-agent, prompt-enhancer-expert)

**Action Items**:

- Add resource references section to php-logging-quality-agent.md
- Add resource references section to prompt-enhancer-expert.md (reference /refine-prompt command)
- Consider creating Jenkins checklist and template
