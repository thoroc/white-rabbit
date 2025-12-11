#!/usr/bin/env bun
import cac from 'cac';
import { createTemplate } from './create';
import { validateTemplates } from './validate';

const cli = cac('template');

cli.command(
    'create <templateFile>',
    'Render a template into an output file or stdout'
)
    .option(
        '-d, --data <path>',
        'Path to JSON/YAML file with values to fill placeholders'
    )
    .option('-o, --out <path>', 'Output file path (defaults to stdout)')
    .action(
        async (
            templateFile: string,
            options: { data?: string; out?: string }
        ) => {
            try {
                await createTemplate(templateFile, options);
            } catch (err) {
                console.error('Error:', err);
                process.exit(1);
            }
        }
    );

cli.command(
    'validate [files...]',
    'Validate one or more template files against the template schema'
).action(async (files: string[] = []) => {
    try {
        await validateTemplates(files.length ? files : ['./'], {});
    } catch (err) {
        console.error('Validation error:', err);
        process.exit(1);
    }
});

cli.help();
cli.parse();
