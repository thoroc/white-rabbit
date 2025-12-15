import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            'prefer-arrow': require('eslint-plugin-prefer-arrow'),
            sonarjs: require('eslint-plugin-sonarjs'),
            import: require('eslint-plugin-import'),
            tsdoc: require('eslint-plugin-tsdoc'),
            jsdoc: require('eslint-plugin-jsdoc'),
            prettier: require('eslint-plugin-prettier'),
        },
        settings: {
            'import/resolver': {
                typescript: {},
            },
            jsdoc: {
                mode: 'typescript',
            },
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    tabWidth: 4,
                    semi: true,
                    trailingComma: 'es5',
                },
            ],

            'max-lines': [
                'warn',
                { max: 200, skipBlankLines: true, skipComments: true },
            ],
            'max-statements': ['error', 30],
            'prefer-arrow/prefer-arrow-functions': [
                'error',
                {
                    disallowPrototype: true,
                    singleReturnOnly: false,
                    classPropertiesAllowed: false,
                },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',

            complexity: ['warn', 10],
            'import/max-dependencies': ['warn', { max: 10 }],
            'import/no-cycle': 'error',

            'tsdoc/syntax': 'error',

            // JSDoc rules (TypeScript-friendly)
            'jsdoc/require-jsdoc': [
                'error',
                {
                    require: {
                        FunctionDeclaration: true,
                        ClassDeclaration: true,
                        MethodDefinition: false,
                        ArrowFunctionExpression: false,
                        FunctionExpression: false,
                        ClassExpression: false,
                    },
                    publicOnly: true,
                },
            ],

            'jsdoc/require-param': 'off',
            'jsdoc/check-tag-names': 'warn',
            'jsdoc/no-undefined-types': 'off',
            'jsdoc/require-param-type': 'off',
            'jsdoc/require-returns-type': 'off',
        },
    },
    {
        files: ['**/*.test.ts'],
        rules: {
            'tsdoc/syntax': 'off',
            'prettier/prettier': 'off',
            'max-lines': 'off',
        },
    },
    {
        files: ['.opencode/**'],
        rules: {
            'jsdoc/require-jsdoc': 'off',
            'jsdoc/check-tag-names': 'off',
            'jsdoc/require-param': 'off',
            'jsdoc/no-undefined-types': 'off',
            'jsdoc/require-param-type': 'off',
            'jsdoc/require-returns-type': 'off',
        },
    },
];
