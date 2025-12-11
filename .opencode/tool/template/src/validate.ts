import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { ZodError } from "zod";
import { TemplateSchema } from "./schema";

async function readYAML(file: string) {
  const content = await fs.readFile(file, "utf8");
  return yaml.load(content);
}

async function walkDir(dir: string, pattern = "-tmpl.yml") {
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
}

export async function validateTemplates(files: string[] | string, _opts: any) {
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
    } catch (err: any) {
      console.warn(`Warning: path not found or inaccessible: ${full}`);
    }
  }

  if (!targets.length) {
    console.log("No templates found to validate.");
    return;
  }

  let ok = true;
  for (const t of targets) {
    try {
      const raw = await readYAML(t);
      const result = TemplateSchema.safeParse(raw);
      if (result.success) {
        console.log(`OK  ${t}`);
      } else {
        ok = false;
        const err = result.error as ZodError;
        console.error(`ERR ${t}:`);
        for (const issue of err.issues) {
          const p = issue.path.length ? issue.path.join(".") : "<root>";
          console.error(`  - [${p}] ${issue.message}`);
        }
      }
    } catch (err: any) {
      ok = false;
      console.error(`ERR ${t}:`, err.message ?? err);
    }
  }

  if (!ok) process.exit(2);
}
