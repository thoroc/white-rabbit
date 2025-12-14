---
title: 'Investigate OpenCode DCP TUI Logging Pattern'
created_at: '2025-12-14T10:30:00Z'
slug: 'investigate-opencode-dcp-tui-logging-pattern'
source_prompt: |
    Need to find how https://github.com/Opencode-DCP/opencode-dynamic-context-pruning is using the opencode TUI to send message that would otherwise end up in a console.log call.
---

# Investigate OpenCode DCP TUI Logging Pattern

## Short Summary

Research and document how the `opencode-dynamic-context-pruning` plugin leverages the OpenCode TUI (Terminal User Interface) to send structured notifications and logging messages that bypass traditional console.log output, providing a pattern for plugin-to-user communication within OpenCode sessions.

## Goals

- Understand how DCP uses `client.tui.showToast()` for user notifications
- Document the `client.session.prompt()` with `ignored: true` pattern for in-session messages
- Identify the dual-logging strategy (file-based logging + TUI notifications)
- Extract reusable patterns for our own OpenCode plugins
- Determine when to use TUI methods vs. file logging vs. console output

## Personas

- **Plugin Developer**: Needs to understand how to communicate with users through OpenCode's TUI without cluttering console output
- **OpenCode Contributor**: Wants to understand best practices for plugin notifications and logging
- **System Architect**: Evaluating communication patterns between plugins and the OpenCode runtime

## User Stories

- As a **plugin developer**, I want to understand how DCP sends notifications to users through the TUI, so that I can implement similar patterns in my own plugins without relying on console.log
- As an **OpenCode contributor**, I want to see examples of the `ignored: true` message pattern, so that I can add contextual information to sessions without triggering AI responses
- As a **system architect**, I want to understand the separation between debugging logs (file-based) and user-facing notifications (TUI), so that I can design clean plugin communication patterns

## Acceptance Criteria

- Document the three communication channels used by DCP: file logging, TUI toasts, and session prompt messages
- Provide code examples showing `client.tui.showToast()` usage with different variants (info, error)
- Explain the `client.session.prompt()` with `noReply: true` and `ignored: true` pattern
- Identify configuration options that control notification behavior (`showModelErrorToasts`, `showUpdateToasts`, `pruningSummary`)
- Create a comparison matrix showing when to use each communication method

## Implementation Plan

### Backend

- task: "Analyze DCP's `lib/logger.ts` to understand file-based debug logging strategy"
  estimate: "2 hours"
- task: "Examine `lib/ui/notification.ts` to document the session prompt pattern with ignored messages"
  estimate: "3 hours"
- task: "Study `lib/version-checker.ts` to understand toast notification patterns"
  estimate: "1 hour"
- task: "Review `index.ts` and `lib/hooks.ts` to see how notifications are triggered based on plugin lifecycle events"
  estimate: "2 hours"

### Frontend

N/A - This is a research task focused on backend plugin patterns

### Tests

- unit: "Not applicable - research task"
- integration: "Verify understanding by creating a minimal test plugin that uses all three communication methods"
- e2e: "Test notification delivery in a real OpenCode session"
- manual: "Run the DCP plugin with debug enabled and observe all three communication channels in action"

## Technical Considerations

### Key Findings from DCP Source Code

**1. File-Based Logging (`lib/logger.ts`)**

- Uses `~/.config/opencode/logs/dcp/` for debug logs
- Controlled by `debug` config flag
- Supports daily log rotation (`daily/YYYY-MM-DD.log`)
- Specialized logging for AI context analysis (`ai-context/` directory)
- Completely decoupled from user-facing output

**2. TUI Toast Notifications (`client.tui.showToast()`)**

- Used for important, ephemeral notifications
- Examples: version updates, configuration migrations, model fallback warnings
- Structure:
    ```typescript
    await client.tui.showToast({
        body: {
            title: string,
            message: string,
            variant: 'info' | 'error' | 'warning' | 'success',
            duration: number, // milliseconds
        },
    });
    ```

**3. Session Prompt Messages (`client.session.prompt()`)**

- Used for in-session contextual information
- The `ignored: true` flag prevents the message from being sent to the AI model
- The `noReply: true` flag tells OpenCode not to wait for a response
- Structure:
    ```typescript
    await client.session.prompt({
        path: { id: sessionID },
        body: {
            noReply: true,
            agent: agent,
            parts: [
                {
                    type: 'text',
                    text: message,
                    ignored: true, // Key: visible to user but not AI
                },
            ],
        },
    });
    ```

**4. Notification Levels (`pruningSummary` config)**

- `"off"`: No session notifications
- `"minimal"`: Just token counts
- `"detailed"`: Full tool list with formatting

### Communication Pattern Decision Matrix

| Use Case          | Method                   | Visibility        | Persistent       | AI Sees It |
| ----------------- | ------------------------ | ----------------- | ---------------- | ---------- |
| Debug logs        | File logging             | Developer only    | Yes              | No         |
| Critical alerts   | TUI toast                | User (ephemeral)  | No               | No         |
| Session context   | Session prompt (ignored) | User (in session) | Yes (in history) | No         |
| Session context   | Session prompt (normal)  | User (in session) | Yes (in history) | Yes        |
| Version checks    | TUI toast                | User (ephemeral)  | No               | No         |
| Pruning summaries | Session prompt (ignored) | User (in session) | Yes (in history) | No         |

### Error Handling Patterns

All TUI/session calls in DCP are wrapped in try-catch with silent failures:

```typescript
try {
  await ctx.client.tui.showToast({ ... })
} catch {
  // Silently ignore toast errors
}
```

This prevents plugin crashes if the TUI is unavailable or session doesn't exist.

## Files

### Files to Study

- path: "lib/logger.ts"
  purpose: "File-based debug logging with specialized AI context tracking"

- path: "lib/ui/notification.ts"
  purpose: "Session prompt notifications with ignored messages pattern"

- path: "lib/ui/display-utils.ts"
  purpose: "Formatting utilities for pruning summaries"

- path: "lib/version-checker.ts"
  purpose: "Toast notification pattern for version updates"

- path: "index.ts"
  purpose: "Plugin initialization showing toast usage for config migrations"

- path: "lib/hooks.ts"
  purpose: "Event handlers that trigger notifications"

- path: "lib/core/janitor.ts"
  purpose: "Core pruning logic that generates notification data"

### Files to Create (for this project)

- path: ".context/research/opencode-tui-communication-patterns-2025-12-14.md"
  purpose: "Detailed research document with code examples and decision matrix"

- path: ".opencode/knowledge-base/common/plugin-communication-patterns.md"
  purpose: "KB article documenting best practices for plugin notifications"

## Risks

- risk: "TUI API may change between OpenCode versions"
  mitigation: "Document the specific DCP version (v0.4.17) and check OpenCode SDK documentation for stability guarantees"

- risk: "Undocumented behavior of `ignored: true` flag"
  mitigation: "Cross-reference with OpenCode SDK documentation and test behavior empirically"

- risk: "Different behavior between OpenCode clients (CLI vs. IDE extensions)"
  mitigation: "Test patterns in multiple OpenCode environments if possible"

- risk: "Performance impact of frequent session.prompt() calls"
  mitigation: "Document DCP's batching strategy (notifications only after pruning operations, not on every message)"

## Alternatives

### Alternative 1: Console-based Logging

**Pros**: Simple, universally available, no SDK dependencies
**Cons**: Clutters terminal, not user-friendly, no control over visibility, appears in AI context
**Verdict**: Avoid for user-facing messages; acceptable only for development debugging

### Alternative 2: Custom Log Files Only

**Pros**: Persistent, searchable, doesn't interfere with session
**Cons**: Users may not discover them, requires file system access, no real-time feedback
**Verdict**: Good for debug mode, insufficient for user notifications

### Alternative 3: Return Messages from Tool Calls

**Pros**: Visible in session, standard pattern
**Cons**: AI sees the message, may affect AI behavior, verbose in conversation history
**Verdict**: Use only when AI should be aware of the information

### Alternative 4: Hybrid Approach (DCP's Choice)

**Pros**: Separation of concerns, appropriate channel for each message type, user control via config
**Cons**: More complex implementation, requires understanding of multiple APIs
**Verdict**: Best practice for production plugins

## Effort

- total: "12-16 hours"
- milestones:
    - name: "Initial source code analysis complete"
      date: "2 days from start"
    - name: "Documentation with code examples drafted"
      date: "4 days from start"
    - name: "Test plugin created and validated"
      date: "6 days from start"
    - name: "Knowledge base article published"
      date: "8 days from start"

## Reviewer Checklist

- code_builds: false # Research task, no code to build
- tests_added: false # No tests for research task
- docs_updated: false # Will be updated after research is complete

## References

- **Primary Source**: https://github.com/Opencode-DCP/opencode-dynamic-context-pruning (v0.4.17, accessed 2025-12-14)
- **Key Files Analyzed**:
    - `lib/logger.ts` - File-based logging implementation
    - `lib/ui/notification.ts` - Session prompt with ignored messages
    - `lib/version-checker.ts` - Toast notification implementation
    - `index.ts` - Plugin initialization and lifecycle
- **OpenCode SDK**: `@opencode-ai/plugin` package (inferred from DCP imports)
- **Related Research**: `.context/docs/opencode-sdk-documentation.md` (if exists in this project)

## Notes

### Key Insights

1. **The `ignored: true` pattern is the killer feature** - allows plugins to provide context to users without affecting AI behavior
2. **DCP never uses console.log for user-facing output** - all intentional output goes through TUI or file logs
3. **Configuration-driven notifications** - users can control verbosity level
4. **Defensive error handling** - all TUI calls silently fail to prevent plugin crashes
5. **Specialized logging contexts** - separate log directories for different analysis types

### Questions for Further Investigation

- Is there an official OpenCode SDK documentation for `client.tui` and `client.session` APIs?
- What other TUI methods are available beyond `showToast()`?
- Are there message type variants beyond `ignored: true`?
- How does OpenCode handle notification rate limiting or spam prevention?
- Can plugins register custom notification channels or handlers?

### Follow-up Tasks

- [ ] Review OpenCode SDK documentation for official API reference
- [ ] Create a minimal example plugin demonstrating all three patterns
- [ ] Test behavior with `ignored: true` messages in different OpenCode versions
- [ ] Document any additional TUI methods discovered
- [ ] Add knowledge base entry to `.opencode/knowledge-base/common/`
