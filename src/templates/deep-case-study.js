function renderDeepCaseStudy(project, renderPage, escapeHtml) {
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
        <aside class="case-summary" aria-label="Case study metadata">
          <dl>
            <div>
              <dt>Portfolio role</dt>
              <dd>${escapeHtml(project.portfolioRole)}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>${escapeHtml(project.role)}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>${escapeHtml(project.context)} / ${escapeHtml(project.year)}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>${escapeHtml(project.status)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
    <section class="content-band">
      <div class="section-inner case-layout">
        <nav class="case-nav" aria-label="Case study sections">
          <p class="eyebrow">Case Template</p>
          <ol>
            ${sectionOrder
              .map(
                ([title]) =>
                  `<li><a href="#${slugify(title)}">${escapeHtml(title)}</a></li>`
              )
              .join("")}
            <li><a href="#open-questions">Open Questions or Next Steps</a></li>
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
            <p class="eyebrow">Open Questions or Next Steps</p>
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
