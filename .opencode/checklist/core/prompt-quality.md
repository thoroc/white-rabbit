---
title: Prompt Quality Assessment Checklist
description: Comprehensive quality criteria for evaluating and enhancing prompts for Large Language Models. Covers clarity, specificity, actionability, completeness, and structure.
type: checklist
category: prompt-engineering
version: 1.0.0
tags:
  - checklist
  - prompt
  - quality
  - evaluation
  - enhancement
last_updated: 2025-12-12
---

# Prompt Quality Assessment Checklist

Use this checklist to systematically evaluate prompt quality and identify areas for improvement. Each criterion is rated on a 1-10 scale with specific indicators.

## 📋 Clarity (1-10)

### ✅ Intent and Goal (Score: 1-3 Low, 4-6 Medium, 7-9 High, 10 Excellent)

- [ ] **Explicit Goal Statement**: The desired outcome is stated clearly upfront
- [ ] **Single Interpretation**: No ambiguity about what is being requested
- [ ] **Unambiguous Terms**: All key terms are clearly defined or standard
- [ ] **Clear Scope**: Boundaries of what is included/excluded are evident
- [ ] **No Jargon Without Context**: Specialized terms are explained or contextually clear

### ✅ Clarity Red Flags (Presence indicates low clarity)

- [ ] **Contains "help me with"**: Vague, non-specific request
- [ ] **Multiple possible interpretations**: Ambiguous phrasing
- [ ] **Undefined pronouns**: "it", "this", "that" without clear referents
- [ ] **Assumed context**: Relies on unstated background knowledge
- [ ] **Mixed goals**: Multiple unrelated objectives in one prompt

## 📋 Specificity (1-10)

### ✅ Concrete Details (Score: 1-3 Low, 4-6 Medium, 7-9 High, 10 Excellent)

- [ ] **Specific Constraints**: Clear boundaries (size limits, format, language, etc.)
- [ ] **Concrete Examples**: Provides at least one example of desired output
- [ ] **Measurable Criteria**: Success criteria that can be objectively verified
- [ ] **Quantified Requirements**: Numbers, metrics, or scales where applicable
- [ ] **Named Entities**: Specific names, versions, technologies mentioned

### ✅ Format and Output Definition

- [ ] **Output Format Specified**: JSON, markdown, bullet points, code, etc.
- [ ] **Output Structure Defined**: Sections, fields, or organization specified
- [ ] **Length Guidance**: Word count, line count, or relative size indicated
- [ ] **Style Requirements**: Tone, voice, or formality level specified
- [ ] **Schema or Template**: Exact structure provided when applicable

### ✅ Specificity Red Flags (Presence indicates low specificity)

- [ ] **Generic terms only**: "good", "better", "improve" without definition
- [ ] **No examples**: Abstract description without concrete instances
- [ ] **Unspecified format**: Output format left to assumption
- [ ] **Relative terms without baseline**: "faster", "more efficient" without reference
- [ ] **Abstract concepts only**: No concrete manifestation described

## 📋 Actionability (1-10)

### ✅ Immediate Executability (Score: 1-3 Low, 4-6 Medium, 7-9 High, 10 Excellent)

- [ ] **Clear First Step**: Obvious starting point for execution
- [ ] **Available Inputs**: All required inputs are provided or accessible
- [ ] **Defined Process**: Steps or approach are clear (or can be inferred)
- [ ] **No Missing Dependencies**: All prerequisites are met or stated
- [ ] **Deliverable Defined**: What to produce is concrete and actionable

### ✅ Context Sufficiency

- [ ] **Background Provided**: Sufficient context for understanding the task
- [ ] **Assumptions Stated**: Implicit assumptions made explicit
- [ ] **Relevant Information**: All necessary details included
- [ ] **Reference Points**: Links, file paths, or pointers to additional info
- [ ] **Domain Context**: Relevant domain knowledge provided or referenced

### ✅ Actionability Red Flags (Presence indicates low actionability)

- [ ] **Missing critical information**: Cannot start without clarification
- [ ] **Undefined inputs**: "Use the data" without specifying what data
- [ ] **Circular requirements**: Dependencies that reference each other
- [ ] **External dependencies unstated**: Requires access not mentioned
- [ ] **Blocked by ambiguity**: Multiple interpretations prevent action

## 📋 Completeness (1-10)

### ✅ Information Coverage (Score: 1-3 Low, 4-6 Medium, 7-9 High, 10 Excellent)

- [ ] **Goal Stated**: What needs to be accomplished
- [ ] **Context Provided**: Why this is needed, background
- [ ] **Inputs Listed**: What information/resources are available
- [ ] **Outputs Defined**: What should be produced
- [ ] **Constraints Specified**: Limitations, boundaries, restrictions
- [ ] **Success Criteria**: How to know when done correctly
- [ ] **Format Requirements**: Structure and presentation expectations

### ✅ Edge Cases and Considerations

- [ ] **Error Handling**: What to do if issues arise
- [ ] **Edge Cases**: Special cases or exceptions addressed
- [ ] **Validation Criteria**: How to verify correctness
- [ ] **Priorities**: What matters most if trade-offs needed
- [ ] **Out of Scope**: What NOT to include

### ✅ Completeness Red Flags (Presence indicates low completeness)

- [ ] **Missing goal**: Purpose unclear
- [ ] **No constraints**: Unlimited scope
- [ ] **No success criteria**: Can't verify correctness
- [ ] **Undefined format**: Output structure unknown
- [ ] **Critical gaps**: Key information missing for execution

## 📋 Structure (1-10)

### ✅ Organization (Score: 1-3 Low, 4-6 Medium, 7-9 High, 10 Excellent)

- [ ] **Clear Sections**: Distinct parts (goal, context, requirements, etc.)
- [ ] **Logical Flow**: Information ordered sensibly
- [ ] **Headers/Labels**: Sections clearly labeled
- [ ] **Visual Hierarchy**: Headers, bullets, numbering used effectively
- [ ] **Scannable**: Easy to find key information quickly

### ✅ Formatting

- [ ] **Markdown/Formatting**: Uses formatting for readability
- [ ] **Bullet Points**: Lists formatted as bullets where appropriate
- [ ] **Code Blocks**: Code/technical content in code blocks
- [ ] **Bold/Emphasis**: Key terms or requirements highlighted
- [ ] **Whitespace**: Adequate spacing between sections

### ✅ Prioritization

- [ ] **Important Info First**: Critical details at beginning or end
- [ ] **Priorities Marked**: Must-have vs nice-to-have indicated
- [ ] **Ordered Steps**: Sequential tasks numbered appropriately
- [ ] **Key Terms Defined Early**: Important concepts introduced upfront

### ✅ Structure Red Flags (Presence indicates poor structure)

- [ ] **Wall of text**: No sections or breaks
- [ ] **No formatting**: Plain text only
- [ ] **Buried lead**: Important info hidden in middle
- [ ] **Random order**: No logical progression
- [ ] **Hard to scan**: Cannot quickly find key points

## 📋 Prompt Pattern Application

### ✅ Recommended Patterns (Check if pattern would improve prompt)

- [ ] **Role-Based**: Would benefit from assigning a role/persona
- [ ] **Chain-of-Thought**: Complex reasoning that needs step-by-step
- [ ] **Few-Shot**: Would benefit from examples
- [ ] **Constrained Generation**: Needs explicit "do not" rules
- [ ] **Template-Driven**: Should provide exact output template
- [ ] **Iterative Refinement**: Would benefit from self-evaluation step

### ✅ Applied Patterns (Check if already present)

- [ ] **Role assigned**: "You are a [role]..."
- [ ] **Examples provided**: Shows desired input/output
- [ ] **Constraints listed**: Explicit "do not" or limitations
- [ ] **Template given**: Exact structure for output
- [ ] **Step-by-step**: Breaks task into sequential steps
- [ ] **Self-evaluation**: Asks for review/improvement

## 📋 Anti-Pattern Detection

### ✅ Common Issues to Avoid

- [ ] **The Vague Request**: Too generic, lacks specifics
- [ ] **The Assumption Trap**: Assumes context not provided
- [ ] **The Kitchen Sink**: Too many unrelated tasks at once
- [ ] **The Implicit Format**: Doesn't specify output format
- [ ] **The Moving Target**: Requirements shift within prompt
- [ ] **Over-prompting**: Excessive instructions that overwhelm
- [ ] **Under-prompting**: Too minimal, lacks necessary detail

## 📋 Enhancement Opportunities

### ✅ Quick Wins (Easy improvements with high impact)

- [ ] **Add examples**: Include 1-2 concrete examples
- [ ] **Specify format**: Clearly state output format
- [ ] **Add constraints**: List explicit limitations
- [ ] **Break into sections**: Organize with headers
- [ ] **Define success**: Add acceptance criteria
- [ ] **Provide context**: Add brief background

### ✅ Advanced Enhancements

- [ ] **Apply proven pattern**: Use role-based, few-shot, etc.
- [ ] **Add brainstorming methodology**: Mind mapping, Six Hats, SCAMPER
- [ ] **Multi-agent perspective**: Consider multiple viewpoints
- [ ] **Iterative refinement**: Include self-evaluation step
- [ ] **Quality checklist**: Add verification criteria

## 📋 Overall Quality Assessment

### ✅ Quality Thresholds

- [ ] **Clarity ≥ 7**: Can be understood without confusion
- [ ] **Specificity ≥ 7**: Contains concrete, measurable details
- [ ] **Actionability ≥ 7**: Can be executed immediately
- [ ] **Completeness ≥ 7**: All critical information present
- [ ] **Structure ≥ 7**: Well-organized and scannable
- [ ] **Average ≥ 7**: Overall score meets quality bar

### ✅ Ready for Use

- [ ] **Goal clear**: No ambiguity about desired outcome
- [ ] **Deliverables concrete**: Output is well-defined
- [ ] **Acceptance criteria present**: Can verify success
- [ ] **No critical gaps**: All necessary info included
- [ ] **Can execute immediately**: No blocking questions

### ✅ Needs Improvement

- [ ] **Score < 7 in any dimension**: Requires enhancement
- [ ] **Critical information missing**: Cannot proceed without clarification
- [ ] **High ambiguity**: Multiple interpretations possible
- [ ] **Unclear success criteria**: Cannot verify correctness
- [ ] **Poor structure**: Difficult to parse or understand

## 📋 Iterative Refinement

### ✅ Iteration Decision

- [ ] **First iteration complete**: Initial evaluation done
- [ ] **Enhancement applied**: Improved version created
- [ ] **Scores compared**: Improvement quantified
- [ ] **Significant improvement**: Score increased by 2+ points
- [ ] **Score ≥ 8 overall**: High quality achieved
- [ ] **Ready to proceed**: Can use enhanced prompt confidently

### ✅ Continue Iteration If

- [ ] **Score < 7**: Below quality threshold
- [ ] **No improvement**: Score didn't increase
- [ ] **Critical gaps remain**: Major issues not addressed
- [ ] **Iteration < 3**: Haven't reached iteration limit
- [ ] **Improvement potential**: Clear path to better prompt

### ✅ Stop Iteration If

- [ ] **Score ≥ 8**: High quality achieved
- [ ] **Iteration = 3**: Reached maximum iterations
- [ ] **No improvement**: Score plateaued
- [ ] **Diminishing returns**: Minimal gains for effort
- [ ] **User satisfied**: Meets requirements sufficiently

## 📚 References

- Knowledge-base: `.opencode/knowledge-base/core/prompt-engineering.md`
- Template: `.opencode/template/core/prompt-evaluation-tmpl.yaml`
- Command: `.opencode/command/refine-prompt.md`
- Agent: `.opencode/agent/prompt-enhancer-expert.md`
