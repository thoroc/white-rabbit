---
description: Research a specific domain or topic using the `researcher` subagent; asks clarifying questions when needed.
agent: researcher
subtask: true
---

Research the domain or topic described by the user arguments: `$ARGUMENTS`.

If no arguments are provided, ask these elicitation questions before starting:

- What is the exact topic or domain you want researched?
- Desired timeframe (e.g., past 6 months, past 3 years, all time)?
- Geographic scope (global, specific country/region)?
- Intended audience and depth (high-level summary, technical deep-dive, policy brief)?
- Preferred output format (TL;DR, bullets, annotated bibliography)?

When you have a clear query, run focused research and return a structured report containing:

- TL;DR (1–3 sentences)
- Key findings (5–8 concise bullets) with numbered inline citations
- Provenance (numbered list of sources: title, URL, date, short note)
- Confidence level per finding and overall confidence
- Suggested follow-up queries and next steps

If the topic is broad, propose a short search plan (3–6 queries) and ask for approval before fetching many sources. When using web sources include explicit URLs and access dates; flag paywalled or behind-auth sources and note contradictions or uncertainty.

## References & further reading

- Agent guidance:
    - `.opencode/agent/researcher.md` — researcher subagent behavior and output rules
    - `.opencode/agent/feature.md` — feature subagent guidance when research informs a feature
- Templates:
    - `.opencode/template/research-tmpl.yml` — canonical rendering schema for research outputs
    - `.opencode/template/feature-tmpl.yml` — feature spec schema (useful when research informs specs)
- Knowledge-base:
    - `.opencode/knowledge-base/opencode-templates.md` — template authoring guidance for agents
    - `.opencode/knowledge-base/opencode-commands.md` — how commands inject files and shell output into prompts
- Provenance best-practices: always include `URL`, `accessed` date, and a short note about source reliability.
