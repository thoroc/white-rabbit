# API index for plugin

## dist/tool.d.ts

### functions

<a id="plugin-dist-tool-d-ts-tool"></a>

#### tool

```ts
export declare function tool<Args extends z.ZodRawShape>(input: {
    description: string;
    args: Args;
    execute(
        args: z.infer<z.ZodObject<Args>>,
        context: ToolContext
    ): Promise<string>;
}): {
    description: string;
    args: Args;
    execute(
        args: z.infer<z.ZodObject<Args>>,
        context: ToolContext
    ): Promise<string>;
};
```

### types

<a id="plugin-dist-tool-d-ts-toolcontext"></a>

#### ToolContext

```ts
export type ToolContext = {
    sessionID: string;
    messageID: string;
    agent: string;
    abort: AbortSignal;
};
```

<a id="plugin-dist-tool-d-ts-tooldefinition"></a>

#### ToolDefinition

```ts
export type ToolDefinition = ReturnType<typeof tool>;
```

## dist/shell.d.ts

### interfaces

<a id="plugin-dist-shell-d-ts-bunshell"></a>

#### BunShell

```ts
export interface BunShell {
    (
        strings: TemplateStringsArray,
        ...expressions: ShellExpression[]
    ): BunShellPromise;
    /**
     * Perform bash-like brace expansion on the given pattern.
     * @param pattern - Brace pattern to expand
     */
    braces(pattern: string): string[];
    /**
     * Escape strings for input into shell commands.
     */
    escape(input: string): string;
    /**
     * Change the default environment variables for shells created by this instance.
     */
    env(newEnv?: Record<string, string | undefined>): BunShell;
    /**
     * Default working directory to use for shells created by this instance.
     */
    cwd(newCwd?: string): BunShell;
    /**
     * Configure the shell to not throw an exception on non-zero exit codes.
     */
    nothrow(): BunShell;
    /**
     * Configure whether or not the shell should throw an exception on non-zero exit codes.
     */
    throws(shouldThrow: boolean): BunShell;
}
```

<a id="plugin-dist-shell-d-ts-bunshellpromise"></a>

#### BunShellPromise

```ts
export interface BunShellPromise extends Promise<BunShellOutput> {
    readonly stdin: WritableStream;
    /**
     * Change the current working directory of the shell.
     */
    cwd(newCwd: string): this;
    /**
     * Set environment variables for the shell.
     */
    env(newEnv: Record<string, string> | undefined): this;
    /**
     * By default, the shell will write to the current process's stdout and stderr, as well as buffering that output.
     * This configures the shell to only buffer the output.
     */
    quiet(): this;
    /**
     * Read from stdout as a string, line by line
     * Automatically calls quiet() to disable echoing to stdout.
     */
    lines(): AsyncIterable<string>;
    /**
     * Read from stdout as a string.
     * Automatically calls quiet() to disable echoing to stdout.
     */
    text(encoding?: BufferEncoding): Promise<string>;
    /**
     * Read from stdout as a JSON object
     * Automatically calls quiet()
     */
    json(): Promise<any>;
    /**
     * Read from stdout as an ArrayBuffer
     * Automatically calls quiet()
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Read from stdout as a Blob
     * Automatically calls quiet()
     */
    blob(): Promise<Blob>;
    /**
     * Configure the shell to not throw an exception on non-zero exit codes.
     */
    nothrow(): this;
    /**
     * Configure whether or not the shell should throw an exception on non-zero exit codes.
     */
    throws(shouldThrow: boolean): this;
}
```

<a id="plugin-dist-shell-d-ts-bunshelloutput"></a>

#### BunShellOutput

```ts
export interface BunShellOutput {
    readonly stdout: Buffer;
    readonly stderr: Buffer;
    readonly exitCode: number;
    /**
     * Read from stdout as a string
     */
    text(encoding?: BufferEncoding): string;
    /**
     * Read from stdout as a JSON object
     */
    json(): any;
    /**
     * Read from stdout as an ArrayBuffer
     */
    arrayBuffer(): ArrayBuffer;
    /**
     * Read from stdout as an Uint8Array
     */
    bytes(): Uint8Array;
    /**
     * Read from stdout as a Blob
     */
    blob(): Blob;
}
```

### types

<a id="plugin-dist-shell-d-ts-shellfunction"></a>

#### ShellFunction

```ts
export type ShellFunction = (input: Uint8Array) => Uint8Array;
```

<a id="plugin-dist-shell-d-ts-shellexpression"></a>

#### ShellExpression

```ts
export type ShellExpression =
    | {
          toString(): string;
      }
    | Array<ShellExpression>
    | string
    | {
          raw: string;
      }
    | ReadableStream;
```

<a id="plugin-dist-shell-d-ts-bunshellerror"></a>

#### BunShellError

```ts
export type BunShellError = Error & BunShellOutput;
```

## dist/index.d.ts

### functions

<a id="plugin-dist-index-d-ts-tool"></a>

#### tool

```ts
export declare function tool<Args extends z.ZodRawShape>(input: {
    description: string;
    args: Args;
    execute(
        args: z.infer<z.ZodObject<Args>>,
        context: ToolContext
    ): Promise<string>;
}): {
    description: string;
    args: Args;
    execute(
        args: z.infer<z.ZodObject<Args>>,
        context: ToolContext
    ): Promise<string>;
};
```

### interfaces

<a id="plugin-dist-index-d-ts-hooks"></a>

#### Hooks

```ts
export interface Hooks {
    event?: (input: { event: Event }) => Promise<void>;
    config?: (input: Config) => Promise<void>;
    tool?: {
        [key: string]: ToolDefinition;
    };
    auth?: AuthHook;
    /**
     * Called when a new message is received
     */
    'chat.message'?: (
        input: {
            sessionID: string;
            agent?: string;
            model?: {
                providerID: string;
                modelID: string;
            };
            messageID?: string;
        },
        output: {
            message: UserMessage;
            parts: Part[];
        }
    ) => Promise<void>;
    /**
     * Modify parameters sent to LLM
     */
    'chat.params'?: (
        input: {
            sessionID: string;
            agent: string;
            model: Model;
            provider: Provider;
            message: UserMessage;
        },
        output: {
            temperature: number;
            topP: number;
            options: Record<string, any>;
        }
    ) => Promise<void>;
    'permission.ask'?: (
        input: Permission,
        output: {
            status: 'ask' | 'deny' | 'allow';
        }
    ) => Promise<void>;
    'tool.execute.before'?: (
        input: {
            tool: string;
            sessionID: string;
            callID: string;
        },
        output: {
            args: any;
        }
    ) => Promise<void>;
    'tool.execute.after'?: (
        input: {
            tool: string;
            sessionID: string;
            callID: string;
        },
        output: {
            title: string;
            output: string;
            metadata: any;
        }
    ) => Promise<void>;
}
```

### types

<a id="plugin-dist-index-d-ts-plugininput"></a>

#### PluginInput

```ts
export type PluginInput = {
    client: ReturnType<typeof createOpencodeClient>;
    project: Project;
    directory: string;
    worktree: string;
    $: BunShell;
};
```

<a id="plugin-dist-index-d-ts-plugin"></a>

#### Plugin

```ts
export type Plugin = (input: PluginInput) => Promise<Hooks>;
```

<a id="plugin-dist-index-d-ts-authhook"></a>

#### AuthHook

```ts
export type AuthHook = {
    provider: string;
    loader?: (
        auth: () => Promise<Auth>,
        provider: Provider
    ) => Promise<Record<string, any>>;
    methods: (
        | {
              type: 'oauth';
              label: string;
              prompts?: Array<
                  | {
                        type: 'text';
                        key: string;
                        message: string;
                        placeholder?: string;
                        validate?: (value: string) => string | undefined;
                        condition?: (inputs: Record<string, string>) => boolean;
                    }
                  | {
                        type: 'select';
                        key: string;
                        message: string;
                        options: Array<{
                            label: string;
                            value: string;
                            hint?: string;
                        }>;
                        condition?: (inputs: Record<string, string>) => boolean;
                    }
              >;
              authorize(
                  inputs?: Record<string, string>
              ): Promise<AuthOuathResult>;
          }
        | {
              type: 'api';
              label: string;
              prompts?: Array<
                  | {
                        type: 'text';
                        key: string;
                        message: string;
                        placeholder?: string;
                        validate?: (value: string) => string | undefined;
                        condition?: (inputs: Record<string, string>) => boolean;
                    }
                  | {
                        type: 'select';
                        key: string;
                        message: string;
                        options: Array<{
                            label: string;
                            value: string;
                            hint?: string;
                        }>;
                        condition?: (inputs: Record<string, string>) => boolean;
                    }
              >;
              authorize?(inputs?: Record<string, string>): Promise<
                  | {
                        type: 'success';
                        key: string;
                        provider?: string;
                    }
                  | {
                        type: 'failed';
                    }
              >;
          }
    )[];
};
```

<a id="plugin-dist-index-d-ts-authouathresult"></a>

#### AuthOuathResult

```ts
export type AuthOuathResult = {
    url: string;
    instructions: string;
} & (
    | {
          method: 'auto';
          callback(): Promise<
              | ({
                    type: 'success';
                    provider?: string;
                } & (
                    | {
                          refresh: string;
                          access: string;
                          expires: number;
                      }
                    | {
                          key: string;
                      }
                ))
              | {
                    type: 'failed';
                }
          >;
      }
    | {
          method: 'code';
          callback(code: string): Promise<
              | ({
                    type: 'success';
                    provider?: string;
                } & (
                    | {
                          refresh: string;
                          access: string;
                          expires: number;
                      }
                    | {
                          key: string;
                      }
                ))
              | {
                    type: 'failed';
                }
          >;
      }
);
```

<a id="plugin-dist-index-d-ts-toolcontext"></a>

#### ToolContext

```ts
export type ToolContext = {
    sessionID: string;
    messageID: string;
    agent: string;
    abort: AbortSignal;
};
```

<a id="plugin-dist-index-d-ts-tooldefinition"></a>

#### ToolDefinition

```ts
export type ToolDefinition = ReturnType<typeof tool>;
```

## dist/example.d.ts

### variables

<a id="plugin-dist-example-d-ts-exampleplugin"></a>

#### ExamplePlugin

```ts
ExamplePlugin: Plugin;
```

## dist/index.js

### functions

<a id="plugin-dist-index-js-tool"></a>

#### tool

```ts
export declare function tool<Args extends z.ZodRawShape>(input: {
    description: string;
    args: Args;
    execute(
        args: z.infer<z.ZodObject<Args>>,
        context: ToolContext
    ): Promise<string>;
}): {
    description: string;
    args: Args;
    execute(
        args: z.infer<z.ZodObject<Args>>,
        context: ToolContext
    ): Promise<string>;
};
```

### types

<a id="plugin-dist-index-js-toolcontext"></a>

#### ToolContext

```ts
export type ToolContext = {
    sessionID: string;
    messageID: string;
    agent: string;
    abort: AbortSignal;
};
```

<a id="plugin-dist-index-js-tooldefinition"></a>

#### ToolDefinition

```ts
export type ToolDefinition = ReturnType<typeof tool>;
```

## dist/tool.js

### functions

<a id="plugin-dist-tool-js-tool"></a>

#### tool

```ts
export function tool(input) {
    return input;
}
```

## dist/example.js

### variables

<a id="plugin-dist-example-js-exampleplugin"></a>

#### ExamplePlugin

```ts
ExamplePlugin = async (ctx) => {
    return {
        tool: {
            mytool: tool({
                description: 'This is a custom tool',
                args: {
                    foo: tool.schema.string().describe('foo'),
                },
                async execute(args) {
                    return `Hello ${args.foo}!`;
                },
            }),
        },
    };
};
```
