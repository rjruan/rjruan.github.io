---
name: ruby-portfolio
description: Maintain Ruby Ruan's bilingual UX portfolio with its shared design system, evidence boundaries, approved assets, review workflow, QA, privacy rules, and publication gates. Use for any request to write, design, build, inspect, review, merge, or publish this portfolio or one of its case studies.
---

# Ruby Portfolio

Route each task through the repository's compact context instead of loading the full historical handoff.

## Load only what applies

1. Read `AGENTS.md`, `docs/portfolio/index.md`, and `docs/portfolio/status.md`.
2. Use the index to read only the affected case file and, when relevant, `design-system.md` or `publishing.md`.
3. Inspect targeted source files and Git state. Do not load unrelated cases, generated outputs, the full Master Handoff, or long logs unless a real conflict or missing fact requires them.

## Choose the workflow

- Content or case layout: preserve the shared shell and edit only the routed case.
- Shared typography, header, footer, or global layout: use the design-system file and treat the approved homepage as the visual baseline.
- Review, push, merge, or publication: use the publishing file and require Ruby's explicit approval for each external mutation.
- Protected work: follow the generic protected-review security document and keep all private facts and assets out of public source/history.

## Decide about subagents automatically

Use one agent by default. A single subagent is appropriate only for a bounded, independent, read-heavy task whose raw output would pollute the main thread, such as an asset inventory, bilingual parity review, link/placeholder audit, or browser QA matrix. Do not delegate simple edits, ordinary builds, or user decisions. Do not allow overlapping edits. More than one subagent requires Ruby's explicit request.

## Finish compactly

Run relevant checks, summarize results rather than pasting logs, and state branch, commit, push, merge, and publication status separately. Update only `docs/portfolio/status.md` and the affected case file when their facts change. Use the external Master Handoff for milestone/archive updates, not as required startup context.
