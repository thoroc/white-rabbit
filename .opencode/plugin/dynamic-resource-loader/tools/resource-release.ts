/**
 * Resource Release Tool
 *
 * Mark loaded resources as no longer needed for pruning.
 */

import type {
    ToolContext,
    ToolExecuteContext,
    ResourceReleaseArgs,
} from './types';
import { releaseResources } from '../session';

export const createResourceReleaseTool = (context: ToolContext) => ({
    description:
        'Mark loaded resources as no longer needed, allowing them to be pruned from context. If no IDs specified, releases all resources. Use "keep" to specify resources to retain.',
    args: {
        ids: {
            type: 'array',
            items: { type: 'string' },
            optional: true,
            description: 'Resource IDs to release (empty = release all)',
        },

        keep: {
            type: 'array',
            items: { type: 'string' },
            optional: true,
            description:
                'Resource IDs to keep (used with empty ids to release all except these)',
        },
    },

    execute: async (args: ResourceReleaseArgs, ctxt: ToolExecuteContext) => {
        try {
            const sessionState = context.state.sessions.get(ctxt.sessionID);

            if (!sessionState || sessionState.loaded.size === 0) {
                return JSON.stringify(
                    {
                        message: 'No resources to release',
                        released: [],
                    },
                    null,
                    2
                );
            }

            // Determine which resources to release
            let toRelease: string[] = [];

            if (!args.ids || args.ids.length === 0) {
                // Release all (except "keep" list)
                toRelease = Array.from(sessionState.loaded.keys());
                if (args.keep && args.keep.length > 0) {
                    toRelease = toRelease.filter(
                        (id) => !args.keep!.includes(id)
                    );
                }
            } else {
                // Release specified IDs
                toRelease = args.ids;
            }

            const { released, notFound } = releaseResources(
                sessionState,
                toRelease
            );

            // Update stats
            context.state.stats.totalReleases += released.length;

            return JSON.stringify(
                {
                    message: `Released ${released.length} resource(s)`,
                    released,
                    notFound: notFound.length > 0 ? notFound : undefined,
                    remaining: sessionState.loaded.size,
                    hint: 'Released resources will be pruned from context in the next message cycle',
                },
                null,
                2
            );
        } catch (error) {
            return JSON.stringify(
                {
                    error: 'ReleaseError',
                    message:
                        error instanceof Error ? error.message : String(error),
                },
                null,
                2
            );
        }
    },
});
