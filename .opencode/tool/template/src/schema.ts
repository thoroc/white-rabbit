import { z } from "zod";

// Support two common template shapes seen in repo:
// 1) structured template (research-tmpl.yml) with `frontmatter` and `body` objects
// 2) freeform template (feature-tmpl.yml) with a `template` string containing mustache placeholders

const StructuredTemplate = z.object({
  template_version: z.union([z.string(), z.number()]).optional(),
  description: z.string().optional(),
  agent: z.string(),
  output_dir: z.string(),
  filename_pattern: z.string(),
  required_fields: z.array(z.string()).optional(),
  frontmatter: z.record(z.any()).optional(),
  body: z.record(z.any()).optional(),
  rendering_notes: z.string().optional(),
});

const StringTemplate = z.object({
  template_version: z.union([z.string(), z.number()]).optional(),
  description: z.string().optional(),
  agent: z.string(),
  output_dir: z.string(),
  filename_pattern: z.string().optional(),
  required_fields: z.array(z.string()).optional(),
  template: z.string(),
});

export const TemplateSchema = z.union([StructuredTemplate, StringTemplate]);

export type Template = z.infer<typeof TemplateSchema>;
