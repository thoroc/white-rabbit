---
description: Automated task for comprehensive AI tool research, evaluation, and
  approval documentation generation
mode: task
temperature: 0.3
type: task
category: Operations
tags:
  - tool
  - approval
  - automated
  - comprehensive
  - research
  - evaluation
  - security
  - compliance
version: 1.0.0
last_updated: 2025-11-19
title: Ai Tool Approval Research Task
estimated_duration: 15-30 minutes
---

This task performs comprehensive, automated research and evaluation of AI tools and open source software for
organizational approval according to RFC 98.

## Purpose

Automate the labor-intensive research phase of tool evaluation by:

1. Fetching and analyzing official documentation
2. Performing security assessments
3. Checking compliance status
4. Generating structured evaluation reports
5. Creating RFC-ready submission documents

## When to Use This Task

Use this task when:

- Starting a new tool evaluation from scratch
- Need comprehensive research across all evaluation criteria
- Want to automate documentation gathering
- Creating approval requests for RFC submission

**Do NOT use this task if:**

- Tool already has recent assessment (check registry first)
- Only need to update existing assessment
- Performing emergency/temporary approval (use expedited process)

## Input Requirements

### Required Information

- **Tool Name**: Official name of the tool
- **Version**: Current version number (or "latest")
- **Vendor/Maintainer**: Company, organization, or individual
- **Tool Type**: AI assistant, development tool, open source library, etc.
- **Primary Use Case**: What problem does this tool solve?

### Optional Information

- Repository URL (for open source)
- Official website URL
- Known license type
- Current usage status (if already in use)

## Task Execution Steps

### Step 1: Documentation Discovery & Collection

**Actions:**

1. Locate official website and documentation
2. Find privacy policy URL
3. Find Terms of Service URL
4. Identify repository (if open source)
5. Locate security documentation
6. Find GDPR/compliance statements

**Tools Used:**

- WebFetch for retrieving documentation
- Search engines for discovery
- GitHub/GitLab API for repository info

**Outputs:**

- List of documentation URLs with access dates
- Downloaded copies of key policies
- Repository metadata (stars, forks, last commit, etc.)

---

### Step 2: Data Privacy & Security Analysis

**Actions:**

1. Parse privacy policy for training data usage
2. Identify opt-out mechanisms (if any)
3. Determine data storage locations
4. Extract retention policies
5. Verify encryption standards
6. List third-party subprocessors

**Analysis Techniques:**

- Keyword search: "training", "model improvement", "machine learning"
- Section identification: "Data Usage", "How We Use Your Information"
- Geographic analysis: "stored in", "data centers", "regions"
- Opt-out search: "opt-out", "do not use my data", "disable training"

**Risk Scoring:**

- High Risk: Mandatory training, no opt-out, vague policies
- Medium Risk: Optional training, opt-out available but complex
- Low Risk: No training, clear policies, enterprise guarantees

**Outputs:**

- Data usage summary with risk rating
- Policy excerpts with citations
- Opt-out process documentation (if applicable)

---

### Step 3: Compliance & Legal Assessment

**Actions:**

1. Verify GDPR compliance claims
2. Check for Data Processing Agreement (DPA) availability
3. Review Terms of Service for problematic clauses
4. Analyze IP ownership of generated content
5. Identify software license type and restrictions
6. Check for required certifications (SOC 2, ISO 27001)

**Focus Areas:**

- GDPR: Data subject rights, lawful basis, DPA
- IP: Ownership, commercial use, attribution
- Licensing: Open source compatibility, commercial restrictions
- Certifications: Current, verified, appropriate scope

**Red Flags:**

- No DPA for B2B product
- IP ownership unclear or vendor-owned
- Restrictive licenses (AGPL, SSPL for commercial use)
- Certifications claimed but not verified

**Outputs:**

- Compliance status summary
- ToS/Privacy Policy concerns list
- License compatibility analysis
- Certification verification status

---

### Step 4: Security Assessment

**For Open Source Tools:**

1. Clone repository (if public)
2. Analyze dependency tree
3. Run vulnerability scanner (npm audit, pip-audit, etc.)
4. Check for SECURITY.md or security policy
5. Review issue tracker for security issues
6. Assess maintenance activity (commits, releases)
7. Evaluate community health (contributors, responsiveness)

**For SaaS Tools:**

1. Review security documentation
2. Check for penetration testing reports
3. Verify security certifications
4. Assess authentication mechanisms
5. Review incident history (if public)

**Security Scoring:**

- Critical: Active CVEs, no security policy, abandoned
- High: Some CVEs, slow patching, limited maintenance
- Medium: Minor issues, good patching cadence, active maintenance
- Low: No known issues, excellent security practices, well-maintained

**Outputs:**

- Dependency vulnerability report
- Security posture assessment
- Maintenance activity summary
- Recommended security controls

---

### Step 5: Operational Assessment

**Actions:**

1. Identify deployment models (SaaS, self-hosted, local)
2. Document resource requirements
3. Check production stability and uptime
4. Assess integration complexity
5. Evaluate documentation quality
6. Identify support channels and SLAs

**Evaluation Criteria:**

- Deployment flexibility (self-hosted option preferred for sensitive data)
- Resource efficiency (can we run it?)
- Production readiness (stable vs. beta/alpha)
- Integration effort (API quality, SDK availability)
- Support quality (response times, documentation depth)

**Outputs:**

- Deployment options analysis
- Resource requirements specification
- Integration effort estimate
- Support assessment

---

### Step 6: Risk Analysis & Scoring

**Risk Calculation:**

```
Risk Score = (Data Sensitivity × Likelihood of Exposure) +
             (Compliance Gaps × Severity) +
             (Security Posture) -
             (Mitigation Effectiveness)
```

**Risk Matrix:** | Data Sensitivity | Likelihood | Compliance | Security | Mitigation | Final Score |
|------------------|------------|------------|----------|------------|-------------| | [1-5] | [1-5] | [0-10] | [0-10] |
[-5 to 0] | [Total] |

**Score Interpretation:**

- 0-10: Low Risk → Approve
- 11-20: Medium Risk → Conditional Approval
- 21-30: High Risk → Reject or Heavy Restrictions
- 31+: Critical Risk → Reject

**Outputs:**

- Risk score with breakdown
- Risk severity ratings per category
- Mitigation recommendations
- Residual risk after mitigation

---

### Step 7: Generate Assessment Report

**Using Template:** `/Users/thomas.roche/.config/opencode/template/ai-tool-assessment-report.md`

**Report Sections:**

1. Executive Summary
   - Tool overview
   - Recommendation (Approve/Reject/Conditional)
   - Key findings and risk rating

2. Business Context
   - Use case and justification
   - Current status
   - Alternatives considered

3. Detailed Assessment
   - Data Privacy & Security (Step 2 outputs)
   - Compliance & Legal (Step 3 outputs)
   - Security Assessment (Step 4 outputs)
   - Operational Assessment (Step 5 outputs)

4. Risk Analysis (Step 6 outputs)

5. Recommendation
   - Decision with justification
   - Usage guidelines (if approved)
   - Restrictions and conditions
   - Monitoring plan

**Output Location:** `./docs/tool-reviews/[tool-name]-assessment-[YYYY-MM-DD].md`

---

### Step 8: Generate RFC Submission

**Using Template:** `/Users/thomas.roche/.config/opencode/template/ai-tool-rfc-submission.md`

**Submission Sections:**

1. Tool Overview
2. Business Justification
3. Evaluation Criteria Assessment (Checklist format)
4. Risk Analysis Summary
5. Recommendation & Request
6. Implementation Plan
7. Supporting Documentation References

**Output Location:** `./docs/tool-reviews/[tool-name]-rfc-submission-[YYYY-MM-DD].md`

---

### Step 9: Create Checklist Report

**Using Checklist:** `/Users/thomas.roche/.config/opencode/checklist/ai-tool-approval.md`

**Generate:**

- Completed checklist with ☑ marks
- Completion percentage
- Risk summary (High/Medium/Low item counts)
- Reviewer information
- Next review date

**Output Location:** `./docs/tool-reviews/[tool-name]-checklist-[YYYY-MM-DD].md`

---

## Task Output Summary

The task generates three primary documents:

1. **Assessment Report** (Detailed)
   - Comprehensive findings
   - Evidence and citations
   - Risk analysis
   - Monitoring plan

2. **RFC Submission** (Structured)
   - Forum-ready format
   - Checklist completion
   - Clear recommendation
   - Implementation plan

3. **Checklist Report** (Quick Reference)
   - All criteria addressed
   - Completion tracking
   - Risk summary

## Success Criteria

The task successfully completes when:

- ✅ All evaluation criteria researched and documented
- ✅ All findings supported by cited evidence
- ✅ Risk analysis comprehensive and justified
- ✅ Recommendation clear and actionable
- ✅ All three output documents generated
- ✅ No critical information gaps remain

## Quality Checks

### Completeness Check

- [ ] All checklist items addressed or marked N/A
- [ ] All documentation URLs verified and accessible
- [ ] Evidence cited for all claims
- [ ] Version numbers and dates current

### Accuracy Check

- [ ] Privacy policy interpretation verified
- [ ] License terms correctly understood
- [ ] Vulnerability data current (within 7 days)
- [ ] Certification claims verified

### Clarity Check

- [ ] Executive summary understandable by non-technical stakeholders
- [ ] Risk ratings consistent across document
- [ ] Recommendations actionable and specific
- [ ] Usage guidelines clear and enforceable

## Error Handling

### Common Issues & Resolutions

**Issue:** Documentation not available **Resolution:** Document unavailability, mark criteria as "Unable to Verify",
increase risk rating

**Issue:** Open source repository private/not found **Resolution:** Treat as SaaS/proprietary, assess based on vendor
documentation only

**Issue:** Conflicting information between sources **Resolution:** Cite all sources, note conflict, recommend vendor
clarification

**Issue:** Tool has multiple versions/tiers with different terms **Resolution:** Create separate assessments per tier,
or assess most restrictive tier

**Issue:** Dependency vulnerabilities found **Resolution:** Document all CVEs with severity, assess if actively
exploitable, recommend mitigation

## Integration with Approval Process

### Pre-Screening

Task output used by committee for initial review:

- Is submission complete?
- Are all criteria addressed?
- Is recommendation well-justified?

### License Assessment

If license required → Vendor vetting process If no license required → Fast-track review

### Decision Recording

Task outputs attached to RFC discussion:

- Assessment report: Detailed reference
- RFC submission: Discussion basis
- Checklist: Quick verification

### Registry Update

Upon approval, key information from task outputs populates registry:

- Tool name, version, vendor
- Category (Enterprise/Open Source)
- Restrictions and usage guidelines
- Review dates and schedule

## Examples

### Example 1: Evaluating ChatGPT Enterprise

**Input:**

- Tool: ChatGPT
- Version: Latest
- Vendor: OpenAI
- Type: AI Assistant
- Use Case: Documentation assistance, brainstorming

**Task Execution:**

1. Discovers chatgpt.com, openai.com/enterprise
2. Fetches privacy policy, enterprise terms
3. Identifies: No training on enterprise data, DPA available, SOC 2 certified
4. Risk: Medium (due to cloud-only, but good enterprise controls)
5. Recommendation: Approve with restrictions (no PII, no customer data)

**Outputs:**

- Assessment: 8 pages, detailed analysis
- RFC: Ready for committee review
- Checklist: 95% complete (some enterprise specifics need vendor confirmation)

---

### Example 2: Evaluating Abandoned Open Source Library

**Input:**

- Tool: example-ml-library
- Version: 2.1.0
- Maintainer: Individual developer
- Type: Python ML library
- Use Case: Data preprocessing

**Task Execution:**

1. Clones GitHub repository
2. Finds: Last commit 18 months ago, 3 critical CVEs in dependencies
3. No SECURITY.md, issues unanswered
4. License: MIT (permissive)
5. Risk: High (security vulnerabilities, no maintenance)
6. Recommendation: Reject (suggest alternatives with active maintenance)

**Outputs:**

- Assessment: Identifies fork with active maintenance
- RFC: Recommends rejection, proposes alternative (scikit-learn)
- Checklist: Flagged maintenance and security concerns

---

### Example 3: Evaluating Ollama (Local LLM)

**Input:**

- Tool: Ollama
- Version: Latest
- Maintainer: Ollama team
- Type: Local LLM runtime
- Use Case: Local AI experimentation

**Task Execution:**

1. Reviews GitHub repo (active, MIT license)
2. Confirms: Fully local, no telemetry by default
3. Assesses resource requirements (GPU recommended)
4. Notes: Model licenses separate from tool license
5. Risk: Low (data stays local, good license)
6. Recommendation: Approve with operational guidance (GPU allocation, approved models only)

**Outputs:**

- Assessment: Operational focus (deployment, resources)
- RFC: Approved, includes model license guidance
- Checklist: Notes model licensing as additional consideration

---

## Task Parameters

### Configuration Options

**Research Depth:**

- `quick`: Basic documentation review only (30 min)
- `standard`: Full evaluation per RFC 98 (2-3 hours)
- `comprehensive`: Includes vendor outreach, detailed security testing (1-2 days)

**Output Format:**

- `markdown`: Standard markdown documents (default)
- `pdf`: Generated PDF reports
- `confluence`: Direct Confluence page creation

**Automation Level:**

- `manual-review`: Generate drafts, require human review before finalization
- `auto-approve-low-risk`: Auto-approve low-risk tools, flag others for review
- `full-manual`: All decisions require human approval

## Maintenance

### Task Updates Required When

- RFC 98 process changes
- Evaluation criteria updated
- New tool categories emerge
- Regulatory requirements change (new compliance standards)
- Template formats revised

### Review Schedule

- Quarterly: Check for outdated tool assessment approaches
- Annually: Major review of task logic and outputs
- Ad-hoc: After significant policy changes

---

## References

- [RFC 98: AI Open Source Tools Approval Process](https://gitlab.com/plg-tech/plg/knowledge/rfcs/-/blob/feat/IP-23-ai-tools-approval-process/rfc-0098-ai-opensource-tools-approval-process.md)
- [AI Tool Approval Checklist](../.opencode/checklist/ai-tool-approval.md)
- [Assessment Report Template](../.opencode/template/ai-tool-assessment-report.md)
- [RFC Submission Template](../.opencode/template/ai-tool-rfc-submission.md)
- [AI Tool Approval Knowledge Base](../.opencode/knowledge-base/ai-tool-approval-patterns.md)
- [Approved AI Tools Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry)
