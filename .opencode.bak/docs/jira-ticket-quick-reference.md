# JIRA Ticket Creation Quick Reference

## Quick Start

### Create a New Ticket

```
/create-ticket
```

or

```
/atlassian Create a new ticket for [description]
```

## MoSCoW Quick Reference

| Category        | Question                           | Example                                    |
| --------------- | ---------------------------------- | ------------------------------------------ |
| **Must Have**   | What's non-negotiable?             | User authentication, payment processing    |
| **Should Have** | What's important but not critical? | Multi-language support, advanced reporting |
| **Could Have**  | What's nice to have?               | Social media integration, themes           |
| **Won't Have**  | What's explicitly out of scope?    | Features for future releases               |

## Acceptance Criteria Formats

### Given/When/Then (Scenario-Oriented)

```gherkin
Scenario: User logs in successfully
Given: User is on the login page
When: User enters valid credentials
And: Clicks "Login" button
Then: User is redirected to dashboard
And: Welcome message is displayed
```

**Use for**: User interactions, workflows, sequences

### Checklist (Rule-Oriented)

```markdown
- [ ] Search field is placed on top bar
- [ ] Search triggers when user clicks "Search"
- [ ] Placeholder text: "Where are you going?"
- [ ] Supports city, name, or street search
- [ ] Maximum 200 characters allowed
```

**Use for**: System behaviors, validation rules, UI requirements

## Template Quick Access

### User Story Template

```markdown
## User Story

As a [role] I want to [action] So that [benefit]

## Conditions of Satisfaction (MoSCoW)

### Must Have

- [ ] Requirement 1
- [ ] Requirement 2

### Should Have

- [ ] Feature 1

### Could Have

- [ ] Enhancement 1

### Won't Have

- Out of scope item

## Acceptance Criteria

[Choose Given/When/Then OR Checklist format]
```

### Bug Template

```markdown
## Steps to Reproduce

1. Step 1
2. Step 2

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## Impact

Severity: [Critical/High/Medium/Low] Affected Users: [All/Group/Individual]
```

## Quality Checklist

Before submitting, ensure:

- ✅ Clear title (8-12 words)
- ✅ User story follows format (for stories)
- ✅ 3-8 Must Have conditions identified
- ✅ All acceptance criteria are testable
- ✅ Measurable outcomes included
- ✅ Dependencies identified
- ✅ Stakeholders notified

## Writing Tips

### DO

✅ Write in active voice, first person ✅ Use simple, concise sentences ✅ Focus on what, not how ✅ Include measurable
outcomes ✅ Cover happy path and errors ✅ Make criteria testable

### DON'T

❌ Make AC too narrow (no dev flexibility) ❌ Make AC too broad (can't estimate) ❌ Use technical implementation details
❌ Write ambiguous criteria ❌ Skip negative scenarios ❌ Forget to include metrics

## Common Metrics to Include

- **Performance**: "< 2 seconds load time"
- **Capacity**: "Support 10,000 concurrent users"
- **Accuracy**: "95% success rate"
- **Volume**: "Display 10 results per page"
- **Limits**: "Maximum 200 characters"
- **Coverage**: "Support latest 2 browser versions"

## Scenario Examples by Type

### UI Feature

```gherkin
Given: User is on the search page
When: User types "hotel" into search field
Then: Autocomplete suggestions appear
And: Suggestions are relevant to input
And: Suggestions appear within 500ms
```

### API Integration

```gherkin
Given: Valid API credentials are configured
When: System makes GET request to /api/users
Then: Response status is 200 OK
And: Response contains array of user objects
And: Response time is under 1 second
```

### Form Validation

```markdown
- [ ] Email field validates format (user@domain.com)
- [ ] Error message displays for invalid format
- [ ] Error message: "Please enter a valid email"
- [ ] Submit button is disabled until valid
- [ ] Valid email allows form submission
```

## MoSCoW Decision Framework

### Is it a Must Have?

- Will the feature fail without it? → YES = Must Have
- Is it legally required? → YES = Must Have
- Is it the bare minimum for launch? → YES = Must Have

### Is it a Should Have?

- Does it add significant value? → YES
- Can we delay it without breaking the feature? → YES
- Would missing it require workarounds? → YES
- Then it's a Should Have

### Is it a Could Have?

- Is it nice to have but not essential? → YES
- Would it be first to drop if time is tight? → YES
- Does it enhance but not define? → YES
- Then it's a Could Have

### Is it a Won't Have?

- Is it out of scope for current release? → YES
- Too resource intensive right now? → YES
- Conflicts with current strategy? → YES
- Then it's a Won't Have

## Resource Links

### Full Documentation

- **MoSCoW Prioritization**: `knowledge-base/moscow-prioritization.md`
- **Acceptance Criteria**: `knowledge-base/acceptance-criteria.md`
- **Checklist**: `checklist/jira-ticket-creation.md`
- **Templates**: `template/jira-ticket-description.md`
- **System Overview**: `docs/jira-ticket-creation-system.md`

### Commands

- **Create Ticket**: `command/create-ticket.md`
- **Atlassian Agent**: `agent/atlassian.md`

## Example: Complete User Story

```markdown
## User Story

As a online shopper I want to filter products by price range So that I can find items within my budget

## Background

User research shows 73% of users abandon search when they can't filter by price. This feature will improve conversion
and user satisfaction.

## Conditions of Satisfaction (MoSCoW)

### Must Have

- [ ] Price range slider with min and max handles
- [ ] Display current min/max values as user adjusts
- [ ] Apply filter when user releases slider handle
- [ ] Show number of results matching filter
- [ ] Reset filter button

### Should Have

- [ ] Remember last used price range in session
- [ ] Show price distribution histogram
- [ ] Mobile-optimized touch interface

### Could Have

- [ ] Save preferred price ranges to profile
- [ ] Suggest popular price ranges
- [ ] Currency conversion for international users

### Won't Have (This Release)

- Multi-currency simultaneous display
- AI-powered price recommendations
- Integration with competitor price comparison

## Acceptance Criteria

### Scenario: User filters products by price range

Given: User is on product search results page And: Page displays 100 products When: User adjusts price slider to
$50-$200 range Then: Results filter to show only products in that range And: Result count updates to show matching
products And: Filter applies within 500ms

### Scenario: User resets price filter

Given: User has applied a price filter When: User clicks "Reset filters" button Then: All products are displayed again
And: Price slider returns to full range And: Result count shows total products

### Scenario: Mobile user adjusts price filter

Given: User is on mobile device When: User touches and drags price slider handle Then: Slider responds to touch smoothly
And: Values update in real-time And: Filter applies on touch release

## Technical Constraints

- Performance: Filter must apply in < 500ms
- Compatibility: iOS Safari 14+, Chrome Mobile 90+
- Accessibility: Slider must be keyboard navigable
- SEO: Filter state must be URL parameter for sharing

## Definition of Done

- [ ] Code written and reviewed
- [ ] Unit tests with 80%+ coverage
- [ ] Integration tests passing
- [ ] Works on iOS and Android
- [ ] Accessibility audit passed
- [ ] Load tested with 1000 products
- [ ] Product owner approved
```

## Need Help?

1. **Not sure which format to use?**
   - User interactions → Given/When/Then
   - System rules → Checklist
   - Complex ticket → Both

2. **Too many Must Haves?**
   - Challenge each: "Can we launch without this?"
   - Move to Should Have if possible
   - Break into multiple tickets

3. **Criteria not testable?**
   - Add specific metrics
   - Define pass/fail clearly
   - Include measurable outcomes

4. **Stakeholders disagree?**
   - Review MoSCoW priorities together
   - Focus on business value
   - Use data to support decisions

## Remember

> A few extra minutes creating a quality ticket saves hours of confusion and rework later.

Good tickets:

- Developers can estimate accurately ✅
- QA can test effectively ✅
- Stakeholders can understand clearly ✅
- Teams can execute confidently ✅
