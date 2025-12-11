/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    overrides: [
        {
            files: ['**/*.md', '**/*.mdx'],
            singleQuote: false,
            proseWrap: 'always',
        },
    ],
};

export default config;
