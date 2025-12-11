declare module 'mustache' {
    const mustache: {
        render(template: string, view?: unknown): string;
    };
    export default mustache;
}
