---
title: AI Tool Approval Knowledge Base
description: Reference for AI and open source tool approval patterns, common findings, and best practices
version: 1.0.0
last_updated: 2025-11-11
reference: RFC 98 - AI Open Source Tools Approval Process
type: knowledge-base
category: Documentation
tags:
    - knowledge-base
    - tool
    - approval
    - reference
---

# AI Tool Approval Knowledge Base

## Overview

This knowledge base provides practical patterns, common findings, and guidance for evaluating AI tools and open source software according to RFC 98.

## Common Tool Patterns

### Pattern 1: Free Tier with Training Data Usage

**Characteristics**: Free tier uses input data for training; paid/enterprise tier offers opt-out

**Examples**: ChatGPT (Free), Claude (Free), GitHub Copilot (Individual)

**Evaluation**: Check enterprise tier availability, verify no-training guarantee, assess cost vs. benefit

**Decision**: Reject free tier, approve enterprise tier with DPA and clear no-training guarantee

### Pattern 2: Open Source with Cloud Dependencies

**Characteristics**: Open source core requires cloud API keys; separate cloud service terms

**Examples**: LangChain (with OpenAI API), Hugging Face Transformers (with Inference API)

**Evaluation**: Separate library license from cloud service terms; assess self-hosted viability

**Decision**: Library approved; must use with approved cloud services only; prefer self-hosted

### Pattern 3: Browser Extensions with Code Access

**Characteristics**: Browser extension requiring page content/repo access; may send data externally

**Examples**: Grammarly (code context), various AI assistants

**Evaluation**: Review permissions (manifest.json), check data collection, assess scope limitations

**Decision**: Often rejected if sends code/data externally; conditional if data stays local

### Pattern 4: Self-Hosted AI Models

**Characteristics**: Fully local deployment, no external transmission, requires significant compute

**Examples**: Ollama, LM Studio, LocalAI

**Evaluation**: Verify no telemetry, check model license, assess resource requirements

**Decision**: Often approved with operational restrictions and approved model licenses only

### Pattern 5: Enterprise AI Tools with DPAs

**Characteristics**: Paid enterprise tier with DPA, certifications (SOC 2, ISO 27001), SSO support

**Examples**: GitHub Copilot Enterprise, Claude for Work, ChatGPT Enterprise

**Evaluation**: Review DPA carefully, verify current certifications, assess integration complexity

**Decision**: Often approved with clear usage guidelines and regular access reviews

## Red Flags & Warning Signs

### Critical Red Flags (Usually Rejection)

**1. Unclear Data Usage**

- Vague terms like "to improve our services"
- No explicit training data usage statement
- Policy not updated despite active development

**2. Abandoned or Poorly Maintained**

- Last commit >12 months ago
- Critical security issues with no response
- Dependencies with known CVEs
- No active maintainers

**3. Problematic Licensing**

- AGPL for commercial use
- Custom restrictive licenses
- Recent license changes to more restrictive terms
- Example: ElasticSearch (SSPL) requires careful review

**4. No Security Disclosure Process**

- No SECURITY.md or security contact
- History of unpatched vulnerabilities
- Security issues handled publicly without embargo

**5. Data Storage in Problematic Jurisdictions**

- Countries without adequate privacy laws
- No data residency options
- Vendor unwilling to specify storage locations

### Moderate Warning Signs (Require Mitigation)

- **Freemium with Training**: Upgrade to paid tier with no-training guarantee
- **Complex ToS**: Legal review, document key risks
- **Beta/Experimental**: Pilot program, limited rollout, frequent reviews
- **Limited Support**: Require internal expertise, document workarounds

## Approval Decision Patterns

### Decision Matrix

| Risk Level | Data Sensitivity | Decision Pattern                         |
| ---------- | ---------------- | ---------------------------------------- |
| Low        | Non-sensitive    | **Approve** - Standard monitoring        |
| Low        | Sensitive        | **Conditional** - Data type restrictions |
| Medium     | Non-sensitive    | **Conditional** - Additional controls    |
| Medium     | Sensitive        | **Conditional** - Strong controls        |
| High       | Non-sensitive    | **Conditional** - Significant mitigation |
| High       | Sensitive        | **Reject** or **Heavy restrictions**     |

### Conditional Approval Patterns

**A. Data Type Restrictions**

- ✅ Approved for: Public information, documentation, generic code
- ❌ Prohibited for: PII, proprietary code, customer data, credentials

**B. Enterprise Tier Required**

- Must use enterprise/paid tier only
- DPA signed, SSO required where available

**C. Self-Hosted Only**

- Must be self-hosted on approved infrastructure
- No external API calls without approval
- Network egress monitoring

**D. Pilot Program**

- Limited to specific team(s), fixed duration (3-6 months)
- Non-production use, full review after pilot

### Rejection Patterns

**R1. Data Usage Incompatible**: Tool trains on all data, no opt-out available

**R2. Abandoned Project**: No maintenance, critical vulnerabilities

**R3. Compliance Risk**: Cannot meet GDPR, data residency, or other requirements

## Risk Assessment Frameworks

### Data Sensitivity Classification

**Level 1 - Public**: Public documentation, open source code, marketing (Minimal risk)

**Level 2 - Internal**: Internal docs, non-proprietary code, general business info (Low risk)

**Level 3 - Confidential**: Proprietary code, business strategies, internal comms (Medium risk)

**Level 4 - Restricted**: Customer data, PII, credentials, financial information (High risk)

**Level 5 - Critical**: Payment card data, health information (HIPAA), auth credentials (Critical risk)

### Tool Risk Scoring

**Formula**: Risk Score = (Data Sensitivity × Likelihood) + Data Usage + Security Posture - Mitigation

**Scoring**:

- 0-10: Low Risk → **Approve**
- 11-20: Medium Risk → **Conditional Approval**
- 21-30: High Risk → **Reject or Heavy Restrictions**
- 31+: Critical Risk → **Reject**

## Vendor Communication

### Request for Enterprise DPA

Include: No-training guarantee, data storage locations, retention/deletion procedures, subprocessor list, GDPR compliance, security certifications (SOC 2, ISO 27001), pricing, data residency options

### Security Questionnaire

Cover: Data encryption, storage locations, retention policies, third-party sharing, security testing, vulnerability disclosure, certifications, compliance, incident response

### Self-Hosted Deployment Questions

Ask about: Installation docs, system requirements (CPU/memory/GPU), supported platforms, external connectivity, telemetry (and how to disable), backup/restore, updates, HA options, licensing model, support SLA

## Integration Strategies

### Phased Rollout

- **Phase 1 (Weeks 1-4)**: 5-10 users, non-production, gather feedback
- **Phase 2 (Weeks 5-8)**: 20-30 users, production with restrictions, monitor issues
- **Phase 3 (Week 9+)**: General availability, full guidelines enforced

### Usage Tier System

- **Tier 1**: Public data (self-service access)
- **Tier 2**: Internal data (manager approval, training required)
- **Tier 3**: Confidential data (security approval, enhanced monitoring)
- **Restricted**: No PII/credentials (explicit prohibition, technical controls)

### Defense in Depth

- **Policy**: Clear guidelines, training, consequences
- **Technical**: Network filtering, DLP, SSO/RBAC, API monitoring
- **Monitoring**: Audit logs, anomaly detection, behavior analytics
- **Response**: Incident procedures, access revocation, policy updates

## Historical Precedents

### GitHub Copilot (2021-2023)

**Issue**: Individual plan trains on user code
**Resolution**: Enterprise offering added with no-training guarantee
**Lesson**: Monitor tool evolution; re-evaluate as enterprise features emerge

### ChatGPT (2022-2023)

**Issue**: Free tier trains on conversations, no DPA
**Resolution**: Enterprise tier with DPA, SOC 2 compliance
**Lesson**: Consumer tools often get enterprise offerings; clear restrictions prevent misuse

### Elasticsearch (2021)

**Issue**: License changed from Apache 2.0 to SSPL
**Resolution**: Conditional approval for self-hosted; OpenSearch evaluated as alternative
**Lesson**: Monitor license changes; have migration plans for critical dependencies

### Ollama (2023)

**Issue**: Local LLM tool requires GPU resources; model licenses vary
**Resolution**: Approved with operational guidance for commercially-licensed models only
**Lesson**: Self-hosted tools have lower data risk but higher operational complexity

## Best Practices

### For Reviewers

- Read privacy policy and ToS completely; check update dates
- Verify claims (test opt-outs, confirm certifications)
- Consider vendor lock-in and long-term viability
- Communicate clearly with specific, actionable language

### For Requesters

- Check if tool already in registry
- Provide complete evaluation criteria answers with sources
- Research alternatives (similar approved tools, self-hosted options)
- Plan for compliance (budget enterprise tier, plan training)

### For Organizations

- Maintain living registry with version numbers and rationale
- Regular re-evaluation (quarterly for high-risk, annually for low-risk)
- User education with clear consequences
- Continuous improvement from incidents and feedback

## Quick Reference: Common Tools

| Tool                      | Status         | Key Requirement              |
| ------------------------- | -------------- | ---------------------------- |
| ChatGPT Free              | ❌ Rejected    | Use Enterprise tier          |
| ChatGPT Enterprise        | ✅ Approved    | DPA, restrictions apply      |
| GitHub Copilot Individual | ❌ Rejected    | Use Business/Enterprise      |
| GitHub Copilot Enterprise | ✅ Approved    | Enterprise tier only         |
| Claude Free               | ❌ Rejected    | Use Claude for Work          |
| Claude for Work           | ✅ Approved    | DPA, restrictions apply      |
| Ollama                    | ✅ Approved    | Self-hosted, approved models |
| Cursor (with own API)     | ⚠️ Conditional | Use approved LLM APIs        |
| Grammarly                 | ⚠️ Conditional | No code context access       |
| ElasticSearch (SSPL)      | ⚠️ Conditional | Self-hosted, license review  |

**Legend**: ✅ Approved | ⚠️ Conditional | ❌ Rejected

## References

- [RFC 98: AI Open Source Tools Approval Process](https://gitlab.com/plg-tech/plg/knowledge/rfcs/-/blob/feat/IP-23-ai-tools-approval-process/rfc-0098-ai-opensource-tools-approval-process.md)
- [Approved AI Tools Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry)
- [GDPR Data Processing Agreement Template](https://gdpr.eu/data-processing-agreement/)
- [OpenSSF Best Practices Badge](https://bestpractices.coreinfrastructure.org/)
