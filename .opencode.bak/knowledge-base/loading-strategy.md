---
title: OpenCode Resource Loading Strategy
description: This document explains the efficient loading strategy for skills, knowledge base documents, and checklists.
type: knowledge-base
category: meta
version: 1.0.0
tags:
    - knowledge
    - meta
    - loading
    - strategy
last_updated: 2025-11-19
---

# OpenCode Resource Loading Strategy

This document explains the efficient loading strategy for skills, knowledge base documents, and checklists.

## Problem Solved

Previously, commands were loading entire files (675+ lines of checklists, 905+ lines of skills) into every command invocation, wasting context tokens and slowing performance.

## Solution: Reference-Based Lazy Loading

Instead of inline loading, we now use **references with conditional loading instructions**.

## Resource Categories & Loading Guidelines

### 1. Skills (.opencode/task/)

**When to Load**: Only when you need comprehensive detection/analysis capabilities beyond the lightweight project context provided.

- **`.opencode/task/technology-detection.md`** (226 lines)
    - Load when: Need to identify obscure frameworks, language-specific patterns, or complex project structures
    - Contains: 20+ programming languages, 50+ frameworks, project type detection patterns

- **`.opencode/task/infrastructure-analysis.md`** (281 lines)
    - Load when: Need to analyze complex data architectures, messaging patterns, or service integrations
    - Contains: Database patterns, API architectures, messaging systems, caching strategies

- **`.opencode/task/deployment-strategy.md`** (398 lines)
    - Load when: Need to analyze complex deployment configurations or CI/CD setups
    - Contains: Container orchestration, cloud platforms, IaC tools, CI/CD patterns

### 2. Checklists (.opencode/checklist/)

**When to Load**: Only when actively creating documentation of that specific type.

- **`.opencode/checklist/api-documentation.md`** (150 requirements)
    - Load when: Creating API documentation, need comprehensive API documentation requirements
- **`.opencode/checklist/architecture-documentation.md`** (161 requirements)
    - Load when: Creating architecture documentation, need technical diagram requirements
- **`.opencode/checklist/deployment-documentation.md`** (183 requirements)
    - Load when: Creating deployment documentation, need operational procedure requirements
- **`.opencode/checklist/development-documentation.md`** (181 requirements)
    - Load when: Creating development/contributor documentation

### 3. Knowledge Base (.opencode/knowledge-base/)

**When to Load**: Only when you need specific examples or templates.

- **`.opencode/knowledge-base/mermaid-diagrams.md`** (281 lines)
    - Load when: Creating visual documentation, need Mermaid diagram examples
    - Contains: 10+ diagram types, best practices, styling examples

## Loading Decision Tree

```sh
Need to create documentation?
├─ YES: Load relevant checklist for that documentation type
│   ├─ Need diagrams? → Load mermaid-diagrams.md
│   ├─ Complex project? → Load relevant skills
│   └─ Standard project? → Use lightweight context only
└─ NO: Use only lightweight project context provided
```

## Efficiency Rules

### DO Load When

- Actively working on specific documentation type (load checklist)
- Creating visual documentation (load mermaid knowledge base)
- Project analysis fails with lightweight context (load skills)
- Need comprehensive requirements or examples

### DON'T Load When

- Just planning or discussing documentation
- Lightweight project context is sufficient
- Already have the information needed
- Just need to reference what exists (use file paths)

## Command Integration

All commands now provide:

1. **File References**: Clear paths to relevant resources
2. **Loading Conditions**: When each resource should be loaded
3. **Lightweight Context**: Basic project analysis via shell commands
4. **Size Information**: Resource sizes to make informed loading decisions

## Example Usage Pattern

```md
1. Agent receives command with references
2. Evaluates lightweight project context
3. Determines if additional resources needed
4. Loads only required resources
5. Completes task efficiently
```

## Performance Benefits

- **Reduced Initial Load**: Commands now load ~90% fewer tokens upfront
- **Selective Loading**: Only load resources when actually needed
- **Faster Execution**: Less parsing and processing of unused content
- **Better Focus**: Agents work with relevant information only

## Backward Compatibility

- All existing functionality preserved
- Commands still provide comprehensive guidance
- Agents can still access all resources when needed
- Improved efficiency with same capabilities
