import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

interface LoggerConfig {
    logDir: string;
    enabled: boolean;
    contexts?: string[];
}

interface LogEntry {
    timestamp: string;
    context: string;
    message: string;
    data?: unknown;
}

export class Logger {
    private config: LoggerConfig;
    private logDir: string;

    constructor(config: LoggerConfig) {
        this.config = config;
        this.logDir = config.logDir.replace('~', homedir());
    }

    async debug(
        context: string,
        message: string,
        data?: unknown
    ): Promise<void> {
        if (!this.config.enabled) {
            return;
        }

        if (this.config.contexts && !this.config.contexts.includes(context)) {
            return;
        }

        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            context,
            message,
            data,
        };

        await this.writeLog(context, entry);
    }

    private async writeLog(context: string, entry: LogEntry): Promise<void> {
        try {
            // Ensure log directory exists
            if (!existsSync(this.logDir)) {
                await mkdir(this.logDir, { recursive: true });
            }

            // Daily rotation: YYYY-MM-DD-context.log
            const date = new Date().toISOString().split('T')[0];
            const filename = `${date}-${context}.log`;
            const filepath = join(this.logDir, filename);

            // Append log entry
            const line = JSON.stringify(entry) + '\n';
            await writeFile(filepath, line, { flag: 'a' });
        } catch (error) {
            // Silent failure for logging errors
            console.error('Logger write failed:', error);
        }
    }
}

export const createLogger = (config: LoggerConfig): Logger => {
    return new Logger(config);
};
