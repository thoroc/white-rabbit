# Plugin Communication Patterns

## Purpose

Provide guidance on how OpenCode plugins should communicate with users, developers, and the AI system without relying on `console.log()` or other terminal-based output that pollutes the TUI.

## Overview

OpenCode plugins operate in a constrained environment where traditional logging approaches are inadequate. This knowledge base documents three proven communication patterns extracted from the OpenCode Dynamic Context Pruning (DCP) plugin that provide proper separation of concerns for different audiences.

## The Three Communication Patterns

### 1. File-Based Debug Logging

**Purpose**: Persistent logging for developer diagnostics and troubleshooting.

**When to use**:

- Developer debugging and diagnostics
- Detailed operation traces
- Performance metrics and profiling
- Error stack traces and context

**Implementation**:

```typescript
import { createLogger } from './logger';

const logger = createLogger({
    logDir: '~/.config/opencode/logs/my-plugin/',
    enabled: config.debug,
    contexts: ['daily', 'operations', 'errors'],
});

// Usage
logger.debug('operations', 'Processing user request', {
    requestId: '123',
    operation: 'analyze',
});
```

**Key characteristics**:

- Configuration-controlled (enabled only when `debug: true`)
- Daily log rotation with separate files per day
- Specialized contexts for different log types
- Zero user impact - never appears in session or terminal
- Structured output (JSON-serializable entries with timestamps)

**Best practices**:

- Use for developer-facing information only
- Never log sensitive user data
- Implement log rotation to manage disk space
- Provide configuration option to enable/disable

### 2. TUI Toast Notifications

**Purpose**: Ephemeral user alerts for important, time-sensitive information.

**When to use**:

- Critical errors that prevent plugin operation
- Important warnings users must acknowledge
- Status updates for long-running operations
- Success confirmations for major actions

**Implementation**:

```typescript
try {
    await client.tui.showToast({
        type: 'error',
        message: 'Failed to initialize plugin',
        duration: 5000,
    });
} catch (error) {
    // Defensive: silent failure if TUI unavailable
    logger.debug('errors', 'Failed to show toast', { error });
}
```

**Key characteristics**:

- Appear briefly in the TUI and auto-dismiss
- Non-blocking user experience
- Available in multiple severity levels (info, warning, error, success)
- Should be wrapped in defensive try-catch

**Best practices**:

- Use sparingly - only for important notifications
- Keep messages concise and actionable
- Always wrap in try-catch for defensive error handling
- Provide user control through configuration

### 3. Session Prompt Messages with `ignored: true`

**Purpose**: In-context information visible to users but not processed by AI models.

**When to use**:

- Contextual information about plugin state
- Status updates that don't require AI action
- Progress indicators during operations
- Metadata about plugin decisions

**Implementation**:

```typescript
try {
    await client.session.prompt({
        role: 'user',
        content: '🔍 Analyzing context size: 15,000 tokens',
        ignored: true,
    });
} catch (error) {
    // Defensive: silent failure if session unavailable
    logger.debug('errors', 'Failed to send session message', { error });
}
```

**Key characteristics**:

- The `ignored: true` flag prevents AI from processing the message
- Messages appear in session history for user visibility
- Non-intrusive - doesn't interrupt conversation flow
- Should be wrapped in defensive try-catch

**Best practices**:

- Use for context-rich status updates
- Include relevant metadata (operation names, counts, etc.)
- Always set `ignored: true` to prevent AI confusion
- Wrap in try-catch for defensive error handling
- Respect user configuration for verbosity levels

## Decision Matrix

Use this flowchart to choose the appropriate communication method:

```
┌─────────────────────────────┐
│ Who is the audience?        │
└──────────┬──────────────────┘
           │
           ├─ Developer ──────────► File-based logging
           │                        (~/.config/opencode/logs/)
           │
           ├─ User (critical) ────► TUI toast notification
           │                        (client.tui.showToast)
           │
           └─ User (contextual) ──► Session prompt with ignored: true
                                    (client.session.prompt)
```

### Decision Criteria

| Criteria           | File Logging        | TUI Toast               | Session Prompt                    |
| ------------------ | ------------------- | ----------------------- | --------------------------------- |
| **Audience**       | Developers          | Users                   | Users                             |
| **Importance**     | Debug/trace         | Critical                | Informational                     |
| **Persistence**    | Permanent           | Ephemeral (5s)          | Session-scoped                    |
| **AI Visibility**  | None                | None                    | None (with `ignored: true`)       |
| **User Control**   | `debug: true/false` | `notifications: on/off` | `verbosity: off/minimal/detailed` |
| **Error Handling** | Fails silently      | Defensive try-catch     | Defensive try-catch               |

## Configuration-Driven Verbosity

Provide users with control over notification levels:

```typescript
interface PluginConfig {
    debug: boolean; // Enable file-based logging
    notifications: boolean; // Enable TUI toasts
    verbosity: 'off' | 'minimal' | 'detailed'; // Session prompt level
}

// Example usage
if (config.verbosity !== 'off') {
    await client.session.prompt({
        role: 'user',
        content: '🔍 Plugin operation in progress',
        ignored: true,
    });
}
```

**Recommended defaults**:

- `debug: false` (only for development)
- `notifications: true` (critical errors only)
- `verbosity: 'minimal'` (high-level status only)

## Error Handling Pattern

**Critical rule**: All TUI and session calls must be wrapped in defensive try-catch to prevent plugin crashes:

```typescript
async function notify(message: string): Promise<void> {
    try {
        await client.tui.showToast({
            type: 'info',
            message,
            duration: 3000,
        });
    } catch (error) {
        // Silent failure - log only for debugging
        logger.debug('errors', 'Toast notification failed', {
            message,
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
```

**Why defensive error handling?**

- TUI may not be available in all OpenCode contexts
- Network issues can interrupt session calls
- Plugin should never crash due to communication failures
- Users should experience graceful degradation

## Complete Example

```typescript
import { createLogger } from './logger';
import type { OpenCodeClient } from '@opencode-ai/plugin';

// Initialize logger
const logger = createLogger({
    logDir: '~/.config/opencode/logs/my-plugin/',
    enabled: config.debug,
});

// Helper for session messages
async function sessionNotify(
    client: OpenCodeClient,
    message: string,
    level: 'off' | 'minimal' | 'detailed'
): Promise<void> {
    if (
        config.verbosity === 'off' ||
        (config.verbosity === 'minimal' && level === 'detailed')
    ) {
        return;
    }

    try {
        await client.session.prompt({
            role: 'user',
            content: message,
            ignored: true,
        });
    } catch (error) {
        logger.debug('errors', 'Session notification failed', {
            message,
            error,
        });
    }
}

// Plugin operation with all three patterns
export async function analyzeCode(client: OpenCodeClient): Promise<void> {
    // 1. Developer logging
    logger.debug('operations', 'Starting code analysis', {
        timestamp: Date.now(),
    });

    // 2. User context (session prompt)
    await sessionNotify(client, '🔍 Analyzing codebase...', 'minimal');

    try {
        // Perform analysis
        const result = await performAnalysis();

        // Success - detailed session prompt
        await sessionNotify(
            client,
            `✅ Analysis complete: ${result.fileCount} files processed`,
            'detailed'
        );

        logger.debug('operations', 'Analysis complete', { result });
    } catch (error) {
        // 3. Critical error (TUI toast)
        try {
            await client.tui.showToast({
                type: 'error',
                message: 'Code analysis failed',
                duration: 5000,
            });
        } catch (toastError) {
            logger.debug('errors', 'Toast failed', { toastError });
        }

        // Developer logging
        logger.debug('errors', 'Analysis failed', {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });

        throw error;
    }
}
```

## References

- Research document: `.context/research/opencode-tui-communication-patterns-2025-12-14.md`
- Feature specification: `.context/features/investigate-opencode-dcp-tui-logging-pattern.md`
- DCP plugin source: [opencode-dynamic-context-pruning](https://github.com/Opencode-DCP/opencode-dynamic-context-pruning) (v0.4.17)
- OpenCode SDK: `.opencode/knowledge-base/opencode/sdk-documentation.md`
- OpenCode Plugin Architecture: `.opencode/knowledge-base/opencode/plugin-architecture.md`

## Key Takeaways

1. **Never use `console.log()`** - it pollutes TUI and AI context
2. **Use file logging for developers** - persistent, structured, configuration-controlled
3. **Use TUI toasts for critical user alerts** - ephemeral, high-importance only
4. **Use session prompts with `ignored: true` for context** - visible to users, invisible to AI
5. **Always wrap TUI/session calls in try-catch** - defensive error handling prevents crashes
6. **Provide user control through configuration** - respect user preferences for verbosity
7. **Separate concerns by audience** - developers get logs, users get notifications

## Notes

- This pattern is based on production code from the DCP plugin (v0.4.17)
- All TUI and session API calls require defensive error handling
- Configuration-driven verbosity is essential for good user experience
- The `ignored: true` flag is the key innovation for user-visible, AI-invisible messages
