---
title: Documentation Plugin Architecture Design
description: Guide for replacing command-based documentation with OpenCode plugins for better performance and user experience
type: knowledge-base
category: meta
version: 1.0.0
tags:
  - knowledge
  - meta
  - plugin
  - architecture
last_updated: 2025-11-19
---

# Documentation Plugin Architecture Design

This document outlines how to replace our current command/shell-based documentation system with OpenCode plugins for better performance and user experience.

## Current System Problems

1. **Inefficient Loading**: Commands load large files via shell integration
2. **Complex Orchestration**: Manual agent coordination and command chaining
3. **Poor Caching**: No reuse of analysis results across sessions
4. **Shell Dependencies**: Reliance on shell commands for project analysis
5. **Context Bloat**: Large upfront context loading despite lazy loading improvements

## Plugin-Based Solution Architecture

### Core Plugin: `DocumentationPlugin`

**Location**: `.opencode/plugin/documentation.js`

**Capabilities**:

- Custom tools for documentation generation
- Smart project analysis with caching
- Dynamic content loading
- Integrated checklist validation
- Mermaid diagram generation helpers

### Custom Tools to Replace Commands

#### 1. `analyze-project` Tool

**Replaces**: Shell commands in skills and command files

```javascript
analyze_project: tool({
  description: 'Analyze project technology stack and architecture',
  args: {
    depth: tool.schema.enum(['basic', 'comprehensive']),
    focus: tool.schema.string().optional(),
  },
  async execute(args, ctx) {
    // Native JS analysis instead of shell commands
    // Cached results for performance
    // Return structured data instead of text
  },
});
```

#### 2. `generate-docs` Tool

**Replaces**: `/document`, `/api-docs`, `/arch-docs`, `/deploy-docs` commands

```javascript
generate_docs: tool({
  description: 'Generate comprehensive documentation',
  args: {
    type: tool.schema.enum(['api', 'architecture', 'deployment', 'development', 'comprehensive']),
    focus: tool.schema.string().optional(),
    include_diagrams: tool.schema.boolean().default(true),
  },
  async execute(args, ctx) {
    // Load relevant checklists dynamically
    // Generate documentation with proper structure
    // Include Mermaid diagrams automatically
  },
});
```

#### 3. `validate-docs` Tool

**Replaces**: Manual checklist validation

```javascript
validate_docs: tool({
  description: 'Validate documentation against quality standards',
  args: {
    doc_type: tool.schema.enum(['api', 'architecture', 'deployment', 'development']),
    file_path: tool.schema.string(),
  },
  async execute(args, ctx) {
    // Load appropriate checklist
    // Analyze documentation completeness
    // Return validation report with missing items
  },
});
```

#### 4. `create-diagram` Tool

**Replaces**: Manual Mermaid diagram creation with knowledge base references

```javascript
create_diagram: tool({
  description: 'Create Mermaid diagrams for documentation',
  args: {
    type: tool.schema.enum(['flowchart', 'sequence', 'architecture', 'deployment', 'class', 'er']),
    context: tool.schema.string(),
    style: tool.schema.enum(['simple', 'detailed', 'professional']).default('professional'),
  },
  async execute(args, ctx) {
    // Access Mermaid templates
    // Generate context-appropriate diagrams
    // Validate Mermaid syntax
  },
});
```

## Plugin Implementation Structure

```javascript
// .opencode/plugin/documentation.js
import { tool } from '@opencode-ai/plugin';
import fs from 'fs/promises';
import path from 'path';

export const DocumentationPlugin = async ({ project, client, $, directory, worktree }) => {
  // Cache for analysis results
  const cache = new Map();

  // Load configuration and templates
  const loadTemplate = async (type) => {
    const templatePath = path.join(directory, '.opencode', 'knowledge-base', `${type}.md`);
    return await fs.readFile(templatePath, 'utf8');
  };

  const loadChecklist = async (type) => {
    if (cache.has(`checklist-${type}`)) {
      return cache.get(`checklist-${type}`);
    }
    const checklistPath = path.join(
      directory,
      '.opencode',
      'checklist',
      `${type}-documentation.md`,
    );
    const content = await fs.readFile(checklistPath, 'utf8');
    cache.set(`checklist-${type}`, content);
    return content;
  };

  return {
    tool: {
      // Implementation of custom tools
      analyze_project: tool({
        description: 'Analyze project technology stack and architecture',
        args: {
          depth: tool.schema.enum(['basic', 'comprehensive']).default('basic'),
          focus: tool.schema.string().optional(),
        },
        async execute(args, ctx) {
          // Efficient project analysis
          // Return structured JSON instead of text
        },
      }),

      generate_docs: tool({
        description: 'Generate comprehensive documentation',
        args: {
          type: tool.schema.enum([
            'api',
            'architecture',
            'deployment',
            'development',
            'comprehensive',
          ]),
          focus: tool.schema.string().optional(),
          include_diagrams: tool.schema.boolean().default(true),
        },
        async execute(args, ctx) {
          // Smart documentation generation
        },
      }),

      // Additional tools...
    },
  };
};
```

## Benefits Over Current System

### Performance Benefits

- **Native JavaScript**: No shell command overhead
- **Intelligent Caching**: Reuse analysis across sessions
- **Selective Loading**: Load only required resources
- **Structured Data**: JSON responses instead of text parsing

### User Experience Benefits

- **Native Tools**: Integrated with OpenCode's tool system
- **Better Error Handling**: Proper error messages and validation
- **Consistent Interface**: All tools follow same patterns
- **Auto-completion**: Tools appear in OpenCode's tool suggestions

### Maintenance Benefits

- **Type Safety**: TypeScript support for better reliability
- **Modular Design**: Each tool is independently testable
- **Version Control**: Plugin versioning and updates
- **Configuration**: Easy to customize per project

## Migration Strategy

### Phase 1: Core Plugin Implementation

1. Create basic `DocumentationPlugin` with `analyze_project` tool
2. Test performance vs. current shell-based analysis
3. Implement `generate_docs` tool for one documentation type

### Phase 2: Feature Parity

1. Implement all documentation types in `generate_docs`
2. Add `validate_docs` and `create_diagram` tools
3. Migrate knowledge base and checklists to plugin resources

### Phase 3: Enhanced Features

1. Add intelligent caching and optimization
2. Implement documentation templates and customization
3. Add integration with external documentation tools

### Phase 4: Cleanup

1. Remove old command files
2. Update documentation and examples
3. Provide migration guide for users

## Plugin vs Current System Comparison

| Aspect             | Current System         | Plugin System         |
| ------------------ | ---------------------- | --------------------- |
| **Loading**        | 1,580+ lines via shell | Dynamic loading in JS |
| **Performance**    | Shell command overhead | Native JS execution   |
| **Caching**        | None                   | Intelligent caching   |
| **Error Handling** | Shell exit codes       | Proper exceptions     |
| **Integration**    | Agent orchestration    | Native OpenCode tools |
| **Customization**  | File editing           | Plugin configuration  |
| **Testing**        | Manual validation      | Unit testable tools   |
| **Distribution**   | File copying           | Plugin system         |

## Implementation Priority

**HIGH PRIORITY**:

1. `analyze_project` tool - Replaces most shell commands
2. `generate_docs` tool - Core documentation generation
3. Basic caching system

**MEDIUM PRIORITY**:

1. `validate_docs` tool - Quality assurance
2. `create_diagram` tool - Visual documentation
3. Template system integration

**LOW PRIORITY**:

1. Advanced caching strategies
2. External tool integrations
3. Custom configuration options

This plugin-based approach would dramatically improve performance, maintainability, and user experience while providing the same comprehensive documentation capabilities.
