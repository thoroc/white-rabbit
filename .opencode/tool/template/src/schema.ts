import { z } from "zod";

export const TemplateSchema = z.object({
  version: z.string().optional(),
  metadata: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
  placeholders: z.record(z.string()).optional(),
  content: z.any().optional(),
});

export type Template = z.infer<typeof TemplateSchema>;
