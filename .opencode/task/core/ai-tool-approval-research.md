---
description: Automated task for comprehensive AI tool research, evaluation, and approval documentation generation
mode: task
temperature: 0.3
type: task
category: Operations
tags:
  - tool
  - approval
  - automated
  - research
  - evaluation
  - security
version: 1.0.0
last_updated: 2025-11-19
title: Ai Tool Approval Research Task
estimated_duration: 15-30 minutes
---

This task performs comprehensive, automated research and evaluation of AI tools and open source software for organizational approval according to RFC 98.

## Purpose

Automate the labor-intensive research phase of tool evaluation by fetching documentation, performing security assessments, checking compliance status, generating structured evaluation reports, and creating RFC-ready submission documents.

## When to Use This Task

**Use when:**
- Starting a new tool evaluation from scratch
- Need comprehensive research across all evaluation criteria
- Want to automate documentation gathering
- Creating approval requests for RFC submission

**Do NOT use if:**
- Tool already has recent assessment (check registry first)
- Only need to update existing assessment
- Performing emergency/temporary approval (use expedited process)

## Input Requirements

### Required Information
- **Tool Name**: Official name
- **Version**: Current version or "latest"
- **Vendor/Maintainer**: Company, organization, or individual
- **Tool Type**: AI assistant, dev tool, library, etc.
- **Primary Use Case**: Problem it solves

### Optional Information
- Repository URL (for open source)
- Official website URL
- Known license type
- Current usage status

## Task Execution Steps

### Step 1: Documentation Discovery & Collection

**Actions**: Locate official website/docs, privacy policy, ToS, repository, security docs, GDPR/compliance statements

**Tools**: WebFetch, search engines, GitHub/GitLab API

**Outputs**: Documentation URLs with access dates, key policies, repository metadata

### Step 2: Data Privacy & Security Analysis

**Actions**: Parse privacy policy for training data usage, identify opt-out mechanisms, determine storage locations, extract retention policies, verify encryption, list subprocessors

**Risk Scoring**:
- High: Mandatory training, no opt-out, vague policies
- Medium: Optional training, complex opt-out
- Low: No training, clear policies, enterprise guarantees

**Outputs**: Data usage summary with risk rating, policy excerpts with citations, opt-out process documentation

### Step 3: Compliance & Legal Assessment

**Actions**: Verify GDPR compliance, check DPA availability, review ToS for problematic clauses, analyze IP ownership, identify license type, check certifications (SOC 2, ISO 27001)

**Red Flags**: No DPA for B2B product, unclear IP ownership, restrictive licenses (AGPL, SSPL), unverified certifications

**Outputs**: Compliance status summary, ToS/privacy concerns, license compatibility analysis, certification status

### Step 4: Security Assessment

**For Open Source**: Clone repo, analyze dependencies, run vulnerability scanner, check SECURITY.md, review issue tracker, assess maintenance activity

**For SaaS**: Review security docs, check pen testing reports, verify certifications, assess authentication, review incident history

**Security Scoring**: Critical (active CVEs, no security policy) | High (some CVEs, slow patching) | Medium (minor issues, good patching) | Low (no known issues, excellent practices)

**Outputs**: Vulnerability report, security posture assessment, maintenance summary, recommended controls

### Step 5: Operational Assessment

**Actions**: Identify deployment models, document resource requirements, check stability/uptime, assess integration complexity, evaluate documentation quality, identify support channels/SLAs

**Outputs**: Deployment options analysis, resource requirements, integration effort estimate, support assessment

### Step 6: Risk Analysis & Scoring

**Formula**: Risk Score = (Data Sensitivity × Likelihood) + (Compliance Gaps × Severity) + Security Posture - Mitigation

**Score Interpretation**:
- 0-10: Low Risk → Approve
- 11-20: Medium Risk → Conditional Approval
- 21-30: High Risk → Reject or Heavy Restrictions
- 31+: Critical Risk → Reject

**Outputs**: Risk score with breakdown, severity ratings per category, mitigation recommendations, residual risk

### Step 7: Generate Assessment Report

**Report Sections**:
1. Executive Summary (tool overview, recommendation, key findings)
2. Business Context (use case, status, alternatives)
3. Detailed Assessment (privacy, compliance, security, operations)
4. Risk Analysis
5. Recommendation (decision, guidelines, restrictions, monitoring)

**Output Location**: `./docs/tool-reviews/[tool-name]-assessment-[YYYY-MM-DD].md`

### Step 8: Generate RFC Submission

**Submission Sections**: Tool overview, business justification, evaluation criteria checklist, risk summary, recommendation & request, implementation plan, supporting documentation

**Output Location**: `./docs/tool-reviews/[tool-name]-rfc-submission-[YYYY-MM-DD].md`

### Step 9: Create Checklist Report

**Generate**: Completed checklist with ☑ marks, completion percentage, risk summary (High/Medium/Low counts), reviewer info, next review date

**Output Location**: `./docs/tool-reviews/[tool-name]-checklist-[YYYY-MM-DD].md`

## Task Output Summary

The task generates three documents:

1. **Assessment Report** (Detailed): Comprehensive findings, evidence/citations, risk analysis, monitoring plan
2. **RFC Submission** (Structured): Forum-ready format, checklist completion, clear recommendation, implementation plan
3. **Checklist Report** (Quick Reference): All criteria addressed, completion tracking, risk summary

## Success Criteria

- ✅ All evaluation criteria researched and documented
- ✅ All findings supported by cited evidence
- ✅ Risk analysis comprehensive and justified
- ✅ Recommendation clear and actionable
- ✅ All three output documents generated
- ✅ No critical information gaps remain

## Quality Checks

### Completeness
- All checklist items addressed or marked N/A
- All documentation URLs verified and accessible
- Evidence cited for all claims
- Version numbers and dates current

### Accuracy
- Privacy policy interpretation verified
- License terms correctly understood
- Vulnerability data current (within 7 days)
- Certification claims verified

### Clarity
- Executive summary understandable by non-technical stakeholders
- Risk ratings consistent across document
- Recommendations actionable and specific
- Usage guidelines clear and enforceable

## Error Handling

**Documentation not available**: Document unavailability, mark "Unable to Verify", increase risk rating

**Repository private/not found**: Treat as SaaS/proprietary, assess based on vendor docs only

**Conflicting information**: Cite all sources, note conflict, recommend vendor clarification

**Multiple versions/tiers**: Create separate assessments per tier, or assess most restrictive

**Dependency vulnerabilities**: Document all CVEs with severity, assess exploitability, recommend mitigation

## Integration with Approval Process

### Pre-Screening
Task output used for initial review: submission completeness, criteria coverage, recommendation justification

### License Assessment
License required → Vendor vetting process | No license → Fast-track review

### Decision Recording
Task outputs attached to RFC discussion for detailed reference and discussion basis

### Registry Update
Upon approval, key information populates registry: tool name/version/vendor, category, restrictions/guidelines, review dates

## Examples

### Example 1: ChatGPT Enterprise
**Input**: ChatGPT, Latest, OpenAI, AI Assistant, Documentation assistance
**Findings**: No training on enterprise data, DPA available, SOC 2 certified, Medium risk (cloud-only but good controls)
**Recommendation**: Approve with restrictions (no PII, no customer data)

### Example 2: Abandoned Open Source Library
**Input**: example-ml-library, 2.1.0, Individual, Python ML library, Data preprocessing
**Findings**: Last commit 18 months ago, 3 critical CVEs, no SECURITY.md, MIT license
**Risk**: High (security vulnerabilities, no maintenance)
**Recommendation**: Reject, suggest alternatives with active maintenance

### Example 3: Ollama (Local LLM)
**Input**: Ollama, Latest, Ollama team, Local LLM runtime, Local AI experimentation
**Findings**: Active repo, MIT license, fully local, no telemetry, GPU recommended, model licenses separate
**Risk**: Low (data stays local, good license)
**Recommendation**: Approve with operational guidance (GPU allocation, approved models only)

## Task Parameters

### Configuration Options

**Research Depth**:
- `quick`: Basic documentation review (30 min)
- `standard`: Full evaluation per RFC 98 (2-3 hours)
- `comprehensive`: Includes vendor outreach, detailed testing (1-2 days)

**Output Format**:
- `markdown`: Standard markdown documents (default)
- `pdf`: Generated PDF reports
- `confluence`: Direct Confluence page creation

**Automation Level**:
- `manual-review`: Generate drafts, require human review
- `auto-approve-low-risk`: Auto-approve low-risk, flag others
- `full-manual`: All decisions require human approval

## Maintenance

### Task Updates Required When
- RFC 98 process changes
- Evaluation criteria updated
- New tool categories emerge
- Regulatory requirements change
- Template formats revised

### Review Schedule
- Quarterly: Check outdated tool assessment approaches
- Annually: Major review of task logic and outputs
- Ad-hoc: After significant policy changes

## References

- [RFC 98: AI Open Source Tools Approval Process](https://gitlab.com/plg-tech/plg/knowledge/rfcs/-/blob/feat/IP-23-ai-tools-approval-process/rfc-0098-ai-opensource-tools-approval-process.md)
- [AI Tool Approval Checklist](../.opencode/checklist/ai-tool-approval.md)
- [Assessment Report Template](../.opencode/template/ai-tool-assessment-report.md)
- [RFC Submission Template](../.opencode/template/ai-tool-rfc-submission.md)
- [AI Tool Approval Knowledge Base](../../knowledge-base/dev/ai-tool-approval-patterns.md)
- [Approved AI Tools Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry)
