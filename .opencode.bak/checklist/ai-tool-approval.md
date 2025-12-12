---
title: AI Tool Approval Checklist
description: Comprehensive evaluation checklist for AI and open source tool approval per RFC 98
version: 1.0.0
last_updated: 2025-11-11
reference: RFC 98 - AI Open Source Tools Approval Process
type: checklist
category: Quality
tags:
  - checklist
  - tool
  - approval
  - comprehensive
  - evaluation
---

# AI Tool Approval Checklist

Use this checklist to ensure comprehensive evaluation of AI tools and open source software according to RFC 98: AI Open
Source Tools Approval Process.

## Pre-Submission Information

### Tool Identification

- [ ] Tool name documented
- [ ] Current version number identified
- [ ] Vendor/maintainer information collected
- [ ] Tool category determined (AI service, open source library, development tool, etc.)
- [ ] Official website/repository URL documented
- [ ] License type identified

### Business Context

- [ ] Primary use case clearly defined
- [ ] Business justification articulated
- [ ] Alternative tools considered and documented
- [ ] Estimated number of users identified
- [ ] Usage scope defined (team, department, organization-wide)
- [ ] Current usage status documented (new request vs already in use)
- [ ] Sponsor identified (manager/team lead)

## Data Privacy & Security Assessment

### Training Data Usage

- [ ] Reviewed data usage policies
- [ ] Confirmed whether input data is used for model training
- [ ] Documented data retention period
- [ ] Verified if training data usage applies to all tiers (free vs paid)
- [ ] Checked for automatic vs manual data usage consent

### Opt-Out Mechanisms

- [ ] Opt-out option availability confirmed
- [ ] Opt-out process documented (if available)
- [ ] Opt-out effectiveness verified (retroactive vs future-only)
- [ ] Opt-out audit trail available
- [ ] Organization-wide opt-out supported (if applicable)

### Data Storage & Sovereignty

- [ ] Data storage locations identified (geographic regions)
- [ ] Data sovereignty compliance verified
- [ ] Data residency requirements met
- [ ] Multi-region storage options reviewed
- [ ] Data backup locations documented

### Data Retention & Deletion

- [ ] Data retention policy clearly stated
- [ ] Retention period documented (days/months/years)
- [ ] Data deletion process defined
- [ ] User-initiated deletion supported
- [ ] Deletion audit trail available
- [ ] Post-deletion data handling verified

### Encryption Standards

- [ ] Encryption in transit verified (TLS version)
- [ ] Encryption at rest confirmed
- [ ] Key management approach documented
- [ ] Certificate validation practices reviewed
- [ ] Encryption algorithm standards verified (AES-256, etc.)

### Third-Party Access

- [ ] Third-party data sharing policies reviewed
- [ ] Subprocessor list obtained (if applicable)
- [ ] Third-party access purposes documented
- [ ] Data sharing agreements reviewed
- [ ] User consent for third-party sharing verified

## Compliance & Legal Assessment

### GDPR Compliance

- [ ] GDPR compliance statement reviewed
- [ ] Data Processing Agreement (DPA) available
- [ ] Right to access supported
- [ ] Right to erasure (right to be forgotten) supported
- [ ] Right to data portability supported
- [ ] Privacy by design principles followed
- [ ] Data protection impact assessment (DPIA) available (if required)
- [ ] EU representative identified (if non-EU vendor)

### Terms of Service & Privacy Policy

- [ ] Terms of Service reviewed and current
- [ ] Privacy Policy reviewed and current
- [ ] ToS/Privacy Policy last update date noted
- [ ] Change notification process documented
- [ ] Acceptable use policy reviewed
- [ ] ToS/Privacy Policy clarity verified (readable, non-ambiguous)

### Intellectual Property

- [ ] IP ownership for generated content clarified
- [ ] Code/content licensing terms understood
- [ ] Commercial use restrictions identified
- [ ] Attribution requirements documented
- [ ] Derivative works rights clarified
- [ ] IP indemnification clauses reviewed

### Software Licensing

- [ ] Software license type identified (MIT, Apache, GPL, proprietary, etc.)
- [ ] License compatibility with organizational use verified
- [ ] Copyleft obligations understood (if applicable)
- [ ] License attribution requirements documented
- [ ] Dual licensing options reviewed (if applicable)
- [ ] License restrictions for commercial use identified

### Contractual & Compliance

- [ ] Service Level Agreement (SLA) reviewed
- [ ] Uptime guarantees documented
- [ ] Support response times clarified
- [ ] Termination clauses reviewed
- [ ] Data return/export process documented
- [ ] Liability limitations understood
- [ ] Indemnification terms reviewed

## Security Assessment

### Dependency Management

- [ ] Dependency tree reviewed (for open source tools)
- [ ] Known vulnerabilities checked (CVE database, Snyk, etc.)
- [ ] Dependency update frequency assessed
- [ ] Transitive dependency risks evaluated
- [ ] Dependency license compatibility verified
- [ ] Supply chain security assessed (SBOM available)

### Maintenance & Community Health

- [ ] Recent commit activity verified (last 3-6 months)
- [ ] Release frequency assessed
- [ ] Issue response time evaluated
- [ ] Community size and engagement reviewed
- [ ] Core maintainer activity checked
- [ ] Project governance model understood
- [ ] Funding/sustainability model assessed

### Security Practices

- [ ] Security policy available (SECURITY.md or similar)
- [ ] Vulnerability disclosure process documented
- [ ] Security advisory history reviewed
- [ ] Bug bounty program existence verified
- [ ] Security audit reports available (if applicable)
- [ ] Penetration testing performed (if applicable)
- [ ] Security certifications obtained (SOC 2, ISO 27001, etc.)

### Authentication & Authorization

- [ ] Authentication mechanisms reviewed (SSO, MFA, API keys)
- [ ] SSO/SAML support verified (if required)
- [ ] Role-based access control (RBAC) available
- [ ] API authentication security assessed
- [ ] Session management practices reviewed
- [ ] Password policies documented (if applicable)

### Audit & Logging

- [ ] Audit logging capabilities verified
- [ ] Log retention period documented
- [ ] Log access controls reviewed
- [ ] Security event monitoring available
- [ ] Log export/SIEM integration supported
- [ ] Compliance reporting capabilities assessed

## Operational Assessment

### Deployment Model

- [ ] Deployment options identified (SaaS, self-hosted, on-premise, hybrid)
- [ ] Self-hosted feasibility assessed (if applicable)
- [ ] Cloud provider dependencies identified
- [ ] Multi-cloud support verified (if applicable)
- [ ] Air-gapped deployment supported (if required)

### Resource Requirements

- [ ] CPU requirements documented
- [ ] Memory requirements documented
- [ ] Storage requirements documented
- [ ] Network bandwidth requirements identified
- [ ] GPU requirements assessed (for AI/ML tools)
- [ ] Scaling characteristics understood

### Production Stability

- [ ] Known issues reviewed
- [ ] Service uptime history checked
- [ ] Incident history reviewed
- [ ] Disaster recovery capabilities assessed
- [ ] Backup and restore procedures documented
- [ ] Failover mechanisms reviewed

### Integration & Compatibility

- [ ] Integration complexity assessed
- [ ] API availability and stability verified
- [ ] Webhook/event notification support reviewed
- [ ] SDK/library availability checked
- [ ] Existing system compatibility verified
- [ ] Data import/export capabilities assessed

### Support & Documentation

- [ ] Documentation quality evaluated
- [ ] Getting started guides available
- [ ] API documentation completeness verified
- [ ] Support channels identified (email, chat, forum)
- [ ] Support response SLA documented
- [ ] Community forum/discussion availability checked
- [ ] Training materials available

## Risk Analysis

### Risk Identification

- [ ] Data privacy risks identified
- [ ] Security vulnerabilities documented
- [ ] Compliance risks assessed
- [ ] Operational risks evaluated
- [ ] Vendor lock-in risks considered
- [ ] Business continuity risks identified

### Risk Severity Rating

- [ ] Each risk assigned severity (High/Medium/Low)
- [ ] Risk likelihood assessed
- [ ] Risk impact evaluated
- [ ] Overall risk score calculated
- [ ] Risk tolerance threshold compared

### Mitigation Strategies

- [ ] Mitigation plan developed for each high-risk item
- [ ] Compensating controls identified
- [ ] Risk acceptance decisions documented
- [ ] Residual risk assessed after mitigation
- [ ] Risk owner assigned for each risk

## Decision & Approval

### Recommendation

- [ ] Clear recommendation formulated (Approve/Reject/Conditional)
- [ ] Recommendation justification documented
- [ ] Supporting evidence cited
- [ ] Alternative tools considered
- [ ] Cost-benefit analysis performed

### Usage Guidelines (if Approved)

- [ ] Approved use cases defined
- [ ] Prohibited use cases identified
- [ ] Data handling requirements specified
- [ ] User training requirements documented
- [ ] Access control requirements defined
- [ ] Compliance monitoring requirements specified

### Conditional Approval Requirements (if Conditional)

- [ ] Specific conditions for approval listed
- [ ] Timeline for meeting conditions defined
- [ ] Condition verification process documented
- [ ] Fallback plan if conditions not met
- [ ] Interim usage restrictions specified

### Monitoring Plan

- [ ] Review frequency determined (quarterly, annually)
- [ ] Key metrics to monitor identified
- [ ] Monitoring responsibilities assigned
- [ ] Trigger conditions for re-evaluation defined
- [ ] Registry update process documented

## Documentation & Submission

### Assessment Report

- [ ] Executive summary completed
- [ ] Detailed findings documented
- [ ] Evidence and sources cited
- [ ] Risk analysis included
- [ ] Recommendation clearly stated

### RFC Submission

- [ ] RFC document formatted per standards
- [ ] All evaluation criteria addressed
- [ ] Checklist completed and included
- [ ] Supporting documentation attached
- [ ] Stakeholder review completed

### Registry Update

- [ ] Tool entry prepared for Confluence registry
- [ ] Category assigned (Enterprise/Open Source/Under Review)
- [ ] Version and tier documented
- [ ] Restrictions and limitations listed
- [ ] Review date and schedule set
- [ ] Access path/procurement process documented

## Post-Approval Actions

### Implementation (if Approved)

- [ ] Procurement initiated (if required)
- [ ] Access provisioning planned
- [ ] User training scheduled
- [ ] Usage guidelines communicated
- [ ] Monitoring dashboard configured

### Communication

- [ ] Approval decision announced
- [ ] Registry updated and published
- [ ] Stakeholders notified
- [ ] Training materials distributed
- [ ] Support channels established

### Emergency Use (if applicable)

- [ ] Temporary approval timeframe set (≤90 days)
- [ ] Sponsor accountability documented
- [ ] Mitigation plan activated
- [ ] Full review process initiated
- [ ] Expiry date and risk owner recorded in registry

## Quality Assurance

### Review Completeness

- [ ] All checklist items addressed
- [ ] No information gaps remain
- [ ] All sources properly cited
- [ ] Version numbers and dates current
- [ ] Document formatting consistent

### Peer Review

- [ ] Security team review obtained (if required)
- [ ] Legal team review obtained (if required)
- [ ] Technical review completed
- [ ] Feedback incorporated
- [ ] Final approval obtained

---

## Checklist Scoring

**Completion Rate:** **\_** / **\_** items (**\_** %)

**Risk Assessment Summary:**

- High Risk Items: **\_**
- Medium Risk Items: **\_**
- Low Risk Items: **\_**

**Recommendation:** ☐ Approve | ☐ Reject | ☐ Conditional Approval

**Reviewer Name:** \***\*\*\*\*\***\_\***\*\*\*\*\*** **Review Date:** \***\*\*\*\*\***\_\***\*\*\*\*\*** **Next Review Date:** \***\*\*\*\*\***\_\***\*\*\*\*\***

---

## References

- [RFC 98: AI Open Source Tools Approval Process](https://gitlab.com/plg-tech/plg/knowledge/rfcs/-/blob/feat/IP-23-ai-tools-approval-process/rfc-0098-ai-opensource-tools-approval-process.md)
- [Approved AI Tools Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry)
- [Vendor Vetting Process](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1366294529/Vendor+vetting+process)
