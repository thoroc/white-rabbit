import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import mustache from "mustache";
import { TemplateSchema } from "./schema";

function readYAML(file: string) {
  return fs.readFile(file, "utf8").then((s) => yaml.load(s));
}

export async function createTemplate(templateFile: string, options: any) {
  const absPath = path.resolve(process.cwd(), templateFile);
  const raw = await readYAML(absPath);
  const parsed = TemplateSchema.parse(raw);

  // Load data file if provided
  let data: Record<string, any> = {};
  if (options.data) {
    const dataPath = path.resolve(process.cwd(), options.data);
    const ext = path.extname(dataPath).toLowerCase();
    const rawData = await fs.readFile(dataPath, "utf8");
    data = ext === ".json" ? JSON.parse(rawData) : (yaml.load(rawData) as any);
  }

  const defaults = parsed.placeholders ?? {};
  const merged = { ...defaults, ...data };

  // If content is provided as string, render it; otherwise stringify full template
  let output = "";
  if (typeof parsed.content === "string") {
    output = mustache.render(parsed.content, merged);
  } else {
    // Render the entire YAML template as a string template
    const tmplString = yaml.dump(parsed);
    output = mustache.render(tmplString, merged);
  }

  if (options.out) {
    const outPath = path.resolve(process.cwd(), options.out);
    await fs.writeFile(outPath, output, "utf8");
    console.log(`Wrote ${outPath}`);
  } else {
    console.log(output);
  }
}
