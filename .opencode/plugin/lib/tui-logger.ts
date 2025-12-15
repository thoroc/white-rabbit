/**
 * TUILogger - Utility for logging to OpenCode TUI
 *
 * Provides methods to send log messages to the OpenCode TUI interface
 * instead of using console.log. Falls back to console if TUI communication fails.
 */

import type { PluginInput } from '@opencode-ai/plugin';

export interface TUILoggerConfig {
    /** Prefix to add to all log messages */
    prefix?: string;
    /** Whether to fallback to console on TUI errors */
    fallbackToConsole?: boolean;
    /** Whether to show toasts for error messages */
    showErrorToasts?: boolean;
}

export class TUILogger {
    private client: PluginInput['client'];
    private config: Required<TUILoggerConfig>;

    constructor(client: PluginInput['client'], config: TUILoggerConfig = {}) {
        this.client = client;
        this.config = {
            prefix: config.prefix ?? 'Plugin',
            fallbackToConsole: config.fallbackToConsole ?? true,
            showErrorToasts: config.showErrorToasts ?? true,
        };
    }

    /**
     * Send message to TUI with optional data
     */
    private async sendToTUI(
        message: string,
        data?: unknown,
        consoleFallback?: (msg: string, d?: unknown) => void
    ): Promise<void> {
        try {
            await this.client.session.prompt({
                path: { id: 'current' },
                body: {
                    parts: [
                        {
                            type: 'text',
                            text: message,
                        },
                    ],
                },
            });

            // If data is provided, send it as well
            if (data !== undefined) {
                await this.client.session.prompt({
                    path: { id: 'current' },
                    body: {
                        parts: [
                            {
                                type: 'text',
                                text: `  ${JSON.stringify(data, null, 2)}`,
                            },
                        ],
                    },
                });
            }
        } catch (error) {
            if (this.config.fallbackToConsole && consoleFallback) {
                consoleFallback(message, data);
            }
        }
    }

    /**
     * Log an informational message to the TUI
     */
    async log(message: string, data?: unknown): Promise<void> {
        const formattedMessage = this.formatMessage(message);
        await this.sendToTUI(formattedMessage, data, console.log);
    }

    /**
     * Log a warning message to the TUI
     */
    async warn(message: string, data?: unknown): Promise<void> {
        const formattedMessage = this.formatMessage(`⚠️  ${message}`);
        await this.sendToTUI(formattedMessage, data, console.warn);
    }

    /**
     * Log an error message to the TUI
     */
    async error(message: string, error?: unknown): Promise<void> {
        const errorMsg = error
            ? `${message}: ${error instanceof Error ? error.message : String(error)}`
            : message;
        const formattedMessage = this.formatMessage(`❌ ${errorMsg}`);

        try {
            await this.sendToTUI(formattedMessage, undefined, console.error);

            // Show toast notification for critical errors
            if (this.config.showErrorToasts) {
                await this.client.tui.showToast({
                    body: {
                        title: `${this.config.prefix} Error`,
                        message: message,
                        variant: 'error',
                        duration: 5000,
                    },
                });
            }
        } catch (tuiError) {
            if (this.config.fallbackToConsole) {
                console.error(formattedMessage);
            }
        }
    }

    /**
     * Format message with prefix
     */
    private formatMessage(message: string): string {
        return `[${this.config.prefix}] ${message}`;
    }
}

/**
 * Factory function to create a TUILogger instance
 */
export function createTUILogger(
    client: PluginInput['client'],
    config?: TUILoggerConfig
): TUILogger {
    return new TUILogger(client, config);
}
