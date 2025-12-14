---
title: AI Tool Approval Knowledge Base
description: Comprehensive reference for AI and open source tool approval patterns, common findings, and best practices
version: 1.0.0
last_updated: 2025-11-11
reference: RFC 98 - AI Open Source Tools Approval Process
type: knowledge-base
category: Documentation
tags:
    - knowledge-base
    - tool
    - approval
    - comprehensive
    - reference
---

# AI Tool Approval Knowledge Base

## Overview

This knowledge base provides practical patterns, common findings, and guidance for evaluating AI tools and open source
software according to RFC 98.

## Table of Contents

1. [Common Tool Patterns](#common-tool-patterns)
2. [Red Flags & Warning Signs](#red-flags--warning-signs)
3. [Approval Decision Patterns](#approval-decision-patterns)
4. [Risk Assessment Frameworks](#risk-assessment-frameworks)
5. [Vendor Response Templates](#vendor-response-templates)
6. [Integration Strategies](#integration-strategies)
7. [Historical Precedents](#historical-precedents)

---

## Common Tool Patterns

### Pattern 1: Free Tier with Training Data Usage

**Typical Characteristics:**

- Free tier available with generous limits
- Input data used for model training by default
- Paid/enterprise tier offers opt-out from training
- Vague language about "improving the service"

**Examples:** ChatGPT (Free), Claude (Free), GitHub Copilot (Individual)

**Evaluation Approach:**

1. Check if enterprise tier is available
2. Verify enterprise tier has explicit no-training guarantee
3. Assess cost vs. benefit of enterprise upgrade
4. Consider self-hosted alternatives

**Typical Decision:** Reject free tier, approve enterprise tier if:

- Clear no-training guarantee in contract
- DPA available
- Usage justifies cost

**Sample Policy Language:**

> "ChatGPT Free is not approved. ChatGPT Enterprise is approved with restrictions: no PII, no proprietary code, no
> customer data."

---

### Pattern 2: Open Source with Cloud Dependencies

**Typical Characteristics:**

- Open source core with permissive license (MIT/Apache)
- Requires cloud API keys for full functionality
- Cloud service has separate terms and data usage
- Self-hosted option available but complex

**Examples:** LangChain (with OpenAI API), Hugging Face Transformers (with Inference API)

**Evaluation Approach:**

1. Separate evaluation: library license vs. cloud service terms
2. Assess if self-hosted deployment viable
3. Review cloud service data usage policies
4. Check if approved cloud services can be used

**Typical Decision:** Conditional approval:

- Library approved for use
- Must use with approved cloud services only
- Self-hosted deployment preferred where feasible

---

### Pattern 3: Browser Extensions with Code Access

**Typical Characteristics:**

- Browser extension for productivity
- Requires access to page content or GitHub repos
- May send code/data to external servers
- Free or freemium model

**Examples:** Grammarly (code context), Wappalyzer, various AI assistants

**Evaluation Approach:**

1. Review extension permissions (manifest.json)
2. Check what data is collected and where it goes
3. Assess if extension can be scoped to non-sensitive contexts
4. Consider alternatives with less intrusive permissions

**Typical Decision:** Often rejected or heavily restricted:

- Reject if sends code/data to external servers
- Conditional approval if data stays local
- Require per-user explicit consent and training

---

### Pattern 4: Self-Hosted AI Models

**Typical Characteristics:**

- Fully local/self-hosted deployment
- No external data transmission
- Open source model and runtime
- Requires significant compute resources

**Examples:** Ollama, LM Studio, LocalAI, text-generation-webui

**Evaluation Approach:**

1. Verify no telemetry or phone-home behavior
2. Check model license (some are research-only)
3. Assess resource requirements (GPU needs)
4. Review security of deployment environment

**Typical Decision:** Often approved with operational restrictions:

- Approved for development/testing
- Must use approved model licenses
- IT support for deployment recommended
- Resource allocation must be approved

---

### Pattern 5: Enterprise AI Tools with DPAs

**Typical Characteristics:**

- Paid enterprise tier specifically for business use
- Data Processing Agreement (DPA) available
- SOC 2, ISO 27001 certifications
- No training on customer data by default
- SSO/SAML support

**Examples:** GitHub Copilot Enterprise, Claude for Work, ChatGPT Enterprise

**Evaluation Approach:**

1. Review DPA terms carefully
2. Verify certifications are current
3. Check contract termination and data deletion clauses
4. Assess integration complexity (SSO, RBAC)
5. Evaluate cost vs. value

**Typical Decision:** Often approved with clear usage guidelines:

- Approved for specified use cases
- Must use SSO where available
- Regular access reviews required
- Cost monitored per department

---

## Red Flags & Warning Signs

### Critical Red Flags (Usually Rejection)

#### 1. Unclear Data Usage

**Warning Signs:**

- Privacy policy uses vague terms like "to improve our services"
- No explicit statement about training data usage
- Different policies for different regions without clear indication
- Policy hasn't been updated in years despite active development

**Example Language:**

> ❌ "We may use your data to improve, develop, and train our models and services." ✅ "We do not use your data to train
> our models. Enterprise customers can opt out of any data usage."

#### 2. Abandoned or Poorly Maintained Projects

**Warning Signs:**

- Last commit >12 months ago
- Critical security issues open with no response
- Dependencies with known CVEs
- No active maintainers
- Community has forked the project

**Evaluation:**

- Check for active forks
- Assess internal capability to maintain if critical
- Consider alternatives with active maintenance

#### 3. Problematic Licensing

**Warning Signs:**

- AGPL license (for commercial use)
- Custom restrictive licenses
- Unclear commercial use terms
- License changed recently to more restrictive terms

**Example:**

- ElasticSearch (SSPL license) → Rejected for most use cases
- Redis (changed to SSPL) → Required license review

#### 4. No Security Disclosure Process

**Warning Signs:**

- No SECURITY.md or security policy
- No security contact in documentation
- History of unpatched vulnerabilities
- Security issues handled in public issue tracker without embargo

**Impact:** Increases risk; may require additional security controls

#### 5. Data Storage in Problematic Jurisdictions

**Warning Signs:**

- Data stored in countries without adequate privacy laws
- No clear data residency options
- Vendor unwilling to specify storage locations
- Data may be accessed by foreign governments without due process

**Common Issues:**

- China data residency for global tools
- Russia for certain vendors
- No EU data residency option

---

### Moderate Warning Signs (Require Mitigation)

#### 1. Freemium Model with Training

**Mitigation:** Upgrade to paid tier with no-training guarantee

#### 2. Complex Terms of Service

**Mitigation:** Legal review, document key risks, create summary guide

#### 3. Beta/Experimental Status

**Mitigation:** Pilot program, limited rollout, frequent reviews

#### 4. Limited Support

**Mitigation:** Internal expertise required, document workarounds, fallback plan

---

## Approval Decision Patterns

### Decision Matrix

| Risk Level | Data Sensitivity | Decision Pattern                                   |
| ---------- | ---------------- | -------------------------------------------------- |
| Low        | Non-sensitive    | **Approve** - Standard monitoring                  |
| Low        | Sensitive        | **Conditional** - Restrictions on data types       |
| Medium     | Non-sensitive    | **Conditional** - Additional controls              |
| Medium     | Sensitive        | **Conditional** - Strong controls, frequent review |
| High       | Non-sensitive    | **Conditional** - Significant mitigation required  |
| High       | Sensitive        | **Reject** or **Heavy restrictions**               |

### Common Conditional Approval Patterns

#### Pattern A: Data Type Restrictions

**Use for:** Tools with good security but some data usage concerns

**Restrictions:**

- ✅ Approved for: Public information, documentation, generic code patterns
- ❌ Prohibited for: PII, proprietary code, customer data, credentials

**Monitoring:** User training, spot audits, access logs review

---

#### Pattern B: Enterprise Tier Required

**Use for:** Tools with free tier that uses training data

**Restrictions:**

- Must use enterprise/paid tier only
- Verify enterprise features enabled (no-training opt-out)
- SSO required where available
- DPA must be signed

**Monitoring:** License compliance checks, contract renewals

---

#### Pattern C: Self-Hosted Only

**Use for:** Open source tools with cloud service data concerns

**Restrictions:**

- Must be self-hosted on approved infrastructure
- No external API calls without approval
- Network egress monitoring
- Regular security updates required

**Monitoring:** Infrastructure team oversight, security scans

---

#### Pattern D: Pilot Program

**Use for:** Promising but unproven tools

**Restrictions:**

- Limited to specific team(s)
- Fixed duration (3-6 months)
- Non-production use only
- Full review after pilot

**Monitoring:** Pilot metrics, user feedback, incident tracking

---

### Rejection Patterns

#### Pattern R1: Data Usage Incompatible

**Reason:** Tool trains on all user data, no opt-out available

**Response:**

> "Rejected due to mandatory training data usage. Reconsider if enterprise tier with no-training guarantee becomes
> available."

---

#### Pattern R2: Abandoned Project

**Reason:** No maintenance, critical vulnerabilities

**Response:**

> "Rejected due to lack of active maintenance. Consider approved alternatives: [List]. May reconsider if project resumes
> active development or we identify active fork."

---

#### Pattern R3: Compliance Risk Too High

**Reason:** Cannot meet GDPR, data residency, or other compliance requirements

**Response:**

> "Rejected due to inability to meet GDPR requirements. No DPA available, data stored in jurisdictions without adequate
> privacy protections."

---

## Risk Assessment Frameworks

### Data Sensitivity Classification

**Level 1 - Public:**

- Public documentation
- Open source code (already public)
- Marketing materials
- **Risk:** Minimal

**Level 2 - Internal:**

- Internal documentation
- Non-proprietary code
- General business information
- **Risk:** Low

**Level 3 - Confidential:**

- Proprietary code
- Business strategies
- Internal communications
- **Risk:** Medium

**Level 4 - Restricted:**

- Customer data
- PII
- Credentials/secrets
- Financial information
- **Risk:** High

**Level 5 - Critical:**

- Payment card data
- Health information (HIPAA)
- Authentication credentials
- **Risk:** Critical

### Tool Risk Scoring

**Formula:** Risk Score = (Data Sensitivity × Likelihood) + (Data Usage Concerns) + (Security Posture) - (Mitigation
Effectiveness)

**Scoring:**

- 0-10: Low Risk → **Approve**
- 11-20: Medium Risk → **Conditional Approval**
- 21-30: High Risk → **Reject or Heavy Restrictions**
- 31+: Critical Risk → **Reject**

**Example:**

```
Tool: GitHub Copilot Individual
- Data Sensitivity: 3 (Confidential - proprietary code)
- Likelihood: 5 (High - continuous data transmission)
- Data Usage Concerns: 5 (Trains on code)
- Security Posture: -2 (Good security, Microsoft-backed)
- Mitigation: 0 (No enterprise tier used)
= 3×5 + 5 + 0 - 0 = 20 (Medium-High Risk)
→ Decision: Conditional (Enterprise tier required)
```

---

## Vendor Response Templates

### Template 1: Request for Enterprise DPA

```
Subject: Data Processing Agreement Request for [Tool Name]

Hello [Vendor],

We are evaluating [Tool Name] for organizational use and require a Data Processing Agreement (DPA) that addresses:

1. Explicit guarantee that customer data is not used for model training
2. Data storage locations and residency options
3. Data retention and deletion procedures
4. Subprocessor list and notification process
5. GDPR compliance mechanisms
6. Security certifications (SOC 2, ISO 27001)

Please provide:
- Standard DPA template
- Enterprise feature comparison (vs. free/individual tiers)
- Pricing for [estimated user count]
- Data residency options

Thank you,
[Name]
```

---

### Template 2: Security Questionnaire

```
Subject: Security Assessment for [Tool Name]

We are conducting a security assessment of [Tool Name]. Please provide information on:

**Data Security:**
1. Data encryption (in transit and at rest)
2. Data storage locations
3. Data retention policies
4. Third-party data sharing practices

**Application Security:**
5. Security testing practices (SAST, DAST, pen testing)
6. Vulnerability disclosure process
7. Security certifications
8. Compliance (SOC 2, ISO 27001, GDPR)

**Incident Response:**
9. Security incident notification process
10. Incident response timeline commitments

Please provide documentation or responses within [timeframe].

Thank you,
[Name]
```

---

### Template 3: Self-Hosted Deployment Questions

```
Subject: Self-Hosted Deployment Information for [Tool Name]

We are interested in self-hosting [Tool Name]. Please provide:

**Deployment:**
1. Installation documentation
2. System requirements (CPU, memory, storage, GPU)
3. Supported platforms (Docker, Kubernetes, VM)

**Networking:**
4. Required external connectivity (if any)
5. API endpoints that need access
6. Telemetry/analytics (and how to disable)

**Operations:**
7. Backup and restore procedures
8. Update/upgrade process
9. High availability options
10. Monitoring and logging recommendations

**Licensing:**
11. Self-hosted licensing model
12. Differences from cloud offering
13. Support SLA for self-hosted

Thank you,
[Name]
```

---

## Integration Strategies

### Strategy 1: Phased Rollout

**Phase 1: Pilot (Weeks 1-4)**

- Select 5-10 users across different teams
- Non-production use only
- Gather feedback on utility and issues

**Phase 2: Expanded Pilot (Weeks 5-8)**

- Expand to 20-30 users
- Include production use with restrictions
- Monitor for security/compliance issues

**Phase 3: General Availability (Week 9+)**

- Open to all approved users
- Full usage guidelines enforced
- Regular monitoring and reviews

---

### Strategy 2: Usage Tier System

**Tier 1: Approved for Public Data**

- Can use with public information only
- No additional approval needed
- Self-service access

**Tier 2: Approved for Internal Data**

- Requires manager approval
- Training completion required
- Access logging enabled

**Tier 3: Approved for Confidential Data**

- Requires security team approval
- Enhanced monitoring
- Regular access reviews

**Restricted: Not Approved for PII/Credentials**

- Explicit prohibition
- Technical controls where possible
- User attestation required

---

### Strategy 3: Defense in Depth

**Layer 1: Policy**

- Clear usage guidelines
- Training requirements
- Consequences for violations

**Layer 2: Technical Controls**

- Network egress filtering
- DLP (Data Loss Prevention) integration
- SSO/RBAC enforcement
- API usage monitoring

**Layer 3: Monitoring**

- Audit log review
- Anomaly detection
- User behavior analytics
- Regular security assessments

**Layer 4: Response**

- Incident response procedures
- Access revocation process
- Lessons learned and policy updates

---

## Historical Precedents

### Case Study 1: GitHub Copilot

**Timeline:**

- **2021:** GitHub Copilot released (Individual plan)
- **Initial Assessment:** Rejected for organizational use
    - Trains on public code (licensing concerns)
    - Individual plan trains on user code
    - No enterprise offering

- **2023:** GitHub Copilot for Business released
    - Enterprise features: no training on customer code
    - **Re-assessment:** Conditionally approved
    - Restrictions: Business/Enterprise tier only, no Individual plan

- **Outcome:** Widely adopted with clear tier requirements

**Lessons Learned:**

- Monitor tool evolution; enterprise features may address concerns
- Clear tier differentiation critical
- Regular re-evaluation important

---

### Case Study 2: ChatGPT Enterprise

**Timeline:**

- **2022:** ChatGPT released (Free tier)
- **Initial Assessment:** Rejected for work use
    - Trains on conversations
    - No DPA
    - No data residency options

- **2023:** ChatGPT Enterprise launched
    - No training on business data
    - DPA available
    - SOC 2 compliant
    - **Assessment:** Approved with restrictions
    - Restrictions: No PII, no customer data, internal use only

- **Outcome:** Approved for documentation, brainstorming, non-sensitive use cases

**Lessons Learned:**

- Free consumer tools often get enterprise offerings
- Data sensitivity classification critical for usage guidelines
- Clear communication about restrictions prevents misuse

---

### Case Study 3: Elasticsearch License Change

**Timeline:**

- **Pre-2021:** Elasticsearch (Apache 2.0 license)
    - **Status:** Approved, widely used

- **2021:** License changed to SSPL (Server Side Public License)
    - SSPL has restrictive terms for cloud services
    - **Re-assessment Required**
    - Concerns: Commercial use restrictions, source code disclosure requirements

- **Decision:** Conditional approval
    - Self-hosted use approved
    - Must not offer as a service
    - Evaluated OpenSearch (Apache 2.0 fork) as alternative

- **Outcome:** Some teams migrated to OpenSearch, others stayed on pre-SSPL version

**Lessons Learned:**

- Monitor license changes (subscribe to project announcements)
- Have migration plans for critical dependencies
- Evaluate forks when licenses become restrictive

---

### Case Study 4: Local LLM Tools (Ollama)

**Timeline:**

- **2023:** Ollama released for local LLM hosting
- **Assessment:**
    - MIT license (permissive)
    - Fully local, no external data transmission
    - Requires GPU for practical use
    - Models have separate licenses

- **Decision:** Approved with operational guidance
    - Approved for development use
    - IT support for GPU resource allocation
    - Must use commercially-licensed models (e.g., Llama 2, Mistral)
    - Not for research-only models

- **Outcome:** Adopted by development teams for local AI experimentation

**Lessons Learned:**

- Self-hosted tools have lower data risk but higher operational complexity
- Model licenses separate from tool licenses
- Resource requirements (GPU) require planning

---

## Best Practices Summary

### For Reviewers

1. **Start with Documentation**
    - Always read privacy policy and ToS completely
    - Check for last update dates
    - Look for enterprise-specific terms

2. **Verify, Don't Assume**
    - Test opt-out processes
    - Confirm claimed certifications
    - Review actual code for open source projects

3. **Think Long-Term**
    - Consider vendor lock-in
    - Plan for tool deprecation/changes
    - Document decision rationale for future reviews

4. **Communicate Clearly**
    - Use specific, actionable language
    - Provide alternatives when rejecting
    - Create user-friendly usage guidelines

### For Requesters

1. **Do Initial Research**
    - Check if tool already in registry
    - Review similar tool decisions
    - Understand tool's business model

2. **Provide Complete Information**
    - Include all evaluation criteria answers
    - Cite sources
    - Be honest about current usage

3. **Consider Alternatives**
    - Research similar approved tools
    - Evaluate self-hosted options
    - Assess true necessity

4. **Plan for Compliance**
    - Identify sponsor early
    - Budget for enterprise tier if needed
    - Plan user training

### For Organizations

1. **Maintain Living Registry**
    - Update regularly
    - Include version numbers
    - Document restriction rationale

2. **Regular Re-evaluation**
    - Quarterly for high-risk tools
    - Annually for low-risk tools
    - Triggered by incidents or changes

3. **User Education**
    - Regular training on approved tools
    - Clear consequences for violations
    - Easy-to-find approval status

4. **Continuous Improvement**
    - Learn from incidents
    - Update criteria based on experience
    - Gather user feedback

---

## Quick Reference: Common Tools Status

| Tool                      | Category       | Typical Status      | Key Requirement                  |
| ------------------------- | -------------- | ------------------- | -------------------------------- |
| ChatGPT Free              | AI Assistant   | ❌ Rejected         | Use Enterprise tier              |
| ChatGPT Enterprise        | AI Assistant   | ✅ Approved         | DPA, restrictions apply          |
| GitHub Copilot Individual | AI Dev Tool    | ❌ Rejected         | Use Business/Enterprise          |
| GitHub Copilot Enterprise | AI Dev Tool    | ✅ Approved         | Enterprise tier only             |
| Claude Free               | AI Assistant   | ❌ Rejected         | Use Claude for Work              |
| Claude for Work           | AI Assistant   | ✅ Approved         | DPA, restrictions apply          |
| Ollama                    | Local LLM      | ✅ Approved         | Self-hosted, approved models     |
| Cursor (with own API)     | AI Dev Tool    | ⚠️ Conditional      | Must use approved LLM APIs       |
| Grammarly                 | Productivity   | ⚠️ Conditional      | No code context access           |
| ElasticSearch (SSPL)      | Infrastructure | ⚠️ Conditional      | Self-hosted only, license review |
| Random Chrome Extension   | Browser Tool   | ❌ Usually Rejected | Case-by-case, heavy scrutiny     |

**Legend:**

- ✅ Approved: Generally approved with standard restrictions
- ⚠️ Conditional: Requires specific conditions or configuration
- ❌ Rejected: Not approved in standard form

---

## References

- [RFC 98: AI Open Source Tools Approval Process](https://gitlab.com/plg-tech/plg/knowledge/rfcs/-/blob/feat/IP-23-ai-tools-approval-process/rfc-0098-ai-opensource-tools-approval-process.md)
- [Approved AI Tools Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry)
- [GDPR Data Processing Agreement Template](https://gdpr.eu/data-processing-agreement/)
- [OpenSSF Best Practices Badge](https://bestpractices.coreinfrastructure.org/)
- [CVE Database](https://cve.mitre.org/)
- [SPDX License List](https://spdx.org/licenses/)
