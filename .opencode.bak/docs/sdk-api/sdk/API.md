# API index for sdk

## dist/gen/types.gen.d.ts

### types

<a id="sdk-dist-gen-types-gen-d-ts-eventinstallationupdated"></a>
#### EventInstallationUpdated

```ts
export type EventInstallationUpdated = {
    type: "installation.updated";
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventinstallationupdateavailable"></a>
#### EventInstallationUpdateAvailable

```ts
export type EventInstallationUpdateAvailable = {
    type: "installation.update-available";
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventlspclientdiagnostics"></a>
#### EventLspClientDiagnostics

```ts
export type EventLspClientDiagnostics = {
    type: "lsp.client.diagnostics";
    properties: {
        serverID: string;
        path: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventlspupdated"></a>
#### EventLspUpdated

```ts
export type EventLspUpdated = {
    type: "lsp.updated";
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filediff"></a>
#### FileDiff

```ts
export type FileDiff = {
    file: string;
    before: string;
    after: string;
    additions: number;
    deletions: number;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-usermessage"></a>
#### UserMessage

```ts
export type UserMessage = {
    id: string;
    sessionID: string;
    role: "user";
    time: {
        created: number;
    };
    summary?: {
        title?: string;
        body?: string;
        diffs: Array<FileDiff>;
    };
    agent: string;
    model: {
        providerID: string;
        modelID: string;
    };
    system?: string;
    tools?: {
        [key: string]: boolean;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-providerautherror"></a>
#### ProviderAuthError

```ts
export type ProviderAuthError = {
    name: "ProviderAuthError";
    data: {
        providerID: string;
        message: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-unknownerror"></a>
#### UnknownError

```ts
export type UnknownError = {
    name: "UnknownError";
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-messageoutputlengtherror"></a>
#### MessageOutputLengthError

```ts
export type MessageOutputLengthError = {
    name: "MessageOutputLengthError";
    data: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-messageabortederror"></a>
#### MessageAbortedError

```ts
export type MessageAbortedError = {
    name: "MessageAbortedError";
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-apierror"></a>
#### ApiError

```ts
export type ApiError = {
    name: "APIError";
    data: {
        message: string;
        statusCode?: number;
        isRetryable: boolean;
        responseHeaders?: {
            [key: string]: string;
        };
        responseBody?: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-assistantmessage"></a>
#### AssistantMessage

```ts
export type AssistantMessage = {
    id: string;
    sessionID: string;
    role: "assistant";
    time: {
        created: number;
        completed?: number;
    };
    error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    parentID: string;
    modelID: string;
    providerID: string;
    mode: string;
    path: {
        cwd: string;
        root: string;
    };
    summary?: boolean;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
    finish?: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-message"></a>
#### Message

```ts
export type Message = UserMessage | AssistantMessage;
```

<a id="sdk-dist-gen-types-gen-d-ts-eventmessageupdated"></a>
#### EventMessageUpdated

```ts
export type EventMessageUpdated = {
    type: "message.updated";
    properties: {
        info: Message;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventmessageremoved"></a>
#### EventMessageRemoved

```ts
export type EventMessageRemoved = {
    type: "message.removed";
    properties: {
        sessionID: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-textpart"></a>
#### TextPart

```ts
export type TextPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "text";
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-reasoningpart"></a>
#### ReasoningPart

```ts
export type ReasoningPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "reasoning";
    text: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end?: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filepartsourcetext"></a>
#### FilePartSourceText

```ts
export type FilePartSourceText = {
    value: string;
    start: number;
    end: number;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filesource"></a>
#### FileSource

```ts
export type FileSource = {
    text: FilePartSourceText;
    type: "file";
    path: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-range"></a>
#### Range

```ts
export type Range = {
    start: {
        line: number;
        character: number;
    };
    end: {
        line: number;
        character: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-symbolsource"></a>
#### SymbolSource

```ts
export type SymbolSource = {
    text: FilePartSourceText;
    type: "symbol";
    path: string;
    range: Range;
    name: string;
    kind: number;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filepartsource"></a>
#### FilePartSource

```ts
export type FilePartSource = FileSource | SymbolSource;
```

<a id="sdk-dist-gen-types-gen-d-ts-filepart"></a>
#### FilePart

```ts
export type FilePart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "file";
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolstatepending"></a>
#### ToolStatePending

```ts
export type ToolStatePending = {
    status: "pending";
    input: {
        [key: string]: unknown;
    };
    raw: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolstaterunning"></a>
#### ToolStateRunning

```ts
export type ToolStateRunning = {
    status: "running";
    input: {
        [key: string]: unknown;
    };
    title?: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolstatecompleted"></a>
#### ToolStateCompleted

```ts
export type ToolStateCompleted = {
    status: "completed";
    input: {
        [key: string]: unknown;
    };
    output: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
        compacted?: number;
    };
    attachments?: Array<FilePart>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolstateerror"></a>
#### ToolStateError

```ts
export type ToolStateError = {
    status: "error";
    input: {
        [key: string]: unknown;
    };
    error: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolstate"></a>
#### ToolState

```ts
export type ToolState = ToolStatePending | ToolStateRunning | ToolStateCompleted | ToolStateError;
```

<a id="sdk-dist-gen-types-gen-d-ts-toolpart"></a>
#### ToolPart

```ts
export type ToolPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "tool";
    callID: string;
    tool: string;
    state: ToolState;
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-stepstartpart"></a>
#### StepStartPart

```ts
export type StepStartPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "step-start";
    snapshot?: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-stepfinishpart"></a>
#### StepFinishPart

```ts
export type StepFinishPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "step-finish";
    reason: string;
    snapshot?: string;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-snapshotpart"></a>
#### SnapshotPart

```ts
export type SnapshotPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "snapshot";
    snapshot: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-patchpart"></a>
#### PatchPart

```ts
export type PatchPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "patch";
    hash: string;
    files: Array<string>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-agentpart"></a>
#### AgentPart

```ts
export type AgentPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "agent";
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-retrypart"></a>
#### RetryPart

```ts
export type RetryPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "retry";
    attempt: number;
    error: ApiError;
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-compactionpart"></a>
#### CompactionPart

```ts
export type CompactionPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: "compaction";
    auto: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-part"></a>
#### Part

```ts
export type Part = TextPart | {
    id: string;
    sessionID: string;
    messageID: string;
    type: "subtask";
    prompt: string;
    description: string;
    agent: string;
} | ReasoningPart | FilePart | ToolPart | StepStartPart | StepFinishPart | SnapshotPart | PatchPart | AgentPart | RetryPart | CompactionPart;
```

<a id="sdk-dist-gen-types-gen-d-ts-eventmessagepartupdated"></a>
#### EventMessagePartUpdated

```ts
export type EventMessagePartUpdated = {
    type: "message.part.updated";
    properties: {
        part: Part;
        delta?: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventmessagepartremoved"></a>
#### EventMessagePartRemoved

```ts
export type EventMessagePartRemoved = {
    type: "message.part.removed";
    properties: {
        sessionID: string;
        messageID: string;
        partID: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-permission"></a>
#### Permission

```ts
export type Permission = {
    id: string;
    type: string;
    pattern?: string | Array<string>;
    sessionID: string;
    messageID: string;
    callID?: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventpermissionupdated"></a>
#### EventPermissionUpdated

```ts
export type EventPermissionUpdated = {
    type: "permission.updated";
    properties: Permission;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventpermissionreplied"></a>
#### EventPermissionReplied

```ts
export type EventPermissionReplied = {
    type: "permission.replied";
    properties: {
        sessionID: string;
        permissionID: string;
        response: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionstatus"></a>
#### SessionStatus

```ts
export type SessionStatus = {
    type: "idle";
} | {
    type: "retry";
    attempt: number;
    message: string;
    next: number;
} | {
    type: "busy";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsessionstatus"></a>
#### EventSessionStatus

```ts
export type EventSessionStatus = {
    type: "session.status";
    properties: {
        sessionID: string;
        status: SessionStatus;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsessionidle"></a>
#### EventSessionIdle

```ts
export type EventSessionIdle = {
    type: "session.idle";
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsessioncompacted"></a>
#### EventSessionCompacted

```ts
export type EventSessionCompacted = {
    type: "session.compacted";
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventfileedited"></a>
#### EventFileEdited

```ts
export type EventFileEdited = {
    type: "file.edited";
    properties: {
        file: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-todo"></a>
#### Todo

```ts
export type Todo = {
    /**
     * Brief description of the task
     */
    content: string;
    /**
     * Current status of the task: pending, in_progress, completed, cancelled
     */
    status: string;
    /**
     * Priority level of the task: high, medium, low
     */
    priority: string;
    /**
     * Unique identifier for the todo item
     */
    id: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventtodoupdated"></a>
#### EventTodoUpdated

```ts
export type EventTodoUpdated = {
    type: "todo.updated";
    properties: {
        sessionID: string;
        todos: Array<Todo>;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventcommandexecuted"></a>
#### EventCommandExecuted

```ts
export type EventCommandExecuted = {
    type: "command.executed";
    properties: {
        name: string;
        sessionID: string;
        arguments: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-session"></a>
#### Session

```ts
export type Session = {
    id: string;
    projectID: string;
    directory: string;
    parentID?: string;
    summary?: {
        additions: number;
        deletions: number;
        files: number;
        diffs?: Array<FileDiff>;
    };
    share?: {
        url: string;
    };
    title: string;
    version: string;
    time: {
        created: number;
        updated: number;
        compacting?: number;
    };
    revert?: {
        messageID: string;
        partID?: string;
        snapshot?: string;
        diff?: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsessioncreated"></a>
#### EventSessionCreated

```ts
export type EventSessionCreated = {
    type: "session.created";
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsessionupdated"></a>
#### EventSessionUpdated

```ts
export type EventSessionUpdated = {
    type: "session.updated";
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsessiondeleted"></a>
#### EventSessionDeleted

```ts
export type EventSessionDeleted = {
    type: "session.deleted";
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsessiondiff"></a>
#### EventSessionDiff

```ts
export type EventSessionDiff = {
    type: "session.diff";
    properties: {
        sessionID: string;
        diff: Array<FileDiff>;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsessionerror"></a>
#### EventSessionError

```ts
export type EventSessionError = {
    type: "session.error";
    properties: {
        sessionID?: string;
        error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventfilewatcherupdated"></a>
#### EventFileWatcherUpdated

```ts
export type EventFileWatcherUpdated = {
    type: "file.watcher.updated";
    properties: {
        file: string;
        event: "add" | "change" | "unlink";
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventvcsbranchupdated"></a>
#### EventVcsBranchUpdated

```ts
export type EventVcsBranchUpdated = {
    type: "vcs.branch.updated";
    properties: {
        branch?: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventtuipromptappend"></a>
#### EventTuiPromptAppend

```ts
export type EventTuiPromptAppend = {
    type: "tui.prompt.append";
    properties: {
        text: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventtuicommandexecute"></a>
#### EventTuiCommandExecute

```ts
export type EventTuiCommandExecute = {
    type: "tui.command.execute";
    properties: {
        command: ("session.list" | "session.new" | "session.share" | "session.interrupt" | "session.compact" | "session.page.up" | "session.page.down" | "session.half.page.up" | "session.half.page.down" | "session.first" | "session.last" | "prompt.clear" | "prompt.submit" | "agent.cycle") | string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventtuitoastshow"></a>
#### EventTuiToastShow

```ts
export type EventTuiToastShow = {
    type: "tui.toast.show";
    properties: {
        title?: string;
        message: string;
        variant: "info" | "success" | "warning" | "error";
        /**
         * Duration in milliseconds
         */
        duration?: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventserverconnected"></a>
#### EventServerConnected

```ts
export type EventServerConnected = {
    type: "server.connected";
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-event"></a>
#### Event

```ts
export type Event = EventInstallationUpdated | EventInstallationUpdateAvailable | EventLspClientDiagnostics | EventLspUpdated | EventMessageUpdated | EventMessageRemoved | EventMessagePartUpdated | EventMessagePartRemoved | EventPermissionUpdated | EventPermissionReplied | EventSessionStatus | EventSessionIdle | EventSessionCompacted | EventFileEdited | EventTodoUpdated | EventCommandExecuted | EventSessionCreated | EventSessionUpdated | EventSessionDeleted | EventSessionDiff | EventSessionError | EventFileWatcherUpdated | EventVcsBranchUpdated | EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow | EventServerConnected;
```

<a id="sdk-dist-gen-types-gen-d-ts-globalevent"></a>
#### GlobalEvent

```ts
export type GlobalEvent = {
    directory: string;
    payload: Event;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-project"></a>
#### Project

```ts
export type Project = {
    id: string;
    worktree: string;
    vcsDir?: string;
    vcs?: "git";
    time: {
        created: number;
        initialized?: number;
    };
};
```

Custom keybind configurations

<a id="sdk-dist-gen-types-gen-d-ts-keybindsconfig"></a>
#### KeybindsConfig

```ts
/**
 * Custom keybind configurations
 */
export type KeybindsConfig = {
    /**
     * Leader key for keybind combinations
     */
    leader?: string;
    /**
     * Exit the application
     */
    app_exit?: string;
    /**
     * Open external editor
     */
    editor_open?: string;
    /**
     * List available themes
     */
    theme_list?: string;
    /**
     * Toggle sidebar
     */
    sidebar_toggle?: string;
    /**
     * View status
     */
    status_view?: string;
    /**
     * Export session to editor
     */
    session_export?: string;
    /**
     * Create a new session
     */
    session_new?: string;
    /**
     * List all sessions
     */
    session_list?: string;
    /**
     * Show session timeline
     */
    session_timeline?: string;
    /**
     * Share current session
     */
    session_share?: string;
    /**
     * Unshare current session
     */
    session_unshare?: string;
    /**
     * Interrupt current session
     */
    session_interrupt?: string;
    /**
     * Compact the session
     */
    session_compact?: string;
    /**
     * Scroll messages up by one page
     */
    messages_page_up?: string;
    /**
     * Scroll messages down by one page
     */
    messages_page_down?: string;
    /**
     * Scroll messages up by half page
     */
    messages_half_page_up?: string;
    /**
     * Scroll messages down by half page
     */
    messages_half_page_down?: string;
    /**
     * Navigate to first message
     */
    messages_first?: string;
    /**
     * Navigate to last message
     */
    messages_last?: string;
    /**
     * Copy message
     */
    messages_copy?: string;
    /**
     * Undo message
     */
    messages_undo?: string;
    /**
     * Redo message
     */
    messages_redo?: string;
    /**
     * Toggle code block concealment in messages
     */
    messages_toggle_conceal?: string;
    /**
     * List available models
     */
    model_list?: string;
    /**
     * Next recently used model
     */
    model_cycle_recent?: string;
    /**
     * Previous recently used model
     */
    model_cycle_recent_reverse?: string;
    /**
     * List available commands
     */
    command_list?: string;
    /**
     * List agents
     */
    agent_list?: string;
    /**
     * Next agent
     */
    agent_cycle?: string;
    /**
     * Previous agent
     */
    agent_cycle_reverse?: string;
    /**
     * Clear input field
     */
    input_clear?: string;
    /**
     * Forward delete
     */
    input_forward_delete?: string;
    /**
     * Paste from clipboard
     */
    input_paste?: string;
    /**
     * Submit input
     */
    input_submit?: string;
    /**
     * Insert newline in input
     */
    input_newline?: string;
    /**
     * Previous history item
     */
    history_previous?: string;
    /**
     * Next history item
     */
    history_next?: string;
    /**
     * Next child session
     */
    session_child_cycle?: string;
    /**
     * Previous child session
     */
    session_child_cycle_reverse?: string;
    /**
     * Suspend terminal
     */
    terminal_suspend?: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-agentconfig"></a>
#### AgentConfig

```ts
export type AgentConfig = {
    model?: string;
    temperature?: number;
    top_p?: number;
    prompt?: string;
    tools?: {
        [key: string]: boolean;
    };
    disable?: boolean;
    /**
     * Description of when to use the agent
     */
    description?: string;
    mode?: "subagent" | "primary" | "all";
    /**
     * Hex color code for the agent (e.g., #FF5733)
     */
    color?: string;
    permission?: {
        edit?: "ask" | "allow" | "deny";
        bash?: ("ask" | "allow" | "deny") | {
            [key: string]: "ask" | "allow" | "deny";
        };
        webfetch?: "ask" | "allow" | "deny";
        doom_loop?: "ask" | "allow" | "deny";
        external_directory?: "ask" | "allow" | "deny";
    };
    [key: string]: unknown | string | number | {
        [key: string]: boolean;
    } | boolean | ("subagent" | "primary" | "all") | {
        edit?: "ask" | "allow" | "deny";
        bash?: ("ask" | "allow" | "deny") | {
            [key: string]: "ask" | "allow" | "deny";
        };
        webfetch?: "ask" | "allow" | "deny";
        doom_loop?: "ask" | "allow" | "deny";
        external_directory?: "ask" | "allow" | "deny";
    } | undefined;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcplocalconfig"></a>
#### McpLocalConfig

```ts
export type McpLocalConfig = {
    /**
     * Type of MCP server connection
     */
    type: "local";
    /**
     * Command and arguments to run the MCP server
     */
    command: Array<string>;
    /**
     * Environment variables to set when running the MCP server
     */
    environment?: {
        [key: string]: string;
    };
    /**
     * Enable or disable the MCP server on startup
     */
    enabled?: boolean;
    /**
     * Timeout in ms for fetching tools from the MCP server. Defaults to 5000 (5 seconds) if not specified.
     */
    timeout?: number;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpremoteconfig"></a>
#### McpRemoteConfig

```ts
export type McpRemoteConfig = {
    /**
     * Type of MCP server connection
     */
    type: "remote";
    /**
     * URL of the remote MCP server
     */
    url: string;
    /**
     * Enable or disable the MCP server on startup
     */
    enabled?: boolean;
    /**
     * Headers to send with the request
     */
    headers?: {
        [key: string]: string;
    };
    /**
     * Timeout in ms for fetching tools from the MCP server. Defaults to 5000 (5 seconds) if not specified.
     */
    timeout?: number;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-layoutconfig"></a>
#### LayoutConfig

```ts
/**
 * @deprecated Always uses stretch layout.
 */
export type LayoutConfig = "auto" | "stretch";
```

<a id="sdk-dist-gen-types-gen-d-ts-config"></a>
#### Config

```ts
export type Config = {
    /**
     * JSON schema reference for configuration validation
     */
    $schema?: string;
    /**
     * Theme name to use for the interface
     */
    theme?: string;
    keybinds?: KeybindsConfig;
    /**
     * TUI specific settings
     */
    tui?: {
        /**
         * TUI scroll speed
         */
        scroll_speed?: number;
        /**
         * Scroll acceleration settings
         */
        scroll_acceleration?: {
            /**
             * Enable scroll acceleration
             */
            enabled: boolean;
        };
        /**
         * Control diff rendering style: 'auto' adapts to terminal width, 'stacked' always shows single column
         */
        diff_style?: "auto" | "stacked";
    };
    /**
     * Command configuration, see https://opencode.ai/docs/commands
     */
    command?: {
        [key: string]: {
            template: string;
            description?: string;
            agent?: string;
            model?: string;
            subtask?: boolean;
        };
    };
    watcher?: {
        ignore?: Array<string>;
    };
    plugin?: Array<string>;
    snapshot?: boolean;
    /**
     * Control sharing behavior:'manual' allows manual sharing via commands, 'auto' enables automatic sharing, 'disabled' disables all sharing
     */
    share?: "manual" | "auto" | "disabled";
    /**
     * @deprecated Use 'share' field instead. Share newly created sessions automatically
     */
    autoshare?: boolean;
    /**
     * Automatically update to the latest version. Set to true to auto-update, false to disable, or 'notify' to show update notifications
     */
    autoupdate?: boolean | "notify";
    /**
     * Disable providers that are loaded automatically
     */
    disabled_providers?: Array<string>;
    /**
     * When set, ONLY these providers will be enabled. All other providers will be ignored
     */
    enabled_providers?: Array<string>;
    /**
     * Model to use in the format of provider/model, eg anthropic/claude-2
     */
    model?: string;
    /**
     * Small model to use for tasks like title generation in the format of provider/model
     */
    small_model?: string;
    /**
     * Custom username to display in conversations instead of system username
     */
    username?: string;
    /**
     * @deprecated Use `agent` field instead.
     */
    mode?: {
        build?: AgentConfig;
        plan?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    /**
     * Agent configuration, see https://opencode.ai/docs/agent
     */
    agent?: {
        plan?: AgentConfig;
        build?: AgentConfig;
        general?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    /**
     * Custom provider configurations and model overrides
     */
    provider?: {
        [key: string]: {
            api?: string;
            name?: string;
            env?: Array<string>;
            id?: string;
            npm?: string;
            models?: {
                [key: string]: {
                    id?: string;
                    name?: string;
                    release_date?: string;
                    attachment?: boolean;
                    reasoning?: boolean;
                    temperature?: boolean;
                    tool_call?: boolean;
                    cost?: {
                        input: number;
                        output: number;
                        cache_read?: number;
                        cache_write?: number;
                        context_over_200k?: {
                            input: number;
                            output: number;
                            cache_read?: number;
                            cache_write?: number;
                        };
                    };
                    limit?: {
                        context: number;
                        output: number;
                    };
                    modalities?: {
                        input: Array<"text" | "audio" | "image" | "video" | "pdf">;
                        output: Array<"text" | "audio" | "image" | "video" | "pdf">;
                    };
                    experimental?: boolean;
                    status?: "alpha" | "beta" | "deprecated";
                    options?: {
                        [key: string]: unknown;
                    };
                    headers?: {
                        [key: string]: string;
                    };
                    provider?: {
                        npm: string;
                    };
                };
            };
            whitelist?: Array<string>;
            blacklist?: Array<string>;
            options?: {
                apiKey?: string;
                baseURL?: string;
                /**
                 * GitHub Enterprise URL for copilot authentication
                 */
                enterpriseUrl?: string;
                /**
                 * Enable promptCacheKey for this provider (default false)
                 */
                setCacheKey?: boolean;
                /**
                 * Timeout in milliseconds for requests to this provider. Default is 300000 (5 minutes). Set to false to disable timeout.
                 */
                timeout?: number | false;
                [key: string]: unknown | string | boolean | (number | false) | undefined;
            };
        };
    };
    /**
     * MCP (Model Context Protocol) server configurations
     */
    mcp?: {
        [key: string]: McpLocalConfig | McpRemoteConfig;
    };
    formatter?: false | {
        [key: string]: {
            disabled?: boolean;
            command?: Array<string>;
            environment?: {
                [key: string]: string;
            };
            extensions?: Array<string>;
        };
    };
    lsp?: false | {
        [key: string]: {
            disabled: true;
        } | {
            command: Array<string>;
            extensions?: Array<string>;
            disabled?: boolean;
            env?: {
                [key: string]: string;
            };
            initialization?: {
                [key: string]: unknown;
            };
        };
    };
    /**
     * Additional instruction files or patterns to include
     */
    instructions?: Array<string>;
    layout?: LayoutConfig;
    permission?: {
        edit?: "ask" | "allow" | "deny";
        bash?: ("ask" | "allow" | "deny") | {
            [key: string]: "ask" | "allow" | "deny";
        };
        webfetch?: "ask" | "allow" | "deny";
        doom_loop?: "ask" | "allow" | "deny";
        external_directory?: "ask" | "allow" | "deny";
    };
    tools?: {
        [key: string]: boolean;
    };
    enterprise?: {
        /**
         * Enterprise URL
         */
        url?: string;
    };
    experimental?: {
        hook?: {
            file_edited?: {
                [key: string]: Array<{
                    command: Array<string>;
                    environment?: {
                        [key: string]: string;
                    };
                }>;
            };
            session_completed?: Array<{
                command: Array<string>;
                environment?: {
                    [key: string]: string;
                };
            }>;
        };
        /**
         * Number of retries for chat completions on failure
         */
        chatMaxRetries?: number;
        disable_paste_summary?: boolean;
        /**
         * Enable the batch tool
         */
        batch_tool?: boolean;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-badrequesterror"></a>
#### BadRequestError

```ts
export type BadRequestError = {
    data: unknown;
    errors: Array<{
        [key: string]: unknown;
    }>;
    success: false;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolids"></a>
#### ToolIds

```ts
export type ToolIds = Array<string>;
```

<a id="sdk-dist-gen-types-gen-d-ts-toollistitem"></a>
#### ToolListItem

```ts
export type ToolListItem = {
    id: string;
    description: string;
    parameters: unknown;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toollist"></a>
#### ToolList

```ts
export type ToolList = Array<ToolListItem>;
```

<a id="sdk-dist-gen-types-gen-d-ts-path"></a>
#### Path

```ts
export type Path = {
    state: string;
    config: string;
    worktree: string;
    directory: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-vcsinfo"></a>
#### VcsInfo

```ts
export type VcsInfo = {
    branch: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-notfounderror"></a>
#### NotFoundError

```ts
export type NotFoundError = {
    name: "NotFoundError";
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-textpartinput"></a>
#### TextPartInput

```ts
export type TextPartInput = {
    id?: string;
    type: "text";
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filepartinput"></a>
#### FilePartInput

```ts
export type FilePartInput = {
    id?: string;
    type: "file";
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-agentpartinput"></a>
#### AgentPartInput

```ts
export type AgentPartInput = {
    id?: string;
    type: "agent";
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-subtaskpartinput"></a>
#### SubtaskPartInput

```ts
export type SubtaskPartInput = {
    id?: string;
    type: "subtask";
    prompt: string;
    description: string;
    agent: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-command"></a>
#### Command

```ts
export type Command = {
    name: string;
    description?: string;
    agent?: string;
    model?: string;
    template: string;
    subtask?: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-model"></a>
#### Model

```ts
export type Model = {
    id: string;
    name: string;
    release_date: string;
    attachment: boolean;
    reasoning: boolean;
    temperature: boolean;
    tool_call: boolean;
    cost: {
        input: number;
        output: number;
        cache_read?: number;
        cache_write?: number;
        context_over_200k?: {
            input: number;
            output: number;
            cache_read?: number;
            cache_write?: number;
        };
    };
    limit: {
        context: number;
        output: number;
    };
    modalities?: {
        input: Array<"text" | "audio" | "image" | "video" | "pdf">;
        output: Array<"text" | "audio" | "image" | "video" | "pdf">;
    };
    experimental?: boolean;
    status?: "alpha" | "beta" | "deprecated";
    options: {
        [key: string]: unknown;
    };
    headers?: {
        [key: string]: string;
    };
    provider?: {
        npm: string;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-provider"></a>
#### Provider

```ts
export type Provider = {
    api?: string;
    name: string;
    env: Array<string>;
    id: string;
    npm?: string;
    models: {
        [key: string]: Model;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-providerauthmethod"></a>
#### ProviderAuthMethod

```ts
export type ProviderAuthMethod = {
    type: "oauth" | "api";
    label: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-providerauthauthorization"></a>
#### ProviderAuthAuthorization

```ts
export type ProviderAuthAuthorization = {
    url: string;
    method: "auto" | "code";
    instructions: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-symbol"></a>
#### Symbol

```ts
export type Symbol = {
    name: string;
    kind: number;
    location: {
        uri: string;
        range: Range;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filenode"></a>
#### FileNode

```ts
export type FileNode = {
    name: string;
    path: string;
    absolute: string;
    type: "file" | "directory";
    ignored: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filecontent"></a>
#### FileContent

```ts
export type FileContent = {
    type: "text";
    content: string;
    diff?: string;
    patch?: {
        oldFileName: string;
        newFileName: string;
        oldHeader?: string;
        newHeader?: string;
        hunks: Array<{
            oldStart: number;
            oldLines: number;
            newStart: number;
            newLines: number;
            lines: Array<string>;
        }>;
        index?: string;
    };
    encoding?: "base64";
    mimeType?: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-file"></a>
#### File

```ts
export type File = {
    path: string;
    added: number;
    removed: number;
    status: "added" | "deleted" | "modified";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-agent"></a>
#### Agent

```ts
export type Agent = {
    name: string;
    description?: string;
    mode: "subagent" | "primary" | "all";
    builtIn: boolean;
    topP?: number;
    temperature?: number;
    color?: string;
    permission: {
        edit: "ask" | "allow" | "deny";
        bash: {
            [key: string]: "ask" | "allow" | "deny";
        };
        webfetch?: "ask" | "allow" | "deny";
        doom_loop?: "ask" | "allow" | "deny";
        external_directory?: "ask" | "allow" | "deny";
    };
    model?: {
        modelID: string;
        providerID: string;
    };
    prompt?: string;
    tools: {
        [key: string]: boolean;
    };
    options: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpstatusconnected"></a>
#### McpStatusConnected

```ts
export type McpStatusConnected = {
    status: "connected";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpstatusdisabled"></a>
#### McpStatusDisabled

```ts
export type McpStatusDisabled = {
    status: "disabled";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpstatusfailed"></a>
#### McpStatusFailed

```ts
export type McpStatusFailed = {
    status: "failed";
    error: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpstatus"></a>
#### McpStatus

```ts
export type McpStatus = McpStatusConnected | McpStatusDisabled | McpStatusFailed;
```

<a id="sdk-dist-gen-types-gen-d-ts-lspstatus"></a>
#### LspStatus

```ts
export type LspStatus = {
    id: string;
    name: string;
    root: string;
    status: "connected" | "error";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-formatterstatus"></a>
#### FormatterStatus

```ts
export type FormatterStatus = {
    name: string;
    extensions: Array<string>;
    enabled: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-oauth"></a>
#### OAuth

```ts
export type OAuth = {
    type: "oauth";
    refresh: string;
    access: string;
    expires: number;
    enterpriseUrl?: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-apiauth"></a>
#### ApiAuth

```ts
export type ApiAuth = {
    type: "api";
    key: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-wellknownauth"></a>
#### WellKnownAuth

```ts
export type WellKnownAuth = {
    type: "wellknown";
    key: string;
    token: string;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-auth"></a>
#### Auth

```ts
export type Auth = OAuth | ApiAuth | WellKnownAuth;
```

<a id="sdk-dist-gen-types-gen-d-ts-globaleventdata"></a>
#### GlobalEventData

```ts
export type GlobalEventData = {
    body?: never;
    path?: never;
    query?: never;
    url: "/global/event";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-globaleventresponses"></a>
#### GlobalEventResponses

```ts
export type GlobalEventResponses = {
    /**
     * Event stream
     */
    200: GlobalEvent;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-globaleventresponse"></a>
#### GlobalEventResponse

```ts
export type GlobalEventResponse = GlobalEventResponses[keyof GlobalEventResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-projectlistdata"></a>
#### ProjectListData

```ts
export type ProjectListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/project";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-projectlistresponses"></a>
#### ProjectListResponses

```ts
export type ProjectListResponses = {
    /**
     * List of projects
     */
    200: Array<Project>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-projectlistresponse"></a>
#### ProjectListResponse

```ts
export type ProjectListResponse = ProjectListResponses[keyof ProjectListResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-projectcurrentdata"></a>
#### ProjectCurrentData

```ts
export type ProjectCurrentData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/project/current";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-projectcurrentresponses"></a>
#### ProjectCurrentResponses

```ts
export type ProjectCurrentResponses = {
    /**
     * Current project
     */
    200: Project;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-projectcurrentresponse"></a>
#### ProjectCurrentResponse

```ts
export type ProjectCurrentResponse = ProjectCurrentResponses[keyof ProjectCurrentResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-configgetdata"></a>
#### ConfigGetData

```ts
export type ConfigGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/config";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-configgetresponses"></a>
#### ConfigGetResponses

```ts
export type ConfigGetResponses = {
    /**
     * Get config info
     */
    200: Config;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-configgetresponse"></a>
#### ConfigGetResponse

```ts
export type ConfigGetResponse = ConfigGetResponses[keyof ConfigGetResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-configupdatedata"></a>
#### ConfigUpdateData

```ts
export type ConfigUpdateData = {
    body?: Config;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/config";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-configupdateerrors"></a>
#### ConfigUpdateErrors

```ts
export type ConfigUpdateErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-configupdateerror"></a>
#### ConfigUpdateError

```ts
export type ConfigUpdateError = ConfigUpdateErrors[keyof ConfigUpdateErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-configupdateresponses"></a>
#### ConfigUpdateResponses

```ts
export type ConfigUpdateResponses = {
    /**
     * Successfully updated config
     */
    200: Config;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-configupdateresponse"></a>
#### ConfigUpdateResponse

```ts
export type ConfigUpdateResponse = ConfigUpdateResponses[keyof ConfigUpdateResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-toolidsdata"></a>
#### ToolIdsData

```ts
export type ToolIdsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/experimental/tool/ids";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolidserrors"></a>
#### ToolIdsErrors

```ts
export type ToolIdsErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolidserror"></a>
#### ToolIdsError

```ts
export type ToolIdsError = ToolIdsErrors[keyof ToolIdsErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-toolidsresponses"></a>
#### ToolIdsResponses

```ts
export type ToolIdsResponses = {
    /**
     * Tool IDs
     */
    200: ToolIds;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toolidsresponse"></a>
#### ToolIdsResponse

```ts
export type ToolIdsResponse = ToolIdsResponses[keyof ToolIdsResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-toollistdata"></a>
#### ToolListData

```ts
export type ToolListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        provider: string;
        model: string;
    };
    url: "/experimental/tool";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toollisterrors"></a>
#### ToolListErrors

```ts
export type ToolListErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toollisterror"></a>
#### ToolListError

```ts
export type ToolListError = ToolListErrors[keyof ToolListErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-toollistresponses"></a>
#### ToolListResponses

```ts
export type ToolListResponses = {
    /**
     * Tools
     */
    200: ToolList;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-toollistresponse"></a>
#### ToolListResponse

```ts
export type ToolListResponse = ToolListResponses[keyof ToolListResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-instancedisposedata"></a>
#### InstanceDisposeData

```ts
export type InstanceDisposeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/instance/dispose";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-instancedisposeresponses"></a>
#### InstanceDisposeResponses

```ts
export type InstanceDisposeResponses = {
    /**
     * Instance disposed
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-instancedisposeresponse"></a>
#### InstanceDisposeResponse

```ts
export type InstanceDisposeResponse = InstanceDisposeResponses[keyof InstanceDisposeResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-pathgetdata"></a>
#### PathGetData

```ts
export type PathGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/path";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-pathgetresponses"></a>
#### PathGetResponses

```ts
export type PathGetResponses = {
    /**
     * Path
     */
    200: Path;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-pathgetresponse"></a>
#### PathGetResponse

```ts
export type PathGetResponse = PathGetResponses[keyof PathGetResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-vcsgetdata"></a>
#### VcsGetData

```ts
export type VcsGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/vcs";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-vcsgetresponses"></a>
#### VcsGetResponses

```ts
export type VcsGetResponses = {
    /**
     * VCS info
     */
    200: VcsInfo;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-vcsgetresponse"></a>
#### VcsGetResponse

```ts
export type VcsGetResponse = VcsGetResponses[keyof VcsGetResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionlistdata"></a>
#### SessionListData

```ts
export type SessionListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/session";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionlistresponses"></a>
#### SessionListResponses

```ts
export type SessionListResponses = {
    /**
     * List of sessions
     */
    200: Array<Session>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionlistresponse"></a>
#### SessionListResponse

```ts
export type SessionListResponse = SessionListResponses[keyof SessionListResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncreatedata"></a>
#### SessionCreateData

```ts
export type SessionCreateData = {
    body?: {
        parentID?: string;
        title?: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/session";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncreateerrors"></a>
#### SessionCreateErrors

```ts
export type SessionCreateErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncreateerror"></a>
#### SessionCreateError

```ts
export type SessionCreateError = SessionCreateErrors[keyof SessionCreateErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncreateresponses"></a>
#### SessionCreateResponses

```ts
export type SessionCreateResponses = {
    /**
     * Successfully created session
     */
    200: Session;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncreateresponse"></a>
#### SessionCreateResponse

```ts
export type SessionCreateResponse = SessionCreateResponses[keyof SessionCreateResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionstatusdata"></a>
#### SessionStatusData

```ts
export type SessionStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/session/status";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionstatuserrors"></a>
#### SessionStatusErrors

```ts
export type SessionStatusErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionstatuserror"></a>
#### SessionStatusError

```ts
export type SessionStatusError = SessionStatusErrors[keyof SessionStatusErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionstatusresponses"></a>
#### SessionStatusResponses

```ts
export type SessionStatusResponses = {
    /**
     * Get session status
     */
    200: {
        [key: string]: SessionStatus;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionstatusresponse"></a>
#### SessionStatusResponse

```ts
export type SessionStatusResponse = SessionStatusResponses[keyof SessionStatusResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondeletedata"></a>
#### SessionDeleteData

```ts
export type SessionDeleteData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondeleteerrors"></a>
#### SessionDeleteErrors

```ts
export type SessionDeleteErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondeleteerror"></a>
#### SessionDeleteError

```ts
export type SessionDeleteError = SessionDeleteErrors[keyof SessionDeleteErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondeleteresponses"></a>
#### SessionDeleteResponses

```ts
export type SessionDeleteResponses = {
    /**
     * Successfully deleted session
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondeleteresponse"></a>
#### SessionDeleteResponse

```ts
export type SessionDeleteResponse = SessionDeleteResponses[keyof SessionDeleteResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiongetdata"></a>
#### SessionGetData

```ts
export type SessionGetData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiongeterrors"></a>
#### SessionGetErrors

```ts
export type SessionGetErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiongeterror"></a>
#### SessionGetError

```ts
export type SessionGetError = SessionGetErrors[keyof SessionGetErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiongetresponses"></a>
#### SessionGetResponses

```ts
export type SessionGetResponses = {
    /**
     * Get session
     */
    200: Session;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiongetresponse"></a>
#### SessionGetResponse

```ts
export type SessionGetResponse = SessionGetResponses[keyof SessionGetResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionupdatedata"></a>
#### SessionUpdateData

```ts
export type SessionUpdateData = {
    body?: {
        title?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionupdateerrors"></a>
#### SessionUpdateErrors

```ts
export type SessionUpdateErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionupdateerror"></a>
#### SessionUpdateError

```ts
export type SessionUpdateError = SessionUpdateErrors[keyof SessionUpdateErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionupdateresponses"></a>
#### SessionUpdateResponses

```ts
export type SessionUpdateResponses = {
    /**
     * Successfully updated session
     */
    200: Session;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionupdateresponse"></a>
#### SessionUpdateResponse

```ts
export type SessionUpdateResponse = SessionUpdateResponses[keyof SessionUpdateResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionchildrendata"></a>
#### SessionChildrenData

```ts
export type SessionChildrenData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/children";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionchildrenerrors"></a>
#### SessionChildrenErrors

```ts
export type SessionChildrenErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionchildrenerror"></a>
#### SessionChildrenError

```ts
export type SessionChildrenError = SessionChildrenErrors[keyof SessionChildrenErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionchildrenresponses"></a>
#### SessionChildrenResponses

```ts
export type SessionChildrenResponses = {
    /**
     * List of children
     */
    200: Array<Session>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionchildrenresponse"></a>
#### SessionChildrenResponse

```ts
export type SessionChildrenResponse = SessionChildrenResponses[keyof SessionChildrenResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiontododata"></a>
#### SessionTodoData

```ts
export type SessionTodoData = {
    body?: never;
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/todo";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiontodoerrors"></a>
#### SessionTodoErrors

```ts
export type SessionTodoErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiontodoerror"></a>
#### SessionTodoError

```ts
export type SessionTodoError = SessionTodoErrors[keyof SessionTodoErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiontodoresponses"></a>
#### SessionTodoResponses

```ts
export type SessionTodoResponses = {
    /**
     * Todo list
     */
    200: Array<Todo>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiontodoresponse"></a>
#### SessionTodoResponse

```ts
export type SessionTodoResponse = SessionTodoResponses[keyof SessionTodoResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioninitdata"></a>
#### SessionInitData

```ts
export type SessionInitData = {
    body?: {
        modelID: string;
        providerID: string;
        messageID: string;
    };
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/init";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioniniterrors"></a>
#### SessionInitErrors

```ts
export type SessionInitErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioniniterror"></a>
#### SessionInitError

```ts
export type SessionInitError = SessionInitErrors[keyof SessionInitErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioninitresponses"></a>
#### SessionInitResponses

```ts
export type SessionInitResponses = {
    /**
     * 200
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioninitresponse"></a>
#### SessionInitResponse

```ts
export type SessionInitResponse = SessionInitResponses[keyof SessionInitResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionforkdata"></a>
#### SessionForkData

```ts
export type SessionForkData = {
    body?: {
        messageID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/fork";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionforkresponses"></a>
#### SessionForkResponses

```ts
export type SessionForkResponses = {
    /**
     * 200
     */
    200: Session;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionforkresponse"></a>
#### SessionForkResponse

```ts
export type SessionForkResponse = SessionForkResponses[keyof SessionForkResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionabortdata"></a>
#### SessionAbortData

```ts
export type SessionAbortData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/abort";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionaborterrors"></a>
#### SessionAbortErrors

```ts
export type SessionAbortErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionaborterror"></a>
#### SessionAbortError

```ts
export type SessionAbortError = SessionAbortErrors[keyof SessionAbortErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionabortresponses"></a>
#### SessionAbortResponses

```ts
export type SessionAbortResponses = {
    /**
     * Aborted session
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionabortresponse"></a>
#### SessionAbortResponse

```ts
export type SessionAbortResponse = SessionAbortResponses[keyof SessionAbortResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunsharedata"></a>
#### SessionUnshareData

```ts
export type SessionUnshareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/share";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunshareerrors"></a>
#### SessionUnshareErrors

```ts
export type SessionUnshareErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunshareerror"></a>
#### SessionUnshareError

```ts
export type SessionUnshareError = SessionUnshareErrors[keyof SessionUnshareErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunshareresponses"></a>
#### SessionUnshareResponses

```ts
export type SessionUnshareResponses = {
    /**
     * Successfully unshared session
     */
    200: Session;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunshareresponse"></a>
#### SessionUnshareResponse

```ts
export type SessionUnshareResponse = SessionUnshareResponses[keyof SessionUnshareResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionsharedata"></a>
#### SessionShareData

```ts
export type SessionShareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/share";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshareerrors"></a>
#### SessionShareErrors

```ts
export type SessionShareErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshareerror"></a>
#### SessionShareError

```ts
export type SessionShareError = SessionShareErrors[keyof SessionShareErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshareresponses"></a>
#### SessionShareResponses

```ts
export type SessionShareResponses = {
    /**
     * Successfully shared session
     */
    200: Session;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshareresponse"></a>
#### SessionShareResponse

```ts
export type SessionShareResponse = SessionShareResponses[keyof SessionShareResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondiffdata"></a>
#### SessionDiffData

```ts
export type SessionDiffData = {
    body?: never;
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
        messageID?: string;
    };
    url: "/session/{id}/diff";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondifferrors"></a>
#### SessionDiffErrors

```ts
export type SessionDiffErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondifferror"></a>
#### SessionDiffError

```ts
export type SessionDiffError = SessionDiffErrors[keyof SessionDiffErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondiffresponses"></a>
#### SessionDiffResponses

```ts
export type SessionDiffResponses = {
    /**
     * List of diffs
     */
    200: Array<FileDiff>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessiondiffresponse"></a>
#### SessionDiffResponse

```ts
export type SessionDiffResponse = SessionDiffResponses[keyof SessionDiffResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionsummarizedata"></a>
#### SessionSummarizeData

```ts
export type SessionSummarizeData = {
    body?: {
        providerID: string;
        modelID: string;
    };
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/summarize";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionsummarizeerrors"></a>
#### SessionSummarizeErrors

```ts
export type SessionSummarizeErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionsummarizeerror"></a>
#### SessionSummarizeError

```ts
export type SessionSummarizeError = SessionSummarizeErrors[keyof SessionSummarizeErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionsummarizeresponses"></a>
#### SessionSummarizeResponses

```ts
export type SessionSummarizeResponses = {
    /**
     * Summarized session
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionsummarizeresponse"></a>
#### SessionSummarizeResponse

```ts
export type SessionSummarizeResponse = SessionSummarizeResponses[keyof SessionSummarizeResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessagesdata"></a>
#### SessionMessagesData

```ts
export type SessionMessagesData = {
    body?: never;
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
        limit?: number;
    };
    url: "/session/{id}/message";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessageserrors"></a>
#### SessionMessagesErrors

```ts
export type SessionMessagesErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessageserror"></a>
#### SessionMessagesError

```ts
export type SessionMessagesError = SessionMessagesErrors[keyof SessionMessagesErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessagesresponses"></a>
#### SessionMessagesResponses

```ts
export type SessionMessagesResponses = {
    /**
     * List of messages
     */
    200: Array<{
        info: Message;
        parts: Array<Part>;
    }>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessagesresponse"></a>
#### SessionMessagesResponse

```ts
export type SessionMessagesResponse = SessionMessagesResponses[keyof SessionMessagesResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionpromptdata"></a>
#### SessionPromptData

```ts
export type SessionPromptData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/message";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionprompterrors"></a>
#### SessionPromptErrors

```ts
export type SessionPromptErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionprompterror"></a>
#### SessionPromptError

```ts
export type SessionPromptError = SessionPromptErrors[keyof SessionPromptErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionpromptresponses"></a>
#### SessionPromptResponses

```ts
export type SessionPromptResponses = {
    /**
     * Created message
     */
    200: {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionpromptresponse"></a>
#### SessionPromptResponse

```ts
export type SessionPromptResponse = SessionPromptResponses[keyof SessionPromptResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessagedata"></a>
#### SessionMessageData

```ts
export type SessionMessageData = {
    body?: never;
    path: {
        /**
         * Session ID
         */
        id: string;
        /**
         * Message ID
         */
        messageID: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/message/{messageID}";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessageerrors"></a>
#### SessionMessageErrors

```ts
export type SessionMessageErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessageerror"></a>
#### SessionMessageError

```ts
export type SessionMessageError = SessionMessageErrors[keyof SessionMessageErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessageresponses"></a>
#### SessionMessageResponses

```ts
export type SessionMessageResponses = {
    /**
     * Message
     */
    200: {
        info: Message;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionmessageresponse"></a>
#### SessionMessageResponse

```ts
export type SessionMessageResponse = SessionMessageResponses[keyof SessionMessageResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionpromptasyncdata"></a>
#### SessionPromptAsyncData

```ts
export type SessionPromptAsyncData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/prompt_async";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionpromptasyncerrors"></a>
#### SessionPromptAsyncErrors

```ts
export type SessionPromptAsyncErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionpromptasyncerror"></a>
#### SessionPromptAsyncError

```ts
export type SessionPromptAsyncError = SessionPromptAsyncErrors[keyof SessionPromptAsyncErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionpromptasyncresponses"></a>
#### SessionPromptAsyncResponses

```ts
export type SessionPromptAsyncResponses = {
    /**
     * Prompt accepted
     */
    204: void;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionpromptasyncresponse"></a>
#### SessionPromptAsyncResponse

```ts
export type SessionPromptAsyncResponse = SessionPromptAsyncResponses[keyof SessionPromptAsyncResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncommanddata"></a>
#### SessionCommandData

```ts
export type SessionCommandData = {
    body?: {
        messageID?: string;
        agent?: string;
        model?: string;
        arguments: string;
        command: string;
    };
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/command";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncommanderrors"></a>
#### SessionCommandErrors

```ts
export type SessionCommandErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncommanderror"></a>
#### SessionCommandError

```ts
export type SessionCommandError = SessionCommandErrors[keyof SessionCommandErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncommandresponses"></a>
#### SessionCommandResponses

```ts
export type SessionCommandResponses = {
    /**
     * Created message
     */
    200: {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessioncommandresponse"></a>
#### SessionCommandResponse

```ts
export type SessionCommandResponse = SessionCommandResponses[keyof SessionCommandResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshelldata"></a>
#### SessionShellData

```ts
export type SessionShellData = {
    body?: {
        agent: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        command: string;
    };
    path: {
        /**
         * Session ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/shell";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshellerrors"></a>
#### SessionShellErrors

```ts
export type SessionShellErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshellerror"></a>
#### SessionShellError

```ts
export type SessionShellError = SessionShellErrors[keyof SessionShellErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshellresponses"></a>
#### SessionShellResponses

```ts
export type SessionShellResponses = {
    /**
     * Created message
     */
    200: AssistantMessage;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionshellresponse"></a>
#### SessionShellResponse

```ts
export type SessionShellResponse = SessionShellResponses[keyof SessionShellResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionrevertdata"></a>
#### SessionRevertData

```ts
export type SessionRevertData = {
    body?: {
        messageID: string;
        partID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/revert";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionreverterrors"></a>
#### SessionRevertErrors

```ts
export type SessionRevertErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionreverterror"></a>
#### SessionRevertError

```ts
export type SessionRevertError = SessionRevertErrors[keyof SessionRevertErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionrevertresponses"></a>
#### SessionRevertResponses

```ts
export type SessionRevertResponses = {
    /**
     * Updated session
     */
    200: Session;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionrevertresponse"></a>
#### SessionRevertResponse

```ts
export type SessionRevertResponse = SessionRevertResponses[keyof SessionRevertResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunrevertdata"></a>
#### SessionUnrevertData

```ts
export type SessionUnrevertData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/unrevert";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunreverterrors"></a>
#### SessionUnrevertErrors

```ts
export type SessionUnrevertErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunreverterror"></a>
#### SessionUnrevertError

```ts
export type SessionUnrevertError = SessionUnrevertErrors[keyof SessionUnrevertErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunrevertresponses"></a>
#### SessionUnrevertResponses

```ts
export type SessionUnrevertResponses = {
    /**
     * Updated session
     */
    200: Session;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-sessionunrevertresponse"></a>
#### SessionUnrevertResponse

```ts
export type SessionUnrevertResponse = SessionUnrevertResponses[keyof SessionUnrevertResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-postsessionidpermissionspermissioniddata"></a>
#### PostSessionIdPermissionsPermissionIdData

```ts
export type PostSessionIdPermissionsPermissionIdData = {
    body?: {
        response: "once" | "always" | "reject";
    };
    path: {
        id: string;
        permissionID: string;
    };
    query?: {
        directory?: string;
    };
    url: "/session/{id}/permissions/{permissionID}";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-postsessionidpermissionspermissioniderrors"></a>
#### PostSessionIdPermissionsPermissionIdErrors

```ts
export type PostSessionIdPermissionsPermissionIdErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
    /**
     * Not found
     */
    404: NotFoundError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-postsessionidpermissionspermissioniderror"></a>
#### PostSessionIdPermissionsPermissionIdError

```ts
export type PostSessionIdPermissionsPermissionIdError = PostSessionIdPermissionsPermissionIdErrors[keyof PostSessionIdPermissionsPermissionIdErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-postsessionidpermissionspermissionidresponses"></a>
#### PostSessionIdPermissionsPermissionIdResponses

```ts
export type PostSessionIdPermissionsPermissionIdResponses = {
    /**
     * Permission processed successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-postsessionidpermissionspermissionidresponse"></a>
#### PostSessionIdPermissionsPermissionIdResponse

```ts
export type PostSessionIdPermissionsPermissionIdResponse = PostSessionIdPermissionsPermissionIdResponses[keyof PostSessionIdPermissionsPermissionIdResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-commandlistdata"></a>
#### CommandListData

```ts
export type CommandListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/command";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-commandlistresponses"></a>
#### CommandListResponses

```ts
export type CommandListResponses = {
    /**
     * List of commands
     */
    200: Array<Command>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-commandlistresponse"></a>
#### CommandListResponse

```ts
export type CommandListResponse = CommandListResponses[keyof CommandListResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-configprovidersdata"></a>
#### ConfigProvidersData

```ts
export type ConfigProvidersData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/config/providers";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-configprovidersresponses"></a>
#### ConfigProvidersResponses

```ts
export type ConfigProvidersResponses = {
    /**
     * List of providers
     */
    200: {
        providers: Array<Provider>;
        default: {
            [key: string]: string;
        };
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-configprovidersresponse"></a>
#### ConfigProvidersResponse

```ts
export type ConfigProvidersResponse = ConfigProvidersResponses[keyof ConfigProvidersResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-providerlistdata"></a>
#### ProviderListData

```ts
export type ProviderListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/provider";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-providerlistresponses"></a>
#### ProviderListResponses

```ts
export type ProviderListResponses = {
    /**
     * List of providers
     */
    200: {
        all: Array<Provider>;
        default: {
            [key: string]: string;
        };
        connected: Array<string>;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-providerlistresponse"></a>
#### ProviderListResponse

```ts
export type ProviderListResponse = ProviderListResponses[keyof ProviderListResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-providerauthdata"></a>
#### ProviderAuthData

```ts
export type ProviderAuthData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/provider/auth";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-providerauthresponses"></a>
#### ProviderAuthResponses

```ts
export type ProviderAuthResponses = {
    /**
     * Provider auth methods
     */
    200: {
        [key: string]: Array<ProviderAuthMethod>;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-providerauthresponse"></a>
#### ProviderAuthResponse

```ts
export type ProviderAuthResponse = ProviderAuthResponses[keyof ProviderAuthResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthauthorizedata"></a>
#### ProviderOauthAuthorizeData

```ts
export type ProviderOauthAuthorizeData = {
    body?: {
        /**
         * Auth method index
         */
        method: number;
    };
    path: {
        /**
         * Provider ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/provider/{id}/oauth/authorize";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthauthorizeerrors"></a>
#### ProviderOauthAuthorizeErrors

```ts
export type ProviderOauthAuthorizeErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthauthorizeerror"></a>
#### ProviderOauthAuthorizeError

```ts
export type ProviderOauthAuthorizeError = ProviderOauthAuthorizeErrors[keyof ProviderOauthAuthorizeErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthauthorizeresponses"></a>
#### ProviderOauthAuthorizeResponses

```ts
export type ProviderOauthAuthorizeResponses = {
    /**
     * Authorization URL and method
     */
    200: ProviderAuthAuthorization;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthauthorizeresponse"></a>
#### ProviderOauthAuthorizeResponse

```ts
export type ProviderOauthAuthorizeResponse = ProviderOauthAuthorizeResponses[keyof ProviderOauthAuthorizeResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthcallbackdata"></a>
#### ProviderOauthCallbackData

```ts
export type ProviderOauthCallbackData = {
    body?: {
        /**
         * Auth method index
         */
        method: number;
        /**
         * OAuth authorization code
         */
        code?: string;
    };
    path: {
        /**
         * Provider ID
         */
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/provider/{id}/oauth/callback";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthcallbackerrors"></a>
#### ProviderOauthCallbackErrors

```ts
export type ProviderOauthCallbackErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthcallbackerror"></a>
#### ProviderOauthCallbackError

```ts
export type ProviderOauthCallbackError = ProviderOauthCallbackErrors[keyof ProviderOauthCallbackErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthcallbackresponses"></a>
#### ProviderOauthCallbackResponses

```ts
export type ProviderOauthCallbackResponses = {
    /**
     * OAuth callback processed successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-provideroauthcallbackresponse"></a>
#### ProviderOauthCallbackResponse

```ts
export type ProviderOauthCallbackResponse = ProviderOauthCallbackResponses[keyof ProviderOauthCallbackResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-findtextdata"></a>
#### FindTextData

```ts
export type FindTextData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        pattern: string;
    };
    url: "/find";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-findtextresponses"></a>
#### FindTextResponses

```ts
export type FindTextResponses = {
    /**
     * Matches
     */
    200: Array<{
        path: {
            text: string;
        };
        lines: {
            text: string;
        };
        line_number: number;
        absolute_offset: number;
        submatches: Array<{
            match: {
                text: string;
            };
            start: number;
            end: number;
        }>;
    }>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-findtextresponse"></a>
#### FindTextResponse

```ts
export type FindTextResponse = FindTextResponses[keyof FindTextResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-findfilesdata"></a>
#### FindFilesData

```ts
export type FindFilesData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
        dirs?: "true" | "false";
    };
    url: "/find/file";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-findfilesresponses"></a>
#### FindFilesResponses

```ts
export type FindFilesResponses = {
    /**
     * File paths
     */
    200: Array<string>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-findfilesresponse"></a>
#### FindFilesResponse

```ts
export type FindFilesResponse = FindFilesResponses[keyof FindFilesResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-findsymbolsdata"></a>
#### FindSymbolsData

```ts
export type FindSymbolsData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
    };
    url: "/find/symbol";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-findsymbolsresponses"></a>
#### FindSymbolsResponses

```ts
export type FindSymbolsResponses = {
    /**
     * Symbols
     */
    200: Array<Symbol>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-findsymbolsresponse"></a>
#### FindSymbolsResponse

```ts
export type FindSymbolsResponse = FindSymbolsResponses[keyof FindSymbolsResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-filelistdata"></a>
#### FileListData

```ts
export type FileListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: "/file";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filelistresponses"></a>
#### FileListResponses

```ts
export type FileListResponses = {
    /**
     * Files and directories
     */
    200: Array<FileNode>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filelistresponse"></a>
#### FileListResponse

```ts
export type FileListResponse = FileListResponses[keyof FileListResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-filereaddata"></a>
#### FileReadData

```ts
export type FileReadData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: "/file/content";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filereadresponses"></a>
#### FileReadResponses

```ts
export type FileReadResponses = {
    /**
     * File content
     */
    200: FileContent;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filereadresponse"></a>
#### FileReadResponse

```ts
export type FileReadResponse = FileReadResponses[keyof FileReadResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-filestatusdata"></a>
#### FileStatusData

```ts
export type FileStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/file/status";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filestatusresponses"></a>
#### FileStatusResponses

```ts
export type FileStatusResponses = {
    /**
     * File status
     */
    200: Array<File>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-filestatusresponse"></a>
#### FileStatusResponse

```ts
export type FileStatusResponse = FileStatusResponses[keyof FileStatusResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-applogdata"></a>
#### AppLogData

```ts
export type AppLogData = {
    body?: {
        /**
         * Service name for the log entry
         */
        service: string;
        /**
         * Log level
         */
        level: "debug" | "info" | "error" | "warn";
        /**
         * Log message
         */
        message: string;
        /**
         * Additional metadata for the log entry
         */
        extra?: {
            [key: string]: unknown;
        };
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/log";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-applogerrors"></a>
#### AppLogErrors

```ts
export type AppLogErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-applogerror"></a>
#### AppLogError

```ts
export type AppLogError = AppLogErrors[keyof AppLogErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-applogresponses"></a>
#### AppLogResponses

```ts
export type AppLogResponses = {
    /**
     * Log entry written successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-applogresponse"></a>
#### AppLogResponse

```ts
export type AppLogResponse = AppLogResponses[keyof AppLogResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-appagentsdata"></a>
#### AppAgentsData

```ts
export type AppAgentsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/agent";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-appagentsresponses"></a>
#### AppAgentsResponses

```ts
export type AppAgentsResponses = {
    /**
     * List of agents
     */
    200: Array<Agent>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-appagentsresponse"></a>
#### AppAgentsResponse

```ts
export type AppAgentsResponse = AppAgentsResponses[keyof AppAgentsResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpstatusdata"></a>
#### McpStatusData

```ts
export type McpStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/mcp";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpstatusresponses"></a>
#### McpStatusResponses

```ts
export type McpStatusResponses = {
    /**
     * MCP server status
     */
    200: {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpstatusresponse"></a>
#### McpStatusResponse

```ts
export type McpStatusResponse = McpStatusResponses[keyof McpStatusResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpadddata"></a>
#### McpAddData

```ts
export type McpAddData = {
    body?: {
        name: string;
        config: McpLocalConfig | McpRemoteConfig;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/mcp";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpadderrors"></a>
#### McpAddErrors

```ts
export type McpAddErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpadderror"></a>
#### McpAddError

```ts
export type McpAddError = McpAddErrors[keyof McpAddErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpaddresponses"></a>
#### McpAddResponses

```ts
export type McpAddResponses = {
    /**
     * MCP server added successfully
     */
    200: {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-mcpaddresponse"></a>
#### McpAddResponse

```ts
export type McpAddResponse = McpAddResponses[keyof McpAddResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-lspstatusdata"></a>
#### LspStatusData

```ts
export type LspStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/lsp";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-lspstatusresponses"></a>
#### LspStatusResponses

```ts
export type LspStatusResponses = {
    /**
     * LSP server status
     */
    200: Array<LspStatus>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-lspstatusresponse"></a>
#### LspStatusResponse

```ts
export type LspStatusResponse = LspStatusResponses[keyof LspStatusResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-formatterstatusdata"></a>
#### FormatterStatusData

```ts
export type FormatterStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/formatter";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-formatterstatusresponses"></a>
#### FormatterStatusResponses

```ts
export type FormatterStatusResponses = {
    /**
     * Formatter status
     */
    200: Array<FormatterStatus>;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-formatterstatusresponse"></a>
#### FormatterStatusResponse

```ts
export type FormatterStatusResponse = FormatterStatusResponses[keyof FormatterStatusResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiappendpromptdata"></a>
#### TuiAppendPromptData

```ts
export type TuiAppendPromptData = {
    body?: {
        text: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/append-prompt";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiappendprompterrors"></a>
#### TuiAppendPromptErrors

```ts
export type TuiAppendPromptErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiappendprompterror"></a>
#### TuiAppendPromptError

```ts
export type TuiAppendPromptError = TuiAppendPromptErrors[keyof TuiAppendPromptErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiappendpromptresponses"></a>
#### TuiAppendPromptResponses

```ts
export type TuiAppendPromptResponses = {
    /**
     * Prompt processed successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiappendpromptresponse"></a>
#### TuiAppendPromptResponse

```ts
export type TuiAppendPromptResponse = TuiAppendPromptResponses[keyof TuiAppendPromptResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenhelpdata"></a>
#### TuiOpenHelpData

```ts
export type TuiOpenHelpData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/open-help";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenhelpresponses"></a>
#### TuiOpenHelpResponses

```ts
export type TuiOpenHelpResponses = {
    /**
     * Help dialog opened successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenhelpresponse"></a>
#### TuiOpenHelpResponse

```ts
export type TuiOpenHelpResponse = TuiOpenHelpResponses[keyof TuiOpenHelpResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopensessionsdata"></a>
#### TuiOpenSessionsData

```ts
export type TuiOpenSessionsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/open-sessions";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopensessionsresponses"></a>
#### TuiOpenSessionsResponses

```ts
export type TuiOpenSessionsResponses = {
    /**
     * Session dialog opened successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopensessionsresponse"></a>
#### TuiOpenSessionsResponse

```ts
export type TuiOpenSessionsResponse = TuiOpenSessionsResponses[keyof TuiOpenSessionsResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenthemesdata"></a>
#### TuiOpenThemesData

```ts
export type TuiOpenThemesData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/open-themes";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenthemesresponses"></a>
#### TuiOpenThemesResponses

```ts
export type TuiOpenThemesResponses = {
    /**
     * Theme dialog opened successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenthemesresponse"></a>
#### TuiOpenThemesResponse

```ts
export type TuiOpenThemesResponse = TuiOpenThemesResponses[keyof TuiOpenThemesResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenmodelsdata"></a>
#### TuiOpenModelsData

```ts
export type TuiOpenModelsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/open-models";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenmodelsresponses"></a>
#### TuiOpenModelsResponses

```ts
export type TuiOpenModelsResponses = {
    /**
     * Model dialog opened successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiopenmodelsresponse"></a>
#### TuiOpenModelsResponse

```ts
export type TuiOpenModelsResponse = TuiOpenModelsResponses[keyof TuiOpenModelsResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuisubmitpromptdata"></a>
#### TuiSubmitPromptData

```ts
export type TuiSubmitPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/submit-prompt";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuisubmitpromptresponses"></a>
#### TuiSubmitPromptResponses

```ts
export type TuiSubmitPromptResponses = {
    /**
     * Prompt submitted successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuisubmitpromptresponse"></a>
#### TuiSubmitPromptResponse

```ts
export type TuiSubmitPromptResponse = TuiSubmitPromptResponses[keyof TuiSubmitPromptResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiclearpromptdata"></a>
#### TuiClearPromptData

```ts
export type TuiClearPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/clear-prompt";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiclearpromptresponses"></a>
#### TuiClearPromptResponses

```ts
export type TuiClearPromptResponses = {
    /**
     * Prompt cleared successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiclearpromptresponse"></a>
#### TuiClearPromptResponse

```ts
export type TuiClearPromptResponse = TuiClearPromptResponses[keyof TuiClearPromptResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiexecutecommanddata"></a>
#### TuiExecuteCommandData

```ts
export type TuiExecuteCommandData = {
    body?: {
        command: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/execute-command";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiexecutecommanderrors"></a>
#### TuiExecuteCommandErrors

```ts
export type TuiExecuteCommandErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiexecutecommanderror"></a>
#### TuiExecuteCommandError

```ts
export type TuiExecuteCommandError = TuiExecuteCommandErrors[keyof TuiExecuteCommandErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiexecutecommandresponses"></a>
#### TuiExecuteCommandResponses

```ts
export type TuiExecuteCommandResponses = {
    /**
     * Command executed successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuiexecutecommandresponse"></a>
#### TuiExecuteCommandResponse

```ts
export type TuiExecuteCommandResponse = TuiExecuteCommandResponses[keyof TuiExecuteCommandResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuishowtoastdata"></a>
#### TuiShowToastData

```ts
export type TuiShowToastData = {
    body?: {
        title?: string;
        message: string;
        variant: "info" | "success" | "warning" | "error";
        /**
         * Duration in milliseconds
         */
        duration?: number;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/show-toast";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuishowtoastresponses"></a>
#### TuiShowToastResponses

```ts
export type TuiShowToastResponses = {
    /**
     * Toast notification shown successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuishowtoastresponse"></a>
#### TuiShowToastResponse

```ts
export type TuiShowToastResponse = TuiShowToastResponses[keyof TuiShowToastResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuipublishdata"></a>
#### TuiPublishData

```ts
export type TuiPublishData = {
    body?: EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/publish";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuipublisherrors"></a>
#### TuiPublishErrors

```ts
export type TuiPublishErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuipublisherror"></a>
#### TuiPublishError

```ts
export type TuiPublishError = TuiPublishErrors[keyof TuiPublishErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuipublishresponses"></a>
#### TuiPublishResponses

```ts
export type TuiPublishResponses = {
    /**
     * Event published successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuipublishresponse"></a>
#### TuiPublishResponse

```ts
export type TuiPublishResponse = TuiPublishResponses[keyof TuiPublishResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuicontrolnextdata"></a>
#### TuiControlNextData

```ts
export type TuiControlNextData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/control/next";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuicontrolnextresponses"></a>
#### TuiControlNextResponses

```ts
export type TuiControlNextResponses = {
    /**
     * Next TUI request
     */
    200: {
        path: string;
        body: unknown;
    };
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuicontrolnextresponse"></a>
#### TuiControlNextResponse

```ts
export type TuiControlNextResponse = TuiControlNextResponses[keyof TuiControlNextResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-tuicontrolresponsedata"></a>
#### TuiControlResponseData

```ts
export type TuiControlResponseData = {
    body?: unknown;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/tui/control/response";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuicontrolresponseresponses"></a>
#### TuiControlResponseResponses

```ts
export type TuiControlResponseResponses = {
    /**
     * Response submitted successfully
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-tuicontrolresponseresponse"></a>
#### TuiControlResponseResponse

```ts
export type TuiControlResponseResponse = TuiControlResponseResponses[keyof TuiControlResponseResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-authsetdata"></a>
#### AuthSetData

```ts
export type AuthSetData = {
    body?: Auth;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: "/auth/{id}";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-authseterrors"></a>
#### AuthSetErrors

```ts
export type AuthSetErrors = {
    /**
     * Bad request
     */
    400: BadRequestError;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-authseterror"></a>
#### AuthSetError

```ts
export type AuthSetError = AuthSetErrors[keyof AuthSetErrors];
```

<a id="sdk-dist-gen-types-gen-d-ts-authsetresponses"></a>
#### AuthSetResponses

```ts
export type AuthSetResponses = {
    /**
     * Successfully set authentication credentials
     */
    200: boolean;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-authsetresponse"></a>
#### AuthSetResponse

```ts
export type AuthSetResponse = AuthSetResponses[keyof AuthSetResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsubscribedata"></a>
#### EventSubscribeData

```ts
export type EventSubscribeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: "/event";
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsubscriberesponses"></a>
#### EventSubscribeResponses

```ts
export type EventSubscribeResponses = {
    /**
     * Event stream
     */
    200: Event;
};
```

<a id="sdk-dist-gen-types-gen-d-ts-eventsubscriberesponse"></a>
#### EventSubscribeResponse

```ts
export type EventSubscribeResponse = EventSubscribeResponses[keyof EventSubscribeResponses];
```

<a id="sdk-dist-gen-types-gen-d-ts-clientoptions"></a>
#### ClientOptions

```ts
export type ClientOptions = {
    baseUrl: `${string}://${string}` | (string & {});
};
```

## dist/gen/core/auth.gen.d.ts

### interfaces

<a id="sdk-dist-gen-core-auth-gen-d-ts-auth"></a>
#### Auth

```ts
export interface Auth {
    /**
     * Which part of the request do we use to send the auth?
     *
     * @default 'header'
     */
    in?: "header" | "query" | "cookie";
    /**
     * Header or query parameter name.
     *
     * @default 'Authorization'
     */
    name?: string;
    scheme?: "basic" | "bearer";
    type: "apiKey" | "http";
}
```

### types

<a id="sdk-dist-gen-core-auth-gen-d-ts-authtoken"></a>
#### AuthToken

```ts
export type AuthToken = string | undefined;
```

### variables

<a id="sdk-dist-gen-core-auth-gen-d-ts-getauthtoken"></a>
#### getAuthToken

```ts
getAuthToken: (auth: Auth, callback: ((auth: Auth) => Promise<AuthToken> | AuthToken) | AuthToken) => Promise<string | undefined>
```

## dist/gen/core/pathSerializer.gen.d.ts

### interfaces

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-serializeroptions"></a>
#### SerializerOptions

```ts
export interface SerializerOptions<T> {
    /**
     * @default true
     */
    explode: boolean;
    style: T;
}
```

### types

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-arraystyle"></a>
#### ArrayStyle

```ts
export type ArrayStyle = "form" | "spaceDelimited" | "pipeDelimited";
```

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-arrayseparatorstyle"></a>
#### ArraySeparatorStyle

```ts
export type ArraySeparatorStyle = ArrayStyle | MatrixStyle;
```

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-objectstyle"></a>
#### ObjectStyle

```ts
export type ObjectStyle = "form" | "deepObject";
```

### variables

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-separatorarrayexplode"></a>
#### separatorArrayExplode

```ts
separatorArrayExplode: (style: ArraySeparatorStyle) => "." | ";" | "," | "&"
```

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-separatorarraynoexplode"></a>
#### separatorArrayNoExplode

```ts
separatorArrayNoExplode: (style: ArraySeparatorStyle) => "," | "|" | "%20"
```

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-separatorobjectexplode"></a>
#### separatorObjectExplode

```ts
separatorObjectExplode: (style: ObjectSeparatorStyle) => "." | ";" | "," | "&"
```

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-serializearrayparam"></a>
#### serializeArrayParam

```ts
serializeArrayParam: ({ allowReserved, explode, name, style, value, }: SerializeOptions<ArraySeparatorStyle> & {
    value: unknown[];
}) => string
```

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-serializeprimitiveparam"></a>
#### serializePrimitiveParam

```ts
serializePrimitiveParam: ({ allowReserved, name, value }: SerializePrimitiveParam) => string
```

<a id="sdk-dist-gen-core-pathserializer-gen-d-ts-serializeobjectparam"></a>
#### serializeObjectParam

```ts
serializeObjectParam: ({ allowReserved, explode, name, style, value, valueOnly, }: SerializeOptions<ObjectSeparatorStyle> & {
    value: Record<string, unknown> | Date;
    valueOnly?: boolean;
}) => string
```

## dist/gen/core/bodySerializer.gen.d.ts

### interfaces

<a id="sdk-dist-gen-core-bodyserializer-gen-d-ts-queryserializeroptions"></a>
#### QuerySerializerOptions

```ts
export interface QuerySerializerOptions {
    allowReserved?: boolean;
    array?: SerializerOptions<ArrayStyle>;
    object?: SerializerOptions<ObjectStyle>;
}
```

### types

<a id="sdk-dist-gen-core-bodyserializer-gen-d-ts-queryserializer"></a>
#### QuerySerializer

```ts
export type QuerySerializer = (query: Record<string, unknown>) => string;
```

<a id="sdk-dist-gen-core-bodyserializer-gen-d-ts-bodyserializer"></a>
#### BodySerializer

```ts
export type BodySerializer = (body: any) => any;
```

### variables

<a id="sdk-dist-gen-core-bodyserializer-gen-d-ts-formdatabodyserializer"></a>
#### formDataBodySerializer

```ts
formDataBodySerializer: {
    bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(body: T) => FormData;
}
```

<a id="sdk-dist-gen-core-bodyserializer-gen-d-ts-jsonbodyserializer"></a>
#### jsonBodySerializer

```ts
jsonBodySerializer: {
    bodySerializer: <T>(body: T) => string;
}
```

<a id="sdk-dist-gen-core-bodyserializer-gen-d-ts-urlsearchparamsbodyserializer"></a>
#### urlSearchParamsBodySerializer

```ts
urlSearchParamsBodySerializer: {
    bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(body: T) => string;
}
```

## dist/gen/core/types.gen.d.ts

### interfaces

<a id="sdk-dist-gen-core-types-gen-d-ts-client"></a>
#### Client

```ts
export interface Client<RequestFn = never, Config = unknown, MethodFn = never, BuildUrlFn = never> {
    /**
     * Returns the final request URL.
     */
    buildUrl: BuildUrlFn;
    connect: MethodFn;
    delete: MethodFn;
    get: MethodFn;
    getConfig: () => Config;
    head: MethodFn;
    options: MethodFn;
    patch: MethodFn;
    post: MethodFn;
    put: MethodFn;
    request: RequestFn;
    setConfig: (config: Config) => Config;
    trace: MethodFn;
}
```

<a id="sdk-dist-gen-core-types-gen-d-ts-config"></a>
#### Config

```ts
export interface Config {
    /**
     * Auth token or a function returning auth token. The resolved value will be
     * added to the request payload as defined by its `security` array.
     */
    auth?: ((auth: Auth) => Promise<AuthToken> | AuthToken) | AuthToken;
    /**
     * A function for serializing request body parameter. By default,
     * {@link JSON.stringify()} will be used.
     */
    bodySerializer?: BodySerializer | null;
    /**
     * An object containing any HTTP headers that you want to pre-populate your
     * `Headers` object with.
     *
     * {@link https://developer.mozilla.org/docs/Web/API/Headers/Headers#init See more}
     */
    headers?: RequestInit["headers"] | Record<string, string | number | boolean | (string | number | boolean)[] | null | undefined | unknown>;
    /**
     * The request method.
     *
     * {@link https://developer.mozilla.org/docs/Web/API/fetch#method See more}
     */
    method?: "CONNECT" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";
    /**
     * A function for serializing request query parameters. By default, arrays
     * will be exploded in form style, objects will be exploded in deepObject
     * style, and reserved characters are percent-encoded.
     *
     * This method will have no effect if the native `paramsSerializer()` Axios
     * API function is used.
     *
     * {@link https://swagger.io/docs/specification/serialization/#query View examples}
     */
    querySerializer?: QuerySerializer | QuerySerializerOptions;
    /**
     * A function validating request data. This is useful if you want to ensure
     * the request conforms to the desired shape, so it can be safely sent to
     * the server.
     */
    requestValidator?: (data: unknown) => Promise<unknown>;
    /**
     * A function transforming response data before it's returned. This is useful
     * for post-processing data, e.g. converting ISO strings into Date objects.
     */
    responseTransformer?: (data: unknown) => Promise<unknown>;
    /**
     * A function validating response data. This is useful if you want to ensure
     * the response conforms to the desired shape, so it can be safely passed to
     * the transformers and returned to the user.
     */
    responseValidator?: (data: unknown) => Promise<unknown>;
}
```

### types

<a id="sdk-dist-gen-core-types-gen-d-ts-omitnever"></a>
#### OmitNever

```ts
export type OmitNever<T extends Record<string, unknown>> = {
    [K in keyof T as IsExactlyNeverOrNeverUndefined<T[K]> extends true ? never : K]: T[K];
};
```

## dist/gen/core/serverSentEvents.gen.d.ts

### interfaces

<a id="sdk-dist-gen-core-serversentevents-gen-d-ts-streamevent"></a>
#### StreamEvent

```ts
export interface StreamEvent<TData = unknown> {
    data: TData;
    event?: string;
    id?: string;
    retry?: number;
}
```

### types

<a id="sdk-dist-gen-core-serversentevents-gen-d-ts-serversenteventsoptions"></a>
#### ServerSentEventsOptions

```ts
export type ServerSentEventsOptions<TData = unknown> = Omit<RequestInit, "method"> & Pick<Config, "method" | "responseTransformer" | "responseValidator"> & {
    /**
     * Callback invoked when a network or parsing error occurs during streaming.
     *
     * This option applies only if the endpoint returns a stream of events.
     *
     * @param error The error that occurred.
     */
    onSseError?: (error: unknown) => void;
    /**
     * Callback invoked when an event is streamed from the server.
     *
     * This option applies only if the endpoint returns a stream of events.
     *
     * @param event Event streamed from the server.
     * @returns Nothing (void).
     */
    onSseEvent?: (event: StreamEvent<TData>) => void;
    /**
     * Default retry delay in milliseconds.
     *
     * This option applies only if the endpoint returns a stream of events.
     *
     * @default 3000
     */
    sseDefaultRetryDelay?: number;
    /**
     * Maximum number of retry attempts before giving up.
     */
    sseMaxRetryAttempts?: number;
    /**
     * Maximum retry delay in milliseconds.
     *
     * Applies only when exponential backoff is used.
     *
     * This option applies only if the endpoint returns a stream of events.
     *
     * @default 30000
     */
    sseMaxRetryDelay?: number;
    /**
     * Optional sleep function for retry backoff.
     *
     * Defaults to using `setTimeout`.
     */
    sseSleepFn?: (ms: number) => Promise<void>;
    url: string;
};
```

<a id="sdk-dist-gen-core-serversentevents-gen-d-ts-serversenteventsresult"></a>
#### ServerSentEventsResult

```ts
export type ServerSentEventsResult<TData = unknown, TReturn = void, TNext = unknown> = {
    stream: AsyncGenerator<TData extends Record<string, unknown> ? TData[keyof TData] : TData, TReturn, TNext>;
};
```

### variables

<a id="sdk-dist-gen-core-serversentevents-gen-d-ts-createsseclient"></a>
#### createSseClient

```ts
createSseClient: <TData = unknown>({ onSseError, onSseEvent, responseTransformer, responseValidator, sseDefaultRetryDelay, sseMaxRetryAttempts, sseMaxRetryDelay, sseSleepFn, url, ...options }: ServerSentEventsOptions) => ServerSentEventsResult<TData>
```

## dist/gen/client/utils.gen.d.ts

### interfaces

<a id="sdk-dist-gen-client-utils-gen-d-ts-middleware"></a>
#### Middleware

```ts
export interface Middleware<Req, Res, Err, Options> {
    error: Pick<Interceptors<ErrInterceptor<Err, Res, Req, Options>>, "eject" | "use">;
    request: Pick<Interceptors<ReqInterceptor<Req, Options>>, "eject" | "use">;
    response: Pick<Interceptors<ResInterceptor<Res, Req, Options>>, "eject" | "use">;
}
```

### variables

<a id="sdk-dist-gen-client-utils-gen-d-ts-createqueryserializer"></a>
#### createQuerySerializer

```ts
createQuerySerializer: <T = unknown>({ allowReserved, array, object }?: QuerySerializerOptions) => (queryParams: T) => string
```

Infers parseAs value from provided Content-Type header.

<a id="sdk-dist-gen-client-utils-gen-d-ts-getparseas"></a>
#### getParseAs

```ts
getParseAs: (contentType: string | null) => Exclude<Config["parseAs"], "auto">
```

<a id="sdk-dist-gen-client-utils-gen-d-ts-setauthparams"></a>
#### setAuthParams

```ts
setAuthParams: ({ security, ...options }: Pick<Required<RequestOptions>, "security"> & Pick<RequestOptions, "auth" | "query"> & {
    headers: Headers;
}) => Promise<void>
```

<a id="sdk-dist-gen-client-utils-gen-d-ts-buildurl"></a>
#### buildUrl

```ts
buildUrl: Client["buildUrl"]
```

<a id="sdk-dist-gen-client-utils-gen-d-ts-mergeconfigs"></a>
#### mergeConfigs

```ts
mergeConfigs: (a: Config, b: Config) => Config
```

<a id="sdk-dist-gen-client-utils-gen-d-ts-mergeheaders"></a>
#### mergeHeaders

```ts
mergeHeaders: (...headers: Array<Required<Config>["headers"] | undefined>) => Headers
```

<a id="sdk-dist-gen-client-utils-gen-d-ts-createinterceptors"></a>
#### createInterceptors

```ts
createInterceptors: <Req, Res, Err, Options>() => {
    error: Interceptors<ErrInterceptor<Err, Res, Req, Options>>;
    request: Interceptors<ReqInterceptor<Req, Options>>;
    response: Interceptors<ResInterceptor<Res, Req, Options>>;
}
```

<a id="sdk-dist-gen-client-utils-gen-d-ts-createconfig"></a>
#### createConfig

```ts
createConfig: <T extends ClientOptions = ClientOptions>(override?: Config<Omit<ClientOptions, keyof T> & T>) => Config<Omit<ClientOptions, keyof T> & T>
```

## dist/gen/client/types.gen.d.ts

### interfaces

<a id="sdk-dist-gen-client-types-gen-d-ts-config"></a>
#### Config

```ts
export interface Config<T extends ClientOptions = ClientOptions> extends Omit<RequestInit, "body" | "headers" | "method">, CoreConfig {
    /**
     * Base URL for all requests made by this client.
     */
    baseUrl?: T["baseUrl"];
    /**
     * Fetch API implementation. You can use this option to provide a custom
     * fetch instance.
     *
     * @default globalThis.fetch
     */
    fetch?: (request: Request) => ReturnType<typeof fetch>;
    /**
     * Please don't use the Fetch client for Next.js applications. The `next`
     * options won't have any effect.
     *
     * Install {@link https://www.npmjs.com/package/@hey-api/client-next `@hey-api/client-next`} instead.
     */
    next?: never;
    /**
     * Return the response data parsed in a specified format. By default, `auto`
     * will infer the appropriate method from the `Content-Type` response header.
     * You can override this behavior with any of the {@link Body} methods.
     * Select `stream` if you don't want to parse response data at all.
     *
     * @default 'auto'
     */
    parseAs?: "arrayBuffer" | "auto" | "blob" | "formData" | "json" | "stream" | "text";
    /**
     * Should we return only data or multiple fields (data, error, response, etc.)?
     *
     * @default 'fields'
     */
    responseStyle?: ResponseStyle;
    /**
     * Throw an error instead of returning it in the response?
     *
     * @default false
     */
    throwOnError?: T["throwOnError"];
}
```

<a id="sdk-dist-gen-client-types-gen-d-ts-requestoptions"></a>
#### RequestOptions

```ts
export interface RequestOptions<TData = unknown, TResponseStyle extends ResponseStyle = "fields", ThrowOnError extends boolean = boolean, Url extends string = string> extends Config<{
    responseStyle: TResponseStyle;
    throwOnError: ThrowOnError;
}>, Pick<ServerSentEventsOptions<TData>, "onSseError" | "onSseEvent" | "sseDefaultRetryDelay" | "sseMaxRetryAttempts" | "sseMaxRetryDelay"> {
    /**
     * Any body that you want to add to your request.
     *
     * {@link https://developer.mozilla.org/docs/Web/API/fetch#body}
     */
    body?: unknown;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    /**
     * Security mechanism(s) to use for the request.
     */
    security?: ReadonlyArray<Auth>;
    url: Url;
}
```

<a id="sdk-dist-gen-client-types-gen-d-ts-resolvedrequestoptions"></a>
#### ResolvedRequestOptions

```ts
export interface ResolvedRequestOptions<TResponseStyle extends ResponseStyle = "fields", ThrowOnError extends boolean = boolean, Url extends string = string> extends RequestOptions<unknown, TResponseStyle, ThrowOnError, Url> {
    serializedBody?: string;
}
```

<a id="sdk-dist-gen-client-types-gen-d-ts-clientoptions"></a>
#### ClientOptions

```ts
export interface ClientOptions {
    baseUrl?: string;
    responseStyle?: ResponseStyle;
    throwOnError?: boolean;
}
```

<a id="sdk-dist-gen-client-types-gen-d-ts-tdatashape"></a>
#### TDataShape

```ts
export interface TDataShape {
    body?: unknown;
    headers?: unknown;
    path?: unknown;
    query?: unknown;
    url: string;
}
```

### types

<a id="sdk-dist-gen-client-types-gen-d-ts-responsestyle"></a>
#### ResponseStyle

```ts
export type ResponseStyle = "data" | "fields";
```

<a id="sdk-dist-gen-client-types-gen-d-ts-requestresult"></a>
#### RequestResult

```ts
export type RequestResult<TData = unknown, TError = unknown, ThrowOnError extends boolean = boolean, TResponseStyle extends ResponseStyle = "fields"> = ThrowOnError extends true ? Promise<TResponseStyle extends "data" ? TData extends Record<string, unknown> ? TData[keyof TData] : TData : {
    data: TData extends Record<string, unknown> ? TData[keyof TData] : TData;
    request: Request;
    response: Response;
}> : Promise<TResponseStyle extends "data" ? (TData extends Record<string, unknown> ? TData[keyof TData] : TData) | undefined : ({
    data: TData extends Record<string, unknown> ? TData[keyof TData] : TData;
    error: undefined;
} | {
    data: undefined;
    error: TError extends Record<string, unknown> ? TError[keyof TError] : TError;
}) & {
    request: Request;
    response: Response;
}>;
```

<a id="sdk-dist-gen-client-types-gen-d-ts-client"></a>
#### Client

```ts
export type Client = CoreClient<RequestFn, Config, MethodFn, BuildUrlFn> & {
    interceptors: Middleware<Request, Response, unknown, ResolvedRequestOptions>;
};
```

The `createClientConfig()` function will be called on client initialization
and the returned object will become the client's initial configuration.

You may want to initialize your client this way instead of calling
`setConfig()`. This is useful for example if you're using Next.js
to ensure your client always has the correct values.

<a id="sdk-dist-gen-client-types-gen-d-ts-createclientconfig"></a>
#### CreateClientConfig

```ts
/**
 * The `createClientConfig()` function will be called on client initialization
 * and the returned object will become the client's initial configuration.
 *
 * You may want to initialize your client this way instead of calling
 * `setConfig()`. This is useful for example if you're using Next.js
 * to ensure your client always has the correct values.
 */
export type CreateClientConfig<T extends ClientOptions = ClientOptions> = (override?: Config<ClientOptions & T>) => Config<Required<ClientOptions> & T>;
```

<a id="sdk-dist-gen-client-types-gen-d-ts-options"></a>
#### Options

```ts
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean, TResponse = unknown, TResponseStyle extends ResponseStyle = "fields"> = OmitKeys<RequestOptions<TResponse, TResponseStyle, ThrowOnError>, "body" | "path" | "query" | "url"> & Omit<TData, "url">;
```

<a id="sdk-dist-gen-client-types-gen-d-ts-optionslegacyparser"></a>
#### OptionsLegacyParser

```ts
export type OptionsLegacyParser<TData = unknown, ThrowOnError extends boolean = boolean, TResponseStyle extends ResponseStyle = "fields"> = TData extends {
    body?: any;
} ? TData extends {
    headers?: any;
} ? OmitKeys<RequestOptions<unknown, TResponseStyle, ThrowOnError>, "body" | "headers" | "url"> & TData : OmitKeys<RequestOptions<unknown, TResponseStyle, ThrowOnError>, "body" | "url"> & TData & Pick<RequestOptions<unknown, TResponseStyle, ThrowOnError>, "headers"> : TData extends {
    headers?: any;
} ? OmitKeys<RequestOptions<unknown, TResponseStyle, ThrowOnError>, "headers" | "url"> & TData & Pick<RequestOptions<unknown, TResponseStyle, ThrowOnError>, "body"> : OmitKeys<RequestOptions<unknown, TResponseStyle, ThrowOnError>, "url"> & TData;
```

## dist/gen/client/client.gen.d.ts

### variables

<a id="sdk-dist-gen-client-client-gen-d-ts-createclient"></a>
#### createClient

```ts
createClient: (config?: Config) => Client
```

## dist/gen/core/params.gen.d.ts

### interfaces

<a id="sdk-dist-gen-core-params-gen-d-ts-fields"></a>
#### Fields

```ts
export interface Fields {
    allowExtra?: Partial<Record<Slot, boolean>>;
    args?: ReadonlyArray<Field>;
}
```

### types

<a id="sdk-dist-gen-core-params-gen-d-ts-field"></a>
#### Field

```ts
export type Field = {
    in: Exclude<Slot, "body">;
    /**
     * Field name. This is the name we want the user to see and use.
     */
    key: string;
    /**
     * Field mapped name. This is the name we want to use in the request.
     * If omitted, we use the same value as `key`.
     */
    map?: string;
} | {
    in: Extract<Slot, "body">;
    /**
     * Key isn't required for bodies.
     */
    key?: string;
    map?: string;
};
```

<a id="sdk-dist-gen-core-params-gen-d-ts-fieldsconfig"></a>
#### FieldsConfig

```ts
export type FieldsConfig = ReadonlyArray<Field | Fields>;
```

### variables

<a id="sdk-dist-gen-core-params-gen-d-ts-buildclientparams"></a>
#### buildClientParams

```ts
buildClientParams: (args: ReadonlyArray<unknown>, fields: FieldsConfig) => Params
```

## dist/gen/client/index.d.ts

### interfaces

<a id="sdk-dist-gen-client-index-d-ts-auth"></a>
#### Auth

```ts
export interface Auth {
    in?: rchParams | dySerial | er, } fro;
    name?: string;
    scheme?: lient.ge | js";
expo;
    type: lient, Cl | ntOptio;
}
```

<a id="sdk-dist-gen-client-index-d-ts-queryserializeroptions"></a>
#### QuerySerializerOptions

```ts
export interface QuerySerializerOptions {
    allowReserved?: boolean;
    array?: SerializerOptions<ArrayStyle>;
    object?: SerializerOptions<ObjectStyle>;
}
```

<a id="sdk-dist-gen-client-index-d-ts-clientoptions"></a>
#### ClientOptions

```ts
export interface ClientOptions {
    baseUrl?: string;
    responseStyle?: ResponseStyle;
    throwOnError?: boolean;
}
```

<a id="sdk-dist-gen-client-index-d-ts-config"></a>
#### Config

```ts
export interface Config<T extends ClientOptions = ClientOptions> extends Omit<RequestInit, s, Opti | sLegacyPar | r, Reques>, CoreConfig {
    baseUrl?: T[xport { c];
    fetch?: (request: Request) => ReturnType<typeof fetch>;
    next?: never;
    parseAs?:  |  |  |  |  |  | ;
    responseStyle?: ResponseStyle;
    throwOnError?: T[];
}
```

<a id="sdk-dist-gen-client-index-d-ts-requestoptions"></a>
#### RequestOptions

```ts
export interface RequestOptions<TData = unknown, TResponseStyle extends ResponseStyle = , ThrowOnError extends boolean = boolean, Url extends string = string> extends Config<{
    responseStyle: TResponseStyle;
    throwOnError: ThrowOnError;
}>, Pick<ServerSentEventsOptions<TData>,  |  |  |  | > {
    body?: unknown;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    security?: ReadonlyArray<Auth>;
    url: Url;
}
```

<a id="sdk-dist-gen-client-index-d-ts-resolvedrequestoptions"></a>
#### ResolvedRequestOptions

```ts
export interface ResolvedRequestOptions<TResponseStyle extends ResponseStyle = , ThrowOnError extends boolean = boolean, Url extends string = string> extends RequestOptions<unknown, TResponseStyle, ThrowOnError, Url> {
    serializedBody?: string;
}
```

<a id="sdk-dist-gen-client-index-d-ts-tdatashape"></a>
#### TDataShape

```ts
export interface TDataShape {
    body?: unknown;
    headers?: unknown;
    path?: unknown;
    query?: unknown;
    url: string;
}
```

### types

<a id="sdk-dist-gen-client-index-d-ts-client"></a>
#### Client

```ts
export type Client = CoreClient<RequestFn, Config, MethodFn, BuildUrlFn> & {
    interceptors: Middleware<Request, Response, unknown, ResolvedRequestOptions>;
};
```

The `createClientConfig()` function will be called on client initialization
and the returned object will become the client's initial configuration.

You may want to initialize your client this way instead of calling
`setConfig()`. This is useful for example if you're using Next.js
to ensure your client always has the correct values.

<a id="sdk-dist-gen-client-index-d-ts-createclientconfig"></a>
#### CreateClientConfig

```ts
export type CreateClientConfig<T extends ClientOptions = ClientOptions> = (override?: Config<ClientOptions & T>) => Config<Required<ClientOptions> & T>;
```

<a id="sdk-dist-gen-client-index-d-ts-options"></a>
#### Options

```ts
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean, TResponse = unknown, TResponseStyle extends ResponseStyle = > = OmitKeys<RequestOptions<TResponse, TResponseStyle, ThrowOnError>,  |  |  | > & Omit<TData, >;
```

<a id="sdk-dist-gen-client-index-d-ts-optionslegacyparser"></a>
#### OptionsLegacyParser

```ts
export type OptionsLegacyParser<TData = unknown, ThrowOnError extends boolean = boolean, TResponseStyle extends ResponseStyle = > = TData extends {
    body?: any;
} ? TData extends {
    headers?: any;
} ? OmitKeys<RequestOptions<unknown, TResponseStyle, ThrowOnError>,  |  | > & TData : OmitKeys<RequestOptions<unknown, TResponseStyle, ThrowOnError>,  | > & TData & Pick<RequestOptions<unknown, TResponseStyle, ThrowOnError>, > : TData extends {
    headers?: any;
} ? OmitKeys<RequestOptions<unknown, TResponseStyle, ThrowOnError>,  | > & TData & Pick<RequestOptions<unknown, TResponseStyle, ThrowOnError>, > : OmitKeys<RequestOptions<unknown, TResponseStyle, ThrowOnError>, > & TData;
```

<a id="sdk-dist-gen-client-index-d-ts-requestresult"></a>
#### RequestResult

```ts
export type RequestResult<TData = unknown, TError = unknown, ThrowOnError extends boolean = boolean, TResponseStyle extends ResponseStyle = > = ThrowOnError extends true ? Promise<TResponseStyle extends  ? TData extends Record<string, unknown> ? TData[keyof TData] : TData : {
    data: TData extends Record<string, unknown> ? TData[keyof TData] : TData;
    request: Request;
    response: Response;
}> : Promise<TResponseStyle extends  ? (TData extends Record<string, unknown> ? TData[keyof TData] : TData) | undefined : ({
    data: TData extends Record<string, unknown> ? TData[keyof TData] : TData;
    error: undefined;
} | {
    data: undefined;
    error: TError extends Record<string, unknown> ? TError[keyof TError] : TError;
}) & {
    request: Request;
    response: Response;
}>;
```

<a id="sdk-dist-gen-client-index-d-ts-responsestyle"></a>
#### ResponseStyle

```ts
export type ResponseStyle = createC | ent } fro;
```

### variables

<a id="sdk-dist-gen-client-index-d-ts-formdatabodyserializer"></a>
#### formDataBodySerializer

```ts
formDataBodySerializer: {
    bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(body: T) => FormData;
}
```

<a id="sdk-dist-gen-client-index-d-ts-jsonbodyserializer"></a>
#### jsonBodySerializer

```ts
jsonBodySerializer: {
    bodySerializer: <T>(body: T) => string;
}
```

<a id="sdk-dist-gen-client-index-d-ts-urlsearchparamsbodyserializer"></a>
#### urlSearchParamsBodySerializer

```ts
urlSearchParamsBodySerializer: {
    bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(body: T) => string;
}
```

<a id="sdk-dist-gen-client-index-d-ts-buildclientparams"></a>
#### buildClientParams

```ts
buildClientParams: (args: ReadonlyArray<unknown>, fields: FieldsConfig) => Params
```

<a id="sdk-dist-gen-client-index-d-ts-createclient"></a>
#### createClient

```ts
createClient: (config?: Config) => Client
```

<a id="sdk-dist-gen-client-index-d-ts-createconfig"></a>
#### createConfig

```ts
createConfig: <T extends ClientOptions = ClientOptions>(override?: Config<Omit<ClientOptions, keyof T> & T>) => Config<Omit<ClientOptions, keyof T> & T>
```

<a id="sdk-dist-gen-client-index-d-ts-mergeheaders"></a>
#### mergeHeaders

```ts
mergeHeaders: (...headers: Array<Required<Config>[] | undefined>) => Headers
```

## dist/gen/sdk.gen.d.ts

### classs

<a id="sdk-dist-gen-sdk-gen-d-ts-opencodeclient"></a>
#### OpencodeClient

```ts
export declare class OpencodeClient extends _HeyApiClient {
    /**
     * Respond to a permission request
     */
    postSessionIdPermissionsPermissionId<ThrowOnError extends boolean = false>(options: Options<PostSessionIdPermissionsPermissionIdData, ThrowOnError>): import("./client/types.gen.js").RequestResult<PostSessionIdPermissionsPermissionIdResponses, PostSessionIdPermissionsPermissionIdErrors, ThrowOnError, "fields">;
    global: Global;
    project: Project;
    config: Config;
    tool: Tool;
    instance: Instance;
    path: Path;
    vcs: Vcs;
    session: Session;
    command: Command;
    provider: Provider;
    find: Find;
    file: File;
    app: App;
    mcp: Mcp;
    lsp: Lsp;
    formatter: Formatter;
    tui: Tui;
    auth: Auth;
    event: Event;
}
```

### types

<a id="sdk-dist-gen-sdk-gen-d-ts-options"></a>
#### Options

```ts
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};
```

## dist/client.js

### classs

<a id="sdk-dist-client-js-opencodeclient"></a>
#### OpencodeClient

```ts
export declare class OpencodeClient extends _HeyApiClient {
    postSessionIdPermissionsPermissionId<ThrowOnError extends boolean = false>(options: Options<PostSessionIdPermissionsPermissionIdData, ThrowOnError>): import().RequestResult<PostSessionIdPermissionsPermissionIdResponses, PostSessionIdPermissionsPermissionIdErrors, ThrowOnError, >;
    global: Global;
    project: Project;
    config: Config;
    tool: Tool;
    instance: Instance;
    path: Path;
    vcs: Vcs;
    session: Session;
    command: Command;
    provider: Provider;
    find: Find;
    file: File;
    app: App;
    mcp: Mcp;
    lsp: Lsp;
    formatter: Formatter;
    tui: Tui;
    auth: Auth;
    event: Event;
}
```

### functions

<a id="sdk-dist-client-js-createopencodeclient"></a>
#### createOpencodeClient

```ts
export function createOpencodeClient(config) {
    if (!config?.fetch) {
        config = {
            ...config,
            fetch: (req) => {
                // @ts-ignore
                req.timeout = false;
                return fetch(req);
            },
        };
    }
    if (config?.directory) {
        config.headers = {
            ...config.headers,
            "x-opencode-directory": config.directory,
        };
    }
    const client = createClient(config);
    return new OpencodeClient({ client });
}
```

### types

<a id="sdk-dist-client-js-eventinstallationupdated"></a>
#### EventInstallationUpdated

```ts
export type EventInstallationUpdated = {
    type: odeClient };
import { c;
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-client-js-eventinstallationupdateavailable"></a>
#### EventInstallationUpdateAvailable

```ts
export type EventInstallationUpdateAvailable = {
    type: on createOpencodeClient(config) ;
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-client-js-eventlspclientdiagnostics"></a>
#### EventLspClientDiagnostics

```ts
export type EventLspClientDiagnostics = {
    type // @ts-ignore
    :                ;
    properties: {
        serverID: string;
        path: string;
    };
};
```

<a id="sdk-dist-client-js-eventlspupdated"></a>
#### EventLspUpdated

```ts
export type EventLspUpdated = {
    type: directory) {
 ;
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-js-filediff"></a>
#### FileDiff

```ts
export type FileDiff = {
    file: string;
    before: string;
    after: string;
    additions: number;
    deletions: number;
};
```

<a id="sdk-dist-client-js-usermessage"></a>
#### UserMessage

```ts
export type UserMessage = {
    id: string;
    sessionID: string;
    role: ;
    time: {
        created: number;
    };
    summary?: {
        title?: string;
        body?: string;
        diffs: Array<FileDiff>;
    };
    agent: string;
    model: {
        providerID: string;
        modelID: string;
    };
    system?: string;
    tools?: {
        [key: string]: boolean;
    };
};
```

<a id="sdk-dist-client-js-providerautherror"></a>
#### ProviderAuthError

```ts
export type ProviderAuthError = {
    name: ;
    data: {
        providerID: string;
        message: string;
    };
};
```

<a id="sdk-dist-client-js-unknownerror"></a>
#### UnknownError

```ts
export type UnknownError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-client-js-messageoutputlengtherror"></a>
#### MessageOutputLengthError

```ts
export type MessageOutputLengthError = {
    name: ;
    data: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-js-messageabortederror"></a>
#### MessageAbortedError

```ts
export type MessageAbortedError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-client-js-apierror"></a>
#### ApiError

```ts
export type ApiError = {
    name: ;
    data: {
        message: string;
        statusCode?: number;
        isRetryable: boolean;
        responseHeaders?: {
            [key: string]: string;
        };
        responseBody?: string;
    };
};
```

<a id="sdk-dist-client-js-assistantmessage"></a>
#### AssistantMessage

```ts
export type AssistantMessage = {
    id: string;
    sessionID: string;
    role: ;
    time: {
        created: number;
        completed?: number;
    };
    error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    parentID: string;
    modelID: string;
    providerID: string;
    mode: string;
    path: {
        cwd: string;
        root: string;
    };
    summary?: boolean;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
    finish?: string;
};
```

<a id="sdk-dist-client-js-message"></a>
#### Message

```ts
export type Message = UserMessage | AssistantMessage;
```

<a id="sdk-dist-client-js-eventmessageupdated"></a>
#### EventMessageUpdated

```ts
export type EventMessageUpdated = {
    type: ;
    properties: {
        info: Message;
    };
};
```

<a id="sdk-dist-client-js-eventmessageremoved"></a>
#### EventMessageRemoved

```ts
export type EventMessageRemoved = {
    type: ;
    properties: {
        sessionID: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-client-js-textpart"></a>
#### TextPart

```ts
export type TextPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-js-reasoningpart"></a>
#### ReasoningPart

```ts
export type ReasoningPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    text: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end?: number;
    };
};
```

<a id="sdk-dist-client-js-filepartsourcetext"></a>
#### FilePartSourceText

```ts
export type FilePartSourceText = {
    value: string;
    start: number;
    end: number;
};
```

<a id="sdk-dist-client-js-filesource"></a>
#### FileSource

```ts
export type FileSource = {
    text: FilePartSourceText;
    type: ;
    path: string;
};
```

<a id="sdk-dist-client-js-range"></a>
#### Range

```ts
export type Range = {
    start: {
        line: number;
        character: number;
    };
    end: {
        line: number;
        character: number;
    };
};
```

<a id="sdk-dist-client-js-symbolsource"></a>
#### SymbolSource

```ts
export type SymbolSource = {
    text: FilePartSourceText;
    type: ;
    path: string;
    range: Range;
    name: string;
    kind: number;
};
```

<a id="sdk-dist-client-js-filepartsource"></a>
#### FilePartSource

```ts
export type FilePartSource = FileSource | SymbolSource;
```

<a id="sdk-dist-client-js-filepart"></a>
#### FilePart

```ts
export type FilePart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-client-js-toolstatepending"></a>
#### ToolStatePending

```ts
export type ToolStatePending = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    raw: string;
};
```

<a id="sdk-dist-client-js-toolstaterunning"></a>
#### ToolStateRunning

```ts
export type ToolStateRunning = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    title?: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
    };
};
```

<a id="sdk-dist-client-js-toolstatecompleted"></a>
#### ToolStateCompleted

```ts
export type ToolStateCompleted = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    output: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
        compacted?: number;
    };
    attachments?: Array<FilePart>;
};
```

<a id="sdk-dist-client-js-toolstateerror"></a>
#### ToolStateError

```ts
export type ToolStateError = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    error: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-client-js-toolstate"></a>
#### ToolState

```ts
export type ToolState = ToolStatePending | ToolStateRunning | ToolStateCompleted | ToolStateError;
```

<a id="sdk-dist-client-js-toolpart"></a>
#### ToolPart

```ts
export type ToolPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    callID: string;
    tool: string;
    state: ToolState;
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-js-stepstartpart"></a>
#### StepStartPart

```ts
export type StepStartPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    snapshot?: string;
};
```

<a id="sdk-dist-client-js-stepfinishpart"></a>
#### StepFinishPart

```ts
export type StepFinishPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    reason: string;
    snapshot?: string;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
};
```

<a id="sdk-dist-client-js-snapshotpart"></a>
#### SnapshotPart

```ts
export type SnapshotPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    snapshot: string;
};
```

<a id="sdk-dist-client-js-patchpart"></a>
#### PatchPart

```ts
export type PatchPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    hash: string;
    files: Array<string>;
};
```

<a id="sdk-dist-client-js-agentpart"></a>
#### AgentPart

```ts
export type AgentPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-client-js-retrypart"></a>
#### RetryPart

```ts
export type RetryPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    attempt: number;
    error: ApiError;
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-client-js-compactionpart"></a>
#### CompactionPart

```ts
export type CompactionPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    auto: boolean;
};
```

<a id="sdk-dist-client-js-part"></a>
#### Part

```ts
export type Part = TextPart | {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    prompt: string;
    description: string;
    agent: string;
} | ReasoningPart | FilePart | ToolPart | StepStartPart | StepFinishPart | SnapshotPart | PatchPart | AgentPart | RetryPart | CompactionPart;
```

<a id="sdk-dist-client-js-eventmessagepartupdated"></a>
#### EventMessagePartUpdated

```ts
export type EventMessagePartUpdated = {
    type: ;
    properties: {
        part: Part;
        delta?: string;
    };
};
```

<a id="sdk-dist-client-js-eventmessagepartremoved"></a>
#### EventMessagePartRemoved

```ts
export type EventMessagePartRemoved = {
    type: ;
    properties: {
        sessionID: string;
        messageID: string;
        partID: string;
    };
};
```

<a id="sdk-dist-client-js-permission"></a>
#### Permission

```ts
export type Permission = {
    id: string;
    type: string;
    pattern?: string | Array<string>;
    sessionID: string;
    messageID: string;
    callID?: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-client-js-eventpermissionupdated"></a>
#### EventPermissionUpdated

```ts
export type EventPermissionUpdated = {
    type: ;
    properties: Permission;
};
```

<a id="sdk-dist-client-js-eventpermissionreplied"></a>
#### EventPermissionReplied

```ts
export type EventPermissionReplied = {
    type: ;
    properties: {
        sessionID: string;
        permissionID: string;
        response: string;
    };
};
```

<a id="sdk-dist-client-js-sessionstatus"></a>
#### SessionStatus

```ts
export type SessionStatus = {
    type: ;
} | {
    type: ;
    attempt: number;
    message: string;
    next: number;
} | {
    type: ;
};
```

<a id="sdk-dist-client-js-eventsessionstatus"></a>
#### EventSessionStatus

```ts
export type EventSessionStatus = {
    type: ;
    properties: {
        sessionID: string;
        status: SessionStatus;
    };
};
```

<a id="sdk-dist-client-js-eventsessionidle"></a>
#### EventSessionIdle

```ts
export type EventSessionIdle = {
    type: ;
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-client-js-eventsessioncompacted"></a>
#### EventSessionCompacted

```ts
export type EventSessionCompacted = {
    type: ;
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-client-js-eventfileedited"></a>
#### EventFileEdited

```ts
export type EventFileEdited = {
    type: ;
    properties: {
        file: string;
    };
};
```

<a id="sdk-dist-client-js-todo"></a>
#### Todo

```ts
export type Todo = {
    content: string;
    status: string;
    priority: string;
    id: string;
};
```

<a id="sdk-dist-client-js-eventtodoupdated"></a>
#### EventTodoUpdated

```ts
export type EventTodoUpdated = {
    type: ;
    properties: {
        sessionID: string;
        todos: Array<Todo>;
    };
};
```

<a id="sdk-dist-client-js-eventcommandexecuted"></a>
#### EventCommandExecuted

```ts
export type EventCommandExecuted = {
    type: ;
    properties: {
        name: string;
        sessionID: string;
        arguments: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-client-js-session"></a>
#### Session

```ts
export type Session = {
    id: string;
    projectID: string;
    directory: string;
    parentID?: string;
    summary?: {
        additions: number;
        deletions: number;
        files: number;
        diffs?: Array<FileDiff>;
    };
    share?: {
        url: string;
    };
    title: string;
    version: string;
    time: {
        created: number;
        updated: number;
        compacting?: number;
    };
    revert?: {
        messageID: string;
        partID?: string;
        snapshot?: string;
        diff?: string;
    };
};
```

<a id="sdk-dist-client-js-eventsessioncreated"></a>
#### EventSessionCreated

```ts
export type EventSessionCreated = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-client-js-eventsessionupdated"></a>
#### EventSessionUpdated

```ts
export type EventSessionUpdated = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-client-js-eventsessiondeleted"></a>
#### EventSessionDeleted

```ts
export type EventSessionDeleted = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-client-js-eventsessiondiff"></a>
#### EventSessionDiff

```ts
export type EventSessionDiff = {
    type: ;
    properties: {
        sessionID: string;
        diff: Array<FileDiff>;
    };
};
```

<a id="sdk-dist-client-js-eventsessionerror"></a>
#### EventSessionError

```ts
export type EventSessionError = {
    type: ;
    properties: {
        sessionID?: string;
        error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    };
};
```

<a id="sdk-dist-client-js-eventfilewatcherupdated"></a>
#### EventFileWatcherUpdated

```ts
export type EventFileWatcherUpdated = {
    type: ;
    properties: {
        file: string;
        event:  |  | ;
    };
};
```

<a id="sdk-dist-client-js-eventvcsbranchupdated"></a>
#### EventVcsBranchUpdated

```ts
export type EventVcsBranchUpdated = {
    type: ;
    properties: {
        branch?: string;
    };
};
```

<a id="sdk-dist-client-js-eventtuipromptappend"></a>
#### EventTuiPromptAppend

```ts
export type EventTuiPromptAppend = {
    type: ;
    properties: {
        text: string;
    };
};
```

<a id="sdk-dist-client-js-eventtuicommandexecute"></a>
#### EventTuiCommandExecute

```ts
export type EventTuiCommandExecute = {
    type: ;
    properties: {
        command: ( |  |  |  |  |  |  |  |  |  |  |  |  | ) | string;
    };
};
```

<a id="sdk-dist-client-js-eventtuitoastshow"></a>
#### EventTuiToastShow

```ts
export type EventTuiToastShow = {
    type: ;
    properties: {
        title?: string;
        message: string;
        variant:  |  |  | ;
        duration?: number;
    };
};
```

<a id="sdk-dist-client-js-eventserverconnected"></a>
#### EventServerConnected

```ts
export type EventServerConnected = {
    type: ;
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-js-event"></a>
#### Event

```ts
export type Event = EventInstallationUpdated | EventInstallationUpdateAvailable | EventLspClientDiagnostics | EventLspUpdated | EventMessageUpdated | EventMessageRemoved | EventMessagePartUpdated | EventMessagePartRemoved | EventPermissionUpdated | EventPermissionReplied | EventSessionStatus | EventSessionIdle | EventSessionCompacted | EventFileEdited | EventTodoUpdated | EventCommandExecuted | EventSessionCreated | EventSessionUpdated | EventSessionDeleted | EventSessionDiff | EventSessionError | EventFileWatcherUpdated | EventVcsBranchUpdated | EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow | EventServerConnected;
```

<a id="sdk-dist-client-js-globalevent"></a>
#### GlobalEvent

```ts
export type GlobalEvent = {
    directory: string;
    payload: Event;
};
```

<a id="sdk-dist-client-js-project"></a>
#### Project

```ts
export type Project = {
    id: string;
    worktree: string;
    vcsDir?: string;
    vcs?: ;
    time: {
        created: number;
        initialized?: number;
    };
};
```

Custom keybind configurations

<a id="sdk-dist-client-js-keybindsconfig"></a>
#### KeybindsConfig

```ts
export type KeybindsConfig = {
    leader?: string;
    app_exit?: string;
    editor_open?: string;
    theme_list?: string;
    sidebar_toggle?: string;
    status_view?: string;
    session_export?: string;
    session_new?: string;
    session_list?: string;
    session_timeline?: string;
    session_share?: string;
    session_unshare?: string;
    session_interrupt?: string;
    session_compact?: string;
    messages_page_up?: string;
    messages_page_down?: string;
    messages_half_page_up?: string;
    messages_half_page_down?: string;
    messages_first?: string;
    messages_last?: string;
    messages_copy?: string;
    messages_undo?: string;
    messages_redo?: string;
    messages_toggle_conceal?: string;
    model_list?: string;
    model_cycle_recent?: string;
    model_cycle_recent_reverse?: string;
    command_list?: string;
    agent_list?: string;
    agent_cycle?: string;
    agent_cycle_reverse?: string;
    input_clear?: string;
    input_forward_delete?: string;
    input_paste?: string;
    input_submit?: string;
    input_newline?: string;
    history_previous?: string;
    history_next?: string;
    session_child_cycle?: string;
    session_child_cycle_reverse?: string;
    terminal_suspend?: string;
};
```

<a id="sdk-dist-client-js-agentconfig"></a>
#### AgentConfig

```ts
export type AgentConfig = {
    model?: string;
    temperature?: number;
    top_p?: number;
    prompt?: string;
    tools?: {
        [key: string]: boolean;
    };
    disable?: boolean;
    description?: string;
    mode?:  |  | ;
    color?: string;
    permission?: {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    [key: string]: unknown | string | number | {
        [key: string]: boolean;
    } | boolean | ( |  | ) | {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    } | undefined;
};
```

<a id="sdk-dist-client-js-mcplocalconfig"></a>
#### McpLocalConfig

```ts
export type McpLocalConfig = {
    type: ;
    command: Array<string>;
    environment?: {
        [key: string]: string;
    };
    enabled?: boolean;
    timeout?: number;
};
```

<a id="sdk-dist-client-js-mcpremoteconfig"></a>
#### McpRemoteConfig

```ts
export type McpRemoteConfig = {
    type: ;
    url: string;
    enabled?: boolean;
    headers?: {
        [key: string]: string;
    };
    timeout?: number;
};
```

<a id="sdk-dist-client-js-layoutconfig"></a>
#### LayoutConfig

```ts
export type LayoutConfig =  | ;
```

<a id="sdk-dist-client-js-config"></a>
#### Config

```ts
export type Config = {
    $schema?: string;
    theme?: string;
    keybinds?: KeybindsConfig;
    tui?: {
        scroll_speed?: number;
        scroll_acceleration?: {
            enabled: boolean;
        };
        diff_style?:  | ;
    };
    command?: {
        [key: string]: {
            template: string;
            description?: string;
            agent?: string;
            model?: string;
            subtask?: boolean;
        };
    };
    watcher?: {
        ignore?: Array<string>;
    };
    plugin?: Array<string>;
    snapshot?: boolean;
    share?:  |  | ;
    autoshare?: boolean;
    autoupdate?: boolean | ;
    disabled_providers?: Array<string>;
    enabled_providers?: Array<string>;
    model?: string;
    small_model?: string;
    username?: string;
    mode?: {
        build?: AgentConfig;
        plan?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    agent?: {
        plan?: AgentConfig;
        build?: AgentConfig;
        general?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    provider?: {
        [key: string]: {
            api?: string;
            name?: string;
            env?: Array<string>;
            id?: string;
            npm?: string;
            models?: {
                [key: string]: {
                    id?: string;
                    name?: string;
                    release_date?: string;
                    attachment?: boolean;
                    reasoning?: boolean;
                    temperature?: boolean;
                    tool_call?: boolean;
                    cost?: {
                        input: number;
                        output: number;
                        cache_read?: number;
                        cache_write?: number;
                        context_over_200k?: {
                            input: number;
                            output: number;
                            cache_read?: number;
                            cache_write?: number;
                        };
                    };
                    limit?: {
                        context: number;
                        output: number;
                    };
                    modalities?: {
                        input: Array< |  |  |  | >;
                        output: Array< |  |  |  | >;
                    };
                    experimental?: boolean;
                    status?:  |  | ;
                    options?: {
                        [key: string]: unknown;
                    };
                    headers?: {
                        [key: string]: string;
                    };
                    provider?: {
                        npm: string;
                    };
                };
            };
            whitelist?: Array<string>;
            blacklist?: Array<string>;
            options?: {
                apiKey?: string;
                baseURL?: string;
                enterpriseUrl?: string;
                setCacheKey?: boolean;
                timeout?: number | false;
                [key: string]: unknown | string | boolean | (number | false) | undefined;
            };
        };
    };
    mcp?: {
        [key: string]: McpLocalConfig | McpRemoteConfig;
    };
    formatter?: false | {
        [key: string]: {
            disabled?: boolean;
            command?: Array<string>;
            environment?: {
                [key: string]: string;
            };
            extensions?: Array<string>;
        };
    };
    lsp?: false | {
        [key: string]: {
            disabled: true;
        } | {
            command: Array<string>;
            extensions?: Array<string>;
            disabled?: boolean;
            env?: {
                [key: string]: string;
            };
            initialization?: {
                [key: string]: unknown;
            };
        };
    };
    instructions?: Array<string>;
    layout?: LayoutConfig;
    permission?: {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    tools?: {
        [key: string]: boolean;
    };
    enterprise?: {
        url?: string;
    };
    experimental?: {
        hook?: {
            file_edited?: {
                [key: string]: Array<{
                    command: Array<string>;
                    environment?: {
                        [key: string]: string;
                    };
                }>;
            };
            session_completed?: Array<{
                command: Array<string>;
                environment?: {
                    [key: string]: string;
                };
            }>;
        };
        chatMaxRetries?: number;
        disable_paste_summary?: boolean;
        batch_tool?: boolean;
    };
};
```

<a id="sdk-dist-client-js-badrequesterror"></a>
#### BadRequestError

```ts
export type BadRequestError = {
    data: unknown;
    errors: Array<{
        [key: string]: unknown;
    }>;
    success: false;
};
```

<a id="sdk-dist-client-js-toolids"></a>
#### ToolIds

```ts
export type ToolIds = Array<string>;
```

<a id="sdk-dist-client-js-toollistitem"></a>
#### ToolListItem

```ts
export type ToolListItem = {
    id: string;
    description: string;
    parameters: unknown;
};
```

<a id="sdk-dist-client-js-toollist"></a>
#### ToolList

```ts
export type ToolList = Array<ToolListItem>;
```

<a id="sdk-dist-client-js-path"></a>
#### Path

```ts
export type Path = {
    state: string;
    config: string;
    worktree: string;
    directory: string;
};
```

<a id="sdk-dist-client-js-vcsinfo"></a>
#### VcsInfo

```ts
export type VcsInfo = {
    branch: string;
};
```

<a id="sdk-dist-client-js-notfounderror"></a>
#### NotFoundError

```ts
export type NotFoundError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-client-js-textpartinput"></a>
#### TextPartInput

```ts
export type TextPartInput = {
    id?: string;
    type: ;
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-js-filepartinput"></a>
#### FilePartInput

```ts
export type FilePartInput = {
    id?: string;
    type: ;
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-client-js-agentpartinput"></a>
#### AgentPartInput

```ts
export type AgentPartInput = {
    id?: string;
    type: ;
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-client-js-subtaskpartinput"></a>
#### SubtaskPartInput

```ts
export type SubtaskPartInput = {
    id?: string;
    type: ;
    prompt: string;
    description: string;
    agent: string;
};
```

<a id="sdk-dist-client-js-command"></a>
#### Command

```ts
export type Command = {
    name: string;
    description?: string;
    agent?: string;
    model?: string;
    template: string;
    subtask?: boolean;
};
```

<a id="sdk-dist-client-js-model"></a>
#### Model

```ts
export type Model = {
    id: string;
    name: string;
    release_date: string;
    attachment: boolean;
    reasoning: boolean;
    temperature: boolean;
    tool_call: boolean;
    cost: {
        input: number;
        output: number;
        cache_read?: number;
        cache_write?: number;
        context_over_200k?: {
            input: number;
            output: number;
            cache_read?: number;
            cache_write?: number;
        };
    };
    limit: {
        context: number;
        output: number;
    };
    modalities?: {
        input: Array< |  |  |  | >;
        output: Array< |  |  |  | >;
    };
    experimental?: boolean;
    status?:  |  | ;
    options: {
        [key: string]: unknown;
    };
    headers?: {
        [key: string]: string;
    };
    provider?: {
        npm: string;
    };
};
```

<a id="sdk-dist-client-js-provider"></a>
#### Provider

```ts
export type Provider = {
    api?: string;
    name: string;
    env: Array<string>;
    id: string;
    npm?: string;
    models: {
        [key: string]: Model;
    };
};
```

<a id="sdk-dist-client-js-providerauthmethod"></a>
#### ProviderAuthMethod

```ts
export type ProviderAuthMethod = {
    type:  | ;
    label: string;
};
```

<a id="sdk-dist-client-js-providerauthauthorization"></a>
#### ProviderAuthAuthorization

```ts
export type ProviderAuthAuthorization = {
    url: string;
    method:  | ;
    instructions: string;
};
```

<a id="sdk-dist-client-js-symbol"></a>
#### Symbol

```ts
export type Symbol = {
    name: string;
    kind: number;
    location: {
        uri: string;
        range: Range;
    };
};
```

<a id="sdk-dist-client-js-filenode"></a>
#### FileNode

```ts
export type FileNode = {
    name: string;
    path: string;
    absolute: string;
    type:  | ;
    ignored: boolean;
};
```

<a id="sdk-dist-client-js-filecontent"></a>
#### FileContent

```ts
export type FileContent = {
    type: ;
    content: string;
    diff?: string;
    patch?: {
        oldFileName: string;
        newFileName: string;
        oldHeader?: string;
        newHeader?: string;
        hunks: Array<{
            oldStart: number;
            oldLines: number;
            newStart: number;
            newLines: number;
            lines: Array<string>;
        }>;
        index?: string;
    };
    encoding?: ;
    mimeType?: string;
};
```

<a id="sdk-dist-client-js-file"></a>
#### File

```ts
export type File = {
    path: string;
    added: number;
    removed: number;
    status:  |  | ;
};
```

<a id="sdk-dist-client-js-agent"></a>
#### Agent

```ts
export type Agent = {
    name: string;
    description?: string;
    mode:  |  | ;
    builtIn: boolean;
    topP?: number;
    temperature?: number;
    color?: string;
    permission: {
        edit:  |  | ;
        bash: {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    model?: {
        modelID: string;
        providerID: string;
    };
    prompt?: string;
    tools: {
        [key: string]: boolean;
    };
    options: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-js-mcpstatusconnected"></a>
#### McpStatusConnected

```ts
export type McpStatusConnected = {
    status: ;
};
```

<a id="sdk-dist-client-js-mcpstatusdisabled"></a>
#### McpStatusDisabled

```ts
export type McpStatusDisabled = {
    status: ;
};
```

<a id="sdk-dist-client-js-mcpstatusfailed"></a>
#### McpStatusFailed

```ts
export type McpStatusFailed = {
    status: ;
    error: string;
};
```

<a id="sdk-dist-client-js-mcpstatus"></a>
#### McpStatus

```ts
export type McpStatus = McpStatusConnected | McpStatusDisabled | McpStatusFailed;
```

<a id="sdk-dist-client-js-lspstatus"></a>
#### LspStatus

```ts
export type LspStatus = {
    id: string;
    name: string;
    root: string;
    status:  | ;
};
```

<a id="sdk-dist-client-js-formatterstatus"></a>
#### FormatterStatus

```ts
export type FormatterStatus = {
    name: string;
    extensions: Array<string>;
    enabled: boolean;
};
```

<a id="sdk-dist-client-js-oauth"></a>
#### OAuth

```ts
export type OAuth = {
    type: ;
    refresh: string;
    access: string;
    expires: number;
    enterpriseUrl?: string;
};
```

<a id="sdk-dist-client-js-apiauth"></a>
#### ApiAuth

```ts
export type ApiAuth = {
    type: ;
    key: string;
};
```

<a id="sdk-dist-client-js-wellknownauth"></a>
#### WellKnownAuth

```ts
export type WellKnownAuth = {
    type: ;
    key: string;
    token: string;
};
```

<a id="sdk-dist-client-js-auth"></a>
#### Auth

```ts
export type Auth = OAuth | ApiAuth | WellKnownAuth;
```

<a id="sdk-dist-client-js-globaleventdata"></a>
#### GlobalEventData

```ts
export type GlobalEventData = {
    body?: never;
    path?: never;
    query?: never;
    url: ;
};
```

<a id="sdk-dist-client-js-globaleventresponses"></a>
#### GlobalEventResponses

```ts
export type GlobalEventResponses = {
    : GlobalEvent;
};
```

<a id="sdk-dist-client-js-globaleventresponse"></a>
#### GlobalEventResponse

```ts
export type GlobalEventResponse = GlobalEventResponses[keyof GlobalEventResponses];
```

<a id="sdk-dist-client-js-projectlistdata"></a>
#### ProjectListData

```ts
export type ProjectListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-projectlistresponses"></a>
#### ProjectListResponses

```ts
export type ProjectListResponses = {
    : Array<Project>;
};
```

<a id="sdk-dist-client-js-projectlistresponse"></a>
#### ProjectListResponse

```ts
export type ProjectListResponse = ProjectListResponses[keyof ProjectListResponses];
```

<a id="sdk-dist-client-js-projectcurrentdata"></a>
#### ProjectCurrentData

```ts
export type ProjectCurrentData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-projectcurrentresponses"></a>
#### ProjectCurrentResponses

```ts
export type ProjectCurrentResponses = {
    : Project;
};
```

<a id="sdk-dist-client-js-projectcurrentresponse"></a>
#### ProjectCurrentResponse

```ts
export type ProjectCurrentResponse = ProjectCurrentResponses[keyof ProjectCurrentResponses];
```

<a id="sdk-dist-client-js-configgetdata"></a>
#### ConfigGetData

```ts
export type ConfigGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-configgetresponses"></a>
#### ConfigGetResponses

```ts
export type ConfigGetResponses = {
    : Config;
};
```

<a id="sdk-dist-client-js-configgetresponse"></a>
#### ConfigGetResponse

```ts
export type ConfigGetResponse = ConfigGetResponses[keyof ConfigGetResponses];
```

<a id="sdk-dist-client-js-configupdatedata"></a>
#### ConfigUpdateData

```ts
export type ConfigUpdateData = {
    body?: Config;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-configupdateerrors"></a>
#### ConfigUpdateErrors

```ts
export type ConfigUpdateErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-configupdateerror"></a>
#### ConfigUpdateError

```ts
export type ConfigUpdateError = ConfigUpdateErrors[keyof ConfigUpdateErrors];
```

<a id="sdk-dist-client-js-configupdateresponses"></a>
#### ConfigUpdateResponses

```ts
export type ConfigUpdateResponses = {
    : Config;
};
```

<a id="sdk-dist-client-js-configupdateresponse"></a>
#### ConfigUpdateResponse

```ts
export type ConfigUpdateResponse = ConfigUpdateResponses[keyof ConfigUpdateResponses];
```

<a id="sdk-dist-client-js-toolidsdata"></a>
#### ToolIdsData

```ts
export type ToolIdsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-toolidserrors"></a>
#### ToolIdsErrors

```ts
export type ToolIdsErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-toolidserror"></a>
#### ToolIdsError

```ts
export type ToolIdsError = ToolIdsErrors[keyof ToolIdsErrors];
```

<a id="sdk-dist-client-js-toolidsresponses"></a>
#### ToolIdsResponses

```ts
export type ToolIdsResponses = {
    : ToolIds;
};
```

<a id="sdk-dist-client-js-toolidsresponse"></a>
#### ToolIdsResponse

```ts
export type ToolIdsResponse = ToolIdsResponses[keyof ToolIdsResponses];
```

<a id="sdk-dist-client-js-toollistdata"></a>
#### ToolListData

```ts
export type ToolListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        provider: string;
        model: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-toollisterrors"></a>
#### ToolListErrors

```ts
export type ToolListErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-toollisterror"></a>
#### ToolListError

```ts
export type ToolListError = ToolListErrors[keyof ToolListErrors];
```

<a id="sdk-dist-client-js-toollistresponses"></a>
#### ToolListResponses

```ts
export type ToolListResponses = {
    : ToolList;
};
```

<a id="sdk-dist-client-js-toollistresponse"></a>
#### ToolListResponse

```ts
export type ToolListResponse = ToolListResponses[keyof ToolListResponses];
```

<a id="sdk-dist-client-js-instancedisposedata"></a>
#### InstanceDisposeData

```ts
export type InstanceDisposeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-instancedisposeresponses"></a>
#### InstanceDisposeResponses

```ts
export type InstanceDisposeResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-instancedisposeresponse"></a>
#### InstanceDisposeResponse

```ts
export type InstanceDisposeResponse = InstanceDisposeResponses[keyof InstanceDisposeResponses];
```

<a id="sdk-dist-client-js-pathgetdata"></a>
#### PathGetData

```ts
export type PathGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-pathgetresponses"></a>
#### PathGetResponses

```ts
export type PathGetResponses = {
    : Path;
};
```

<a id="sdk-dist-client-js-pathgetresponse"></a>
#### PathGetResponse

```ts
export type PathGetResponse = PathGetResponses[keyof PathGetResponses];
```

<a id="sdk-dist-client-js-vcsgetdata"></a>
#### VcsGetData

```ts
export type VcsGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-vcsgetresponses"></a>
#### VcsGetResponses

```ts
export type VcsGetResponses = {
    : VcsInfo;
};
```

<a id="sdk-dist-client-js-vcsgetresponse"></a>
#### VcsGetResponse

```ts
export type VcsGetResponse = VcsGetResponses[keyof VcsGetResponses];
```

<a id="sdk-dist-client-js-sessionlistdata"></a>
#### SessionListData

```ts
export type SessionListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionlistresponses"></a>
#### SessionListResponses

```ts
export type SessionListResponses = {
    : Array<Session>;
};
```

<a id="sdk-dist-client-js-sessionlistresponse"></a>
#### SessionListResponse

```ts
export type SessionListResponse = SessionListResponses[keyof SessionListResponses];
```

<a id="sdk-dist-client-js-sessioncreatedata"></a>
#### SessionCreateData

```ts
export type SessionCreateData = {
    body?: {
        parentID?: string;
        title?: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessioncreateerrors"></a>
#### SessionCreateErrors

```ts
export type SessionCreateErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-sessioncreateerror"></a>
#### SessionCreateError

```ts
export type SessionCreateError = SessionCreateErrors[keyof SessionCreateErrors];
```

<a id="sdk-dist-client-js-sessioncreateresponses"></a>
#### SessionCreateResponses

```ts
export type SessionCreateResponses = {
    : Session;
};
```

<a id="sdk-dist-client-js-sessioncreateresponse"></a>
#### SessionCreateResponse

```ts
export type SessionCreateResponse = SessionCreateResponses[keyof SessionCreateResponses];
```

<a id="sdk-dist-client-js-sessionstatusdata"></a>
#### SessionStatusData

```ts
export type SessionStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionstatuserrors"></a>
#### SessionStatusErrors

```ts
export type SessionStatusErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-sessionstatuserror"></a>
#### SessionStatusError

```ts
export type SessionStatusError = SessionStatusErrors[keyof SessionStatusErrors];
```

<a id="sdk-dist-client-js-sessionstatusresponses"></a>
#### SessionStatusResponses

```ts
export type SessionStatusResponses = {
    : {
        [key: string]: SessionStatus;
    };
};
```

<a id="sdk-dist-client-js-sessionstatusresponse"></a>
#### SessionStatusResponse

```ts
export type SessionStatusResponse = SessionStatusResponses[keyof SessionStatusResponses];
```

<a id="sdk-dist-client-js-sessiondeletedata"></a>
#### SessionDeleteData

```ts
export type SessionDeleteData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessiondeleteerrors"></a>
#### SessionDeleteErrors

```ts
export type SessionDeleteErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessiondeleteerror"></a>
#### SessionDeleteError

```ts
export type SessionDeleteError = SessionDeleteErrors[keyof SessionDeleteErrors];
```

<a id="sdk-dist-client-js-sessiondeleteresponses"></a>
#### SessionDeleteResponses

```ts
export type SessionDeleteResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-sessiondeleteresponse"></a>
#### SessionDeleteResponse

```ts
export type SessionDeleteResponse = SessionDeleteResponses[keyof SessionDeleteResponses];
```

<a id="sdk-dist-client-js-sessiongetdata"></a>
#### SessionGetData

```ts
export type SessionGetData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessiongeterrors"></a>
#### SessionGetErrors

```ts
export type SessionGetErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessiongeterror"></a>
#### SessionGetError

```ts
export type SessionGetError = SessionGetErrors[keyof SessionGetErrors];
```

<a id="sdk-dist-client-js-sessiongetresponses"></a>
#### SessionGetResponses

```ts
export type SessionGetResponses = {
    : Session;
};
```

<a id="sdk-dist-client-js-sessiongetresponse"></a>
#### SessionGetResponse

```ts
export type SessionGetResponse = SessionGetResponses[keyof SessionGetResponses];
```

<a id="sdk-dist-client-js-sessionupdatedata"></a>
#### SessionUpdateData

```ts
export type SessionUpdateData = {
    body?: {
        title?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionupdateerrors"></a>
#### SessionUpdateErrors

```ts
export type SessionUpdateErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionupdateerror"></a>
#### SessionUpdateError

```ts
export type SessionUpdateError = SessionUpdateErrors[keyof SessionUpdateErrors];
```

<a id="sdk-dist-client-js-sessionupdateresponses"></a>
#### SessionUpdateResponses

```ts
export type SessionUpdateResponses = {
    : Session;
};
```

<a id="sdk-dist-client-js-sessionupdateresponse"></a>
#### SessionUpdateResponse

```ts
export type SessionUpdateResponse = SessionUpdateResponses[keyof SessionUpdateResponses];
```

<a id="sdk-dist-client-js-sessionchildrendata"></a>
#### SessionChildrenData

```ts
export type SessionChildrenData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionchildrenerrors"></a>
#### SessionChildrenErrors

```ts
export type SessionChildrenErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionchildrenerror"></a>
#### SessionChildrenError

```ts
export type SessionChildrenError = SessionChildrenErrors[keyof SessionChildrenErrors];
```

<a id="sdk-dist-client-js-sessionchildrenresponses"></a>
#### SessionChildrenResponses

```ts
export type SessionChildrenResponses = {
    : Array<Session>;
};
```

<a id="sdk-dist-client-js-sessionchildrenresponse"></a>
#### SessionChildrenResponse

```ts
export type SessionChildrenResponse = SessionChildrenResponses[keyof SessionChildrenResponses];
```

<a id="sdk-dist-client-js-sessiontododata"></a>
#### SessionTodoData

```ts
export type SessionTodoData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessiontodoerrors"></a>
#### SessionTodoErrors

```ts
export type SessionTodoErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessiontodoerror"></a>
#### SessionTodoError

```ts
export type SessionTodoError = SessionTodoErrors[keyof SessionTodoErrors];
```

<a id="sdk-dist-client-js-sessiontodoresponses"></a>
#### SessionTodoResponses

```ts
export type SessionTodoResponses = {
    : Array<Todo>;
};
```

<a id="sdk-dist-client-js-sessiontodoresponse"></a>
#### SessionTodoResponse

```ts
export type SessionTodoResponse = SessionTodoResponses[keyof SessionTodoResponses];
```

<a id="sdk-dist-client-js-sessioninitdata"></a>
#### SessionInitData

```ts
export type SessionInitData = {
    body?: {
        modelID: string;
        providerID: string;
        messageID: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessioniniterrors"></a>
#### SessionInitErrors

```ts
export type SessionInitErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessioniniterror"></a>
#### SessionInitError

```ts
export type SessionInitError = SessionInitErrors[keyof SessionInitErrors];
```

<a id="sdk-dist-client-js-sessioninitresponses"></a>
#### SessionInitResponses

```ts
export type SessionInitResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-sessioninitresponse"></a>
#### SessionInitResponse

```ts
export type SessionInitResponse = SessionInitResponses[keyof SessionInitResponses];
```

<a id="sdk-dist-client-js-sessionforkdata"></a>
#### SessionForkData

```ts
export type SessionForkData = {
    body?: {
        messageID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionforkresponses"></a>
#### SessionForkResponses

```ts
export type SessionForkResponses = {
    : Session;
};
```

<a id="sdk-dist-client-js-sessionforkresponse"></a>
#### SessionForkResponse

```ts
export type SessionForkResponse = SessionForkResponses[keyof SessionForkResponses];
```

<a id="sdk-dist-client-js-sessionabortdata"></a>
#### SessionAbortData

```ts
export type SessionAbortData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionaborterrors"></a>
#### SessionAbortErrors

```ts
export type SessionAbortErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionaborterror"></a>
#### SessionAbortError

```ts
export type SessionAbortError = SessionAbortErrors[keyof SessionAbortErrors];
```

<a id="sdk-dist-client-js-sessionabortresponses"></a>
#### SessionAbortResponses

```ts
export type SessionAbortResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-sessionabortresponse"></a>
#### SessionAbortResponse

```ts
export type SessionAbortResponse = SessionAbortResponses[keyof SessionAbortResponses];
```

<a id="sdk-dist-client-js-sessionunsharedata"></a>
#### SessionUnshareData

```ts
export type SessionUnshareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionunshareerrors"></a>
#### SessionUnshareErrors

```ts
export type SessionUnshareErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionunshareerror"></a>
#### SessionUnshareError

```ts
export type SessionUnshareError = SessionUnshareErrors[keyof SessionUnshareErrors];
```

<a id="sdk-dist-client-js-sessionunshareresponses"></a>
#### SessionUnshareResponses

```ts
export type SessionUnshareResponses = {
    : Session;
};
```

<a id="sdk-dist-client-js-sessionunshareresponse"></a>
#### SessionUnshareResponse

```ts
export type SessionUnshareResponse = SessionUnshareResponses[keyof SessionUnshareResponses];
```

<a id="sdk-dist-client-js-sessionsharedata"></a>
#### SessionShareData

```ts
export type SessionShareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionshareerrors"></a>
#### SessionShareErrors

```ts
export type SessionShareErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionshareerror"></a>
#### SessionShareError

```ts
export type SessionShareError = SessionShareErrors[keyof SessionShareErrors];
```

<a id="sdk-dist-client-js-sessionshareresponses"></a>
#### SessionShareResponses

```ts
export type SessionShareResponses = {
    : Session;
};
```

<a id="sdk-dist-client-js-sessionshareresponse"></a>
#### SessionShareResponse

```ts
export type SessionShareResponse = SessionShareResponses[keyof SessionShareResponses];
```

<a id="sdk-dist-client-js-sessiondiffdata"></a>
#### SessionDiffData

```ts
export type SessionDiffData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
        messageID?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessiondifferrors"></a>
#### SessionDiffErrors

```ts
export type SessionDiffErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessiondifferror"></a>
#### SessionDiffError

```ts
export type SessionDiffError = SessionDiffErrors[keyof SessionDiffErrors];
```

<a id="sdk-dist-client-js-sessiondiffresponses"></a>
#### SessionDiffResponses

```ts
export type SessionDiffResponses = {
    : Array<FileDiff>;
};
```

<a id="sdk-dist-client-js-sessiondiffresponse"></a>
#### SessionDiffResponse

```ts
export type SessionDiffResponse = SessionDiffResponses[keyof SessionDiffResponses];
```

<a id="sdk-dist-client-js-sessionsummarizedata"></a>
#### SessionSummarizeData

```ts
export type SessionSummarizeData = {
    body?: {
        providerID: string;
        modelID: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionsummarizeerrors"></a>
#### SessionSummarizeErrors

```ts
export type SessionSummarizeErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionsummarizeerror"></a>
#### SessionSummarizeError

```ts
export type SessionSummarizeError = SessionSummarizeErrors[keyof SessionSummarizeErrors];
```

<a id="sdk-dist-client-js-sessionsummarizeresponses"></a>
#### SessionSummarizeResponses

```ts
export type SessionSummarizeResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-sessionsummarizeresponse"></a>
#### SessionSummarizeResponse

```ts
export type SessionSummarizeResponse = SessionSummarizeResponses[keyof SessionSummarizeResponses];
```

<a id="sdk-dist-client-js-sessionmessagesdata"></a>
#### SessionMessagesData

```ts
export type SessionMessagesData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
        limit?: number;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionmessageserrors"></a>
#### SessionMessagesErrors

```ts
export type SessionMessagesErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionmessageserror"></a>
#### SessionMessagesError

```ts
export type SessionMessagesError = SessionMessagesErrors[keyof SessionMessagesErrors];
```

<a id="sdk-dist-client-js-sessionmessagesresponses"></a>
#### SessionMessagesResponses

```ts
export type SessionMessagesResponses = {
    : Array<{
        info: Message;
        parts: Array<Part>;
    }>;
};
```

<a id="sdk-dist-client-js-sessionmessagesresponse"></a>
#### SessionMessagesResponse

```ts
export type SessionMessagesResponse = SessionMessagesResponses[keyof SessionMessagesResponses];
```

<a id="sdk-dist-client-js-sessionpromptdata"></a>
#### SessionPromptData

```ts
export type SessionPromptData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionprompterrors"></a>
#### SessionPromptErrors

```ts
export type SessionPromptErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionprompterror"></a>
#### SessionPromptError

```ts
export type SessionPromptError = SessionPromptErrors[keyof SessionPromptErrors];
```

<a id="sdk-dist-client-js-sessionpromptresponses"></a>
#### SessionPromptResponses

```ts
export type SessionPromptResponses = {
    : {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-client-js-sessionpromptresponse"></a>
#### SessionPromptResponse

```ts
export type SessionPromptResponse = SessionPromptResponses[keyof SessionPromptResponses];
```

<a id="sdk-dist-client-js-sessionmessagedata"></a>
#### SessionMessageData

```ts
export type SessionMessageData = {
    body?: never;
    path: {
        id: string;
        messageID: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionmessageerrors"></a>
#### SessionMessageErrors

```ts
export type SessionMessageErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionmessageerror"></a>
#### SessionMessageError

```ts
export type SessionMessageError = SessionMessageErrors[keyof SessionMessageErrors];
```

<a id="sdk-dist-client-js-sessionmessageresponses"></a>
#### SessionMessageResponses

```ts
export type SessionMessageResponses = {
    : {
        info: Message;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-client-js-sessionmessageresponse"></a>
#### SessionMessageResponse

```ts
export type SessionMessageResponse = SessionMessageResponses[keyof SessionMessageResponses];
```

<a id="sdk-dist-client-js-sessionpromptasyncdata"></a>
#### SessionPromptAsyncData

```ts
export type SessionPromptAsyncData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionpromptasyncerrors"></a>
#### SessionPromptAsyncErrors

```ts
export type SessionPromptAsyncErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionpromptasyncerror"></a>
#### SessionPromptAsyncError

```ts
export type SessionPromptAsyncError = SessionPromptAsyncErrors[keyof SessionPromptAsyncErrors];
```

<a id="sdk-dist-client-js-sessionpromptasyncresponses"></a>
#### SessionPromptAsyncResponses

```ts
export type SessionPromptAsyncResponses = {
    : void;
};
```

<a id="sdk-dist-client-js-sessionpromptasyncresponse"></a>
#### SessionPromptAsyncResponse

```ts
export type SessionPromptAsyncResponse = SessionPromptAsyncResponses[keyof SessionPromptAsyncResponses];
```

<a id="sdk-dist-client-js-sessioncommanddata"></a>
#### SessionCommandData

```ts
export type SessionCommandData = {
    body?: {
        messageID?: string;
        agent?: string;
        model?: string;
        arguments: string;
        command: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessioncommanderrors"></a>
#### SessionCommandErrors

```ts
export type SessionCommandErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessioncommanderror"></a>
#### SessionCommandError

```ts
export type SessionCommandError = SessionCommandErrors[keyof SessionCommandErrors];
```

<a id="sdk-dist-client-js-sessioncommandresponses"></a>
#### SessionCommandResponses

```ts
export type SessionCommandResponses = {
    : {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-client-js-sessioncommandresponse"></a>
#### SessionCommandResponse

```ts
export type SessionCommandResponse = SessionCommandResponses[keyof SessionCommandResponses];
```

<a id="sdk-dist-client-js-sessionshelldata"></a>
#### SessionShellData

```ts
export type SessionShellData = {
    body?: {
        agent: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        command: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionshellerrors"></a>
#### SessionShellErrors

```ts
export type SessionShellErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionshellerror"></a>
#### SessionShellError

```ts
export type SessionShellError = SessionShellErrors[keyof SessionShellErrors];
```

<a id="sdk-dist-client-js-sessionshellresponses"></a>
#### SessionShellResponses

```ts
export type SessionShellResponses = {
    : AssistantMessage;
};
```

<a id="sdk-dist-client-js-sessionshellresponse"></a>
#### SessionShellResponse

```ts
export type SessionShellResponse = SessionShellResponses[keyof SessionShellResponses];
```

<a id="sdk-dist-client-js-sessionrevertdata"></a>
#### SessionRevertData

```ts
export type SessionRevertData = {
    body?: {
        messageID: string;
        partID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionreverterrors"></a>
#### SessionRevertErrors

```ts
export type SessionRevertErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionreverterror"></a>
#### SessionRevertError

```ts
export type SessionRevertError = SessionRevertErrors[keyof SessionRevertErrors];
```

<a id="sdk-dist-client-js-sessionrevertresponses"></a>
#### SessionRevertResponses

```ts
export type SessionRevertResponses = {
    : Session;
};
```

<a id="sdk-dist-client-js-sessionrevertresponse"></a>
#### SessionRevertResponse

```ts
export type SessionRevertResponse = SessionRevertResponses[keyof SessionRevertResponses];
```

<a id="sdk-dist-client-js-sessionunrevertdata"></a>
#### SessionUnrevertData

```ts
export type SessionUnrevertData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-sessionunreverterrors"></a>
#### SessionUnrevertErrors

```ts
export type SessionUnrevertErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-sessionunreverterror"></a>
#### SessionUnrevertError

```ts
export type SessionUnrevertError = SessionUnrevertErrors[keyof SessionUnrevertErrors];
```

<a id="sdk-dist-client-js-sessionunrevertresponses"></a>
#### SessionUnrevertResponses

```ts
export type SessionUnrevertResponses = {
    : Session;
};
```

<a id="sdk-dist-client-js-sessionunrevertresponse"></a>
#### SessionUnrevertResponse

```ts
export type SessionUnrevertResponse = SessionUnrevertResponses[keyof SessionUnrevertResponses];
```

<a id="sdk-dist-client-js-postsessionidpermissionspermissioniddata"></a>
#### PostSessionIdPermissionsPermissionIdData

```ts
export type PostSessionIdPermissionsPermissionIdData = {
    body?: {
        response:  |  | ;
    };
    path: {
        id: string;
        permissionID: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-postsessionidpermissionspermissioniderrors"></a>
#### PostSessionIdPermissionsPermissionIdErrors

```ts
export type PostSessionIdPermissionsPermissionIdErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-js-postsessionidpermissionspermissioniderror"></a>
#### PostSessionIdPermissionsPermissionIdError

```ts
export type PostSessionIdPermissionsPermissionIdError = PostSessionIdPermissionsPermissionIdErrors[keyof PostSessionIdPermissionsPermissionIdErrors];
```

<a id="sdk-dist-client-js-postsessionidpermissionspermissionidresponses"></a>
#### PostSessionIdPermissionsPermissionIdResponses

```ts
export type PostSessionIdPermissionsPermissionIdResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-postsessionidpermissionspermissionidresponse"></a>
#### PostSessionIdPermissionsPermissionIdResponse

```ts
export type PostSessionIdPermissionsPermissionIdResponse = PostSessionIdPermissionsPermissionIdResponses[keyof PostSessionIdPermissionsPermissionIdResponses];
```

<a id="sdk-dist-client-js-commandlistdata"></a>
#### CommandListData

```ts
export type CommandListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-commandlistresponses"></a>
#### CommandListResponses

```ts
export type CommandListResponses = {
    : Array<Command>;
};
```

<a id="sdk-dist-client-js-commandlistresponse"></a>
#### CommandListResponse

```ts
export type CommandListResponse = CommandListResponses[keyof CommandListResponses];
```

<a id="sdk-dist-client-js-configprovidersdata"></a>
#### ConfigProvidersData

```ts
export type ConfigProvidersData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-configprovidersresponses"></a>
#### ConfigProvidersResponses

```ts
export type ConfigProvidersResponses = {
    : {
        providers: Array<Provider>;
        default: {
            [key: string]: string;
        };
    };
};
```

<a id="sdk-dist-client-js-configprovidersresponse"></a>
#### ConfigProvidersResponse

```ts
export type ConfigProvidersResponse = ConfigProvidersResponses[keyof ConfigProvidersResponses];
```

<a id="sdk-dist-client-js-providerlistdata"></a>
#### ProviderListData

```ts
export type ProviderListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-providerlistresponses"></a>
#### ProviderListResponses

```ts
export type ProviderListResponses = {
    : {
        all: Array<Provider>;
        default: {
            [key: string]: string;
        };
        connected: Array<string>;
    };
};
```

<a id="sdk-dist-client-js-providerlistresponse"></a>
#### ProviderListResponse

```ts
export type ProviderListResponse = ProviderListResponses[keyof ProviderListResponses];
```

<a id="sdk-dist-client-js-providerauthdata"></a>
#### ProviderAuthData

```ts
export type ProviderAuthData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-providerauthresponses"></a>
#### ProviderAuthResponses

```ts
export type ProviderAuthResponses = {
    : {
        [key: string]: Array<ProviderAuthMethod>;
    };
};
```

<a id="sdk-dist-client-js-providerauthresponse"></a>
#### ProviderAuthResponse

```ts
export type ProviderAuthResponse = ProviderAuthResponses[keyof ProviderAuthResponses];
```

<a id="sdk-dist-client-js-provideroauthauthorizedata"></a>
#### ProviderOauthAuthorizeData

```ts
export type ProviderOauthAuthorizeData = {
    body?: {
        method: number;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-provideroauthauthorizeerrors"></a>
#### ProviderOauthAuthorizeErrors

```ts
export type ProviderOauthAuthorizeErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-provideroauthauthorizeerror"></a>
#### ProviderOauthAuthorizeError

```ts
export type ProviderOauthAuthorizeError = ProviderOauthAuthorizeErrors[keyof ProviderOauthAuthorizeErrors];
```

<a id="sdk-dist-client-js-provideroauthauthorizeresponses"></a>
#### ProviderOauthAuthorizeResponses

```ts
export type ProviderOauthAuthorizeResponses = {
    : ProviderAuthAuthorization;
};
```

<a id="sdk-dist-client-js-provideroauthauthorizeresponse"></a>
#### ProviderOauthAuthorizeResponse

```ts
export type ProviderOauthAuthorizeResponse = ProviderOauthAuthorizeResponses[keyof ProviderOauthAuthorizeResponses];
```

<a id="sdk-dist-client-js-provideroauthcallbackdata"></a>
#### ProviderOauthCallbackData

```ts
export type ProviderOauthCallbackData = {
    body?: {
        method: number;
        code?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-provideroauthcallbackerrors"></a>
#### ProviderOauthCallbackErrors

```ts
export type ProviderOauthCallbackErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-provideroauthcallbackerror"></a>
#### ProviderOauthCallbackError

```ts
export type ProviderOauthCallbackError = ProviderOauthCallbackErrors[keyof ProviderOauthCallbackErrors];
```

<a id="sdk-dist-client-js-provideroauthcallbackresponses"></a>
#### ProviderOauthCallbackResponses

```ts
export type ProviderOauthCallbackResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-provideroauthcallbackresponse"></a>
#### ProviderOauthCallbackResponse

```ts
export type ProviderOauthCallbackResponse = ProviderOauthCallbackResponses[keyof ProviderOauthCallbackResponses];
```

<a id="sdk-dist-client-js-findtextdata"></a>
#### FindTextData

```ts
export type FindTextData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        pattern: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-findtextresponses"></a>
#### FindTextResponses

```ts
export type FindTextResponses = {
    : Array<{
        path: {
            text: string;
        };
        lines: {
            text: string;
        };
        line_number: number;
        absolute_offset: number;
        submatches: Array<{
            match: {
                text: string;
            };
            start: number;
            end: number;
        }>;
    }>;
};
```

<a id="sdk-dist-client-js-findtextresponse"></a>
#### FindTextResponse

```ts
export type FindTextResponse = FindTextResponses[keyof FindTextResponses];
```

<a id="sdk-dist-client-js-findfilesdata"></a>
#### FindFilesData

```ts
export type FindFilesData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
        dirs?:  | ;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-findfilesresponses"></a>
#### FindFilesResponses

```ts
export type FindFilesResponses = {
    : Array<string>;
};
```

<a id="sdk-dist-client-js-findfilesresponse"></a>
#### FindFilesResponse

```ts
export type FindFilesResponse = FindFilesResponses[keyof FindFilesResponses];
```

<a id="sdk-dist-client-js-findsymbolsdata"></a>
#### FindSymbolsData

```ts
export type FindSymbolsData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-findsymbolsresponses"></a>
#### FindSymbolsResponses

```ts
export type FindSymbolsResponses = {
    : Array<Symbol>;
};
```

<a id="sdk-dist-client-js-findsymbolsresponse"></a>
#### FindSymbolsResponse

```ts
export type FindSymbolsResponse = FindSymbolsResponses[keyof FindSymbolsResponses];
```

<a id="sdk-dist-client-js-filelistdata"></a>
#### FileListData

```ts
export type FileListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-filelistresponses"></a>
#### FileListResponses

```ts
export type FileListResponses = {
    : Array<FileNode>;
};
```

<a id="sdk-dist-client-js-filelistresponse"></a>
#### FileListResponse

```ts
export type FileListResponse = FileListResponses[keyof FileListResponses];
```

<a id="sdk-dist-client-js-filereaddata"></a>
#### FileReadData

```ts
export type FileReadData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-filereadresponses"></a>
#### FileReadResponses

```ts
export type FileReadResponses = {
    : FileContent;
};
```

<a id="sdk-dist-client-js-filereadresponse"></a>
#### FileReadResponse

```ts
export type FileReadResponse = FileReadResponses[keyof FileReadResponses];
```

<a id="sdk-dist-client-js-filestatusdata"></a>
#### FileStatusData

```ts
export type FileStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-filestatusresponses"></a>
#### FileStatusResponses

```ts
export type FileStatusResponses = {
    : Array<File>;
};
```

<a id="sdk-dist-client-js-filestatusresponse"></a>
#### FileStatusResponse

```ts
export type FileStatusResponse = FileStatusResponses[keyof FileStatusResponses];
```

<a id="sdk-dist-client-js-applogdata"></a>
#### AppLogData

```ts
export type AppLogData = {
    body?: {
        service: string;
        level:  |  |  | ;
        message: string;
        extra?: {
            [key: string]: unknown;
        };
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-applogerrors"></a>
#### AppLogErrors

```ts
export type AppLogErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-applogerror"></a>
#### AppLogError

```ts
export type AppLogError = AppLogErrors[keyof AppLogErrors];
```

<a id="sdk-dist-client-js-applogresponses"></a>
#### AppLogResponses

```ts
export type AppLogResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-applogresponse"></a>
#### AppLogResponse

```ts
export type AppLogResponse = AppLogResponses[keyof AppLogResponses];
```

<a id="sdk-dist-client-js-appagentsdata"></a>
#### AppAgentsData

```ts
export type AppAgentsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-appagentsresponses"></a>
#### AppAgentsResponses

```ts
export type AppAgentsResponses = {
    : Array<Agent>;
};
```

<a id="sdk-dist-client-js-appagentsresponse"></a>
#### AppAgentsResponse

```ts
export type AppAgentsResponse = AppAgentsResponses[keyof AppAgentsResponses];
```

<a id="sdk-dist-client-js-mcpstatusdata"></a>
#### McpStatusData

```ts
export type McpStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-mcpstatusresponses"></a>
#### McpStatusResponses

```ts
export type McpStatusResponses = {
    : {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-client-js-mcpstatusresponse"></a>
#### McpStatusResponse

```ts
export type McpStatusResponse = McpStatusResponses[keyof McpStatusResponses];
```

<a id="sdk-dist-client-js-mcpadddata"></a>
#### McpAddData

```ts
export type McpAddData = {
    body?: {
        name: string;
        config: McpLocalConfig | McpRemoteConfig;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-mcpadderrors"></a>
#### McpAddErrors

```ts
export type McpAddErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-mcpadderror"></a>
#### McpAddError

```ts
export type McpAddError = McpAddErrors[keyof McpAddErrors];
```

<a id="sdk-dist-client-js-mcpaddresponses"></a>
#### McpAddResponses

```ts
export type McpAddResponses = {
    : {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-client-js-mcpaddresponse"></a>
#### McpAddResponse

```ts
export type McpAddResponse = McpAddResponses[keyof McpAddResponses];
```

<a id="sdk-dist-client-js-lspstatusdata"></a>
#### LspStatusData

```ts
export type LspStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-lspstatusresponses"></a>
#### LspStatusResponses

```ts
export type LspStatusResponses = {
    : Array<LspStatus>;
};
```

<a id="sdk-dist-client-js-lspstatusresponse"></a>
#### LspStatusResponse

```ts
export type LspStatusResponse = LspStatusResponses[keyof LspStatusResponses];
```

<a id="sdk-dist-client-js-formatterstatusdata"></a>
#### FormatterStatusData

```ts
export type FormatterStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-formatterstatusresponses"></a>
#### FormatterStatusResponses

```ts
export type FormatterStatusResponses = {
    : Array<FormatterStatus>;
};
```

<a id="sdk-dist-client-js-formatterstatusresponse"></a>
#### FormatterStatusResponse

```ts
export type FormatterStatusResponse = FormatterStatusResponses[keyof FormatterStatusResponses];
```

<a id="sdk-dist-client-js-tuiappendpromptdata"></a>
#### TuiAppendPromptData

```ts
export type TuiAppendPromptData = {
    body?: {
        text: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuiappendprompterrors"></a>
#### TuiAppendPromptErrors

```ts
export type TuiAppendPromptErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-tuiappendprompterror"></a>
#### TuiAppendPromptError

```ts
export type TuiAppendPromptError = TuiAppendPromptErrors[keyof TuiAppendPromptErrors];
```

<a id="sdk-dist-client-js-tuiappendpromptresponses"></a>
#### TuiAppendPromptResponses

```ts
export type TuiAppendPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuiappendpromptresponse"></a>
#### TuiAppendPromptResponse

```ts
export type TuiAppendPromptResponse = TuiAppendPromptResponses[keyof TuiAppendPromptResponses];
```

<a id="sdk-dist-client-js-tuiopenhelpdata"></a>
#### TuiOpenHelpData

```ts
export type TuiOpenHelpData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuiopenhelpresponses"></a>
#### TuiOpenHelpResponses

```ts
export type TuiOpenHelpResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuiopenhelpresponse"></a>
#### TuiOpenHelpResponse

```ts
export type TuiOpenHelpResponse = TuiOpenHelpResponses[keyof TuiOpenHelpResponses];
```

<a id="sdk-dist-client-js-tuiopensessionsdata"></a>
#### TuiOpenSessionsData

```ts
export type TuiOpenSessionsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuiopensessionsresponses"></a>
#### TuiOpenSessionsResponses

```ts
export type TuiOpenSessionsResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuiopensessionsresponse"></a>
#### TuiOpenSessionsResponse

```ts
export type TuiOpenSessionsResponse = TuiOpenSessionsResponses[keyof TuiOpenSessionsResponses];
```

<a id="sdk-dist-client-js-tuiopenthemesdata"></a>
#### TuiOpenThemesData

```ts
export type TuiOpenThemesData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuiopenthemesresponses"></a>
#### TuiOpenThemesResponses

```ts
export type TuiOpenThemesResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuiopenthemesresponse"></a>
#### TuiOpenThemesResponse

```ts
export type TuiOpenThemesResponse = TuiOpenThemesResponses[keyof TuiOpenThemesResponses];
```

<a id="sdk-dist-client-js-tuiopenmodelsdata"></a>
#### TuiOpenModelsData

```ts
export type TuiOpenModelsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuiopenmodelsresponses"></a>
#### TuiOpenModelsResponses

```ts
export type TuiOpenModelsResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuiopenmodelsresponse"></a>
#### TuiOpenModelsResponse

```ts
export type TuiOpenModelsResponse = TuiOpenModelsResponses[keyof TuiOpenModelsResponses];
```

<a id="sdk-dist-client-js-tuisubmitpromptdata"></a>
#### TuiSubmitPromptData

```ts
export type TuiSubmitPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuisubmitpromptresponses"></a>
#### TuiSubmitPromptResponses

```ts
export type TuiSubmitPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuisubmitpromptresponse"></a>
#### TuiSubmitPromptResponse

```ts
export type TuiSubmitPromptResponse = TuiSubmitPromptResponses[keyof TuiSubmitPromptResponses];
```

<a id="sdk-dist-client-js-tuiclearpromptdata"></a>
#### TuiClearPromptData

```ts
export type TuiClearPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuiclearpromptresponses"></a>
#### TuiClearPromptResponses

```ts
export type TuiClearPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuiclearpromptresponse"></a>
#### TuiClearPromptResponse

```ts
export type TuiClearPromptResponse = TuiClearPromptResponses[keyof TuiClearPromptResponses];
```

<a id="sdk-dist-client-js-tuiexecutecommanddata"></a>
#### TuiExecuteCommandData

```ts
export type TuiExecuteCommandData = {
    body?: {
        command: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuiexecutecommanderrors"></a>
#### TuiExecuteCommandErrors

```ts
export type TuiExecuteCommandErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-tuiexecutecommanderror"></a>
#### TuiExecuteCommandError

```ts
export type TuiExecuteCommandError = TuiExecuteCommandErrors[keyof TuiExecuteCommandErrors];
```

<a id="sdk-dist-client-js-tuiexecutecommandresponses"></a>
#### TuiExecuteCommandResponses

```ts
export type TuiExecuteCommandResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuiexecutecommandresponse"></a>
#### TuiExecuteCommandResponse

```ts
export type TuiExecuteCommandResponse = TuiExecuteCommandResponses[keyof TuiExecuteCommandResponses];
```

<a id="sdk-dist-client-js-tuishowtoastdata"></a>
#### TuiShowToastData

```ts
export type TuiShowToastData = {
    body?: {
        title?: string;
        message: string;
        variant:  |  |  | ;
        duration?: number;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuishowtoastresponses"></a>
#### TuiShowToastResponses

```ts
export type TuiShowToastResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuishowtoastresponse"></a>
#### TuiShowToastResponse

```ts
export type TuiShowToastResponse = TuiShowToastResponses[keyof TuiShowToastResponses];
```

<a id="sdk-dist-client-js-tuipublishdata"></a>
#### TuiPublishData

```ts
export type TuiPublishData = {
    body?: EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuipublisherrors"></a>
#### TuiPublishErrors

```ts
export type TuiPublishErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-tuipublisherror"></a>
#### TuiPublishError

```ts
export type TuiPublishError = TuiPublishErrors[keyof TuiPublishErrors];
```

<a id="sdk-dist-client-js-tuipublishresponses"></a>
#### TuiPublishResponses

```ts
export type TuiPublishResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuipublishresponse"></a>
#### TuiPublishResponse

```ts
export type TuiPublishResponse = TuiPublishResponses[keyof TuiPublishResponses];
```

<a id="sdk-dist-client-js-tuicontrolnextdata"></a>
#### TuiControlNextData

```ts
export type TuiControlNextData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuicontrolnextresponses"></a>
#### TuiControlNextResponses

```ts
export type TuiControlNextResponses = {
    : {
        path: string;
        body: unknown;
    };
};
```

<a id="sdk-dist-client-js-tuicontrolnextresponse"></a>
#### TuiControlNextResponse

```ts
export type TuiControlNextResponse = TuiControlNextResponses[keyof TuiControlNextResponses];
```

<a id="sdk-dist-client-js-tuicontrolresponsedata"></a>
#### TuiControlResponseData

```ts
export type TuiControlResponseData = {
    body?: unknown;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-tuicontrolresponseresponses"></a>
#### TuiControlResponseResponses

```ts
export type TuiControlResponseResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-tuicontrolresponseresponse"></a>
#### TuiControlResponseResponse

```ts
export type TuiControlResponseResponse = TuiControlResponseResponses[keyof TuiControlResponseResponses];
```

<a id="sdk-dist-client-js-authsetdata"></a>
#### AuthSetData

```ts
export type AuthSetData = {
    body?: Auth;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-authseterrors"></a>
#### AuthSetErrors

```ts
export type AuthSetErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-js-authseterror"></a>
#### AuthSetError

```ts
export type AuthSetError = AuthSetErrors[keyof AuthSetErrors];
```

<a id="sdk-dist-client-js-authsetresponses"></a>
#### AuthSetResponses

```ts
export type AuthSetResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-js-authsetresponse"></a>
#### AuthSetResponse

```ts
export type AuthSetResponse = AuthSetResponses[keyof AuthSetResponses];
```

<a id="sdk-dist-client-js-eventsubscribedata"></a>
#### EventSubscribeData

```ts
export type EventSubscribeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-js-eventsubscriberesponses"></a>
#### EventSubscribeResponses

```ts
export type EventSubscribeResponses = {
    : Event;
};
```

<a id="sdk-dist-client-js-eventsubscriberesponse"></a>
#### EventSubscribeResponse

```ts
export type EventSubscribeResponse = EventSubscribeResponses[keyof EventSubscribeResponses];
```

<a id="sdk-dist-client-js-clientoptions"></a>
#### ClientOptions

```ts
export type ClientOptions = {
    baseUrl: stringstring | (string & {});
};
```

## dist/server.d.ts

### functions

<a id="sdk-dist-server-d-ts-createopencodeserver"></a>
#### createOpencodeServer

```ts
export declare function createOpencodeServer(options?: ServerOptions): Promise<{
    url: string;
    close(): void;
}>;
```

<a id="sdk-dist-server-d-ts-createopencodetui"></a>
#### createOpencodeTui

```ts
export declare function createOpencodeTui(options?: TuiOptions): {
    close(): void;
};
```

### types

<a id="sdk-dist-server-d-ts-serveroptions"></a>
#### ServerOptions

```ts
export type ServerOptions = {
    hostname?: string;
    port?: number;
    signal?: AbortSignal;
    timeout?: number;
    config?: Config;
};
```

<a id="sdk-dist-server-d-ts-tuioptions"></a>
#### TuiOptions

```ts
export type TuiOptions = {
    project?: string;
    model?: string;
    session?: string;
    agent?: string;
    signal?: AbortSignal;
    config?: Config;
};
```

## dist/server.js

### functions

<a id="sdk-dist-server-js-createopencodeserver"></a>
#### createOpencodeServer

```ts
export async function createOpencodeServer(options) {
    options = Object.assign({
        hostname: "127.0.0.1",
        port: 4096,
        timeout: 5000,
    }, options ?? {});
    const proc = spawn(`opencode`, [`serve`, `--hostname=${options.hostname}`, `--port=${options.port}`], {
        signal: options.signal,
        env: {
            ...process.env,
            OPENCODE_CONFIG_CONTENT: JSON.stringify(options.config ?? {}),
        },
    });
    const url = await new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            reject(new Error(`Timeout waiting for server to start after ${options.timeout}ms`));
        }, options.timeout);
        let output = "";
        proc.stdout?.on("data", (chunk) => {
            output += chunk.toString();
            const lines = output.split("\n");
            for (const line of lines) {
                if (line.startsWith("opencode server listening")) {
                    const match = line.match(/on\s+(https?:\/\/[^\s]+)/);
                    if (!match) {
                        throw new Error(`Failed to parse server url from output: ${line}`);
                    }
                    clearTimeout(id);
                    resolve(match[1]);
                    return;
                }
            }
        });
        proc.stderr?.on("data", (chunk) => {
            output += chunk.toString();
        });
        proc.on("exit", (code) => {
            clearTimeout(id);
            let msg = `Server exited with code ${code}`;
            if (output.trim()) {
                msg += `\nServer output: ${output}`;
            }
            reject(new Error(msg));
        });
        proc.on("error", (error) => {
            clearTimeout(id);
            reject(error);
        });
        if (options.signal) {
            options.signal.addEventListener("abort", () => {
                clearTimeout(id);
                reject(new Error("Aborted"));
            });
        }
    });
    return {
        url,
        close() {
            proc.kill();
        },
    };
}
```

<a id="sdk-dist-server-js-createopencodetui"></a>
#### createOpencodeTui

```ts
export function createOpencodeTui(options) {
    const args = [];
    if (options?.project) {
        args.push(`--project=${options.project}`);
    }
    if (options?.model) {
        args.push(`--model=${options.model}`);
    }
    if (options?.session) {
        args.push(`--session=${options.session}`);
    }
    if (options?.agent) {
        args.push(`--agent=${options.agent}`);
    }
    const proc = spawn(`opencode`, args, {
        signal: options?.signal,
        stdio: "inherit",
        env: {
            ...process.env,
            OPENCODE_CONFIG_CONTENT: JSON.stringify(options?.config ?? {}),
        },
    });
    return {
        close() {
            proc.kill();
        },
    };
}
```

## dist/client.d.ts

### classs

<a id="sdk-dist-client-d-ts-opencodeclient"></a>
#### OpencodeClient

```ts
export declare class OpencodeClient extends _HeyApiClient {
    postSessionIdPermissionsPermissionId<ThrowOnError extends boolean = false>(options: Options<PostSessionIdPermissionsPermissionIdData, ThrowOnError>): import().RequestResult<PostSessionIdPermissionsPermissionIdResponses, PostSessionIdPermissionsPermissionIdErrors, ThrowOnError, >;
    global: Global;
    project: Project;
    config: Config;
    tool: Tool;
    instance: Instance;
    path: Path;
    vcs: Vcs;
    session: Session;
    command: Command;
    provider: Provider;
    find: Find;
    file: File;
    app: App;
    mcp: Mcp;
    lsp: Lsp;
    formatter: Formatter;
    tui: Tui;
    auth: Auth;
    event: Event;
}
```

### functions

<a id="sdk-dist-client-d-ts-createopencodeclient"></a>
#### createOpencodeClient

```ts
export declare function createOpencodeClient(config?: Config & {
    directory?: string;
}): OpencodeClient;
```

### interfaces

<a id="sdk-dist-client-d-ts-opencodeclientconfig"></a>
#### OpencodeClientConfig

```ts
export interface Config<T extends ClientOptions = ClientOptions> extends Omit<RequestInit,  |  | >, CoreConfig {
    baseUrl?: T[];
    fetch?: (request: Request) => ReturnType<typeof fetch>;
    next?: never;
    parseAs?:  |  |  |  |  |  | ;
    responseStyle?: ResponseStyle;
    throwOnError?: T[];
}
```

### types

<a id="sdk-dist-client-d-ts-eventinstallationupdated"></a>
#### EventInstallationUpdated

```ts
export type EventInstallationUpdated = {
    type: Config as OpencodeClien;
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventinstallationupdateavailable"></a>
#### EventInstallationUpdateAvailable

```ts
export type EventInstallationUpdateAvailable = {
    type: m "./gen/sdk.gen.js";
export dec;
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventlspclientdiagnostics"></a>
#### EventLspClientDiagnostics

```ts
export type EventLspClientDiagnostics = {
    type: ;
    properties: {
        serverID: string;
        path: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventlspupdated"></a>
#### EventLspUpdated

```ts
export type EventLspUpdated = {
    type: ;
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-d-ts-filediff"></a>
#### FileDiff

```ts
export type FileDiff = {
    file: string;
    before: string;
    after: string;
    additions: number;
    deletions: number;
};
```

<a id="sdk-dist-client-d-ts-usermessage"></a>
#### UserMessage

```ts
export type UserMessage = {
    id: string;
    sessionID: string;
    role: ;
    time: {
        created: number;
    };
    summary?: {
        title?: string;
        body?: string;
        diffs: Array<FileDiff>;
    };
    agent: string;
    model: {
        providerID: string;
        modelID: string;
    };
    system?: string;
    tools?: {
        [key: string]: boolean;
    };
};
```

<a id="sdk-dist-client-d-ts-providerautherror"></a>
#### ProviderAuthError

```ts
export type ProviderAuthError = {
    name: ;
    data: {
        providerID: string;
        message: string;
    };
};
```

<a id="sdk-dist-client-d-ts-unknownerror"></a>
#### UnknownError

```ts
export type UnknownError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-client-d-ts-messageoutputlengtherror"></a>
#### MessageOutputLengthError

```ts
export type MessageOutputLengthError = {
    name: ;
    data: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-d-ts-messageabortederror"></a>
#### MessageAbortedError

```ts
export type MessageAbortedError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-client-d-ts-apierror"></a>
#### ApiError

```ts
export type ApiError = {
    name: ;
    data: {
        message: string;
        statusCode?: number;
        isRetryable: boolean;
        responseHeaders?: {
            [key: string]: string;
        };
        responseBody?: string;
    };
};
```

<a id="sdk-dist-client-d-ts-assistantmessage"></a>
#### AssistantMessage

```ts
export type AssistantMessage = {
    id: string;
    sessionID: string;
    role: ;
    time: {
        created: number;
        completed?: number;
    };
    error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    parentID: string;
    modelID: string;
    providerID: string;
    mode: string;
    path: {
        cwd: string;
        root: string;
    };
    summary?: boolean;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
    finish?: string;
};
```

<a id="sdk-dist-client-d-ts-message"></a>
#### Message

```ts
export type Message = UserMessage | AssistantMessage;
```

<a id="sdk-dist-client-d-ts-eventmessageupdated"></a>
#### EventMessageUpdated

```ts
export type EventMessageUpdated = {
    type: ;
    properties: {
        info: Message;
    };
};
```

<a id="sdk-dist-client-d-ts-eventmessageremoved"></a>
#### EventMessageRemoved

```ts
export type EventMessageRemoved = {
    type: ;
    properties: {
        sessionID: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-client-d-ts-textpart"></a>
#### TextPart

```ts
export type TextPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-d-ts-reasoningpart"></a>
#### ReasoningPart

```ts
export type ReasoningPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    text: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end?: number;
    };
};
```

<a id="sdk-dist-client-d-ts-filepartsourcetext"></a>
#### FilePartSourceText

```ts
export type FilePartSourceText = {
    value: string;
    start: number;
    end: number;
};
```

<a id="sdk-dist-client-d-ts-filesource"></a>
#### FileSource

```ts
export type FileSource = {
    text: FilePartSourceText;
    type: ;
    path: string;
};
```

<a id="sdk-dist-client-d-ts-range"></a>
#### Range

```ts
export type Range = {
    start: {
        line: number;
        character: number;
    };
    end: {
        line: number;
        character: number;
    };
};
```

<a id="sdk-dist-client-d-ts-symbolsource"></a>
#### SymbolSource

```ts
export type SymbolSource = {
    text: FilePartSourceText;
    type: ;
    path: string;
    range: Range;
    name: string;
    kind: number;
};
```

<a id="sdk-dist-client-d-ts-filepartsource"></a>
#### FilePartSource

```ts
export type FilePartSource = FileSource | SymbolSource;
```

<a id="sdk-dist-client-d-ts-filepart"></a>
#### FilePart

```ts
export type FilePart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-client-d-ts-toolstatepending"></a>
#### ToolStatePending

```ts
export type ToolStatePending = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    raw: string;
};
```

<a id="sdk-dist-client-d-ts-toolstaterunning"></a>
#### ToolStateRunning

```ts
export type ToolStateRunning = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    title?: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
    };
};
```

<a id="sdk-dist-client-d-ts-toolstatecompleted"></a>
#### ToolStateCompleted

```ts
export type ToolStateCompleted = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    output: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
        compacted?: number;
    };
    attachments?: Array<FilePart>;
};
```

<a id="sdk-dist-client-d-ts-toolstateerror"></a>
#### ToolStateError

```ts
export type ToolStateError = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    error: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-client-d-ts-toolstate"></a>
#### ToolState

```ts
export type ToolState = ToolStatePending | ToolStateRunning | ToolStateCompleted | ToolStateError;
```

<a id="sdk-dist-client-d-ts-toolpart"></a>
#### ToolPart

```ts
export type ToolPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    callID: string;
    tool: string;
    state: ToolState;
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-d-ts-stepstartpart"></a>
#### StepStartPart

```ts
export type StepStartPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    snapshot?: string;
};
```

<a id="sdk-dist-client-d-ts-stepfinishpart"></a>
#### StepFinishPart

```ts
export type StepFinishPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    reason: string;
    snapshot?: string;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
};
```

<a id="sdk-dist-client-d-ts-snapshotpart"></a>
#### SnapshotPart

```ts
export type SnapshotPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    snapshot: string;
};
```

<a id="sdk-dist-client-d-ts-patchpart"></a>
#### PatchPart

```ts
export type PatchPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    hash: string;
    files: Array<string>;
};
```

<a id="sdk-dist-client-d-ts-agentpart"></a>
#### AgentPart

```ts
export type AgentPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-client-d-ts-retrypart"></a>
#### RetryPart

```ts
export type RetryPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    attempt: number;
    error: ApiError;
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-client-d-ts-compactionpart"></a>
#### CompactionPart

```ts
export type CompactionPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    auto: boolean;
};
```

<a id="sdk-dist-client-d-ts-part"></a>
#### Part

```ts
export type Part = TextPart | {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    prompt: string;
    description: string;
    agent: string;
} | ReasoningPart | FilePart | ToolPart | StepStartPart | StepFinishPart | SnapshotPart | PatchPart | AgentPart | RetryPart | CompactionPart;
```

<a id="sdk-dist-client-d-ts-eventmessagepartupdated"></a>
#### EventMessagePartUpdated

```ts
export type EventMessagePartUpdated = {
    type: ;
    properties: {
        part: Part;
        delta?: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventmessagepartremoved"></a>
#### EventMessagePartRemoved

```ts
export type EventMessagePartRemoved = {
    type: ;
    properties: {
        sessionID: string;
        messageID: string;
        partID: string;
    };
};
```

<a id="sdk-dist-client-d-ts-permission"></a>
#### Permission

```ts
export type Permission = {
    id: string;
    type: string;
    pattern?: string | Array<string>;
    sessionID: string;
    messageID: string;
    callID?: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-client-d-ts-eventpermissionupdated"></a>
#### EventPermissionUpdated

```ts
export type EventPermissionUpdated = {
    type: ;
    properties: Permission;
};
```

<a id="sdk-dist-client-d-ts-eventpermissionreplied"></a>
#### EventPermissionReplied

```ts
export type EventPermissionReplied = {
    type: ;
    properties: {
        sessionID: string;
        permissionID: string;
        response: string;
    };
};
```

<a id="sdk-dist-client-d-ts-sessionstatus"></a>
#### SessionStatus

```ts
export type SessionStatus = {
    type: ;
} | {
    type: ;
    attempt: number;
    message: string;
    next: number;
} | {
    type: ;
};
```

<a id="sdk-dist-client-d-ts-eventsessionstatus"></a>
#### EventSessionStatus

```ts
export type EventSessionStatus = {
    type: ;
    properties: {
        sessionID: string;
        status: SessionStatus;
    };
};
```

<a id="sdk-dist-client-d-ts-eventsessionidle"></a>
#### EventSessionIdle

```ts
export type EventSessionIdle = {
    type: ;
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventsessioncompacted"></a>
#### EventSessionCompacted

```ts
export type EventSessionCompacted = {
    type: ;
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventfileedited"></a>
#### EventFileEdited

```ts
export type EventFileEdited = {
    type: ;
    properties: {
        file: string;
    };
};
```

<a id="sdk-dist-client-d-ts-todo"></a>
#### Todo

```ts
export type Todo = {
    content: string;
    status: string;
    priority: string;
    id: string;
};
```

<a id="sdk-dist-client-d-ts-eventtodoupdated"></a>
#### EventTodoUpdated

```ts
export type EventTodoUpdated = {
    type: ;
    properties: {
        sessionID: string;
        todos: Array<Todo>;
    };
};
```

<a id="sdk-dist-client-d-ts-eventcommandexecuted"></a>
#### EventCommandExecuted

```ts
export type EventCommandExecuted = {
    type: ;
    properties: {
        name: string;
        sessionID: string;
        arguments: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-client-d-ts-session"></a>
#### Session

```ts
export type Session = {
    id: string;
    projectID: string;
    directory: string;
    parentID?: string;
    summary?: {
        additions: number;
        deletions: number;
        files: number;
        diffs?: Array<FileDiff>;
    };
    share?: {
        url: string;
    };
    title: string;
    version: string;
    time: {
        created: number;
        updated: number;
        compacting?: number;
    };
    revert?: {
        messageID: string;
        partID?: string;
        snapshot?: string;
        diff?: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventsessioncreated"></a>
#### EventSessionCreated

```ts
export type EventSessionCreated = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-client-d-ts-eventsessionupdated"></a>
#### EventSessionUpdated

```ts
export type EventSessionUpdated = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-client-d-ts-eventsessiondeleted"></a>
#### EventSessionDeleted

```ts
export type EventSessionDeleted = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-client-d-ts-eventsessiondiff"></a>
#### EventSessionDiff

```ts
export type EventSessionDiff = {
    type: ;
    properties: {
        sessionID: string;
        diff: Array<FileDiff>;
    };
};
```

<a id="sdk-dist-client-d-ts-eventsessionerror"></a>
#### EventSessionError

```ts
export type EventSessionError = {
    type: ;
    properties: {
        sessionID?: string;
        error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    };
};
```

<a id="sdk-dist-client-d-ts-eventfilewatcherupdated"></a>
#### EventFileWatcherUpdated

```ts
export type EventFileWatcherUpdated = {
    type: ;
    properties: {
        file: string;
        event:  |  | ;
    };
};
```

<a id="sdk-dist-client-d-ts-eventvcsbranchupdated"></a>
#### EventVcsBranchUpdated

```ts
export type EventVcsBranchUpdated = {
    type: ;
    properties: {
        branch?: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventtuipromptappend"></a>
#### EventTuiPromptAppend

```ts
export type EventTuiPromptAppend = {
    type: ;
    properties: {
        text: string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventtuicommandexecute"></a>
#### EventTuiCommandExecute

```ts
export type EventTuiCommandExecute = {
    type: ;
    properties: {
        command: ( |  |  |  |  |  |  |  |  |  |  |  |  | ) | string;
    };
};
```

<a id="sdk-dist-client-d-ts-eventtuitoastshow"></a>
#### EventTuiToastShow

```ts
export type EventTuiToastShow = {
    type: ;
    properties: {
        title?: string;
        message: string;
        variant:  |  |  | ;
        duration?: number;
    };
};
```

<a id="sdk-dist-client-d-ts-eventserverconnected"></a>
#### EventServerConnected

```ts
export type EventServerConnected = {
    type: ;
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-d-ts-event"></a>
#### Event

```ts
export type Event = EventInstallationUpdated | EventInstallationUpdateAvailable | EventLspClientDiagnostics | EventLspUpdated | EventMessageUpdated | EventMessageRemoved | EventMessagePartUpdated | EventMessagePartRemoved | EventPermissionUpdated | EventPermissionReplied | EventSessionStatus | EventSessionIdle | EventSessionCompacted | EventFileEdited | EventTodoUpdated | EventCommandExecuted | EventSessionCreated | EventSessionUpdated | EventSessionDeleted | EventSessionDiff | EventSessionError | EventFileWatcherUpdated | EventVcsBranchUpdated | EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow | EventServerConnected;
```

<a id="sdk-dist-client-d-ts-globalevent"></a>
#### GlobalEvent

```ts
export type GlobalEvent = {
    directory: string;
    payload: Event;
};
```

<a id="sdk-dist-client-d-ts-project"></a>
#### Project

```ts
export type Project = {
    id: string;
    worktree: string;
    vcsDir?: string;
    vcs?: ;
    time: {
        created: number;
        initialized?: number;
    };
};
```

Custom keybind configurations

<a id="sdk-dist-client-d-ts-keybindsconfig"></a>
#### KeybindsConfig

```ts
export type KeybindsConfig = {
    leader?: string;
    app_exit?: string;
    editor_open?: string;
    theme_list?: string;
    sidebar_toggle?: string;
    status_view?: string;
    session_export?: string;
    session_new?: string;
    session_list?: string;
    session_timeline?: string;
    session_share?: string;
    session_unshare?: string;
    session_interrupt?: string;
    session_compact?: string;
    messages_page_up?: string;
    messages_page_down?: string;
    messages_half_page_up?: string;
    messages_half_page_down?: string;
    messages_first?: string;
    messages_last?: string;
    messages_copy?: string;
    messages_undo?: string;
    messages_redo?: string;
    messages_toggle_conceal?: string;
    model_list?: string;
    model_cycle_recent?: string;
    model_cycle_recent_reverse?: string;
    command_list?: string;
    agent_list?: string;
    agent_cycle?: string;
    agent_cycle_reverse?: string;
    input_clear?: string;
    input_forward_delete?: string;
    input_paste?: string;
    input_submit?: string;
    input_newline?: string;
    history_previous?: string;
    history_next?: string;
    session_child_cycle?: string;
    session_child_cycle_reverse?: string;
    terminal_suspend?: string;
};
```

<a id="sdk-dist-client-d-ts-agentconfig"></a>
#### AgentConfig

```ts
export type AgentConfig = {
    model?: string;
    temperature?: number;
    top_p?: number;
    prompt?: string;
    tools?: {
        [key: string]: boolean;
    };
    disable?: boolean;
    description?: string;
    mode?:  |  | ;
    color?: string;
    permission?: {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    [key: string]: unknown | string | number | {
        [key: string]: boolean;
    } | boolean | ( |  | ) | {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    } | undefined;
};
```

<a id="sdk-dist-client-d-ts-mcplocalconfig"></a>
#### McpLocalConfig

```ts
export type McpLocalConfig = {
    type: ;
    command: Array<string>;
    environment?: {
        [key: string]: string;
    };
    enabled?: boolean;
    timeout?: number;
};
```

<a id="sdk-dist-client-d-ts-mcpremoteconfig"></a>
#### McpRemoteConfig

```ts
export type McpRemoteConfig = {
    type: ;
    url: string;
    enabled?: boolean;
    headers?: {
        [key: string]: string;
    };
    timeout?: number;
};
```

<a id="sdk-dist-client-d-ts-layoutconfig"></a>
#### LayoutConfig

```ts
export type LayoutConfig =  | ;
```

<a id="sdk-dist-client-d-ts-config"></a>
#### Config

```ts
export type Config = {
    $schema?: string;
    theme?: string;
    keybinds?: KeybindsConfig;
    tui?: {
        scroll_speed?: number;
        scroll_acceleration?: {
            enabled: boolean;
        };
        diff_style?:  | ;
    };
    command?: {
        [key: string]: {
            template: string;
            description?: string;
            agent?: string;
            model?: string;
            subtask?: boolean;
        };
    };
    watcher?: {
        ignore?: Array<string>;
    };
    plugin?: Array<string>;
    snapshot?: boolean;
    share?:  |  | ;
    autoshare?: boolean;
    autoupdate?: boolean | ;
    disabled_providers?: Array<string>;
    enabled_providers?: Array<string>;
    model?: string;
    small_model?: string;
    username?: string;
    mode?: {
        build?: AgentConfig;
        plan?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    agent?: {
        plan?: AgentConfig;
        build?: AgentConfig;
        general?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    provider?: {
        [key: string]: {
            api?: string;
            name?: string;
            env?: Array<string>;
            id?: string;
            npm?: string;
            models?: {
                [key: string]: {
                    id?: string;
                    name?: string;
                    release_date?: string;
                    attachment?: boolean;
                    reasoning?: boolean;
                    temperature?: boolean;
                    tool_call?: boolean;
                    cost?: {
                        input: number;
                        output: number;
                        cache_read?: number;
                        cache_write?: number;
                        context_over_200k?: {
                            input: number;
                            output: number;
                            cache_read?: number;
                            cache_write?: number;
                        };
                    };
                    limit?: {
                        context: number;
                        output: number;
                    };
                    modalities?: {
                        input: Array< |  |  |  | >;
                        output: Array< |  |  |  | >;
                    };
                    experimental?: boolean;
                    status?:  |  | ;
                    options?: {
                        [key: string]: unknown;
                    };
                    headers?: {
                        [key: string]: string;
                    };
                    provider?: {
                        npm: string;
                    };
                };
            };
            whitelist?: Array<string>;
            blacklist?: Array<string>;
            options?: {
                apiKey?: string;
                baseURL?: string;
                enterpriseUrl?: string;
                setCacheKey?: boolean;
                timeout?: number | false;
                [key: string]: unknown | string | boolean | (number | false) | undefined;
            };
        };
    };
    mcp?: {
        [key: string]: McpLocalConfig | McpRemoteConfig;
    };
    formatter?: false | {
        [key: string]: {
            disabled?: boolean;
            command?: Array<string>;
            environment?: {
                [key: string]: string;
            };
            extensions?: Array<string>;
        };
    };
    lsp?: false | {
        [key: string]: {
            disabled: true;
        } | {
            command: Array<string>;
            extensions?: Array<string>;
            disabled?: boolean;
            env?: {
                [key: string]: string;
            };
            initialization?: {
                [key: string]: unknown;
            };
        };
    };
    instructions?: Array<string>;
    layout?: LayoutConfig;
    permission?: {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    tools?: {
        [key: string]: boolean;
    };
    enterprise?: {
        url?: string;
    };
    experimental?: {
        hook?: {
            file_edited?: {
                [key: string]: Array<{
                    command: Array<string>;
                    environment?: {
                        [key: string]: string;
                    };
                }>;
            };
            session_completed?: Array<{
                command: Array<string>;
                environment?: {
                    [key: string]: string;
                };
            }>;
        };
        chatMaxRetries?: number;
        disable_paste_summary?: boolean;
        batch_tool?: boolean;
    };
};
```

<a id="sdk-dist-client-d-ts-badrequesterror"></a>
#### BadRequestError

```ts
export type BadRequestError = {
    data: unknown;
    errors: Array<{
        [key: string]: unknown;
    }>;
    success: false;
};
```

<a id="sdk-dist-client-d-ts-toolids"></a>
#### ToolIds

```ts
export type ToolIds = Array<string>;
```

<a id="sdk-dist-client-d-ts-toollistitem"></a>
#### ToolListItem

```ts
export type ToolListItem = {
    id: string;
    description: string;
    parameters: unknown;
};
```

<a id="sdk-dist-client-d-ts-toollist"></a>
#### ToolList

```ts
export type ToolList = Array<ToolListItem>;
```

<a id="sdk-dist-client-d-ts-path"></a>
#### Path

```ts
export type Path = {
    state: string;
    config: string;
    worktree: string;
    directory: string;
};
```

<a id="sdk-dist-client-d-ts-vcsinfo"></a>
#### VcsInfo

```ts
export type VcsInfo = {
    branch: string;
};
```

<a id="sdk-dist-client-d-ts-notfounderror"></a>
#### NotFoundError

```ts
export type NotFoundError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-client-d-ts-textpartinput"></a>
#### TextPartInput

```ts
export type TextPartInput = {
    id?: string;
    type: ;
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-d-ts-filepartinput"></a>
#### FilePartInput

```ts
export type FilePartInput = {
    id?: string;
    type: ;
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-client-d-ts-agentpartinput"></a>
#### AgentPartInput

```ts
export type AgentPartInput = {
    id?: string;
    type: ;
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-client-d-ts-subtaskpartinput"></a>
#### SubtaskPartInput

```ts
export type SubtaskPartInput = {
    id?: string;
    type: ;
    prompt: string;
    description: string;
    agent: string;
};
```

<a id="sdk-dist-client-d-ts-command"></a>
#### Command

```ts
export type Command = {
    name: string;
    description?: string;
    agent?: string;
    model?: string;
    template: string;
    subtask?: boolean;
};
```

<a id="sdk-dist-client-d-ts-model"></a>
#### Model

```ts
export type Model = {
    id: string;
    name: string;
    release_date: string;
    attachment: boolean;
    reasoning: boolean;
    temperature: boolean;
    tool_call: boolean;
    cost: {
        input: number;
        output: number;
        cache_read?: number;
        cache_write?: number;
        context_over_200k?: {
            input: number;
            output: number;
            cache_read?: number;
            cache_write?: number;
        };
    };
    limit: {
        context: number;
        output: number;
    };
    modalities?: {
        input: Array< |  |  |  | >;
        output: Array< |  |  |  | >;
    };
    experimental?: boolean;
    status?:  |  | ;
    options: {
        [key: string]: unknown;
    };
    headers?: {
        [key: string]: string;
    };
    provider?: {
        npm: string;
    };
};
```

<a id="sdk-dist-client-d-ts-provider"></a>
#### Provider

```ts
export type Provider = {
    api?: string;
    name: string;
    env: Array<string>;
    id: string;
    npm?: string;
    models: {
        [key: string]: Model;
    };
};
```

<a id="sdk-dist-client-d-ts-providerauthmethod"></a>
#### ProviderAuthMethod

```ts
export type ProviderAuthMethod = {
    type:  | ;
    label: string;
};
```

<a id="sdk-dist-client-d-ts-providerauthauthorization"></a>
#### ProviderAuthAuthorization

```ts
export type ProviderAuthAuthorization = {
    url: string;
    method:  | ;
    instructions: string;
};
```

<a id="sdk-dist-client-d-ts-symbol"></a>
#### Symbol

```ts
export type Symbol = {
    name: string;
    kind: number;
    location: {
        uri: string;
        range: Range;
    };
};
```

<a id="sdk-dist-client-d-ts-filenode"></a>
#### FileNode

```ts
export type FileNode = {
    name: string;
    path: string;
    absolute: string;
    type:  | ;
    ignored: boolean;
};
```

<a id="sdk-dist-client-d-ts-filecontent"></a>
#### FileContent

```ts
export type FileContent = {
    type: ;
    content: string;
    diff?: string;
    patch?: {
        oldFileName: string;
        newFileName: string;
        oldHeader?: string;
        newHeader?: string;
        hunks: Array<{
            oldStart: number;
            oldLines: number;
            newStart: number;
            newLines: number;
            lines: Array<string>;
        }>;
        index?: string;
    };
    encoding?: ;
    mimeType?: string;
};
```

<a id="sdk-dist-client-d-ts-file"></a>
#### File

```ts
export type File = {
    path: string;
    added: number;
    removed: number;
    status:  |  | ;
};
```

<a id="sdk-dist-client-d-ts-agent"></a>
#### Agent

```ts
export type Agent = {
    name: string;
    description?: string;
    mode:  |  | ;
    builtIn: boolean;
    topP?: number;
    temperature?: number;
    color?: string;
    permission: {
        edit:  |  | ;
        bash: {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    model?: {
        modelID: string;
        providerID: string;
    };
    prompt?: string;
    tools: {
        [key: string]: boolean;
    };
    options: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-client-d-ts-mcpstatusconnected"></a>
#### McpStatusConnected

```ts
export type McpStatusConnected = {
    status: ;
};
```

<a id="sdk-dist-client-d-ts-mcpstatusdisabled"></a>
#### McpStatusDisabled

```ts
export type McpStatusDisabled = {
    status: ;
};
```

<a id="sdk-dist-client-d-ts-mcpstatusfailed"></a>
#### McpStatusFailed

```ts
export type McpStatusFailed = {
    status: ;
    error: string;
};
```

<a id="sdk-dist-client-d-ts-mcpstatus"></a>
#### McpStatus

```ts
export type McpStatus = McpStatusConnected | McpStatusDisabled | McpStatusFailed;
```

<a id="sdk-dist-client-d-ts-lspstatus"></a>
#### LspStatus

```ts
export type LspStatus = {
    id: string;
    name: string;
    root: string;
    status:  | ;
};
```

<a id="sdk-dist-client-d-ts-formatterstatus"></a>
#### FormatterStatus

```ts
export type FormatterStatus = {
    name: string;
    extensions: Array<string>;
    enabled: boolean;
};
```

<a id="sdk-dist-client-d-ts-oauth"></a>
#### OAuth

```ts
export type OAuth = {
    type: ;
    refresh: string;
    access: string;
    expires: number;
    enterpriseUrl?: string;
};
```

<a id="sdk-dist-client-d-ts-apiauth"></a>
#### ApiAuth

```ts
export type ApiAuth = {
    type: ;
    key: string;
};
```

<a id="sdk-dist-client-d-ts-wellknownauth"></a>
#### WellKnownAuth

```ts
export type WellKnownAuth = {
    type: ;
    key: string;
    token: string;
};
```

<a id="sdk-dist-client-d-ts-auth"></a>
#### Auth

```ts
export type Auth = OAuth | ApiAuth | WellKnownAuth;
```

<a id="sdk-dist-client-d-ts-globaleventdata"></a>
#### GlobalEventData

```ts
export type GlobalEventData = {
    body?: never;
    path?: never;
    query?: never;
    url: ;
};
```

<a id="sdk-dist-client-d-ts-globaleventresponses"></a>
#### GlobalEventResponses

```ts
export type GlobalEventResponses = {
    : GlobalEvent;
};
```

<a id="sdk-dist-client-d-ts-globaleventresponse"></a>
#### GlobalEventResponse

```ts
export type GlobalEventResponse = GlobalEventResponses[keyof GlobalEventResponses];
```

<a id="sdk-dist-client-d-ts-projectlistdata"></a>
#### ProjectListData

```ts
export type ProjectListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-projectlistresponses"></a>
#### ProjectListResponses

```ts
export type ProjectListResponses = {
    : Array<Project>;
};
```

<a id="sdk-dist-client-d-ts-projectlistresponse"></a>
#### ProjectListResponse

```ts
export type ProjectListResponse = ProjectListResponses[keyof ProjectListResponses];
```

<a id="sdk-dist-client-d-ts-projectcurrentdata"></a>
#### ProjectCurrentData

```ts
export type ProjectCurrentData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-projectcurrentresponses"></a>
#### ProjectCurrentResponses

```ts
export type ProjectCurrentResponses = {
    : Project;
};
```

<a id="sdk-dist-client-d-ts-projectcurrentresponse"></a>
#### ProjectCurrentResponse

```ts
export type ProjectCurrentResponse = ProjectCurrentResponses[keyof ProjectCurrentResponses];
```

<a id="sdk-dist-client-d-ts-configgetdata"></a>
#### ConfigGetData

```ts
export type ConfigGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-configgetresponses"></a>
#### ConfigGetResponses

```ts
export type ConfigGetResponses = {
    : Config;
};
```

<a id="sdk-dist-client-d-ts-configgetresponse"></a>
#### ConfigGetResponse

```ts
export type ConfigGetResponse = ConfigGetResponses[keyof ConfigGetResponses];
```

<a id="sdk-dist-client-d-ts-configupdatedata"></a>
#### ConfigUpdateData

```ts
export type ConfigUpdateData = {
    body?: Config;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-configupdateerrors"></a>
#### ConfigUpdateErrors

```ts
export type ConfigUpdateErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-configupdateerror"></a>
#### ConfigUpdateError

```ts
export type ConfigUpdateError = ConfigUpdateErrors[keyof ConfigUpdateErrors];
```

<a id="sdk-dist-client-d-ts-configupdateresponses"></a>
#### ConfigUpdateResponses

```ts
export type ConfigUpdateResponses = {
    : Config;
};
```

<a id="sdk-dist-client-d-ts-configupdateresponse"></a>
#### ConfigUpdateResponse

```ts
export type ConfigUpdateResponse = ConfigUpdateResponses[keyof ConfigUpdateResponses];
```

<a id="sdk-dist-client-d-ts-toolidsdata"></a>
#### ToolIdsData

```ts
export type ToolIdsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-toolidserrors"></a>
#### ToolIdsErrors

```ts
export type ToolIdsErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-toolidserror"></a>
#### ToolIdsError

```ts
export type ToolIdsError = ToolIdsErrors[keyof ToolIdsErrors];
```

<a id="sdk-dist-client-d-ts-toolidsresponses"></a>
#### ToolIdsResponses

```ts
export type ToolIdsResponses = {
    : ToolIds;
};
```

<a id="sdk-dist-client-d-ts-toolidsresponse"></a>
#### ToolIdsResponse

```ts
export type ToolIdsResponse = ToolIdsResponses[keyof ToolIdsResponses];
```

<a id="sdk-dist-client-d-ts-toollistdata"></a>
#### ToolListData

```ts
export type ToolListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        provider: string;
        model: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-toollisterrors"></a>
#### ToolListErrors

```ts
export type ToolListErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-toollisterror"></a>
#### ToolListError

```ts
export type ToolListError = ToolListErrors[keyof ToolListErrors];
```

<a id="sdk-dist-client-d-ts-toollistresponses"></a>
#### ToolListResponses

```ts
export type ToolListResponses = {
    : ToolList;
};
```

<a id="sdk-dist-client-d-ts-toollistresponse"></a>
#### ToolListResponse

```ts
export type ToolListResponse = ToolListResponses[keyof ToolListResponses];
```

<a id="sdk-dist-client-d-ts-instancedisposedata"></a>
#### InstanceDisposeData

```ts
export type InstanceDisposeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-instancedisposeresponses"></a>
#### InstanceDisposeResponses

```ts
export type InstanceDisposeResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-instancedisposeresponse"></a>
#### InstanceDisposeResponse

```ts
export type InstanceDisposeResponse = InstanceDisposeResponses[keyof InstanceDisposeResponses];
```

<a id="sdk-dist-client-d-ts-pathgetdata"></a>
#### PathGetData

```ts
export type PathGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-pathgetresponses"></a>
#### PathGetResponses

```ts
export type PathGetResponses = {
    : Path;
};
```

<a id="sdk-dist-client-d-ts-pathgetresponse"></a>
#### PathGetResponse

```ts
export type PathGetResponse = PathGetResponses[keyof PathGetResponses];
```

<a id="sdk-dist-client-d-ts-vcsgetdata"></a>
#### VcsGetData

```ts
export type VcsGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-vcsgetresponses"></a>
#### VcsGetResponses

```ts
export type VcsGetResponses = {
    : VcsInfo;
};
```

<a id="sdk-dist-client-d-ts-vcsgetresponse"></a>
#### VcsGetResponse

```ts
export type VcsGetResponse = VcsGetResponses[keyof VcsGetResponses];
```

<a id="sdk-dist-client-d-ts-sessionlistdata"></a>
#### SessionListData

```ts
export type SessionListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionlistresponses"></a>
#### SessionListResponses

```ts
export type SessionListResponses = {
    : Array<Session>;
};
```

<a id="sdk-dist-client-d-ts-sessionlistresponse"></a>
#### SessionListResponse

```ts
export type SessionListResponse = SessionListResponses[keyof SessionListResponses];
```

<a id="sdk-dist-client-d-ts-sessioncreatedata"></a>
#### SessionCreateData

```ts
export type SessionCreateData = {
    body?: {
        parentID?: string;
        title?: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessioncreateerrors"></a>
#### SessionCreateErrors

```ts
export type SessionCreateErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-sessioncreateerror"></a>
#### SessionCreateError

```ts
export type SessionCreateError = SessionCreateErrors[keyof SessionCreateErrors];
```

<a id="sdk-dist-client-d-ts-sessioncreateresponses"></a>
#### SessionCreateResponses

```ts
export type SessionCreateResponses = {
    : Session;
};
```

<a id="sdk-dist-client-d-ts-sessioncreateresponse"></a>
#### SessionCreateResponse

```ts
export type SessionCreateResponse = SessionCreateResponses[keyof SessionCreateResponses];
```

<a id="sdk-dist-client-d-ts-sessionstatusdata"></a>
#### SessionStatusData

```ts
export type SessionStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionstatuserrors"></a>
#### SessionStatusErrors

```ts
export type SessionStatusErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-sessionstatuserror"></a>
#### SessionStatusError

```ts
export type SessionStatusError = SessionStatusErrors[keyof SessionStatusErrors];
```

<a id="sdk-dist-client-d-ts-sessionstatusresponses"></a>
#### SessionStatusResponses

```ts
export type SessionStatusResponses = {
    : {
        [key: string]: SessionStatus;
    };
};
```

<a id="sdk-dist-client-d-ts-sessionstatusresponse"></a>
#### SessionStatusResponse

```ts
export type SessionStatusResponse = SessionStatusResponses[keyof SessionStatusResponses];
```

<a id="sdk-dist-client-d-ts-sessiondeletedata"></a>
#### SessionDeleteData

```ts
export type SessionDeleteData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessiondeleteerrors"></a>
#### SessionDeleteErrors

```ts
export type SessionDeleteErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessiondeleteerror"></a>
#### SessionDeleteError

```ts
export type SessionDeleteError = SessionDeleteErrors[keyof SessionDeleteErrors];
```

<a id="sdk-dist-client-d-ts-sessiondeleteresponses"></a>
#### SessionDeleteResponses

```ts
export type SessionDeleteResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-sessiondeleteresponse"></a>
#### SessionDeleteResponse

```ts
export type SessionDeleteResponse = SessionDeleteResponses[keyof SessionDeleteResponses];
```

<a id="sdk-dist-client-d-ts-sessiongetdata"></a>
#### SessionGetData

```ts
export type SessionGetData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessiongeterrors"></a>
#### SessionGetErrors

```ts
export type SessionGetErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessiongeterror"></a>
#### SessionGetError

```ts
export type SessionGetError = SessionGetErrors[keyof SessionGetErrors];
```

<a id="sdk-dist-client-d-ts-sessiongetresponses"></a>
#### SessionGetResponses

```ts
export type SessionGetResponses = {
    : Session;
};
```

<a id="sdk-dist-client-d-ts-sessiongetresponse"></a>
#### SessionGetResponse

```ts
export type SessionGetResponse = SessionGetResponses[keyof SessionGetResponses];
```

<a id="sdk-dist-client-d-ts-sessionupdatedata"></a>
#### SessionUpdateData

```ts
export type SessionUpdateData = {
    body?: {
        title?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionupdateerrors"></a>
#### SessionUpdateErrors

```ts
export type SessionUpdateErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionupdateerror"></a>
#### SessionUpdateError

```ts
export type SessionUpdateError = SessionUpdateErrors[keyof SessionUpdateErrors];
```

<a id="sdk-dist-client-d-ts-sessionupdateresponses"></a>
#### SessionUpdateResponses

```ts
export type SessionUpdateResponses = {
    : Session;
};
```

<a id="sdk-dist-client-d-ts-sessionupdateresponse"></a>
#### SessionUpdateResponse

```ts
export type SessionUpdateResponse = SessionUpdateResponses[keyof SessionUpdateResponses];
```

<a id="sdk-dist-client-d-ts-sessionchildrendata"></a>
#### SessionChildrenData

```ts
export type SessionChildrenData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionchildrenerrors"></a>
#### SessionChildrenErrors

```ts
export type SessionChildrenErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionchildrenerror"></a>
#### SessionChildrenError

```ts
export type SessionChildrenError = SessionChildrenErrors[keyof SessionChildrenErrors];
```

<a id="sdk-dist-client-d-ts-sessionchildrenresponses"></a>
#### SessionChildrenResponses

```ts
export type SessionChildrenResponses = {
    : Array<Session>;
};
```

<a id="sdk-dist-client-d-ts-sessionchildrenresponse"></a>
#### SessionChildrenResponse

```ts
export type SessionChildrenResponse = SessionChildrenResponses[keyof SessionChildrenResponses];
```

<a id="sdk-dist-client-d-ts-sessiontododata"></a>
#### SessionTodoData

```ts
export type SessionTodoData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessiontodoerrors"></a>
#### SessionTodoErrors

```ts
export type SessionTodoErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessiontodoerror"></a>
#### SessionTodoError

```ts
export type SessionTodoError = SessionTodoErrors[keyof SessionTodoErrors];
```

<a id="sdk-dist-client-d-ts-sessiontodoresponses"></a>
#### SessionTodoResponses

```ts
export type SessionTodoResponses = {
    : Array<Todo>;
};
```

<a id="sdk-dist-client-d-ts-sessiontodoresponse"></a>
#### SessionTodoResponse

```ts
export type SessionTodoResponse = SessionTodoResponses[keyof SessionTodoResponses];
```

<a id="sdk-dist-client-d-ts-sessioninitdata"></a>
#### SessionInitData

```ts
export type SessionInitData = {
    body?: {
        modelID: string;
        providerID: string;
        messageID: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessioniniterrors"></a>
#### SessionInitErrors

```ts
export type SessionInitErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessioniniterror"></a>
#### SessionInitError

```ts
export type SessionInitError = SessionInitErrors[keyof SessionInitErrors];
```

<a id="sdk-dist-client-d-ts-sessioninitresponses"></a>
#### SessionInitResponses

```ts
export type SessionInitResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-sessioninitresponse"></a>
#### SessionInitResponse

```ts
export type SessionInitResponse = SessionInitResponses[keyof SessionInitResponses];
```

<a id="sdk-dist-client-d-ts-sessionforkdata"></a>
#### SessionForkData

```ts
export type SessionForkData = {
    body?: {
        messageID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionforkresponses"></a>
#### SessionForkResponses

```ts
export type SessionForkResponses = {
    : Session;
};
```

<a id="sdk-dist-client-d-ts-sessionforkresponse"></a>
#### SessionForkResponse

```ts
export type SessionForkResponse = SessionForkResponses[keyof SessionForkResponses];
```

<a id="sdk-dist-client-d-ts-sessionabortdata"></a>
#### SessionAbortData

```ts
export type SessionAbortData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionaborterrors"></a>
#### SessionAbortErrors

```ts
export type SessionAbortErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionaborterror"></a>
#### SessionAbortError

```ts
export type SessionAbortError = SessionAbortErrors[keyof SessionAbortErrors];
```

<a id="sdk-dist-client-d-ts-sessionabortresponses"></a>
#### SessionAbortResponses

```ts
export type SessionAbortResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-sessionabortresponse"></a>
#### SessionAbortResponse

```ts
export type SessionAbortResponse = SessionAbortResponses[keyof SessionAbortResponses];
```

<a id="sdk-dist-client-d-ts-sessionunsharedata"></a>
#### SessionUnshareData

```ts
export type SessionUnshareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionunshareerrors"></a>
#### SessionUnshareErrors

```ts
export type SessionUnshareErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionunshareerror"></a>
#### SessionUnshareError

```ts
export type SessionUnshareError = SessionUnshareErrors[keyof SessionUnshareErrors];
```

<a id="sdk-dist-client-d-ts-sessionunshareresponses"></a>
#### SessionUnshareResponses

```ts
export type SessionUnshareResponses = {
    : Session;
};
```

<a id="sdk-dist-client-d-ts-sessionunshareresponse"></a>
#### SessionUnshareResponse

```ts
export type SessionUnshareResponse = SessionUnshareResponses[keyof SessionUnshareResponses];
```

<a id="sdk-dist-client-d-ts-sessionsharedata"></a>
#### SessionShareData

```ts
export type SessionShareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionshareerrors"></a>
#### SessionShareErrors

```ts
export type SessionShareErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionshareerror"></a>
#### SessionShareError

```ts
export type SessionShareError = SessionShareErrors[keyof SessionShareErrors];
```

<a id="sdk-dist-client-d-ts-sessionshareresponses"></a>
#### SessionShareResponses

```ts
export type SessionShareResponses = {
    : Session;
};
```

<a id="sdk-dist-client-d-ts-sessionshareresponse"></a>
#### SessionShareResponse

```ts
export type SessionShareResponse = SessionShareResponses[keyof SessionShareResponses];
```

<a id="sdk-dist-client-d-ts-sessiondiffdata"></a>
#### SessionDiffData

```ts
export type SessionDiffData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
        messageID?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessiondifferrors"></a>
#### SessionDiffErrors

```ts
export type SessionDiffErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessiondifferror"></a>
#### SessionDiffError

```ts
export type SessionDiffError = SessionDiffErrors[keyof SessionDiffErrors];
```

<a id="sdk-dist-client-d-ts-sessiondiffresponses"></a>
#### SessionDiffResponses

```ts
export type SessionDiffResponses = {
    : Array<FileDiff>;
};
```

<a id="sdk-dist-client-d-ts-sessiondiffresponse"></a>
#### SessionDiffResponse

```ts
export type SessionDiffResponse = SessionDiffResponses[keyof SessionDiffResponses];
```

<a id="sdk-dist-client-d-ts-sessionsummarizedata"></a>
#### SessionSummarizeData

```ts
export type SessionSummarizeData = {
    body?: {
        providerID: string;
        modelID: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionsummarizeerrors"></a>
#### SessionSummarizeErrors

```ts
export type SessionSummarizeErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionsummarizeerror"></a>
#### SessionSummarizeError

```ts
export type SessionSummarizeError = SessionSummarizeErrors[keyof SessionSummarizeErrors];
```

<a id="sdk-dist-client-d-ts-sessionsummarizeresponses"></a>
#### SessionSummarizeResponses

```ts
export type SessionSummarizeResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-sessionsummarizeresponse"></a>
#### SessionSummarizeResponse

```ts
export type SessionSummarizeResponse = SessionSummarizeResponses[keyof SessionSummarizeResponses];
```

<a id="sdk-dist-client-d-ts-sessionmessagesdata"></a>
#### SessionMessagesData

```ts
export type SessionMessagesData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
        limit?: number;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionmessageserrors"></a>
#### SessionMessagesErrors

```ts
export type SessionMessagesErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionmessageserror"></a>
#### SessionMessagesError

```ts
export type SessionMessagesError = SessionMessagesErrors[keyof SessionMessagesErrors];
```

<a id="sdk-dist-client-d-ts-sessionmessagesresponses"></a>
#### SessionMessagesResponses

```ts
export type SessionMessagesResponses = {
    : Array<{
        info: Message;
        parts: Array<Part>;
    }>;
};
```

<a id="sdk-dist-client-d-ts-sessionmessagesresponse"></a>
#### SessionMessagesResponse

```ts
export type SessionMessagesResponse = SessionMessagesResponses[keyof SessionMessagesResponses];
```

<a id="sdk-dist-client-d-ts-sessionpromptdata"></a>
#### SessionPromptData

```ts
export type SessionPromptData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionprompterrors"></a>
#### SessionPromptErrors

```ts
export type SessionPromptErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionprompterror"></a>
#### SessionPromptError

```ts
export type SessionPromptError = SessionPromptErrors[keyof SessionPromptErrors];
```

<a id="sdk-dist-client-d-ts-sessionpromptresponses"></a>
#### SessionPromptResponses

```ts
export type SessionPromptResponses = {
    : {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-client-d-ts-sessionpromptresponse"></a>
#### SessionPromptResponse

```ts
export type SessionPromptResponse = SessionPromptResponses[keyof SessionPromptResponses];
```

<a id="sdk-dist-client-d-ts-sessionmessagedata"></a>
#### SessionMessageData

```ts
export type SessionMessageData = {
    body?: never;
    path: {
        id: string;
        messageID: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionmessageerrors"></a>
#### SessionMessageErrors

```ts
export type SessionMessageErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionmessageerror"></a>
#### SessionMessageError

```ts
export type SessionMessageError = SessionMessageErrors[keyof SessionMessageErrors];
```

<a id="sdk-dist-client-d-ts-sessionmessageresponses"></a>
#### SessionMessageResponses

```ts
export type SessionMessageResponses = {
    : {
        info: Message;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-client-d-ts-sessionmessageresponse"></a>
#### SessionMessageResponse

```ts
export type SessionMessageResponse = SessionMessageResponses[keyof SessionMessageResponses];
```

<a id="sdk-dist-client-d-ts-sessionpromptasyncdata"></a>
#### SessionPromptAsyncData

```ts
export type SessionPromptAsyncData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionpromptasyncerrors"></a>
#### SessionPromptAsyncErrors

```ts
export type SessionPromptAsyncErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionpromptasyncerror"></a>
#### SessionPromptAsyncError

```ts
export type SessionPromptAsyncError = SessionPromptAsyncErrors[keyof SessionPromptAsyncErrors];
```

<a id="sdk-dist-client-d-ts-sessionpromptasyncresponses"></a>
#### SessionPromptAsyncResponses

```ts
export type SessionPromptAsyncResponses = {
    : void;
};
```

<a id="sdk-dist-client-d-ts-sessionpromptasyncresponse"></a>
#### SessionPromptAsyncResponse

```ts
export type SessionPromptAsyncResponse = SessionPromptAsyncResponses[keyof SessionPromptAsyncResponses];
```

<a id="sdk-dist-client-d-ts-sessioncommanddata"></a>
#### SessionCommandData

```ts
export type SessionCommandData = {
    body?: {
        messageID?: string;
        agent?: string;
        model?: string;
        arguments: string;
        command: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessioncommanderrors"></a>
#### SessionCommandErrors

```ts
export type SessionCommandErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessioncommanderror"></a>
#### SessionCommandError

```ts
export type SessionCommandError = SessionCommandErrors[keyof SessionCommandErrors];
```

<a id="sdk-dist-client-d-ts-sessioncommandresponses"></a>
#### SessionCommandResponses

```ts
export type SessionCommandResponses = {
    : {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-client-d-ts-sessioncommandresponse"></a>
#### SessionCommandResponse

```ts
export type SessionCommandResponse = SessionCommandResponses[keyof SessionCommandResponses];
```

<a id="sdk-dist-client-d-ts-sessionshelldata"></a>
#### SessionShellData

```ts
export type SessionShellData = {
    body?: {
        agent: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        command: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionshellerrors"></a>
#### SessionShellErrors

```ts
export type SessionShellErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionshellerror"></a>
#### SessionShellError

```ts
export type SessionShellError = SessionShellErrors[keyof SessionShellErrors];
```

<a id="sdk-dist-client-d-ts-sessionshellresponses"></a>
#### SessionShellResponses

```ts
export type SessionShellResponses = {
    : AssistantMessage;
};
```

<a id="sdk-dist-client-d-ts-sessionshellresponse"></a>
#### SessionShellResponse

```ts
export type SessionShellResponse = SessionShellResponses[keyof SessionShellResponses];
```

<a id="sdk-dist-client-d-ts-sessionrevertdata"></a>
#### SessionRevertData

```ts
export type SessionRevertData = {
    body?: {
        messageID: string;
        partID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionreverterrors"></a>
#### SessionRevertErrors

```ts
export type SessionRevertErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionreverterror"></a>
#### SessionRevertError

```ts
export type SessionRevertError = SessionRevertErrors[keyof SessionRevertErrors];
```

<a id="sdk-dist-client-d-ts-sessionrevertresponses"></a>
#### SessionRevertResponses

```ts
export type SessionRevertResponses = {
    : Session;
};
```

<a id="sdk-dist-client-d-ts-sessionrevertresponse"></a>
#### SessionRevertResponse

```ts
export type SessionRevertResponse = SessionRevertResponses[keyof SessionRevertResponses];
```

<a id="sdk-dist-client-d-ts-sessionunrevertdata"></a>
#### SessionUnrevertData

```ts
export type SessionUnrevertData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-sessionunreverterrors"></a>
#### SessionUnrevertErrors

```ts
export type SessionUnrevertErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-sessionunreverterror"></a>
#### SessionUnrevertError

```ts
export type SessionUnrevertError = SessionUnrevertErrors[keyof SessionUnrevertErrors];
```

<a id="sdk-dist-client-d-ts-sessionunrevertresponses"></a>
#### SessionUnrevertResponses

```ts
export type SessionUnrevertResponses = {
    : Session;
};
```

<a id="sdk-dist-client-d-ts-sessionunrevertresponse"></a>
#### SessionUnrevertResponse

```ts
export type SessionUnrevertResponse = SessionUnrevertResponses[keyof SessionUnrevertResponses];
```

<a id="sdk-dist-client-d-ts-postsessionidpermissionspermissioniddata"></a>
#### PostSessionIdPermissionsPermissionIdData

```ts
export type PostSessionIdPermissionsPermissionIdData = {
    body?: {
        response:  |  | ;
    };
    path: {
        id: string;
        permissionID: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-postsessionidpermissionspermissioniderrors"></a>
#### PostSessionIdPermissionsPermissionIdErrors

```ts
export type PostSessionIdPermissionsPermissionIdErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-client-d-ts-postsessionidpermissionspermissioniderror"></a>
#### PostSessionIdPermissionsPermissionIdError

```ts
export type PostSessionIdPermissionsPermissionIdError = PostSessionIdPermissionsPermissionIdErrors[keyof PostSessionIdPermissionsPermissionIdErrors];
```

<a id="sdk-dist-client-d-ts-postsessionidpermissionspermissionidresponses"></a>
#### PostSessionIdPermissionsPermissionIdResponses

```ts
export type PostSessionIdPermissionsPermissionIdResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-postsessionidpermissionspermissionidresponse"></a>
#### PostSessionIdPermissionsPermissionIdResponse

```ts
export type PostSessionIdPermissionsPermissionIdResponse = PostSessionIdPermissionsPermissionIdResponses[keyof PostSessionIdPermissionsPermissionIdResponses];
```

<a id="sdk-dist-client-d-ts-commandlistdata"></a>
#### CommandListData

```ts
export type CommandListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-commandlistresponses"></a>
#### CommandListResponses

```ts
export type CommandListResponses = {
    : Array<Command>;
};
```

<a id="sdk-dist-client-d-ts-commandlistresponse"></a>
#### CommandListResponse

```ts
export type CommandListResponse = CommandListResponses[keyof CommandListResponses];
```

<a id="sdk-dist-client-d-ts-configprovidersdata"></a>
#### ConfigProvidersData

```ts
export type ConfigProvidersData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-configprovidersresponses"></a>
#### ConfigProvidersResponses

```ts
export type ConfigProvidersResponses = {
    : {
        providers: Array<Provider>;
        default: {
            [key: string]: string;
        };
    };
};
```

<a id="sdk-dist-client-d-ts-configprovidersresponse"></a>
#### ConfigProvidersResponse

```ts
export type ConfigProvidersResponse = ConfigProvidersResponses[keyof ConfigProvidersResponses];
```

<a id="sdk-dist-client-d-ts-providerlistdata"></a>
#### ProviderListData

```ts
export type ProviderListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-providerlistresponses"></a>
#### ProviderListResponses

```ts
export type ProviderListResponses = {
    : {
        all: Array<Provider>;
        default: {
            [key: string]: string;
        };
        connected: Array<string>;
    };
};
```

<a id="sdk-dist-client-d-ts-providerlistresponse"></a>
#### ProviderListResponse

```ts
export type ProviderListResponse = ProviderListResponses[keyof ProviderListResponses];
```

<a id="sdk-dist-client-d-ts-providerauthdata"></a>
#### ProviderAuthData

```ts
export type ProviderAuthData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-providerauthresponses"></a>
#### ProviderAuthResponses

```ts
export type ProviderAuthResponses = {
    : {
        [key: string]: Array<ProviderAuthMethod>;
    };
};
```

<a id="sdk-dist-client-d-ts-providerauthresponse"></a>
#### ProviderAuthResponse

```ts
export type ProviderAuthResponse = ProviderAuthResponses[keyof ProviderAuthResponses];
```

<a id="sdk-dist-client-d-ts-provideroauthauthorizedata"></a>
#### ProviderOauthAuthorizeData

```ts
export type ProviderOauthAuthorizeData = {
    body?: {
        method: number;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-provideroauthauthorizeerrors"></a>
#### ProviderOauthAuthorizeErrors

```ts
export type ProviderOauthAuthorizeErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-provideroauthauthorizeerror"></a>
#### ProviderOauthAuthorizeError

```ts
export type ProviderOauthAuthorizeError = ProviderOauthAuthorizeErrors[keyof ProviderOauthAuthorizeErrors];
```

<a id="sdk-dist-client-d-ts-provideroauthauthorizeresponses"></a>
#### ProviderOauthAuthorizeResponses

```ts
export type ProviderOauthAuthorizeResponses = {
    : ProviderAuthAuthorization;
};
```

<a id="sdk-dist-client-d-ts-provideroauthauthorizeresponse"></a>
#### ProviderOauthAuthorizeResponse

```ts
export type ProviderOauthAuthorizeResponse = ProviderOauthAuthorizeResponses[keyof ProviderOauthAuthorizeResponses];
```

<a id="sdk-dist-client-d-ts-provideroauthcallbackdata"></a>
#### ProviderOauthCallbackData

```ts
export type ProviderOauthCallbackData = {
    body?: {
        method: number;
        code?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-provideroauthcallbackerrors"></a>
#### ProviderOauthCallbackErrors

```ts
export type ProviderOauthCallbackErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-provideroauthcallbackerror"></a>
#### ProviderOauthCallbackError

```ts
export type ProviderOauthCallbackError = ProviderOauthCallbackErrors[keyof ProviderOauthCallbackErrors];
```

<a id="sdk-dist-client-d-ts-provideroauthcallbackresponses"></a>
#### ProviderOauthCallbackResponses

```ts
export type ProviderOauthCallbackResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-provideroauthcallbackresponse"></a>
#### ProviderOauthCallbackResponse

```ts
export type ProviderOauthCallbackResponse = ProviderOauthCallbackResponses[keyof ProviderOauthCallbackResponses];
```

<a id="sdk-dist-client-d-ts-findtextdata"></a>
#### FindTextData

```ts
export type FindTextData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        pattern: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-findtextresponses"></a>
#### FindTextResponses

```ts
export type FindTextResponses = {
    : Array<{
        path: {
            text: string;
        };
        lines: {
            text: string;
        };
        line_number: number;
        absolute_offset: number;
        submatches: Array<{
            match: {
                text: string;
            };
            start: number;
            end: number;
        }>;
    }>;
};
```

<a id="sdk-dist-client-d-ts-findtextresponse"></a>
#### FindTextResponse

```ts
export type FindTextResponse = FindTextResponses[keyof FindTextResponses];
```

<a id="sdk-dist-client-d-ts-findfilesdata"></a>
#### FindFilesData

```ts
export type FindFilesData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
        dirs?:  | ;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-findfilesresponses"></a>
#### FindFilesResponses

```ts
export type FindFilesResponses = {
    : Array<string>;
};
```

<a id="sdk-dist-client-d-ts-findfilesresponse"></a>
#### FindFilesResponse

```ts
export type FindFilesResponse = FindFilesResponses[keyof FindFilesResponses];
```

<a id="sdk-dist-client-d-ts-findsymbolsdata"></a>
#### FindSymbolsData

```ts
export type FindSymbolsData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-findsymbolsresponses"></a>
#### FindSymbolsResponses

```ts
export type FindSymbolsResponses = {
    : Array<Symbol>;
};
```

<a id="sdk-dist-client-d-ts-findsymbolsresponse"></a>
#### FindSymbolsResponse

```ts
export type FindSymbolsResponse = FindSymbolsResponses[keyof FindSymbolsResponses];
```

<a id="sdk-dist-client-d-ts-filelistdata"></a>
#### FileListData

```ts
export type FileListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-filelistresponses"></a>
#### FileListResponses

```ts
export type FileListResponses = {
    : Array<FileNode>;
};
```

<a id="sdk-dist-client-d-ts-filelistresponse"></a>
#### FileListResponse

```ts
export type FileListResponse = FileListResponses[keyof FileListResponses];
```

<a id="sdk-dist-client-d-ts-filereaddata"></a>
#### FileReadData

```ts
export type FileReadData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-filereadresponses"></a>
#### FileReadResponses

```ts
export type FileReadResponses = {
    : FileContent;
};
```

<a id="sdk-dist-client-d-ts-filereadresponse"></a>
#### FileReadResponse

```ts
export type FileReadResponse = FileReadResponses[keyof FileReadResponses];
```

<a id="sdk-dist-client-d-ts-filestatusdata"></a>
#### FileStatusData

```ts
export type FileStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-filestatusresponses"></a>
#### FileStatusResponses

```ts
export type FileStatusResponses = {
    : Array<File>;
};
```

<a id="sdk-dist-client-d-ts-filestatusresponse"></a>
#### FileStatusResponse

```ts
export type FileStatusResponse = FileStatusResponses[keyof FileStatusResponses];
```

<a id="sdk-dist-client-d-ts-applogdata"></a>
#### AppLogData

```ts
export type AppLogData = {
    body?: {
        service: string;
        level:  |  |  | ;
        message: string;
        extra?: {
            [key: string]: unknown;
        };
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-applogerrors"></a>
#### AppLogErrors

```ts
export type AppLogErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-applogerror"></a>
#### AppLogError

```ts
export type AppLogError = AppLogErrors[keyof AppLogErrors];
```

<a id="sdk-dist-client-d-ts-applogresponses"></a>
#### AppLogResponses

```ts
export type AppLogResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-applogresponse"></a>
#### AppLogResponse

```ts
export type AppLogResponse = AppLogResponses[keyof AppLogResponses];
```

<a id="sdk-dist-client-d-ts-appagentsdata"></a>
#### AppAgentsData

```ts
export type AppAgentsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-appagentsresponses"></a>
#### AppAgentsResponses

```ts
export type AppAgentsResponses = {
    : Array<Agent>;
};
```

<a id="sdk-dist-client-d-ts-appagentsresponse"></a>
#### AppAgentsResponse

```ts
export type AppAgentsResponse = AppAgentsResponses[keyof AppAgentsResponses];
```

<a id="sdk-dist-client-d-ts-mcpstatusdata"></a>
#### McpStatusData

```ts
export type McpStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-mcpstatusresponses"></a>
#### McpStatusResponses

```ts
export type McpStatusResponses = {
    : {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-client-d-ts-mcpstatusresponse"></a>
#### McpStatusResponse

```ts
export type McpStatusResponse = McpStatusResponses[keyof McpStatusResponses];
```

<a id="sdk-dist-client-d-ts-mcpadddata"></a>
#### McpAddData

```ts
export type McpAddData = {
    body?: {
        name: string;
        config: McpLocalConfig | McpRemoteConfig;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-mcpadderrors"></a>
#### McpAddErrors

```ts
export type McpAddErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-mcpadderror"></a>
#### McpAddError

```ts
export type McpAddError = McpAddErrors[keyof McpAddErrors];
```

<a id="sdk-dist-client-d-ts-mcpaddresponses"></a>
#### McpAddResponses

```ts
export type McpAddResponses = {
    : {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-client-d-ts-mcpaddresponse"></a>
#### McpAddResponse

```ts
export type McpAddResponse = McpAddResponses[keyof McpAddResponses];
```

<a id="sdk-dist-client-d-ts-lspstatusdata"></a>
#### LspStatusData

```ts
export type LspStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-lspstatusresponses"></a>
#### LspStatusResponses

```ts
export type LspStatusResponses = {
    : Array<LspStatus>;
};
```

<a id="sdk-dist-client-d-ts-lspstatusresponse"></a>
#### LspStatusResponse

```ts
export type LspStatusResponse = LspStatusResponses[keyof LspStatusResponses];
```

<a id="sdk-dist-client-d-ts-formatterstatusdata"></a>
#### FormatterStatusData

```ts
export type FormatterStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-formatterstatusresponses"></a>
#### FormatterStatusResponses

```ts
export type FormatterStatusResponses = {
    : Array<FormatterStatus>;
};
```

<a id="sdk-dist-client-d-ts-formatterstatusresponse"></a>
#### FormatterStatusResponse

```ts
export type FormatterStatusResponse = FormatterStatusResponses[keyof FormatterStatusResponses];
```

<a id="sdk-dist-client-d-ts-tuiappendpromptdata"></a>
#### TuiAppendPromptData

```ts
export type TuiAppendPromptData = {
    body?: {
        text: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuiappendprompterrors"></a>
#### TuiAppendPromptErrors

```ts
export type TuiAppendPromptErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-tuiappendprompterror"></a>
#### TuiAppendPromptError

```ts
export type TuiAppendPromptError = TuiAppendPromptErrors[keyof TuiAppendPromptErrors];
```

<a id="sdk-dist-client-d-ts-tuiappendpromptresponses"></a>
#### TuiAppendPromptResponses

```ts
export type TuiAppendPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuiappendpromptresponse"></a>
#### TuiAppendPromptResponse

```ts
export type TuiAppendPromptResponse = TuiAppendPromptResponses[keyof TuiAppendPromptResponses];
```

<a id="sdk-dist-client-d-ts-tuiopenhelpdata"></a>
#### TuiOpenHelpData

```ts
export type TuiOpenHelpData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuiopenhelpresponses"></a>
#### TuiOpenHelpResponses

```ts
export type TuiOpenHelpResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuiopenhelpresponse"></a>
#### TuiOpenHelpResponse

```ts
export type TuiOpenHelpResponse = TuiOpenHelpResponses[keyof TuiOpenHelpResponses];
```

<a id="sdk-dist-client-d-ts-tuiopensessionsdata"></a>
#### TuiOpenSessionsData

```ts
export type TuiOpenSessionsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuiopensessionsresponses"></a>
#### TuiOpenSessionsResponses

```ts
export type TuiOpenSessionsResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuiopensessionsresponse"></a>
#### TuiOpenSessionsResponse

```ts
export type TuiOpenSessionsResponse = TuiOpenSessionsResponses[keyof TuiOpenSessionsResponses];
```

<a id="sdk-dist-client-d-ts-tuiopenthemesdata"></a>
#### TuiOpenThemesData

```ts
export type TuiOpenThemesData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuiopenthemesresponses"></a>
#### TuiOpenThemesResponses

```ts
export type TuiOpenThemesResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuiopenthemesresponse"></a>
#### TuiOpenThemesResponse

```ts
export type TuiOpenThemesResponse = TuiOpenThemesResponses[keyof TuiOpenThemesResponses];
```

<a id="sdk-dist-client-d-ts-tuiopenmodelsdata"></a>
#### TuiOpenModelsData

```ts
export type TuiOpenModelsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuiopenmodelsresponses"></a>
#### TuiOpenModelsResponses

```ts
export type TuiOpenModelsResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuiopenmodelsresponse"></a>
#### TuiOpenModelsResponse

```ts
export type TuiOpenModelsResponse = TuiOpenModelsResponses[keyof TuiOpenModelsResponses];
```

<a id="sdk-dist-client-d-ts-tuisubmitpromptdata"></a>
#### TuiSubmitPromptData

```ts
export type TuiSubmitPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuisubmitpromptresponses"></a>
#### TuiSubmitPromptResponses

```ts
export type TuiSubmitPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuisubmitpromptresponse"></a>
#### TuiSubmitPromptResponse

```ts
export type TuiSubmitPromptResponse = TuiSubmitPromptResponses[keyof TuiSubmitPromptResponses];
```

<a id="sdk-dist-client-d-ts-tuiclearpromptdata"></a>
#### TuiClearPromptData

```ts
export type TuiClearPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuiclearpromptresponses"></a>
#### TuiClearPromptResponses

```ts
export type TuiClearPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuiclearpromptresponse"></a>
#### TuiClearPromptResponse

```ts
export type TuiClearPromptResponse = TuiClearPromptResponses[keyof TuiClearPromptResponses];
```

<a id="sdk-dist-client-d-ts-tuiexecutecommanddata"></a>
#### TuiExecuteCommandData

```ts
export type TuiExecuteCommandData = {
    body?: {
        command: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuiexecutecommanderrors"></a>
#### TuiExecuteCommandErrors

```ts
export type TuiExecuteCommandErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-tuiexecutecommanderror"></a>
#### TuiExecuteCommandError

```ts
export type TuiExecuteCommandError = TuiExecuteCommandErrors[keyof TuiExecuteCommandErrors];
```

<a id="sdk-dist-client-d-ts-tuiexecutecommandresponses"></a>
#### TuiExecuteCommandResponses

```ts
export type TuiExecuteCommandResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuiexecutecommandresponse"></a>
#### TuiExecuteCommandResponse

```ts
export type TuiExecuteCommandResponse = TuiExecuteCommandResponses[keyof TuiExecuteCommandResponses];
```

<a id="sdk-dist-client-d-ts-tuishowtoastdata"></a>
#### TuiShowToastData

```ts
export type TuiShowToastData = {
    body?: {
        title?: string;
        message: string;
        variant:  |  |  | ;
        duration?: number;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuishowtoastresponses"></a>
#### TuiShowToastResponses

```ts
export type TuiShowToastResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuishowtoastresponse"></a>
#### TuiShowToastResponse

```ts
export type TuiShowToastResponse = TuiShowToastResponses[keyof TuiShowToastResponses];
```

<a id="sdk-dist-client-d-ts-tuipublishdata"></a>
#### TuiPublishData

```ts
export type TuiPublishData = {
    body?: EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuipublisherrors"></a>
#### TuiPublishErrors

```ts
export type TuiPublishErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-tuipublisherror"></a>
#### TuiPublishError

```ts
export type TuiPublishError = TuiPublishErrors[keyof TuiPublishErrors];
```

<a id="sdk-dist-client-d-ts-tuipublishresponses"></a>
#### TuiPublishResponses

```ts
export type TuiPublishResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuipublishresponse"></a>
#### TuiPublishResponse

```ts
export type TuiPublishResponse = TuiPublishResponses[keyof TuiPublishResponses];
```

<a id="sdk-dist-client-d-ts-tuicontrolnextdata"></a>
#### TuiControlNextData

```ts
export type TuiControlNextData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuicontrolnextresponses"></a>
#### TuiControlNextResponses

```ts
export type TuiControlNextResponses = {
    : {
        path: string;
        body: unknown;
    };
};
```

<a id="sdk-dist-client-d-ts-tuicontrolnextresponse"></a>
#### TuiControlNextResponse

```ts
export type TuiControlNextResponse = TuiControlNextResponses[keyof TuiControlNextResponses];
```

<a id="sdk-dist-client-d-ts-tuicontrolresponsedata"></a>
#### TuiControlResponseData

```ts
export type TuiControlResponseData = {
    body?: unknown;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-tuicontrolresponseresponses"></a>
#### TuiControlResponseResponses

```ts
export type TuiControlResponseResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-tuicontrolresponseresponse"></a>
#### TuiControlResponseResponse

```ts
export type TuiControlResponseResponse = TuiControlResponseResponses[keyof TuiControlResponseResponses];
```

<a id="sdk-dist-client-d-ts-authsetdata"></a>
#### AuthSetData

```ts
export type AuthSetData = {
    body?: Auth;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-authseterrors"></a>
#### AuthSetErrors

```ts
export type AuthSetErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-client-d-ts-authseterror"></a>
#### AuthSetError

```ts
export type AuthSetError = AuthSetErrors[keyof AuthSetErrors];
```

<a id="sdk-dist-client-d-ts-authsetresponses"></a>
#### AuthSetResponses

```ts
export type AuthSetResponses = {
    : boolean;
};
```

<a id="sdk-dist-client-d-ts-authsetresponse"></a>
#### AuthSetResponse

```ts
export type AuthSetResponse = AuthSetResponses[keyof AuthSetResponses];
```

<a id="sdk-dist-client-d-ts-eventsubscribedata"></a>
#### EventSubscribeData

```ts
export type EventSubscribeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-client-d-ts-eventsubscriberesponses"></a>
#### EventSubscribeResponses

```ts
export type EventSubscribeResponses = {
    : Event;
};
```

<a id="sdk-dist-client-d-ts-eventsubscriberesponse"></a>
#### EventSubscribeResponse

```ts
export type EventSubscribeResponse = EventSubscribeResponses[keyof EventSubscribeResponses];
```

<a id="sdk-dist-client-d-ts-clientoptions"></a>
#### ClientOptions

```ts
export type ClientOptions = {
    baseUrl: stringstring | (string & {});
};
```

## dist/index.js

### classs

<a id="sdk-dist-index-js-opencodeclient"></a>
#### OpencodeClient

```ts
export declare class OpencodeClient extends _HeyApiClient {
    postSessionIdPermissionsPermissionId<ThrowOnError extends boolean = false>(options: Options<PostSessionIdPermissionsPermissionIdData, ThrowOnError>): import().RequestResult<PostSessionIdPermissionsPermissionIdResponses, PostSessionIdPermissionsPermissionIdErrors, ThrowOnError, >;
    global: Global;
    project: Project;
    config: Config;
    tool: Tool;
    instance: Instance;
    path: Path;
    vcs: Vcs;
    session: Session;
    command: Command;
    provider: Provider;
    find: Find;
    file: File;
    app: App;
    mcp: Mcp;
    lsp: Lsp;
    formatter: Formatter;
    tui: Tui;
    auth: Auth;
    event: Event;
}
```

### functions

<a id="sdk-dist-index-js-createopencode"></a>
#### createOpencode

```ts
export async function createOpencode(options) {
    const server = await createOpencodeServer({
        ...options,
    });
    const client = createOpencodeClient({
        baseUrl: server.url,
    });
    return {
        client,
        server,
    };
}
```

<a id="sdk-dist-index-js-createopencodeclient"></a>
#### createOpencodeClient

```ts
export declare function createOpencodeClient(config?: Config & {
    directory?: string;
}): OpencodeClient;
```

<a id="sdk-dist-index-js-createopencodeserver"></a>
#### createOpencodeServer

```ts
export declare function createOpencodeServer(options?: ServerOptions): Promise<{
    url: string;
    close(): void;
}>;
```

<a id="sdk-dist-index-js-createopencodetui"></a>
#### createOpencodeTui

```ts
export declare function createOpencodeTui(options?: TuiOptions): {
    close(): void;
};
```

### interfaces

<a id="sdk-dist-index-js-opencodeclientconfig"></a>
#### OpencodeClientConfig

```ts
export interface Config<T extends ClientOptions = ClientOptions> extends Omit<RequestInit,  |  | >, CoreConfig {
    baseUrl?: T[];
    fetch?: (request: Request) => ReturnType<typeof fetch>;
    next?: never;
    parseAs?:  |  |  |  |  |  | ;
    responseStyle?: ResponseStyle;
    throwOnError?: T[];
}
```

### types

<a id="sdk-dist-index-js-eventinstallationupdated"></a>
#### EventInstallationUpdated

```ts
export type EventInstallationUpdated = {
    type: er.js";
import { create;
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-index-js-eventinstallationupdateavailable"></a>
#### EventInstallationUpdateAvailable

```ts
export type EventInstallationUpdateAvailable = {
    type: eateOpencode(options) {
    cons;
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-index-js-eventlspclientdiagnostics"></a>
#### EventLspClientDiagnostics

```ts
export type EventLspClientDiagnostics = {
    type: t({
        baseUrl: serv;
    properties: {
        serverID: string;
        path: string;
    };
};
```

<a id="sdk-dist-index-js-eventlspupdated"></a>
#### EventLspUpdated

```ts
export type EventLspUpdated = {
    type: ;
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-js-filediff"></a>
#### FileDiff

```ts
export type FileDiff = {
    file: string;
    before: string;
    after: string;
    additions: number;
    deletions: number;
};
```

<a id="sdk-dist-index-js-usermessage"></a>
#### UserMessage

```ts
export type UserMessage = {
    id: string;
    sessionID: string;
    role: ;
    time: {
        created: number;
    };
    summary?: {
        title?: string;
        body?: string;
        diffs: Array<FileDiff>;
    };
    agent: string;
    model: {
        providerID: string;
        modelID: string;
    };
    system?: string;
    tools?: {
        [key: string]: boolean;
    };
};
```

<a id="sdk-dist-index-js-providerautherror"></a>
#### ProviderAuthError

```ts
export type ProviderAuthError = {
    name: ;
    data: {
        providerID: string;
        message: string;
    };
};
```

<a id="sdk-dist-index-js-unknownerror"></a>
#### UnknownError

```ts
export type UnknownError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-index-js-messageoutputlengtherror"></a>
#### MessageOutputLengthError

```ts
export type MessageOutputLengthError = {
    name: ;
    data: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-js-messageabortederror"></a>
#### MessageAbortedError

```ts
export type MessageAbortedError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-index-js-apierror"></a>
#### ApiError

```ts
export type ApiError = {
    name: ;
    data: {
        message: string;
        statusCode?: number;
        isRetryable: boolean;
        responseHeaders?: {
            [key: string]: string;
        };
        responseBody?: string;
    };
};
```

<a id="sdk-dist-index-js-assistantmessage"></a>
#### AssistantMessage

```ts
export type AssistantMessage = {
    id: string;
    sessionID: string;
    role: ;
    time: {
        created: number;
        completed?: number;
    };
    error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    parentID: string;
    modelID: string;
    providerID: string;
    mode: string;
    path: {
        cwd: string;
        root: string;
    };
    summary?: boolean;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
    finish?: string;
};
```

<a id="sdk-dist-index-js-message"></a>
#### Message

```ts
export type Message = UserMessage | AssistantMessage;
```

<a id="sdk-dist-index-js-eventmessageupdated"></a>
#### EventMessageUpdated

```ts
export type EventMessageUpdated = {
    type: ;
    properties: {
        info: Message;
    };
};
```

<a id="sdk-dist-index-js-eventmessageremoved"></a>
#### EventMessageRemoved

```ts
export type EventMessageRemoved = {
    type: ;
    properties: {
        sessionID: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-index-js-textpart"></a>
#### TextPart

```ts
export type TextPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-js-reasoningpart"></a>
#### ReasoningPart

```ts
export type ReasoningPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    text: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end?: number;
    };
};
```

<a id="sdk-dist-index-js-filepartsourcetext"></a>
#### FilePartSourceText

```ts
export type FilePartSourceText = {
    value: string;
    start: number;
    end: number;
};
```

<a id="sdk-dist-index-js-filesource"></a>
#### FileSource

```ts
export type FileSource = {
    text: FilePartSourceText;
    type: ;
    path: string;
};
```

<a id="sdk-dist-index-js-range"></a>
#### Range

```ts
export type Range = {
    start: {
        line: number;
        character: number;
    };
    end: {
        line: number;
        character: number;
    };
};
```

<a id="sdk-dist-index-js-symbolsource"></a>
#### SymbolSource

```ts
export type SymbolSource = {
    text: FilePartSourceText;
    type: ;
    path: string;
    range: Range;
    name: string;
    kind: number;
};
```

<a id="sdk-dist-index-js-filepartsource"></a>
#### FilePartSource

```ts
export type FilePartSource = FileSource | SymbolSource;
```

<a id="sdk-dist-index-js-filepart"></a>
#### FilePart

```ts
export type FilePart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-index-js-toolstatepending"></a>
#### ToolStatePending

```ts
export type ToolStatePending = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    raw: string;
};
```

<a id="sdk-dist-index-js-toolstaterunning"></a>
#### ToolStateRunning

```ts
export type ToolStateRunning = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    title?: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
    };
};
```

<a id="sdk-dist-index-js-toolstatecompleted"></a>
#### ToolStateCompleted

```ts
export type ToolStateCompleted = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    output: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
        compacted?: number;
    };
    attachments?: Array<FilePart>;
};
```

<a id="sdk-dist-index-js-toolstateerror"></a>
#### ToolStateError

```ts
export type ToolStateError = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    error: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-index-js-toolstate"></a>
#### ToolState

```ts
export type ToolState = ToolStatePending | ToolStateRunning | ToolStateCompleted | ToolStateError;
```

<a id="sdk-dist-index-js-toolpart"></a>
#### ToolPart

```ts
export type ToolPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    callID: string;
    tool: string;
    state: ToolState;
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-js-stepstartpart"></a>
#### StepStartPart

```ts
export type StepStartPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    snapshot?: string;
};
```

<a id="sdk-dist-index-js-stepfinishpart"></a>
#### StepFinishPart

```ts
export type StepFinishPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    reason: string;
    snapshot?: string;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
};
```

<a id="sdk-dist-index-js-snapshotpart"></a>
#### SnapshotPart

```ts
export type SnapshotPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    snapshot: string;
};
```

<a id="sdk-dist-index-js-patchpart"></a>
#### PatchPart

```ts
export type PatchPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    hash: string;
    files: Array<string>;
};
```

<a id="sdk-dist-index-js-agentpart"></a>
#### AgentPart

```ts
export type AgentPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-index-js-retrypart"></a>
#### RetryPart

```ts
export type RetryPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    attempt: number;
    error: ApiError;
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-index-js-compactionpart"></a>
#### CompactionPart

```ts
export type CompactionPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    auto: boolean;
};
```

<a id="sdk-dist-index-js-part"></a>
#### Part

```ts
export type Part = TextPart | {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    prompt: string;
    description: string;
    agent: string;
} | ReasoningPart | FilePart | ToolPart | StepStartPart | StepFinishPart | SnapshotPart | PatchPart | AgentPart | RetryPart | CompactionPart;
```

<a id="sdk-dist-index-js-eventmessagepartupdated"></a>
#### EventMessagePartUpdated

```ts
export type EventMessagePartUpdated = {
    type: ;
    properties: {
        part: Part;
        delta?: string;
    };
};
```

<a id="sdk-dist-index-js-eventmessagepartremoved"></a>
#### EventMessagePartRemoved

```ts
export type EventMessagePartRemoved = {
    type: ;
    properties: {
        sessionID: string;
        messageID: string;
        partID: string;
    };
};
```

<a id="sdk-dist-index-js-permission"></a>
#### Permission

```ts
export type Permission = {
    id: string;
    type: string;
    pattern?: string | Array<string>;
    sessionID: string;
    messageID: string;
    callID?: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-index-js-eventpermissionupdated"></a>
#### EventPermissionUpdated

```ts
export type EventPermissionUpdated = {
    type: ;
    properties: Permission;
};
```

<a id="sdk-dist-index-js-eventpermissionreplied"></a>
#### EventPermissionReplied

```ts
export type EventPermissionReplied = {
    type: ;
    properties: {
        sessionID: string;
        permissionID: string;
        response: string;
    };
};
```

<a id="sdk-dist-index-js-sessionstatus"></a>
#### SessionStatus

```ts
export type SessionStatus = {
    type: ;
} | {
    type: ;
    attempt: number;
    message: string;
    next: number;
} | {
    type: ;
};
```

<a id="sdk-dist-index-js-eventsessionstatus"></a>
#### EventSessionStatus

```ts
export type EventSessionStatus = {
    type: ;
    properties: {
        sessionID: string;
        status: SessionStatus;
    };
};
```

<a id="sdk-dist-index-js-eventsessionidle"></a>
#### EventSessionIdle

```ts
export type EventSessionIdle = {
    type: ;
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-index-js-eventsessioncompacted"></a>
#### EventSessionCompacted

```ts
export type EventSessionCompacted = {
    type: ;
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-index-js-eventfileedited"></a>
#### EventFileEdited

```ts
export type EventFileEdited = {
    type: ;
    properties: {
        file: string;
    };
};
```

<a id="sdk-dist-index-js-todo"></a>
#### Todo

```ts
export type Todo = {
    content: string;
    status: string;
    priority: string;
    id: string;
};
```

<a id="sdk-dist-index-js-eventtodoupdated"></a>
#### EventTodoUpdated

```ts
export type EventTodoUpdated = {
    type: ;
    properties: {
        sessionID: string;
        todos: Array<Todo>;
    };
};
```

<a id="sdk-dist-index-js-eventcommandexecuted"></a>
#### EventCommandExecuted

```ts
export type EventCommandExecuted = {
    type: ;
    properties: {
        name: string;
        sessionID: string;
        arguments: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-index-js-session"></a>
#### Session

```ts
export type Session = {
    id: string;
    projectID: string;
    directory: string;
    parentID?: string;
    summary?: {
        additions: number;
        deletions: number;
        files: number;
        diffs?: Array<FileDiff>;
    };
    share?: {
        url: string;
    };
    title: string;
    version: string;
    time: {
        created: number;
        updated: number;
        compacting?: number;
    };
    revert?: {
        messageID: string;
        partID?: string;
        snapshot?: string;
        diff?: string;
    };
};
```

<a id="sdk-dist-index-js-eventsessioncreated"></a>
#### EventSessionCreated

```ts
export type EventSessionCreated = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-index-js-eventsessionupdated"></a>
#### EventSessionUpdated

```ts
export type EventSessionUpdated = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-index-js-eventsessiondeleted"></a>
#### EventSessionDeleted

```ts
export type EventSessionDeleted = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-index-js-eventsessiondiff"></a>
#### EventSessionDiff

```ts
export type EventSessionDiff = {
    type: ;
    properties: {
        sessionID: string;
        diff: Array<FileDiff>;
    };
};
```

<a id="sdk-dist-index-js-eventsessionerror"></a>
#### EventSessionError

```ts
export type EventSessionError = {
    type: ;
    properties: {
        sessionID?: string;
        error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    };
};
```

<a id="sdk-dist-index-js-eventfilewatcherupdated"></a>
#### EventFileWatcherUpdated

```ts
export type EventFileWatcherUpdated = {
    type: ;
    properties: {
        file: string;
        event:  |  | ;
    };
};
```

<a id="sdk-dist-index-js-eventvcsbranchupdated"></a>
#### EventVcsBranchUpdated

```ts
export type EventVcsBranchUpdated = {
    type: ;
    properties: {
        branch?: string;
    };
};
```

<a id="sdk-dist-index-js-eventtuipromptappend"></a>
#### EventTuiPromptAppend

```ts
export type EventTuiPromptAppend = {
    type: ;
    properties: {
        text: string;
    };
};
```

<a id="sdk-dist-index-js-eventtuicommandexecute"></a>
#### EventTuiCommandExecute

```ts
export type EventTuiCommandExecute = {
    type: ;
    properties: {
        command: ( |  |  |  |  |  |  |  |  |  |  |  |  | ) | string;
    };
};
```

<a id="sdk-dist-index-js-eventtuitoastshow"></a>
#### EventTuiToastShow

```ts
export type EventTuiToastShow = {
    type: ;
    properties: {
        title?: string;
        message: string;
        variant:  |  |  | ;
        duration?: number;
    };
};
```

<a id="sdk-dist-index-js-eventserverconnected"></a>
#### EventServerConnected

```ts
export type EventServerConnected = {
    type: ;
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-js-event"></a>
#### Event

```ts
export type Event = EventInstallationUpdated | EventInstallationUpdateAvailable | EventLspClientDiagnostics | EventLspUpdated | EventMessageUpdated | EventMessageRemoved | EventMessagePartUpdated | EventMessagePartRemoved | EventPermissionUpdated | EventPermissionReplied | EventSessionStatus | EventSessionIdle | EventSessionCompacted | EventFileEdited | EventTodoUpdated | EventCommandExecuted | EventSessionCreated | EventSessionUpdated | EventSessionDeleted | EventSessionDiff | EventSessionError | EventFileWatcherUpdated | EventVcsBranchUpdated | EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow | EventServerConnected;
```

<a id="sdk-dist-index-js-globalevent"></a>
#### GlobalEvent

```ts
export type GlobalEvent = {
    directory: string;
    payload: Event;
};
```

<a id="sdk-dist-index-js-project"></a>
#### Project

```ts
export type Project = {
    id: string;
    worktree: string;
    vcsDir?: string;
    vcs?: ;
    time: {
        created: number;
        initialized?: number;
    };
};
```

Custom keybind configurations

<a id="sdk-dist-index-js-keybindsconfig"></a>
#### KeybindsConfig

```ts
export type KeybindsConfig = {
    leader?: string;
    app_exit?: string;
    editor_open?: string;
    theme_list?: string;
    sidebar_toggle?: string;
    status_view?: string;
    session_export?: string;
    session_new?: string;
    session_list?: string;
    session_timeline?: string;
    session_share?: string;
    session_unshare?: string;
    session_interrupt?: string;
    session_compact?: string;
    messages_page_up?: string;
    messages_page_down?: string;
    messages_half_page_up?: string;
    messages_half_page_down?: string;
    messages_first?: string;
    messages_last?: string;
    messages_copy?: string;
    messages_undo?: string;
    messages_redo?: string;
    messages_toggle_conceal?: string;
    model_list?: string;
    model_cycle_recent?: string;
    model_cycle_recent_reverse?: string;
    command_list?: string;
    agent_list?: string;
    agent_cycle?: string;
    agent_cycle_reverse?: string;
    input_clear?: string;
    input_forward_delete?: string;
    input_paste?: string;
    input_submit?: string;
    input_newline?: string;
    history_previous?: string;
    history_next?: string;
    session_child_cycle?: string;
    session_child_cycle_reverse?: string;
    terminal_suspend?: string;
};
```

<a id="sdk-dist-index-js-agentconfig"></a>
#### AgentConfig

```ts
export type AgentConfig = {
    model?: string;
    temperature?: number;
    top_p?: number;
    prompt?: string;
    tools?: {
        [key: string]: boolean;
    };
    disable?: boolean;
    description?: string;
    mode?:  |  | ;
    color?: string;
    permission?: {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    [key: string]: unknown | string | number | {
        [key: string]: boolean;
    } | boolean | ( |  | ) | {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    } | undefined;
};
```

<a id="sdk-dist-index-js-mcplocalconfig"></a>
#### McpLocalConfig

```ts
export type McpLocalConfig = {
    type: ;
    command: Array<string>;
    environment?: {
        [key: string]: string;
    };
    enabled?: boolean;
    timeout?: number;
};
```

<a id="sdk-dist-index-js-mcpremoteconfig"></a>
#### McpRemoteConfig

```ts
export type McpRemoteConfig = {
    type: ;
    url: string;
    enabled?: boolean;
    headers?: {
        [key: string]: string;
    };
    timeout?: number;
};
```

<a id="sdk-dist-index-js-layoutconfig"></a>
#### LayoutConfig

```ts
export type LayoutConfig =  | ;
```

<a id="sdk-dist-index-js-config"></a>
#### Config

```ts
export type Config = {
    $schema?: string;
    theme?: string;
    keybinds?: KeybindsConfig;
    tui?: {
        scroll_speed?: number;
        scroll_acceleration?: {
            enabled: boolean;
        };
        diff_style?:  | ;
    };
    command?: {
        [key: string]: {
            template: string;
            description?: string;
            agent?: string;
            model?: string;
            subtask?: boolean;
        };
    };
    watcher?: {
        ignore?: Array<string>;
    };
    plugin?: Array<string>;
    snapshot?: boolean;
    share?:  |  | ;
    autoshare?: boolean;
    autoupdate?: boolean | ;
    disabled_providers?: Array<string>;
    enabled_providers?: Array<string>;
    model?: string;
    small_model?: string;
    username?: string;
    mode?: {
        build?: AgentConfig;
        plan?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    agent?: {
        plan?: AgentConfig;
        build?: AgentConfig;
        general?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    provider?: {
        [key: string]: {
            api?: string;
            name?: string;
            env?: Array<string>;
            id?: string;
            npm?: string;
            models?: {
                [key: string]: {
                    id?: string;
                    name?: string;
                    release_date?: string;
                    attachment?: boolean;
                    reasoning?: boolean;
                    temperature?: boolean;
                    tool_call?: boolean;
                    cost?: {
                        input: number;
                        output: number;
                        cache_read?: number;
                        cache_write?: number;
                        context_over_200k?: {
                            input: number;
                            output: number;
                            cache_read?: number;
                            cache_write?: number;
                        };
                    };
                    limit?: {
                        context: number;
                        output: number;
                    };
                    modalities?: {
                        input: Array< |  |  |  | >;
                        output: Array< |  |  |  | >;
                    };
                    experimental?: boolean;
                    status?:  |  | ;
                    options?: {
                        [key: string]: unknown;
                    };
                    headers?: {
                        [key: string]: string;
                    };
                    provider?: {
                        npm: string;
                    };
                };
            };
            whitelist?: Array<string>;
            blacklist?: Array<string>;
            options?: {
                apiKey?: string;
                baseURL?: string;
                enterpriseUrl?: string;
                setCacheKey?: boolean;
                timeout?: number | false;
                [key: string]: unknown | string | boolean | (number | false) | undefined;
            };
        };
    };
    mcp?: {
        [key: string]: McpLocalConfig | McpRemoteConfig;
    };
    formatter?: false | {
        [key: string]: {
            disabled?: boolean;
            command?: Array<string>;
            environment?: {
                [key: string]: string;
            };
            extensions?: Array<string>;
        };
    };
    lsp?: false | {
        [key: string]: {
            disabled: true;
        } | {
            command: Array<string>;
            extensions?: Array<string>;
            disabled?: boolean;
            env?: {
                [key: string]: string;
            };
            initialization?: {
                [key: string]: unknown;
            };
        };
    };
    instructions?: Array<string>;
    layout?: LayoutConfig;
    permission?: {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    tools?: {
        [key: string]: boolean;
    };
    enterprise?: {
        url?: string;
    };
    experimental?: {
        hook?: {
            file_edited?: {
                [key: string]: Array<{
                    command: Array<string>;
                    environment?: {
                        [key: string]: string;
                    };
                }>;
            };
            session_completed?: Array<{
                command: Array<string>;
                environment?: {
                    [key: string]: string;
                };
            }>;
        };
        chatMaxRetries?: number;
        disable_paste_summary?: boolean;
        batch_tool?: boolean;
    };
};
```

<a id="sdk-dist-index-js-badrequesterror"></a>
#### BadRequestError

```ts
export type BadRequestError = {
    data: unknown;
    errors: Array<{
        [key: string]: unknown;
    }>;
    success: false;
};
```

<a id="sdk-dist-index-js-toolids"></a>
#### ToolIds

```ts
export type ToolIds = Array<string>;
```

<a id="sdk-dist-index-js-toollistitem"></a>
#### ToolListItem

```ts
export type ToolListItem = {
    id: string;
    description: string;
    parameters: unknown;
};
```

<a id="sdk-dist-index-js-toollist"></a>
#### ToolList

```ts
export type ToolList = Array<ToolListItem>;
```

<a id="sdk-dist-index-js-path"></a>
#### Path

```ts
export type Path = {
    state: string;
    config: string;
    worktree: string;
    directory: string;
};
```

<a id="sdk-dist-index-js-vcsinfo"></a>
#### VcsInfo

```ts
export type VcsInfo = {
    branch: string;
};
```

<a id="sdk-dist-index-js-notfounderror"></a>
#### NotFoundError

```ts
export type NotFoundError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-index-js-textpartinput"></a>
#### TextPartInput

```ts
export type TextPartInput = {
    id?: string;
    type: ;
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-js-filepartinput"></a>
#### FilePartInput

```ts
export type FilePartInput = {
    id?: string;
    type: ;
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-index-js-agentpartinput"></a>
#### AgentPartInput

```ts
export type AgentPartInput = {
    id?: string;
    type: ;
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-index-js-subtaskpartinput"></a>
#### SubtaskPartInput

```ts
export type SubtaskPartInput = {
    id?: string;
    type: ;
    prompt: string;
    description: string;
    agent: string;
};
```

<a id="sdk-dist-index-js-command"></a>
#### Command

```ts
export type Command = {
    name: string;
    description?: string;
    agent?: string;
    model?: string;
    template: string;
    subtask?: boolean;
};
```

<a id="sdk-dist-index-js-model"></a>
#### Model

```ts
export type Model = {
    id: string;
    name: string;
    release_date: string;
    attachment: boolean;
    reasoning: boolean;
    temperature: boolean;
    tool_call: boolean;
    cost: {
        input: number;
        output: number;
        cache_read?: number;
        cache_write?: number;
        context_over_200k?: {
            input: number;
            output: number;
            cache_read?: number;
            cache_write?: number;
        };
    };
    limit: {
        context: number;
        output: number;
    };
    modalities?: {
        input: Array< |  |  |  | >;
        output: Array< |  |  |  | >;
    };
    experimental?: boolean;
    status?:  |  | ;
    options: {
        [key: string]: unknown;
    };
    headers?: {
        [key: string]: string;
    };
    provider?: {
        npm: string;
    };
};
```

<a id="sdk-dist-index-js-provider"></a>
#### Provider

```ts
export type Provider = {
    api?: string;
    name: string;
    env: Array<string>;
    id: string;
    npm?: string;
    models: {
        [key: string]: Model;
    };
};
```

<a id="sdk-dist-index-js-providerauthmethod"></a>
#### ProviderAuthMethod

```ts
export type ProviderAuthMethod = {
    type:  | ;
    label: string;
};
```

<a id="sdk-dist-index-js-providerauthauthorization"></a>
#### ProviderAuthAuthorization

```ts
export type ProviderAuthAuthorization = {
    url: string;
    method:  | ;
    instructions: string;
};
```

<a id="sdk-dist-index-js-symbol"></a>
#### Symbol

```ts
export type Symbol = {
    name: string;
    kind: number;
    location: {
        uri: string;
        range: Range;
    };
};
```

<a id="sdk-dist-index-js-filenode"></a>
#### FileNode

```ts
export type FileNode = {
    name: string;
    path: string;
    absolute: string;
    type:  | ;
    ignored: boolean;
};
```

<a id="sdk-dist-index-js-filecontent"></a>
#### FileContent

```ts
export type FileContent = {
    type: ;
    content: string;
    diff?: string;
    patch?: {
        oldFileName: string;
        newFileName: string;
        oldHeader?: string;
        newHeader?: string;
        hunks: Array<{
            oldStart: number;
            oldLines: number;
            newStart: number;
            newLines: number;
            lines: Array<string>;
        }>;
        index?: string;
    };
    encoding?: ;
    mimeType?: string;
};
```

<a id="sdk-dist-index-js-file"></a>
#### File

```ts
export type File = {
    path: string;
    added: number;
    removed: number;
    status:  |  | ;
};
```

<a id="sdk-dist-index-js-agent"></a>
#### Agent

```ts
export type Agent = {
    name: string;
    description?: string;
    mode:  |  | ;
    builtIn: boolean;
    topP?: number;
    temperature?: number;
    color?: string;
    permission: {
        edit:  |  | ;
        bash: {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    model?: {
        modelID: string;
        providerID: string;
    };
    prompt?: string;
    tools: {
        [key: string]: boolean;
    };
    options: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-js-mcpstatusconnected"></a>
#### McpStatusConnected

```ts
export type McpStatusConnected = {
    status: ;
};
```

<a id="sdk-dist-index-js-mcpstatusdisabled"></a>
#### McpStatusDisabled

```ts
export type McpStatusDisabled = {
    status: ;
};
```

<a id="sdk-dist-index-js-mcpstatusfailed"></a>
#### McpStatusFailed

```ts
export type McpStatusFailed = {
    status: ;
    error: string;
};
```

<a id="sdk-dist-index-js-mcpstatus"></a>
#### McpStatus

```ts
export type McpStatus = McpStatusConnected | McpStatusDisabled | McpStatusFailed;
```

<a id="sdk-dist-index-js-lspstatus"></a>
#### LspStatus

```ts
export type LspStatus = {
    id: string;
    name: string;
    root: string;
    status:  | ;
};
```

<a id="sdk-dist-index-js-formatterstatus"></a>
#### FormatterStatus

```ts
export type FormatterStatus = {
    name: string;
    extensions: Array<string>;
    enabled: boolean;
};
```

<a id="sdk-dist-index-js-oauth"></a>
#### OAuth

```ts
export type OAuth = {
    type: ;
    refresh: string;
    access: string;
    expires: number;
    enterpriseUrl?: string;
};
```

<a id="sdk-dist-index-js-apiauth"></a>
#### ApiAuth

```ts
export type ApiAuth = {
    type: ;
    key: string;
};
```

<a id="sdk-dist-index-js-wellknownauth"></a>
#### WellKnownAuth

```ts
export type WellKnownAuth = {
    type: ;
    key: string;
    token: string;
};
```

<a id="sdk-dist-index-js-auth"></a>
#### Auth

```ts
export type Auth = OAuth | ApiAuth | WellKnownAuth;
```

<a id="sdk-dist-index-js-globaleventdata"></a>
#### GlobalEventData

```ts
export type GlobalEventData = {
    body?: never;
    path?: never;
    query?: never;
    url: ;
};
```

<a id="sdk-dist-index-js-globaleventresponses"></a>
#### GlobalEventResponses

```ts
export type GlobalEventResponses = {
    : GlobalEvent;
};
```

<a id="sdk-dist-index-js-globaleventresponse"></a>
#### GlobalEventResponse

```ts
export type GlobalEventResponse = GlobalEventResponses[keyof GlobalEventResponses];
```

<a id="sdk-dist-index-js-projectlistdata"></a>
#### ProjectListData

```ts
export type ProjectListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-projectlistresponses"></a>
#### ProjectListResponses

```ts
export type ProjectListResponses = {
    : Array<Project>;
};
```

<a id="sdk-dist-index-js-projectlistresponse"></a>
#### ProjectListResponse

```ts
export type ProjectListResponse = ProjectListResponses[keyof ProjectListResponses];
```

<a id="sdk-dist-index-js-projectcurrentdata"></a>
#### ProjectCurrentData

```ts
export type ProjectCurrentData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-projectcurrentresponses"></a>
#### ProjectCurrentResponses

```ts
export type ProjectCurrentResponses = {
    : Project;
};
```

<a id="sdk-dist-index-js-projectcurrentresponse"></a>
#### ProjectCurrentResponse

```ts
export type ProjectCurrentResponse = ProjectCurrentResponses[keyof ProjectCurrentResponses];
```

<a id="sdk-dist-index-js-configgetdata"></a>
#### ConfigGetData

```ts
export type ConfigGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-configgetresponses"></a>
#### ConfigGetResponses

```ts
export type ConfigGetResponses = {
    : Config;
};
```

<a id="sdk-dist-index-js-configgetresponse"></a>
#### ConfigGetResponse

```ts
export type ConfigGetResponse = ConfigGetResponses[keyof ConfigGetResponses];
```

<a id="sdk-dist-index-js-configupdatedata"></a>
#### ConfigUpdateData

```ts
export type ConfigUpdateData = {
    body?: Config;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-configupdateerrors"></a>
#### ConfigUpdateErrors

```ts
export type ConfigUpdateErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-configupdateerror"></a>
#### ConfigUpdateError

```ts
export type ConfigUpdateError = ConfigUpdateErrors[keyof ConfigUpdateErrors];
```

<a id="sdk-dist-index-js-configupdateresponses"></a>
#### ConfigUpdateResponses

```ts
export type ConfigUpdateResponses = {
    : Config;
};
```

<a id="sdk-dist-index-js-configupdateresponse"></a>
#### ConfigUpdateResponse

```ts
export type ConfigUpdateResponse = ConfigUpdateResponses[keyof ConfigUpdateResponses];
```

<a id="sdk-dist-index-js-toolidsdata"></a>
#### ToolIdsData

```ts
export type ToolIdsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-toolidserrors"></a>
#### ToolIdsErrors

```ts
export type ToolIdsErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-toolidserror"></a>
#### ToolIdsError

```ts
export type ToolIdsError = ToolIdsErrors[keyof ToolIdsErrors];
```

<a id="sdk-dist-index-js-toolidsresponses"></a>
#### ToolIdsResponses

```ts
export type ToolIdsResponses = {
    : ToolIds;
};
```

<a id="sdk-dist-index-js-toolidsresponse"></a>
#### ToolIdsResponse

```ts
export type ToolIdsResponse = ToolIdsResponses[keyof ToolIdsResponses];
```

<a id="sdk-dist-index-js-toollistdata"></a>
#### ToolListData

```ts
export type ToolListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        provider: string;
        model: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-toollisterrors"></a>
#### ToolListErrors

```ts
export type ToolListErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-toollisterror"></a>
#### ToolListError

```ts
export type ToolListError = ToolListErrors[keyof ToolListErrors];
```

<a id="sdk-dist-index-js-toollistresponses"></a>
#### ToolListResponses

```ts
export type ToolListResponses = {
    : ToolList;
};
```

<a id="sdk-dist-index-js-toollistresponse"></a>
#### ToolListResponse

```ts
export type ToolListResponse = ToolListResponses[keyof ToolListResponses];
```

<a id="sdk-dist-index-js-instancedisposedata"></a>
#### InstanceDisposeData

```ts
export type InstanceDisposeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-instancedisposeresponses"></a>
#### InstanceDisposeResponses

```ts
export type InstanceDisposeResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-instancedisposeresponse"></a>
#### InstanceDisposeResponse

```ts
export type InstanceDisposeResponse = InstanceDisposeResponses[keyof InstanceDisposeResponses];
```

<a id="sdk-dist-index-js-pathgetdata"></a>
#### PathGetData

```ts
export type PathGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-pathgetresponses"></a>
#### PathGetResponses

```ts
export type PathGetResponses = {
    : Path;
};
```

<a id="sdk-dist-index-js-pathgetresponse"></a>
#### PathGetResponse

```ts
export type PathGetResponse = PathGetResponses[keyof PathGetResponses];
```

<a id="sdk-dist-index-js-vcsgetdata"></a>
#### VcsGetData

```ts
export type VcsGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-vcsgetresponses"></a>
#### VcsGetResponses

```ts
export type VcsGetResponses = {
    : VcsInfo;
};
```

<a id="sdk-dist-index-js-vcsgetresponse"></a>
#### VcsGetResponse

```ts
export type VcsGetResponse = VcsGetResponses[keyof VcsGetResponses];
```

<a id="sdk-dist-index-js-sessionlistdata"></a>
#### SessionListData

```ts
export type SessionListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionlistresponses"></a>
#### SessionListResponses

```ts
export type SessionListResponses = {
    : Array<Session>;
};
```

<a id="sdk-dist-index-js-sessionlistresponse"></a>
#### SessionListResponse

```ts
export type SessionListResponse = SessionListResponses[keyof SessionListResponses];
```

<a id="sdk-dist-index-js-sessioncreatedata"></a>
#### SessionCreateData

```ts
export type SessionCreateData = {
    body?: {
        parentID?: string;
        title?: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessioncreateerrors"></a>
#### SessionCreateErrors

```ts
export type SessionCreateErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-sessioncreateerror"></a>
#### SessionCreateError

```ts
export type SessionCreateError = SessionCreateErrors[keyof SessionCreateErrors];
```

<a id="sdk-dist-index-js-sessioncreateresponses"></a>
#### SessionCreateResponses

```ts
export type SessionCreateResponses = {
    : Session;
};
```

<a id="sdk-dist-index-js-sessioncreateresponse"></a>
#### SessionCreateResponse

```ts
export type SessionCreateResponse = SessionCreateResponses[keyof SessionCreateResponses];
```

<a id="sdk-dist-index-js-sessionstatusdata"></a>
#### SessionStatusData

```ts
export type SessionStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionstatuserrors"></a>
#### SessionStatusErrors

```ts
export type SessionStatusErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-sessionstatuserror"></a>
#### SessionStatusError

```ts
export type SessionStatusError = SessionStatusErrors[keyof SessionStatusErrors];
```

<a id="sdk-dist-index-js-sessionstatusresponses"></a>
#### SessionStatusResponses

```ts
export type SessionStatusResponses = {
    : {
        [key: string]: SessionStatus;
    };
};
```

<a id="sdk-dist-index-js-sessionstatusresponse"></a>
#### SessionStatusResponse

```ts
export type SessionStatusResponse = SessionStatusResponses[keyof SessionStatusResponses];
```

<a id="sdk-dist-index-js-sessiondeletedata"></a>
#### SessionDeleteData

```ts
export type SessionDeleteData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessiondeleteerrors"></a>
#### SessionDeleteErrors

```ts
export type SessionDeleteErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessiondeleteerror"></a>
#### SessionDeleteError

```ts
export type SessionDeleteError = SessionDeleteErrors[keyof SessionDeleteErrors];
```

<a id="sdk-dist-index-js-sessiondeleteresponses"></a>
#### SessionDeleteResponses

```ts
export type SessionDeleteResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-sessiondeleteresponse"></a>
#### SessionDeleteResponse

```ts
export type SessionDeleteResponse = SessionDeleteResponses[keyof SessionDeleteResponses];
```

<a id="sdk-dist-index-js-sessiongetdata"></a>
#### SessionGetData

```ts
export type SessionGetData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessiongeterrors"></a>
#### SessionGetErrors

```ts
export type SessionGetErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessiongeterror"></a>
#### SessionGetError

```ts
export type SessionGetError = SessionGetErrors[keyof SessionGetErrors];
```

<a id="sdk-dist-index-js-sessiongetresponses"></a>
#### SessionGetResponses

```ts
export type SessionGetResponses = {
    : Session;
};
```

<a id="sdk-dist-index-js-sessiongetresponse"></a>
#### SessionGetResponse

```ts
export type SessionGetResponse = SessionGetResponses[keyof SessionGetResponses];
```

<a id="sdk-dist-index-js-sessionupdatedata"></a>
#### SessionUpdateData

```ts
export type SessionUpdateData = {
    body?: {
        title?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionupdateerrors"></a>
#### SessionUpdateErrors

```ts
export type SessionUpdateErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionupdateerror"></a>
#### SessionUpdateError

```ts
export type SessionUpdateError = SessionUpdateErrors[keyof SessionUpdateErrors];
```

<a id="sdk-dist-index-js-sessionupdateresponses"></a>
#### SessionUpdateResponses

```ts
export type SessionUpdateResponses = {
    : Session;
};
```

<a id="sdk-dist-index-js-sessionupdateresponse"></a>
#### SessionUpdateResponse

```ts
export type SessionUpdateResponse = SessionUpdateResponses[keyof SessionUpdateResponses];
```

<a id="sdk-dist-index-js-sessionchildrendata"></a>
#### SessionChildrenData

```ts
export type SessionChildrenData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionchildrenerrors"></a>
#### SessionChildrenErrors

```ts
export type SessionChildrenErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionchildrenerror"></a>
#### SessionChildrenError

```ts
export type SessionChildrenError = SessionChildrenErrors[keyof SessionChildrenErrors];
```

<a id="sdk-dist-index-js-sessionchildrenresponses"></a>
#### SessionChildrenResponses

```ts
export type SessionChildrenResponses = {
    : Array<Session>;
};
```

<a id="sdk-dist-index-js-sessionchildrenresponse"></a>
#### SessionChildrenResponse

```ts
export type SessionChildrenResponse = SessionChildrenResponses[keyof SessionChildrenResponses];
```

<a id="sdk-dist-index-js-sessiontododata"></a>
#### SessionTodoData

```ts
export type SessionTodoData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessiontodoerrors"></a>
#### SessionTodoErrors

```ts
export type SessionTodoErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessiontodoerror"></a>
#### SessionTodoError

```ts
export type SessionTodoError = SessionTodoErrors[keyof SessionTodoErrors];
```

<a id="sdk-dist-index-js-sessiontodoresponses"></a>
#### SessionTodoResponses

```ts
export type SessionTodoResponses = {
    : Array<Todo>;
};
```

<a id="sdk-dist-index-js-sessiontodoresponse"></a>
#### SessionTodoResponse

```ts
export type SessionTodoResponse = SessionTodoResponses[keyof SessionTodoResponses];
```

<a id="sdk-dist-index-js-sessioninitdata"></a>
#### SessionInitData

```ts
export type SessionInitData = {
    body?: {
        modelID: string;
        providerID: string;
        messageID: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessioniniterrors"></a>
#### SessionInitErrors

```ts
export type SessionInitErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessioniniterror"></a>
#### SessionInitError

```ts
export type SessionInitError = SessionInitErrors[keyof SessionInitErrors];
```

<a id="sdk-dist-index-js-sessioninitresponses"></a>
#### SessionInitResponses

```ts
export type SessionInitResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-sessioninitresponse"></a>
#### SessionInitResponse

```ts
export type SessionInitResponse = SessionInitResponses[keyof SessionInitResponses];
```

<a id="sdk-dist-index-js-sessionforkdata"></a>
#### SessionForkData

```ts
export type SessionForkData = {
    body?: {
        messageID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionforkresponses"></a>
#### SessionForkResponses

```ts
export type SessionForkResponses = {
    : Session;
};
```

<a id="sdk-dist-index-js-sessionforkresponse"></a>
#### SessionForkResponse

```ts
export type SessionForkResponse = SessionForkResponses[keyof SessionForkResponses];
```

<a id="sdk-dist-index-js-sessionabortdata"></a>
#### SessionAbortData

```ts
export type SessionAbortData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionaborterrors"></a>
#### SessionAbortErrors

```ts
export type SessionAbortErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionaborterror"></a>
#### SessionAbortError

```ts
export type SessionAbortError = SessionAbortErrors[keyof SessionAbortErrors];
```

<a id="sdk-dist-index-js-sessionabortresponses"></a>
#### SessionAbortResponses

```ts
export type SessionAbortResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-sessionabortresponse"></a>
#### SessionAbortResponse

```ts
export type SessionAbortResponse = SessionAbortResponses[keyof SessionAbortResponses];
```

<a id="sdk-dist-index-js-sessionunsharedata"></a>
#### SessionUnshareData

```ts
export type SessionUnshareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionunshareerrors"></a>
#### SessionUnshareErrors

```ts
export type SessionUnshareErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionunshareerror"></a>
#### SessionUnshareError

```ts
export type SessionUnshareError = SessionUnshareErrors[keyof SessionUnshareErrors];
```

<a id="sdk-dist-index-js-sessionunshareresponses"></a>
#### SessionUnshareResponses

```ts
export type SessionUnshareResponses = {
    : Session;
};
```

<a id="sdk-dist-index-js-sessionunshareresponse"></a>
#### SessionUnshareResponse

```ts
export type SessionUnshareResponse = SessionUnshareResponses[keyof SessionUnshareResponses];
```

<a id="sdk-dist-index-js-sessionsharedata"></a>
#### SessionShareData

```ts
export type SessionShareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionshareerrors"></a>
#### SessionShareErrors

```ts
export type SessionShareErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionshareerror"></a>
#### SessionShareError

```ts
export type SessionShareError = SessionShareErrors[keyof SessionShareErrors];
```

<a id="sdk-dist-index-js-sessionshareresponses"></a>
#### SessionShareResponses

```ts
export type SessionShareResponses = {
    : Session;
};
```

<a id="sdk-dist-index-js-sessionshareresponse"></a>
#### SessionShareResponse

```ts
export type SessionShareResponse = SessionShareResponses[keyof SessionShareResponses];
```

<a id="sdk-dist-index-js-sessiondiffdata"></a>
#### SessionDiffData

```ts
export type SessionDiffData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
        messageID?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessiondifferrors"></a>
#### SessionDiffErrors

```ts
export type SessionDiffErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessiondifferror"></a>
#### SessionDiffError

```ts
export type SessionDiffError = SessionDiffErrors[keyof SessionDiffErrors];
```

<a id="sdk-dist-index-js-sessiondiffresponses"></a>
#### SessionDiffResponses

```ts
export type SessionDiffResponses = {
    : Array<FileDiff>;
};
```

<a id="sdk-dist-index-js-sessiondiffresponse"></a>
#### SessionDiffResponse

```ts
export type SessionDiffResponse = SessionDiffResponses[keyof SessionDiffResponses];
```

<a id="sdk-dist-index-js-sessionsummarizedata"></a>
#### SessionSummarizeData

```ts
export type SessionSummarizeData = {
    body?: {
        providerID: string;
        modelID: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionsummarizeerrors"></a>
#### SessionSummarizeErrors

```ts
export type SessionSummarizeErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionsummarizeerror"></a>
#### SessionSummarizeError

```ts
export type SessionSummarizeError = SessionSummarizeErrors[keyof SessionSummarizeErrors];
```

<a id="sdk-dist-index-js-sessionsummarizeresponses"></a>
#### SessionSummarizeResponses

```ts
export type SessionSummarizeResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-sessionsummarizeresponse"></a>
#### SessionSummarizeResponse

```ts
export type SessionSummarizeResponse = SessionSummarizeResponses[keyof SessionSummarizeResponses];
```

<a id="sdk-dist-index-js-sessionmessagesdata"></a>
#### SessionMessagesData

```ts
export type SessionMessagesData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
        limit?: number;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionmessageserrors"></a>
#### SessionMessagesErrors

```ts
export type SessionMessagesErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionmessageserror"></a>
#### SessionMessagesError

```ts
export type SessionMessagesError = SessionMessagesErrors[keyof SessionMessagesErrors];
```

<a id="sdk-dist-index-js-sessionmessagesresponses"></a>
#### SessionMessagesResponses

```ts
export type SessionMessagesResponses = {
    : Array<{
        info: Message;
        parts: Array<Part>;
    }>;
};
```

<a id="sdk-dist-index-js-sessionmessagesresponse"></a>
#### SessionMessagesResponse

```ts
export type SessionMessagesResponse = SessionMessagesResponses[keyof SessionMessagesResponses];
```

<a id="sdk-dist-index-js-sessionpromptdata"></a>
#### SessionPromptData

```ts
export type SessionPromptData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionprompterrors"></a>
#### SessionPromptErrors

```ts
export type SessionPromptErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionprompterror"></a>
#### SessionPromptError

```ts
export type SessionPromptError = SessionPromptErrors[keyof SessionPromptErrors];
```

<a id="sdk-dist-index-js-sessionpromptresponses"></a>
#### SessionPromptResponses

```ts
export type SessionPromptResponses = {
    : {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-index-js-sessionpromptresponse"></a>
#### SessionPromptResponse

```ts
export type SessionPromptResponse = SessionPromptResponses[keyof SessionPromptResponses];
```

<a id="sdk-dist-index-js-sessionmessagedata"></a>
#### SessionMessageData

```ts
export type SessionMessageData = {
    body?: never;
    path: {
        id: string;
        messageID: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionmessageerrors"></a>
#### SessionMessageErrors

```ts
export type SessionMessageErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionmessageerror"></a>
#### SessionMessageError

```ts
export type SessionMessageError = SessionMessageErrors[keyof SessionMessageErrors];
```

<a id="sdk-dist-index-js-sessionmessageresponses"></a>
#### SessionMessageResponses

```ts
export type SessionMessageResponses = {
    : {
        info: Message;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-index-js-sessionmessageresponse"></a>
#### SessionMessageResponse

```ts
export type SessionMessageResponse = SessionMessageResponses[keyof SessionMessageResponses];
```

<a id="sdk-dist-index-js-sessionpromptasyncdata"></a>
#### SessionPromptAsyncData

```ts
export type SessionPromptAsyncData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionpromptasyncerrors"></a>
#### SessionPromptAsyncErrors

```ts
export type SessionPromptAsyncErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionpromptasyncerror"></a>
#### SessionPromptAsyncError

```ts
export type SessionPromptAsyncError = SessionPromptAsyncErrors[keyof SessionPromptAsyncErrors];
```

<a id="sdk-dist-index-js-sessionpromptasyncresponses"></a>
#### SessionPromptAsyncResponses

```ts
export type SessionPromptAsyncResponses = {
    : void;
};
```

<a id="sdk-dist-index-js-sessionpromptasyncresponse"></a>
#### SessionPromptAsyncResponse

```ts
export type SessionPromptAsyncResponse = SessionPromptAsyncResponses[keyof SessionPromptAsyncResponses];
```

<a id="sdk-dist-index-js-sessioncommanddata"></a>
#### SessionCommandData

```ts
export type SessionCommandData = {
    body?: {
        messageID?: string;
        agent?: string;
        model?: string;
        arguments: string;
        command: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessioncommanderrors"></a>
#### SessionCommandErrors

```ts
export type SessionCommandErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessioncommanderror"></a>
#### SessionCommandError

```ts
export type SessionCommandError = SessionCommandErrors[keyof SessionCommandErrors];
```

<a id="sdk-dist-index-js-sessioncommandresponses"></a>
#### SessionCommandResponses

```ts
export type SessionCommandResponses = {
    : {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-index-js-sessioncommandresponse"></a>
#### SessionCommandResponse

```ts
export type SessionCommandResponse = SessionCommandResponses[keyof SessionCommandResponses];
```

<a id="sdk-dist-index-js-sessionshelldata"></a>
#### SessionShellData

```ts
export type SessionShellData = {
    body?: {
        agent: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        command: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionshellerrors"></a>
#### SessionShellErrors

```ts
export type SessionShellErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionshellerror"></a>
#### SessionShellError

```ts
export type SessionShellError = SessionShellErrors[keyof SessionShellErrors];
```

<a id="sdk-dist-index-js-sessionshellresponses"></a>
#### SessionShellResponses

```ts
export type SessionShellResponses = {
    : AssistantMessage;
};
```

<a id="sdk-dist-index-js-sessionshellresponse"></a>
#### SessionShellResponse

```ts
export type SessionShellResponse = SessionShellResponses[keyof SessionShellResponses];
```

<a id="sdk-dist-index-js-sessionrevertdata"></a>
#### SessionRevertData

```ts
export type SessionRevertData = {
    body?: {
        messageID: string;
        partID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionreverterrors"></a>
#### SessionRevertErrors

```ts
export type SessionRevertErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionreverterror"></a>
#### SessionRevertError

```ts
export type SessionRevertError = SessionRevertErrors[keyof SessionRevertErrors];
```

<a id="sdk-dist-index-js-sessionrevertresponses"></a>
#### SessionRevertResponses

```ts
export type SessionRevertResponses = {
    : Session;
};
```

<a id="sdk-dist-index-js-sessionrevertresponse"></a>
#### SessionRevertResponse

```ts
export type SessionRevertResponse = SessionRevertResponses[keyof SessionRevertResponses];
```

<a id="sdk-dist-index-js-sessionunrevertdata"></a>
#### SessionUnrevertData

```ts
export type SessionUnrevertData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-sessionunreverterrors"></a>
#### SessionUnrevertErrors

```ts
export type SessionUnrevertErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-sessionunreverterror"></a>
#### SessionUnrevertError

```ts
export type SessionUnrevertError = SessionUnrevertErrors[keyof SessionUnrevertErrors];
```

<a id="sdk-dist-index-js-sessionunrevertresponses"></a>
#### SessionUnrevertResponses

```ts
export type SessionUnrevertResponses = {
    : Session;
};
```

<a id="sdk-dist-index-js-sessionunrevertresponse"></a>
#### SessionUnrevertResponse

```ts
export type SessionUnrevertResponse = SessionUnrevertResponses[keyof SessionUnrevertResponses];
```

<a id="sdk-dist-index-js-postsessionidpermissionspermissioniddata"></a>
#### PostSessionIdPermissionsPermissionIdData

```ts
export type PostSessionIdPermissionsPermissionIdData = {
    body?: {
        response:  |  | ;
    };
    path: {
        id: string;
        permissionID: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-postsessionidpermissionspermissioniderrors"></a>
#### PostSessionIdPermissionsPermissionIdErrors

```ts
export type PostSessionIdPermissionsPermissionIdErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-js-postsessionidpermissionspermissioniderror"></a>
#### PostSessionIdPermissionsPermissionIdError

```ts
export type PostSessionIdPermissionsPermissionIdError = PostSessionIdPermissionsPermissionIdErrors[keyof PostSessionIdPermissionsPermissionIdErrors];
```

<a id="sdk-dist-index-js-postsessionidpermissionspermissionidresponses"></a>
#### PostSessionIdPermissionsPermissionIdResponses

```ts
export type PostSessionIdPermissionsPermissionIdResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-postsessionidpermissionspermissionidresponse"></a>
#### PostSessionIdPermissionsPermissionIdResponse

```ts
export type PostSessionIdPermissionsPermissionIdResponse = PostSessionIdPermissionsPermissionIdResponses[keyof PostSessionIdPermissionsPermissionIdResponses];
```

<a id="sdk-dist-index-js-commandlistdata"></a>
#### CommandListData

```ts
export type CommandListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-commandlistresponses"></a>
#### CommandListResponses

```ts
export type CommandListResponses = {
    : Array<Command>;
};
```

<a id="sdk-dist-index-js-commandlistresponse"></a>
#### CommandListResponse

```ts
export type CommandListResponse = CommandListResponses[keyof CommandListResponses];
```

<a id="sdk-dist-index-js-configprovidersdata"></a>
#### ConfigProvidersData

```ts
export type ConfigProvidersData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-configprovidersresponses"></a>
#### ConfigProvidersResponses

```ts
export type ConfigProvidersResponses = {
    : {
        providers: Array<Provider>;
        default: {
            [key: string]: string;
        };
    };
};
```

<a id="sdk-dist-index-js-configprovidersresponse"></a>
#### ConfigProvidersResponse

```ts
export type ConfigProvidersResponse = ConfigProvidersResponses[keyof ConfigProvidersResponses];
```

<a id="sdk-dist-index-js-providerlistdata"></a>
#### ProviderListData

```ts
export type ProviderListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-providerlistresponses"></a>
#### ProviderListResponses

```ts
export type ProviderListResponses = {
    : {
        all: Array<Provider>;
        default: {
            [key: string]: string;
        };
        connected: Array<string>;
    };
};
```

<a id="sdk-dist-index-js-providerlistresponse"></a>
#### ProviderListResponse

```ts
export type ProviderListResponse = ProviderListResponses[keyof ProviderListResponses];
```

<a id="sdk-dist-index-js-providerauthdata"></a>
#### ProviderAuthData

```ts
export type ProviderAuthData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-providerauthresponses"></a>
#### ProviderAuthResponses

```ts
export type ProviderAuthResponses = {
    : {
        [key: string]: Array<ProviderAuthMethod>;
    };
};
```

<a id="sdk-dist-index-js-providerauthresponse"></a>
#### ProviderAuthResponse

```ts
export type ProviderAuthResponse = ProviderAuthResponses[keyof ProviderAuthResponses];
```

<a id="sdk-dist-index-js-provideroauthauthorizedata"></a>
#### ProviderOauthAuthorizeData

```ts
export type ProviderOauthAuthorizeData = {
    body?: {
        method: number;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-provideroauthauthorizeerrors"></a>
#### ProviderOauthAuthorizeErrors

```ts
export type ProviderOauthAuthorizeErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-provideroauthauthorizeerror"></a>
#### ProviderOauthAuthorizeError

```ts
export type ProviderOauthAuthorizeError = ProviderOauthAuthorizeErrors[keyof ProviderOauthAuthorizeErrors];
```

<a id="sdk-dist-index-js-provideroauthauthorizeresponses"></a>
#### ProviderOauthAuthorizeResponses

```ts
export type ProviderOauthAuthorizeResponses = {
    : ProviderAuthAuthorization;
};
```

<a id="sdk-dist-index-js-provideroauthauthorizeresponse"></a>
#### ProviderOauthAuthorizeResponse

```ts
export type ProviderOauthAuthorizeResponse = ProviderOauthAuthorizeResponses[keyof ProviderOauthAuthorizeResponses];
```

<a id="sdk-dist-index-js-provideroauthcallbackdata"></a>
#### ProviderOauthCallbackData

```ts
export type ProviderOauthCallbackData = {
    body?: {
        method: number;
        code?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-provideroauthcallbackerrors"></a>
#### ProviderOauthCallbackErrors

```ts
export type ProviderOauthCallbackErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-provideroauthcallbackerror"></a>
#### ProviderOauthCallbackError

```ts
export type ProviderOauthCallbackError = ProviderOauthCallbackErrors[keyof ProviderOauthCallbackErrors];
```

<a id="sdk-dist-index-js-provideroauthcallbackresponses"></a>
#### ProviderOauthCallbackResponses

```ts
export type ProviderOauthCallbackResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-provideroauthcallbackresponse"></a>
#### ProviderOauthCallbackResponse

```ts
export type ProviderOauthCallbackResponse = ProviderOauthCallbackResponses[keyof ProviderOauthCallbackResponses];
```

<a id="sdk-dist-index-js-findtextdata"></a>
#### FindTextData

```ts
export type FindTextData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        pattern: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-findtextresponses"></a>
#### FindTextResponses

```ts
export type FindTextResponses = {
    : Array<{
        path: {
            text: string;
        };
        lines: {
            text: string;
        };
        line_number: number;
        absolute_offset: number;
        submatches: Array<{
            match: {
                text: string;
            };
            start: number;
            end: number;
        }>;
    }>;
};
```

<a id="sdk-dist-index-js-findtextresponse"></a>
#### FindTextResponse

```ts
export type FindTextResponse = FindTextResponses[keyof FindTextResponses];
```

<a id="sdk-dist-index-js-findfilesdata"></a>
#### FindFilesData

```ts
export type FindFilesData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
        dirs?:  | ;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-findfilesresponses"></a>
#### FindFilesResponses

```ts
export type FindFilesResponses = {
    : Array<string>;
};
```

<a id="sdk-dist-index-js-findfilesresponse"></a>
#### FindFilesResponse

```ts
export type FindFilesResponse = FindFilesResponses[keyof FindFilesResponses];
```

<a id="sdk-dist-index-js-findsymbolsdata"></a>
#### FindSymbolsData

```ts
export type FindSymbolsData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-findsymbolsresponses"></a>
#### FindSymbolsResponses

```ts
export type FindSymbolsResponses = {
    : Array<Symbol>;
};
```

<a id="sdk-dist-index-js-findsymbolsresponse"></a>
#### FindSymbolsResponse

```ts
export type FindSymbolsResponse = FindSymbolsResponses[keyof FindSymbolsResponses];
```

<a id="sdk-dist-index-js-filelistdata"></a>
#### FileListData

```ts
export type FileListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-filelistresponses"></a>
#### FileListResponses

```ts
export type FileListResponses = {
    : Array<FileNode>;
};
```

<a id="sdk-dist-index-js-filelistresponse"></a>
#### FileListResponse

```ts
export type FileListResponse = FileListResponses[keyof FileListResponses];
```

<a id="sdk-dist-index-js-filereaddata"></a>
#### FileReadData

```ts
export type FileReadData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-filereadresponses"></a>
#### FileReadResponses

```ts
export type FileReadResponses = {
    : FileContent;
};
```

<a id="sdk-dist-index-js-filereadresponse"></a>
#### FileReadResponse

```ts
export type FileReadResponse = FileReadResponses[keyof FileReadResponses];
```

<a id="sdk-dist-index-js-filestatusdata"></a>
#### FileStatusData

```ts
export type FileStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-filestatusresponses"></a>
#### FileStatusResponses

```ts
export type FileStatusResponses = {
    : Array<File>;
};
```

<a id="sdk-dist-index-js-filestatusresponse"></a>
#### FileStatusResponse

```ts
export type FileStatusResponse = FileStatusResponses[keyof FileStatusResponses];
```

<a id="sdk-dist-index-js-applogdata"></a>
#### AppLogData

```ts
export type AppLogData = {
    body?: {
        service: string;
        level:  |  |  | ;
        message: string;
        extra?: {
            [key: string]: unknown;
        };
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-applogerrors"></a>
#### AppLogErrors

```ts
export type AppLogErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-applogerror"></a>
#### AppLogError

```ts
export type AppLogError = AppLogErrors[keyof AppLogErrors];
```

<a id="sdk-dist-index-js-applogresponses"></a>
#### AppLogResponses

```ts
export type AppLogResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-applogresponse"></a>
#### AppLogResponse

```ts
export type AppLogResponse = AppLogResponses[keyof AppLogResponses];
```

<a id="sdk-dist-index-js-appagentsdata"></a>
#### AppAgentsData

```ts
export type AppAgentsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-appagentsresponses"></a>
#### AppAgentsResponses

```ts
export type AppAgentsResponses = {
    : Array<Agent>;
};
```

<a id="sdk-dist-index-js-appagentsresponse"></a>
#### AppAgentsResponse

```ts
export type AppAgentsResponse = AppAgentsResponses[keyof AppAgentsResponses];
```

<a id="sdk-dist-index-js-mcpstatusdata"></a>
#### McpStatusData

```ts
export type McpStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-mcpstatusresponses"></a>
#### McpStatusResponses

```ts
export type McpStatusResponses = {
    : {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-index-js-mcpstatusresponse"></a>
#### McpStatusResponse

```ts
export type McpStatusResponse = McpStatusResponses[keyof McpStatusResponses];
```

<a id="sdk-dist-index-js-mcpadddata"></a>
#### McpAddData

```ts
export type McpAddData = {
    body?: {
        name: string;
        config: McpLocalConfig | McpRemoteConfig;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-mcpadderrors"></a>
#### McpAddErrors

```ts
export type McpAddErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-mcpadderror"></a>
#### McpAddError

```ts
export type McpAddError = McpAddErrors[keyof McpAddErrors];
```

<a id="sdk-dist-index-js-mcpaddresponses"></a>
#### McpAddResponses

```ts
export type McpAddResponses = {
    : {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-index-js-mcpaddresponse"></a>
#### McpAddResponse

```ts
export type McpAddResponse = McpAddResponses[keyof McpAddResponses];
```

<a id="sdk-dist-index-js-lspstatusdata"></a>
#### LspStatusData

```ts
export type LspStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-lspstatusresponses"></a>
#### LspStatusResponses

```ts
export type LspStatusResponses = {
    : Array<LspStatus>;
};
```

<a id="sdk-dist-index-js-lspstatusresponse"></a>
#### LspStatusResponse

```ts
export type LspStatusResponse = LspStatusResponses[keyof LspStatusResponses];
```

<a id="sdk-dist-index-js-formatterstatusdata"></a>
#### FormatterStatusData

```ts
export type FormatterStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-formatterstatusresponses"></a>
#### FormatterStatusResponses

```ts
export type FormatterStatusResponses = {
    : Array<FormatterStatus>;
};
```

<a id="sdk-dist-index-js-formatterstatusresponse"></a>
#### FormatterStatusResponse

```ts
export type FormatterStatusResponse = FormatterStatusResponses[keyof FormatterStatusResponses];
```

<a id="sdk-dist-index-js-tuiappendpromptdata"></a>
#### TuiAppendPromptData

```ts
export type TuiAppendPromptData = {
    body?: {
        text: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuiappendprompterrors"></a>
#### TuiAppendPromptErrors

```ts
export type TuiAppendPromptErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-tuiappendprompterror"></a>
#### TuiAppendPromptError

```ts
export type TuiAppendPromptError = TuiAppendPromptErrors[keyof TuiAppendPromptErrors];
```

<a id="sdk-dist-index-js-tuiappendpromptresponses"></a>
#### TuiAppendPromptResponses

```ts
export type TuiAppendPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuiappendpromptresponse"></a>
#### TuiAppendPromptResponse

```ts
export type TuiAppendPromptResponse = TuiAppendPromptResponses[keyof TuiAppendPromptResponses];
```

<a id="sdk-dist-index-js-tuiopenhelpdata"></a>
#### TuiOpenHelpData

```ts
export type TuiOpenHelpData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuiopenhelpresponses"></a>
#### TuiOpenHelpResponses

```ts
export type TuiOpenHelpResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuiopenhelpresponse"></a>
#### TuiOpenHelpResponse

```ts
export type TuiOpenHelpResponse = TuiOpenHelpResponses[keyof TuiOpenHelpResponses];
```

<a id="sdk-dist-index-js-tuiopensessionsdata"></a>
#### TuiOpenSessionsData

```ts
export type TuiOpenSessionsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuiopensessionsresponses"></a>
#### TuiOpenSessionsResponses

```ts
export type TuiOpenSessionsResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuiopensessionsresponse"></a>
#### TuiOpenSessionsResponse

```ts
export type TuiOpenSessionsResponse = TuiOpenSessionsResponses[keyof TuiOpenSessionsResponses];
```

<a id="sdk-dist-index-js-tuiopenthemesdata"></a>
#### TuiOpenThemesData

```ts
export type TuiOpenThemesData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuiopenthemesresponses"></a>
#### TuiOpenThemesResponses

```ts
export type TuiOpenThemesResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuiopenthemesresponse"></a>
#### TuiOpenThemesResponse

```ts
export type TuiOpenThemesResponse = TuiOpenThemesResponses[keyof TuiOpenThemesResponses];
```

<a id="sdk-dist-index-js-tuiopenmodelsdata"></a>
#### TuiOpenModelsData

```ts
export type TuiOpenModelsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuiopenmodelsresponses"></a>
#### TuiOpenModelsResponses

```ts
export type TuiOpenModelsResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuiopenmodelsresponse"></a>
#### TuiOpenModelsResponse

```ts
export type TuiOpenModelsResponse = TuiOpenModelsResponses[keyof TuiOpenModelsResponses];
```

<a id="sdk-dist-index-js-tuisubmitpromptdata"></a>
#### TuiSubmitPromptData

```ts
export type TuiSubmitPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuisubmitpromptresponses"></a>
#### TuiSubmitPromptResponses

```ts
export type TuiSubmitPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuisubmitpromptresponse"></a>
#### TuiSubmitPromptResponse

```ts
export type TuiSubmitPromptResponse = TuiSubmitPromptResponses[keyof TuiSubmitPromptResponses];
```

<a id="sdk-dist-index-js-tuiclearpromptdata"></a>
#### TuiClearPromptData

```ts
export type TuiClearPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuiclearpromptresponses"></a>
#### TuiClearPromptResponses

```ts
export type TuiClearPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuiclearpromptresponse"></a>
#### TuiClearPromptResponse

```ts
export type TuiClearPromptResponse = TuiClearPromptResponses[keyof TuiClearPromptResponses];
```

<a id="sdk-dist-index-js-tuiexecutecommanddata"></a>
#### TuiExecuteCommandData

```ts
export type TuiExecuteCommandData = {
    body?: {
        command: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuiexecutecommanderrors"></a>
#### TuiExecuteCommandErrors

```ts
export type TuiExecuteCommandErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-tuiexecutecommanderror"></a>
#### TuiExecuteCommandError

```ts
export type TuiExecuteCommandError = TuiExecuteCommandErrors[keyof TuiExecuteCommandErrors];
```

<a id="sdk-dist-index-js-tuiexecutecommandresponses"></a>
#### TuiExecuteCommandResponses

```ts
export type TuiExecuteCommandResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuiexecutecommandresponse"></a>
#### TuiExecuteCommandResponse

```ts
export type TuiExecuteCommandResponse = TuiExecuteCommandResponses[keyof TuiExecuteCommandResponses];
```

<a id="sdk-dist-index-js-tuishowtoastdata"></a>
#### TuiShowToastData

```ts
export type TuiShowToastData = {
    body?: {
        title?: string;
        message: string;
        variant:  |  |  | ;
        duration?: number;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuishowtoastresponses"></a>
#### TuiShowToastResponses

```ts
export type TuiShowToastResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuishowtoastresponse"></a>
#### TuiShowToastResponse

```ts
export type TuiShowToastResponse = TuiShowToastResponses[keyof TuiShowToastResponses];
```

<a id="sdk-dist-index-js-tuipublishdata"></a>
#### TuiPublishData

```ts
export type TuiPublishData = {
    body?: EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuipublisherrors"></a>
#### TuiPublishErrors

```ts
export type TuiPublishErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-tuipublisherror"></a>
#### TuiPublishError

```ts
export type TuiPublishError = TuiPublishErrors[keyof TuiPublishErrors];
```

<a id="sdk-dist-index-js-tuipublishresponses"></a>
#### TuiPublishResponses

```ts
export type TuiPublishResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuipublishresponse"></a>
#### TuiPublishResponse

```ts
export type TuiPublishResponse = TuiPublishResponses[keyof TuiPublishResponses];
```

<a id="sdk-dist-index-js-tuicontrolnextdata"></a>
#### TuiControlNextData

```ts
export type TuiControlNextData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuicontrolnextresponses"></a>
#### TuiControlNextResponses

```ts
export type TuiControlNextResponses = {
    : {
        path: string;
        body: unknown;
    };
};
```

<a id="sdk-dist-index-js-tuicontrolnextresponse"></a>
#### TuiControlNextResponse

```ts
export type TuiControlNextResponse = TuiControlNextResponses[keyof TuiControlNextResponses];
```

<a id="sdk-dist-index-js-tuicontrolresponsedata"></a>
#### TuiControlResponseData

```ts
export type TuiControlResponseData = {
    body?: unknown;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-tuicontrolresponseresponses"></a>
#### TuiControlResponseResponses

```ts
export type TuiControlResponseResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-tuicontrolresponseresponse"></a>
#### TuiControlResponseResponse

```ts
export type TuiControlResponseResponse = TuiControlResponseResponses[keyof TuiControlResponseResponses];
```

<a id="sdk-dist-index-js-authsetdata"></a>
#### AuthSetData

```ts
export type AuthSetData = {
    body?: Auth;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-authseterrors"></a>
#### AuthSetErrors

```ts
export type AuthSetErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-js-authseterror"></a>
#### AuthSetError

```ts
export type AuthSetError = AuthSetErrors[keyof AuthSetErrors];
```

<a id="sdk-dist-index-js-authsetresponses"></a>
#### AuthSetResponses

```ts
export type AuthSetResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-js-authsetresponse"></a>
#### AuthSetResponse

```ts
export type AuthSetResponse = AuthSetResponses[keyof AuthSetResponses];
```

<a id="sdk-dist-index-js-eventsubscribedata"></a>
#### EventSubscribeData

```ts
export type EventSubscribeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-js-eventsubscriberesponses"></a>
#### EventSubscribeResponses

```ts
export type EventSubscribeResponses = {
    : Event;
};
```

<a id="sdk-dist-index-js-eventsubscriberesponse"></a>
#### EventSubscribeResponse

```ts
export type EventSubscribeResponse = EventSubscribeResponses[keyof EventSubscribeResponses];
```

<a id="sdk-dist-index-js-clientoptions"></a>
#### ClientOptions

```ts
export type ClientOptions = {
    baseUrl: stringstring | (string & {});
};
```

<a id="sdk-dist-index-js-serveroptions"></a>
#### ServerOptions

```ts
export type ServerOptions = {
    hostname?: string;
    port?: number;
    signal?: AbortSignal;
    timeout?: number;
    config?: Config;
};
```

<a id="sdk-dist-index-js-tuioptions"></a>
#### TuiOptions

```ts
export type TuiOptions = {
    project?: string;
    model?: string;
    session?: string;
    agent?: string;
    signal?: AbortSignal;
    config?: Config;
};
```

## dist/gen/client.gen.d.ts

### types

The `createClientConfig()` function will be called on client initialization
and the returned object will become the client's initial configuration.

You may want to initialize your client this way instead of calling
`setConfig()`. This is useful for example if you're using Next.js
to ensure your client always has the correct values.

<a id="sdk-dist-gen-client-gen-d-ts-createclientconfig"></a>
#### CreateClientConfig

```ts
/**
 * The `createClientConfig()` function will be called on client initialization
 * and the returned object will become the client's initial configuration.
 *
 * You may want to initialize your client this way instead of calling
 * `setConfig()`. This is useful for example if you're using Next.js
 * to ensure your client always has the correct values.
 */
export type CreateClientConfig<T extends DefaultClientOptions = ClientOptions> = (override?: Config<DefaultClientOptions & T>) => Config<Required<DefaultClientOptions> & T>;
```

### variables

<a id="sdk-dist-gen-client-gen-d-ts-client"></a>
#### client

```ts
client: import("./client/types.gen.js").Client
```

## dist/gen/sdk.gen.js

### classs

<a id="sdk-dist-gen-sdk-gen-js-opencodeclient"></a>
#### OpencodeClient

```ts
export class OpencodeClient extends _HeyApiClient {
    /**
     * Respond to a permission request
     */
    postSessionIdPermissionsPermissionId(options) {
        return (options.client ?? this._client).post({
            url: "/session/{id}/permissions/{permissionID}",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
    }
    global = new Global({ client: this._client });
    project = new Project({ client: this._client });
    config = new Config({ client: this._client });
    tool = new Tool({ client: this._client });
    instance = new Instance({ client: this._client });
    path = new Path({ client: this._client });
    vcs = new Vcs({ client: this._client });
    session = new Session({ client: this._client });
    command = new Command({ client: this._client });
    provider = new Provider({ client: this._client });
    find = new Find({ client: this._client });
    file = new File({ client: this._client });
    app = new App({ client: this._client });
    mcp = new Mcp({ client: this._client });
    lsp = new Lsp({ client: this._client });
    formatter = new Formatter({ client: this._client });
    tui = new Tui({ client: this._client });
    auth = new Auth({ client: this._client });
    event = new Event({ client: this._client });
}
```

## dist/gen/core/pathSerializer.gen.js

### variables

<a id="sdk-dist-gen-core-pathserializer-gen-js-separatorarrayexplode"></a>
#### separatorArrayExplode

```ts
separatorArrayExplode = (style) => {
    switch (style) {
        case "label":
            return ".";
        case "matrix":
            return ";";
        case "simple":
            return ",";
        default:
            return "&";
    }
}
```

<a id="sdk-dist-gen-core-pathserializer-gen-js-separatorarraynoexplode"></a>
#### separatorArrayNoExplode

```ts
separatorArrayNoExplode = (style) => {
    switch (style) {
        case "form":
            return ",";
        case "pipeDelimited":
            return "|";
        case "spaceDelimited":
            return "%20";
        default:
            return ",";
    }
}
```

<a id="sdk-dist-gen-core-pathserializer-gen-js-separatorobjectexplode"></a>
#### separatorObjectExplode

```ts
separatorObjectExplode = (style) => {
    switch (style) {
        case "label":
            return ".";
        case "matrix":
            return ";";
        case "simple":
            return ",";
        default:
            return "&";
    }
}
```

<a id="sdk-dist-gen-core-pathserializer-gen-js-serializearrayparam"></a>
#### serializeArrayParam

```ts
serializeArrayParam = ({ allowReserved, explode, name, style, value, }) => {
    if (!explode) {
        const joinedValues = (allowReserved ? value : value.map((v) => encodeURIComponent(v))).join(separatorArrayNoExplode(style));
        switch (style) {
            case "label":
                return `.${joinedValues}`;
            case "matrix":
                return `;${name}=${joinedValues}`;
            case "simple":
                return joinedValues;
            default:
                return `${name}=${joinedValues}`;
        }
    }
    const separator = separatorArrayExplode(style);
    const joinedValues = value
        .map((v) => {
        if (style === "label" || style === "simple") {
            return allowReserved ? v : encodeURIComponent(v);
        }
        return serializePrimitiveParam({
            allowReserved,
            name,
            value: v,
        });
    })
        .join(separator);
    return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
}
```

<a id="sdk-dist-gen-core-pathserializer-gen-js-serializeprimitiveparam"></a>
#### serializePrimitiveParam

```ts
serializePrimitiveParam = ({ allowReserved, name, value }) => {
    if (value === undefined || value === null) {
        return "";
    }
    if (typeof value === "object") {
        throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
    }
    return `${name}=${allowReserved ? value : encodeURIComponent(value)}`;
}
```

<a id="sdk-dist-gen-core-pathserializer-gen-js-serializeobjectparam"></a>
#### serializeObjectParam

```ts
serializeObjectParam = ({ allowReserved, explode, name, style, value, valueOnly, }) => {
    if (value instanceof Date) {
        return valueOnly ? value.toISOString() : `${name}=${value.toISOString()}`;
    }
    if (style !== "deepObject" && !explode) {
        let values = [];
        Object.entries(value).forEach(([key, v]) => {
            values = [...values, key, allowReserved ? v : encodeURIComponent(v)];
        });
        const joinedValues = values.join(",");
        switch (style) {
            case "form":
                return `${name}=${joinedValues}`;
            case "label":
                return `.${joinedValues}`;
            case "matrix":
                return `;${name}=${joinedValues}`;
            default:
                return joinedValues;
        }
    }
    const separator = separatorObjectExplode(style);
    const joinedValues = Object.entries(value)
        .map(([key, v]) => serializePrimitiveParam({
        allowReserved,
        name: style === "deepObject" ? `${name}[${key}]` : key,
        value: v,
    }))
        .join(separator);
    return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
}
```

## dist/gen/core/utils.gen.js

### variables

<a id="sdk-dist-gen-core-utils-gen-js-path-param-re"></a>
#### PATH_PARAM_RE

```ts
PATH_PARAM_RE = /\{[^{}]+\}/g
```

<a id="sdk-dist-gen-core-utils-gen-js-defaultpathserializer"></a>
#### defaultPathSerializer

```ts
defaultPathSerializer = ({ path, url: _url }) => {
    let url = _url;
    const matches = _url.match(PATH_PARAM_RE);
    if (matches) {
        for (const match of matches) {
            let explode = false;
            let name = match.substring(1, match.length - 1);
            let style = "simple";
            if (name.endsWith("*")) {
                explode = true;
                name = name.substring(0, name.length - 1);
            }
            if (name.startsWith(".")) {
                name = name.substring(1);
                style = "label";
            }
            else if (name.startsWith(";")) {
                name = name.substring(1);
                style = "matrix";
            }
            const value = path[name];
            if (value === undefined || value === null) {
                continue;
            }
            if (Array.isArray(value)) {
                url = url.replace(match, serializeArrayParam({ explode, name, style, value }));
                continue;
            }
            if (typeof value === "object") {
                url = url.replace(match, serializeObjectParam({
                    explode,
                    name,
                    style,
                    value: value,
                    valueOnly: true,
                }));
                continue;
            }
            if (style === "matrix") {
                url = url.replace(match, `;${serializePrimitiveParam({
                    name,
                    value: value,
                })}`);
                continue;
            }
            const replaceValue = encodeURIComponent(style === "label" ? `.${value}` : value);
            url = url.replace(match, replaceValue);
        }
    }
    return url;
}
```

<a id="sdk-dist-gen-core-utils-gen-js-geturl"></a>
#### getUrl

```ts
getUrl = ({ baseUrl, path, query, querySerializer, url: _url, }) => {
    const pathUrl = _url.startsWith("/") ? _url : `/${_url}`;
    let url = (baseUrl ?? "") + pathUrl;
    if (path) {
        url = defaultPathSerializer({ path, url });
    }
    let search = query ? querySerializer(query) : "";
    if (search.startsWith("?")) {
        search = search.substring(1);
    }
    if (search) {
        url += `?${search}`;
    }
    return url;
}
```

## dist/gen/core/params.gen.js

### variables

<a id="sdk-dist-gen-core-params-gen-js-buildclientparams"></a>
#### buildClientParams

```ts
buildClientParams = (args, fields) => {
    const params = {
        body: {},
        headers: {},
        path: {},
        query: {},
    };
    const map = buildKeyMap(fields);
    let config;
    for (const [index, arg] of args.entries()) {
        if (fields[index]) {
            config = fields[index];
        }
        if (!config) {
            continue;
        }
        if ("in" in config) {
            if (config.key) {
                const field = map.get(config.key);
                const name = field.map || config.key;
                params[field.in][name] = arg;
            }
            else {
                params.body = arg;
            }
        }
        else {
            for (const [key, value] of Object.entries(arg ?? {})) {
                const field = map.get(key);
                if (field) {
                    const name = field.map || key;
                    params[field.in][name] = value;
                }
                else {
                    const extra = extraPrefixes.find(([prefix]) => key.startsWith(prefix));
                    if (extra) {
                        const [prefix, slot] = extra;
                        params[slot][key.slice(prefix.length)] = value;
                    }
                    else {
                        for (const [slot, allowed] of Object.entries(config.allowExtra ?? {})) {
                            if (allowed) {
                                ;
                                params[slot][key] = value;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    stripEmptySlots(params);
    return params;
}
```

## dist/gen/core/serverSentEvents.gen.js

### variables

<a id="sdk-dist-gen-core-serversentevents-gen-js-createsseclient"></a>
#### createSseClient

```ts
createSseClient = ({ onSseError, onSseEvent, responseTransformer, responseValidator, sseDefaultRetryDelay, sseMaxRetryAttempts, sseMaxRetryDelay, sseSleepFn, url, ...options }) => {
    let lastEventId;
    const sleep = sseSleepFn ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
    const createStream = async function* () {
        let retryDelay = sseDefaultRetryDelay ?? 3000;
        let attempt = 0;
        const signal = options.signal ?? new AbortController().signal;
        while (true) {
            if (signal.aborted)
                break;
            attempt++;
            const headers = options.headers instanceof Headers
                ? options.headers
                : new Headers(options.headers);
            if (lastEventId !== undefined) {
                headers.set("Last-Event-ID", lastEventId);
            }
            try {
                const response = await fetch(url, { ...options, headers, signal });
                if (!response.ok)
                    throw new Error(`SSE failed: ${response.status} ${response.statusText}`);
                if (!response.body)
                    throw new Error("No body in SSE response");
                const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
                let buffer = "";
                const abortHandler = () => {
                    try {
                        reader.cancel();
                    }
                    catch {
                        // noop
                    }
                };
                signal.addEventListener("abort", abortHandler);
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done)
                            break;
                        buffer += value;
                        const chunks = buffer.split("\n\n");
                        buffer = chunks.pop() ?? "";
                        for (const chunk of chunks) {
                            const lines = chunk.split("\n");
                            const dataLines = [];
                            let eventName;
                            for (const line of lines) {
                                if (line.startsWith("data:")) {
                                    dataLines.push(line.replace(/^data:\s*/, ""));
                                }
                                else if (line.startsWith("event:")) {
                                    eventName = line.replace(/^event:\s*/, "");
                                }
                                else if (line.startsWith("id:")) {
                                    lastEventId = line.replace(/^id:\s*/, "");
                                }
                                else if (line.startsWith("retry:")) {
                                    const parsed = Number.parseInt(line.replace(/^retry:\s*/, ""), 10);
                                    if (!Number.isNaN(parsed)) {
                                        retryDelay = parsed;
                                    }
                                }
                            }
                            let data;
                            let parsedJson = false;
                            if (dataLines.length) {
                                const rawData = dataLines.join("\n");
                                try {
                                    data = JSON.parse(rawData);
                                    parsedJson = true;
                                }
                                catch {
                                    data = rawData;
                                }
                            }
                            if (parsedJson) {
                                if (responseValidator) {
                                    await responseValidator(data);
                                }
                                if (responseTransformer) {
                                    data = await responseTransformer(data);
                                }
                            }
                            onSseEvent?.({
                                data,
                                event: eventName,
                                id: lastEventId,
                                retry: retryDelay,
                            });
                            if (dataLines.length) {
                                yield data;
                            }
                        }
                    }
                }
                finally {
                    signal.removeEventListener("abort", abortHandler);
                    reader.releaseLock();
                }
                break; // exit loop on normal completion
            }
            catch (error) {
                // connection failed or aborted; retry after delay
                onSseError?.(error);
                if (sseMaxRetryAttempts !== undefined && attempt >= sseMaxRetryAttempts) {
                    break; // stop after firing error
                }
                // exponential backoff: double retry each attempt, cap at 30s
                const backoff = Math.min(retryDelay * 2 ** (attempt - 1), sseMaxRetryDelay ?? 30000);
                await sleep(backoff);
            }
        }
    };
    const stream = createStream();
    return { stream };
}
```

## dist/gen/core/utils.gen.d.ts

### interfaces

<a id="sdk-dist-gen-core-utils-gen-d-ts-pathserializer"></a>
#### PathSerializer

```ts
export interface PathSerializer {
    path: Record<string, unknown>;
    url: string;
}
```

### variables

<a id="sdk-dist-gen-core-utils-gen-d-ts-path-param-re"></a>
#### PATH_PARAM_RE

```ts
PATH_PARAM_RE: RegExp
```

<a id="sdk-dist-gen-core-utils-gen-d-ts-defaultpathserializer"></a>
#### defaultPathSerializer

```ts
defaultPathSerializer: ({ path, url: _url }: PathSerializer) => string
```

<a id="sdk-dist-gen-core-utils-gen-d-ts-geturl"></a>
#### getUrl

```ts
getUrl: ({ baseUrl, path, query, querySerializer, url: _url, }: {
    baseUrl?: string;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    querySerializer: QuerySerializer;
    url: string;
}) => string
```

## dist/gen/core/auth.gen.js

### variables

<a id="sdk-dist-gen-core-auth-gen-js-getauthtoken"></a>
#### getAuthToken

```ts
getAuthToken = async (auth, callback) => {
    const token = typeof callback === "function" ? await callback(auth) : callback;
    if (!token) {
        return;
    }
    if (auth.scheme === "bearer") {
        return `Bearer ${token}`;
    }
    if (auth.scheme === "basic") {
        return `Basic ${btoa(token)}`;
    }
    return token;
}
```

## dist/gen/core/bodySerializer.gen.js

### variables

<a id="sdk-dist-gen-core-bodyserializer-gen-js-formdatabodyserializer"></a>
#### formDataBodySerializer

```ts
formDataBodySerializer = {
    bodySerializer: (body) => {
        const data = new FormData();
        Object.entries(body).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }
            if (Array.isArray(value)) {
                value.forEach((v) => serializeFormDataPair(data, key, v));
            }
            else {
                serializeFormDataPair(data, key, value);
            }
        });
        return data;
    },
}
```

<a id="sdk-dist-gen-core-bodyserializer-gen-js-jsonbodyserializer"></a>
#### jsonBodySerializer

```ts
jsonBodySerializer = {
    bodySerializer: (body) => JSON.stringify(body, (_key, value) => (typeof value === "bigint" ? value.toString() : value)),
}
```

<a id="sdk-dist-gen-core-bodyserializer-gen-js-urlsearchparamsbodyserializer"></a>
#### urlSearchParamsBodySerializer

```ts
urlSearchParamsBodySerializer = {
    bodySerializer: (body) => {
        const data = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }
            if (Array.isArray(value)) {
                value.forEach((v) => serializeUrlSearchParamsPair(data, key, v));
            }
            else {
                serializeUrlSearchParamsPair(data, key, value);
            }
        });
        return data.toString();
    },
}
```

## dist/gen/client/utils.gen.js

### variables

<a id="sdk-dist-gen-client-utils-gen-js-createqueryserializer"></a>
#### createQuerySerializer

```ts
createQuerySerializer = ({ allowReserved, array, object } = {}) => {
    const querySerializer = (queryParams) => {
        const search = [];
        if (queryParams && typeof queryParams === "object") {
            for (const name in queryParams) {
                const value = queryParams[name];
                if (value === undefined || value === null) {
                    continue;
                }
                if (Array.isArray(value)) {
                    const serializedArray = serializeArrayParam({
                        allowReserved,
                        explode: true,
                        name,
                        style: "form",
                        value,
                        ...array,
                    });
                    if (serializedArray)
                        search.push(serializedArray);
                }
                else if (typeof value === "object") {
                    const serializedObject = serializeObjectParam({
                        allowReserved,
                        explode: true,
                        name,
                        style: "deepObject",
                        value: value,
                        ...object,
                    });
                    if (serializedObject)
                        search.push(serializedObject);
                }
                else {
                    const serializedPrimitive = serializePrimitiveParam({
                        allowReserved,
                        name,
                        value: value,
                    });
                    if (serializedPrimitive)
                        search.push(serializedPrimitive);
                }
            }
        }
        return search.join("&");
    };
    return querySerializer;
}
```

Infers parseAs value from provided Content-Type header.

<a id="sdk-dist-gen-client-utils-gen-js-getparseas"></a>
#### getParseAs

```ts
getParseAs = (contentType) => {
    if (!contentType) {
        // If no Content-Type header is provided, the best we can do is return the raw response body,
        // which is effectively the same as the 'stream' option.
        return "stream";
    }
    const cleanContent = contentType.split(";")[0]?.trim();
    if (!cleanContent) {
        return;
    }
    if (cleanContent.startsWith("application/json") || cleanContent.endsWith("+json")) {
        return "json";
    }
    if (cleanContent === "multipart/form-data") {
        return "formData";
    }
    if (["application/", "audio/", "image/", "video/"].some((type) => cleanContent.startsWith(type))) {
        return "blob";
    }
    if (cleanContent.startsWith("text/")) {
        return "text";
    }
    return;
}
```

<a id="sdk-dist-gen-client-utils-gen-js-setauthparams"></a>
#### setAuthParams

```ts
setAuthParams = async ({ security, ...options }) => {
    for (const auth of security) {
        if (checkForExistence(options, auth.name)) {
            continue;
        }
        const token = await getAuthToken(auth, options.auth);
        if (!token) {
            continue;
        }
        const name = auth.name ?? "Authorization";
        switch (auth.in) {
            case "query":
                if (!options.query) {
                    options.query = {};
                }
                options.query[name] = token;
                break;
            case "cookie":
                options.headers.append("Cookie", `${name}=${token}`);
                break;
            case "header":
            default:
                options.headers.set(name, token);
                break;
        }
    }
}
```

<a id="sdk-dist-gen-client-utils-gen-js-buildurl"></a>
#### buildUrl

```ts
buildUrl = (options) => getUrl({
    baseUrl: options.baseUrl,
    path: options.path,
    query: options.query,
    querySerializer: typeof options.querySerializer === "function"
        ? options.querySerializer
        : createQuerySerializer(options.querySerializer),
    url: options.url,
})
```

<a id="sdk-dist-gen-client-utils-gen-js-mergeconfigs"></a>
#### mergeConfigs

```ts
mergeConfigs = (a, b) => {
    const config = { ...a, ...b };
    if (config.baseUrl?.endsWith("/")) {
        config.baseUrl = config.baseUrl.substring(0, config.baseUrl.length - 1);
    }
    config.headers = mergeHeaders(a.headers, b.headers);
    return config;
}
```

<a id="sdk-dist-gen-client-utils-gen-js-mergeheaders"></a>
#### mergeHeaders

```ts
mergeHeaders = (...headers) => {
    const mergedHeaders = new Headers();
    for (const header of headers) {
        if (!header || typeof header !== "object") {
            continue;
        }
        const iterator = header instanceof Headers ? header.entries() : Object.entries(header);
        for (const [key, value] of iterator) {
            if (value === null) {
                mergedHeaders.delete(key);
            }
            else if (Array.isArray(value)) {
                for (const v of value) {
                    mergedHeaders.append(key, v);
                }
            }
            else if (value !== undefined) {
                // assume object headers are meant to be JSON stringified, i.e. their
                // content value in OpenAPI specification is 'application/json'
                mergedHeaders.set(key, typeof value === "object" ? JSON.stringify(value) : value);
            }
        }
    }
    return mergedHeaders;
}
```

<a id="sdk-dist-gen-client-utils-gen-js-createinterceptors"></a>
#### createInterceptors

```ts
createInterceptors = () => ({
    error: new Interceptors(),
    request: new Interceptors(),
    response: new Interceptors(),
})
```

<a id="sdk-dist-gen-client-utils-gen-js-createconfig"></a>
#### createConfig

```ts
createConfig = (override = {}) => ({
    ...jsonBodySerializer,
    headers: defaultHeaders,
    parseAs: "auto",
    querySerializer: defaultQuerySerializer,
    ...override,
})
```

## dist/gen/client/index.js

### variables

<a id="sdk-dist-gen-client-index-js-formdatabodyserializer"></a>
#### formDataBodySerializer

```ts
formDataBodySerializer: {
    bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(body: T) => FormData;
}
```

<a id="sdk-dist-gen-client-index-js-jsonbodyserializer"></a>
#### jsonBodySerializer

```ts
jsonBodySerializer: {
    bodySerializer: <T>(body: T) => string;
}
```

<a id="sdk-dist-gen-client-index-js-urlsearchparamsbodyserializer"></a>
#### urlSearchParamsBodySerializer

```ts
urlSearchParamsBodySerializer: {
    bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(body: T) => string;
}
```

<a id="sdk-dist-gen-client-index-js-buildclientparams"></a>
#### buildClientParams

```ts
buildClientParams: (args: ReadonlyArray<unknown>, fields: FieldsConfig) => Params
```

<a id="sdk-dist-gen-client-index-js-createclient"></a>
#### createClient

```ts
createClient: (config?: Config) => Client
```

<a id="sdk-dist-gen-client-index-js-createconfig"></a>
#### createConfig

```ts
createConfig: <T extends ClientOptions = ClientOptions>(override?: Config<Omit<ClientOptions, keyof T> & T>) => Config<Omit<ClientOptions, keyof T> & T>
```

<a id="sdk-dist-gen-client-index-js-mergeheaders"></a>
#### mergeHeaders

```ts
mergeHeaders: (...headers: Array<Required<Config>[] | undefined>) => Headers
```

## dist/gen/client/client.gen.js

### variables

<a id="sdk-dist-gen-client-client-gen-js-createclient"></a>
#### createClient

```ts
createClient = (config = {}) => {
    let _config = mergeConfigs(createConfig(), config);
    const getConfig = () => ({ ..._config });
    const setConfig = (config) => {
        _config = mergeConfigs(_config, config);
        return getConfig();
    };
    const interceptors = createInterceptors();
    const beforeRequest = async (options) => {
        const opts = {
            ..._config,
            ...options,
            fetch: options.fetch ?? _config.fetch ?? globalThis.fetch,
            headers: mergeHeaders(_config.headers, options.headers),
            serializedBody: undefined,
        };
        if (opts.security) {
            await setAuthParams({
                ...opts,
                security: opts.security,
            });
        }
        if (opts.requestValidator) {
            await opts.requestValidator(opts);
        }
        if (opts.body && opts.bodySerializer) {
            opts.serializedBody = opts.bodySerializer(opts.body);
        }
        // remove Content-Type header if body is empty to avoid sending invalid requests
        if (opts.serializedBody === undefined || opts.serializedBody === "") {
            opts.headers.delete("Content-Type");
        }
        const url = buildUrl(opts);
        return { opts, url };
    };
    const request = async (options) => {
        // @ts-expect-error
        const { opts, url } = await beforeRequest(options);
        const requestInit = {
            redirect: "follow",
            ...opts,
            body: opts.serializedBody,
        };
        let request = new Request(url, requestInit);
        for (const fn of interceptors.request._fns) {
            if (fn) {
                request = await fn(request, opts);
            }
        }
        // fetch must be assigned here, otherwise it would throw the error:
        // TypeError: Failed to execute 'fetch' on 'Window': Illegal invocation
        const _fetch = opts.fetch;
        let response = await _fetch(request);
        for (const fn of interceptors.response._fns) {
            if (fn) {
                response = await fn(response, request, opts);
            }
        }
        const result = {
            request,
            response,
        };
        if (response.ok) {
            if (response.status === 204 || response.headers.get("Content-Length") === "0") {
                return opts.responseStyle === "data"
                    ? {}
                    : {
                        data: {},
                        ...result,
                    };
            }
            const parseAs = (opts.parseAs === "auto" ? getParseAs(response.headers.get("Content-Type")) : opts.parseAs) ?? "json";
            let data;
            switch (parseAs) {
                case "arrayBuffer":
                case "blob":
                case "formData":
                case "json":
                case "text":
                    data = await response[parseAs]();
                    break;
                case "stream":
                    return opts.responseStyle === "data"
                        ? response.body
                        : {
                            data: response.body,
                            ...result,
                        };
            }
            if (parseAs === "json") {
                if (opts.responseValidator) {
                    await opts.responseValidator(data);
                }
                if (opts.responseTransformer) {
                    data = await opts.responseTransformer(data);
                }
            }
            return opts.responseStyle === "data"
                ? data
                : {
                    data,
                    ...result,
                };
        }
        const textError = await response.text();
        let jsonError;
        try {
            jsonError = JSON.parse(textError);
        }
        catch {
            // noop
        }
        const error = jsonError ?? textError;
        let finalError = error;
        for (const fn of interceptors.error._fns) {
            if (fn) {
                finalError = (await fn(error, response, request, opts));
            }
        }
        finalError = finalError || {};
        if (opts.throwOnError) {
            throw finalError;
        }
        // TODO: we probably want to return error and improve types
        return opts.responseStyle === "data"
            ? undefined
            : {
                error: finalError,
                ...result,
            };
    };
    const makeMethod = (method) => {
        const fn = (options) => request({ ...options, method });
        fn.sse = async (options) => {
            const { opts, url } = await beforeRequest(options);
            return createSseClient({
                ...opts,
                body: opts.body,
                headers: opts.headers,
                method,
                url,
            });
        };
        return fn;
    };
    return {
        buildUrl,
        connect: makeMethod("CONNECT"),
        delete: makeMethod("DELETE"),
        get: makeMethod("GET"),
        getConfig,
        head: makeMethod("HEAD"),
        interceptors,
        options: makeMethod("OPTIONS"),
        patch: makeMethod("PATCH"),
        post: makeMethod("POST"),
        put: makeMethod("PUT"),
        request,
        setConfig,
        trace: makeMethod("TRACE"),
    };
}
```

## dist/gen/client.gen.js

### variables

<a id="sdk-dist-gen-client-gen-js-client"></a>
#### client

```ts
client = createClient(createConfig({
    baseUrl: "http://localhost:4096",
}))
```

## dist/index.d.ts

### classs

<a id="sdk-dist-index-d-ts-opencodeclient"></a>
#### OpencodeClient

```ts
export declare class OpencodeClient extends _HeyApiClient {
    postSessionIdPermissionsPermissionId<ThrowOnError extends boolean = false>(options: Options<PostSessionIdPermissionsPermissionIdData, ThrowOnError>): import().RequestResult<PostSessionIdPermissionsPermissionIdResponses, PostSessionIdPermissionsPermissionIdErrors, ThrowOnError, >;
    global: Global;
    project: Project;
    config: Config;
    tool: Tool;
    instance: Instance;
    path: Path;
    vcs: Vcs;
    session: Session;
    command: Command;
    provider: Provider;
    find: Find;
    file: File;
    app: App;
    mcp: Mcp;
    lsp: Lsp;
    formatter: Formatter;
    tui: Tui;
    auth: Auth;
    event: Event;
}
```

### functions

<a id="sdk-dist-index-d-ts-createopencode"></a>
#### createOpencode

```ts
export declare function createOpencode(options?: ServerOptions): Promise<{
    client: import("./client.js").OpencodeClient;
    server: {
        url: string;
        close(): void;
    };
}>;
```

<a id="sdk-dist-index-d-ts-createopencodeclient"></a>
#### createOpencodeClient

```ts
export declare function createOpencodeClient(config?: Config & {
    directory?: string;
}): OpencodeClient;
```

<a id="sdk-dist-index-d-ts-createopencodeserver"></a>
#### createOpencodeServer

```ts
export declare function createOpencodeServer(options?: ServerOptions): Promise<{
    url: string;
    close(): void;
}>;
```

<a id="sdk-dist-index-d-ts-createopencodetui"></a>
#### createOpencodeTui

```ts
export declare function createOpencodeTui(options?: TuiOptions): {
    close(): void;
};
```

### interfaces

<a id="sdk-dist-index-d-ts-opencodeclientconfig"></a>
#### OpencodeClientConfig

```ts
export interface Config<T extends ClientOptions = ClientOptions> extends Omit<RequestInit,  |  | >, CoreConfig {
    baseUrl?: T[];
    fetch?: (request: Request) => ReturnType<typeof fetch>;
    next?: never;
    parseAs?:  |  |  |  |  |  | ;
    responseStyle?: ResponseStyle;
    throwOnError?: T[];
}
```

### types

<a id="sdk-dist-index-d-ts-eventinstallationupdated"></a>
#### EventInstallationUpdated

```ts
export type EventInstallationUpdated = {
    type: er.js";
import type { S;
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventinstallationupdateavailable"></a>
#### EventInstallationUpdateAvailable

```ts
export type EventInstallationUpdateAvailable = {
    type: client: import("./client.js").O;
    properties: {
        version: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventlspclientdiagnostics"></a>
#### EventLspClientDiagnostics

```ts
export type EventLspClientDiagnostics = {
    type: ;
    properties: {
        serverID: string;
        path: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventlspupdated"></a>
#### EventLspUpdated

```ts
export type EventLspUpdated = {
    type: ;
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-d-ts-filediff"></a>
#### FileDiff

```ts
export type FileDiff = {
    file: string;
    before: string;
    after: string;
    additions: number;
    deletions: number;
};
```

<a id="sdk-dist-index-d-ts-usermessage"></a>
#### UserMessage

```ts
export type UserMessage = {
    id: string;
    sessionID: string;
    role: ;
    time: {
        created: number;
    };
    summary?: {
        title?: string;
        body?: string;
        diffs: Array<FileDiff>;
    };
    agent: string;
    model: {
        providerID: string;
        modelID: string;
    };
    system?: string;
    tools?: {
        [key: string]: boolean;
    };
};
```

<a id="sdk-dist-index-d-ts-providerautherror"></a>
#### ProviderAuthError

```ts
export type ProviderAuthError = {
    name: ;
    data: {
        providerID: string;
        message: string;
    };
};
```

<a id="sdk-dist-index-d-ts-unknownerror"></a>
#### UnknownError

```ts
export type UnknownError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-index-d-ts-messageoutputlengtherror"></a>
#### MessageOutputLengthError

```ts
export type MessageOutputLengthError = {
    name: ;
    data: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-d-ts-messageabortederror"></a>
#### MessageAbortedError

```ts
export type MessageAbortedError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-index-d-ts-apierror"></a>
#### ApiError

```ts
export type ApiError = {
    name: ;
    data: {
        message: string;
        statusCode?: number;
        isRetryable: boolean;
        responseHeaders?: {
            [key: string]: string;
        };
        responseBody?: string;
    };
};
```

<a id="sdk-dist-index-d-ts-assistantmessage"></a>
#### AssistantMessage

```ts
export type AssistantMessage = {
    id: string;
    sessionID: string;
    role: ;
    time: {
        created: number;
        completed?: number;
    };
    error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    parentID: string;
    modelID: string;
    providerID: string;
    mode: string;
    path: {
        cwd: string;
        root: string;
    };
    summary?: boolean;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
    finish?: string;
};
```

<a id="sdk-dist-index-d-ts-message"></a>
#### Message

```ts
export type Message = UserMessage | AssistantMessage;
```

<a id="sdk-dist-index-d-ts-eventmessageupdated"></a>
#### EventMessageUpdated

```ts
export type EventMessageUpdated = {
    type: ;
    properties: {
        info: Message;
    };
};
```

<a id="sdk-dist-index-d-ts-eventmessageremoved"></a>
#### EventMessageRemoved

```ts
export type EventMessageRemoved = {
    type: ;
    properties: {
        sessionID: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-index-d-ts-textpart"></a>
#### TextPart

```ts
export type TextPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-d-ts-reasoningpart"></a>
#### ReasoningPart

```ts
export type ReasoningPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    text: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end?: number;
    };
};
```

<a id="sdk-dist-index-d-ts-filepartsourcetext"></a>
#### FilePartSourceText

```ts
export type FilePartSourceText = {
    value: string;
    start: number;
    end: number;
};
```

<a id="sdk-dist-index-d-ts-filesource"></a>
#### FileSource

```ts
export type FileSource = {
    text: FilePartSourceText;
    type: ;
    path: string;
};
```

<a id="sdk-dist-index-d-ts-range"></a>
#### Range

```ts
export type Range = {
    start: {
        line: number;
        character: number;
    };
    end: {
        line: number;
        character: number;
    };
};
```

<a id="sdk-dist-index-d-ts-symbolsource"></a>
#### SymbolSource

```ts
export type SymbolSource = {
    text: FilePartSourceText;
    type: ;
    path: string;
    range: Range;
    name: string;
    kind: number;
};
```

<a id="sdk-dist-index-d-ts-filepartsource"></a>
#### FilePartSource

```ts
export type FilePartSource = FileSource | SymbolSource;
```

<a id="sdk-dist-index-d-ts-filepart"></a>
#### FilePart

```ts
export type FilePart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-index-d-ts-toolstatepending"></a>
#### ToolStatePending

```ts
export type ToolStatePending = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    raw: string;
};
```

<a id="sdk-dist-index-d-ts-toolstaterunning"></a>
#### ToolStateRunning

```ts
export type ToolStateRunning = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    title?: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
    };
};
```

<a id="sdk-dist-index-d-ts-toolstatecompleted"></a>
#### ToolStateCompleted

```ts
export type ToolStateCompleted = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    output: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
        compacted?: number;
    };
    attachments?: Array<FilePart>;
};
```

<a id="sdk-dist-index-d-ts-toolstateerror"></a>
#### ToolStateError

```ts
export type ToolStateError = {
    status: ;
    input: {
        [key: string]: unknown;
    };
    error: string;
    metadata?: {
        [key: string]: unknown;
    };
    time: {
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-index-d-ts-toolstate"></a>
#### ToolState

```ts
export type ToolState = ToolStatePending | ToolStateRunning | ToolStateCompleted | ToolStateError;
```

<a id="sdk-dist-index-d-ts-toolpart"></a>
#### ToolPart

```ts
export type ToolPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    callID: string;
    tool: string;
    state: ToolState;
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-d-ts-stepstartpart"></a>
#### StepStartPart

```ts
export type StepStartPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    snapshot?: string;
};
```

<a id="sdk-dist-index-d-ts-stepfinishpart"></a>
#### StepFinishPart

```ts
export type StepFinishPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    reason: string;
    snapshot?: string;
    cost: number;
    tokens: {
        input: number;
        output: number;
        reasoning: number;
        cache: {
            read: number;
            write: number;
        };
    };
};
```

<a id="sdk-dist-index-d-ts-snapshotpart"></a>
#### SnapshotPart

```ts
export type SnapshotPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    snapshot: string;
};
```

<a id="sdk-dist-index-d-ts-patchpart"></a>
#### PatchPart

```ts
export type PatchPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    hash: string;
    files: Array<string>;
};
```

<a id="sdk-dist-index-d-ts-agentpart"></a>
#### AgentPart

```ts
export type AgentPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-index-d-ts-retrypart"></a>
#### RetryPart

```ts
export type RetryPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    attempt: number;
    error: ApiError;
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-index-d-ts-compactionpart"></a>
#### CompactionPart

```ts
export type CompactionPart = {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    auto: boolean;
};
```

<a id="sdk-dist-index-d-ts-part"></a>
#### Part

```ts
export type Part = TextPart | {
    id: string;
    sessionID: string;
    messageID: string;
    type: ;
    prompt: string;
    description: string;
    agent: string;
} | ReasoningPart | FilePart | ToolPart | StepStartPart | StepFinishPart | SnapshotPart | PatchPart | AgentPart | RetryPart | CompactionPart;
```

<a id="sdk-dist-index-d-ts-eventmessagepartupdated"></a>
#### EventMessagePartUpdated

```ts
export type EventMessagePartUpdated = {
    type: ;
    properties: {
        part: Part;
        delta?: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventmessagepartremoved"></a>
#### EventMessagePartRemoved

```ts
export type EventMessagePartRemoved = {
    type: ;
    properties: {
        sessionID: string;
        messageID: string;
        partID: string;
    };
};
```

<a id="sdk-dist-index-d-ts-permission"></a>
#### Permission

```ts
export type Permission = {
    id: string;
    type: string;
    pattern?: string | Array<string>;
    sessionID: string;
    messageID: string;
    callID?: string;
    title: string;
    metadata: {
        [key: string]: unknown;
    };
    time: {
        created: number;
    };
};
```

<a id="sdk-dist-index-d-ts-eventpermissionupdated"></a>
#### EventPermissionUpdated

```ts
export type EventPermissionUpdated = {
    type: ;
    properties: Permission;
};
```

<a id="sdk-dist-index-d-ts-eventpermissionreplied"></a>
#### EventPermissionReplied

```ts
export type EventPermissionReplied = {
    type: ;
    properties: {
        sessionID: string;
        permissionID: string;
        response: string;
    };
};
```

<a id="sdk-dist-index-d-ts-sessionstatus"></a>
#### SessionStatus

```ts
export type SessionStatus = {
    type: ;
} | {
    type: ;
    attempt: number;
    message: string;
    next: number;
} | {
    type: ;
};
```

<a id="sdk-dist-index-d-ts-eventsessionstatus"></a>
#### EventSessionStatus

```ts
export type EventSessionStatus = {
    type: ;
    properties: {
        sessionID: string;
        status: SessionStatus;
    };
};
```

<a id="sdk-dist-index-d-ts-eventsessionidle"></a>
#### EventSessionIdle

```ts
export type EventSessionIdle = {
    type: ;
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventsessioncompacted"></a>
#### EventSessionCompacted

```ts
export type EventSessionCompacted = {
    type: ;
    properties: {
        sessionID: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventfileedited"></a>
#### EventFileEdited

```ts
export type EventFileEdited = {
    type: ;
    properties: {
        file: string;
    };
};
```

<a id="sdk-dist-index-d-ts-todo"></a>
#### Todo

```ts
export type Todo = {
    content: string;
    status: string;
    priority: string;
    id: string;
};
```

<a id="sdk-dist-index-d-ts-eventtodoupdated"></a>
#### EventTodoUpdated

```ts
export type EventTodoUpdated = {
    type: ;
    properties: {
        sessionID: string;
        todos: Array<Todo>;
    };
};
```

<a id="sdk-dist-index-d-ts-eventcommandexecuted"></a>
#### EventCommandExecuted

```ts
export type EventCommandExecuted = {
    type: ;
    properties: {
        name: string;
        sessionID: string;
        arguments: string;
        messageID: string;
    };
};
```

<a id="sdk-dist-index-d-ts-session"></a>
#### Session

```ts
export type Session = {
    id: string;
    projectID: string;
    directory: string;
    parentID?: string;
    summary?: {
        additions: number;
        deletions: number;
        files: number;
        diffs?: Array<FileDiff>;
    };
    share?: {
        url: string;
    };
    title: string;
    version: string;
    time: {
        created: number;
        updated: number;
        compacting?: number;
    };
    revert?: {
        messageID: string;
        partID?: string;
        snapshot?: string;
        diff?: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventsessioncreated"></a>
#### EventSessionCreated

```ts
export type EventSessionCreated = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-index-d-ts-eventsessionupdated"></a>
#### EventSessionUpdated

```ts
export type EventSessionUpdated = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-index-d-ts-eventsessiondeleted"></a>
#### EventSessionDeleted

```ts
export type EventSessionDeleted = {
    type: ;
    properties: {
        info: Session;
    };
};
```

<a id="sdk-dist-index-d-ts-eventsessiondiff"></a>
#### EventSessionDiff

```ts
export type EventSessionDiff = {
    type: ;
    properties: {
        sessionID: string;
        diff: Array<FileDiff>;
    };
};
```

<a id="sdk-dist-index-d-ts-eventsessionerror"></a>
#### EventSessionError

```ts
export type EventSessionError = {
    type: ;
    properties: {
        sessionID?: string;
        error?: ProviderAuthError | UnknownError | MessageOutputLengthError | MessageAbortedError | ApiError;
    };
};
```

<a id="sdk-dist-index-d-ts-eventfilewatcherupdated"></a>
#### EventFileWatcherUpdated

```ts
export type EventFileWatcherUpdated = {
    type: ;
    properties: {
        file: string;
        event:  |  | ;
    };
};
```

<a id="sdk-dist-index-d-ts-eventvcsbranchupdated"></a>
#### EventVcsBranchUpdated

```ts
export type EventVcsBranchUpdated = {
    type: ;
    properties: {
        branch?: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventtuipromptappend"></a>
#### EventTuiPromptAppend

```ts
export type EventTuiPromptAppend = {
    type: ;
    properties: {
        text: string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventtuicommandexecute"></a>
#### EventTuiCommandExecute

```ts
export type EventTuiCommandExecute = {
    type: ;
    properties: {
        command: ( |  |  |  |  |  |  |  |  |  |  |  |  | ) | string;
    };
};
```

<a id="sdk-dist-index-d-ts-eventtuitoastshow"></a>
#### EventTuiToastShow

```ts
export type EventTuiToastShow = {
    type: ;
    properties: {
        title?: string;
        message: string;
        variant:  |  |  | ;
        duration?: number;
    };
};
```

<a id="sdk-dist-index-d-ts-eventserverconnected"></a>
#### EventServerConnected

```ts
export type EventServerConnected = {
    type: ;
    properties: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-d-ts-event"></a>
#### Event

```ts
export type Event = EventInstallationUpdated | EventInstallationUpdateAvailable | EventLspClientDiagnostics | EventLspUpdated | EventMessageUpdated | EventMessageRemoved | EventMessagePartUpdated | EventMessagePartRemoved | EventPermissionUpdated | EventPermissionReplied | EventSessionStatus | EventSessionIdle | EventSessionCompacted | EventFileEdited | EventTodoUpdated | EventCommandExecuted | EventSessionCreated | EventSessionUpdated | EventSessionDeleted | EventSessionDiff | EventSessionError | EventFileWatcherUpdated | EventVcsBranchUpdated | EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow | EventServerConnected;
```

<a id="sdk-dist-index-d-ts-globalevent"></a>
#### GlobalEvent

```ts
export type GlobalEvent = {
    directory: string;
    payload: Event;
};
```

<a id="sdk-dist-index-d-ts-project"></a>
#### Project

```ts
export type Project = {
    id: string;
    worktree: string;
    vcsDir?: string;
    vcs?: ;
    time: {
        created: number;
        initialized?: number;
    };
};
```

Custom keybind configurations

<a id="sdk-dist-index-d-ts-keybindsconfig"></a>
#### KeybindsConfig

```ts
export type KeybindsConfig = {
    leader?: string;
    app_exit?: string;
    editor_open?: string;
    theme_list?: string;
    sidebar_toggle?: string;
    status_view?: string;
    session_export?: string;
    session_new?: string;
    session_list?: string;
    session_timeline?: string;
    session_share?: string;
    session_unshare?: string;
    session_interrupt?: string;
    session_compact?: string;
    messages_page_up?: string;
    messages_page_down?: string;
    messages_half_page_up?: string;
    messages_half_page_down?: string;
    messages_first?: string;
    messages_last?: string;
    messages_copy?: string;
    messages_undo?: string;
    messages_redo?: string;
    messages_toggle_conceal?: string;
    model_list?: string;
    model_cycle_recent?: string;
    model_cycle_recent_reverse?: string;
    command_list?: string;
    agent_list?: string;
    agent_cycle?: string;
    agent_cycle_reverse?: string;
    input_clear?: string;
    input_forward_delete?: string;
    input_paste?: string;
    input_submit?: string;
    input_newline?: string;
    history_previous?: string;
    history_next?: string;
    session_child_cycle?: string;
    session_child_cycle_reverse?: string;
    terminal_suspend?: string;
};
```

<a id="sdk-dist-index-d-ts-agentconfig"></a>
#### AgentConfig

```ts
export type AgentConfig = {
    model?: string;
    temperature?: number;
    top_p?: number;
    prompt?: string;
    tools?: {
        [key: string]: boolean;
    };
    disable?: boolean;
    description?: string;
    mode?:  |  | ;
    color?: string;
    permission?: {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    [key: string]: unknown | string | number | {
        [key: string]: boolean;
    } | boolean | ( |  | ) | {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    } | undefined;
};
```

<a id="sdk-dist-index-d-ts-mcplocalconfig"></a>
#### McpLocalConfig

```ts
export type McpLocalConfig = {
    type: ;
    command: Array<string>;
    environment?: {
        [key: string]: string;
    };
    enabled?: boolean;
    timeout?: number;
};
```

<a id="sdk-dist-index-d-ts-mcpremoteconfig"></a>
#### McpRemoteConfig

```ts
export type McpRemoteConfig = {
    type: ;
    url: string;
    enabled?: boolean;
    headers?: {
        [key: string]: string;
    };
    timeout?: number;
};
```

<a id="sdk-dist-index-d-ts-layoutconfig"></a>
#### LayoutConfig

```ts
export type LayoutConfig =  | ;
```

<a id="sdk-dist-index-d-ts-config"></a>
#### Config

```ts
export type Config = {
    $schema?: string;
    theme?: string;
    keybinds?: KeybindsConfig;
    tui?: {
        scroll_speed?: number;
        scroll_acceleration?: {
            enabled: boolean;
        };
        diff_style?:  | ;
    };
    command?: {
        [key: string]: {
            template: string;
            description?: string;
            agent?: string;
            model?: string;
            subtask?: boolean;
        };
    };
    watcher?: {
        ignore?: Array<string>;
    };
    plugin?: Array<string>;
    snapshot?: boolean;
    share?:  |  | ;
    autoshare?: boolean;
    autoupdate?: boolean | ;
    disabled_providers?: Array<string>;
    enabled_providers?: Array<string>;
    model?: string;
    small_model?: string;
    username?: string;
    mode?: {
        build?: AgentConfig;
        plan?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    agent?: {
        plan?: AgentConfig;
        build?: AgentConfig;
        general?: AgentConfig;
        [key: string]: AgentConfig | undefined;
    };
    provider?: {
        [key: string]: {
            api?: string;
            name?: string;
            env?: Array<string>;
            id?: string;
            npm?: string;
            models?: {
                [key: string]: {
                    id?: string;
                    name?: string;
                    release_date?: string;
                    attachment?: boolean;
                    reasoning?: boolean;
                    temperature?: boolean;
                    tool_call?: boolean;
                    cost?: {
                        input: number;
                        output: number;
                        cache_read?: number;
                        cache_write?: number;
                        context_over_200k?: {
                            input: number;
                            output: number;
                            cache_read?: number;
                            cache_write?: number;
                        };
                    };
                    limit?: {
                        context: number;
                        output: number;
                    };
                    modalities?: {
                        input: Array< |  |  |  | >;
                        output: Array< |  |  |  | >;
                    };
                    experimental?: boolean;
                    status?:  |  | ;
                    options?: {
                        [key: string]: unknown;
                    };
                    headers?: {
                        [key: string]: string;
                    };
                    provider?: {
                        npm: string;
                    };
                };
            };
            whitelist?: Array<string>;
            blacklist?: Array<string>;
            options?: {
                apiKey?: string;
                baseURL?: string;
                enterpriseUrl?: string;
                setCacheKey?: boolean;
                timeout?: number | false;
                [key: string]: unknown | string | boolean | (number | false) | undefined;
            };
        };
    };
    mcp?: {
        [key: string]: McpLocalConfig | McpRemoteConfig;
    };
    formatter?: false | {
        [key: string]: {
            disabled?: boolean;
            command?: Array<string>;
            environment?: {
                [key: string]: string;
            };
            extensions?: Array<string>;
        };
    };
    lsp?: false | {
        [key: string]: {
            disabled: true;
        } | {
            command: Array<string>;
            extensions?: Array<string>;
            disabled?: boolean;
            env?: {
                [key: string]: string;
            };
            initialization?: {
                [key: string]: unknown;
            };
        };
    };
    instructions?: Array<string>;
    layout?: LayoutConfig;
    permission?: {
        edit?:  |  | ;
        bash?: ( |  | ) | {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    tools?: {
        [key: string]: boolean;
    };
    enterprise?: {
        url?: string;
    };
    experimental?: {
        hook?: {
            file_edited?: {
                [key: string]: Array<{
                    command: Array<string>;
                    environment?: {
                        [key: string]: string;
                    };
                }>;
            };
            session_completed?: Array<{
                command: Array<string>;
                environment?: {
                    [key: string]: string;
                };
            }>;
        };
        chatMaxRetries?: number;
        disable_paste_summary?: boolean;
        batch_tool?: boolean;
    };
};
```

<a id="sdk-dist-index-d-ts-badrequesterror"></a>
#### BadRequestError

```ts
export type BadRequestError = {
    data: unknown;
    errors: Array<{
        [key: string]: unknown;
    }>;
    success: false;
};
```

<a id="sdk-dist-index-d-ts-toolids"></a>
#### ToolIds

```ts
export type ToolIds = Array<string>;
```

<a id="sdk-dist-index-d-ts-toollistitem"></a>
#### ToolListItem

```ts
export type ToolListItem = {
    id: string;
    description: string;
    parameters: unknown;
};
```

<a id="sdk-dist-index-d-ts-toollist"></a>
#### ToolList

```ts
export type ToolList = Array<ToolListItem>;
```

<a id="sdk-dist-index-d-ts-path"></a>
#### Path

```ts
export type Path = {
    state: string;
    config: string;
    worktree: string;
    directory: string;
};
```

<a id="sdk-dist-index-d-ts-vcsinfo"></a>
#### VcsInfo

```ts
export type VcsInfo = {
    branch: string;
};
```

<a id="sdk-dist-index-d-ts-notfounderror"></a>
#### NotFoundError

```ts
export type NotFoundError = {
    name: ;
    data: {
        message: string;
    };
};
```

<a id="sdk-dist-index-d-ts-textpartinput"></a>
#### TextPartInput

```ts
export type TextPartInput = {
    id?: string;
    type: ;
    text: string;
    synthetic?: boolean;
    ignored?: boolean;
    time?: {
        start: number;
        end?: number;
    };
    metadata?: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-d-ts-filepartinput"></a>
#### FilePartInput

```ts
export type FilePartInput = {
    id?: string;
    type: ;
    mime: string;
    filename?: string;
    url: string;
    source?: FilePartSource;
};
```

<a id="sdk-dist-index-d-ts-agentpartinput"></a>
#### AgentPartInput

```ts
export type AgentPartInput = {
    id?: string;
    type: ;
    name: string;
    source?: {
        value: string;
        start: number;
        end: number;
    };
};
```

<a id="sdk-dist-index-d-ts-subtaskpartinput"></a>
#### SubtaskPartInput

```ts
export type SubtaskPartInput = {
    id?: string;
    type: ;
    prompt: string;
    description: string;
    agent: string;
};
```

<a id="sdk-dist-index-d-ts-command"></a>
#### Command

```ts
export type Command = {
    name: string;
    description?: string;
    agent?: string;
    model?: string;
    template: string;
    subtask?: boolean;
};
```

<a id="sdk-dist-index-d-ts-model"></a>
#### Model

```ts
export type Model = {
    id: string;
    name: string;
    release_date: string;
    attachment: boolean;
    reasoning: boolean;
    temperature: boolean;
    tool_call: boolean;
    cost: {
        input: number;
        output: number;
        cache_read?: number;
        cache_write?: number;
        context_over_200k?: {
            input: number;
            output: number;
            cache_read?: number;
            cache_write?: number;
        };
    };
    limit: {
        context: number;
        output: number;
    };
    modalities?: {
        input: Array< |  |  |  | >;
        output: Array< |  |  |  | >;
    };
    experimental?: boolean;
    status?:  |  | ;
    options: {
        [key: string]: unknown;
    };
    headers?: {
        [key: string]: string;
    };
    provider?: {
        npm: string;
    };
};
```

<a id="sdk-dist-index-d-ts-provider"></a>
#### Provider

```ts
export type Provider = {
    api?: string;
    name: string;
    env: Array<string>;
    id: string;
    npm?: string;
    models: {
        [key: string]: Model;
    };
};
```

<a id="sdk-dist-index-d-ts-providerauthmethod"></a>
#### ProviderAuthMethod

```ts
export type ProviderAuthMethod = {
    type:  | ;
    label: string;
};
```

<a id="sdk-dist-index-d-ts-providerauthauthorization"></a>
#### ProviderAuthAuthorization

```ts
export type ProviderAuthAuthorization = {
    url: string;
    method:  | ;
    instructions: string;
};
```

<a id="sdk-dist-index-d-ts-symbol"></a>
#### Symbol

```ts
export type Symbol = {
    name: string;
    kind: number;
    location: {
        uri: string;
        range: Range;
    };
};
```

<a id="sdk-dist-index-d-ts-filenode"></a>
#### FileNode

```ts
export type FileNode = {
    name: string;
    path: string;
    absolute: string;
    type:  | ;
    ignored: boolean;
};
```

<a id="sdk-dist-index-d-ts-filecontent"></a>
#### FileContent

```ts
export type FileContent = {
    type: ;
    content: string;
    diff?: string;
    patch?: {
        oldFileName: string;
        newFileName: string;
        oldHeader?: string;
        newHeader?: string;
        hunks: Array<{
            oldStart: number;
            oldLines: number;
            newStart: number;
            newLines: number;
            lines: Array<string>;
        }>;
        index?: string;
    };
    encoding?: ;
    mimeType?: string;
};
```

<a id="sdk-dist-index-d-ts-file"></a>
#### File

```ts
export type File = {
    path: string;
    added: number;
    removed: number;
    status:  |  | ;
};
```

<a id="sdk-dist-index-d-ts-agent"></a>
#### Agent

```ts
export type Agent = {
    name: string;
    description?: string;
    mode:  |  | ;
    builtIn: boolean;
    topP?: number;
    temperature?: number;
    color?: string;
    permission: {
        edit:  |  | ;
        bash: {
            [key: string]:  |  | ;
        };
        webfetch?:  |  | ;
        doom_loop?:  |  | ;
        external_directory?:  |  | ;
    };
    model?: {
        modelID: string;
        providerID: string;
    };
    prompt?: string;
    tools: {
        [key: string]: boolean;
    };
    options: {
        [key: string]: unknown;
    };
};
```

<a id="sdk-dist-index-d-ts-mcpstatusconnected"></a>
#### McpStatusConnected

```ts
export type McpStatusConnected = {
    status: ;
};
```

<a id="sdk-dist-index-d-ts-mcpstatusdisabled"></a>
#### McpStatusDisabled

```ts
export type McpStatusDisabled = {
    status: ;
};
```

<a id="sdk-dist-index-d-ts-mcpstatusfailed"></a>
#### McpStatusFailed

```ts
export type McpStatusFailed = {
    status: ;
    error: string;
};
```

<a id="sdk-dist-index-d-ts-mcpstatus"></a>
#### McpStatus

```ts
export type McpStatus = McpStatusConnected | McpStatusDisabled | McpStatusFailed;
```

<a id="sdk-dist-index-d-ts-lspstatus"></a>
#### LspStatus

```ts
export type LspStatus = {
    id: string;
    name: string;
    root: string;
    status:  | ;
};
```

<a id="sdk-dist-index-d-ts-formatterstatus"></a>
#### FormatterStatus

```ts
export type FormatterStatus = {
    name: string;
    extensions: Array<string>;
    enabled: boolean;
};
```

<a id="sdk-dist-index-d-ts-oauth"></a>
#### OAuth

```ts
export type OAuth = {
    type: ;
    refresh: string;
    access: string;
    expires: number;
    enterpriseUrl?: string;
};
```

<a id="sdk-dist-index-d-ts-apiauth"></a>
#### ApiAuth

```ts
export type ApiAuth = {
    type: ;
    key: string;
};
```

<a id="sdk-dist-index-d-ts-wellknownauth"></a>
#### WellKnownAuth

```ts
export type WellKnownAuth = {
    type: ;
    key: string;
    token: string;
};
```

<a id="sdk-dist-index-d-ts-auth"></a>
#### Auth

```ts
export type Auth = OAuth | ApiAuth | WellKnownAuth;
```

<a id="sdk-dist-index-d-ts-globaleventdata"></a>
#### GlobalEventData

```ts
export type GlobalEventData = {
    body?: never;
    path?: never;
    query?: never;
    url: ;
};
```

<a id="sdk-dist-index-d-ts-globaleventresponses"></a>
#### GlobalEventResponses

```ts
export type GlobalEventResponses = {
    : GlobalEvent;
};
```

<a id="sdk-dist-index-d-ts-globaleventresponse"></a>
#### GlobalEventResponse

```ts
export type GlobalEventResponse = GlobalEventResponses[keyof GlobalEventResponses];
```

<a id="sdk-dist-index-d-ts-projectlistdata"></a>
#### ProjectListData

```ts
export type ProjectListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-projectlistresponses"></a>
#### ProjectListResponses

```ts
export type ProjectListResponses = {
    : Array<Project>;
};
```

<a id="sdk-dist-index-d-ts-projectlistresponse"></a>
#### ProjectListResponse

```ts
export type ProjectListResponse = ProjectListResponses[keyof ProjectListResponses];
```

<a id="sdk-dist-index-d-ts-projectcurrentdata"></a>
#### ProjectCurrentData

```ts
export type ProjectCurrentData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-projectcurrentresponses"></a>
#### ProjectCurrentResponses

```ts
export type ProjectCurrentResponses = {
    : Project;
};
```

<a id="sdk-dist-index-d-ts-projectcurrentresponse"></a>
#### ProjectCurrentResponse

```ts
export type ProjectCurrentResponse = ProjectCurrentResponses[keyof ProjectCurrentResponses];
```

<a id="sdk-dist-index-d-ts-configgetdata"></a>
#### ConfigGetData

```ts
export type ConfigGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-configgetresponses"></a>
#### ConfigGetResponses

```ts
export type ConfigGetResponses = {
    : Config;
};
```

<a id="sdk-dist-index-d-ts-configgetresponse"></a>
#### ConfigGetResponse

```ts
export type ConfigGetResponse = ConfigGetResponses[keyof ConfigGetResponses];
```

<a id="sdk-dist-index-d-ts-configupdatedata"></a>
#### ConfigUpdateData

```ts
export type ConfigUpdateData = {
    body?: Config;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-configupdateerrors"></a>
#### ConfigUpdateErrors

```ts
export type ConfigUpdateErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-configupdateerror"></a>
#### ConfigUpdateError

```ts
export type ConfigUpdateError = ConfigUpdateErrors[keyof ConfigUpdateErrors];
```

<a id="sdk-dist-index-d-ts-configupdateresponses"></a>
#### ConfigUpdateResponses

```ts
export type ConfigUpdateResponses = {
    : Config;
};
```

<a id="sdk-dist-index-d-ts-configupdateresponse"></a>
#### ConfigUpdateResponse

```ts
export type ConfigUpdateResponse = ConfigUpdateResponses[keyof ConfigUpdateResponses];
```

<a id="sdk-dist-index-d-ts-toolidsdata"></a>
#### ToolIdsData

```ts
export type ToolIdsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-toolidserrors"></a>
#### ToolIdsErrors

```ts
export type ToolIdsErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-toolidserror"></a>
#### ToolIdsError

```ts
export type ToolIdsError = ToolIdsErrors[keyof ToolIdsErrors];
```

<a id="sdk-dist-index-d-ts-toolidsresponses"></a>
#### ToolIdsResponses

```ts
export type ToolIdsResponses = {
    : ToolIds;
};
```

<a id="sdk-dist-index-d-ts-toolidsresponse"></a>
#### ToolIdsResponse

```ts
export type ToolIdsResponse = ToolIdsResponses[keyof ToolIdsResponses];
```

<a id="sdk-dist-index-d-ts-toollistdata"></a>
#### ToolListData

```ts
export type ToolListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        provider: string;
        model: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-toollisterrors"></a>
#### ToolListErrors

```ts
export type ToolListErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-toollisterror"></a>
#### ToolListError

```ts
export type ToolListError = ToolListErrors[keyof ToolListErrors];
```

<a id="sdk-dist-index-d-ts-toollistresponses"></a>
#### ToolListResponses

```ts
export type ToolListResponses = {
    : ToolList;
};
```

<a id="sdk-dist-index-d-ts-toollistresponse"></a>
#### ToolListResponse

```ts
export type ToolListResponse = ToolListResponses[keyof ToolListResponses];
```

<a id="sdk-dist-index-d-ts-instancedisposedata"></a>
#### InstanceDisposeData

```ts
export type InstanceDisposeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-instancedisposeresponses"></a>
#### InstanceDisposeResponses

```ts
export type InstanceDisposeResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-instancedisposeresponse"></a>
#### InstanceDisposeResponse

```ts
export type InstanceDisposeResponse = InstanceDisposeResponses[keyof InstanceDisposeResponses];
```

<a id="sdk-dist-index-d-ts-pathgetdata"></a>
#### PathGetData

```ts
export type PathGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-pathgetresponses"></a>
#### PathGetResponses

```ts
export type PathGetResponses = {
    : Path;
};
```

<a id="sdk-dist-index-d-ts-pathgetresponse"></a>
#### PathGetResponse

```ts
export type PathGetResponse = PathGetResponses[keyof PathGetResponses];
```

<a id="sdk-dist-index-d-ts-vcsgetdata"></a>
#### VcsGetData

```ts
export type VcsGetData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-vcsgetresponses"></a>
#### VcsGetResponses

```ts
export type VcsGetResponses = {
    : VcsInfo;
};
```

<a id="sdk-dist-index-d-ts-vcsgetresponse"></a>
#### VcsGetResponse

```ts
export type VcsGetResponse = VcsGetResponses[keyof VcsGetResponses];
```

<a id="sdk-dist-index-d-ts-sessionlistdata"></a>
#### SessionListData

```ts
export type SessionListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionlistresponses"></a>
#### SessionListResponses

```ts
export type SessionListResponses = {
    : Array<Session>;
};
```

<a id="sdk-dist-index-d-ts-sessionlistresponse"></a>
#### SessionListResponse

```ts
export type SessionListResponse = SessionListResponses[keyof SessionListResponses];
```

<a id="sdk-dist-index-d-ts-sessioncreatedata"></a>
#### SessionCreateData

```ts
export type SessionCreateData = {
    body?: {
        parentID?: string;
        title?: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessioncreateerrors"></a>
#### SessionCreateErrors

```ts
export type SessionCreateErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-sessioncreateerror"></a>
#### SessionCreateError

```ts
export type SessionCreateError = SessionCreateErrors[keyof SessionCreateErrors];
```

<a id="sdk-dist-index-d-ts-sessioncreateresponses"></a>
#### SessionCreateResponses

```ts
export type SessionCreateResponses = {
    : Session;
};
```

<a id="sdk-dist-index-d-ts-sessioncreateresponse"></a>
#### SessionCreateResponse

```ts
export type SessionCreateResponse = SessionCreateResponses[keyof SessionCreateResponses];
```

<a id="sdk-dist-index-d-ts-sessionstatusdata"></a>
#### SessionStatusData

```ts
export type SessionStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionstatuserrors"></a>
#### SessionStatusErrors

```ts
export type SessionStatusErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-sessionstatuserror"></a>
#### SessionStatusError

```ts
export type SessionStatusError = SessionStatusErrors[keyof SessionStatusErrors];
```

<a id="sdk-dist-index-d-ts-sessionstatusresponses"></a>
#### SessionStatusResponses

```ts
export type SessionStatusResponses = {
    : {
        [key: string]: SessionStatus;
    };
};
```

<a id="sdk-dist-index-d-ts-sessionstatusresponse"></a>
#### SessionStatusResponse

```ts
export type SessionStatusResponse = SessionStatusResponses[keyof SessionStatusResponses];
```

<a id="sdk-dist-index-d-ts-sessiondeletedata"></a>
#### SessionDeleteData

```ts
export type SessionDeleteData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessiondeleteerrors"></a>
#### SessionDeleteErrors

```ts
export type SessionDeleteErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessiondeleteerror"></a>
#### SessionDeleteError

```ts
export type SessionDeleteError = SessionDeleteErrors[keyof SessionDeleteErrors];
```

<a id="sdk-dist-index-d-ts-sessiondeleteresponses"></a>
#### SessionDeleteResponses

```ts
export type SessionDeleteResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-sessiondeleteresponse"></a>
#### SessionDeleteResponse

```ts
export type SessionDeleteResponse = SessionDeleteResponses[keyof SessionDeleteResponses];
```

<a id="sdk-dist-index-d-ts-sessiongetdata"></a>
#### SessionGetData

```ts
export type SessionGetData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessiongeterrors"></a>
#### SessionGetErrors

```ts
export type SessionGetErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessiongeterror"></a>
#### SessionGetError

```ts
export type SessionGetError = SessionGetErrors[keyof SessionGetErrors];
```

<a id="sdk-dist-index-d-ts-sessiongetresponses"></a>
#### SessionGetResponses

```ts
export type SessionGetResponses = {
    : Session;
};
```

<a id="sdk-dist-index-d-ts-sessiongetresponse"></a>
#### SessionGetResponse

```ts
export type SessionGetResponse = SessionGetResponses[keyof SessionGetResponses];
```

<a id="sdk-dist-index-d-ts-sessionupdatedata"></a>
#### SessionUpdateData

```ts
export type SessionUpdateData = {
    body?: {
        title?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionupdateerrors"></a>
#### SessionUpdateErrors

```ts
export type SessionUpdateErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionupdateerror"></a>
#### SessionUpdateError

```ts
export type SessionUpdateError = SessionUpdateErrors[keyof SessionUpdateErrors];
```

<a id="sdk-dist-index-d-ts-sessionupdateresponses"></a>
#### SessionUpdateResponses

```ts
export type SessionUpdateResponses = {
    : Session;
};
```

<a id="sdk-dist-index-d-ts-sessionupdateresponse"></a>
#### SessionUpdateResponse

```ts
export type SessionUpdateResponse = SessionUpdateResponses[keyof SessionUpdateResponses];
```

<a id="sdk-dist-index-d-ts-sessionchildrendata"></a>
#### SessionChildrenData

```ts
export type SessionChildrenData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionchildrenerrors"></a>
#### SessionChildrenErrors

```ts
export type SessionChildrenErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionchildrenerror"></a>
#### SessionChildrenError

```ts
export type SessionChildrenError = SessionChildrenErrors[keyof SessionChildrenErrors];
```

<a id="sdk-dist-index-d-ts-sessionchildrenresponses"></a>
#### SessionChildrenResponses

```ts
export type SessionChildrenResponses = {
    : Array<Session>;
};
```

<a id="sdk-dist-index-d-ts-sessionchildrenresponse"></a>
#### SessionChildrenResponse

```ts
export type SessionChildrenResponse = SessionChildrenResponses[keyof SessionChildrenResponses];
```

<a id="sdk-dist-index-d-ts-sessiontododata"></a>
#### SessionTodoData

```ts
export type SessionTodoData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessiontodoerrors"></a>
#### SessionTodoErrors

```ts
export type SessionTodoErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessiontodoerror"></a>
#### SessionTodoError

```ts
export type SessionTodoError = SessionTodoErrors[keyof SessionTodoErrors];
```

<a id="sdk-dist-index-d-ts-sessiontodoresponses"></a>
#### SessionTodoResponses

```ts
export type SessionTodoResponses = {
    : Array<Todo>;
};
```

<a id="sdk-dist-index-d-ts-sessiontodoresponse"></a>
#### SessionTodoResponse

```ts
export type SessionTodoResponse = SessionTodoResponses[keyof SessionTodoResponses];
```

<a id="sdk-dist-index-d-ts-sessioninitdata"></a>
#### SessionInitData

```ts
export type SessionInitData = {
    body?: {
        modelID: string;
        providerID: string;
        messageID: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessioniniterrors"></a>
#### SessionInitErrors

```ts
export type SessionInitErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessioniniterror"></a>
#### SessionInitError

```ts
export type SessionInitError = SessionInitErrors[keyof SessionInitErrors];
```

<a id="sdk-dist-index-d-ts-sessioninitresponses"></a>
#### SessionInitResponses

```ts
export type SessionInitResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-sessioninitresponse"></a>
#### SessionInitResponse

```ts
export type SessionInitResponse = SessionInitResponses[keyof SessionInitResponses];
```

<a id="sdk-dist-index-d-ts-sessionforkdata"></a>
#### SessionForkData

```ts
export type SessionForkData = {
    body?: {
        messageID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionforkresponses"></a>
#### SessionForkResponses

```ts
export type SessionForkResponses = {
    : Session;
};
```

<a id="sdk-dist-index-d-ts-sessionforkresponse"></a>
#### SessionForkResponse

```ts
export type SessionForkResponse = SessionForkResponses[keyof SessionForkResponses];
```

<a id="sdk-dist-index-d-ts-sessionabortdata"></a>
#### SessionAbortData

```ts
export type SessionAbortData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionaborterrors"></a>
#### SessionAbortErrors

```ts
export type SessionAbortErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionaborterror"></a>
#### SessionAbortError

```ts
export type SessionAbortError = SessionAbortErrors[keyof SessionAbortErrors];
```

<a id="sdk-dist-index-d-ts-sessionabortresponses"></a>
#### SessionAbortResponses

```ts
export type SessionAbortResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-sessionabortresponse"></a>
#### SessionAbortResponse

```ts
export type SessionAbortResponse = SessionAbortResponses[keyof SessionAbortResponses];
```

<a id="sdk-dist-index-d-ts-sessionunsharedata"></a>
#### SessionUnshareData

```ts
export type SessionUnshareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionunshareerrors"></a>
#### SessionUnshareErrors

```ts
export type SessionUnshareErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionunshareerror"></a>
#### SessionUnshareError

```ts
export type SessionUnshareError = SessionUnshareErrors[keyof SessionUnshareErrors];
```

<a id="sdk-dist-index-d-ts-sessionunshareresponses"></a>
#### SessionUnshareResponses

```ts
export type SessionUnshareResponses = {
    : Session;
};
```

<a id="sdk-dist-index-d-ts-sessionunshareresponse"></a>
#### SessionUnshareResponse

```ts
export type SessionUnshareResponse = SessionUnshareResponses[keyof SessionUnshareResponses];
```

<a id="sdk-dist-index-d-ts-sessionsharedata"></a>
#### SessionShareData

```ts
export type SessionShareData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionshareerrors"></a>
#### SessionShareErrors

```ts
export type SessionShareErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionshareerror"></a>
#### SessionShareError

```ts
export type SessionShareError = SessionShareErrors[keyof SessionShareErrors];
```

<a id="sdk-dist-index-d-ts-sessionshareresponses"></a>
#### SessionShareResponses

```ts
export type SessionShareResponses = {
    : Session;
};
```

<a id="sdk-dist-index-d-ts-sessionshareresponse"></a>
#### SessionShareResponse

```ts
export type SessionShareResponse = SessionShareResponses[keyof SessionShareResponses];
```

<a id="sdk-dist-index-d-ts-sessiondiffdata"></a>
#### SessionDiffData

```ts
export type SessionDiffData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
        messageID?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessiondifferrors"></a>
#### SessionDiffErrors

```ts
export type SessionDiffErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessiondifferror"></a>
#### SessionDiffError

```ts
export type SessionDiffError = SessionDiffErrors[keyof SessionDiffErrors];
```

<a id="sdk-dist-index-d-ts-sessiondiffresponses"></a>
#### SessionDiffResponses

```ts
export type SessionDiffResponses = {
    : Array<FileDiff>;
};
```

<a id="sdk-dist-index-d-ts-sessiondiffresponse"></a>
#### SessionDiffResponse

```ts
export type SessionDiffResponse = SessionDiffResponses[keyof SessionDiffResponses];
```

<a id="sdk-dist-index-d-ts-sessionsummarizedata"></a>
#### SessionSummarizeData

```ts
export type SessionSummarizeData = {
    body?: {
        providerID: string;
        modelID: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionsummarizeerrors"></a>
#### SessionSummarizeErrors

```ts
export type SessionSummarizeErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionsummarizeerror"></a>
#### SessionSummarizeError

```ts
export type SessionSummarizeError = SessionSummarizeErrors[keyof SessionSummarizeErrors];
```

<a id="sdk-dist-index-d-ts-sessionsummarizeresponses"></a>
#### SessionSummarizeResponses

```ts
export type SessionSummarizeResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-sessionsummarizeresponse"></a>
#### SessionSummarizeResponse

```ts
export type SessionSummarizeResponse = SessionSummarizeResponses[keyof SessionSummarizeResponses];
```

<a id="sdk-dist-index-d-ts-sessionmessagesdata"></a>
#### SessionMessagesData

```ts
export type SessionMessagesData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
        limit?: number;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionmessageserrors"></a>
#### SessionMessagesErrors

```ts
export type SessionMessagesErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionmessageserror"></a>
#### SessionMessagesError

```ts
export type SessionMessagesError = SessionMessagesErrors[keyof SessionMessagesErrors];
```

<a id="sdk-dist-index-d-ts-sessionmessagesresponses"></a>
#### SessionMessagesResponses

```ts
export type SessionMessagesResponses = {
    : Array<{
        info: Message;
        parts: Array<Part>;
    }>;
};
```

<a id="sdk-dist-index-d-ts-sessionmessagesresponse"></a>
#### SessionMessagesResponse

```ts
export type SessionMessagesResponse = SessionMessagesResponses[keyof SessionMessagesResponses];
```

<a id="sdk-dist-index-d-ts-sessionpromptdata"></a>
#### SessionPromptData

```ts
export type SessionPromptData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionprompterrors"></a>
#### SessionPromptErrors

```ts
export type SessionPromptErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionprompterror"></a>
#### SessionPromptError

```ts
export type SessionPromptError = SessionPromptErrors[keyof SessionPromptErrors];
```

<a id="sdk-dist-index-d-ts-sessionpromptresponses"></a>
#### SessionPromptResponses

```ts
export type SessionPromptResponses = {
    : {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-index-d-ts-sessionpromptresponse"></a>
#### SessionPromptResponse

```ts
export type SessionPromptResponse = SessionPromptResponses[keyof SessionPromptResponses];
```

<a id="sdk-dist-index-d-ts-sessionmessagedata"></a>
#### SessionMessageData

```ts
export type SessionMessageData = {
    body?: never;
    path: {
        id: string;
        messageID: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionmessageerrors"></a>
#### SessionMessageErrors

```ts
export type SessionMessageErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionmessageerror"></a>
#### SessionMessageError

```ts
export type SessionMessageError = SessionMessageErrors[keyof SessionMessageErrors];
```

<a id="sdk-dist-index-d-ts-sessionmessageresponses"></a>
#### SessionMessageResponses

```ts
export type SessionMessageResponses = {
    : {
        info: Message;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-index-d-ts-sessionmessageresponse"></a>
#### SessionMessageResponse

```ts
export type SessionMessageResponse = SessionMessageResponses[keyof SessionMessageResponses];
```

<a id="sdk-dist-index-d-ts-sessionpromptasyncdata"></a>
#### SessionPromptAsyncData

```ts
export type SessionPromptAsyncData = {
    body?: {
        messageID?: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        agent?: string;
        noReply?: boolean;
        system?: string;
        tools?: {
            [key: string]: boolean;
        };
        parts: Array<TextPartInput | FilePartInput | AgentPartInput | SubtaskPartInput>;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionpromptasyncerrors"></a>
#### SessionPromptAsyncErrors

```ts
export type SessionPromptAsyncErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionpromptasyncerror"></a>
#### SessionPromptAsyncError

```ts
export type SessionPromptAsyncError = SessionPromptAsyncErrors[keyof SessionPromptAsyncErrors];
```

<a id="sdk-dist-index-d-ts-sessionpromptasyncresponses"></a>
#### SessionPromptAsyncResponses

```ts
export type SessionPromptAsyncResponses = {
    : void;
};
```

<a id="sdk-dist-index-d-ts-sessionpromptasyncresponse"></a>
#### SessionPromptAsyncResponse

```ts
export type SessionPromptAsyncResponse = SessionPromptAsyncResponses[keyof SessionPromptAsyncResponses];
```

<a id="sdk-dist-index-d-ts-sessioncommanddata"></a>
#### SessionCommandData

```ts
export type SessionCommandData = {
    body?: {
        messageID?: string;
        agent?: string;
        model?: string;
        arguments: string;
        command: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessioncommanderrors"></a>
#### SessionCommandErrors

```ts
export type SessionCommandErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessioncommanderror"></a>
#### SessionCommandError

```ts
export type SessionCommandError = SessionCommandErrors[keyof SessionCommandErrors];
```

<a id="sdk-dist-index-d-ts-sessioncommandresponses"></a>
#### SessionCommandResponses

```ts
export type SessionCommandResponses = {
    : {
        info: AssistantMessage;
        parts: Array<Part>;
    };
};
```

<a id="sdk-dist-index-d-ts-sessioncommandresponse"></a>
#### SessionCommandResponse

```ts
export type SessionCommandResponse = SessionCommandResponses[keyof SessionCommandResponses];
```

<a id="sdk-dist-index-d-ts-sessionshelldata"></a>
#### SessionShellData

```ts
export type SessionShellData = {
    body?: {
        agent: string;
        model?: {
            providerID: string;
            modelID: string;
        };
        command: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionshellerrors"></a>
#### SessionShellErrors

```ts
export type SessionShellErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionshellerror"></a>
#### SessionShellError

```ts
export type SessionShellError = SessionShellErrors[keyof SessionShellErrors];
```

<a id="sdk-dist-index-d-ts-sessionshellresponses"></a>
#### SessionShellResponses

```ts
export type SessionShellResponses = {
    : AssistantMessage;
};
```

<a id="sdk-dist-index-d-ts-sessionshellresponse"></a>
#### SessionShellResponse

```ts
export type SessionShellResponse = SessionShellResponses[keyof SessionShellResponses];
```

<a id="sdk-dist-index-d-ts-sessionrevertdata"></a>
#### SessionRevertData

```ts
export type SessionRevertData = {
    body?: {
        messageID: string;
        partID?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionreverterrors"></a>
#### SessionRevertErrors

```ts
export type SessionRevertErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionreverterror"></a>
#### SessionRevertError

```ts
export type SessionRevertError = SessionRevertErrors[keyof SessionRevertErrors];
```

<a id="sdk-dist-index-d-ts-sessionrevertresponses"></a>
#### SessionRevertResponses

```ts
export type SessionRevertResponses = {
    : Session;
};
```

<a id="sdk-dist-index-d-ts-sessionrevertresponse"></a>
#### SessionRevertResponse

```ts
export type SessionRevertResponse = SessionRevertResponses[keyof SessionRevertResponses];
```

<a id="sdk-dist-index-d-ts-sessionunrevertdata"></a>
#### SessionUnrevertData

```ts
export type SessionUnrevertData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-sessionunreverterrors"></a>
#### SessionUnrevertErrors

```ts
export type SessionUnrevertErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-sessionunreverterror"></a>
#### SessionUnrevertError

```ts
export type SessionUnrevertError = SessionUnrevertErrors[keyof SessionUnrevertErrors];
```

<a id="sdk-dist-index-d-ts-sessionunrevertresponses"></a>
#### SessionUnrevertResponses

```ts
export type SessionUnrevertResponses = {
    : Session;
};
```

<a id="sdk-dist-index-d-ts-sessionunrevertresponse"></a>
#### SessionUnrevertResponse

```ts
export type SessionUnrevertResponse = SessionUnrevertResponses[keyof SessionUnrevertResponses];
```

<a id="sdk-dist-index-d-ts-postsessionidpermissionspermissioniddata"></a>
#### PostSessionIdPermissionsPermissionIdData

```ts
export type PostSessionIdPermissionsPermissionIdData = {
    body?: {
        response:  |  | ;
    };
    path: {
        id: string;
        permissionID: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-postsessionidpermissionspermissioniderrors"></a>
#### PostSessionIdPermissionsPermissionIdErrors

```ts
export type PostSessionIdPermissionsPermissionIdErrors = {
    : BadRequestError;
    : NotFoundError;
};
```

<a id="sdk-dist-index-d-ts-postsessionidpermissionspermissioniderror"></a>
#### PostSessionIdPermissionsPermissionIdError

```ts
export type PostSessionIdPermissionsPermissionIdError = PostSessionIdPermissionsPermissionIdErrors[keyof PostSessionIdPermissionsPermissionIdErrors];
```

<a id="sdk-dist-index-d-ts-postsessionidpermissionspermissionidresponses"></a>
#### PostSessionIdPermissionsPermissionIdResponses

```ts
export type PostSessionIdPermissionsPermissionIdResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-postsessionidpermissionspermissionidresponse"></a>
#### PostSessionIdPermissionsPermissionIdResponse

```ts
export type PostSessionIdPermissionsPermissionIdResponse = PostSessionIdPermissionsPermissionIdResponses[keyof PostSessionIdPermissionsPermissionIdResponses];
```

<a id="sdk-dist-index-d-ts-commandlistdata"></a>
#### CommandListData

```ts
export type CommandListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-commandlistresponses"></a>
#### CommandListResponses

```ts
export type CommandListResponses = {
    : Array<Command>;
};
```

<a id="sdk-dist-index-d-ts-commandlistresponse"></a>
#### CommandListResponse

```ts
export type CommandListResponse = CommandListResponses[keyof CommandListResponses];
```

<a id="sdk-dist-index-d-ts-configprovidersdata"></a>
#### ConfigProvidersData

```ts
export type ConfigProvidersData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-configprovidersresponses"></a>
#### ConfigProvidersResponses

```ts
export type ConfigProvidersResponses = {
    : {
        providers: Array<Provider>;
        default: {
            [key: string]: string;
        };
    };
};
```

<a id="sdk-dist-index-d-ts-configprovidersresponse"></a>
#### ConfigProvidersResponse

```ts
export type ConfigProvidersResponse = ConfigProvidersResponses[keyof ConfigProvidersResponses];
```

<a id="sdk-dist-index-d-ts-providerlistdata"></a>
#### ProviderListData

```ts
export type ProviderListData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-providerlistresponses"></a>
#### ProviderListResponses

```ts
export type ProviderListResponses = {
    : {
        all: Array<Provider>;
        default: {
            [key: string]: string;
        };
        connected: Array<string>;
    };
};
```

<a id="sdk-dist-index-d-ts-providerlistresponse"></a>
#### ProviderListResponse

```ts
export type ProviderListResponse = ProviderListResponses[keyof ProviderListResponses];
```

<a id="sdk-dist-index-d-ts-providerauthdata"></a>
#### ProviderAuthData

```ts
export type ProviderAuthData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-providerauthresponses"></a>
#### ProviderAuthResponses

```ts
export type ProviderAuthResponses = {
    : {
        [key: string]: Array<ProviderAuthMethod>;
    };
};
```

<a id="sdk-dist-index-d-ts-providerauthresponse"></a>
#### ProviderAuthResponse

```ts
export type ProviderAuthResponse = ProviderAuthResponses[keyof ProviderAuthResponses];
```

<a id="sdk-dist-index-d-ts-provideroauthauthorizedata"></a>
#### ProviderOauthAuthorizeData

```ts
export type ProviderOauthAuthorizeData = {
    body?: {
        method: number;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-provideroauthauthorizeerrors"></a>
#### ProviderOauthAuthorizeErrors

```ts
export type ProviderOauthAuthorizeErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-provideroauthauthorizeerror"></a>
#### ProviderOauthAuthorizeError

```ts
export type ProviderOauthAuthorizeError = ProviderOauthAuthorizeErrors[keyof ProviderOauthAuthorizeErrors];
```

<a id="sdk-dist-index-d-ts-provideroauthauthorizeresponses"></a>
#### ProviderOauthAuthorizeResponses

```ts
export type ProviderOauthAuthorizeResponses = {
    : ProviderAuthAuthorization;
};
```

<a id="sdk-dist-index-d-ts-provideroauthauthorizeresponse"></a>
#### ProviderOauthAuthorizeResponse

```ts
export type ProviderOauthAuthorizeResponse = ProviderOauthAuthorizeResponses[keyof ProviderOauthAuthorizeResponses];
```

<a id="sdk-dist-index-d-ts-provideroauthcallbackdata"></a>
#### ProviderOauthCallbackData

```ts
export type ProviderOauthCallbackData = {
    body?: {
        method: number;
        code?: string;
    };
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-provideroauthcallbackerrors"></a>
#### ProviderOauthCallbackErrors

```ts
export type ProviderOauthCallbackErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-provideroauthcallbackerror"></a>
#### ProviderOauthCallbackError

```ts
export type ProviderOauthCallbackError = ProviderOauthCallbackErrors[keyof ProviderOauthCallbackErrors];
```

<a id="sdk-dist-index-d-ts-provideroauthcallbackresponses"></a>
#### ProviderOauthCallbackResponses

```ts
export type ProviderOauthCallbackResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-provideroauthcallbackresponse"></a>
#### ProviderOauthCallbackResponse

```ts
export type ProviderOauthCallbackResponse = ProviderOauthCallbackResponses[keyof ProviderOauthCallbackResponses];
```

<a id="sdk-dist-index-d-ts-findtextdata"></a>
#### FindTextData

```ts
export type FindTextData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        pattern: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-findtextresponses"></a>
#### FindTextResponses

```ts
export type FindTextResponses = {
    : Array<{
        path: {
            text: string;
        };
        lines: {
            text: string;
        };
        line_number: number;
        absolute_offset: number;
        submatches: Array<{
            match: {
                text: string;
            };
            start: number;
            end: number;
        }>;
    }>;
};
```

<a id="sdk-dist-index-d-ts-findtextresponse"></a>
#### FindTextResponse

```ts
export type FindTextResponse = FindTextResponses[keyof FindTextResponses];
```

<a id="sdk-dist-index-d-ts-findfilesdata"></a>
#### FindFilesData

```ts
export type FindFilesData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
        dirs?:  | ;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-findfilesresponses"></a>
#### FindFilesResponses

```ts
export type FindFilesResponses = {
    : Array<string>;
};
```

<a id="sdk-dist-index-d-ts-findfilesresponse"></a>
#### FindFilesResponse

```ts
export type FindFilesResponse = FindFilesResponses[keyof FindFilesResponses];
```

<a id="sdk-dist-index-d-ts-findsymbolsdata"></a>
#### FindSymbolsData

```ts
export type FindSymbolsData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        query: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-findsymbolsresponses"></a>
#### FindSymbolsResponses

```ts
export type FindSymbolsResponses = {
    : Array<Symbol>;
};
```

<a id="sdk-dist-index-d-ts-findsymbolsresponse"></a>
#### FindSymbolsResponse

```ts
export type FindSymbolsResponse = FindSymbolsResponses[keyof FindSymbolsResponses];
```

<a id="sdk-dist-index-d-ts-filelistdata"></a>
#### FileListData

```ts
export type FileListData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-filelistresponses"></a>
#### FileListResponses

```ts
export type FileListResponses = {
    : Array<FileNode>;
};
```

<a id="sdk-dist-index-d-ts-filelistresponse"></a>
#### FileListResponse

```ts
export type FileListResponse = FileListResponses[keyof FileListResponses];
```

<a id="sdk-dist-index-d-ts-filereaddata"></a>
#### FileReadData

```ts
export type FileReadData = {
    body?: never;
    path?: never;
    query: {
        directory?: string;
        path: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-filereadresponses"></a>
#### FileReadResponses

```ts
export type FileReadResponses = {
    : FileContent;
};
```

<a id="sdk-dist-index-d-ts-filereadresponse"></a>
#### FileReadResponse

```ts
export type FileReadResponse = FileReadResponses[keyof FileReadResponses];
```

<a id="sdk-dist-index-d-ts-filestatusdata"></a>
#### FileStatusData

```ts
export type FileStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-filestatusresponses"></a>
#### FileStatusResponses

```ts
export type FileStatusResponses = {
    : Array<File>;
};
```

<a id="sdk-dist-index-d-ts-filestatusresponse"></a>
#### FileStatusResponse

```ts
export type FileStatusResponse = FileStatusResponses[keyof FileStatusResponses];
```

<a id="sdk-dist-index-d-ts-applogdata"></a>
#### AppLogData

```ts
export type AppLogData = {
    body?: {
        service: string;
        level:  |  |  | ;
        message: string;
        extra?: {
            [key: string]: unknown;
        };
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-applogerrors"></a>
#### AppLogErrors

```ts
export type AppLogErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-applogerror"></a>
#### AppLogError

```ts
export type AppLogError = AppLogErrors[keyof AppLogErrors];
```

<a id="sdk-dist-index-d-ts-applogresponses"></a>
#### AppLogResponses

```ts
export type AppLogResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-applogresponse"></a>
#### AppLogResponse

```ts
export type AppLogResponse = AppLogResponses[keyof AppLogResponses];
```

<a id="sdk-dist-index-d-ts-appagentsdata"></a>
#### AppAgentsData

```ts
export type AppAgentsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-appagentsresponses"></a>
#### AppAgentsResponses

```ts
export type AppAgentsResponses = {
    : Array<Agent>;
};
```

<a id="sdk-dist-index-d-ts-appagentsresponse"></a>
#### AppAgentsResponse

```ts
export type AppAgentsResponse = AppAgentsResponses[keyof AppAgentsResponses];
```

<a id="sdk-dist-index-d-ts-mcpstatusdata"></a>
#### McpStatusData

```ts
export type McpStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-mcpstatusresponses"></a>
#### McpStatusResponses

```ts
export type McpStatusResponses = {
    : {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-index-d-ts-mcpstatusresponse"></a>
#### McpStatusResponse

```ts
export type McpStatusResponse = McpStatusResponses[keyof McpStatusResponses];
```

<a id="sdk-dist-index-d-ts-mcpadddata"></a>
#### McpAddData

```ts
export type McpAddData = {
    body?: {
        name: string;
        config: McpLocalConfig | McpRemoteConfig;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-mcpadderrors"></a>
#### McpAddErrors

```ts
export type McpAddErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-mcpadderror"></a>
#### McpAddError

```ts
export type McpAddError = McpAddErrors[keyof McpAddErrors];
```

<a id="sdk-dist-index-d-ts-mcpaddresponses"></a>
#### McpAddResponses

```ts
export type McpAddResponses = {
    : {
        [key: string]: McpStatus;
    };
};
```

<a id="sdk-dist-index-d-ts-mcpaddresponse"></a>
#### McpAddResponse

```ts
export type McpAddResponse = McpAddResponses[keyof McpAddResponses];
```

<a id="sdk-dist-index-d-ts-lspstatusdata"></a>
#### LspStatusData

```ts
export type LspStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-lspstatusresponses"></a>
#### LspStatusResponses

```ts
export type LspStatusResponses = {
    : Array<LspStatus>;
};
```

<a id="sdk-dist-index-d-ts-lspstatusresponse"></a>
#### LspStatusResponse

```ts
export type LspStatusResponse = LspStatusResponses[keyof LspStatusResponses];
```

<a id="sdk-dist-index-d-ts-formatterstatusdata"></a>
#### FormatterStatusData

```ts
export type FormatterStatusData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-formatterstatusresponses"></a>
#### FormatterStatusResponses

```ts
export type FormatterStatusResponses = {
    : Array<FormatterStatus>;
};
```

<a id="sdk-dist-index-d-ts-formatterstatusresponse"></a>
#### FormatterStatusResponse

```ts
export type FormatterStatusResponse = FormatterStatusResponses[keyof FormatterStatusResponses];
```

<a id="sdk-dist-index-d-ts-tuiappendpromptdata"></a>
#### TuiAppendPromptData

```ts
export type TuiAppendPromptData = {
    body?: {
        text: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuiappendprompterrors"></a>
#### TuiAppendPromptErrors

```ts
export type TuiAppendPromptErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-tuiappendprompterror"></a>
#### TuiAppendPromptError

```ts
export type TuiAppendPromptError = TuiAppendPromptErrors[keyof TuiAppendPromptErrors];
```

<a id="sdk-dist-index-d-ts-tuiappendpromptresponses"></a>
#### TuiAppendPromptResponses

```ts
export type TuiAppendPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuiappendpromptresponse"></a>
#### TuiAppendPromptResponse

```ts
export type TuiAppendPromptResponse = TuiAppendPromptResponses[keyof TuiAppendPromptResponses];
```

<a id="sdk-dist-index-d-ts-tuiopenhelpdata"></a>
#### TuiOpenHelpData

```ts
export type TuiOpenHelpData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuiopenhelpresponses"></a>
#### TuiOpenHelpResponses

```ts
export type TuiOpenHelpResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuiopenhelpresponse"></a>
#### TuiOpenHelpResponse

```ts
export type TuiOpenHelpResponse = TuiOpenHelpResponses[keyof TuiOpenHelpResponses];
```

<a id="sdk-dist-index-d-ts-tuiopensessionsdata"></a>
#### TuiOpenSessionsData

```ts
export type TuiOpenSessionsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuiopensessionsresponses"></a>
#### TuiOpenSessionsResponses

```ts
export type TuiOpenSessionsResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuiopensessionsresponse"></a>
#### TuiOpenSessionsResponse

```ts
export type TuiOpenSessionsResponse = TuiOpenSessionsResponses[keyof TuiOpenSessionsResponses];
```

<a id="sdk-dist-index-d-ts-tuiopenthemesdata"></a>
#### TuiOpenThemesData

```ts
export type TuiOpenThemesData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuiopenthemesresponses"></a>
#### TuiOpenThemesResponses

```ts
export type TuiOpenThemesResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuiopenthemesresponse"></a>
#### TuiOpenThemesResponse

```ts
export type TuiOpenThemesResponse = TuiOpenThemesResponses[keyof TuiOpenThemesResponses];
```

<a id="sdk-dist-index-d-ts-tuiopenmodelsdata"></a>
#### TuiOpenModelsData

```ts
export type TuiOpenModelsData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuiopenmodelsresponses"></a>
#### TuiOpenModelsResponses

```ts
export type TuiOpenModelsResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuiopenmodelsresponse"></a>
#### TuiOpenModelsResponse

```ts
export type TuiOpenModelsResponse = TuiOpenModelsResponses[keyof TuiOpenModelsResponses];
```

<a id="sdk-dist-index-d-ts-tuisubmitpromptdata"></a>
#### TuiSubmitPromptData

```ts
export type TuiSubmitPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuisubmitpromptresponses"></a>
#### TuiSubmitPromptResponses

```ts
export type TuiSubmitPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuisubmitpromptresponse"></a>
#### TuiSubmitPromptResponse

```ts
export type TuiSubmitPromptResponse = TuiSubmitPromptResponses[keyof TuiSubmitPromptResponses];
```

<a id="sdk-dist-index-d-ts-tuiclearpromptdata"></a>
#### TuiClearPromptData

```ts
export type TuiClearPromptData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuiclearpromptresponses"></a>
#### TuiClearPromptResponses

```ts
export type TuiClearPromptResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuiclearpromptresponse"></a>
#### TuiClearPromptResponse

```ts
export type TuiClearPromptResponse = TuiClearPromptResponses[keyof TuiClearPromptResponses];
```

<a id="sdk-dist-index-d-ts-tuiexecutecommanddata"></a>
#### TuiExecuteCommandData

```ts
export type TuiExecuteCommandData = {
    body?: {
        command: string;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuiexecutecommanderrors"></a>
#### TuiExecuteCommandErrors

```ts
export type TuiExecuteCommandErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-tuiexecutecommanderror"></a>
#### TuiExecuteCommandError

```ts
export type TuiExecuteCommandError = TuiExecuteCommandErrors[keyof TuiExecuteCommandErrors];
```

<a id="sdk-dist-index-d-ts-tuiexecutecommandresponses"></a>
#### TuiExecuteCommandResponses

```ts
export type TuiExecuteCommandResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuiexecutecommandresponse"></a>
#### TuiExecuteCommandResponse

```ts
export type TuiExecuteCommandResponse = TuiExecuteCommandResponses[keyof TuiExecuteCommandResponses];
```

<a id="sdk-dist-index-d-ts-tuishowtoastdata"></a>
#### TuiShowToastData

```ts
export type TuiShowToastData = {
    body?: {
        title?: string;
        message: string;
        variant:  |  |  | ;
        duration?: number;
    };
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuishowtoastresponses"></a>
#### TuiShowToastResponses

```ts
export type TuiShowToastResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuishowtoastresponse"></a>
#### TuiShowToastResponse

```ts
export type TuiShowToastResponse = TuiShowToastResponses[keyof TuiShowToastResponses];
```

<a id="sdk-dist-index-d-ts-tuipublishdata"></a>
#### TuiPublishData

```ts
export type TuiPublishData = {
    body?: EventTuiPromptAppend | EventTuiCommandExecute | EventTuiToastShow;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuipublisherrors"></a>
#### TuiPublishErrors

```ts
export type TuiPublishErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-tuipublisherror"></a>
#### TuiPublishError

```ts
export type TuiPublishError = TuiPublishErrors[keyof TuiPublishErrors];
```

<a id="sdk-dist-index-d-ts-tuipublishresponses"></a>
#### TuiPublishResponses

```ts
export type TuiPublishResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuipublishresponse"></a>
#### TuiPublishResponse

```ts
export type TuiPublishResponse = TuiPublishResponses[keyof TuiPublishResponses];
```

<a id="sdk-dist-index-d-ts-tuicontrolnextdata"></a>
#### TuiControlNextData

```ts
export type TuiControlNextData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuicontrolnextresponses"></a>
#### TuiControlNextResponses

```ts
export type TuiControlNextResponses = {
    : {
        path: string;
        body: unknown;
    };
};
```

<a id="sdk-dist-index-d-ts-tuicontrolnextresponse"></a>
#### TuiControlNextResponse

```ts
export type TuiControlNextResponse = TuiControlNextResponses[keyof TuiControlNextResponses];
```

<a id="sdk-dist-index-d-ts-tuicontrolresponsedata"></a>
#### TuiControlResponseData

```ts
export type TuiControlResponseData = {
    body?: unknown;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-tuicontrolresponseresponses"></a>
#### TuiControlResponseResponses

```ts
export type TuiControlResponseResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-tuicontrolresponseresponse"></a>
#### TuiControlResponseResponse

```ts
export type TuiControlResponseResponse = TuiControlResponseResponses[keyof TuiControlResponseResponses];
```

<a id="sdk-dist-index-d-ts-authsetdata"></a>
#### AuthSetData

```ts
export type AuthSetData = {
    body?: Auth;
    path: {
        id: string;
    };
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-authseterrors"></a>
#### AuthSetErrors

```ts
export type AuthSetErrors = {
    : BadRequestError;
};
```

<a id="sdk-dist-index-d-ts-authseterror"></a>
#### AuthSetError

```ts
export type AuthSetError = AuthSetErrors[keyof AuthSetErrors];
```

<a id="sdk-dist-index-d-ts-authsetresponses"></a>
#### AuthSetResponses

```ts
export type AuthSetResponses = {
    : boolean;
};
```

<a id="sdk-dist-index-d-ts-authsetresponse"></a>
#### AuthSetResponse

```ts
export type AuthSetResponse = AuthSetResponses[keyof AuthSetResponses];
```

<a id="sdk-dist-index-d-ts-eventsubscribedata"></a>
#### EventSubscribeData

```ts
export type EventSubscribeData = {
    body?: never;
    path?: never;
    query?: {
        directory?: string;
    };
    url: ;
};
```

<a id="sdk-dist-index-d-ts-eventsubscriberesponses"></a>
#### EventSubscribeResponses

```ts
export type EventSubscribeResponses = {
    : Event;
};
```

<a id="sdk-dist-index-d-ts-eventsubscriberesponse"></a>
#### EventSubscribeResponse

```ts
export type EventSubscribeResponse = EventSubscribeResponses[keyof EventSubscribeResponses];
```

<a id="sdk-dist-index-d-ts-clientoptions"></a>
#### ClientOptions

```ts
export type ClientOptions = {
    baseUrl: stringstring | (string & {});
};
```

<a id="sdk-dist-index-d-ts-serveroptions"></a>
#### ServerOptions

```ts
export type ServerOptions = {
    hostname?: string;
    port?: number;
    signal?: AbortSignal;
    timeout?: number;
    config?: Config;
};
```

<a id="sdk-dist-index-d-ts-tuioptions"></a>
#### TuiOptions

```ts
export type TuiOptions = {
    project?: string;
    model?: string;
    session?: string;
    agent?: string;
    signal?: AbortSignal;
    config?: Config;
};
```

