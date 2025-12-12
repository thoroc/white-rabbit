# JIRA Ticket Quick Start

One-page reference for creating quality JIRA tickets.

## Create a Ticket

```bash
/create-ticket
```

The agent will ask 4-5 questions and generate a complete ticket.

## MoSCoW Quick Reference

| Category        | Question                          | % of Effort |
| --------------- | --------------------------------- | ----------- |
| **Must Have**   | Would this be useless without it? | 60%         |
| **Should Have** | Important but can delay?          | 20%         |
| **Could Have**  | Nice-to-have?                     | 15%         |
| **Won't Have**  | Out of scope?                     | 5%          |

Aim for **3-6 Must Haves** only.

## Acceptance Criteria Formats

### Given/When/Then (for workflows)

```gherkin
Given: User is on login page
When: User enters valid credentials
Then: User sees dashboard within 2 seconds
```

### Checklist (for rules)

```markdown
- [ ] Email validates format (user@domain.com)
- [ ] Error displays below field in red
- [ ] Submit disabled until valid
```

## Ticket Template

```markdown
## User Story

As a [role], I want to [action] so that [benefit]

## Context

[1-2 sentences on why this matters]

## Conditions of Satisfaction (MoSCoW)

### Must Have

- [ ] [Critical requirement 1]
- [ ] [Critical requirement 2]
- [ ] [Critical requirement 3]

### Should Have

- [ ] [Important feature]

### Could Have

- [ ] [Enhancement]

### Won't Have

- [Out of scope item]

## Acceptance Criteria

**Scenario: [Name]**
Given: [Context]
When: [Action]
Then: [Outcome with metrics]

## Dependencies

Blocked by: [Ticket]
Related: [Ticket]

## Definition of Done

- [ ] Code reviewed and merged
- [ ] Tests passing (80%+ coverage)
- [ ] All AC met
- [ ] Deployed to test
```

## Quality Checklist

- [ ] Title: 8-12 words
- [ ] 3-6 Must Haves (60% of effort)
- [ ] All AC testable (clear pass/fail)
- [ ] Metrics included ("< 2 sec", "10 per page")
- [ ] Plain English (no jargon)
- [ ] Covers edge cases

## Common Metrics

- **Time**: "< 2 seconds", "within 500ms"
- **Quantity**: "10 results per page", "max 200 chars"
- **Quality**: "95% success rate", "80%+ coverage"
- **Capacity**: "10,000 concurrent users"

## Avoid These Pitfalls

| ❌ Bad                  | ✅ Good                             |
| ----------------------- | ----------------------------------- |
| "Should be fast"        | "Loads in < 2 seconds"              |
| "User-friendly"         | "Complete checkout in 3 steps"      |
| "Use React hooks"       | "Session persists across refreshes" |
| Everything is Must Have | 3-6 Must Haves only                 |

## Full Documentation

- **Command**: `command/create-ticket.md`
- **Checklist**: `checklist/jira-ticket-creation.md`
- **Templates**: `template/jira-ticket-description-tmpl.yaml`
- **MoSCoW Guide**: `knowledge-base/moscow-prioritization.md`
- **AC Guide**: `knowledge-base/acceptance-criteria.md`
