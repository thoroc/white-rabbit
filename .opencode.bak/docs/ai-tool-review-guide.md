# AI Tool Approval Review - Quick Reference

## Overview

The AI Tool Approval Review system provides automated guidance for evaluating AI tools and open source software
according to
[RFC 98: AI Open Source Tools Approval Process](https://gitlab.com/plg-tech/plg/knowledge/rfcs/-/blob/feat/IP-23-ai-tools-approval-process/rfc-0098-ai-opensource-tools-approval-process.md).

## Usage

### Basic Command

```bash
/review-tool <tool-name> [version] [vendor]
```

### Examples

```bash
# Review a specific AI tool
/review-tool GitHub Copilot

# Review with version and vendor info
/review-tool Cursor 0.40.0 "Anysphere Inc"

# Start interactive review (agent will prompt for details)
/review-tool
```

## What Gets Evaluated

### Data Privacy & Security

- ✓ Training data usage
- ✓ Opt-out mechanisms
- ✓ Data storage location
- ✓ Retention policies
- ✓ Encryption standards
- ✓ Third-party access

### Compliance & Legal

- ✓ GDPR compliance
- ✓ Terms of Service clarity
- ✓ IP ownership
- ✓ Licensing restrictions

### Security Assessment

- ✓ Dependency vulnerabilities
- ✓ Maintenance activity
- ✓ Security reporting process
- ✓ Authentication mechanisms

### Operational Considerations

- ✓ Deployment options (cloud/self-hosted)
- ✓ Resource requirements
- ✓ Production stability
- ✓ Integration complexity

## Outputs Generated

1. **Detailed Assessment Report** (`./docs/tool-reviews/[tool-name]-assessment-[date].md`)
    - Comprehensive evaluation across all criteria
    - Risk analysis with evidence
    - Mitigation strategies

2. **RFC Submission** (`./docs/tool-reviews/[tool-name]-rfc-submission-[date].md`)
    - Formatted for RFC forum submission
    - Complete criteria checklist
    - Executive summary and recommendation

## Tool Categories

### Approved Enterprise

Paid/enterprise tiers meeting privacy, security, and compliance standards.

**Examples:** ChatGPT Enterprise, Claude for Work, GitHub Copilot Enterprise

### Approved Open Source

Vetted self-hosted or local tools with acceptable license and maintenance.

**Examples:** Ollama, LM Studio (self-hosted LLMs)

### Under Review

Tools submitted and awaiting decision from approval committee.

## Process Flow

```
1. Submit Review Request (/review-tool)
   ↓
2. Agent Conducts Research
   - Fetches documentation
   - Analyzes security posture
   - Reviews compliance status
   ↓
3. Generate Assessment
   - Risk analysis
   - Recommendation (Approve/Reject/Conditional)
   - Usage guidelines
   ↓
4. Create RFC Submission
   - Structured format for committee
   - Evidence and citations
   - Monitoring plan
   ↓
5. Submit to RFC Forum
   - Post generated RFC document
   - Await committee review
   ↓
6. Update Registry
   - Add to Confluence registry
   - Document restrictions
   - Set review schedule
```

## Important Guidelines

### Assumption: Tools Are NOT Approved

Unless explicitly listed in the
[Approved AI Tools Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry),
assume all tools require review.

### Do NOT Use Without Approval

- ✗ Connect company systems to unapproved tools
- ✗ Share source code or PII with public AI services
- ✗ Adopt tools for ongoing work without assessment

### Red Flags to Watch For

- Vague or incomplete privacy policies
- Data usage for training without opt-out
- Unclear data storage locations
- Abandoned projects with stale dependencies
- No security vulnerability reporting process
- "Free" tools with unclear business models

## Emergency Use Process

For urgent tool needs requiring temporary approval:

```bash
/review-tool <tool-name> --urgent
```

Agent will prompt for:

- Sponsor (manager/team lead)
- Business justification
- Mitigation plan
- Expiry date (≤90 days)

Temporary approval allows immediate use while full review proceeds in parallel.

## Tips for Best Results

1. **Provide Context**: Include use case and number of users
2. **Be Specific**: Version numbers and vendor names help
3. **Check Registry First**: Tool may already be reviewed
4. **Consider Alternatives**: Agent can suggest approved alternatives
5. **Review Output**: Verify generated RFC before submission

## Registry Integration

The agent references and can help update the
[AI Tools Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry) on
Confluence.

**Registry Fields:**

- Tool name and version
- Category (Enterprise/Open Source/Under Review)
- Restrictions and limitations
- Training opt-out status
- Review dates
- Access path

## Related Resources

- **RFC 98**:
  [AI Open Source Tools Approval Process](https://gitlab.com/plg-tech/plg/knowledge/rfcs/-/blob/feat/IP-23-ai-tools-approval-process/rfc-0098-ai-opensource-tools-approval-process.md)
- **Registry**:
  [Approved AI Tools Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry)
- **Vendor Vetting**:
  [Vendor Vetting Process](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1366294529/Vendor+vetting+process)

## Support

For questions about the approval process or agent usage:

- Consult RFC 98 for full process details
- Check existing tool reviews in `./docs/tool-reviews/`
- Contact the approval committee for guidance

---

**Remember**: When a private company offers a "free" tool, the product is often your data. Always review before use.
