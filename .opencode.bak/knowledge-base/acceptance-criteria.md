---
title: 'Acceptance Criteria: Best Practices and Guidelines'
description: Explains acceptance criteria best practices with examples, writing guidelines, and quality standards for requirements
type: knowledge-base
category: development
version: 1.0.0
tags:
    - knowledge
    - development
    - acceptance
    - criteria
last_updated: 2025-11-19
---

# Acceptance Criteria: Best Practices and Guidelines

## Overview

**Acceptance criteria (AC)** are the conditions a software product must meet to be accepted by a user, customer, or
other systems. They are unique for each user story and define the feature behavior from the end-user's perspective.

## Purpose of Acceptance Criteria

Acceptance criteria serve multiple critical purposes:

### 1. Making Feature Scope More Detailed

AC define the boundaries of user stories. They provide precise details on functionality that help the team understand
whether the story is completed and works as expected.

### 2. Describing Negative Scenarios

Your AC may require the system to recognize unsafe password inputs and prevent a user from proceeding further. Invalid
inputs or unexpected user behavior are negative scenarios. AC define these scenarios and explain how the system must
react to them.

### 3. Setting Communication

Acceptance criteria synchronize the visions of the client and the development team. They ensure everyone is on the same
page regarding requirements: Developers know exactly what kind of behavior the feature must demonstrate, while
stakeholders and the client understand what to expect.

### 4. Streamlining Acceptance Testing

AC are the basis of user story acceptance testing. Each acceptance criterion must be independently testable and thus
have clear pass or fail scenarios. You can also use AC to verify the story via automated tests.

### 5. Conducting Feature Evaluations

Acceptance criteria specify what exactly must be developed by the team. Once the team clarifies the requirements, they
can divide user stories into tasks, enabling accurate estimation.

---

## Essential Qualities of Good Acceptance Criteria

Good acceptance criteria possess specific qualities:

### 1. **Clarity**

Straightforward and easy to understand for all team members, avoiding any confusion.

**Example**:

- ❌ Bad: "The system should handle errors"
- ✅ Good: "When a user enters an invalid email format, the system displays the error message 'Please enter a valid
  email address' below the email field"

### 2. **Conciseness**

Communicate necessary information without unnecessary detail.

**Example**:

- ❌ Bad: "The search functionality, which is one of the core features of our application and is used by millions of
  users every day, should return results that match what the user is looking for based on the keywords they type into
  the search box located at the top of the page"
- ✅ Good: "Search returns results matching user-entered keywords within 2 seconds"

### 3. **Testability**

Each criterion must be verifiable, allowing testers to clearly determine whether it has been met.

**Example**:

- ❌ Bad: "The page should load quickly"
- ✅ Good: "The page loads in under 2 seconds for 95% of requests"

### 4. **Result-Oriented**

Focus on delivering results that satisfy the customer, emphasizing the end benefit or value.

**Example**:

- ❌ Bad: "Use React hooks to manage state"
- ✅ Good: "User session state persists across page refreshes"

**Important**: Acceptance criteria describe what the end result should be, not the process of achieving it.

---

## User Story vs. Acceptance Criteria

Understanding the relationship between user stories and acceptance criteria is essential:

### User Stories

Provide high-level understanding from the user's perspective:

- **Format**: _As a [user role], I want to [action] so that [benefit]._
- **Example**: _As a traveler, I want to choose airplane seats online so that I have a window seat._
- **Characteristics**: Narrative, flexible, centered on user needs

### Acceptance Criteria

Detailed conditions for feature completion:

- **Format**: Structured scenarios or rules
- **Example**: See formats below
- **Characteristics**: Technical, specific, testable

**Relationship**: User stories describe the desired outcome, while acceptance criteria outline the necessary steps to
achieve that outcome, ensuring alignment with user expectations.

---

## Definition of Done vs. Acceptance Criteria

While some may use these interchangeably, they serve different purposes:

### Definition of Done (DoD)

- **Scope**: Universal checklist for every user story
- **Purpose**: Ensures consistent quality across the project
- **Examples**:
    - Fully integrated and peer-reviewed code
    - All unit tests passed
    - Complete documentation
    - No unresolved bugs
    - Final approval from product owner

### Acceptance Criteria

- **Scope**: Specific to each user story
- **Purpose**: Defines when that particular story is complete
- **Examples**: Test scenarios confirming the software functions as expected for that feature

**Key Difference**: DoD is a universal standard applicable to every user story within a project, while acceptance
criteria vary from one user story to another, tailored to meet unique requirements and functionality of each story.

---

## When to Write Acceptance Criteria

Timing is crucial for capturing all customer needs and aligning development efforts:

### Initial Stage

At the start of the project, define acceptance criteria for the first few sprints. This early-stage planning helps set a
clear direction for the onset of development.

### Before Each Sprint

As the project progresses, write acceptance criteria during backlog grooming sessions. Typically occurs before the user
story is ready to enter sprint planning.

### Finalization at Sprint Planning

Finalize AC during sprint planning events. Once a sprint starts, avoid changing acceptance criteria as they form the
basis of what the team commits to delivering.

### Mid-Sprint Adjustments (Exception)

In certain cases, AC can be adjusted during the sprint if they:

- Don't block ongoing work
- Don't significantly alter scope and effort

However, according to Scrum principles, once a sprint starts, avoid any changes in requirements, story items, or dates,
as alterations could lead to rework and jeopardize commitments.

---

## Acceptance Criteria Formats

Based on the initial task and complexity of requirements, choose between different formats:

### 1. Scenario-Oriented Format (Given/When/Then)

**Also known as**: Gherkin acceptance criteria

This approach, inherited from Behavior-Driven Development (BDD), uses Gherkin—a domain-specific language for writing
acceptance criteria.

#### Structure

```gherkin
Scenario: [Name for the behavior that will be described]
Given [the beginning state of the scenario]
When [specific action that the user makes]
Then [the outcome of the action in "When"]
And [used to continue any of the three previous statements]
```

#### When to Use

- User interactions with clear sequences
- Testing scenarios with specific inputs and outputs
- Features requiring precise step-by-step validation
- When you need to communicate with QA about test scenarios
- When automated testing (BDD tools) will be used

#### Example 1: Password Recovery

```gherkin
Scenario: Forgot password

Given: The user navigates to the login page
When: The user selects <forgot password> option
And: Enters a valid email to receive a link for password recovery
Then: The system sends the link to the entered email

Given: The user receives the link via the email
When: The user navigates through the link received in the email
Then: The system enables the user to set a new password
```

#### Example 2: ATM Cash Withdrawal

**Scenario 1: Successful withdrawal**

```gherkin
Given: The account is creditworthy
And: The card is valid
And: The dispenser contains cash
When: The customer requests the cash
Then: Ensure the account is debited
And: Ensure cash is dispensed
And: Ensure the card is returned
```

**Scenario 2: Insufficient funds**

```gherkin
Given: The account is overdrawn
And: The card is valid
When: The customer requests the cash
Then: Ensure the rejection message is displayed
And: Ensure cash is not dispensed
```

#### Benefits of Given/When/Then

- Reduces time spent writing test cases
- Describes system behavior upfront
- Provides clear test scenarios for QA
- Helps testers define when to begin and end testing
- Supports automated testing frameworks (Cucumber, SpecFlow, etc.)

---

### 2. Rule-Oriented Format (Checklist)

A simple bullet list describing system behavior rules.

#### When to Use

- System-level functionality requiring different QA methods
- The target audience doesn't need precise test scenario details
- Given/When/Then scenarios don't fit design and UX constraints
- Multiple independent rules or requirements
- Lists of validation rules

#### Example: Hotel Search Interface

```markdown
User story: As a traveler, I want to search by city, name, or street, so that I can have more matching hotel options.

Basic search interface acceptance criteria:

- The search field is placed on the top bar
- Search starts once the user clicks "Search"
- The field contains a placeholder with grey-colored text: "Where are you going?"
- The placeholder disappears once the user starts typing
- Search is performed if a user types in a city, hotel name, street, or all combined
- Search is in English, French, German, and Ukrainian
- The user can't type more than 200 symbols
- The search doesn't support special symbols (characters). If the user types a special symbol, show the warning message:
  "Search input cannot contain special symbols."
```

#### Benefits of Rule-Oriented Format

- Easier to write and understand
- Good for UI/UX requirements
- Flexible for various stakeholders
- Quick to scan and verify
- Works well for design constraints

---

### 3. Custom Formats

Plain text or custom structures that fit specific needs, as long as they are:

- Clear and written in plain English
- Unambiguous and testable
- Understood by all stakeholders

#### Example: Password Strength Requirements

```markdown
Password must contain: ✓ At least 8 characters ✓ At least one uppercase letter ✓ At least one lowercase letter ✓ At
least one number ✓ At least one special character (!@#$%^&\*)

Password must not: ✗ Contain user's email address ✗ Contain user's first or last name ✗ Be a previously used password ✗
Match common passwords (password, 12345678, etc.)

System behavior:

- Display strength indicator (weak/medium/strong) as user types
- Show specific requirements not yet met
- Enable "Submit" button only when all requirements are met
```

---

## Best Practices for Writing Acceptance Criteria

### DO

#### 1. Keep Criteria Achievable

Define reasonable minimum chunks of functionality that can be delivered.

**Example**:

- ✅ "User can filter search results by price range ($0-$1000)"
- ❌ "System provides comprehensive filtering with dynamic price ranges, saved filters, filter recommendations,
  AI-powered filter suggestions..."

#### 2. Make AC Measurable

Outline scope clearly for accurate estimation.

**Example**:

- ✅ "Search returns results within 2 seconds for queries with < 1000 results"
- ❌ "Search should be fast"

#### 3. Avoid Technical Details

Write in plain English for all stakeholders to understand.

**Example**:

- ✅ "User session state persists across page refreshes"
- ❌ "Implement Redux persist middleware with local storage adapter"

#### 4. Reach Consensus

Ensure team and stakeholders understand and agree with each criterion.

**Process**:

- Review with developers
- Confirm with product owner
- Validate with QA
- Get stakeholder sign-off

#### 5. Write Testable AC

Allow testers to verify all requirements with clear pass/fail scenarios.

**Example**:

- ✅ "When user submits form with invalid email, error message 'Invalid email format' appears below email field"
- ❌ "System validates email"

#### 6. Write in Active Voice, First Person

Reflect actual user words.

**Example**:

- ✅ "The user should be able to apply filters to find specific items"
- ❌ "Filters should be applied in search"

#### 7. Use Simple, Concise Sentences

Multiple simple sentences beat one complex sentence.

**Example**:

- ✅ "The user clicks Submit. The form validates. Errors display if validation fails."
- ❌ "When the user clicks Submit, the form validates and errors display if validation fails, but if validation passes,
  the form submits and redirects."

#### 8. Focus on Result, Not Process

Describe what should happen, not how to implement it.

**Example**:

- ✅ "User can view order history for the past 12 months"
- ❌ "Create a SQL query to fetch orders from the database for the past 12 months and display them in a React table
  component"

---

### DON'T

#### 1. Don't Make AC Too Narrow

Leave room for developer implementation choices and creativity.

**Example**:

- ❌ "Use a blue button with rounded corners, 12px padding, #0066CC color, positioned 20px from the right edge"
- ✅ "Submit button follows brand design guidelines and is easily clickable"

#### 2. Don't Make AC Too Broad

Keep them specific enough for accurate estimation and validation.

**Example**:

- ❌ "The system should provide a good user experience"
- ✅ "User can complete checkout in 3 steps or fewer"

#### 3. Don't Use Negative Sentences

Avoid "not" unless presenting unique requirements.

**Example**:

- ❌ "The login form should not be highlighted in red when the user enters incorrect values"
- ✅ "The login form displays a clear error message below the field when credentials are incorrect"

**Exception**: "The system must not allow users under 18 to create accounts" (unique requirement)

#### 4. Don't Include Implementation Details

Focus on behavior, not technical solution.

**Example**:

- ❌ "Use JWT tokens with 1-hour expiration stored in localStorage"
- ✅ "User session remains active for 1 hour of inactivity"

#### 5. Don't Write Ambiguous Criteria

Each criterion should have clear pass/fail scenarios.

**Example**:

- ❌ "The page should load reasonably fast"
- ✅ "The page loads in under 3 seconds on 4G connection"

---

## Examples: Good vs. Bad Acceptance Criteria

### Example 1: Search Functionality

**Bad**:

```
- Search should work
- Results should be relevant
- It should be fast
```

**Good**:

```
Given: User is on the search page
When: User enters "laptop" in the search field
And: Clicks "Search" button
Then: Results display within 2 seconds
And: Results contain products with "laptop" in title or description
And: Results are sorted by relevance
And: At least 10 results are shown per page
```

### Example 2: Form Validation

**Bad**:

```
- Validate the form
- Show errors
- Don't submit if invalid
```

**Good**:

```
- Email field validates format (user@domain.com pattern)
- Error message "Please enter a valid email" displays below field for invalid format
- Submit button is disabled when any field has validation errors
- Submit button is enabled when all fields pass validation
- Validation occurs on field blur (user leaves field)
- Error messages clear when user corrects the input
```

### Example 3: User Authentication

**Bad**:

```
- Users should be able to log in
- Handle wrong passwords
- Keep users logged in
```

**Good**:

```
Scenario: Successful login
Given: User is on the login page
And: User has a valid account
When: User enters correct email and password
And: Clicks "Log In" button
Then: User is redirected to dashboard
And: Welcome message displays with user's name
And: Session remains active for 24 hours

Scenario: Failed login
Given: User is on the login page
When: User enters incorrect password
And: Clicks "Log In" button
Then: Error message "Incorrect email or password" displays
And: Email field retains entered value
And: Password field is cleared
And: User remains on login page
```

---

## Acceptance Criteria and Testing

Each acceptance criterion must be:

### Independently Testable

Can be verified in isolation from other criteria.

**Example**:

```
✅ Each criterion tests one specific behavior:
- Password must contain at least 8 characters
- Password must contain at least one number
- Password must contain at least one special character

❌ Combined criterion:
- Password must be secure (too vague, combines multiple requirements)
```

### Clear Pass/Fail Scenarios

No ambiguity in validation.

**Example**:

- ✅ "Search returns results in under 2 seconds" (Pass: ≤2s, Fail: >2s)
- ❌ "Search should be quick" (What is "quick"?)

### Automatable

Where possible, support automated testing.

**Example**:

- ✅ "API returns 200 status code for valid requests" (easily automated)
- ✅ "Button is disabled when form is invalid" (can be tested programmatically)

### Specific

Include measurable outcomes.

**Examples of measurable outcomes**:

- Time: "within 2 seconds", "in under 500ms"
- Quantity: "displays 10 results per page", "shows maximum 5 error messages"
- Quality: "95% success rate", "supports 10,000 concurrent users"
- Format: "YYYY-MM-DD format", "<user@domain.com> pattern"
- Behavior: "button changes from blue to gray", "modal closes"

---

## Writing Tips

### Use Active Voice, First Person

**Active voice**: The subject performs the action.

- ✅ "The user applies filters to search results"
- ❌ "Filters are applied to search results"

**First person**: Write from the user's perspective.

- ✅ "I can view my order history"
- ✅ "The user can view order history"
- ❌ "Order history is viewable"

### Avoid Needless Words

- ✅ "User clicks Submit"
- ❌ "When the user navigates to the form and then subsequently clicks on the Submit button"

### One Sentence = One Idea

- ✅ "User clicks Submit. Form validates. Errors display."
- ❌ "When the user clicks Submit, the form validates and if there are errors they display, but if not, the form
  submits."

### Use Simple Language

- ✅ "Error message displays"
- ❌ "An appropriate error notification shall be rendered to inform the user"

---

## Common Patterns by Feature Type

### UI/UX Features

```markdown
Layout and positioning:

- Element X is positioned in the top-right corner
- Button follows brand guidelines for primary actions

Interactions:

- Button changes to gray when disabled
- Modal closes when user clicks outside or presses Escape

Responsive behavior:

- On mobile (< 768px), navigation collapses to hamburger menu
- Images scale to fit container while maintaining aspect ratio

Animations (if necessary):

- Loading spinner displays during data fetch
- Transition takes 300ms with ease-in-out timing
```

### API Integration

```markdown
Endpoint and method:

- POST request to /api/users endpoint

Request format:

- Request body contains: { "email": "string", "name": "string" }
- Content-Type header is application/json

Response format:

- Success: 201 status with { "id": "string", "email": "string", "name": "string" }
- Failure: 400 status with { "error": "string", "message": "string" }

Error handling:

- Network timeout after 30 seconds returns appropriate error
- 401 response redirects user to login
- 500 response displays "Service unavailable" message

Authentication:

- Request includes Bearer token in Authorization header
- Token is obtained from user session
```

### Form Validation

```markdown
Field validation:

- Email field validates format: user@domain.com
- Password field requires 8+ characters, 1 number, 1 special character
- Phone field accepts formats: (555) 555-5555, 555-555-5555, 5555555555

Error display:

- Error message appears below field in red text
- Error message: "Please enter a valid [field name]"
- Error persists until user corrects input

Submit behavior:

- Submit button is disabled when validation errors exist
- Submit button is enabled when all fields are valid
- On submit, loading indicator displays
- On success, form clears and success message displays
```

---

## Integration with MoSCoW Prioritization

**Conditions of Satisfaction** combine MoSCoW priorities with acceptance criteria:

1. **Must Have Conditions**: These become your core acceptance criteria
2. **Should Have Conditions**: Document as "should" requirements; may be moved to future iterations
3. **Could Have Conditions**: List as enhancements; explicitly mark as optional
4. **Won't Have Conditions**: Document what is explicitly out of scope to prevent scope creep

### Example Integration

**User Story**: _As a bank customer, I want to withdraw cash from an ATM so that I can access my money quickly._

**Conditions of Satisfaction (MoSCoW)**:

**Must Have** (becomes core AC):

- Verify account has sufficient funds
- Dispense correct amount of cash
- Debit account accurately
- Return card to user
- Handle network failures gracefully

**Acceptance Criteria** (from Must Haves):

```gherkin
Scenario 1: Successful cash withdrawal
Given: The account has sufficient funds
And: The card is valid
And: The dispenser contains cash
When: The customer requests cash
Then: The account is debited
And: Cash is dispensed
And: The card is returned

Scenario 2: Insufficient funds
Given: The account is overdrawn
And: The card is valid
When: The customer requests cash
Then: A rejection message is displayed
And: Cash is not dispensed
And: The card is returned
```

---

## Common Pitfalls and Solutions

### Pitfall 1: Vague Requirements

**Problem**: "Make the system user-friendly" **Solution**: "The user should be able to complete checkout in 3 steps or
fewer"

### Pitfall 2: Untestable Criteria

**Problem**: "The system should be fast" **Solution**: "The system should load search results in under 2 seconds for 95%
of queries"

### Pitfall 3: Mixing Technical and Business Requirements

**Problem**: "Use React hooks for state management" **Solution**: "The application should maintain user session state
across page refreshes"

### Pitfall 4: Too Many Details

**Problem**: "Button should be 120px wide, 40px tall, #0066CC background, 12px padding, 4px border-radius, Roboto
font..." **Solution**: "Submit button follows brand design guidelines"

### Pitfall 5: No Negative Scenarios

**Problem**: Only covering the happy path **Solution**: Include error scenarios, edge cases, and invalid inputs

---

## Who Writes Acceptance Criteria?

The collaborative nature of cross-functional teams allows different team members to create acceptance criteria:

### Product Owner

Typically starts the process while:

- Forming the product requirements document
- Creating the sprint backlog
- Defining user stories

### Business Analyst / Requirements Analyst

May take over in complex scenarios involving:

- Multiple stakeholders
- Complex business rules
- Regulatory requirements

### Project Manager / Product Manager

In some organizations, they document AC when:

- Managing smaller teams
- Working on less technical projects
- Coordinating across departments

### Client

Can document AC if they have:

- Ample technical knowledge
- Product documentation experience
- Clear understanding of development process

**Important**: Regardless of who writes them initially, all stakeholders must review and agree on the criteria before
development begins.

---

## Summary

Effective acceptance criteria:

### Characteristics

✅ Clear and unambiguous ✅ Testable with pass/fail scenarios ✅ Written in plain English ✅ Focused on outcomes, not
implementation ✅ Measurable with specific metrics ✅ Cover positive and negative scenarios

### Benefits

- Prevent misunderstandings
- Enable accurate estimation
- Support effective testing
- Align stakeholder expectations
- Reduce rework
- Facilitate communication

### Process

1. Write during backlog grooming
2. Finalize before sprint planning
3. Base on Must Have conditions from MoSCoW
4. Choose appropriate format (Given/When/Then or Checklist)
5. Review with team and stakeholders
6. Use as basis for testing

### Remember

> Acceptance criteria describe WHAT the system should do, not HOW it should do it.

Good acceptance criteria save time, prevent confusion, and ensure everyone understands what "done" means.

---

## References

- Acceptance Criteria Best Practices:
  <https://www.altexsoft.com/blog/acceptance-criteria-purposes-formats-and-best-practices/>
- Behavior-Driven Development (BDD): <https://en.wikipedia.org/wiki/Behavior-driven_development>
- Gherkin Language Specification: <https://cucumber.io/docs/gherkin/>
- Agile Alliance: <https://www.agilealliance.org/glossary/acceptance-criteria/>
