import { createLogger, Logger } from './logger';

// Note: Using mock types since actual @opencode-ai/plugin types may differ
// This demonstrates the communication patterns based on DCP plugin analysis
interface OpenCodeClient {
    tui: {
        showToast(options: {
            type: 'info' | 'warning' | 'error' | 'success';
            message: string;
            duration: number;
        }): Promise<void>;
    };
    session: {
        prompt(options: {
            role: 'user' | 'assistant';
            content: string;
            ignored?: boolean;
        }): Promise<void>;
    };
}

interface PluginConfig {
    debug: boolean;
    notifications: boolean;
    verbosity: 'off' | 'minimal' | 'detailed';
}

const DEFAULT_CONFIG: PluginConfig = {
    debug: false,
    notifications: true,
    verbosity: 'minimal',
};

export class TestCommunicationPlugin {
    private logger: Logger;
    private config: PluginConfig;

    constructor(config: Partial<PluginConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };

        // Initialize file-based logger
        this.logger = createLogger({
            logDir: '~/.config/opencode/logs/test-communication-plugin/',
            enabled: this.config.debug,
            contexts: ['operations', 'errors', 'notifications'],
        });
    }

    async initialize(client: OpenCodeClient): Promise<void> {
        this.logger.debug('operations', 'Plugin initializing', {
            config: this.config,
        });

        // Send session notification about initialization
        await this.sessionNotify(
            client,
            '🔌 Test Communication Plugin initialized',
            'detailed'
        );

        // Send toast for critical initialization
        if (this.config.notifications) {
            await this.toastNotify(client, {
                type: 'info',
                message: 'Test plugin ready',
                duration: 3000,
            });
        }

        this.logger.debug('operations', 'Plugin initialized successfully');
    }

    async demonstratePatterns(client: OpenCodeClient): Promise<void> {
        // Pattern 1: File-based logging
        this.logger.debug('operations', 'Starting pattern demonstration', {
            timestamp: Date.now(),
        });

        // Pattern 2: Session prompts with ignored flag
        await this.sessionNotify(
            client,
            '🔍 Demonstrating communication patterns...',
            'minimal'
        );

        try {
            // Simulate some work
            await this.simulateWork(client);

            // Success notification
            await this.sessionNotify(
                client,
                '✅ Demonstration complete: all patterns working',
                'detailed'
            );

            this.logger.debug(
                'operations',
                'Demonstration completed successfully'
            );
        } catch (error) {
            // Pattern 3: TUI toast for critical errors
            await this.toastNotify(client, {
                type: 'error',
                message: 'Demonstration failed',
                duration: 5000,
            });

            this.logger.debug('errors', 'Demonstration failed', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            });

            throw error;
        }
    }

    private async simulateWork(client: OpenCodeClient): Promise<void> {
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await this.sessionNotify(
            client,
            '⏳ Processing step 1 of 3...',
            'detailed'
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        await this.sessionNotify(
            client,
            '⏳ Processing step 2 of 3...',
            'detailed'
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        await this.sessionNotify(
            client,
            '⏳ Processing step 3 of 3...',
            'detailed'
        );
    }

    // Helper: Send session prompt with ignored flag
    private async sessionNotify(
        client: OpenCodeClient,
        message: string,
        level: 'minimal' | 'detailed'
    ): Promise<void> {
        // Respect user verbosity configuration
        if (this.config.verbosity === 'off') {
            return;
        }

        if (this.config.verbosity === 'minimal' && level === 'detailed') {
            return;
        }

        try {
            await client.session.prompt({
                role: 'user',
                content: message,
                ignored: true,
            });
        } catch (error) {
            // Defensive: silent failure with debug logging
            this.logger.debug('errors', 'Session notification failed', {
                message,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Helper: Send TUI toast notification
    private async toastNotify(
        client: OpenCodeClient,
        options: {
            type: 'info' | 'warning' | 'error' | 'success';
            message: string;
            duration: number;
        }
    ): Promise<void> {
        if (!this.config.notifications) {
            return;
        }

        try {
            await client.tui.showToast({
                type: options.type,
                message: options.message,
                duration: options.duration,
            });
        } catch (error) {
            // Defensive: silent failure with debug logging
            this.logger.debug('errors', 'Toast notification failed', {
                ...options,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }
}

// Export factory function
export function createPlugin(
    config?: Partial<PluginConfig>
): TestCommunicationPlugin {
    return new TestCommunicationPlugin(config);
}

export default createPlugin;
