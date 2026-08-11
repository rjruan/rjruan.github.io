function renderDeepCaseStudy(project, renderPage, escapeHtml) {
  if (project.caseStudy) {
    return renderFeaturedCaseStudy(project, renderPage, escapeHtml);
  }

  return renderScaffoldCaseStudy(project, renderPage, escapeHtml);
}

function renderFeaturedCaseStudy(project, renderPage, escapeHtml) {
  const study = project.caseStudy;
  const sectionLinks = [
    ["question", "Question"],
    ["research", "Research"],
    ["insight", "Core insight"],
    ["system", "System model"],
    ["decisions", "Design decisions"],
    ["flows", "Key flows"],
    ["iteration", "Iteration"],
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
          <div class="case-cover-visual" role="img" aria-label="FamilyPulse cross-device concept preview">
            ${renderDevicePreview(escapeHtml)}
          </div>
          <dl class="case-fact-bar glass-surface">
            ${renderFact("Role", project.role, escapeHtml)}
            ${renderFact("Timeframe", project.year, escapeHtml)}
            ${renderFact("Project", project.context, escapeHtml)}
            ${renderFact("Scope", study.conceptLabel, escapeHtml)}
          </dl>
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
            <p>This project began with a personal question about my grandparent: how can technology offer meaningful support without making an older adult feel watched, labeled, or reduced to a health condition?</p>
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
          </section>

          <section id="research" class="case-section">
            ${renderSectionHeading("02", "What I researched—and what I could not claim", escapeHtml)}
            <p>${escapeHtml(study.research.intro)}</p>
            <ul class="method-grid" aria-label="Research and prototyping methods">
              ${study.research.methods.map((method) => `<li>${escapeHtml(method)}</li>`).join("")}
            </ul>
            <aside class="boundary-callout" aria-label="Research limitation">
              <p class="eyebrow">Evidence boundary</p>
              <p>${escapeHtml(study.research.limits)}</p>
            </aside>
          </section>

          <section id="insight" class="case-section case-insight">
            ${renderSectionHeading("03", "The core insight", escapeHtml)}
            <blockquote class="insight-quote">
              <p>${escapeHtml(study.insight.statement)}</p>
            </blockquote>
            <p>${escapeHtml(study.insight.body)}</p>
          </section>

          <section id="system" class="case-section">
            ${renderSectionHeading("04", "A support system with visible responsibility", escapeHtml)}
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
            ${renderSectionHeading("05", "Four decisions shaped the concept", escapeHtml)}
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
            ${renderSectionHeading("06", "The final concept connects four flows", escapeHtml)}
            <div class="flow-grid">
              ${study.flows.map((flow) => renderFlow(flow, escapeHtml)).join("")}
            </div>
            <div class="artifact-grid">
              ${study.media.slice(0, 3).map((item) => renderFigure(item, escapeHtml)).join("")}
            </div>
          </section>

          <section id="iteration" class="case-section">
            ${renderSectionHeading("07", "Prototype early enough to change the hierarchy", escapeHtml)}
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
          </section>

          <section class="case-section">
            ${renderSectionHeading("08", "A cross-device design language", escapeHtml)}
            <p>${escapeHtml(study.designSystem.body)}</p>
            <p class="principle-line">${escapeHtml(study.designSystem.principle)}</p>
            <div class="artifact-grid two-up">
              ${study.media.slice(3).map((item) => renderFigure(item, escapeHtml)).join("")}
            </div>
          </section>

          <section id="boundaries" class="case-section">
            ${renderSectionHeading("09", "Where the concept stops", escapeHtml)}
            <aside class="boundary-callout prominent" aria-label="Clinical and technical boundaries">
              <p class="eyebrow">Concept boundary</p>
              <ul>
                ${study.boundaries.map((boundary) => `<li>${escapeHtml(boundary)}</li>`).join("")}
              </ul>
            </aside>
          </section>

          <section id="next" class="case-section">
            ${renderSectionHeading("10", "What I would validate next", escapeHtml)}
            <p>The most important next step would not be visual polish. It would be participatory research with older adults.</p>
            <ul class="next-step-list">
              ${study.nextSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
            </ul>
          </section>

          <section id="reflection" class="case-section case-reflection">
            ${renderSectionHeading("11", "Reflection", escapeHtml)}
            <p>${escapeHtml(study.reflection)}</p>
          </section>
        </div>
      </div>
    </article>`
  });
}

function renderDevicePreview(escapeHtml) {
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
    ? `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy" width="780" height="960">`
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
