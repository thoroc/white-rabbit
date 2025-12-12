---
title: feature prompt
description: Refine and enhance a user prompt for LLMs, returning improved variants and metadata
agent: plan
type: command
category: Development
tags:
  - command
  - feature
  - refine
  - enhance
version: 1.0.0
last_updated: 2025-11-19
---

You are a professional prompt engineer. Transform the given basic prompt into a more detailed, precise, and actionable prompt that preserves the original intention while adding structure, specificity, context, constraints, and quality standards.

Input (replace with the user's basic prompt):
Original Prompt: $ARGUMENTS

## Objectives (what the enhanced prompt must achieve)

1. Preserve the user's original intent exactly — do not change the goal or add unrelated tasks.
2. Clarify the objective so a model or human can act on it immediately.
3. Provide a specific, testable expected outcome or deliverable.
4. Add necessary context and assumptions so no additional domain knowledge is required.
5. Specify format, style, constraints, and acceptance criteria.

## Required Structure for the Enhanced Prompt (output must include these labeled sections in this order)

- Title: one-line summary of the task.
- Goal: 1–2 sentences preserving original intent and desired outcome.
- Context: 2–4 brief bullets providing background, relevant information, and assumptions.
- Inputs: explicit list of items, data, or resources the model has or should request.
- Deliverables: exact artifacts to produce (e.g., code file names, JSON schema, bullet list, step-by-step plan), with format examples.
- Constraints & Limitations: concrete constraints (e.g., language, token/length limits, prohibited actions, security/privacy rules).
- Quality Standards & Acceptance Criteria: measurable checks (e.g., edge cases handled, tests passed, readability, performance thresholds).
- Style & Tone: voice, level of detail, and audience (e.g., "concise technical, for senior engineer", or "friendly, non-technical").
- Clarifying Questions: up to 3 sample questions to ask if the original prompt lacks critical information.
- Example Output: a short concrete example (1–3 items) showing the expected format of the deliverable.
- "Do not do" list: 1–3 explicit things not to do (e.g., do not invent facts, do not change scope).

## Formatting and Content Rules

- Use plain text; keep each labeled section clearly separated and titled.
- Use complete sentences for Goal and Context; use bullets for Inputs, Deliverables, Constraints, and Quality Standards.
- Where the original prompt is ambiguous, include a short "Assumptions" bullet listing any reasonable assumptions you made.
- Preserve any domain-specific terms from the original prompt verbatim unless they conflict with clarity.
- Keep the enhanced prompt between 120 and 600 words unless the original prompt requires more detail.
- If the original prompt already contains some of these sections, retain and expand them rather than discard.

## Constraints

- Do not add new tasks or objectives beyond the user’s original intent.
- Do not assume access to external systems or private data unless explicitly stated in the original prompt.
- Avoid vague verbs like "help" or "improve" without specifying measurable outcomes.
- Do not include implementation code unless the user asked for it; instead specify formats and examples.

## Quality checklist (the transformed prompt must satisfy all)

- The Goal matches the Original Prompt’s intent (yes/no).
- Deliverables are concrete and actionable (yes/no).
- At least one measurable acceptance criterion is provided (yes/no).
- Up to 3 clarifying questions are supplied if ambiguity exists (yes/no).
- The enhanced prompt can be used directly to produce the requested output without further clarification (yes/no).

## Output Requirements

1. Create the `.context/features/` directory if it does not exist
2. Generate a filename based on the title (lowercase, hyphenated, ending in `.md`)
3. Save the enhanced prompt as a markdown file in `.context/features/[filename].md`
4. Include proper markdown formatting with headers (use `#` for Title, `##` for major sections)

## Final instruction

Produce the Enhanced Prompt text (with the labeled sections above), replacing the placeholder Original Prompt with the actual basic prompt text. Save it to `.context/features/` as specified in Output Requirements. After saving, confirm the file path where the enhanced prompt was saved.
