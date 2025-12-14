# Prompt Engineering Patterns and Best Practices

## Purpose

This knowledge-base provides proven patterns, methodologies, and best practices for crafting effective prompts for Large Language Models (LLMs). It serves as a reference for agents and users working on prompt enhancement and refinement tasks.

## Core Principles

### Clarity and Specificity

- **Be Explicit**: State exactly what you want, not what you assume the model understands
- **Use Concrete Examples**: Provide specific instances rather than abstract descriptions
- **Define Scope**: Clearly indicate what is in-scope and out-of-scope
- **Specify Format**: Explicitly state the desired output format (JSON, markdown, bullet points, etc.)

### Context and Background

- **Provide Sufficient Context**: Include relevant background information without overwhelming
- **State Assumptions**: Make implicit assumptions explicit
- **Define Domain Terms**: Clarify specialized terminology or acronyms
- **Set Constraints**: Specify limitations, boundaries, or restrictions upfront

### Structure and Organization

- **Use Sections**: Break complex prompts into labeled sections (Goal, Context, Constraints, etc.)
- **Prioritize Information**: Place the most important information near the beginning or end
- **Use Formatting**: Leverage markdown formatting for readability (headers, bullets, code blocks)
- **Sequential Instructions**: Order steps logically for multi-step tasks

## Prompt Design Patterns

### Pattern: Role-Based Prompting

**Description**: Assign a specific role or persona to the model to leverage domain expertise.

**Structure**:

```
You are a [role with expertise]. [Task description with context].
```

**Example**:

```
You are a senior software architect with expertise in microservices.
Design a scalable API gateway for a distributed system handling 10M requests/day.
```

**When to Use**: Tasks requiring specialized knowledge or perspective

### Pattern: Chain-of-Thought

**Description**: Request step-by-step reasoning to improve accuracy on complex problems.

**Structure**:

```
[Problem statement]. Let's think through this step by step:
1. [First step to consider]
2. [Second step to consider]
...
```

**Example**:

```
Calculate the project timeline considering dependencies. Let's think through this step by step:
1. Identify all tasks and their durations
2. Map dependencies between tasks
3. Calculate critical path
4. Account for resource constraints
```

**When to Use**: Complex reasoning, mathematical problems, planning tasks

### Pattern: Few-Shot Learning

**Description**: Provide examples of desired input-output pairs before the actual task.

**Structure**:

```
[Example 1 input] → [Example 1 output]
[Example 2 input] → [Example 2 output]

Now apply the same pattern:
[Actual input] → ?
```

**When to Use**: Pattern recognition, formatting tasks, style matching

### Pattern: Constrained Generation

**Description**: Explicitly state what the model should NOT do or include.

**Structure**:

```
[Task description]

Requirements:
- [Positive requirement 1]
- [Positive requirement 2]

Constraints:
- Do NOT [prohibited action 1]
- AVOID [prohibited pattern 2]
- NEVER [prohibited action 3]
```

**When to Use**: Safety-critical tasks, avoiding hallucinations, enforcing boundaries

### Pattern: Template-Driven Output

**Description**: Provide an exact template or schema for the output format.

**Structure**:

````
[Task description]

Output format (fill in the template):
```markdown
# [Title]
## [Section]
- [Item 1]
- [Item 2]
````

```

**When to Use**: Structured data generation, consistent formatting, schema compliance

### Pattern: Iterative Refinement

**Description**: Request self-evaluation and improvement of initial output.

**Structure**:
```

[Task description]

Steps:

1. Produce an initial [output]
2. Evaluate it against [criteria]
3. Identify weaknesses or gaps
4. Produce an improved version

```

**When to Use**: High-quality requirements, creative tasks, optimization problems

## Brainstorming Methodologies

### Mind Mapping

**Purpose**: Visually organize ideas and explore relationships between concepts.

**Application in Prompts**:
```

Create a mind map for [topic]:

1. Central concept: [main idea]
2. Primary branches: [main categories]
3. Secondary branches: [sub-concepts]
4. Connections: [relationships between concepts]

```

**Best For**: Exploring topics, identifying connections, organizing knowledge

### Six Thinking Hats (Edward de Bono)

**Purpose**: Examine a problem from multiple perspectives systematically.

**Hat Colors and Perspectives**:
- **White Hat**: Facts, data, information (objective)
- **Red Hat**: Emotions, feelings, intuition (subjective)
- **Black Hat**: Caution, risks, weaknesses (critical)
- **Yellow Hat**: Benefits, optimism, opportunities (positive)
- **Green Hat**: Creativity, alternatives, new ideas (generative)
- **Blue Hat**: Process, organization, next steps (meta)

**Application in Prompts**:
```

Analyze [topic] using the Six Thinking Hats method:

- White Hat: What facts do we know?
- Red Hat: What are the emotional reactions?
- Black Hat: What are the risks and downsides?
- Yellow Hat: What are the benefits and opportunities?
- Green Hat: What creative alternatives exist?
- Blue Hat: What's the overall assessment and next steps?

```

**Best For**: Decision-making, balanced analysis, avoiding groupthink

### SCAMPER

**Purpose**: Generate ideas by applying systematic transformation techniques.

**SCAMPER Techniques**:
- **Substitute**: What can be replaced or swapped?
- **Combine**: What can be merged or integrated?
- **Adapt**: What can be adjusted or modified for a new context?
- **Modify**: What can be changed in size, shape, or attributes?
- **Put to another use**: What alternative applications exist?
- **Eliminate**: What can be removed or simplified?
- **Reverse/Rearrange**: What can be inverted or reordered?

**Application in Prompts**:
```

Apply SCAMPER to improve [concept]:

- Substitute: What components could be replaced?
- Combine: What features could be merged?
- Adapt: How could this work in a different context?
- Modify: What attributes could be changed?
- Put to another use: What alternative applications exist?
- Eliminate: What complexity could be removed?
- Reverse: What if we inverted the approach?

```

**Best For**: Innovation, product development, process improvement

## Quality Evaluation Criteria

### Clarity (1-10 scale)

- **1-3**: Vague, ambiguous, multiple interpretations possible
- **4-6**: Generally clear but some ambiguity remains
- **7-9**: Mostly clear with minor ambiguities
- **10**: Crystal clear, no room for misinterpretation

### Specificity (1-10 scale)

- **1-3**: Generic, lacks detail, abstract
- **4-6**: Some specific details, but gaps remain
- **7-9**: Specific with concrete details
- **10**: Highly specific with measurable criteria

### Actionability (1-10 scale)

- **1-3**: Cannot act on prompt without clarification
- **4-6**: Can start but needs assumptions
- **7-9**: Can complete most tasks with minor clarification
- **10**: Can execute immediately without questions

### Completeness (1-10 scale)

- **1-3**: Missing critical information
- **4-6**: Has basic information but lacks depth
- **7-9**: Comprehensive with minor gaps
- **10**: All necessary information included

### Structure (1-10 scale)

- **1-3**: Unorganized, difficult to parse
- **4-6**: Some structure but could be improved
- **7-9**: Well-organized with clear sections
- **10**: Perfectly structured, easy to navigate

## Common Prompt Anti-Patterns

### The Vague Request

**Problem**: "Help me with my project"
**Why It Fails**: No context, no specific task, no measurable outcome
**Fix**: "Review my React component for performance issues and suggest optimizations"

### The Assumption Trap

**Problem**: "Fix the bug" (without describing the bug)
**Why It Fails**: Assumes model has context it doesn't have
**Fix**: "Fix the null pointer exception in UserService.java:42 when userId is null"

### The Kitchen Sink

**Problem**: Combining 10 unrelated tasks in one prompt
**Why It Fails**: Dilutes focus, increases error rate
**Fix**: Break into separate, focused prompts

### The Implicit Format

**Problem**: "Give me the data" (without specifying format)
**Why It Fails**: Model guesses format, may not match needs
**Fix**: "Return the data as JSON with fields: id, name, email"

### The Moving Target

**Problem**: Changing requirements mid-conversation without clarity
**Why It Fails**: Context confusion, inconsistent outputs
**Fix**: Clearly state when requirements change: "Revised requirement: [new spec]"

## Best Practices Summary

1. **Start with the Goal**: State the desired outcome upfront
2. **Provide Context**: Give enough background without overwhelming
3. **Be Specific**: Use concrete details, examples, and measurements
4. **Structure Clearly**: Use sections, headers, and formatting
5. **State Constraints**: Explicitly list limitations and boundaries
6. **Define Success**: Specify acceptance criteria or quality standards
7. **Include Examples**: Show desired format or style when possible
8. **Anticipate Ambiguity**: Address potential unclear areas proactively
9. **Use Patterns**: Apply proven prompt patterns for common tasks
10. **Iterate**: Refine prompts based on outputs and feedback

## References

- Chain-of-Thought Prompting: Wei et al. (2022)
- Few-Shot Learning: Brown et al. (2020)
- Six Thinking Hats: de Bono, E. (1985)
- SCAMPER Method: Eberle, B. (1971)
- Mind Mapping: Buzan, T. (1974)
```
