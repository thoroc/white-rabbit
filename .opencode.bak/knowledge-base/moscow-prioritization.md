---
title: 'MoSCoW Prioritization: Conditions of Satisfaction'
description: MoSCoW is a prioritization framework used to categorize requirements based on their importance. The acronym stands for **Must have**, **Should have...
type: knowledge-base
category: development
version: 1.0.0
tags:
    - knowledge
    - development
    - moscow
    - prioritization
last_updated: 2025-11-19
---

# MoSCoW Prioritization: Conditions of Satisfaction

## Overview

MoSCoW is a prioritization framework used to categorize requirements based on their importance. The acronym stands for
**Must have**, **Should have**, **Could have**, and **Won't have**. This structured approach helps teams focus on what
truly matters and prevents scope creep.

## History and Background

MoSCoW prioritization was created by software development expert Dai Clegg while working at Oracle. He designed the
framework to help his team prioritize tasks during development work on product releases. The method is detailed in the
Dynamic System Development Method (DSDM) handbook but has been adapted for broad use across industries and project
types.

## When to Use MoSCoW

MoSCoW prioritization is effective when:

- Starting a new project or feature
- Planning sprint backlogs
- Managing stakeholder expectations
- Preventing scope creep
- Making resource allocation decisions
- Clarifying what's truly essential vs. nice-to-have
- Facing time, budget, or resource constraints

## The Four MoSCoW Categories

### **Must Have**

**Definition**: Non-negotiable requirements. Without them, the project fails.

**Characteristics**:

- Core functionality that defines the offering
- Bare minimum for a viable product
- Legal or compliance requirements
- Critical for market entry
- The product or release is useless without these

**Questions to Ask**:

- Will the product work without this?
- Is this a legal/compliance requirement?
- Will the release be useless without it?
- Does this define core functionality?
- Would omitting this make the solution unviable?

**Examples**:

- User authentication for a secure application
- Payment processing for an e-commerce platform
- Data encryption for healthcare applications (HIPAA compliance)
- Basic CRUD operations for a database application
- Core search functionality for a search engine

**Red Flags**:

- Everything is marked as "Must Have" → Challenge each item
- Must Haves exceed 60% of total scope → Rethink scope or break into phases
- Must Haves are vague → Define more specifically

---

### **Should Have**

**Definition**: Important but not critical for immediate success. Add significant value but can be delayed if necessary.

**Characteristics**:

- Adds significant value
- Can be scheduled for a future release without breaking the core
- Missing it requires adjustments elsewhere (different target audience, workarounds, or alternative approaches)
- Important for user satisfaction
- Product works without them but may be less competitive

**Questions to Ask**:

- Does it add significant value?
- Can we launch without it and add it later?
- What's the impact if we delay this?
- Would users notice and care if this is missing?
- Can we implement a workaround?

**Examples**:

- Integration with popular third-party tools
- Personalized user experience features
- Advanced reporting capabilities
- Multi-language support
- Export to multiple formats (CSV, PDF, Excel)
- Advanced search filters

**Red Flags**:

- Should Haves that stakeholders insist are Must Haves → Clarify true impact
- Too many Should Haves → May indicate scope creep
- Should Haves that block other work → Might actually be Must Haves

---

### **Could Have**

**Definition**: Nice-to-have features that improve user experience but aren't essential.

**Characteristics**:

- Wish-list items
- First to be deprioritized if resources are constrained
- Enhances but doesn't define the product
- Lower impact if omitted
- "Nice surprises" if delivered

**Questions to Ask**:

- Would this be nice to have?
- Does it improve experience but not core function?
- Can we easily deliver this in a later iteration?
- Is this more of a "wow factor" than a necessity?
- Would this differentiate us from competitors?

**Examples**:

- Social media integration
- Advanced customization options (themes, layouts)
- Gesture controls
- Theme/appearance customization
- Animations and transitions
- Easter eggs or delightful micro-interactions
- Advanced analytics dashboard

**Red Flags**:

- Could Haves taking too much development time → Deprioritize or remove
- Could Haves blocking Must Haves → Remove from current scope
- Disagreement on whether it's Could vs. Should → Discuss business value

---

### **Won't Have (This Time)**

**Definition**: Items that aren't a priority for the current timeframe. Explicitly out of scope.

**Characteristics**:

- Not valuable enough for current release
- Too resource-intensive to justify inclusion now
- May be considered for future releases
- Helps prevent scope creep
- Makes boundaries clear

**Questions to Ask**:

- Is this out of scope for the current release?
- Would this compromise the overall strategy?
- Is this too complex for the available resources?
- Does this conflict with our current goals?
- Should we explicitly document this as out of scope?

**Examples**:

- Full smartphone replacement capabilities
- Advanced AI features requiring extensive R&D
- Features requiring infrastructure not yet available
- Capabilities that conflict with current product positioning
- Features for different market segments
- Integrations with low-demand third-party systems

**Importance**: Setting clear "Won't Have" boundaries is crucial for:

- Managing stakeholder expectations
- Preventing scope creep
- Maintaining focus
- Documenting conscious decisions
- Providing a "parking lot" for future ideas

---

## MoSCoW Prioritization Process

### Step 1: Gather All Requirements

Collect all potential requirements, features, and requests from:

- Stakeholders
- Users and user research
- Product vision
- Technical team
- Market analysis
- Compliance and legal requirements

### Step 2: Define Success Criteria

Before categorizing, agree on:

- What defines a successful launch?
- What are the project constraints (time, budget, resources)?
- Who is the target audience for this release?
- What is the minimum viable product (MVP)?

### Step 3: Categorize Each Requirement

For each item, work through the questions:

1. **Is it a Must Have?**
    - Cannot launch without it?
    - Legal requirement?
    - Core to the value proposition?
    - If YES to any → Must Have

2. **Is it a Should Have?**
    - Adds significant value?
    - Can be delayed without breaking core?
    - Important for satisfaction but not critical?
    - If YES to most → Should Have

3. **Is it a Could Have?**
    - Nice to have but not essential?
    - Enhances but doesn't define?
    - Can be easily delayed?
    - If YES → Could Have

4. **Is it a Won't Have?**
    - Out of scope for this phase?
    - Too complex right now?
    - Conflicts with current strategy?
    - If YES → Won't Have

### Step 4: Validate and Balance

Review the categorization:

- **Must Haves**: Should be ~50-60% of total effort
- **Should Haves**: Should be ~20-30% of total effort
- **Could Haves**: Should be ~10-20% of total effort
- **Won't Haves**: Explicitly documented

If Must Haves exceed 60%, either:

- Challenge each Must Have rigorously
- Increase resources
- Extend timeline
- Break into multiple releases

### Step 5: Reach Consensus

Ensure all stakeholders agree:

- Product owners
- Technical leads
- Key stakeholders
- Development team

Resolve conflicts by:

- Discussing business value
- Reviewing constraints
- Considering user impact
- Using data to support decisions

### Step 6: Document and Communicate

Create clear documentation:

- MoSCoW table (see template below)
- Rationale for each categorization
- Dependencies between items
- Estimated effort for each category

---

## MoSCoW Prioritization Table Template

| Must Have                             | Should Have                                   | Could Have                | Won't Have                               |
| ------------------------------------- | --------------------------------------------- | ------------------------- | ---------------------------------------- |
| Critical features required for launch | Important features that add significant value | Nice-to-have enhancements | Features explicitly out of scope         |
| Core functionality                    | Integration with key systems                  | Advanced customizations   | Future considerations                    |
| Legal/compliance requirements         | User experience improvements                  | Experimental features     | Complex features requiring more research |

### Example: E-commerce Checkout System

| Must Have              | Should Have           | Could Have                  | Won't Have               |
| ---------------------- | --------------------- | --------------------------- | ------------------------ |
| Add items to cart      | Save cart for later   | Wishlist functionality      | Social shopping features |
| Enter shipping address | Address autocomplete  | Multiple shipping addresses | Gift registry            |
| Select payment method  | Store payment methods | Apple Pay / Google Pay      | Cryptocurrency payment   |
| Complete purchase      | Email confirmation    | SMS confirmation            | Voice confirmation       |
| View order summary     | Guest checkout        | One-click reorder           | Subscription management  |
| SSL encryption         | Shipping tracking     | Delivery time estimates     | Same-day delivery        |

---

## MoSCoW Decision Framework

### Quick Decision Tree

```
Is it legally required? → YES → Must Have
      ↓ NO
Does core functionality break without it? → YES → Must Have
      ↓ NO
Would users find the product useless without it? → YES → Must Have
      ↓ NO
Does it add significant value AND can we delay it? → YES → Should Have
      ↓ NO
Is it a nice enhancement but not essential? → YES → Could Have
      ↓ NO
Is it out of scope or too complex right now? → YES → Won't Have
```

### Challenge Questions for Must Haves

When someone insists something is a Must Have, ask:

1. "What happens if we launch without this?"
2. "Can we provide a workaround or manual process temporarily?"
3. "Is this required by law or regulation?"
4. "Would any users successfully use the product without this?"
5. "Can this wait for a 1.1 release?"

If the answer allows for alternatives or delays, it's likely a Should Have or Could Have.

---

## Common Patterns by Project Type

### New Product Launch (MVP)

- **Must Have**: 60% - Core features that prove concept
- **Should Have**: 25% - Features that improve adoption
- **Could Have**: 15% - Differentiators
- **Won't Have**: Everything else for v2

### Feature Enhancement

- **Must Have**: 40% - Core enhancement
- **Should Have**: 35% - Related improvements
- **Could Have**: 25% - Nice additions
- **Won't Have**: Features requiring architectural changes

### Bug Fixes

- **Must Have**: Critical bugs affecting all users
- **Should Have**: High-priority bugs affecting many users
- **Could Have**: Low-priority bugs or cosmetic issues
- **Won't Have**: Won't-fix bugs or design limitations

### Compliance Project

- **Must Have**: 90% - All legal/regulatory requirements
- **Should Have**: 10% - Nice-to-have compliance features
- **Could Have**: 0% - No room for extras
- **Won't Have**: Non-compliance features

---

## Best Practices

### DO

✅ **Challenge every Must Have** - Ensure it's truly essential ✅ **Get stakeholder buy-in** - Agreement prevents later
disputes ✅ **Document rationale** - Record why each decision was made ✅ **Review regularly** - Priorities can shift as
projects evolve ✅ **Be realistic about effort** - Consider team capacity ✅ **Use data** - Back decisions with user
research and analytics ✅ **Timebox decisions** - Don't overanalyze, make progress ✅ **Consider dependencies** - Some
Should Haves may enable Must Haves

### DON'T

❌ **Don't make everything a Must Have** - Defeats the purpose ❌ **Don't ignore Won't Haves** - Explicit exclusions
prevent scope creep ❌ **Don't skip Should Haves** - They often become quick wins ❌ **Don't forget to revisit** -
Priorities change, MoSCoW should too ❌ **Don't work in isolation** - Involve the whole team ❌ **Don't be rigid** -
MoSCoW is a guide, not a straitjacket ❌ **Don't skip documentation** - Undocumented decisions lead to confusion

---

## Integration with JIRA Tickets

When creating JIRA tickets, use MoSCoW for "Conditions of Satisfaction":

```markdown
## Conditions of Satisfaction (MoSCoW)

### Must Have

- [ ] Critical requirement 1
- [ ] Critical requirement 2
- [ ] Critical requirement 3

### Should Have

- [ ] Important feature 1
- [ ] Important feature 2

### Could Have

- [ ] Enhancement 1
- [ ] Enhancement 2

### Won't Have (This Iteration)

- Out of scope item 1
- Out of scope item 2
```

The **Must Have** conditions then become the basis for your acceptance criteria.

---

## Common Pitfalls and Solutions

### Pitfall 1: Too Many Must-Haves

**Problem**: Everything is marked as "Must Have", defeating the purpose. **Solution**: Challenge each item with "Can we
launch without this?" Move items to Should Have whenever possible.

### Pitfall 2: Scope Creep via "Should Haves"

**Problem**: Too many Should Haves expand scope unexpectedly. **Solution**: Allocate a fixed percentage of resources to
each category (e.g., 60% Must, 20% Should, 20% Could).

### Pitfall 3: Unclear Boundaries

**Problem**: Disagreement on which category items belong to. **Solution**: Use the decision framework and document
rationale for borderline cases.

### Pitfall 4: Ignoring "Won't Haves"

**Problem**: Features creep back in because they weren't explicitly excluded. **Solution**: Document Won't Haves clearly
and communicate them to all stakeholders.

### Pitfall 5: Static Prioritization

**Problem**: MoSCoW set once and never revised. **Solution**: Review priorities during sprint planning and backlog
grooming.

---

## Real-World Example: AI Earpiece Assistant

**Product**: Always-on AI assistant via earpiece for schedule management, reminders, and on-the-fly responses.

| Must Have                                   | Should Have                              | Could Have                          | Won't Have                     |
| ------------------------------------------- | ---------------------------------------- | ----------------------------------- | ------------------------------ |
| Natural language voice commands             | Integration with productivity apps       | Integration with smart home devices | Full smartphone replacement    |
| Text-to-speech responses                    | Personalized voice recognition           | Real-time language translation      | Built-in cellular connectivity |
| Bluetooth smartphone pairing                | Ambient noise filtering                  | Biometric health sensors            | Video recording capabilities   |
| Basic task management (reminders, calendar) | Multi-language support                   | Gesture controls                    | Autonomous decision-making     |
| 8+ hour battery life                        | Voice-activated internet search          | Augmented reality features          | Vehicle/machinery control      |
| Comfortable ergonomic design                | Context-aware responses                  | Social media integration            | Advanced medical diagnostics   |
| Wake word or gesture activation             | Basic health monitoring (steps, posture) | Mood detection/emotional support    | Independent phone calls        |
| Privacy controls (mute, encryption)         |                                          |                                     |                                |

**Rationale**:

- **Must Haves**: Core functionality for a voice-controlled earpiece that manages tasks
- **Should Haves**: Features that make it competitive and personalized
- **Could Haves**: Differentiators that would be nice surprises
- **Won't Haves**: Features too complex, risky, or outside product vision for v1

---

## Summary

MoSCoW prioritization helps teams:

- **Focus** on what truly matters
- **Communicate** priorities clearly
- **Prevent** scope creep
- **Deliver** value faster
- **Manage** stakeholder expectations
- **Make** difficult trade-off decisions

By categorizing requirements into Must, Should, Could, and Won't Have, teams can:

1. Identify the minimum viable product
2. Plan realistic releases
3. Allocate resources effectively
4. Set clear boundaries
5. Make informed trade-offs

Remember: The goal isn't to eliminate Should Haves or Could Haves, but to make informed decisions about where to
allocate limited time and resources.

---

## References

- MoSCoW Prioritization Model: <https://www.bitesizelearning.co.uk/resources/moscow-prioritisation-model>
- MoSCoW Method Overview: <https://www.productplan.com/glossary/moscow-prioritization/>
- Dynamic System Development Method (DSDM): <https://www.agilebusiness.org/>
- Eisenhower Matrix: Complementary prioritization framework
- Kano Model: Customer satisfaction perspective on features
