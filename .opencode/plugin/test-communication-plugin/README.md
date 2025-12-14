# Test Communication Plugin

A demonstration plugin showing the three OpenCode TUI communication patterns extracted from the DCP plugin analysis.

## Purpose

This plugin demonstrates how to properly communicate from OpenCode plugins without using `console.log()` or polluting the TUI/AI context.

## Communication Patterns Demonstrated

### 1. File-Based Debug Logging

- Persistent logs in `~/.config/opencode/logs/test-communication-plugin/`
- Daily rotation with separate files per context
- Configuration-controlled (`debug: true/false`)
- For developer diagnostics only

### 2. TUI Toast Notifications

- Ephemeral user alerts via `client.tui.showToast()`
- Used for critical errors and important status updates
- Defensive error handling (try-catch)
- Configuration-controlled (`notifications: true/false`)

### 3. Session Prompts with `ignored: true`

- User-visible, AI-invisible context messages via `client.session.prompt()`
- Used for status updates and progress indicators
- Defensive error handling (try-catch)
- Configuration-controlled (`verbosity: off/minimal/detailed`)

## Usage

```typescript
import { createPlugin } from './index';

const plugin = createPlugin({
    debug: true, // Enable file logging
    notifications: true, // Enable TUI toasts
    verbosity: 'detailed', // Show all session messages
});

// Initialize plugin
await plugin.initialize(client);

// Run demonstration
await plugin.demonstratePatterns(client);
```

## Configuration

```typescript
interface PluginConfig {
    debug: boolean; // Enable file-based logging
    notifications: boolean; // Enable TUI toasts
    verbosity: 'off' | 'minimal' | 'detailed'; // Session prompt level
}
```

**Defaults**:

- `debug: false` (disabled in production)
- `notifications: true` (critical errors only)
- `verbosity: 'minimal'` (high-level status only)

## Files

- `index.ts` - Main plugin implementation
- `logger.ts` - File-based logging utility
- `package.json` - Plugin dependencies
- `README.md` - This file

## Key Features

- **Defensive error handling** - All TUI/session calls wrapped in try-catch
- **Configuration-driven** - Users control verbosity and notification levels
- **Separation of concerns** - Developers get logs, users get notifications
- **Production-ready patterns** - Based on DCP plugin (v0.4.17)

## References

- Knowledge base: `.opencode/knowledge-base/common/plugin-communication-patterns.md`
- Research: `.context/research/opencode-tui-communication-patterns-2025-12-14.md`
- Feature spec: `.context/features/investigate-opencode-dcp-tui-logging-pattern.md`
- DCP source: [opencode-dynamic-context-pruning](https://github.com/Opencode-DCP/opencode-dynamic-context-pruning)

## Notes

- This is a demonstration plugin showing patterns, not a production-ready implementation
- The `OpenCodeClient` interface is simplified for demonstration purposes
- Actual OpenCode plugin types may differ - consult official SDK documentation
- All patterns use defensive error handling to prevent plugin crashes
