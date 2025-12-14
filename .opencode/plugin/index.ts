/**
 * Plugin Index - Dynamic Plugin Loader
 *
 * Automatically discovers and loads all plugins from .opencode/plugin/* directories.
 * Each plugin directory should contain an index.ts file that exports a Plugin.
 */

import type { Plugin, PluginInput, Hooks } from '@opencode-ai/plugin';
import { readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createTUILogger, type TUILogger } from './lib/tui-logger.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Discover plugin directories in the plugin folder
 */
const discoverPluginDirectories = (pluginDir: string): string[] => {
    const entries = readdirSync(pluginDir, { withFileTypes: true });

    return entries
        .filter(
            (entry) =>
                entry.isDirectory() &&
                !entry.name.startsWith('.') &&
                !entry.name.startsWith('_') &&
                entry.name !== 'node_modules'
        )
        .map((entry) => entry.name);
};

/**
 * Load a single plugin from a directory
 */
const loadPlugin = async (
    pluginDir: string,
    dirName: string,
    input: PluginInput,
    logger: TUILogger
): Promise<Awaited<ReturnType<Plugin>> | null> => {
    const pluginPath = join(pluginDir, dirName, 'index.ts');

    try {
        statSync(pluginPath);
        await logger.log(`Loading plugin: ${dirName}`);

        const pluginModule = await import(`./${dirName}/index.ts`);
        const pluginFactory: Plugin = pluginModule.default || pluginModule;

        if (typeof pluginFactory !== 'function') {
            await logger.warn(
                `Plugin '${dirName}' does not export a valid plugin factory`
            );
            return null;
        }

        const pluginInstance = await pluginFactory(input);
        await logger.log(`Successfully loaded: ${dirName}`);
        return pluginInstance;
    } catch (error) {
        if (
            error instanceof Error &&
            'code' in error &&
            error.code === 'ENOENT'
        ) {
            await logger.warn(`Skipping '${dirName}' - no index.ts found`);
        } else {
            await logger.error(`Error loading plugin '${dirName}'`, error);
        }
        return null;
    }
};

/**
 * Aggregate tools from all loaded plugins
 */
const aggregateTools = (
    plugins: Array<Awaited<ReturnType<Plugin>>>
): Hooks['tool'] => {
    const tools = {};
    for (const plugin of plugins) {
        if (plugin.tool) {
            Object.assign(tools, plugin.tool);
        }
    }
    return tools;
};

/**
 * Collect hooks of a specific type from all plugins
 */
const collectHooks = <K extends keyof Hooks>(
    plugins: Array<Awaited<ReturnType<Plugin>>>,
    hookName: K
): Array<NonNullable<Awaited<ReturnType<Plugin>>[K]>> => {
    const hooks: Array<NonNullable<Awaited<ReturnType<Plugin>>[K]>> = [];
    for (const plugin of plugins) {
        if (plugin[hookName]) {
            hooks.push(
                plugin[hookName] as NonNullable<Awaited<ReturnType<Plugin>>[K]>
            );
        }
    }
    return hooks;
};

/**
 * Execute hooks with error handling
 */
const executeHooks = async <T extends unknown[]>(
    hooks: Array<(...args: T) => Promise<void>>,
    hookName: string,
    logger: TUILogger,
    ...args: T
): Promise<void> => {
    for (const hook of hooks) {
        try {
            await hook(...args);
        } catch (error) {
            await logger.error(`Error in ${hookName} hook`, error);
        }
    }
};

/**
 * Dynamically discover and load all plugins from subdirectories
 */
export default (async (input: PluginInput) => {
    const logger = createTUILogger(input.client, { prefix: 'PluginLoader' });
    const pluginDir = __dirname;

    await logger.log(`Discovering plugins in: ${pluginDir}`);

    const pluginDirNames = discoverPluginDirectories(pluginDir);
    await logger.log(`Found ${pluginDirNames.length} potential plugin(s)`);

    const loadPromises = pluginDirNames.map((dirName) =>
        loadPlugin(pluginDir, dirName, input, logger)
    );
    const loadResults = await Promise.all(loadPromises);
    const loadedPlugins = loadResults.filter(
        (plugin): plugin is Awaited<ReturnType<Plugin>> => plugin !== null
    );

    await logger.log(`Successfully loaded ${loadedPlugins.length} plugin(s)`);

    const aggregatedTools = aggregateTools(loadedPlugins);
    const chatMessageHooks = collectHooks(loadedPlugins, 'chat.message');
    const toolExecuteBeforeHooks = collectHooks(
        loadedPlugins,
        'tool.execute.before'
    );
    const toolExecuteAfterHooks = collectHooks(
        loadedPlugins,
        'tool.execute.after'
    );
    const eventHooks = collectHooks(loadedPlugins, 'event');

    return {
        tool: aggregatedTools,

        'chat.message': async (input, output) => {
            await executeHooks(
                chatMessageHooks,
                'chat.message',
                logger,
                input,
                output
            );
        },

        'tool.execute.before': async (input, output) => {
            await executeHooks(
                toolExecuteBeforeHooks,
                'tool.execute.before',
                logger,
                input,
                output
            );
        },

        'tool.execute.after': async (input, output) => {
            await executeHooks(
                toolExecuteAfterHooks,
                'tool.execute.after',
                logger,
                input,
                output
            );
        },

        event: async (input) => {
            await executeHooks(eventHooks, 'event', logger, input);
        },
    };
}) satisfies Plugin;
