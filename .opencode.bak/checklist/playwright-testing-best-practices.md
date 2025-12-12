---
description:
  Comprehensive checklist of best practices for Playwright testing with MCP tools including test architecture, locators,
  and reliability patterns
type: checklist
category: Quality
tags:
  - testing
  - playwright
  - best-practices
  - mcp
  - quality-assurance
version: 1.0.0
last_updated: 2025-11-19
---

# Playwright Testing Best Practices Checklist

This checklist ensures comprehensive, reliable, and maintainable Playwright tests using OpenCode MCP tools.

## MCP Tool Usage

### ✅ DO

- [ ] **ALWAYS use MCP tools** (`playwright_*` and `chrome-devtools_*`) for all browser operations
- [ ] Use `playwright_browser_navigate` for page navigation instead of bash commands
- [ ] Use `playwright_browser_snapshot` for accessibility inspection (preferred method)
- [ ] Use `playwright_browser_take_screenshot` for visual regression testing
- [ ] Use `playwright_browser_wait_for` for waiting conditions (never hard-coded sleeps)
- [ ] Use `chrome-devtools_performance_*` tools for performance analysis
- [ ] Use `chrome-devtools_list_console_messages` for console error detection
- [ ] Use `chrome-devtools_list_network_requests` for network analysis
- [ ] Reference the Playwright MCP Tools knowledge base for complete tool documentation

### ❌ DON'T

- [ ] **Never use bash commands for browser operations** (e.g., `npx playwright test` - use MCPs instead)
- [ ] Don't use arbitrary `sleep()` or timeouts - use `playwright_browser_wait_for`
- [ ] Don't ignore available MCP debugging tools
- [ ] Don't skip MCP tool documentation when troubleshooting

## Test Architecture

### ✅ DO

- [ ] Use **Page Object Model (POM)** pattern for organizing tests
- [ ] Create reusable test fixtures and utilities
- [ ] Implement proper test setup and teardown with fixtures
- [ ] Organize tests in logical directory structure
- [ ] Use descriptive test file names (e.g., `homepage.spec.ts`, `login.spec.ts`)
- [ ] Group related tests with `test.describe()` blocks
- [ ] Configure test environments and browsers via MCP tools
- [ ] Implement parallel test execution where appropriate
- [ ] Set up CI/CD integration for automated testing
- [ ] Design test data management strategies
- [ ] Document test architecture decisions

### ❌ DON'T

- [ ] Don't write monolithic test files with unrelated tests
- [ ] Don't duplicate test logic across multiple files
- [ ] Don't hard-code test data inline - use fixtures or data files
- [ ] Don't skip test organization - it leads to maintenance issues

## Test Writing

### ✅ DO

- [ ] Write **descriptive test names** that explain what is being tested
- [ ] Use clear, concise test descriptions
- [ ] Follow **AAA pattern** (Arrange, Act, Assert)
- [ ] Add comments for complex test logic
- [ ] Test one thing per test case
- [ ] Write tests that are independent and can run in any order
- [ ] Implement proper test isolation (no shared state)
- [ ] Use meaningful variable names
- [ ] Keep tests focused and concise
- [ ] Document edge cases and special conditions

### ❌ DON'T

- [ ] Don't write vague test names like "test1" or "works correctly"
- [ ] Don't create test dependencies (Test A must run before Test B)
- [ ] Don't test multiple unrelated features in one test
- [ ] Don't leave commented-out test code without explanation
- [ ] Don't write tests that depend on execution order

## Locator Strategies

### ✅ DO

- [ ] Use **role-based locators** (preferred): `getByRole('button', { name: 'Submit' })`
- [ ] Use text locators for unique text: `getByText('Welcome')`
- [ ] Use test IDs for dynamic content: `getByTestId('user-profile')`
- [ ] Use label locators for form fields: `getByLabel('Email')`
- [ ] Use placeholder locators when appropriate: `getByPlaceholder('Search...')`
- [ ] Leverage MCP snapshot output to identify correct element references
- [ ] Verify locators with `playwright_browser_snapshot` before using
- [ ] Document locator choices for complex elements
- [ ] Use consistent locator strategies across the test suite

### ❌ DON'T

- [ ] Don't use **fragile CSS selectors** (`.class-name-xyz123`)
- [ ] Don't use XPath unless absolutely necessary
- [ ] Don't rely on element position or DOM hierarchy
- [ ] Don't use auto-generated class names that change with builds
- [ ] Don't skip snapshot inspection - it reveals proper element references

## Test Reliability

### ✅ DO

- [ ] Use **auto-waiting features** built into MCP tools
- [ ] Use `playwright_browser_wait_for` for explicit waits
- [ ] Wait for text to appear: `await playwright_browser_wait_for({ text: "Loaded" })`
- [ ] Wait for text to disappear: `await playwright_browser_wait_for({ textGone: "Loading..." })`
- [ ] Configure proper timeouts for different operations
- [ ] Implement test retries for genuinely flaky infrastructure
- [ ] Use `playwright_browser_snapshot` before interactions to verify element availability
- [ ] Handle race conditions with proper waits
- [ ] Test error states and edge cases
- [ ] Verify elements exist before interacting

### ❌ DON'T

- [ ] Don't use hard-coded waits: `await page.waitForTimeout(5000)`
- [ ] Don't rely on fixed timeouts for dynamic content
- [ ] Don't ignore flaky tests - fix the root cause
- [ ] Don't use test retries to mask poorly written tests
- [ ] Don't skip error handling in tests

## Assertions

### ✅ DO

- [ ] Implement **proper assertions** for all test conditions
- [ ] Use specific assertions: `expect(element).toBeVisible()`
- [ ] Assert on meaningful state changes
- [ ] Verify both positive and negative cases
- [ ] Use accessibility assertions via `playwright_browser_snapshot`
- [ ] Assert on error states and edge cases
- [ ] Verify visual elements with `playwright_browser_take_screenshot` comparisons
- [ ] Check console errors with `chrome-devtools_list_console_messages`
- [ ] Document why assertions are important for complex conditions

### ❌ DON'T

- [ ] Don't skip assertions - they're the core of testing
- [ ] Don't use generic assertions when specific ones exist
- [ ] Don't assert on implementation details
- [ ] Don't ignore assertion failures
- [ ] Don't only test happy paths

## Test Data Management

### ✅ DO

- [ ] Use fixtures for test setup
- [ ] Create test data in setup, clean up in teardown
- [ ] Use unique identifiers for test data
- [ ] Isolate test data between test runs
- [ ] Document test data requirements
- [ ] Use factories or builders for complex test data
- [ ] Store test data in separate files/fixtures
- [ ] Use realistic test data that matches production patterns

### ❌ DON'T

- [ ] Don't use production data in tests
- [ ] Don't share test data between tests
- [ ] Don't hard-code test data inline
- [ ] Forget to clean up test data after tests complete
- [ ] Don't use random data without understanding implications

## Accessibility Testing

### ✅ DO

- [ ] Use `playwright_browser_snapshot` for **accessibility tree analysis** (preferred method)
- [ ] Test **keyboard navigation** with `playwright_browser_press_key`
- [ ] Verify proper heading hierarchy (h1, h2, h3, etc.)
- [ ] Check for alt text on images
- [ ] Test focus management and tab order
- [ ] Verify ARIA attributes via snapshots
- [ ] Test screen reader compatibility
- [ ] Check color contrast ratios
- [ ] Validate form labels and error messages
- [ ] Test with different viewport sizes using `playwright_browser_resize`

### ❌ DON'T

- [ ] Don't skip accessibility testing
- [ ] Don't only test with mouse interactions
- [ ] Don't ignore WCAG 2.1 guidelines
- [ ] Don't forget to test keyboard-only navigation
- [ ] Don't skip testing with assistive technologies

## Visual Testing

### ✅ DO

- [ ] Use `playwright_browser_take_screenshot` for **visual regression testing**
- [ ] Take full-page screenshots: `fullPage: true`
- [ ] Use consistent viewport sizes with `playwright_browser_resize`
- [ ] Capture screenshots at stable points (after loading, animations complete)
- [ ] Store baseline screenshots for comparison
- [ ] Document visual test expectations
- [ ] Test responsive design at multiple viewport sizes
- [ ] Use screenshots for documentation and bug reports

### ❌ DON'T

- [ ] Don't compare screenshots without consistent viewport sizes
- [ ] Don't take screenshots during animations or loading states
- [ ] Don't ignore visual regression failures
- [ ] Don't skip responsive testing
- [ ] Don't only rely on visual tests - combine with functional tests

## Performance Testing

### ✅ DO

- [ ] Use `chrome-devtools_performance_start_trace` to start performance recording
- [ ] Test **Core Web Vitals** (LCP, FID, CLS) with DevTools MCP
- [ ] Measure page load times
- [ ] Analyze network requests with `chrome-devtools_list_network_requests`
- [ ] Check for console warnings/errors with `chrome-devtools_list_console_messages`
- [ ] Test under throttled conditions using `chrome-devtools_emulate`
- [ ] Monitor bundle sizes and resource loading
- [ ] Use `chrome-devtools_performance_analyze_insight` for detailed analysis
- [ ] Document performance baselines and thresholds

### ❌ DON'T

- [ ] Don't skip performance testing
- [ ] Don't ignore performance regressions
- [ ] Don't test only on fast networks
- [ ] Don't forget to analyze performance traces
- [ ] Don't skip CPU throttling tests

## Cross-Browser Testing

### ✅ DO

- [ ] Configure multiple browser projects in Playwright config
- [ ] Test on **Chromium, Firefox, and WebKit**
- [ ] Test on different operating systems
- [ ] Use device emulation for mobile testing
- [ ] Document browser-specific issues
- [ ] Test critical user flows on all target browsers
- [ ] Use `playwright_browser_resize` for different device viewports

### ❌ DON'T

- [ ] Don't only test in Chromium
- [ ] Don't skip mobile browser testing
- [ ] Don't ignore browser-specific bugs
- [ ] Don't use browser-specific features without testing
- [ ] Don't forget to test on actual devices when possible

## Test Organization

### ✅ DO

- [ ] Use **test tags** for organization: `test.only`, `test.skip`
- [ ] Group tests by feature or user flow
- [ ] Create separate test suites for smoke, regression, and e2e tests
- [ ] Use meaningful directory structure
- [ ] Document test coverage and gaps
- [ ] Maintain a test plan document
- [ ] Track test metrics (coverage, execution time, flakiness)
- [ ] Review and update tests regularly

### ❌ DON'T

- [ ] Don't mix unit, integration, and e2e tests in same files
- [ ] Don't leave `test.only` or `test.skip` in committed code without reason
- [ ] Don't create tests without understanding what they cover
- [ ] Don't ignore test coverage gaps

## CI/CD Integration

### ✅ DO

- [ ] Configure Playwright in CI/CD pipeline
- [ ] Run tests on every pull request
- [ ] Use test reporters (HTML, JSON, JUnit)
- [ ] Store test artifacts (screenshots, traces, videos)
- [ ] Set up automatic test retries for infrastructure issues
- [ ] Configure notifications for test failures
- [ ] Use parallelization in CI
- [ ] Document CI/CD test requirements

### ❌ DON'T

- [ ] Don't skip CI tests to merge faster
- [ ] Don't ignore flaky tests in CI
- [ ] Don't use different test configurations in CI vs local
- [ ] Don't forget to preserve test artifacts for debugging

## Debugging

### ✅ DO

- [ ] Use `playwright_browser_snapshot` to inspect page state
- [ ] Use `playwright_browser_console_messages` to check console output
- [ ] Use `chrome-devtools_list_console_messages` for detailed console analysis
- [ ] Use `playwright_browser_take_screenshot` to capture failures
- [ ] Enable trace recording for debugging: `trace: "on-first-retry"`
- [ ] Use Playwright Inspector for step-by-step debugging
- [ ] Document debugging steps for complex tests
- [ ] Use verbose snapshots when needed: `verbose: true`

### ❌ DON'T

- [ ] Don't debug blindly - use available MCP tools
- [ ] Don't skip capturing failure screenshots
- [ ] Don't ignore console errors and warnings
- [ ] Don't forget to check network requests with DevTools MCP
- [ ] Don't overlook trace files - they're invaluable for debugging

## Test Maintenance

### ✅ DO

- [ ] **Document test coverage** and update as features change
- [ ] Review tests when features change
- [ ] Refactor tests to reduce duplication
- [ ] Update Page Objects when UI changes
- [ ] Keep tests aligned with application behavior
- [ ] Remove obsolete tests
- [ ] Update test documentation
- [ ] Track test technical debt

### ❌ DON'T

- [ ] Don't let tests become outdated
- [ ] Don't ignore failing tests
- [ ] Don't accumulate test technical debt
- [ ] Don't forget to update tests when features change
- [ ] Don't keep tests for removed features

## Code Quality

### ✅ DO

- [ ] Follow TypeScript best practices
- [ ] Use proper types for test fixtures and helpers
- [ ] Implement DRY (Don't Repeat Yourself) principle
- [ ] Use ESLint/Prettier for consistent code style
- [ ] Write self-documenting code with clear names
- [ ] Add JSDoc comments for complex utilities
- [ ] Keep test files under 300 lines
- [ ] Extract reusable helpers and utilities

### ❌ DON'T

- [ ] Don't use `any` types - be specific
- [ ] Don't ignore TypeScript errors
- [ ] Don't copy-paste test code - create utilities
- [ ] Don't skip code reviews for test changes
- [ ] Don't write cryptic or overly clever code

## Documentation

### ✅ DO

- [ ] Document test architecture and patterns
- [ ] Create README for test suite
- [ ] Document how to run tests locally
- [ ] Explain complex test scenarios
- [ ] Document known issues and limitations
- [ ] Keep troubleshooting guide updated
- [ ] Document MCP tool usage patterns
- [ ] Reference related knowledge bases and checklists

### ❌ DON'T

- [ ] Don't assume tests are self-documenting
- [ ] Don't skip onboarding documentation for new team members
- [ ] Don't forget to document custom utilities and helpers
- [ ] Don't leave outdated documentation

## Related Resources

- **Playwright MCP Tools Reference**: `.opencode/knowledge-base/playwright-mcp-tools.md` - Complete MCP tool
  documentation
- **Frontend Testing Scenarios**: `.opencode/knowledge-base/frontend-testing-scenarios.md` - Common testing patterns
- **Frontend Testing Agent**: `.opencode/agent/frontend-testing.md` - Specialized testing agent
- **Playwright Templates**: `.opencode/template/playwright-*-tmpl.yaml` - Code generation templates

## Summary Checklist

Before considering tests complete:

- [ ] All tests use MCP tools (no bash commands for browser operations)
- [ ] Tests follow Page Object Model pattern
- [ ] All tests have descriptive names and proper assertions
- [ ] Accessibility testing is included via `playwright_browser_snapshot`
- [ ] Visual regression tests use `playwright_browser_take_screenshot`
- [ ] Performance testing uses `chrome-devtools_performance_*` tools
- [ ] Tests are reliable (no flakiness, proper waits)
- [ ] Cross-browser testing is configured
- [ ] CI/CD integration is set up
- [ ] Documentation is complete and up-to-date
- [ ] Test coverage is documented
- [ ] Code quality standards are met
