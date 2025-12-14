---
description: Follow instructions from a specified file
agent: general
type: command
category: Development
tags:
    - command
    - follow
    - instructions
    - specified
version: 1.0.0
last_updated: 2025-11-19
---

# Follow Instructions from File

Execute instructions contained in a specified file. This command loads the file content and instructs the agent to follow the instructions within.

## File Validation

**Checking if file exists:**

!`if [ -f "$1" ]; then echo "File found: $1"; else echo "ERROR: File not found: $1"; exit 1; fi`

## File Content

**Instructions to follow:**

@$1

## Execution Instructions

You have been provided with instructions from the file: **$1**

**Your task:**

1. **Read and understand** the complete instructions provided above from the file
2. **Execute the instructions** exactly as specified in the file
3. **Follow all requirements** including:
    - Any specified format or structure
    - Quality standards mentioned
    - Constraints and limitations
    - Expected outputs or deliverables
4. **Ask for clarification** if the instructions are ambiguous or incomplete
5. **Report completion** when all instructions have been executed

**Important:**

- Treat the file content as your primary directive
- Do not deviate from the instructions unless explicitly asked by the user
- If the instructions reference other files or resources, access them as needed
- If the instructions are unclear or contradictory, ask the user for clarification before proceeding

Begin executing the instructions now.
