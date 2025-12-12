---
title: JIRA Ticket Creation Checklist
description: Ensure JIRA tickets follow consistent standards with complete information and clear guidance for implementation
type: checklist
category: operations
version: 1.0.0
tags:
  - checklist
  - operations
  - jira
  - ticket
  - creation
last_updated: 2025-11-19
---

# JIRA Ticket Creation Checklist

## Purpose

This checklist ensures that every JIRA ticket created follows consistent standards, includes all necessary information, and provides clear guidance for development and testing teams.

## Pre-Creation Checklist

- [ ] **Verify ticket necessity**: Confirm this work is not already covered by an existing ticket
- [ ] **Gather stakeholder input**: Identify who needs to be involved in defining requirements
- [ ] **Understand the context**: Review related tickets, documentation, and project goals
- [ ] **Identify dependencies**: Note any tickets or systems this work depends on or affects

## Ticket Structure Checklist

### Basic Information

- [ ] **Ticket title is clear and concise**: Summarizes the work in 8-12 words maximum
  - Format: `[Component/Area] Action to be taken`
  - Example: `[Search] Add filtering by date, price, and location`
- [ ] **Project and issue type selected**: Correctly categorized (Story, Bug, Task, Epic, etc.)

- [ ] **Priority set appropriately**: Using team's priority system (Critical, High, Medium, Low)

- [ ] **Assignee identified**: Person responsible or left unassigned for team to claim

- [ ] **Sprint/Version assigned**: If applicable, assigned to the correct sprint or release version

### User Story (For Stories and Epics)

- [ ] **User story follows standard format**:

  ```
  As a [user role]
  I want to [action/feature]
  So that [business value/benefit]
  ```

- [ ] **User role is specific**: Identifies the actual user persona or system

- [ ] **Action is clear and actionable**: Describes exactly what needs to happen

- [ ] **Benefit is measurable**: Explains why this matters to the user or business

- [ ] **Story is appropriately sized**: Can be completed within a single sprint (or broken into subtasks)

### Conditions of Satisfaction (MoSCoW Prioritization)

- [ ] **Must Have conditions identified**:
  - Non-negotiable requirements for the ticket to be complete
  - Core functionality that defines the work
  - Legal or compliance requirements
  - Minimum 3, maximum 8 conditions

- [ ] **Should Have conditions listed**:
  - Important features that add significant value
  - Can be moved to future iterations if needed
  - Clearly marked as "Should Have"

- [ ] **Could Have conditions documented**:
  - Nice-to-have enhancements
  - Clearly marked as optional
  - Will be deprioritized if time/resources constrained

- [ ] **Won't Have conditions explicitly stated**:
  - Items explicitly out of scope
  - Prevents scope creep
  - Documents why they're excluded

- [ ] **MoSCoW table included** (if complex ticket):

  ```
  | Must Have | Should Have | Could Have | Won't Have |
  |-----------|-------------|------------|------------|
  | Item 1    | Item 1      | Item 1     | Item 1     |
  | Item 2    | Item 2      | Item 2     | Item 2     |
  ```

### Acceptance Criteria

- [ ] **Acceptance criteria format chosen**: Scenario-oriented (Given/When/Then) OR Rule-oriented (Checklist)

- [ ] **Each criterion is testable**: Has clear pass/fail scenarios

- [ ] **Criteria focus on outcomes, not implementation**: Describes what should happen, not how

- [ ] **Criteria are written in plain English**: Understandable by all stakeholders

- [ ] **Criteria avoid technical jargon**: Unless absolutely necessary

- [ ] **Active voice used**: Written from user's perspective in first person

- [ ] **Negative scenarios included**: Cover error cases and edge cases

- [ ] **Criteria are measurable**: Include specific metrics where relevant
  - Performance metrics (e.g., "< 2 seconds")
  - Quantity metrics (e.g., "displays 10 results per page")
  - Quality metrics (e.g., "95% success rate")

#### For Scenario-Oriented AC (Given/When/Then)

- [ ] **Each scenario has a clear name**: Describes the behavior being tested

- [ ] **Given statements set context**: Establish the starting state

- [ ] **When statements describe actions**: Clear user actions or system events

- [ ] **Then statements define outcomes**: Expected results of the action

- [ ] **And statements used for clarity**: Continue any Given/When/Then statements

- [ ] **Multiple scenarios cover different paths**: Happy path, error cases, edge cases

#### For Rule-Oriented AC (Checklist)

- [ ] **Rules are independent**: Each can be tested separately

- [ ] **Rules are atomic**: Each rule describes one specific behavior

- [ ] **List is comprehensive**: Covers all required behaviors

- [ ] **List is not exhaustive**: Avoids unnecessary detail

### Technical Details (When Necessary)

- [ ] **Technical constraints documented**: Only if they affect the solution
  - Performance requirements
  - Browser/platform compatibility
  - Security requirements
  - Accessibility requirements (WCAG level)

- [ ] **API endpoints specified**: If integrating with APIs

- [ ] **Data requirements defined**: Data formats, validation rules

- [ ] **External dependencies noted**: Third-party services, libraries

### Supporting Information

- [ ] **Background/Context provided**: Why this work is needed

- [ ] **Business value explained**: How this benefits users or the business

- [ ] **Related tickets linked**:
  - Blocks/Is blocked by
  - Relates to
  - Duplicates
  - Parent/Child relationships

- [ ] **Attachments included** (if applicable):
  - Mockups or wireframes
  - User research findings
  - Technical diagrams
  - Example data or files
  - Screenshots of bugs

- [ ] **Labels/Tags applied**: For categorization and filtering

- [ ] **Watchers added**: Stakeholders who need visibility

### Definition of Done

- [ ] **Team's Definition of Done referenced or included**:
  - Code written and committed
  - Code reviewed
  - Unit tests written and passing
  - Integration tests passing
  - Documentation updated
  - No unresolved bugs
  - Acceptance criteria met
  - Deployed to test environment
  - Stakeholder approval received

### Estimation

- [ ] **Story points estimated** (if applicable): Using team's estimation scale

- [ ] **Time estimate provided** (if required): For planning purposes

- [ ] **Complexity assessed**: Technical complexity noted if relevant

## Quality Checks Before Submission

### Clarity and Completeness

- [ ] **All sections filled in**: No TBD or placeholder text remains

- [ ] **Writing is clear and concise**: No ambiguous language

- [ ] **No assumptions made**: Everything needed is explicitly stated

- [ ] **Stakeholders can understand it**: Not just developers

### Testability and Acceptance

- [ ] **QA can create test cases from AC**: Acceptance criteria are detailed enough

- [ ] **Success criteria are unambiguous**: Clear what "done" looks like

- [ ] **Measurable outcomes defined**: Objective way to verify completion

### Collaboration and Communication

- [ ] **Reviewed by key stakeholders**: Product owner, tech lead, or relevant parties

- [ ] **Consensus reached on requirements**: Team agrees on what's needed

- [ ] **Questions or concerns addressed**: Any uncertainties resolved

- [ ] **Communication plan in place**: Who needs updates on progress

## Post-Creation Checklist

- [ ] **Ticket added to appropriate board/backlog**: Visible to the team

- [ ] **Backlog priority set**: Ordered relative to other tickets

- [ ] **Team notified**: Relevant team members alerted to new ticket

- [ ] **Ticket number communicated**: Shared with stakeholders for reference

## Common Pitfalls to Avoid

- [ ] **Not too narrow**: Leaves room for developer implementation choices
- [ ] **Not too broad**: Specific enough for accurate estimation
- [ ] **No gold plating**: Focuses on necessary requirements only
- [ ] **No duplicate tickets**: Checked for existing similar tickets
- [ ] **No mixing concerns**: One clear purpose per ticket
- [ ] **No technical prescriptions**: Unless absolutely necessary
- [ ] **No untestable criteria**: Every criterion has verification method

## Ticket Types: Specific Considerations

### For User Stories

- [ ] Follows user story format
- [ ] Has acceptance criteria
- [ ] Sized for single sprint
- [ ] Delivers user value

### For Bugs

- [ ] Steps to reproduce included
- [ ] Expected vs actual behavior documented
- [ ] Environment details provided
- [ ] Screenshots/logs attached
- [ ] Severity and priority set

### For Tasks

- [ ] Clear deliverable defined
- [ ] Technical requirements specified
- [ ] Acceptance criteria or checklist provided

### For Epics

- [ ] High-level goal stated
- [ ] Broken into smaller stories
- [ ] Success metrics defined
- [ ] Timeline or milestones noted

## Template Usage Notes

- This checklist should be used alongside the JIRA ticket description template
- Not all items apply to every ticket type
- Use judgment to determine what's necessary for each ticket
- Refer to `knowledge-base/moscow-prioritization.md` for MoSCoW guidance
- Refer to `knowledge-base/acceptance-criteria.md` for acceptance criteria guidance
- Consult `template/jira-ticket-description.md` for the description template

## Review and Refinement

- [ ] **Backlog grooming scheduled**: Ticket will be reviewed in grooming session
- [ ] **Refinement complete**: Ticket is "ready" for sprint planning
- [ ] **Questions logged**: Any uncertainties documented for team discussion

## Success Criteria for the Ticket Itself

A well-created ticket should:

- Be immediately understandable by any team member
- Provide all information needed to start work
- Have clear criteria for completion
- Enable accurate estimation
- Facilitate effective testing
- Support good communication
- Prevent rework and misunderstandings

---

**Remember**: A few extra minutes creating a quality ticket saves hours of confusion and rework later.
