import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { ZodError } from 'zod';
import { TemplateSchema } from './schema';

const readYAML = async (file: string) => {
    const content = await fs.readFile(file, 'utf8');
    return yaml.load(content as string);
};

const walkDir = async (dir: string, pattern = '-tmpl.yml') => {
    const results: string[] = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
            const nested = await walkDir(full, pattern);
            results.push(...nested);
        } else if (ent.isFile() && ent.name.endsWith(pattern)) {
            results.push(full);
        }
    }
    return results;
};

const extractFrontmatter = (content: string) => {
    const m = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!m) return null;
    try {
        return yaml.load(m[1]);
    } catch (err) {
        return null;
    }
};

const listMarkdownFiles = async (dir: string) => {
    const results: string[] = [];
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const ent of entries) {
            const full = path.join(dir, ent.name);
            if (ent.isDirectory()) {
                const nested = await listMarkdownFiles(full);
                results.push(...nested);
            } else if (ent.isFile() && ent.name.endsWith('.md')) {
                results.push(full);
            }
        }
    } catch (err) {
        // ignore
    }
    return results;
};

/**
 *
 */
/* eslint-disable max-statements, complexity */
export const validateTemplates = async (
    files: string[] | string,
    _opts: unknown
) => {
    const list = Array.isArray(files) ? files : [files];
    const targets: string[] = [];

    for (const f of list) {
        const full = path.resolve(process.cwd(), f);
        try {
            const stat = await fs.stat(full);
            if (stat.isDirectory()) {
                const found = await walkDir(full);
                targets.push(...found);
            } else if (stat.isFile()) {
                targets.push(full);
            }
        } catch (_err: unknown) {
            console.warn(`Warning: path not found or inaccessible: ${full}`);
        }
    }

    if (!targets.length) {
        console.log('No templates found to validate.');
        return;
    }

    let ok = true;
    for (const t of targets) {
        try {
            const raw = await readYAML(t);
            const result = TemplateSchema.safeParse(raw);
            if (!result.success) {
                ok = false;
                const err = result.error as ZodError;
                console.error(`ERR ${t}:`);
                for (const issue of err.issues) {
                    const p = issue.path.length
                        ? issue.path.join('.')
                        : '<root>';
                    console.error(`  - [${p}] ${issue.message}`);
                }
                continue;
            }

            console.log(`OK  ${t}`);

            // Additional checks: required_fields should appear in template/frontmatter.
            const tpl = raw as Record<string, unknown>;
            const required = Array.isArray(tpl['required_fields'])
                ? (tpl['required_fields'] as string[])
                : [];

            if (required.length) {
                const missing: string[] = [];

                const front = tpl['frontmatter'];
                if (front && typeof front === 'object') {
                    const keys = new Set(
                        Object.keys(front as Record<string, unknown>)
                    );
                    for (const fkey of required)
                        if (!keys.has(fkey)) missing.push(fkey);
                } else if (typeof tpl['template'] === 'string') {
                    for (const fkey of required) {
                        const reKey = new RegExp(`\\b${fkey}\\s*:`);
                        const reMustache = new RegExp(
                            `\\{\\{\\s*${fkey}\\s*\\}\\}`
                        );
                        if (
                            !reKey.test(String(tpl['template'])) &&
                            !reMustache.test(String(tpl['template']))
                        )
                            missing.push(fkey);
                    }
                }

                if (missing.length) {
                    ok = false;
                    console.error(
                        `ERR ${t}: template declares required_fields but these were not found in frontmatter/template: ${missing.join(', ')}`
                    );
                }
            }

            // Validate existing generated documents in output_dir if present
            if (tpl['output_dir'] && required.length) {
                const outdir = path.resolve(
                    process.cwd(),
                    String(tpl['output_dir'])
                );
                const docs = await listMarkdownFiles(outdir);
                for (const doc of docs) {
                    try {
                        const content = await fs.readFile(doc, 'utf8');
                        const fm = (extractFrontmatter(content) ||
                            {}) as Record<string, unknown>;
                        const missingInDoc: string[] = [];
                        for (const fkey of required) {
                            const val = fm[fkey];
                            if (val === undefined || val === null || val === '')
                                missingInDoc.push(fkey);
                        }
                        if (missingInDoc.length) {
                            ok = false;
                            console.error(
                                `ERR ${t}: Generated doc ${doc} missing required frontmatter fields: ${missingInDoc.join(', ')}`
                            );
                        }
                    } catch (err: unknown) {
                        ok = false;
                        const msg = (err as Error)?.message ?? String(err);
                        console.error(
                            `ERR ${t}: Could not read generated doc ${doc}: ${msg}`
                        );
                    }
                }
            }
        } catch (err: unknown) {
            ok = false;
            const msg = (err as Error)?.message ?? String(err);
            console.error(`ERR ${t}:`, msg);
        }
    }

    if (!ok) process.exit(2);
};
