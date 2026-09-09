function renderDeepCaseStudy(project, renderPage, escapeHtml) {
  if (project.caseStudy && project.caseStudy.variant === "protected") {
    return renderProtectedCaseStudy(project, renderPage, escapeHtml);
  }

  if (project.caseStudy && project.caseStudy.variant === "ssim") {
    return renderSsimCaseStudy(project, renderPage, escapeHtml);
  }

  if (project.caseStudy && project.caseStudy.variant === "snapshot") {
    return renderSnapshotCaseStudy(project, renderPage, escapeHtml);
  }

  if (project.caseStudy && project.caseStudy.variant === "flood-50") {
    return renderFlood50CaseStudy(project, renderPage, escapeHtml);
  }

  if (project.caseStudy) {
    return renderFeaturedCaseStudy(project, renderPage, escapeHtml);
  }

  return renderScaffoldCaseStudy(project, renderPage, escapeHtml);
}

function renderFlood50CaseStudy(project, renderPage, escapeHtml) {
  const study = project.caseStudy;
  const media = Object.fromEntries((study.media || []).map((item) => [item.id, item]));
  const sectionLinks = [
    ["brief", "The brief"],
    ["origin", "Where I entered"],
    ["listening", "Listening"],
    ["requirements", "Requirements"],
    ["concepts", "Two directions"],
    ["feedback", "Client feedback"],
    ["identity", "Final identity"],
    ["system", "Experience system"],
    ["education", "Learning in use"],
    ["outcome", "Outcome & limits"],
    ["reflection", "Reflection"],
    ["sources", "Source materials"]
  ];

  return renderPage({
    path: project.detailPath,
    title: project.title,
    description: project.summary,
    bodyClass: "flood-case",
    main: `<article class="flood-case-shell">
      <header class="flood-case-hero">
        <div class="section-inner flood-hero-grid">
          <div class="flood-hero-copy">
            <p class="eyebrow">${escapeHtml(project.type)} · ${escapeHtml(project.year)}</p>
            <h1>${escapeHtml(study.headline)}</h1>
            <p class="case-lede">${escapeHtml(study.lede)}</p>
            <div class="case-actions">
              <a class="button primary" href="${escapeHtml(study.sourceLinks[0].url)}" target="_blank" rel="noreferrer">${escapeHtml(study.sourceLinks[0].label)}</a>
              <a class="button secondary" href="#sources">Review source decks</a>
            </div>
          </div>
          <div class="flood-hero-mark">${renderFigure(media["final-logo"], escapeHtml)}</div>
          ${renderQuickFacts([
            ["Role", project.role],
            ["Team / client", `Team of 6 · ${project.client || "Madison County Library"}`],
            ["Duration", project.year],
            ["Methods", "Stakeholder interview · audience segmentation · concept exploration · client feedback"],
            ["Outcome", "Final proposal; not launched or measured"]
          ], escapeHtml)}
          ${project.clientUrl ? `<p class="flood-client-link"><span>Client website</span> <a href="${escapeHtml(project.clientUrl)}" target="_blank" rel="noreferrer">${escapeHtml(project.client || "Open client website")} <span aria-hidden="true">↗</span></a></p>` : ""}
        </div>
      </header>

      <div class="section-inner case-shell flood-shell">
        <nav class="case-nav glass-surface" aria-label="Flood 50 case study sections">
          <p class="eyebrow">On this expedition</p>
          <ol>
            ${sectionLinks
              .map(([id, label]) => `<li><a href="#${id}">${escapeHtml(label)}</a></li>`)
              .join("")}
          </ol>
        </nav>

        <div class="case-content flood-content">
          <section id="brief" class="case-section flood-intro-section">
            ${renderSectionHeading("01", "The assignment was bigger than a logo", escapeHtml)}
            <p>${escapeHtml(study.brief.intro)}</p>
            <ol class="flood-goal-list" aria-label="Client goals">
              ${study.brief.goals
                .map((goal, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(goal)}</strong></li>`)
                .join("")}
            </ol>
            <div class="flood-theme-line" aria-label="Themes from the client brief">
              ${study.brief.themes.map((theme) => `<p>${escapeHtml(theme)}</p>`).join("")}
            </div>
          </section>

          <section id="origin" class="case-section flood-origin-section">
            ${renderSectionHeading("02", study.personalOrigin.title, escapeHtml)}
            <div class="flood-origin-grid">
              <div class="flood-origin-image">${renderFigure(media["personal-origin"], escapeHtml)}</div>
              <div class="flood-origin-copy">
                <p class="eyebrow">My relationship to the question</p>
                <p>${escapeHtml(study.personalOrigin.body)}</p>
              </div>
            </div>
          </section>

          <section id="listening" class="case-section">
            ${renderSectionHeading("03", "We organized people by why they might care", escapeHtml)}
            <p>${escapeHtml(study.research.intro)}</p>
            <ul class="flood-method-list" aria-label="Research and proposal methods">
              ${study.research.methods.map((method) => `<li>${escapeHtml(method)}</li>`).join("")}
            </ul>
            <div class="flood-audience-list">
              ${study.research.audiences
                .map(
                  (audience, index) => `<article>
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <div><p class="eyebrow">${escapeHtml(audience.labels)}</p><h3>${escapeHtml(audience.name)}</h3><p>${escapeHtml(audience.need)}</p></div>
                  </article>`
                )
                .join("")}
            </div>
          </section>

          <section id="requirements" class="case-section">
            ${renderSectionHeading("04", "The brief became a system of requirements", escapeHtml)}
            <div class="flood-requirement-grid">
              <div>
                <p class="eyebrow">Must carry across the proposal</p>
                <ul>${study.requirements.mustHave.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </div>
              <div>
                <p class="eyebrow">Experience principles</p>
                <ul>${study.requirements.experiencePrinciples.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </div>
            </div>
          </section>

          <section id="concepts" class="case-section flood-concepts-section">
            ${renderSectionHeading("05", "Two directions tested two different stories", escapeHtml)}
            <div class="flood-concept-stack">
              ${study.concepts
                .map(
                  (concept, index) => `<article class="flood-concept">
                    <div class="flood-concept-copy">
                      <p class="eyebrow">Direction ${String(index + 1).padStart(2, "0")}</p>
                      <h3>${escapeHtml(concept.name)}</h3>
                      <p class="flood-concept-tagline">${escapeHtml(concept.tagline)}</p>
                      <p>${escapeHtml(concept.intent)}</p>
                    </div>
                    <div class="flood-concept-artifacts">
                      ${concept.media.map((assetId) => renderFigure(media[assetId], escapeHtml)).join("")}
                    </div>
                  </article>`
                )
                .join("")}
            </div>
          </section>

          <section id="feedback" class="case-section flood-feedback-section">
            ${renderSectionHeading("06", "The useful answer was between the two concepts", escapeHtml)}
            <p>${escapeHtml(study.feedback.intro)}</p>
            <ol class="flood-feedback-list">
              ${study.feedback.signals
                .map((signal, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(signal)}</p></li>`)
                .join("")}
            </ol>
            <blockquote><p>${escapeHtml(study.feedback.synthesis)}</p></blockquote>
          </section>

          <section id="identity" class="case-section flood-identity-section">
            ${renderSectionHeading("07", "The final identity became an invitation and a toolkit", escapeHtml)}
            <p>${escapeHtml(study.finalSystem.intro)}</p>
            <div class="flood-identity-pair">
              ${renderFigure(media["final-logo"], escapeHtml)}
              ${renderFigure(media["final-pattern"], escapeHtml)}
            </div>
            <ol class="flood-decision-list">
              ${study.finalSystem.decisions
                .map((decision, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(decision)}</p></li>`)
                .join("")}
            </ol>
          </section>

          <section id="system" class="case-section flood-system-section">
            ${renderSectionHeading("08", "One visual language, many ways to enter", escapeHtml)}
            <ul class="flood-deliverable-line" aria-label="Proposed deliverables">
              ${study.finalSystem.deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
            <div class="flood-gallery">
              <div class="flood-gallery-wide">${renderFigure(media["event-posters"], escapeHtml)}</div>
              ${renderFigure(media["memory-lane"], escapeHtml)}
              ${renderFigure(media["billboard"], escapeHtml)}
              <div class="flood-device-study flood-gallery-wide">
                ${renderFigure(media["website-desktop"], escapeHtml)}
                ${renderFigure(media["website-mobile"], escapeHtml)}
              </div>
              <div class="flood-gallery-wide">${renderFigure(media["community-mural"], escapeHtml)}</div>
              ${renderFigure(media["event-apparel"], escapeHtml)}
              ${renderFigure(media["postcard-kit"], escapeHtml)}
            </div>
          </section>

          <section id="education" class="case-section flood-education-section">
            ${renderSectionHeading("09", "A learning tool moved from proposal to use", escapeHtml)}
            <p>${escapeHtml(study.educationEvidence.intro)}</p>
            <div class="flood-evidence-triptych">
              ${[media["kid-activity-1"], media["kid-activity-2"], media["kid-activity-3"]]
                .map((item) => renderFigure(item, escapeHtml))
                .join("")}
            </div>
            <p>${escapeHtml(study.educationEvidence.followUp)}</p>
            <div class="flood-passport-pair">
              ${renderFigure(media["passport-closed"], escapeHtml)}
              ${renderFigure(media["passport-open"], escapeHtml)}
            </div>
          </section>

          <section id="outcome" class="case-section flood-outcome-section">
            ${renderSectionHeading("10", "What this work proves—and what it does not", escapeHtml)}
            <p>${escapeHtml(study.outcome)}</p>
            <aside class="boundary-callout prominent" aria-label="Flood 50 evidence boundaries">
              <p class="eyebrow">Evidence boundary</p>
              <ul>${study.boundaries.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </aside>
          </section>

          <section id="reflection" class="case-section flood-reflection-section">
            ${renderSectionHeading("11", "Reflection", escapeHtml)}
            <p>${escapeHtml(study.reflection)}</p>
          </section>

          <section id="sources" class="case-section flood-source-section">
            <p class="eyebrow">Source materials</p>
            <p>These links are the original materials behind the case study. They are included so the proposal, feedback, and final system can be reviewed without relying on my memory alone.</p>
            <ul>
              ${study.sourceLinks
                .map(
                  (link) => `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a></li>`
                )
                .join("")}
            </ul>
          </section>
        </div>
      </div>
    </article>`
  });
}

function renderSnapshotCaseStudy(project, renderPage, escapeHtml) {
  const study = project.caseStudy;
  const media = Object.fromEntries((study.media || []).map((item) => [item.id, item]));
  const sectionLinks = [
    ["question", "Question"],
    ["research", "Research"],
    ["landscape", "Competitive review"],
    ["persona", "Persona"],
    ["scenarios", "Scenarios"],
    ["concept", "Final concept"],
    ["iteration", "Iteration"],
    ["system", "Design system"],
    ["gaps", "Evidence gaps"],
    ["reflection", "Reflection"]
  ];

  return renderPage({
    path: project.detailPath,
    title: project.title,
    description: project.summary,
    bodyClass: "snapshot-case pen-pal-case",
    main: `<article class="snapshot-case-shell">
      <header class="snapshot-case-hero">
        <div class="section-inner snapshot-case-grid">
          <div class="snapshot-case-copy">
            <p class="eyebrow">${escapeHtml(project.type)} · ${escapeHtml(project.year)}</p>
            <p class="snapshot-wordmark" aria-hidden="true">Echo / PenPal</p>
            <h1>${escapeHtml(study.headline)}</h1>
            <p class="case-lede">${escapeHtml(study.lede)}</p>
            <div class="case-actions">
              ${(study.sourceLinks || [])
                .map(
                  (link, index) =>
                    `<a class="button ${index === 0 ? "primary" : "secondary"}" href="${escapeHtml(
                      link.url
                    )}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
                )
                .join("")}
            </div>
          </div>
          <div class="snapshot-case-visual">
            ${renderFigure(media.hero, escapeHtml)}
          </div>
          ${renderQuickFacts([
            ["Role", project.role],
            ["Team / context", "Solo · UX Design class"],
            ["Duration", project.year],
            ["Methods", "Exploratory conversations · competitive review · paper prototype · informal usability feedback"],
            ["Outcome", "Course concept; no measured outcome"]
          ], escapeHtml)}
        </div>
      </header>

      <div class="section-inner case-shell snapshot-shell">
        <nav class="case-nav glass-surface" aria-label="Echo PenPal case study sections">
          <p class="eyebrow">On this expedition</p>
          <ol>
            ${sectionLinks
              .map(([id, label]) => `<li><a href="#${id}">${escapeHtml(label)}</a></li>`)
              .join("")}
          </ol>
        </nav>

        <div class="case-content snapshot-content">
          <section id="question" class="case-section">
            ${renderSectionHeading("01", "Slower communication in a faster world", escapeHtml)}
            <p>${escapeHtml(study.question.origin)}</p>
            <blockquote><p>${escapeHtml(study.question.hmw)}</p></blockquote>
            <div class="snapshot-outcome-grid">
              <p class="eyebrow">Intended outcomes — not measured results</p>
              <ul>${study.question.intendedOutcomes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
          </section>

          <section id="research" class="case-section">
            ${renderSectionHeading("02", "What I heard and how I looked", escapeHtml)}
            <p>${escapeHtml(study.research.intro)}</p>
            <ul class="method-grid" aria-label="Echo PenPal research and prototyping methods">
              ${study.research.methods
                .map(
                  (method, index) => `<li><span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>${escapeHtml(method)}</li>`
                )
                .join("")}
            </ul>
            <div class="snapshot-signal-grid" aria-label="Qualitative research signals">
              ${study.research.signals
                .map(
                  (signal) => `<article><p class="eyebrow">${escapeHtml(signal.title)}</p><p>${escapeHtml(signal.body)}</p></article>`
                )
                .join("")}
            </div>
            <aside class="boundary-callout" aria-label="Research limitation">
              <p class="eyebrow">Evidence boundary</p>
              <p>${escapeHtml(study.research.limits)}</p>
            </aside>
          </section>

          <section id="landscape" class="case-section">
            ${renderSectionHeading("03", "Where existing pen-pal products helped—and where they broke down", escapeHtml)}
            <p>${escapeHtml(study.competitive.intro)}</p>
            <div class="snapshot-comparison">
              <article>
                <p class="eyebrow">Existing strengths</p>
                <ul>${study.competitive.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </article>
              <article>
                <p class="eyebrow">Observed gaps</p>
                <ul>${study.competitive.gaps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </article>
            </div>
            <div class="snapshot-artifact-wide">${renderFigure(media["competitive-analysis"], escapeHtml)}</div>
          </section>

          <section id="persona" class="case-section">
            ${renderSectionHeading("04", "A persona for the kind of connection I was designing toward", escapeHtml)}
            <div class="snapshot-persona">
              ${renderFigure(media.persona, escapeHtml)}
              <article class="snapshot-persona-copy">
                <p class="eyebrow">${escapeHtml(study.persona.label)}</p>
                <h3>${escapeHtml(study.persona.name)}</h3>
                <p class="snapshot-persona-meta">${escapeHtml(study.persona.epithet)} · Age ${escapeHtml(study.persona.age)} · ${escapeHtml(study.persona.location)}</p>
                <p>${escapeHtml(study.persona.background)}</p>
                <div class="snapshot-persona-lists">
                  <div><strong>Goals</strong><ul>${study.persona.goals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
                  <div><strong>Frustrations</strong><ul>${study.persona.frustrations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
                </div>
                <p class="evidence-note">${escapeHtml(study.persona.caveat)}</p>
              </article>
            </div>
          </section>

          <section id="scenarios" class="case-section">
            ${renderSectionHeading("05", "Three scenarios made the concept concrete", escapeHtml)}
            <div class="snapshot-scenario-grid">
              ${study.scenarios
                .map(
                  (scenario) => `<article><p class="eyebrow">Task ${escapeHtml(scenario.number)}</p><h3>${escapeHtml(scenario.title)}</h3><p>${escapeHtml(scenario.body)}</p></article>`
                )
                .join("")}
            </div>
            <div class="artifact-grid snapshot-wireframes">
              ${[media["wireframe-home"], media["wireframe-matches"], media["wireframe-letter"]]
                .map((item) => renderFigure(item, escapeHtml))
                .join("")}
            </div>
          </section>

          <section id="concept" class="case-section">
            ${renderSectionHeading("06", "The final concept connects matching, context, and letter writing", escapeHtml)}
            <div class="snapshot-flow-grid">
              ${study.flows
                .map(
                  (flow, index) => `<article><p class="eyebrow">Flow ${String(index + 1).padStart(2, "0")}</p><h3>${escapeHtml(flow.title)}</h3><p>${escapeHtml(flow.body)}</p></article>`
                )
                .join("")}
            </div>
            <div class="artifact-grid snapshot-final-grid">
              ${[media["final-preferences"], media["final-matches"], media["final-letter"]]
                .map((item) => renderFigure(item, escapeHtml))
                .join("")}
            </div>
          </section>

          <section id="iteration" class="case-section">
            ${renderSectionHeading("07", "What changed as the idea became easier to understand", escapeHtml)}
            <p>Because I did not retain a formal test log, I present these as design takeaways rather than measured improvements.</p>
            <ol class="snapshot-takeaway-list">
              ${study.iteration
                .map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(item)}</p></li>`)
                .join("")}
            </ol>
          </section>

          <section id="system" class="case-section">
            ${renderSectionHeading("08", "A small system for a growing concept", escapeHtml)}
            <p>${escapeHtml(study.designSystem.body)}</p>
            <dl class="snapshot-type-spec">
              ${renderFact("Typeface", study.designSystem.typeface, escapeHtml)}
              ${renderFact("Weights", study.designSystem.weights, escapeHtml)}
            </dl>
          </section>

          <section id="gaps" class="case-section">
            ${renderSectionHeading("09", "What the original project did not resolve", escapeHtml)}
            <p>These are not hidden weaknesses; they define what would need to be researched before this concept could become a responsible social product.</p>
            <aside class="boundary-callout prominent" aria-label="Echo PenPal evidence and product gaps">
              <p class="eyebrow">Open gaps</p>
              <ul>${study.boundaries.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </aside>
          </section>

          <section id="reflection" class="case-section snapshot-reflection">
            ${renderSectionHeading("10", "Reflection", escapeHtml)}
            <p>${escapeHtml(study.reflection)}</p>
          </section>
        </div>
      </div>
    </article>`
  });
}

function renderProtectedCaseStudy(project, renderPage, escapeHtml) {
  const study = project.caseStudy;

  return renderPage({
    path: project.detailPath,
    title: project.title,
    description: project.summary,
    bodyClass: "protected-case",
    main: `<article class="protected-case-shell">
      <header class="protected-case-hero">
        <div class="section-inner protected-case-grid">
          <div>
            <p class="eyebrow">${escapeHtml(project.type)} · ${escapeHtml(project.year)}</p>
            <h1>${escapeHtml(study.headline)}</h1>
            <p class="case-lede">${escapeHtml(study.lede)}</p>
          </div>
          <aside class="protected-case-notice" aria-label="Sharing status">
            <p class="eyebrow">Sharing status</p>
            <h2>Protected while approval is pending.</h2>
            <p>${escapeHtml(study.notice)}</p>
          </aside>
          ${renderQuickFacts([
            ["Role", project.role],
            ["Team / context", project.context],
            ["Duration", project.year],
            ["Methods", "Withheld pending approval"],
            ["Outcome", "Protected; no public outcome claimed"]
          ], escapeHtml, "protected-quick-facts")}
        </div>
      </header>
      <section class="content-band">
        <div class="section-inner protected-case-footer">
          <p>This question has a place in the portfolio now without presenting private material as public work.</p>
          <a class="text-link" href="/expeditions/">Return to all expeditions</a>
        </div>
      </section>
    </article>`
  });
}

function renderSsimCaseStudy(project, renderPage, escapeHtml) {
  const study = project.caseStudy;
  const media = Object.fromEntries(study.media.map((item) => [item.id, item]));
  const sectionLinks = [
    ["brief", "Project brief"],
    ["discovery", "Discovery"],
    ["research", "Research"],
    ["direction", "Design direction"],
    ["prototype", "Prototype & testing"],
    ["final", "Final design"],
    ["future-home", "What I’d rethink"],
    ["validate-next", "What I’d validate next"],
    ["reflection", "Reflection"]
  ];

  return renderPage({
    path: project.detailPath,
    title: project.title,
    description: project.summary,
    bodyClass: "featured-case ssim-case",
    main: `<article class="case-study">
      <header class="ssim-cover">
        <div class="section-inner ssim-cover-grid">
          <div class="ssim-cover-copy">
            <p class="eyebrow">${escapeHtml(project.type)} · ${escapeHtml(project.year)}</p>
            <button class="ssim-wordmark" type="button" aria-pressed="false" aria-label="Flip MISS backward to reveal SSIM" data-ssim-flip>
              <span class="ssim-wordmark-face ssim-wordmark-front" aria-hidden="true">MISS</span>
              <span class="ssim-wordmark-face ssim-wordmark-back" aria-hidden="true">SSIM</span>
            </button>
            <p class="ssim-flip-hint"><span aria-hidden="true">↻</span> Turn missing around</p>
            <h1>${escapeHtml(study.headline)}</h1>
            <p class="case-lede">${escapeHtml(study.lede)}</p>
            <div class="case-actions">
              ${(study.sourceLinks || [])
                .map(
                  (link, index) =>
                    `<a class="button ${index === 0 ? "primary" : "secondary"}" href="${escapeHtml(
                      link.url
                    )}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
                )
                .join("")}
            </div>
          </div>
          <div class="ssim-cover-visual">
            ${renderSsimMedia(media.hero, escapeHtml, { eager: true, compactCaption: true })}
          </div>
          ${renderQuickFacts([
            ["Role", project.role],
            ["Team / context", "Solo · independent project"],
            ["Duration", project.year],
            ["Methods", "Desk research · affinity synthesis · paper and digital prototyping · formative critique"],
            ["Outcome", "Figma concept; validation remains"]
          ], escapeHtml, "ssim-fact-bar")}
        </div>
      </header>

      <div class="section-inner case-shell ssim-shell">
        <nav class="case-nav ssim-case-nav" aria-label="SSIM case study sections">
          <p class="eyebrow">On this expedition</p>
          <ol>
            ${sectionLinks
              .map(([id, label]) => `<li><a href="#${id}">${escapeHtml(label)}</a></li>`)
              .join("")}
          </ol>
        </nav>

        <div class="case-content">
          <section id="brief" class="case-section ssim-brief">
            ${renderSectionHeading("01", "Project brief", escapeHtml)}
            ${study.brief.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
            <blockquote class="ssim-question">
              <p>${escapeHtml(study.question)}</p>
            </blockquote>
          </section>

          <section id="discovery" class="case-section">
            ${renderSectionHeading("02", "When objects disappear, what happens to the memories inside them?", escapeHtml)}
            <aside class="ssim-margin-note note-right" aria-label="Ruby's margin note">
              <span aria-hidden="true">↳</span> I wasn’t trying to build a better archive. I was trying to understand what still feels alive.
            </aside>
            ${study.discovery.body
              .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
              .join("")}
            <aside class="ssim-north-star" aria-label="Product north star">
              <p class="eyebrow">Product north star</p>
              <p>${escapeHtml(study.discovery.northStar)}</p>
            </aside>
          </section>

          <section id="research" class="case-section">
            ${renderSectionHeading("03", "Looking for the forms memory already takes", escapeHtml)}
            <p>${escapeHtml(study.research.intro)}</p>
            <p class="evidence-note">${escapeHtml(study.research.publicEvidenceNote)}</p>
${study.research.stats.length
              ? `<dl class="ssim-stat-grid" aria-label="Selected questionnaire response counts">
                  ${study.research.stats
                    .map(
                      (stat) => `<div><dt>${escapeHtml(stat.value)}</dt><dd>${escapeHtml(
                        stat.label
                      )}</dd></div>`
                    )
                    .join("")}
                </dl>`
              : ""}
            <div class="ssim-research-layout">
              <div>
                <p class="eyebrow">Methods</p>
                <ul class="method-grid ssim-method-grid">
                  ${study.research.methods
                    .map((method, index) => `<li><span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>${escapeHtml(method)}</li>`)
                    .join("")}
                </ul>
              </div>
              <aside class="boundary-callout ssim-boundary" aria-label="Research boundary">
                <p class="eyebrow">Evidence boundary</p>
                <p>${escapeHtml(study.research.limits)}</p>
              </aside>
            </div>
            <div class="ssim-insight-grid" aria-label="Five synthesized research themes">
              ${study.research.insights
                .map(
                  (insight, index) => `<article>
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(insight.title)}</h3>
                    <p>${escapeHtml(insight.body)}</p>
                  </article>`
                )
                .join("")}
            </div>
            <figure class="ssim-evidence-map" aria-labelledby="evidence-map-title">
              <figcaption>
                <p class="eyebrow">Evidence trail</p>
                <h3 id="evidence-map-title">How observations moved into the prototype</h3>
              </figcaption>
              <div class="evidence-routes">
                ${renderEvidenceRoute("01", "Fragmented memories", "Give memory multiple shapes", "Feed + Memo Board", escapeHtml)}
                ${renderEvidenceRoute("02", "The blank page felt difficult", "Lower the capture barrier", "Guided capture + Scan", escapeHtml)}
                ${renderEvidenceRoute("03", "Access changes what preservation means", "Make privacy visible", "Entry-level privacy; legacy model unresolved", escapeHtml)}
              </div>
            </figure>
          </section>

          <section id="direction" class="case-section">
            ${renderSectionHeading("04", "From evidence to design direction", escapeHtml)}
            <p>I translated the research themes into four design principles. The first three are visible in the final prototype; access and legacy permissions remained an emerging principle rather than a complete system.</p>
            <div class="decision-grid ssim-decision-grid">
              ${study.principles
                .map(
                  (principle) => `<article class="decision-card">
                    <p class="decision-number">${escapeHtml(principle.number)}</p>
                    <h3>${escapeHtml(principle.title)}</h3>
                    <p>${escapeHtml(principle.body)}</p>
                  </article>`
                )
                .join("")}
            </div>
          </section>

          <section id="prototype" class="case-section">
            ${renderSectionHeading("05", "Prototype early enough to expose the starting problem", escapeHtml)}
            <aside class="ssim-margin-note note-left" aria-label="Ruby's margin note">
              <span aria-hidden="true">↳</span> The most useful moment was not “they liked it.” It was watching someone look for a door I had failed to draw.
            </aside>
            <p>${escapeHtml(study.prototype.intro)}</p>
            <div class="ssim-process-media">
              ${renderSsimMedia(media.paper, escapeHtml)}
              ${renderSsimMedia(media.digital, escapeHtml)}
            </div>
            <p class="evidence-note">${escapeHtml(study.prototype.testingNote)}</p>
            <div class="ssim-testing-grid" aria-label="Usability observations and design responses">
              ${study.prototype.findings
                .map(
                  (finding, index) => `<article>
                    <p class="eyebrow">Observation ${String(index + 1).padStart(2, "0")}</p>
                    <h3>${escapeHtml(finding.observed)}</h3>
                    <p><strong>Design response:</strong> ${escapeHtml(finding.response)}</p>
                  </article>`
                )
                .join("")}
            </div>
          </section>

          <section id="final" class="case-section ssim-final">
            ${renderSectionHeading("06", "Four flows shaped the 2025 final concept", escapeHtml)}
            <p>The final deliverable was a Figma prototype. These screens communicate interaction direction; they are not evidence of a coded, launched, or validated product.</p>
            <div class="ssim-flow-list">
              ${study.flows
                .map((flow, index) => renderSsimFlow(flow, media[flow.mediaId], index, escapeHtml))
                .join("")}
            </div>
          </section>

          <section id="future-home" class="case-section">
            ${renderSectionHeading("07", "What I would rethink now: begin with the person", escapeHtml)}
            <div class="ssim-home-reflection">
              <article>
                <p class="eyebrow">Original 2025 home</p>
                <p>${escapeHtml(study.homeReflection.original)}</p>
              </article>
              <article>
                <p class="eyebrow">Next-version reflection</p>
                <p>${escapeHtml(study.homeReflection.future)}</p>
              </article>
            </div>
            <p class="ssim-reflection-note">${escapeHtml(study.homeReflection.reason)}</p>
          </section>

          <section id="validate-next" class="case-section">
            ${renderSectionHeading("08", "What I would validate next", escapeHtml)}
            <ul class="next-step-list ssim-next-steps">
              ${study.nextSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
            </ul>
          </section>

          <section id="reflection" class="case-section case-reflection ssim-reflection">
            ${renderSectionHeading("09", "Preservation is also a responsibility", escapeHtml)}
            <p>${escapeHtml(study.reflection)}</p>
            <p class="ssim-whisper"><span aria-hidden="true">P.S.</span> I still think a recipe can be a time machine.</p>
          </section>
        </div>
      </div>
    </article>
    <script>
      (() => {
        const flip = document.querySelector('[data-ssim-flip]');
        if (!flip) return;
        flip.addEventListener('click', () => {
          const active = flip.getAttribute('aria-pressed') !== 'true';
          flip.setAttribute('aria-pressed', String(active));
          flip.setAttribute('aria-label', active ? 'Flip SSIM back to MISS' : 'Flip MISS backward to reveal SSIM');
        });
      })();
    </script>`
  });
}

function renderEvidenceRoute(number, evidence, principle, outcome, escapeHtml) {
  return `<article class="evidence-route">
    <span class="route-number">${escapeHtml(number)}</span>
    <div><small>Observed</small><strong>${escapeHtml(evidence)}</strong></div>
    <span class="route-arrow" aria-hidden="true">→</span>
    <div><small>Principle</small><strong>${escapeHtml(principle)}</strong></div>
    <span class="route-arrow" aria-hidden="true">→</span>
    <div><small>Design response</small><strong>${escapeHtml(outcome)}</strong></div>
  </article>`;
}

function renderSsimMedia(item, escapeHtml, options = {}) {
  const loading = options.eager ? 'fetchpriority="high"' : 'loading="lazy"';
  const captionClass = options.compactCaption ? " compact" : "";

  const hasNote = Boolean(item.note);
  const note = hasNote
    ? `<details class="ssim-observation">
        <summary>Ruby noticed</summary>
        <p class="ssim-observation-note">${escapeHtml(item.note)}</p>
      </details>`
    : "";

  const visual = item.src
    ? `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" width="${escapeHtml(
        item.width
      )}" height="${escapeHtml(item.height)}" ${loading}>`
    : `<div class="ssim-withheld-artifact" role="img" aria-label="${escapeHtml(
        item.alt
      )}"><span>Research artifact withheld</span></div>`;

  return `<figure class="ssim-media${captionClass}${hasNote ? " has-observation" : ""}" data-asset-id="${escapeHtml(item.id)}">
    ${visual}
    ${note}
    <figcaption><strong>${escapeHtml(item.title)}</strong>${escapeHtml(item.caption)}</figcaption>
  </figure>`;
}

function renderSsimFlow(flow, media, index, escapeHtml) {
  return `<article class="ssim-flow">
    <div class="ssim-flow-copy">
      <p class="eyebrow">Flow ${String(index + 1).padStart(2, "0")}</p>
      <h3>${escapeHtml(flow.title)}</h3>
      <p class="ssim-flow-need">${escapeHtml(flow.need)}</p>
      <p>${escapeHtml(flow.body)}</p>
      <p class="evidence-note"><strong>Boundary:</strong> ${escapeHtml(flow.boundary)}</p>
    </div>
    ${renderSsimMedia(media, escapeHtml, { compactCaption: true })}
  </article>`;
}

function renderFeaturedCaseStudy(project, renderPage, escapeHtml) {
  const study = project.caseStudy;
  const media = Object.fromEntries(study.media.map((item) => [item.id, item]));
  const sectionLinks = [
    ["question", "Question"],
    ["research", "Research"],
    ["people", "People & needs"],
    ["insight", "Core insight"],
    ["system", "System model"],
    ["decisions", "Design decisions"],
    ["flows", "Scenarios & flows"],
    ["iteration", "Iteration"],
    ["language", "Design language"],
    ["boundaries", "Clinical boundaries"],
    ["next", "What I’d validate next"],
    ["reflection", "Reflection"]
  ];

  return renderPage({
    path: project.detailPath,
    title: project.title,
    description: project.summary,
    bodyClass: "featured-case family-pulse-case",
    main: `<article class="case-study">
      <header class="case-cover">
        <div class="section-inner case-cover-grid">
          <div class="case-cover-copy">
            <p class="eyebrow">${escapeHtml(project.type)} · ${escapeHtml(project.year)}</p>
            <h1>${escapeHtml(project.title)}</h1>
            <p class="case-headline">${escapeHtml(study.headline)}</p>
            <p class="case-lede">${escapeHtml(study.lede)}</p>
            <div class="case-actions">
              ${study.sourceLinks
                .map(
                  (link, index) =>
                    `<a class="button ${index === 0 ? "primary" : "secondary"}" href="${escapeHtml(
                      link.url
                    )}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
                )
                .join("")}
            </div>
          </div>
          <div class="case-cover-visual">
            ${renderDevicePreview(media["hero-cross-device"], escapeHtml)}
          </div>
          ${renderQuickFacts([
            ["Role", project.role],
            ["Team / context", "Solo · UX Design class"],
            ["Duration", project.year],
            ["Methods", "Competitive review · informal conversations · paper prototype · classroom critique"],
            ["Outcome", "Exploratory concept; no measured outcome"]
          ], escapeHtml, "glass-surface")}
        </div>
      </header>

      <div class="section-inner case-shell">
        <nav class="case-nav glass-surface" aria-label="FamilyPulse case study sections">
          <p class="eyebrow">On this expedition</p>
          <ol>
            ${sectionLinks
              .map(([id, label]) => `<li><a href="#${id}">${escapeHtml(label)}</a></li>`)
              .join("")}
          </ol>
        </nav>

        <div class="case-content">
          <section id="question" class="case-section case-question">
            ${renderSectionHeading("01", "The question behind the project", escapeHtml)}
            <p>This project began in a UX Design class, where I could choose a problem to investigate. I thought about my grandparent falling in a bathroom in Taiwan, the difficult change that followed surgery, and what I had heard repeatedly: for many older adults, a fall can threaten not only health, but independence.</p>
            <p>I did not define success through a clinical outcome or a formal usability benchmark. For this classroom concept, my working goal was to make urgent help, recent-status review, advisor sharing, and family communication easier to find while protecting the older adult’s sense of dignity.</p>
            <div class="stat-callout">
              <p class="stat-value">${escapeHtml(study.stat.value)}</p>
              <div>
                <p>${escapeHtml(study.stat.body)}</p>
                <a href="${escapeHtml(study.stat.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(
                  study.stat.sourceLabel
                )}</a>
              </div>
            </div>
            <blockquote>
              <p>How might we help older adults and their families recognize concerning changes, communicate easily, and respond to urgent situations while helping older adults feel respected and independent?</p>
            </blockquote>
            <div class="family-origin-artifact">
              ${renderFigure(media["vivi-character"], escapeHtml)}
            </div>
          </section>

          <section id="research" class="case-section">
            ${renderSectionHeading("02", "What I researched—and what I could not claim", escapeHtml)}
            <p>${escapeHtml(study.research.intro)}</p>
            <ul class="method-grid" aria-label="Research and prototyping methods">
              ${study.research.methods
                .map((method, index) => `<li><span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>${escapeHtml(method)}</li>`)
                .join("")}
            </ul>
            <div class="research-finding-list">
              ${study.research.findings
                .map(
                  (finding, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(finding)}</p></article>`
                )
                .join("")}
            </div>
            <div class="artifact-grid two-up family-research-artifacts">
              ${[media["competitive-review"], media["dignity-framing"]]
                .map((item) => renderFigure(item, escapeHtml))
                .join("")}
            </div>
            <aside class="boundary-callout" aria-label="Research limitation">
              <p class="eyebrow">Evidence boundary</p>
              <p>${escapeHtml(study.research.limits)}</p>
            </aside>
          </section>

          <section id="people" class="case-section">
            ${renderSectionHeading("03", "Two people needed support without losing agency", escapeHtml)}
            <p>The concept serves two related experiences, but it does not treat one person as the owner and the other as a data source.</p>
            <div class="audience-grid">
              ${study.audiences
                .map(
                  (audience) => `<article><p class="eyebrow">Audience</p><h3>${escapeHtml(audience.title)}</h3><p>${escapeHtml(audience.context)}</p><ul>${audience.needs.map((need) => `<li>${escapeHtml(need)}</li>`).join("")}</ul></article>`
                )
                .join("")}
            </div>
            <div class="design-goals">
              <p class="eyebrow">Design goals — not measured outcomes</p>
              <ol>${study.designGoals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}</ol>
            </div>
          </section>

          <section id="insight" class="case-section case-insight">
            ${renderSectionHeading("04", "The core insight", escapeHtml)}
            <div class="family-insight-layout">
              <div>
                <blockquote class="insight-quote"><p>${escapeHtml(study.insight.statement)}</p></blockquote>
                <p>${escapeHtml(study.insight.body)}</p>
              </div>
              ${renderFigure(media["concept-map"], escapeHtml)}
            </div>
          </section>

          <section id="system" class="case-section">
            ${renderSectionHeading("05", "A support system with visible responsibility", escapeHtml)}
            <p>FamilyPulse pairs two interfaces with people who retain distinct choices and responsibilities. The diagram is a concept model, not a claim that every integration is technically or clinically validated.</p>
            <ol class="system-model" aria-label="FamilyPulse concept system">
              ${study.systemNodes
                .map(
                  (node, index) => `<li>
                    <span class="system-index">${String(index + 1).padStart(2, "0")}</span>
                    <strong>${escapeHtml(node.label)}</strong>
                    <span>${escapeHtml(node.detail)}</span>
                  </li>`
                )
                .join("")}
            </ol>
          </section>

          <section id="decisions" class="case-section">
            ${renderSectionHeading("06", "Five decisions shaped the concept", escapeHtml)}
            <div class="decision-grid">
              ${study.decisions
                .map(
                  (decision) => `<article class="decision-card">
                    <p class="decision-number">${escapeHtml(decision.number)}</p>
                    <h3>${escapeHtml(decision.title)}</h3>
                    <p>${escapeHtml(decision.body)}</p>
                  </article>`
                )
                .join("")}
            </div>
          </section>

          <section id="flows" class="case-section">
            ${renderSectionHeading("07", "Scenarios connected the two sides of care", escapeHtml)}
            <p>These scenarios were design prompts, not records of real participants completing the tasks.</p>
            <div class="family-scenario-grid">
              ${study.scenarios
                .map(
                  (scenario) => `<article><p class="eyebrow">${escapeHtml(scenario.audience)}</p><h3>${escapeHtml(scenario.title)}</h3><p>${escapeHtml(scenario.body)}</p></article>`
                )
                .join("")}
            </div>
            <h3 class="case-subheading">Four concept flows</h3>
            <div class="flow-grid">
              ${study.flows.map((flow) => renderFlow(flow, escapeHtml)).join("")}
            </div>
            <div class="artifact-grid two-up">
              ${[media["status-home"], media["analysis-history"], media["family-chat"], media["reminder-setup"]]
                .map((item) => renderFigure(item, escapeHtml))
                .join("")}
            </div>
          </section>

          <section id="iteration" class="case-section">
            ${renderSectionHeading("08", "Prototype early enough to change the hierarchy", escapeHtml)}
            <div class="iteration-grid">
              <article>
                <p class="eyebrow">What surfaced</p>
                <p>${escapeHtml(study.iteration.before)}</p>
              </article>
              <article>
                <p class="eyebrow">Design response</p>
                <p>${escapeHtml(study.iteration.after)}</p>
              </article>
            </div>
            <p class="evidence-note">${escapeHtml(study.iteration.caveat)}</p>
            <div class="artifact-grid family-process-grid">
              ${[media["paper-prototype"], media["lowfi-watch"], media["lowfi-phone"]]
                .map((item) => renderFigure(item, escapeHtml))
                .join("")}
            </div>
          </section>

          <section id="language" class="case-section">
            ${renderSectionHeading("09", "A cross-device design language", escapeHtml)}
            <p>${escapeHtml(study.designSystem.body)}</p>
            <p class="principle-line">${escapeHtml(study.designSystem.principle)}</p>
            <div class="artifact-grid two-up">
              ${[media["watch-design-system"], media["phone-design-system"]]
                .map((item) => renderFigure(item, escapeHtml))
                .join("")}
            </div>
          </section>

          <section id="boundaries" class="case-section">
            ${renderSectionHeading("10", "Where the concept stops", escapeHtml)}
            <aside class="boundary-callout prominent" aria-label="Clinical and technical boundaries">
              <p class="eyebrow">Concept boundary</p>
              <ul>
                ${study.boundaries.map((boundary) => `<li>${escapeHtml(boundary)}</li>`).join("")}
              </ul>
            </aside>
          </section>

          <section id="next" class="case-section">
            ${renderSectionHeading("11", "What I would validate next", escapeHtml)}
            <p>The most important next step would not be visual polish. It would be participatory research with older adults.</p>
            <ul class="next-step-list">
              ${study.nextSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
            </ul>
          </section>

          <section id="reflection" class="case-section case-reflection">
            ${renderSectionHeading("12", "Reflection", escapeHtml)}
            <p>${escapeHtml(study.reflection)}</p>
          </section>
        </div>
      </div>
    </article>`
  });
}

function renderDevicePreview(item, escapeHtml) {
  if (item && item.src) {
    return `<figure class="case-cover-figure" data-asset-id="${escapeHtml(item.id)}">
      <img class="case-cover-image" src="${escapeHtml(item.src)}" alt="${escapeHtml(
        item.alt
      )}" width="${escapeHtml(item.width || 2048)}" height="${escapeHtml(
        item.height || 1306
      )}" fetchpriority="high">
      <figcaption>${escapeHtml(item.caption)}</figcaption>
    </figure>`;
  }

  return `<div class="device-stage" aria-hidden="true">
    <div class="device phone-device">
      <div class="phone-island"></div>
      <div class="pulse-mark">Family<span>Pulse</span></div>
      <div class="phone-waves"></div>
    </div>
    <div class="device watch-device">
      <div class="watch-crown"></div>
      <span class="watch-label">SOS</span>
      <strong>911</strong>
      <span class="watch-time">00:01</span>
      <span class="watch-end">●</span>
    </div>
    <p>${escapeHtml("Concept preview — selected Figma export queued")}</p>
  </div>`;
}

function renderFact(label, value, escapeHtml) {
  return `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function renderQuickFacts(facts, escapeHtml, extraClass = "") {
  return `<dl class="case-fact-bar case-quick-facts ${extraClass}" aria-label="Quick project facts">
    ${facts.map(([label, value]) => renderFact(label, value, escapeHtml)).join("")}
  </dl>`;
}

function renderSectionHeading(number, title, escapeHtml) {
  return `<div class="case-section-heading"><span>${escapeHtml(number)}</span><h2>${escapeHtml(title)}</h2></div>`;
}

function renderFlow(flow, escapeHtml) {
  return `<article class="flow-card">
    <h3>${escapeHtml(flow.title)}</h3>
    <ol>
      ${flow.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
    </ol>
  </article>`;
}

function renderFigure(item, escapeHtml) {
  const visual = item.src
    ? `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy" width="${escapeHtml(
        item.width || 780
      )}" height="${escapeHtml(item.height || 1688)}">`
    : `<div class="artifact-fallback" role="img" aria-label="${escapeHtml(item.alt)}">
        <span>Selected artifact</span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>Figma node ${escapeHtml(item.nodeId)}</small>
      </div>`;

  return `<figure class="case-figure" data-asset-id="${escapeHtml(item.id)}" data-asset-state="${
    item.src ? "ready" : "pending"
  }">
    ${visual}
    <figcaption><strong>${escapeHtml(item.title)}</strong>${escapeHtml(item.caption)}</figcaption>
  </figure>`;
}

function renderScaffoldCaseStudy(project, renderPage, escapeHtml) {
  const sectionOrder = [
    ["Overview", project.sections.overview],
    ["Context and Constraints", project.sections.context],
    ["Problem or Research Question", project.sections.question],
    ["Role and Collaborators", project.sections.role],
    ["Evidence and Observations", project.sections.evidence],
    ["Process and Exploration", project.sections.process],
    ["Key Decisions", project.sections.decisions],
    ["Outcome or Current State", project.sections.outcome],
    ["Reflection", project.sections.reflection]
  ];

  return renderPage({
    path: project.detailPath,
    title: project.title,
    description: project.summary,
    main: `<section class="case-hero">
      <div class="section-inner case-hero-grid">
        <div>
          <p class="eyebrow">${escapeHtml(project.type)}</p>
          <h1>${escapeHtml(project.title)}</h1>
          <p>${escapeHtml(project.inquiry)}</p>
        </div>
        <aside class="case-summary glass-surface" aria-label="Case study metadata">
          <dl>
            ${renderFact("Portfolio role", project.portfolioRole, escapeHtml)}
            ${renderFact("Role", project.role, escapeHtml)}
            ${renderFact("Context", `${project.context} / ${project.year}`, escapeHtml)}
            ${renderFact("Status", project.status, escapeHtml)}
          </dl>
        </aside>
      </div>
    </section>
    <section class="content-band">
      <div class="section-inner case-layout">
        <nav class="case-nav glass-surface" aria-label="Case study sections">
          <p class="eyebrow">Case template</p>
          <ol>
            ${sectionOrder
              .map(([title]) => `<li><a href="#${slugify(title)}">${escapeHtml(title)}</a></li>`)
              .join("")}
            <li><a href="#open-questions">Open questions or next steps</a></li>
          </ol>
        </nav>
        <div class="case-sections">
          ${sectionOrder
            .map(
              ([title, body]) => `<section id="${slugify(title)}" class="case-section">
                <p class="eyebrow">${escapeHtml(title)}</p>
                <p>${escapeHtml(body)}</p>
              </section>`
            )
            .join("")}
          <section id="open-questions" class="case-section">
            <p class="eyebrow">Open questions or next steps</p>
            <ul class="question-list">
              ${project.sections.openQuestions
                .map((question) => `<li>${escapeHtml(question)}</li>`)
                .join("")}
            </ul>
          </section>
        </div>
      </div>
    </section>`
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

module.exports = {
  renderDeepCaseStudy
};
