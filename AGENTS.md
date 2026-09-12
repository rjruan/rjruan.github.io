# Ruby Portfolio Agent Guide

Use the project skill at `.codex/skills/ruby-portfolio/SKILL.md` for portfolio content, design-system, QA, review, merge, or publication work. The user may describe the task naturally; do not require them to name the skill or decide whether a subagent is needed.

## Context budget

- Start with `docs/portfolio/index.md` and `docs/portfolio/status.md`.
- Read only the design, publishing, or case file routed by the current task.
- Do not load the full Master Handoff, unrelated case files, old chat transcripts, or long command output unless a conflict or missing fact makes them necessary.
- Treat repository source and the routed compact docs as operational truth. The full Master Handoff is an archive and escalation source, not required startup reading.
- Prefer targeted `rg`, bounded file reads, and summarized command results.

## Authority and safety

- Work on a new review branch from the latest verified remote baseline.
- Never merge, push to `master`, publish, delete material, or expose a private link without Ruby's explicit instruction for that action.
- Never invent research facts, participant counts, outcomes, metrics, medical claims, project images, quotes, or implementation status.
- Use only Ruby-supplied or repository-verified project assets. Do not generate or redraw evidence imagery.
- Never publish Figma URLs. The only approved public presentation links are the three Flood 50 Google Slides already recorded in source.
- Every completed case study ultimately needs a full English version and a full Traditional Chinese version, with aligned facts and evidence boundaries rather than a summary-only translation.
- Protected professional work stays outside public source and history unless written sharing scope and the selected access-control workflow explicitly permit it.

## Agent routing

Default to one agent. A single subagent may be used automatically when a bounded, independent, read-heavy task would otherwise flood the main chat, such as asset inventory, bilingual consistency review, link/placeholder audit, or a browser QA matrix. Do not delegate simple edits, one-file changes, ordinary builds, or decisions that require Ruby. Do not let parallel agents edit overlapping files. Return only a compact evidence summary to the main thread. Use more than one subagent only when Ruby explicitly asks for parallel work.

## Completion

Run only the checks relevant to the change, report unrun checks honestly, and update `docs/portfolio/status.md` plus the affected case file when state or decisions change. Keep branch, commit, push, merge, and publication states distinct.
