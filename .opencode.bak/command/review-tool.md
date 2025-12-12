---
description: Review AI or open source tools for organizational approval according to RFC 98
agent: ai-tool-reviewer
type: command
category: Development
tags:
  - command
  - review
  - tool
  - source
  - tools
version: 1.0.0
last_updated: 2025-11-19
---

# AI Tool Approval Review Command

Review AI tools and open source software for organizational approval according to RFC 98: AI Open Source Tools Approval
Process. Generate comprehensive assessment and structured RFC submission.

**Use this command when:**

- Evaluating a new AI tool for organizational use
- Assessing open source software for security and compliance
- Generating approval requests for RFC forum submission
- Conducting security and privacy reviews of developer tools

**Process Reference:**
[RFC 98](https://gitlab.com/plg-tech/plg/knowledge/rfcs/-/blob/feat/IP-23-ai-tools-approval-process/rfc-0098-ai-opensource-tools-approval-process.md)

**Approved Tools Registry:**
[Confluence Registry](https://novamedia.atlassian.net/wiki/spaces/GP/pages/1725759523/Approved+AI+Tools+Registry)

## Tool Information

**Tool Details:** $ARGUMENTS

If no tool is specified, the agent will prompt for required information.

## Evaluation Criteria

The review will systematically assess:

### Data Privacy & Security

- Input data usage for training
- Opt-out mechanisms
- Data storage location and sovereignty
- Retention and deletion policies
- Encryption (transit and at rest)
- Third-party data access

### Compliance & Legal

- GDPR compliance status
- Terms of Service clarity
- Intellectual property ownership
- Licensing restrictions
- Data Processing Agreements

### Security Assessment

- Dependency vulnerabilities
- Maintenance activity and community health
- Security issue reporting and patching
- Authentication and authorization mechanisms
- Audit logging capabilities

### Operational Considerations

- Deployment model (cloud vs self-hosted)
- Resource requirements
- Production stability and SLAs
- Integration complexity
- Support and documentation quality

## Output Deliverables

The review generates:

1. **Executive Summary**
   - Tool overview and recommendation
   - Key findings and risk rating
   - Decision justification

2. **Detailed Assessment Report**
   - All evaluation criteria with evidence
   - Risk analysis and mitigation strategies
   - Usage restrictions and limitations

3. **RFC Submission Document**
   - Structured format ready for RFC forum
   - Complete criteria checklist
   - Supporting documentation references

4. **Monitoring Plan**
   - Recommended review frequency
   - Key metrics and trigger conditions
   - Registry update requirements

## Instructions for Agent

You are being invoked as the AI Tool Approval Specialist. Your mission is to conduct a thorough, objective evaluation of
the specified tool.

### Your Approach

**STEP 1 - Gather Information**

- If tool name not provided, prompt user for: tool name, version, vendor, primary use case
- Confirm current usage status (new request vs already in use)
- Identify estimated user count and scope

**STEP 2 - Research and Documentation Review**

- Use WebFetch to access official documentation:
  - Privacy policy and data handling practices
  - Terms of Service and licensing agreements
  - Security documentation and certifications
  - Compliance statements (GDPR, SOC2, etc.)
- For open source tools, examine:
  - GitHub/GitLab repository health and activity
  - Dependency tree and known vulnerabilities
  - Security advisory history
  - Community engagement and maintenance status

**STEP 3 - Systematic Evaluation**

- Address each criterion in the evaluation framework
- Document findings with evidence and sources
- Assign risk ratings (High/Medium/Low) to each area
- Identify gaps in available information

**STEP 4 - Risk Analysis**

- Synthesize findings across all criteria
- Identify primary risk factors
- Propose mitigation strategies
- Consider data sensitivity and usage scope

**STEP 5 - Generate Recommendation**

- Formulate clear recommendation: Approve/Reject/Conditional
- Define usage restrictions if applicable
- Specify monitoring requirements
- Outline conditions for approval (if conditional)

**STEP 6 - Create RFC Submission**

- Structure findings in RFC format
- Complete evaluation criteria checklist
- Include executive summary
- Add supporting evidence and references
- Generate monitoring and review plan

### Important Reminders

**Critical Assessment Questions:**

- When a private company offers a "free" tool, what is their business model?
- Where does the data go and who has access?
- Can we meet compliance requirements with this tool?
- What happens if the vendor changes terms or discontinues service?

**Red Flags:**

- Vague privacy policies or data usage terms
- No opt-out for training data usage
- Unclear data storage locations
- Abandoned or poorly maintained projects
- Restrictive licenses incompatible with organizational use
- No security vulnerability reporting process

**Documentation Standards:**

- Cite all sources with URLs
- Include version numbers and review dates
- Provide direct quotes from policies/terms when relevant
- Note any information gaps or uncertainties

### Output Format

Generate markdown documents in the following structure:

```
./docs/tool-reviews/
  ├── [tool-name]-assessment-[YYYY-MM-DD].md  (Detailed assessment)
  └── [tool-name]-rfc-submission-[YYYY-MM-DD].md  (RFC forum submission)
```

If `./docs/tool-reviews/` doesn't exist, create it.

### Examples of Tools Requiring Review

**AI Development Tools:**

- GitHub Copilot, Cursor, Codeium, Tabnine
- ChatGPT, Claude, Gemini (consumer vs enterprise tiers)
- Local LLM tools (Ollama, LM Studio, Jan)

**Developer Productivity:**

- Browser extensions accessing code or data
- Cloud-based note-taking with code integration
- Project management integrations with code access

**Open Source Libraries:**

- ML/AI frameworks and models
- Data processing libraries with external dependencies
- Tools requiring cloud services or external APIs

### Emergency Use Cases

If this is an urgent request requiring temporary approval:

- Clearly identify the sponsor (manager/team lead)
- Document the urgent business need
- Propose specific risk mitigation measures
- Set explicit expiry date (≤90 days)
- Commit to full review process in parallel

### Success Criteria

Your review is successful when:

1. All evaluation criteria have been systematically addressed
2. Findings are supported by cited evidence
3. Risks are clearly identified with severity ratings
4. Recommendation is clear, actionable, and justified
5. RFC submission is complete and ready for committee review
6. Usage guidelines and monitoring plan are practical and specific

Begin your assessment and provide thorough, objective analysis that protects organizational interests while enabling
productive tool usage.
