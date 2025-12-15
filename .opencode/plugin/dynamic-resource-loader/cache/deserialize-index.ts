import type { ResourceIndex, SerializedIndex } from '../types';

/**
 * Deserialize resource index from storage
 */
export const deserializeIndex = (
    serialized: SerializedIndex
): ResourceIndex => {
    return {
        version: serialized.version,
        generatedAt: serialized.generatedAt,
        projectRoot: serialized.projectRoot,
        resources: new Map(serialized.resources),
        byType: new Map(serialized.byType.map(([k, v]) => [k, new Set(v)])),
        byDomain: new Map(serialized.byDomain.map(([k, v]) => [k, new Set(v)])),
        byTag: new Map(serialized.byTag.map(([k, v]) => [k, new Set(v)])),
        byReference: new Map(
            serialized.byReference.map(([k, v]) => [k, new Set(v)])
        ),
        graph: {
            forward: new Map(
                serialized.graph.forward.map(([k, v]) => [k, new Set(v)])
            ),
            backward: new Map(
                serialized.graph.backward.map(([k, v]) => [k, new Set(v)])
            ),
            agents: new Map(
                serialized.graph.agents.map(([k, v]) => [k, new Set(v)])
            ),
            commands: new Map(
                serialized.graph.commands.map(([k, v]) => [k, new Set(v)])
            ),
        },
    };
};
