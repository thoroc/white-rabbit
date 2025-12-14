---
title: Playwright MCP Tools Reference
description:
    Complete reference guide for Playwright and Chrome DevTools MCP tools available in OpenCode for browser automation and
    testing
type: knowledge-base
category: Development
tags:
    - playwright
    - mcp
    - testing
    - browser-automation
    - chrome-devtools
version: 1.0.0
last_updated: 2025-11-19
---

# Playwright MCP Tools Reference

This guide provides comprehensive documentation for all Playwright and Chrome DevTools MCP (Model Context Protocol)
tools available in OpenCode. These tools enable browser automation, testing, debugging, and performance analysis.

## Overview

OpenCode provides two primary MCP tool sets for browser operations:

- **Playwright MCP** (`playwright_*`): Full Playwright browser control for automated testing
- **Chrome DevTools MCP** (`chrome-devtools_*`): Advanced debugging, inspection, and performance profiling

**CRITICAL**: Always use these MCP tools for browser operations. Never rely solely on bash commands for browser
automation.

## Playwright MCP Tools

### Navigation Tools

#### `playwright_browser_navigate`

Navigate to URLs, go back/forward, or reload pages.

**Usage:**

```typescript
// Navigate to URL
await playwright_browser_navigate({
    type: 'url',
    url: 'https://example.com',
});

// Go back
await playwright_browser_navigate({ type: 'back' });

// Go forward
await playwright_browser_navigate({ type: 'forward' });

// Reload page
await playwright_browser_navigate({ type: 'reload' });
```

**Parameters:**

- `type`: "url" | "back" | "forward" | "reload"
- `url`: Target URL (required only for type="url")
- `timeout`: Optional timeout in milliseconds
- `ignoreCache`: Boolean to ignore cache on reload

#### `playwright_browser_navigate_back`

Navigate to the previous page in history.

**Usage:**

```typescript
await playwright_browser_navigate_back();
```

#### `playwright_browser_tabs`

List, create, close, or select browser tabs.

**Usage:**

```typescript
// List all tabs
await playwright_browser_tabs({ action: 'list' });

// Create new tab
await playwright_browser_tabs({ action: 'new' });

// Close tab by index
await playwright_browser_tabs({ action: 'close', index: 1 });

// Select tab by index
await playwright_browser_tabs({ action: 'select', index: 0 });
```

**Parameters:**

- `action`: "list" | "new" | "close" | "select"
- `index`: Tab index (for close/select actions)

### Interaction Tools

#### `playwright_browser_click`

Perform click operations on page elements.

**Usage:**

```typescript
await playwright_browser_click({
    element: 'Submit button',
    ref: 'button-submit',
});

// Double click
await playwright_browser_click({
    element: 'File item',
    ref: 'file-item-1',
    doubleClick: true,
});

// Right click
await playwright_browser_click({
    element: 'Context menu trigger',
    ref: 'menu-trigger',
    button: 'right',
});
```

**Parameters:**

- `element`: Human-readable element description
- `ref`: Exact element reference from page snapshot
- `button`: "left" | "right" | "middle" (default: "left")
- `doubleClick`: Boolean for double-click
- `modifiers`: Array of modifier keys ["Alt", "Control", "Meta", "Shift"]

#### `playwright_browser_type`

Type text into editable elements.

**Usage:**

```typescript
await playwright_browser_type({
    element: 'Email input',
    ref: 'input-email',
    text: 'user@example.com',
});

// Type slowly (one character at a time)
await playwright_browser_type({
    element: 'Search box',
    ref: 'input-search',
    text: 'query',
    slowly: true,
});

// Type and submit
await playwright_browser_type({
    element: 'Search box',
    ref: 'input-search',
    text: 'query',
    submit: true,
});
```

**Parameters:**

- `element`: Human-readable element description
- `ref`: Exact element reference
- `text`: Text to type
- `slowly`: Type one character at a time
- `submit`: Press Enter after typing

#### `playwright_browser_hover`

Hover over elements on the page.

**Usage:**

```typescript
await playwright_browser_hover({
    element: 'Dropdown menu',
    ref: 'nav-dropdown',
});
```

**Parameters:**

- `element`: Human-readable element description
- `ref`: Exact element reference

#### `playwright_browser_drag`

Perform drag and drop between two elements.

**Usage:**

```typescript
await playwright_browser_drag({
    startElement: 'Draggable item',
    startRef: 'item-1',
    endElement: 'Drop zone',
    endRef: 'drop-zone',
});
```

**Parameters:**

- `startElement`: Human-readable source element description
- `startRef`: Source element reference
- `endElement`: Human-readable target element description
- `endRef`: Target element reference

#### `playwright_browser_press_key`

Press keyboard keys.

**Usage:**

```typescript
// Single key
await playwright_browser_press_key({ key: 'Enter' });
await playwright_browser_press_key({ key: 'Tab' });
await playwright_browser_press_key({ key: 'Escape' });

// Key with character
await playwright_browser_press_key({ key: 'a' });
```

**Parameters:**

- `key`: Key name (e.g., "ArrowLeft", "Enter") or character (e.g., "a")

### Form Tools

#### `playwright_browser_fill_form`

Fill multiple form fields at once.

**Usage:**

```typescript
await playwright_browser_fill_form({
    fields: [
        {
            name: 'Email',
            type: 'textbox',
            ref: 'input-email',
            value: 'user@example.com',
        },
        {
            name: 'Subscribe',
            type: 'checkbox',
            ref: 'checkbox-subscribe',
            value: 'true',
        },
        {
            name: 'Country',
            type: 'combobox',
            ref: 'select-country',
            value: 'United States',
        },
    ],
});
```

**Parameters:**

- `fields`: Array of field objects
    - `name`: Human-readable field name
    - `type`: "textbox" | "checkbox" | "radio" | "combobox" | "slider"
    - `ref`: Exact field reference
    - `value`: Value to fill (string, "true"/"false" for checkboxes)

#### `playwright_browser_select_option`

Select options in dropdown menus.

**Usage:**

```typescript
await playwright_browser_select_option({
    element: 'Country selector',
    ref: 'select-country',
    values: ['United States'],
});

// Multiple selection
await playwright_browser_select_option({
    element: 'Tags selector',
    ref: 'select-tags',
    values: ['tag1', 'tag2', 'tag3'],
});
```

**Parameters:**

- `element`: Human-readable element description
- `ref`: Exact element reference
- `values`: Array of values to select

#### `playwright_browser_file_upload`

Upload files through file input elements.

**Usage:**

```typescript
await playwright_browser_file_upload({
    element: 'File input',
    ref: 'input-file',
    paths: ['/path/to/file.pdf'],
});

// Cancel file chooser
await playwright_browser_file_upload({
    paths: [],
});
```

**Parameters:**

- `paths`: Array of absolute file paths (empty array cancels)

### Inspection Tools

#### `playwright_browser_snapshot`

Capture accessibility snapshot of the page (PREFERRED for accessibility testing).

**Usage:**

```typescript
// Basic snapshot
await playwright_browser_snapshot();

// Verbose snapshot (full a11y tree)
await playwright_browser_snapshot({ verbose: true });

// Save to file
await playwright_browser_snapshot({
    filePath: './snapshots/homepage.txt',
});
```

**Parameters:**

- `verbose`: Include all a11y tree information
- `filePath`: Path to save snapshot file

**When to use:** Accessibility testing, element inspection, understanding page structure

#### `playwright_browser_take_screenshot`

Take visual screenshots of the page or elements.

**Usage:**

```typescript
// Full page screenshot
await playwright_browser_take_screenshot({
    fullPage: true,
    filename: 'homepage.png',
});

// Viewport screenshot
await playwright_browser_take_screenshot({
    filename: 'viewport.png',
});

// Element screenshot
await playwright_browser_take_screenshot({
    element: 'Product card',
    ref: 'product-123',
    filename: 'product.png',
});

// JPEG with quality
await playwright_browser_take_screenshot({
    filename: 'compressed.jpg',
    type: 'jpeg',
    quality: 80,
});
```

**Parameters:**

- `filename`: Output filename (defaults to auto-generated)
- `type`: "png" | "jpeg" (default: "png")
- `fullPage`: Capture full scrollable page
- `element`: Human-readable element description (for element screenshots)
- `ref`: Element reference (for element screenshots)
- `quality`: JPEG/WebP quality 0-100

**When to use:** Visual regression testing, documentation, bug reports

### Evaluation Tools

#### `playwright_browser_evaluate`

Execute JavaScript in page context.

**Usage:**

```typescript
// Simple evaluation
await playwright_browser_evaluate({
    function: `() => {
    return document.title;
  }`,
});

// With element parameter
await playwright_browser_evaluate({
    element: 'Product title',
    ref: 'product-title',
    function: `(element) => {
    return element.innerText;
  }`,
});

// Complex operations
await playwright_browser_evaluate({
    function: `() => {
    const images = document.querySelectorAll('img');
    return Array.from(images).map(img => ({
      src: img.src,
      alt: img.alt,
      hasAlt: !!img.alt
    }));
  }`,
});
```

**Parameters:**

- `function`: JavaScript function as string
- `element`: Optional element description (adds element parameter to function)
- `ref`: Element reference (if element is provided)

#### `playwright_browser_run_code`

Execute Playwright code snippets directly.

**Usage:**

```typescript
await playwright_browser_run_code({
    code: `
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForURL(/success/);
  `,
});
```

**Parameters:**

- `code`: Playwright code with access to `page` object

### Waiting Tools

#### `playwright_browser_wait_for`

Wait for text to appear/disappear or time to pass.

**Usage:**

```typescript
// Wait for text to appear
await playwright_browser_wait_for({
    text: 'Loading complete',
});

// Wait for text to disappear
await playwright_browser_wait_for({
    textGone: 'Loading...',
});

// Wait for specific time (seconds)
await playwright_browser_wait_for({
    time: 2,
});
```

**Parameters:**

- `text`: Text to wait for (appears)
- `textGone`: Text to wait for (disappears)
- `time`: Time to wait in seconds

### Debug Tools

#### `playwright_browser_console_messages`

Get console messages from the page.

**Usage:**

```typescript
// All console messages
await playwright_browser_console_messages();

// Only errors
await playwright_browser_console_messages({
    onlyErrors: true,
});
```

**Parameters:**

- `onlyErrors`: Return only error messages

#### `playwright_browser_network_requests`

Get network requests since page load.

**Usage:**

```typescript
await playwright_browser_network_requests();
```

**Returns:** List of all network requests with details

### Dialog Handling

#### `playwright_browser_handle_dialog`

Handle browser dialogs (alert, confirm, prompt).

**Usage:**

```typescript
// Accept dialog
await playwright_browser_handle_dialog({
    accept: true,
});

// Dismiss dialog
await playwright_browser_handle_dialog({
    accept: false,
});

// Accept prompt with text
await playwright_browser_handle_dialog({
    accept: true,
    promptText: 'User input',
});
```

**Parameters:**

- `accept`: Boolean to accept/dismiss
- `promptText`: Text for prompt dialogs

### Browser Control

#### `playwright_browser_resize`

Resize browser window.

**Usage:**

```typescript
// Desktop viewport
await playwright_browser_resize({
    width: 1920,
    height: 1080,
});

// Mobile viewport
await playwright_browser_resize({
    width: 375,
    height: 667,
});
```

**Parameters:**

- `width`: Window width in pixels
- `height`: Window height in pixels

#### `playwright_browser_close`

Close the browser page.

**Usage:**

```typescript
await playwright_browser_close();
```

## Chrome DevTools MCP Tools

### Performance Tools

#### `chrome_devtools_performance_start_trace`

Start performance trace recording.

**Usage:**

```typescript
// Start trace with reload
await chrome_devtools_performance_start_trace({
    reload: true,
    autoStop: false,
});

// Start trace without reload (for interactions)
await chrome_devtools_performance_start_trace({
    reload: false,
    autoStop: true,
});
```

**Parameters:**

- `reload`: Reload page after starting trace
- `autoStop`: Automatically stop trace after loading

#### `chrome_devtools_performance_stop_trace`

Stop active performance trace recording.

**Usage:**

```typescript
await chrome_devtools_performance_stop_trace();
```

**Returns:** Performance trace results with Core Web Vitals

#### `chrome_devtools_performance_analyze_insight`

Get detailed performance insights.

**Usage:**

```typescript
await chrome_devtools_performance_analyze_insight({
    insightSetId: 'trace-123',
    insightName: 'LCPBreakdown',
});
```

**Parameters:**

- `insightSetId`: ID from trace results
- `insightName`: Insight type (e.g., "LCPBreakdown", "DocumentLatency")

### Network Tools

#### `chrome_devtools_list_network_requests`

List network requests with filtering.

**Usage:**

```typescript
// All requests
await chrome_devtools_list_network_requests();

// Filter by resource type
await chrome_devtools_list_network_requests({
    resourceTypes: ['xhr', 'fetch', 'script'],
});

// Pagination
await chrome_devtools_list_network_requests({
    pageSize: 50,
    pageIdx: 0,
});

// Include preserved requests across navigations
await chrome_devtools_list_network_requests({
    includePreservedRequests: true,
});
```

**Parameters:**

- `resourceTypes`: Array of types to filter
- `pageSize`: Max requests to return
- `pageIdx`: Page number (0-based)
- `includePreservedRequests`: Include requests from previous navigations

#### `chrome_devtools_get_network_request`

Get details of specific network request.

**Usage:**

```typescript
// Get currently selected request
await chrome_devtools_get_network_request();

// Get specific request by ID
await chrome_devtools_get_network_request({
    reqid: 123,
});
```

**Parameters:**

- `reqid`: Optional request ID

### Console Tools

#### `chrome_devtools_list_console_messages`

List console messages with filtering.

**Usage:**

```typescript
// All messages
await chrome_devtools_list_console_messages();

// Filter by type
await chrome_devtools_list_console_messages({
    types: ['error', 'warn'],
});

// Pagination
await chrome_devtools_list_console_messages({
    pageSize: 100,
    pageIdx: 0,
});

// Include preserved messages
await chrome_devtools_list_console_messages({
    includePreservedMessages: true,
});
```

**Parameters:**

- `types`: Array of message types to filter
- `pageSize`: Max messages to return
- `pageIdx`: Page number (0-based)
- `includePreservedMessages`: Include messages from previous navigations

**Available types:** "log", "debug", "info", "error", "warn", "dir", "dirxml", "table", "trace", "clear", "assert"

#### `chrome_devtools_get_console_message`

Get specific console message details.

**Usage:**

```typescript
await chrome_devtools_get_console_message({
    msgid: 456,
});
```

**Parameters:**

- `msgid`: Message ID from list_console_messages

### Page Management

#### `chrome_devtools_list_pages`

List all open browser pages.

**Usage:**

```typescript
await chrome_devtools_list_pages();
```

#### `chrome_devtools_select_page`

Select a page as context for future operations.

**Usage:**

```typescript
await chrome_devtools_select_page({
    pageIdx: 1,
});
```

**Parameters:**

- `pageIdx`: Page index from list_pages

#### `chrome_devtools_new_page`

Create new browser page.

**Usage:**

```typescript
await chrome_devtools_new_page({
    url: 'https://example.com',
    timeout: 30000,
});
```

**Parameters:**

- `url`: URL to load
- `timeout`: Max wait time in milliseconds

#### `chrome_devtools_close_page`

Close a page by index.

**Usage:**

```typescript
await chrome_devtools_close_page({
    pageIdx: 1,
});
```

**Parameters:**

- `pageIdx`: Page index to close

#### `chrome_devtools_navigate_page`

Navigate current page.

**Usage:**

```typescript
// Navigate to URL
await chrome_devtools_navigate_page({
    type: 'url',
    url: 'https://example.com',
});

// Go back
await chrome_devtools_navigate_page({ type: 'back' });

// Reload with cache clear
await chrome_devtools_navigate_page({
    type: 'reload',
    ignoreCache: true,
});
```

**Parameters:**

- `type`: "url" | "back" | "forward" | "reload"
- `url`: Target URL (for type="url")
- `ignoreCache`: Clear cache on reload
- `timeout`: Max wait time

### Inspection Tools

#### `chrome_devtools_take_snapshot`

Take accessibility snapshot.

**Usage:**

```typescript
// Basic snapshot
await chrome_devtools_take_snapshot();

// Verbose snapshot
await chrome_devtools_take_snapshot({
    verbose: true,
});

// Save to file
await chrome_devtools_take_snapshot({
    filePath: './snapshot.txt',
});
```

**Parameters:**

- `verbose`: Include full a11y tree
- `filePath`: Save location

#### `chrome_devtools_take_screenshot`

Take page or element screenshot.

**Usage:**

```typescript
// Full page
await chrome_devtools_take_screenshot({
    fullPage: true,
    filePath: './screenshot.png',
});

// Element screenshot
await chrome_devtools_take_screenshot({
    uid: 'element-123',
    element: 'Product card',
});

// JPEG with quality
await chrome_devtools_take_screenshot({
    format: 'jpeg',
    quality: 85,
});
```

**Parameters:**

- `filePath`: Save location
- `format`: "png" | "jpeg" | "webp"
- `quality`: Compression quality 0-100
- `fullPage`: Capture scrollable page
- `uid`: Element UID from snapshot
- `element`: Element description

### Interaction Tools

#### `chrome_devtools_click`

Click on element.

**Usage:**

```typescript
await chrome_devtools_click({
    uid: 'button-123',
});

// Double click
await chrome_devtools_click({
    uid: 'file-item',
    dblClick: true,
});
```

**Parameters:**

- `uid`: Element UID from snapshot
- `dblClick`: Boolean for double-click

#### `chrome_devtools_fill`

Fill input or select option.

**Usage:**

```typescript
await chrome_devtools_fill({
    uid: 'input-email',
    value: 'user@example.com',
});
```

**Parameters:**

- `uid`: Element UID
- `value`: Value to fill

#### `chrome_devtools_fill_form`

Fill multiple form elements.

**Usage:**

```typescript
await chrome_devtools_fill_form({
    elements: [
        { uid: 'input-name', value: 'John Doe' },
        { uid: 'input-email', value: 'john@example.com' },
    ],
});
```

**Parameters:**

- `elements`: Array of uid/value pairs

### Other Tools

#### `chrome_devtools_emulate`

Emulate network and CPU conditions.

**Usage:**

```typescript
await chrome_devtools_emulate({
    networkConditions: 'Slow 3G',
    cpuThrottlingRate: 4,
});

// Disable emulation
await chrome_devtools_emulate({
    networkConditions: 'No emulation',
    cpuThrottlingRate: 1,
});
```

**Parameters:**

- `networkConditions`: "No emulation" | "Offline" | "Slow 3G" | "Fast 3G" | "Slow 4G" | "Fast 4G"
- `cpuThrottlingRate`: CPU slowdown factor (1 = no throttling, max 20)

## Decision Guide: When to Use Which Tool

### For Accessibility Testing

**Use:** `playwright_browser_snapshot` (preferred) or `chrome_devtools_take_snapshot`

- Provides full accessibility tree
- Shows ARIA attributes
- Reveals semantic structure

### For Visual Testing

**Use:** `playwright_browser_take_screenshot` or `chrome_devtools_take_screenshot`

- Visual regression testing
- Screenshot comparison
- Documentation and bug reports

### For Performance Analysis

**Use:** `chrome_devtools_performance_*` tools

- Core Web Vitals measurement
- Load time analysis
- Performance bottleneck identification

### For Debugging

**Use:** `chrome_devtools_list_console_messages` and `chrome_devtools_list_network_requests`

- JavaScript error detection
- Network request inspection
- API call analysis

### For User Interactions

**Use:** `playwright_browser_*` interaction tools

- Click, type, hover operations
- Form filling
- Keyboard navigation
- Drag and drop

### For Page Navigation

**Use:** `playwright_browser_navigate` or `chrome_devtools_navigate_page`

- URL navigation
- History navigation (back/forward)
- Page reloading

## Best Practices

### 1. Always Use MCPs for Browser Operations

❌ **Don't:**

```bash
npx playwright test
```

✅ **Do:**

```typescript
await playwright_browser_run_code({
    code: `await page.goto('https://example.com')`,
});
```

### 2. Prefer Snapshots for Inspection

Use `playwright_browser_snapshot` instead of screenshots when you need to understand page structure or accessibility.

### 3. Use Proper Waiting

Use `playwright_browser_wait_for` instead of arbitrary sleeps:

```typescript
// Wait for element
await playwright_browser_wait_for({ text: 'Load complete' });
```

### 4. Leverage MCP Debug Tools

Use console and network tools to understand issues:

```typescript
// Check for errors
await chrome_devtools_list_console_messages({ types: ['error'] });

// Analyze failed requests
await chrome_devtools_list_network_requests({
    resourceTypes: ['xhr', 'fetch'],
});
```

### 5. Combine Tools Effectively

```typescript
// 1. Navigate
await playwright_browser_navigate({ type: 'url', url: 'https://example.com' });

// 2. Take snapshot for structure
await playwright_browser_snapshot();

// 3. Interact
await playwright_browser_click({ element: 'Login', ref: 'btn-login' });

// 4. Wait for result
await playwright_browser_wait_for({ text: 'Welcome' });

// 5. Take screenshot for verification
await playwright_browser_take_screenshot({ filename: 'logged-in.png' });
```

## Common Patterns

### Pattern 1: Complete Page Test Flow

```typescript
// Navigate to page
await playwright_browser_navigate({
    type: 'url',
    url: 'https://app.example.com',
});

// Take initial snapshot
await playwright_browser_snapshot();

// Fill login form
await playwright_browser_fill_form({
    fields: [
        {
            name: 'Email',
            type: 'textbox',
            ref: 'input-email',
            value: 'user@example.com',
        },
        {
            name: 'Password',
            type: 'textbox',
            ref: 'input-password',
            value: 'password123',
        },
    ],
});

// Submit
await playwright_browser_click({ element: 'Login button', ref: 'btn-login' });

// Wait for navigation
await playwright_browser_wait_for({ text: 'Dashboard' });

// Verify success
await playwright_browser_take_screenshot({ filename: 'dashboard.png' });
```

### Pattern 2: Performance Analysis

```typescript
// Start performance trace
await chrome_devtools_performance_start_trace({
    reload: true,
    autoStop: false,
});

// Perform user actions
await playwright_browser_click({
    element: 'Heavy operation',
    ref: 'btn-process',
});
await playwright_browser_wait_for({ text: 'Complete' });

// Stop trace
await chrome_devtools_performance_stop_trace();

// Check console for errors
await chrome_devtools_list_console_messages({ types: ['error', 'warn'] });

// Analyze network
await chrome_devtools_list_network_requests({
    resourceTypes: ['xhr', 'fetch'],
});
```

### Pattern 3: Accessibility Audit

```typescript
// Navigate to page
await playwright_browser_navigate({ type: 'url', url: 'https://example.com' });

// Take verbose accessibility snapshot
await playwright_browser_snapshot({ verbose: true });

// Test keyboard navigation
await playwright_browser_press_key({ key: 'Tab' });
await playwright_browser_press_key({ key: 'Tab' });
await playwright_browser_press_key({ key: 'Enter' });

// Verify ARIA attributes via evaluation
await playwright_browser_evaluate({
    function: `() => {
    const buttons = document.querySelectorAll('button');
    return Array.from(buttons).map(btn => ({
      text: btn.textContent,
      ariaLabel: btn.getAttribute('aria-label'),
      role: btn.getAttribute('role')
    }));
  }`,
});
```

## Troubleshooting

### Issue: Element Not Found

**Solution:** Take a snapshot first to get current element references:

```typescript
await playwright_browser_snapshot();
// Review output for correct element references
```

### Issue: Flaky Tests

**Solution:** Use proper waiting instead of timeouts:

```typescript
// Instead of arbitrary wait
await playwright_browser_wait_for({ time: 2 });

// Use text-based waiting
await playwright_browser_wait_for({ text: 'Expected content' });
```

### Issue: Performance Tests Not Working

**Solution:** Ensure you start trace before page load:

```typescript
await chrome_devtools_performance_start_trace({ reload: true, autoStop: true });
```

### Issue: Screenshots Don't Match Expected

**Solution:** Use consistent viewport sizes:

```typescript
await playwright_browser_resize({ width: 1920, height: 1080 });
await playwright_browser_take_screenshot({ fullPage: false });
```

## Related Resources

- Frontend Testing Agent: `.opencode/agent/frontend-testing.md`
- Playwright Testing Best Practices: `.opencode/checklist/playwright-testing-best-practices.md`
- Frontend Testing Scenarios: `.opencode/knowledge-base/frontend-testing-scenarios.md`
- Playwright Test Templates: `.opencode/template/playwright-*-tmpl.yaml`

## Summary

MCP tools provide a complete, reliable interface for browser automation in OpenCode. Key takeaways:

1. **Always use MCP tools** for browser operations
2. **Prefer snapshots** for structure/accessibility inspection
3. **Use screenshots** for visual verification
4. **Leverage DevTools** for performance and debugging
5. **Combine tools** for comprehensive testing workflows

For specific testing scenarios and patterns, see the Frontend Testing Scenarios knowledge base.
