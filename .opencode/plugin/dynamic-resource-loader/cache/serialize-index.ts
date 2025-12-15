import type { ResourceIndex, SerializedIndex } from '../types';

/**
 * Serialize resource index for storage
 */
export const serializeIndex = (index: ResourceIndex): SerializedIndex => {
    return {
        version: index.version,
        generatedAt: index.generatedAt,
        projectRoot: index.projectRoot,
        resources: Array.from(index.resources.entries()),
        byType: Array.from(index.byType.entries()).map(([k, v]) => [
            k,
            Array.from(v),
        ]),
        byDomain: Array.from(index.byDomain.entries()).map(([k, v]) => [
            k,
            Array.from(v),
        ]),
        byTag: Array.from(index.byTag.entries()).map(([k, v]) => [
            k,
            Array.from(v),
        ]),
        byReference: Array.from(index.byReference.entries()).map(([k, v]) => [
            k,
            Array.from(v),
        ]),
        graph: {
            forward: Array.from(index.graph.forward.entries()).map(([k, v]) => [
                k,
                Array.from(v),
            ]),
            backward: Array.from(index.graph.backward.entries()).map(
                ([k, v]) => [k, Array.from(v)]
            ),
            agents: Array.from(index.graph.agents.entries()).map(([k, v]) => [
                k,
                Array.from(v),
            ]),
            commands: Array.from(index.graph.commands.entries()).map(
                ([k, v]) => [k, Array.from(v)]
            ),
        },
    };
};
