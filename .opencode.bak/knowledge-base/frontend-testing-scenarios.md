---
title: Frontend Testing Scenarios with Playwright MCPs
description: Comprehensive guide to common frontend testing scenarios using Playwright and Chrome DevTools MCP tools in OpenCode
type: knowledge-base
category: Development
tags:
  - testing
  - playwright
  - scenarios
  - mcp
  - examples
  - patterns
version: 1.0.0
last_updated: 2025-11-19
---

# Frontend Testing Scenarios with Playwright MCPs

This guide provides practical, real-world testing scenarios using Playwright and Chrome DevTools MCP tools. Each
scenario includes step-by-step instructions with actual MCP tool calls.

## Overview

These scenarios demonstrate how to use MCP tools effectively for:

- Documentation site setup and validation
- Comprehensive test suite implementation
- Performance optimization
- Accessibility auditing

All examples use MCP tools exclusively - no bash commands for browser operations.

## Scenario 1: Setting Up New Documentation Site

### Goal

Validate a new documentation site setup with navigation, content, and visual regression testing.

### Prerequisites

- Local development server running (e.g., `http://localhost:4321`)
- Documentation framework installed (Starlight, Docusaurus, VitePress, etc.)

### Testing Workflow

#### Step 1: Navigate to Local Dev Server

```typescript
await playwright_browser_navigate({
  type: 'url',
  url: 'http://localhost:4321',
});
```

**Why**: Start testing by loading the homepage.

#### Step 2: Take Accessibility Snapshot

```typescript
await playwright_browser_snapshot();
```

**Why**: Get the accessibility tree to understand page structure and identify element references for further testing.

**What to look for**:

- Proper heading hierarchy
- Navigation landmarks
- Button and link references
- ARIA attributes

#### Step 3: Test Navigation

```typescript
// Click on "Getting Started" link
await playwright_browser_click({
  element: 'Getting Started link',
  ref: 'nav-getting-started',
});
```

**Why**: Verify navigation works correctly.

**Note**: Get the `ref` value from the previous snapshot output.

#### Step 4: Validate Page Loaded

```typescript
await playwright_browser_wait_for({
  text: 'Getting Started',
});
```

**Why**: Ensure navigation completed and content loaded.

#### Step 5: Take Screenshot for Visual Regression

```typescript
await playwright_browser_take_screenshot({
  filename: 'getting-started.png',
  fullPage: true,
});
```

**Why**: Create baseline screenshot for future visual regression testing.

#### Step 6: Test Search Functionality

```typescript
// Take snapshot to find search input reference
await playwright_browser_snapshot();

// Type in search box
await playwright_browser_type({
  element: 'Search input',
  ref: 'input-search',
  text: 'installation',
  submit: true,
});

// Wait for search results
await playwright_browser_wait_for({
  text: 'Search Results',
});

// Take screenshot of results
await playwright_browser_take_screenshot({
  filename: 'search-results.png',
});
```

**Why**: Verify search functionality works correctly.

#### Step 7: Test Responsive Design

```typescript
// Test mobile viewport
await playwright_browser_resize({
  width: 375,
  height: 667,
});

await playwright_browser_snapshot();

await playwright_browser_take_screenshot({
  filename: 'mobile-homepage.png',
  fullPage: true,
});

// Test tablet viewport
await playwright_browser_resize({
  width: 768,
  height: 1024,
});

await playwright_browser_take_screenshot({
  filename: 'tablet-homepage.png',
  fullPage: true,
});

// Restore desktop viewport
await playwright_browser_resize({
  width: 1920,
  height: 1080,
});
```

**Why**: Ensure responsive design works at different viewport sizes.

### Complete Example

```typescript
// Complete documentation site validation
async function validateDocumentationSite() {
  // 1. Navigate
  await playwright_browser_navigate({
    type: 'url',
    url: 'http://localhost:4321',
  });

  // 2. Take initial snapshot
  await playwright_browser_snapshot();

  // 3. Test navigation
  await playwright_browser_click({
    element: 'Getting Started link',
    ref: 'nav-getting-started',
  });

  await playwright_browser_wait_for({
    text: 'Getting Started',
  });

  // 4. Test search
  await playwright_browser_navigate({ type: 'back' }); // Go back to home

  await playwright_browser_type({
    element: 'Search input',
    ref: 'input-search',
    text: 'installation',
    submit: true,
  });

  await playwright_browser_wait_for({
    text: 'Search Results',
  });

  // 5. Test responsive
  await playwright_browser_resize({ width: 375, height: 667 });
  await playwright_browser_take_screenshot({
    filename: 'mobile-view.png',
    fullPage: true,
  });

  console.log('Documentation site validation complete!');
}
```

---

## Scenario 2: Implementing Comprehensive Test Suite

### Goal

Create a complete test suite covering navigation, forms, theme switching, accessibility, and performance.

### Test Coverage Using MCPs

#### Navigation Testing

```typescript
// Test: Main navigation works
async function testNavigation() {
  await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com',
  });

  // Get page structure
  await playwright_browser_snapshot();

  // Click each nav item
  const navItems = ['Home', 'About', 'Services', 'Contact'];

  for (const item of navItems) {
    await playwright_browser_click({
      element: `${item} navigation link`,
      ref: `nav-${item.toLowerCase()}`,
    });

    await playwright_browser_wait_for({
      text: item,
    });

    // Verify URL changed
    // Note: Check URL in subsequent snapshot or evaluation
  }
}
```

#### Form Testing

```typescript
// Test: Contact form submission
async function testContactForm() {
  await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com/contact',
  });

  // Take snapshot to get form field references
  await playwright_browser_snapshot();

  // Fill form using MCP
  await playwright_browser_fill_form({
    fields: [
      {
        name: 'Name',
        type: 'textbox',
        ref: 'input-name',
        value: 'John Doe',
      },
      {
        name: 'Email',
        type: 'textbox',
        ref: 'input-email',
        value: 'john@example.com',
      },
      {
        name: 'Message',
        type: 'textbox',
        ref: 'textarea-message',
        value: 'Test message content',
      },
      {
        name: 'Subscribe to newsletter',
        type: 'checkbox',
        ref: 'checkbox-subscribe',
        value: 'true',
      },
    ],
  });

  // Submit form
  await playwright_browser_click({
    element: 'Submit button',
    ref: 'button-submit',
  });

  // Wait for success message
  await playwright_browser_wait_for({
    text: 'Thank you for your message',
  });

  // Take screenshot for verification
  await playwright_browser_take_screenshot({
    filename: 'form-success.png',
  });
}
```

#### Theme Switching Testing

```typescript
// Test: Dark mode toggle
async function testThemeSwitching() {
  await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com',
  });

  // Take snapshot in light mode
  await playwright_browser_snapshot();
  await playwright_browser_take_screenshot({
    filename: 'light-theme.png',
  });

  // Click theme toggle
  await playwright_browser_click({
    element: 'Theme toggle button',
    ref: 'button-theme-toggle',
  });

  // Wait a moment for theme transition
  await playwright_browser_wait_for({ time: 0.5 });

  // Verify dark mode applied
  await playwright_browser_snapshot();
  await playwright_browser_take_screenshot({
    filename: 'dark-theme.png',
  });

  // Verify theme persists after reload
  await playwright_browser_navigate({ type: 'reload' });

  await playwright_browser_snapshot();
  // Check if dark theme is still active
}
```

#### Accessibility Testing

```typescript
// Test: Accessibility compliance
async function testAccessibility() {
  await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com',
  });

  // Get detailed accessibility tree
  await playwright_browser_snapshot({ verbose: true });

  // Test keyboard navigation
  await playwright_browser_press_key({ key: 'Tab' });
  await playwright_browser_press_key({ key: 'Tab' });
  await playwright_browser_press_key({ key: 'Tab' });
  await playwright_browser_press_key({ key: 'Enter' });

  // Wait for navigation
  await playwright_browser_wait_for({ time: 1 });

  // Check for ARIA attributes
  const ariaCheck = await playwright_browser_evaluate({
    function: `() => {
      const buttons = document.querySelectorAll('button');
      return Array.from(buttons).map(btn => ({
        text: btn.textContent?.trim(),
        ariaLabel: btn.getAttribute('aria-label'),
        ariaExpanded: btn.getAttribute('aria-expanded'),
        role: btn.getAttribute('role')
      }));
    }`,
  });

  // Check image alt text
  const imageCheck = await playwright_browser_evaluate({
    function: `() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).map(img => ({
        src: img.src,
        alt: img.alt,
        hasAlt: !!img.alt,
        isDecorative: img.alt === ''
      }));
    }`,
  });

  console.log('Accessibility checks complete', { ariaCheck, imageCheck });
}
```

#### Console Error Detection

```typescript
// Test: No console errors on page load
async function testConsoleErrors() {
  await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com',
  });

  // Wait for page to fully load
  await playwright_browser_wait_for({ time: 2 });

  // Check console using Chrome DevTools MCP
  const consoleMessages = await chrome_devtools_list_console_messages({
    types: ['error', 'warn'],
  });

  // Assert no errors (or handle known warnings)
  console.log('Console messages:', consoleMessages);
}
```

### Complete Test Suite Example

```typescript
async function comprehensiveTestSuite() {
  console.log('Starting comprehensive test suite...');

  // 1. Navigation
  console.log('Testing navigation...');
  await testNavigation();

  // 2. Forms
  console.log('Testing forms...');
  await testContactForm();

  // 3. Theme switching
  console.log('Testing theme switching...');
  await testThemeSwitching();

  // 4. Accessibility
  console.log('Testing accessibility...');
  await testAccessibility();

  // 5. Console errors
  console.log('Checking console errors...');
  await testConsoleErrors();

  console.log('Test suite complete!');
}
```

---

## Scenario 3: Performance Optimization

### Goal

Analyze and optimize page performance using Chrome DevTools MCP tools.

### Step 1: Start Performance Trace

```typescript
await chrome_devtools_performance_start_trace({
  reload: true,
  autoStop: true,
});
```

**Why**: Capture performance metrics including Core Web Vitals during page load.

**Parameters**:

- `reload: true` - Reload page after starting trace
- `autoStop: true` - Automatically stop after page load completes

### Step 2: Analyze Network Requests

```typescript
// Get all network requests
const allRequests = await chrome_devtools_list_network_requests();

// Filter by resource type
const scriptRequests = await chrome_devtools_list_network_requests({
  resourceTypes: ['script'],
});

const styleRequests = await chrome_devtools_list_network_requests({
  resourceTypes: ['stylesheet'],
});

const imageRequests = await chrome_devtools_list_network_requests({
  resourceTypes: ['image'],
});

const apiRequests = await chrome_devtools_list_network_requests({
  resourceTypes: ['xhr', 'fetch'],
});

console.log('Network analysis:', {
  totalRequests: allRequests.length,
  scripts: scriptRequests.length,
  styles: styleRequests.length,
  images: imageRequests.length,
  apis: apiRequests.length,
});
```

**Why**: Identify which resources are being loaded and their types.

### Step 3: Check Console for Performance Warnings

```typescript
const performanceWarnings = await chrome_devtools_list_console_messages({
  types: ['warn', 'error'],
});

console.log('Performance warnings:', performanceWarnings);
```

**Why**: Find JavaScript errors or warnings that might impact performance.

### Step 4: Get Detailed Performance Insights

```typescript
// Stop the trace if not auto-stopped
await chrome_devtools_performance_stop_trace();

// Analyze specific performance insights
await chrome_devtools_performance_analyze_insight({
  insightSetId: 'trace-id-from-stop-result',
  insightName: 'LCPBreakdown',
});
```

**Why**: Get detailed breakdown of Largest Contentful Paint and other metrics.

### Step 5: Test Under Throttled Conditions

```typescript
// Emulate slow 3G network
await chrome_devtools_emulate({
  networkConditions: 'Slow 3G',
  cpuThrottlingRate: 4, // 4x CPU slowdown
});

// Start new trace
await chrome_devtools_performance_start_trace({
  reload: true,
  autoStop: true,
});

// Reset to no throttling
await chrome_devtools_emulate({
  networkConditions: 'No emulation',
  cpuThrottlingRate: 1,
});
```

**Why**: Test performance under poor network conditions.

### Complete Performance Analysis Example

```typescript
async function performanceOptimizationWorkflow() {
  console.log('Starting performance analysis...');

  // 1. Navigate to page
  await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com',
  });

  // 2. Start performance trace
  console.log('Recording performance trace...');
  await chrome_devtools_performance_start_trace({
    reload: true,
    autoStop: false,
  });

  // 3. Perform user interactions
  await playwright_browser_click({
    element: 'Load more button',
    ref: 'button-load-more',
  });

  await playwright_browser_wait_for({
    text: 'Showing 20 items',
  });

  // 4. Stop trace
  const traceResult = await chrome_devtools_performance_stop_trace();
  console.log('Performance trace:', traceResult);

  // 5. Analyze network
  console.log('Analyzing network requests...');
  const requests = await chrome_devtools_list_network_requests({
    resourceTypes: ['script', 'stylesheet', 'image', 'xhr', 'fetch'],
  });

  // Group by type
  const requestsByType = requests.reduce((acc, req) => {
    acc[req.type] = (acc[req.type] || 0) + 1;
    return acc;
  }, {});

  console.log('Requests by type:', requestsByType);

  // 6. Check console
  console.log('Checking console for warnings...');
  const warnings = await chrome_devtools_list_console_messages({
    types: ['warn', 'error'],
  });

  console.log(`Found ${warnings.length} console warnings/errors`);

  // 7. Test with throttling
  console.log('Testing with Slow 3G...');
  await chrome_devtools_emulate({
    networkConditions: 'Slow 3G',
    cpuThrottlingRate: 4,
  });

  await chrome_devtools_performance_start_trace({
    reload: true,
    autoStop: true,
  });

  // Reset
  await chrome_devtools_emulate({
    networkConditions: 'No emulation',
    cpuThrottlingRate: 1,
  });

  console.log('Performance analysis complete!');
}
```

---

## Scenario 4: Accessibility Audit

### Goal

Perform comprehensive accessibility testing following WCAG 2.1 guidelines.

### Step 1: Navigate and Take Verbose Snapshot

```typescript
await playwright_browser_navigate({
  type: 'url',
  url: 'https://app.example.com',
});

// Take detailed accessibility snapshot
await playwright_browser_snapshot({ verbose: true });
```

**Why**: Get complete accessibility tree with all ARIA attributes.

**What to check**:

- Proper roles
- ARIA labels
- Heading hierarchy
- Landmark regions

### Step 2: Test Keyboard Navigation

```typescript
// Tab through interactive elements
await playwright_browser_press_key({ key: 'Tab' });
await playwright_browser_press_key({ key: 'Tab' });
await playwright_browser_press_key({ key: 'Tab' });

// Activate element with Enter
await playwright_browser_press_key({ key: 'Enter' });

// Wait for action to complete
await playwright_browser_wait_for({ time: 1 });

// Continue tabbing
await playwright_browser_press_key({ key: 'Tab' });
await playwright_browser_press_key({ key: 'Tab' });

// Activate with Space (for checkboxes/buttons)
await playwright_browser_press_key({ key: ' ' });

// Tab backwards
await playwright_browser_press_key({ key: 'Shift+Tab' });

// Close dialog with Escape
await playwright_browser_press_key({ key: 'Escape' });
```

**Why**: Verify all interactive elements are keyboard accessible.

### Step 3: Check ARIA Attributes Programmatically

```typescript
const ariaAudit = await playwright_browser_evaluate({
  function: `() => {
    const results = {
      buttons: [],
      links: [],
      headings: [],
      images: [],
      forms: []
    };

    // Check buttons
    document.querySelectorAll('button').forEach(btn => {
      results.buttons.push({
        text: btn.textContent?.trim(),
        ariaLabel: btn.getAttribute('aria-label'),
        ariaExpanded: btn.getAttribute('aria-expanded'),
        ariaPressed: btn.getAttribute('aria-pressed'),
        ariaHaspopup: btn.getAttribute('aria-haspopup'),
        disabled: btn.disabled
      });
    });

    // Check links
    document.querySelectorAll('a').forEach(link => {
      results.links.push({
        text: link.textContent?.trim(),
        href: link.href,
        ariaLabel: link.getAttribute('aria-label'),
        ariaCurrent: link.getAttribute('aria-current')
      });
    });

    // Check heading hierarchy
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      document.querySelectorAll(tag).forEach(heading => {
        results.headings.push({
          level: tag,
          text: heading.textContent?.trim()
        });
      });
    });

    // Check images
    document.querySelectorAll('img').forEach(img => {
      results.images.push({
        src: img.src,
        alt: img.alt,
        hasAlt: !!img.alt,
        isDecorative: img.alt === '',
        ariaHidden: img.getAttribute('aria-hidden')
      });
    });

    // Check form inputs
    document.querySelectorAll('input, select, textarea').forEach(input => {
      const label = document.querySelector(\`label[for="\${input.id}"]\`);
      results.forms.push({
        type: input.type,
        id: input.id,
        name: input.name,
        hasLabel: !!label,
        labelText: label?.textContent?.trim(),
        ariaLabel: input.getAttribute('aria-label'),
        ariaDescribedby: input.getAttribute('aria-describedby'),
        required: input.required
      });
    });

    return results;
  }`,
});

console.log('ARIA Audit Results:', ariaAudit);
```

**Why**: Systematically check all accessibility attributes.

### Step 4: Take Screenshots for Visual Review

```typescript
// Full page screenshot
await playwright_browser_take_screenshot({
  filename: 'accessibility-review-full.png',
  fullPage: true,
});

// Focus on specific section
await playwright_browser_take_screenshot({
  element: 'Main navigation',
  ref: 'nav-main',
  filename: 'navigation-accessibility.png',
});
```

**Why**: Visual documentation of accessibility features.

### Step 5: Test with Different Viewport Sizes

```typescript
const viewports = [
  { width: 1920, height: 1080, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 375, height: 667, name: 'mobile' },
];

for (const viewport of viewports) {
  await playwright_browser_resize({
    width: viewport.width,
    height: viewport.height,
  });

  await playwright_browser_snapshot();

  await playwright_browser_take_screenshot({
    filename: `accessibility-${viewport.name}.png`,
    fullPage: true,
  });
}
```

**Why**: Ensure accessibility at all viewport sizes.

### Complete Accessibility Audit Example

```typescript
async function comprehensiveAccessibilityAudit() {
  console.log('Starting accessibility audit...');

  // 1. Navigate and get initial state
  await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com',
  });

  console.log('Taking verbose accessibility snapshot...');
  await playwright_browser_snapshot({ verbose: true });

  // 2. Test keyboard navigation
  console.log('Testing keyboard navigation...');
  const keySequence = ['Tab', 'Tab', 'Tab', 'Enter', 'Tab', 'Space', 'Escape'];

  for (const key of keySequence) {
    await playwright_browser_press_key({ key });
    await playwright_browser_wait_for({ time: 0.5 });
  }

  // 3. Check ARIA attributes
  console.log('Auditing ARIA attributes...');
  const ariaAudit = await playwright_browser_evaluate({
    function: `() => {
      // Full ARIA audit code from Step 3
      return { /* audit results */ };
    }`,
  });

  console.log('ARIA audit complete:', ariaAudit);

  // 4. Test responsive accessibility
  console.log('Testing responsive accessibility...');
  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' },
  ];

  for (const viewport of viewports) {
    await playwright_browser_resize({
      width: viewport.width,
      height: viewport.height,
    });

    await playwright_browser_snapshot();
    await playwright_browser_take_screenshot({
      filename: `a11y-${viewport.name}.png`,
    });
  }

  // 5. Check color contrast (manual review of screenshots)
  console.log('Screenshots captured for manual color contrast review');

  console.log('Accessibility audit complete!');
}
```

---

## Scenario 5: Complete Page Test Flow

### Goal

Test a complete user flow from landing to account creation.

```typescript
async function completeUserFlowTest() {
  console.log('Starting complete user flow test...');

  // 1. Land on homepage
  await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com',
  });

  await playwright_browser_snapshot();
  await playwright_browser_take_screenshot({
    filename: 'step1-homepage.png',
  });

  // 2. Click "Sign Up" button
  await playwright_browser_click({
    element: 'Sign Up button',
    ref: 'button-signup',
  });

  await playwright_browser_wait_for({
    text: 'Create Account',
  });

  await playwright_browser_snapshot();

  // 3. Fill registration form
  await playwright_browser_fill_form({
    fields: [
      { name: 'Email', type: 'textbox', ref: 'input-email', value: 'test@example.com' },
      { name: 'Password', type: 'textbox', ref: 'input-password', value: 'SecurePass123!' },
      {
        name: 'Confirm Password',
        type: 'textbox',
        ref: 'input-confirm-password',
        value: 'SecurePass123!',
      },
      { name: 'Accept Terms', type: 'checkbox', ref: 'checkbox-terms', value: 'true' },
    ],
  });

  await playwright_browser_take_screenshot({
    filename: 'step2-form-filled.png',
  });

  // 4. Submit form
  await playwright_browser_click({
    element: 'Create Account button',
    ref: 'button-create-account',
  });

  // 5. Wait for success
  await playwright_browser_wait_for({
    text: 'Welcome!',
  });

  await playwright_browser_snapshot();
  await playwright_browser_take_screenshot({
    filename: 'step3-success.png',
  });

  // 6. Verify dashboard loaded
  await playwright_browser_wait_for({
    text: 'Dashboard',
  });

  // 7. Check for console errors
  const errors = await chrome_devtools_list_console_messages({
    types: ['error'],
  });

  console.log(`User flow complete. Console errors: ${errors.length}`);
}
```

---

## Best Practices Summary

### Always Use MCP Tools

- ✅ Use `playwright_browser_*` for all interactions
- ✅ Use `chrome-devtools_*` for debugging and performance
- ❌ Never use bash commands for browser operations

### Take Snapshots First

- Use `playwright_browser_snapshot()` before interactions to get element references
- Use verbose mode for detailed accessibility inspection

### Wait Properly

- Use `playwright_browser_wait_for({ text: "..." })` instead of arbitrary timeouts
- Wait for specific content, not fixed time periods

### Combine Tools Effectively

- Navigation → Snapshot → Interaction → Wait → Screenshot
- This pattern ensures reliable, well-documented tests

### Document Everything

- Take screenshots at key points
- Log test progress with console messages
- Save snapshots for debugging

## Related Resources

- **Playwright MCP Tools Reference**: `.opencode/knowledge-base/playwright-mcp-tools.md`
- **Playwright Testing Best Practices**: `.opencode/checklist/playwright-testing-best-practices.md`
- **Frontend Accessibility Best Practices**: `.opencode/checklist/frontend-accessibility-best-practices.md`
- **Frontend Testing Agent**: `.opencode/agent/frontend-testing.md`

## Summary

These scenarios provide practical templates for common testing situations. Key takeaways:

1. **Always start with `playwright_browser_snapshot`** to understand page structure
2. **Use `playwright_browser_wait_for`** for reliable waiting
3. **Leverage `chrome-devtools_*` tools** for performance and debugging
4. **Take screenshots** at key points for documentation and visual regression
5. **Test accessibility** with keyboard navigation and ARIA audits

Adapt these patterns to your specific testing needs while maintaining the MCP-first approach.
