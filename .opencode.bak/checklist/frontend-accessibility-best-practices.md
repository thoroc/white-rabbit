---
description:
  Comprehensive accessibility checklist following WCAG 2.1 guidelines for building inclusive web applications with
  proper semantic HTML, ARIA, and keyboard navigation
type: checklist
category: Quality
tags:
  - accessibility
  - a11y
  - wcag
  - frontend
  - quality-assurance
  - testing
version: 1.0.0
last_updated: 2025-11-19
---

# Frontend Accessibility Best Practices Checklist

This checklist ensures web applications are accessible to all users, including those using assistive technologies. Based
on WCAG 2.1 Level AA guidelines.

## Semantic HTML

### ✅ DO

- [ ] Use **semantic HTML elements** for their intended purpose
- [ ] Use `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` for page structure
- [ ] Use `<button>` for clickable actions, `<a>` for navigation
- [ ] Use `<form>` elements for user input
- [ ] Use `<label>` elements for all form inputs
- [ ] Use proper heading hierarchy (`<h1>` → `<h2>` → `<h3>`, etc.)
- [ ] Use `<section>` to group related content
- [ ] Use `<ul>`/`<ol>` for lists
- [ ] Use `<table>` only for tabular data with proper `<th>`, `<td>`, `<caption>`
- [ ] Use `<figure>` and `<figcaption>` for images with captions

### ❌ DON'T

- [ ] Don't use `<div>` for everything - it provides no semantic meaning
- [ ] Don't use `<div>` or `<span>` as buttons - use `<button>`
- [ ] Don't skip heading levels (e.g., `<h1>` to `<h3>`)
- [ ] Don't use tables for layout
- [ ] Don't rely solely on visual styling to convey meaning
- [ ] Don't use generic elements when semantic ones exist

## ARIA Attributes

### ✅ DO

- [ ] Use ARIA attributes when **semantic HTML is insufficient**
- [ ] Use `aria-label` for elements without visible text
- [ ] Use `aria-labelledby` to reference existing text elements
- [ ] Use `aria-describedby` for additional descriptions
- [ ] Use `aria-hidden="true"` for decorative elements
- [ ] Use proper ARIA roles when needed: `role="navigation"`, `role="search"`, etc.
- [ ] Use `aria-live` regions for dynamic content updates
- [ ] Use `aria-expanded` for expandable/collapsible elements
- [ ] Use `aria-current` for current page/step indicators
- [ ] Verify ARIA attributes with `playwright_browser_snapshot` MCP tool

### ❌ DON'T

- [ ] Don't use ARIA when semantic HTML is available
- [ ] Don't use ARIA roles that conflict with native semantics
- [ ] Don't use `aria-label` on elements that already have visible text
- [ ] Don't forget to update ARIA states (expanded, selected, etc.)
- [ ] Don't use deprecated ARIA attributes
- [ ] Don't rely solely on ARIA - semantic HTML is preferred

## Keyboard Navigation

### ✅ DO

- [ ] Ensure all interactive elements are **keyboard accessible**
- [ ] Support `Tab` key for navigation
- [ ] Support `Shift+Tab` for reverse navigation
- [ ] Support `Enter` and `Space` for activation
- [ ] Support arrow keys for menus, lists, and sliders
- [ ] Support `Escape` to close modals and dialogs
- [ ] Implement logical tab order (matches visual order)
- [ ] Make focus indicators visible
- [ ] Test keyboard navigation with `playwright_browser_press_key` MCP tool
- [ ] Trap focus within modals and dialogs
- [ ] Restore focus when closing modals

### ❌ DON'T

- [ ] Don't rely solely on mouse/touch interactions
- [ ] Don't create keyboard traps (unable to escape with keyboard)
- [ ] Don't skip focusable elements in tab order
- [ ] Don't remove focus indicators (outline)
- [ ] Don't use `tabindex` > 0 (disrupts natural tab order)
- [ ] Don't forget to test with keyboard only

## Focus Management

### ✅ DO

- [ ] Make all interactive elements **focusable**
- [ ] Provide visible focus indicators (`:focus`, `:focus-visible`)
- [ ] Ensure focus indicators have sufficient contrast (3:1 minimum)
- [ ] Manage focus programmatically when content changes
- [ ] Move focus to newly opened modals/dialogs
- [ ] Return focus to trigger element when closing modals
- [ ] Skip to main content link for keyboard users
- [ ] Use `tabindex="0"` to make custom interactive elements focusable
- [ ] Use `tabindex="-1"` for programmatic focus only
- [ ] Test focus order matches visual order

### ❌ DON'T

- [ ] Don't remove focus indicators with CSS
- [ ] Don't use low-contrast focus indicators
- [ ] Don't lose focus when content updates
- [ ] Don't use positive `tabindex` values
- [ ] Don't forget to restore focus after navigation
- [ ] Don't create illogical focus order

## Images and Media

### ✅ DO

- [ ] Provide **alt text** for all meaningful images
- [ ] Use empty alt (`alt=""`) for decorative images
- [ ] Provide text alternatives for charts and graphs
- [ ] Use `<figure>` and `<figcaption>` for complex images
- [ ] Provide captions/transcripts for videos
- [ ] Provide captions for audio content
- [ ] Ensure media controls are keyboard accessible
- [ ] Test with `playwright_browser_evaluate` to verify alt text presence
- [ ] Use descriptive filenames as backup
- [ ] Provide long descriptions for complex images (`aria-describedby`)

### ❌ DON'T

- [ ] Don't use "image" or "picture" in alt text (screen readers announce this)
- [ ] Don't skip alt attributes
- [ ] Don't use same alt text for different images
- [ ] Don't put important information only in images
- [ ] Don't forget to test image accessibility
- [ ] Don't use images of text when real text is possible

## Color and Contrast

### ✅ DO

- [ ] Ensure **sufficient color contrast** (4.5:1 for normal text, 3:1 for large text)
- [ ] Ensure focus indicators have 3:1 contrast ratio
- [ ] Test contrast with automated tools
- [ ] Use multiple indicators beyond color (icons, patterns, text)
- [ ] Provide high contrast mode support
- [ ] Ensure contrast in all UI states (hover, focus, disabled)
- [ ] Use colors that work for colorblind users
- [ ] Document color choices and contrast ratios

### ❌ DON'T

- [ ] Don't rely solely on color to convey information
- [ ] Don't use low contrast text
- [ ] Don't ignore contrast in disabled states
- [ ] Don't use color combinations that are hard for colorblind users
- [ ] Don't forget to test in different lighting conditions
- [ ] Don't skip contrast testing

## Forms

### ✅ DO

- [ ] Associate `<label>` with every form input
- [ ] Use `<fieldset>` and `<legend>` for related form groups
- [ ] Provide clear error messages
- [ ] Use `aria-invalid` for invalid fields
- [ ] Use `aria-describedby` to associate errors with fields
- [ ] Indicate required fields clearly (not just with color/asterisk)
- [ ] Provide helpful placeholder text (not as replacement for labels)
- [ ] Use appropriate input types (`email`, `tel`, `date`, etc.)
- [ ] Test form accessibility with `playwright_browser_fill_form` MCP tool
- [ ] Provide clear instructions for complex forms
- [ ] Show validation errors inline and in context

### ❌ DON'T

- [ ] Don't use placeholder as label replacement
- [ ] Don't hide labels visually without screen reader text
- [ ] Don't use generic error messages
- [ ] Don't only indicate errors with color
- [ ] Don't disable submit button before validation
- [ ] Don't forget to test form navigation with keyboard

## Screen Reader Compatibility

### ✅ DO

- [ ] Test with **screen readers** (NVDA, JAWS, VoiceOver)
- [ ] Use `aria-live` regions for dynamic content
- [ ] Provide skip navigation links
- [ ] Use `aria-label` for icon buttons
- [ ] Announce page changes and updates
- [ ] Use proper heading structure for navigation
- [ ] Test with `playwright_browser_snapshot` for accessibility tree
- [ ] Provide text alternatives for non-text content
- [ ] Use `visually-hidden` class for screen reader only text
- [ ] Ensure reading order matches visual order

### ❌ DON'T

- [ ] Don't forget to test with actual screen readers
- [ ] Don't only test visually
- [ ] Don't hide important content from screen readers
- [ ] Don't create confusing reading order
- [ ] Don't forget to announce dynamic changes
- [ ] Don't use `display: none` or `visibility: hidden` for screen reader text

## Heading Hierarchy

### ✅ DO

- [ ] Use **one `<h1>`** per page for main title
- [ ] Follow logical heading order (`<h1>` → `<h2>` → `<h3>`)
- [ ] Use headings to structure content logically
- [ ] Ensure headings describe following content
- [ ] Use headings for navigation and scanning
- [ ] Test heading structure with `playwright_browser_snapshot`
- [ ] Verify heading count and order in tests
- [ ] Document heading hierarchy for complex pages

### ❌ DON'T

- [ ] Don't skip heading levels (e.g., `<h2>` to `<h4>`)
- [ ] Don't use headings for styling only
- [ ] Don't use multiple `<h1>` tags on a page
- [ ] Don't use inconsistent heading hierarchy
- [ ] Don't forget headings in dynamically loaded content

## Links and Navigation

### ✅ DO

- [ ] Use descriptive **link text** (not "click here")
- [ ] Ensure links are distinguishable from regular text
- [ ] Indicate external links
- [ ] Indicate download links
- [ ] Provide skip navigation links
- [ ] Use `aria-current="page"` for current page link
- [ ] Ensure sufficient target size (44×44 CSS pixels minimum)
- [ ] Test navigation with keyboard using MCP tools
- [ ] Group related links in `<nav>` elements
- [ ] Provide breadcrumb navigation when appropriate

### ❌ DON'T

- [ ] Don't use vague link text ("click here", "read more", "learn more")
- [ ] Don't rely only on color to distinguish links
- [ ] Don't use JavaScript for links when `<a>` tags work
- [ ] Don't forget to indicate links that open new windows
- [ ] Don't create tiny click targets
- [ ] Don't make non-interactive elements look like links

## Dynamic Content

### ✅ DO

- [ ] Use `aria-live` regions for **dynamic updates**
- [ ] Announce loading states to screen readers
- [ ] Manage focus when content changes
- [ ] Use `aria-busy` during loading
- [ ] Provide accessible loading indicators
- [ ] Test dynamic updates with screen readers
- [ ] Use `aria-atomic` for complete message announcements
- [ ] Use appropriate `aria-live` politeness levels
- [ ] Ensure dynamic content is keyboard accessible

### ❌ DON'T

- [ ] Don't update content without screen reader announcements
- [ ] Don't lose focus when content updates
- [ ] Don't create inaccessible loading spinners
- [ ] Don't forget to test dynamic content with assistive technology
- [ ] Don't rely on visual-only loading indicators

## Modals and Dialogs

### ✅ DO

- [ ] Trap focus within open modals
- [ ] Return focus to trigger element on close
- [ ] Support `Escape` key to close
- [ ] Use `role="dialog"` or `role="alertdialog"`
- [ ] Use `aria-modal="true"`
- [ ] Use `aria-labelledby` for modal title
- [ ] Use `aria-describedby` for modal description
- [ ] Disable background content (inert attribute or aria-hidden)
- [ ] Test modal accessibility with keyboard
- [ ] Provide visible close button

### ❌ DON'T

- [ ] Don't allow focus to escape modal
- [ ] Don't forget to restore focus after closing
- [ ] Don't make modals keyboard-inaccessible
- [ ] Don't forget to announce modal opening to screen readers
- [ ] Don't skip modal title and description

## Testing and Validation

### ✅ DO

- [ ] Use **automated accessibility testing tools**
- [ ] Use `playwright_browser_snapshot({ verbose: true })` for a11y tree inspection
- [ ] Test with actual assistive technologies (screen readers)
- [ ] Test keyboard-only navigation with `playwright_browser_press_key`
- [ ] Validate ARIA attributes via MCP snapshots
- [ ] Run accessibility audits in DevTools
- [ ] Test with different viewport sizes using `playwright_browser_resize`
- [ ] Include accessibility tests in CI/CD
- [ ] Document accessibility test results
- [ ] Regular accessibility audits

### ❌ DON'T

- [ ] Don't rely only on automated testing
- [ ] Don't skip manual testing with assistive technology
- [ ] Don't ignore accessibility test failures
- [ ] Don't test only with mouse interactions
- [ ] Don't forget to test edge cases
- [ ] Don't skip accessibility in code reviews

## Responsive and Mobile

### ✅ DO

- [ ] Ensure **touch targets** are at least 44×44 CSS pixels
- [ ] Test with `playwright_browser_resize` for different viewports
- [ ] Support zoom up to 200% without horizontal scrolling
- [ ] Ensure text is readable without zoom
- [ ] Use responsive font sizes (rem, em)
- [ ] Test with mobile screen readers
- [ ] Support portrait and landscape orientations
- [ ] Ensure focus indicators work on touch devices
- [ ] Test with device emulation

### ❌ DON'T

- [ ] Don't create tiny touch targets
- [ ] Don't disable pinch-to-zoom
- [ ] Don't use fixed font sizes (px)
- [ ] Don't forget mobile accessibility testing
- [ ] Don't assume mouse-only interactions
- [ ] Don't ignore orientation changes

## WCAG 2.1 Level AA Compliance

### ✅ DO

- [ ] Follow **WCAG 2.1 Level AA** guidelines minimum
- [ ] Ensure perceivable content (text alternatives, captions, contrast)
- [ ] Ensure operable interface (keyboard, timing, navigation)
- [ ] Ensure understandable content (readable, predictable, input assistance)
- [ ] Ensure robust code (compatible with assistive technologies)
- [ ] Document WCAG compliance
- [ ] Perform regular accessibility audits
- [ ] Track and fix accessibility issues
- [ ] Train team on accessibility

### ❌ DON'T

- [ ] Don't aim for less than Level AA compliance
- [ ] Don't skip accessibility in project planning
- [ ] Don't treat accessibility as optional
- [ ] Don't ignore WCAG guidelines
- [ ] Don't forget to document accessibility decisions

## Documentation

### ✅ DO

- [ ] Document **accessibility features** in component documentation
- [ ] Create accessibility testing guidelines
- [ ] Document keyboard shortcuts
- [ ] Document ARIA usage decisions
- [ ] Provide accessibility statement on website
- [ ] Document known accessibility issues
- [ ] Create accessibility onboarding for developers
- [ ] Reference accessibility resources and standards

### ❌ DON'T

- [ ] Don't assume accessibility is self-evident
- [ ] Don't skip documenting keyboard shortcuts
- [ ] Don't forget to update documentation
- [ ] Don't leave accessibility decisions undocumented

## MCP Testing Tools

Use these OpenCode MCP tools for accessibility testing:

- [ ] `playwright_browser_snapshot({ verbose: true })` - Inspect accessibility tree
- [ ] `playwright_browser_press_key({ key: "Tab" })` - Test keyboard navigation
- [ ] `playwright_browser_evaluate()` - Check ARIA attributes programmatically
- [ ] `playwright_browser_resize()` - Test responsive accessibility
- [ ] `chrome-devtools_take_snapshot()` - Alternative accessibility snapshot tool

## Related Resources

- **Playwright MCP Tools Reference**: `.opencode/knowledge-base/playwright-mcp-tools.md`
- **Playwright Testing Best Practices**: `.opencode/checklist/playwright-testing-best-practices.md`
- **Frontend Testing Agent**: `.opencode/agent/frontend-testing.md`
- **WCAG 2.1 Guidelines**: <https://www.w3.org/WAI/WCAG21/quickref/>

## Quick Reference: Common ARIA Attributes

```html
<!-- Buttons and actions -->
<button aria-label="Close">×</button>
<button aria-expanded="false" aria-controls="menu">Menu</button>

<!-- Form inputs -->
<input aria-invalid="true" aria-describedby="error-msg" />
<span id="error-msg">Email is required</span>

<!-- Navigation -->
<nav aria-label="Main navigation">
  <a href="/" aria-current="page">Home</a>
</nav>

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true">Item added to cart</div>

<!-- Modals -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirmation</h2>
</div>
```

## Summary Checklist

Before considering accessibility complete:

- [ ] Semantic HTML is used throughout
- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA standards
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Forms have proper labels and error messages
- [ ] Heading hierarchy is logical
- [ ] ARIA attributes are used correctly
- [ ] Screen reader testing is performed
- [ ] Accessibility tests are automated with MCP tools
- [ ] Documentation includes accessibility information
- [ ] WCAG 2.1 Level AA compliance is achieved
