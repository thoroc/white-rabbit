/**
 * Resource Load Tool
 *
 * Load and return the full content of a resource by ID.
 */

import type { ToolContext } from './types';
import { getOrCreateSessionState } from '../session';
import {
    validateResourceExists,
    checkSessionLimits,
    loadResourceContent,
    formatResourceOutput,
} from './helpers';

export const createResourceLoadTool = (
    context: ToolContext,
    loadReferencesImpl: any,
    maxReferencesDepth: number
) => ({
    description:
        'Load and return the full content of a resource by ID. Resources remain loaded in the session until explicitly released or automatically pruned.',
    args: {
        id: {
            type: 'string',
            description: 'The unique ID of the resource to load',
        },

        includeReferences: {
            type: 'boolean',
            default: false,
            description: 'Whether to recursively load referenced resources',
        },
    },

    async execute(args: any, ctxt: any) {
        try {
            // Ensure index is built
            const index = await context.ensureIndex();

            // Validate resource exists
            const validationResult = validateResourceExists(index, args.id);
            if (typeof validationResult === 'string') {
                return validationResult;
            }
            const metadata = validationResult;

            // Check session limits
            const sessionState = getOrCreateSessionState(
                context.state.sessions,
                ctxt.sessionID
            );

            const limitError = checkSessionLimits(
                sessionState,
                args.id,
                context.state.config.maxResourcesPerSession
            );
            if (limitError) {
                return limitError;
            }

            // Load resource content and track in session
            const content = await loadResourceContent(
                metadata,
                args.id,
                sessionState,
                ctxt,
                args.includeReferences,
                context.state.stats
            );

            // Format and return output with optional references
            return await formatResourceOutput(
                metadata,
                content,
                args.includeReferences,
                ctxt,
                loadReferencesImpl,
                maxReferencesDepth
            );
        } catch (error) {
            return JSON.stringify(
                {
                    error: 'LoadError',
                    message:
                        error instanceof Error ? error.message : String(error),
                },
                null,
                2
            );
        }
    },
});
