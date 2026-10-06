# Portfolio review and publishing rules

## Default workflow

1. Inspect the current branch, working tree, recent commits, remote baseline, and build workflow.
2. Create an isolated review branch from the latest correct baseline.
3. Change only the requested case or shared system scope.
4. Build and run relevant static QA.
5. Provide a review version and distinguish local, pushed, merged, and published state.
6. Merge or publish only after Ruby explicitly approves that action.

## Minimum checks

Run checks that apply to the change and record anything unavailable as unverified:

- `npm run build:pages-root` before public publication so root and workflow output remain synchronized.
- `npm run build:review` for self-contained review artifacts when needed.
- `npm run check:links` for internal links.
- Syntax checks and `git diff --check` for changed scripts/templates.
- One `h1`, heading order, language, landmarks, skip link, focus, contrast, reduced motion, alt text, image dimensions, overflow, clipping, sticky collisions, and placeholders.
- English/Traditional Chinese route parity and reciprocal language links when a bilingual case is in scope.

Do not state that a browser size, external link, permission state, deployment, or public page passed unless it was actually checked.

## Content and privacy gates

- Never invent participants, methods, results, metrics, outcomes, medical claims, quotes, stakeholder details, or implementation status.
- Distinguish evidence, Ruby's interpretation, design decisions, limitations, and future questions.
- Do not present classroom concepts as launched products or informal testing as formal validation.
- Use only Ruby-supplied or repository-verified assets. Never generate, redraw, or substitute project evidence.
- Public pages must not contain `TBD`, placeholder/fallback imagery, blank evidence containers, or misleading claims.
- Every completed case study requires complete English and Traditional Chinese pages with aligned facts, evidence boundaries, hierarchy, approved assets, and QA standards.
- Never expose a Figma URL, regardless of its permission setting.
- The three existing Flood 50 Google Slides are the only approved public presentation links.
- Protected professional content, reviewer identities, credentials, plaintext, screenshots, and private source links must not enter the public repository or Git history. Follow `docs/protected-review-security.md` only after Ruby confirms sharing authority and scope.

## Release record

After an approved merge/publication, record the PR, full commit SHA, workflow result, public URL verification, remaining manual QA, and any cache-refresh note in `status.md`. Update the external Master Handoff only at meaningful milestones or when compact records cannot safely preserve the decision.
