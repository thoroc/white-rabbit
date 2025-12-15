/**
 * Resource List Loaded Tool
 *
 * List all resources currently loaded in the session.
 */

import type { ToolContext } from './types';
import { formatBytes } from '../utils';
import { getSessionStats } from '../session';

export const createResourceListLoadedTool = (context: ToolContext) => ({
    description:
        'List all resources currently loaded in this session context, including their status and metadata',
    args: {},

    execute: async (_args: any, ctxt: any) => {
        try {
            const sessionState = context.state.sessions.get(ctxt.sessionID);

            if (!sessionState || sessionState.loaded.size === 0) {
                return JSON.stringify(
                    {
                        message: 'No resources loaded in this session',
                        loaded: [],
                        totalSize: '0 B',
                    },
                    null,
                    2
                );
            }

            const index = await context.ensureIndex();

            const loadedList = Array.from(sessionState.loaded.values()).map(
                (lr) => {
                    const metadata = index.resources.get(lr.id);
                    return {
                        id: lr.id,
                        type: lr.type,
                        name: metadata?.name || 'Unknown',
                        status: lr.status,
                        loadedAt: new Date(lr.loadedAt).toISOString(),
                        loadedInMessage: lr.loadedInMessage,
                        size: formatBytes(lr.size),
                        includeReferences: lr.includeReferences,
                        flaggedAt: lr.flaggedAt
                            ? new Date(lr.flaggedAt).toISOString()
                            : undefined,
                    };
                }
            );

            return JSON.stringify(
                {
                    ...getSessionStats(sessionState),
                    loaded: loadedList,
                    totalSize: formatBytes(sessionState.totalSize),
                },
                null,
                2
            );
        } catch (error) {
            return JSON.stringify(
                {
                    error: 'ListError',
                    message:
                        error instanceof Error ? error.message : String(error),
                },
                null,
                2
            );
        }
    },
});
