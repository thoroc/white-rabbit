---
title: 'OpenCode TUI Communication Patterns for Plugin Developers'
topic: 'OpenCode Plugin Communication Patterns'
query: 'How to use OpenCode TUI for plugin notifications and logging without console.log'
created_at: '2025-12-14T00:00:00Z'
sources:
    - url: 'https://github.com/Opencode-DCP/opencode-dynamic-context-pruning'
      title: 'OpenCode Dynamic Context Pruning Plugin (DCP)'
      accessed: '2025-12-14'
      note: 'Primary reference implementation, version v0.4.17'
    - url: 'file://.context/features/investigate-opencode-dcp-tui-logging-pattern.md'
      title: 'Feature Spec: Investigate OpenCode DCP TUI Logging Pattern'
      accessed: '2025-12-14'
      note: 'Internal feature specification documenting DCP analysis findings'
confidence: 'high'
---

# OpenCode TUI Communication Patterns for Plugin Developers

## TL;DR

The OpenCode Dynamic Context Pruning (DCP) plugin demonstrates three distinct communication patterns for OpenCode plugins: (1) file-based debug logging for developer diagnostics, (2) TUI toast notifications for ephemeral user alerts, and (3) session prompt messages with the `ignored: true` flag for in-context information that users see but AI models do not process. This hybrid approach provides separation of concerns, user control through configuration, and defensive error handling, making it the recommended pattern for production OpenCode plugins.

## Executive Summary

OpenCode plugins require multiple communication channels to serve different audiences and purposes. Traditional `console.log()` statements clutter terminal output, appear in AI context unpredictably, and provide poor user experience. The DCP plugin, as analyzed in this research, implements a sophisticated three-tier communication strategy that balances developer needs, user experience, and AI context management.

This research document provides a comprehensive analysis of these patterns, extracted from DCP v0.4.17 source code, including:

- Detailed examination of file-based logging for debug output
- TUI toast notifications for critical user alerts
- Session prompt messages with the `ignored: true` flag for contextual information
- Decision criteria for choosing between communication methods
- Configuration-driven notification levels
- Error handling patterns and best practices
- Code examples with syntax highlighting
- Recommendations for plugin developers

## Background and Motivation

### The Problem

OpenCode plugins operate in a constrained environment where traditional logging approaches are inadequate:

1. **Console output pollution**: `console.log()` statements clutter the terminal and may interfere with the OpenCode TUI
2. **AI context contamination**: Uncontrolled output can inadvertently enter the AI's context window
3. **Poor user experience**: No separation between developer debug information and user-facing notifications
4. **Lack of persistence**: Console output is ephemeral and difficult to review
5. **No user control**: Users cannot configure notification verbosity

### The DCP Solution

The DCP plugin addresses these challenges through a hybrid communication architecture that uses:

- **File-based logging** (`~/.config/opencode/logs/dcp/`) for persistent debug information
- **TUI toast notifications** for important, time-sensitive user alerts
- **Session prompt messages** with `ignored: true` for in-context information visible to users but not AI

This research documents these patterns to enable other plugin developers to implement similar communication strategies.

## Key Findings

### Finding 1: File-Based Debug Logging Architecture [1]

**Confidence: High**

DCP implements a sophisticated file-based logging system completely decoupled from user-facing output. The logger (`lib/logger.ts`) writes to `~/.config/opencode/logs/dcp/` with the following characteristics:

- **Configuration-controlled**: Enabled only when `debug: true` in plugin config
- **Daily log rotation**: Separate files per day (`daily/YYYY-MM-DD.log`)
- **Specialized contexts**: Separate directories for different log types (e.g., `ai-context/` for AI analysis logs)
- **Structured output**: JSON-serializable log entries with timestamps
- **Zero user impact**: Logs never appear in session or terminal output

**Code Example**:

```typescript
// File-based logging pattern from DCP
import { createLogger } from './lib/logger';

const logger = createLogger({
    logDir: '~/.config/opencode/logs/dcp/',
    enabled: config.debug,
    contexts: ['daily', 'ai-context', 'pruning'],
});

// Usage
logger.debug('ai-context', 'Analyzing context size', {
    tokens: 15000,
    threshold: 12000,
});
```

**Key Insight**: File-based logging is for _developers_, not users. It should never replace user-facing notifications.

### Finding 2: TUI Toast Notifications for User Alerts [1][2]

**Confidence: High**

DCP uses `client.tui.showToast()` for important, ephemeral user notifications. Toasts appear briefly in the TUI and automatically dismiss, making them ideal for:

- Version update notifications
- Configuration migration alerts
- Model fallback warnings
- Non-critical errors

**Code Example**:

```typescript
// Toast notification pattern from DCP lib/version-checker.ts
try {
    await client.tui.showToast({
        body: {
            title: 'DCP Update Available',
            message: `Version ${latestVersion} is available. Current: ${currentVersion}`,
            variant: 'info',
            duration: 5000, // milliseconds
        },
    });
} catch {
    // Silently ignore - TUI may not be available
}

// Error variant example from index.ts
await client.tui.showToast({
    body: {
        title: 'Model Fallback',
        message: 'Configured model unavailable, using default',
        variant: 'error',
        duration: 7000,
    },
});
```

**Configuration Control**:

```typescript
// Users can disable toasts via config
{
  "showUpdateToasts": false,
  "showModelErrorToasts": true
}
```

**Key Insight**: Always wrap toast calls in try-catch with silent failure to prevent plugin crashes when TUI is unavailable.

### Finding 3: Session Prompt Messages with `ignored: true` Flag [1][2]

**Confidence: High**

The most powerful pattern discovered is `client.session.prompt()` with the `ignored: true` flag. This allows plugins to add contextual information to the session that users can see in their conversation history, but which the AI model does _not_ process.

**Code Example**:

```typescript
// Session notification pattern from DCP lib/ui/notification.ts
async function notifyPruningSummary(
    client: OpencodeClient,
    sessionId: string,
    agent: string,
    summary: PruningSummary
) {
    const message = formatPruningSummary(summary);

    try {
        await client.session.prompt({
            path: { id: sessionId },
            body: {
                noReply: true, // Don't wait for response
                agent: agent, // Target agent
                parts: [
                    {
                        type: 'text',
                        text: message,
                        ignored: true, // KEY: Visible to user, invisible to AI
                    },
                ],
            },
        });
    } catch {
        // Silently fail if session doesn't exist
    }
}
```

**Message Formatting** (from `lib/ui/display-utils.ts`):

```typescript
function formatPruningSummary(summary: PruningSummary): string {
    const { beforeTokens, afterTokens, toolsRemoved } = summary;
    const saved = beforeTokens - afterTokens;
    const percentage = ((saved / beforeTokens) * 100).toFixed(1);

    return `🧹 **Context Pruned**: ${saved.toLocaleString()} tokens saved (${percentage}%)
  
**Before**: ${beforeTokens.toLocaleString()} tokens
**After**: ${afterTokens.toLocaleString()} tokens
**Tools removed**: ${toolsRemoved}`;
}
```

**Configuration Levels** (`pruningSummary` config option):

- `"off"`: No session notifications
- `"minimal"`: Token counts only
- `"detailed"`: Full tool lists with markdown formatting

**Key Insight**: The `ignored: true` flag is the killer feature for plugin-to-user communication. It provides transparency without affecting AI behavior.

### Finding 4: Configuration-Driven Notification Levels [1][2]

**Confidence: High**

DCP provides users fine-grained control over notification verbosity through multiple configuration flags:

```typescript
// DCP configuration schema (inferred from usage)
interface DCPConfig {
    // File logging
    debug: boolean;

    // Toast notifications
    showUpdateToasts: boolean;
    showModelErrorToasts: boolean;

    // Session notifications
    pruningSummary: 'off' | 'minimal' | 'detailed';
}
```

**Implementation Pattern**:

```typescript
// Conditional notification based on config
if (config.pruningSummary !== 'off') {
    const message =
        config.pruningSummary === 'detailed'
            ? formatDetailedSummary(summary)
            : formatMinimalSummary(summary);

    await notifySession(client, sessionId, message);
}
```

**Key Insight**: Always provide configuration options for notification verbosity. Users should control what they see.

### Finding 5: Defensive Error Handling Pattern [1][2]

**Confidence: High**

All TUI and session API calls in DCP are wrapped in try-catch blocks with silent failure handling. This defensive pattern prevents plugin crashes when:

- The TUI is unavailable (headless mode, tests, etc.)
- The session has ended or doesn't exist
- Network issues prevent API calls
- The OpenCode version doesn't support certain features

**Code Example**:

```typescript
// Defensive error handling pattern from DCP
async function safeNotify(
    client: OpencodeClient,
    sessionId: string,
    message: string
) {
    try {
        await client.session.prompt({
            path: { id: sessionId },
            body: {
                noReply: true,
                agent: 'build',
                parts: [{ type: 'text', text: message, ignored: true }],
            },
        });
    } catch (error) {
        // Silently fail - notification is not critical to plugin operation
        // Optional: log to debug file
        logger.debug(
            'notification-error',
            'Failed to send session notification',
            {
                sessionId,
                error: error.message,
            }
        );
    }
}
```

**Key Insight**: Notifications should never break core plugin functionality. Always fail silently with optional debug logging.

### Finding 6: Separation of Concerns by Audience [1][2]

**Confidence: High**

DCP maintains strict separation between three audiences:

1. **Plugin Developers** → File-based debug logs
2. **End Users** → TUI toasts and session prompts
3. **AI Models** → Session prompts _without_ `ignored: true`

This separation is enforced through:

- Different code paths for each audience
- Configuration flags that control each channel independently
- Clear naming conventions (e.g., `debugLog()` vs `notifyUser()`)

**Decision Matrix**:

| Audience          | Method                   | When to Use                                  | Example Use Case             |
| ----------------- | ------------------------ | -------------------------------------------- | ---------------------------- |
| Developer         | File logging             | Debug information, performance metrics       | Token count analysis         |
| User (ephemeral)  | TUI toast                | Time-sensitive alerts, non-critical warnings | Version update available     |
| User (persistent) | Session prompt (ignored) | Context summary, operation completion        | Pruning summary              |
| AI Model          | Session prompt (normal)  | Information AI should process                | External data retrieval      |
| User + AI         | Tool result              | Command output, computed results             | Search results, calculations |

**Key Insight**: Choose the communication channel based on who needs to see the information and whether it should be persistent.

### Finding 7: Lifecycle-Based Notification Triggers [1][2]

**Confidence: Medium**

DCP triggers notifications at specific points in the plugin lifecycle:

- **On initialization**: Configuration migration toasts, version check toasts
- **Before message**: Context size warnings (optional)
- **After message**: Pruning summary notifications
- **On error**: Model fallback warnings, API error toasts

**Code Example**:

```typescript
// Hook-based notification triggers from DCP lib/hooks.ts
export const hooks = {
    beforeMessage: async (ctx: HookContext) => {
        const contextSize = await analyzeContextSize(ctx);

        if (
            contextSize > ctx.config.warningThreshold &&
            ctx.config.showWarnings
        ) {
            await ctx.client.tui.showToast({
                body: {
                    title: 'Large Context',
                    message: `Context size: ${contextSize} tokens`,
                    variant: 'warning',
                    duration: 3000,
                },
            });
        }
    },

    afterMessage: async (ctx: HookContext) => {
        if (ctx.pruningOccurred && ctx.config.pruningSummary !== 'off') {
            await notifyPruningSummary(
                ctx.client,
                ctx.sessionId,
                ctx.agent,
                ctx.summary
            );
        }
    },
};
```

**Key Insight**: Tie notifications to meaningful plugin lifecycle events, not arbitrary points in execution.

### Finding 8: Specialized Logging Contexts [1]

**Confidence: Medium**

DCP uses multiple log directories for different analysis types:

- `daily/` - General debug logs with daily rotation
- `ai-context/` - Detailed AI context analysis
- `pruning/` - Operation-specific pruning logs
- `performance/` - Performance metrics and benchmarks

**Code Example**:

```typescript
// Multi-context logging from DCP lib/logger.ts
logger.debug('daily', 'Plugin initialized', { version: '0.4.17' });
logger.debug('ai-context', 'Context analysis', {
    toolCount: 42,
    tokenCount: 15234,
});
logger.debug('pruning', 'Pruning operation', {
    before: 15234,
    after: 8192,
    removed: ['tool1', 'tool2'],
});
logger.debug('performance', 'Pruning duration', {
    durationMs: 234,
});
```

**Key Insight**: Organize debug logs by concern area to facilitate troubleshooting and analysis.

## Comparison of Alternatives

### Alternative 1: Console-based Logging (console.log, console.error)

**Pros**:

- Simple and universally available
- No SDK dependencies
- Immediate visibility during development

**Cons**:

- Clutters terminal output
- May appear in AI context unpredictably
- No user control over verbosity
- Not persistent
- Poor user experience in production

**Verdict**: Acceptable only for development/testing. Avoid in production plugins.

---

### Alternative 2: Custom Log Files Only

**Pros**:

- Persistent and searchable
- Complete control over format
- Doesn't interfere with session

**Cons**:

- Users may not discover logs
- Requires file system access
- No real-time feedback
- Complex log rotation and management

**Verdict**: Good for debug mode, but insufficient as the sole communication channel. Users need real-time feedback.

---

### Alternative 3: Return Messages from Tool Calls

**Pros**:

- Visible in session history
- Standard pattern in AI interactions
- AI can respond to information

**Cons**:

- AI processes every message
- May affect AI behavior unexpectedly
- Verbose in conversation history
- Cannot filter or hide information

**Verdict**: Use only when AI _should_ be aware of the information. Not suitable for plugin meta-information.

---

### Alternative 4: Hybrid Approach (DCP's Choice) ⭐

**Pros**:

- Clean separation of concerns
- Appropriate channel for each message type
- User control via configuration
- Graceful degradation (TUI unavailable → silent failure)
- Best user experience

**Cons**:

- More complex implementation
- Requires understanding of multiple APIs
- More configuration options to document

**Verdict**: **Best practice for production plugins**. The complexity is justified by the improved user experience and maintainability.

---

## Recommendations for Plugin Developers

### 1. Implement All Three Communication Channels

```typescript
// Recommended plugin structure
class MyPlugin {
    private logger: Logger;

    async initialize(ctx: PluginContext) {
        // 1. Set up file-based debug logging
        this.logger = createLogger({
            logDir: '~/.config/opencode/logs/my-plugin/',
            enabled: ctx.config.debug,
        });

        // 2. Show initialization toast (if configured)
        if (ctx.config.showNotifications) {
            await this.safeToast(ctx.client, {
                title: 'My Plugin Loaded',
                message: 'Ready for action',
                variant: 'info',
                duration: 3000,
            });
        }

        // 3. Add context to session (if needed)
        await this.safeSessionNotify(
            ctx.client,
            ctx.sessionId,
            '✅ My Plugin initialized'
        );
    }

    private async safeToast(client: OpencodeClient, toast: ToastConfig) {
        try {
            await client.tui.showToast({ body: toast });
        } catch {
            // Silent failure
        }
    }

    private async safeSessionNotify(
        client: OpencodeClient,
        sessionId: string,
        message: string
    ) {
        try {
            await client.session.prompt({
                path: { id: sessionId },
                body: {
                    noReply: true,
                    agent: 'build',
                    parts: [{ type: 'text', text: message, ignored: true }],
                },
            });
        } catch {
            // Silent failure
        }
    }
}
```

### 2. Provide Configuration Options

```typescript
// Recommended config schema
interface MyPluginConfig {
    // File logging
    debug: boolean;
    logLevel: 'error' | 'warn' | 'info' | 'debug';

    // TUI notifications
    showNotifications: boolean;
    showErrorToasts: boolean;

    // Session notifications
    sessionNotifications: 'off' | 'minimal' | 'detailed';
}
```

### 3. Use Defensive Error Handling

```typescript
// ALWAYS wrap TUI/session calls in try-catch
async function notifyUser(client: OpencodeClient, message: string) {
    try {
        await client.tui.showToast({
            body: { title: 'Notice', message, variant: 'info', duration: 5000 },
        });
    } catch (error) {
        // Optional: log to debug file
        logger?.debug('notification-failed', { error: error.message });
    }
}
```

### 4. Follow the Decision Matrix

Use this flowchart to choose the appropriate communication method:

```
Is this information for developers only?
  ├─ YES → File-based debug logging
  └─ NO  → Is this time-sensitive or transient?
            ├─ YES → TUI toast notification
            └─ NO  → Should AI see this information?
                     ├─ YES → Session prompt (normal)
                     └─ NO  → Session prompt (ignored: true)
```

### 5. Test with TUI Unavailable

```typescript
// Test graceful degradation
describe('Plugin notifications', () => {
    it('should not crash when TUI is unavailable', async () => {
        const clientMock = {
            tui: {
                showToast: jest
                    .fn()
                    .mockRejectedValue(new Error('TUI unavailable')),
            },
        };

        // Should not throw
        await expect(plugin.initialize(clientMock)).resolves.not.toThrow();
    });
});
```

### 6. Document All Configuration Options

Provide clear documentation for users about:

- What each configuration option controls
- Default values
- Example configurations for common use cases
- How to disable all notifications (for automated/headless environments)

### 7. Use the `ignored: true` Pattern for Transparency

When your plugin performs operations that users should know about but that shouldn't affect AI behavior:

```typescript
// Good: Transparent operation notification
await client.session.prompt({
    path: { id: sessionId },
    body: {
        noReply: true,
        agent: agentName,
        parts: [
            {
                type: 'text',
                text: '📊 **Analysis Complete**: Processed 1,234 files in 2.3s',
                ignored: true, // User sees it, AI doesn't process it
            },
        ],
    },
});
```

## Implementation Checklist

When implementing communication patterns in your OpenCode plugin:

- [ ] Create file-based logger with rotation
- [ ] Add `debug` configuration flag
- [ ] Implement safe toast notification wrapper
- [ ] Implement safe session notification wrapper
- [ ] Add `showNotifications` configuration flag
- [ ] Add notification level configuration (off/minimal/detailed)
- [ ] Test behavior when TUI is unavailable
- [ ] Test behavior when session doesn't exist
- [ ] Document all configuration options
- [ ] Add examples to plugin README
- [ ] Consider adding notification preview/test command

## Provenance

1. **OpenCode Dynamic Context Pruning Plugin (DCP)**  
   URL: https://github.com/Opencode-DCP/opencode-dynamic-context-pruning  
   Date: 2025-12-14 (v0.4.17)  
   Note: Primary reference implementation demonstrating all three communication patterns. Analyzed files: `lib/logger.ts`, `lib/ui/notification.ts`, `lib/ui/display-utils.ts`, `lib/version-checker.ts`, `index.ts`, `lib/hooks.ts`

2. **Feature Spec: Investigate OpenCode DCP TUI Logging Pattern**  
   URL: file://.context/features/investigate-opencode-dcp-tui-logging-pattern.md  
   Date: 2025-12-14  
   Note: Internal feature specification containing detailed analysis findings, code examples, and decision matrices extracted from DCP source code

## Suggested Follow-ups

1. **Review Official OpenCode SDK Documentation**: Verify that `client.tui.showToast()` and `client.session.prompt()` APIs are stable and documented. Check for additional TUI methods not used by DCP.

2. **Test `ignored: true` Behavior Empirically**: Create a minimal test plugin that uses `ignored: true` messages and verify:
    - Messages appear in user's session history
    - Messages do NOT appear in AI context
    - Behavior is consistent across OpenCode versions

3. **Investigate TUI API Surface**: Explore what other TUI methods are available beyond `showToast()`. Potential candidates:
    - `client.tui.showDialog()` for confirmations
    - `client.tui.showProgress()` for long-running operations
    - `client.tui.showInput()` for user input

4. **Create Example Plugin Template**: Develop a minimal OpenCode plugin template that demonstrates all three communication patterns as a reference for new plugin developers.

5. **Document Performance Characteristics**: Measure the performance impact of frequent `session.prompt()` calls with `ignored: true` to establish best practices for notification frequency.

6. **Research Notification Rate Limiting**: Determine if OpenCode implements any rate limiting or spam prevention for plugin notifications, and document best practices.

7. **Cross-reference with OpenCode Core**: Review OpenCode core source code to understand how `ignored: true` messages are processed internally and ensure the pattern is officially supported.

8. **Create Knowledge Base Article**: Transform this research into a concise knowledge base article at `.opencode/knowledge-base/common/plugin-communication-patterns.md` for quick reference.

## Appendices

### Appendix A: Complete Code Examples

#### Minimal Plugin with All Three Patterns

```typescript
import type { OpencodeClient, PluginContext } from '@opencode-ai/plugin';

interface MyPluginConfig {
    debug: boolean;
    showNotifications: boolean;
    notificationLevel: 'off' | 'minimal' | 'detailed';
}

export class MyPlugin {
    private config: MyPluginConfig;
    private logger: Logger | null = null;

    async initialize(ctx: PluginContext<MyPluginConfig>) {
        this.config = ctx.config;

        // 1. Set up file logging
        if (this.config.debug) {
            this.logger = createLogger({
                logDir: '~/.config/opencode/logs/my-plugin/',
                enabled: true,
            });
            this.logger.debug('initialization', 'Plugin initializing', {
                version: '1.0.0',
                config: this.config,
            });
        }

        // 2. Show initialization toast
        if (this.config.showNotifications) {
            await this.showToast(ctx.client, {
                title: 'My Plugin',
                message: 'Initialized successfully',
                variant: 'info',
                duration: 3000,
            });
        }

        // 3. Add session notification
        if (this.config.notificationLevel !== 'off' && ctx.sessionId) {
            await this.notifySession(
                ctx.client,
                ctx.sessionId,
                '✅ My Plugin ready'
            );
        }
    }

    async onSomeOperation(ctx: PluginContext, data: OperationData) {
        // File logging for debug
        this.logger?.debug('operation', 'Processing operation', { data });

        try {
            const result = await this.processOperation(data);

            // Session notification for user transparency
            if (this.config.notificationLevel !== 'off' && ctx.sessionId) {
                const message =
                    this.config.notificationLevel === 'detailed'
                        ? `📊 **Operation Complete**\n\n**Processed**: ${result.count} items\n**Duration**: ${result.durationMs}ms`
                        : `📊 Operation complete: ${result.count} items`;

                await this.notifySession(ctx.client, ctx.sessionId, message);
            }

            return result;
        } catch (error) {
            // File logging for error details
            this.logger?.error('operation-failed', 'Operation failed', {
                error,
            });

            // Toast notification for critical error
            if (this.config.showNotifications) {
                await this.showToast(ctx.client, {
                    title: 'Operation Failed',
                    message: error.message,
                    variant: 'error',
                    duration: 5000,
                });
            }

            throw error;
        }
    }

    private async showToast(
        client: OpencodeClient,
        config: {
            title: string;
            message: string;
            variant: string;
            duration: number;
        }
    ): Promise<void> {
        try {
            await client.tui.showToast({ body: config });
        } catch (error) {
            this.logger?.debug('toast-failed', 'Failed to show toast', {
                error,
            });
        }
    }

    private async notifySession(
        client: OpencodeClient,
        sessionId: string,
        message: string
    ): Promise<void> {
        try {
            await client.session.prompt({
                path: { id: sessionId },
                body: {
                    noReply: true,
                    agent: 'build',
                    parts: [
                        {
                            type: 'text',
                            text: message,
                            ignored: true,
                        },
                    ],
                },
            });
        } catch (error) {
            this.logger?.debug(
                'session-notify-failed',
                'Failed to send session notification',
                { error }
            );
        }
    }
}
```

### Appendix B: Configuration Best Practices

```typescript
// my-plugin.config.schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "debug": {
      "type": "boolean",
      "default": false,
      "description": "Enable file-based debug logging to ~/.config/opencode/logs/my-plugin/"
    },
    "showNotifications": {
      "type": "boolean",
      "default": true,
      "description": "Show TUI toast notifications for important events"
    },
    "notificationLevel": {
      "type": "string",
      "enum": ["off", "minimal", "detailed"],
      "default": "minimal",
      "description": "Level of detail for session notifications: 'off' (no notifications), 'minimal' (basic info), 'detailed' (full details)"
    }
  }
}
```

### Appendix C: Testing Patterns

```typescript
// tests/communication.test.ts
describe('Plugin Communication Patterns', () => {
    describe('Toast notifications', () => {
        it('should show toast when notifications are enabled', async () => {
            const client = mockClient();
            const plugin = new MyPlugin({ showNotifications: true });

            await plugin.initialize({ client, sessionId: 'test' });

            expect(client.tui.showToast).toHaveBeenCalledWith({
                body: expect.objectContaining({
                    title: 'My Plugin',
                    variant: 'info',
                }),
            });
        });

        it('should not crash when TUI is unavailable', async () => {
            const client = mockClient();
            client.tui.showToast.mockRejectedValue(
                new Error('TUI unavailable')
            );

            const plugin = new MyPlugin({ showNotifications: true });

            await expect(
                plugin.initialize({ client, sessionId: 'test' })
            ).resolves.not.toThrow();
        });
    });

    describe('Session notifications', () => {
        it('should send ignored message when level is not off', async () => {
            const client = mockClient();
            const plugin = new MyPlugin({ notificationLevel: 'minimal' });

            await plugin.initialize({ client, sessionId: 'test-session' });

            expect(client.session.prompt).toHaveBeenCalledWith({
                path: { id: 'test-session' },
                body: expect.objectContaining({
                    noReply: true,
                    parts: expect.arrayContaining([
                        expect.objectContaining({ ignored: true }),
                    ]),
                }),
            });
        });

        it('should not send notification when level is off', async () => {
            const client = mockClient();
            const plugin = new MyPlugin({ notificationLevel: 'off' });

            await plugin.initialize({ client, sessionId: 'test-session' });

            expect(client.session.prompt).not.toHaveBeenCalled();
        });
    });

    describe('File logging', () => {
        it('should create logger when debug is enabled', async () => {
            const plugin = new MyPlugin({ debug: true });

            await plugin.initialize({
                client: mockClient(),
                sessionId: 'test',
            });

            expect(plugin['logger']).not.toBeNull();
        });

        it('should not create logger when debug is disabled', async () => {
            const plugin = new MyPlugin({ debug: false });

            await plugin.initialize({
                client: mockClient(),
                sessionId: 'test',
            });

            expect(plugin['logger']).toBeNull();
        });
    });
});
```

---

**Document Status**: Complete  
**Last Updated**: 2025-12-14  
**Confidence Level**: High (based on direct source code analysis)  
**Recommended Action**: Use as reference for implementing communication patterns in OpenCode plugins
