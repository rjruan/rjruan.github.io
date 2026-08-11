const {
  site,
  navigation,
  profile,
  workingMethods,
  inquiries,
  projects,
  fieldNotes,
  galleryItems,
  resume
} = require("../content/site-data");
const { renderDeepCaseStudy } = require("./deep-case-study");
const { renderMediumProjectTemplate } = require("./medium-project");
const { renderFieldNote, renderFieldNoteTemplate } = require("./field-note");
const { renderGalleryTemplate } = require("./gallery-item");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function pageTitle(title) {
  return title === site.name ? site.title : `${title} | ${site.name}`;
}

function navMarkup(currentPath) {
  return navigation
    .map((item) => {
      const current =
        currentPath === item.path ||
        (item.path !== "/" && currentPath.startsWith(item.path));
      const aria = current ? ' aria-current="page"' : "";
      return `<a class="nav-link" href="${item.path}"${aria}>${escapeHtml(
        item.label
      )}</a>`;
    })
    .join("");
}

function renderPage({ path, title, description, main, bodyClass = "" }) {
  const classes = bodyClass ? ` class="${bodyClass}"` : "";
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(pageTitle(title))}</title>
    <meta name="description" content="${escapeHtml(description || site.description)}">
    <meta property="og:title" content="${escapeHtml(pageTitle(title))}">
    <meta property="og:description" content="${escapeHtml(description || site.description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${site.url}${path === "/" ? "/" : path}">
    <meta name="theme-color" content="#f4f7fb">
    <link rel="canonical" href="${site.url}${path === "/" ? "/" : path}">
    <link rel="stylesheet" href="/assets/styles.css">
  </head>
  <body${classes}>
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header">
      <div class="site-header-inner glass-surface">
        <a class="site-mark" href="/" aria-label="Ruby Ruan portfolio home">
          <span class="site-mark-dot" aria-hidden="true"></span>
          <span>
            <span class="site-mark-kicker">Field Notes</span>
            <span>${escapeHtml(site.name)}</span>
          </span>
        </a>
        <nav class="primary-nav" aria-label="Primary navigation">
          ${navMarkup(path)}
        </nav>
      </div>
    </header>
    <main id="main">
      ${main}
    </main>
    ${renderFooter()}
  </body>
</html>
`;
}

function renderFooter() {
  return `<footer class="site-footer">
    <div class="section-inner footer-grid">
      <div>
        <p class="eyebrow">Ongoing record</p>
        <p>${escapeHtml(
          "Designed as an extensible coded portfolio for projects, research notes, visual work, and future case studies."
        )}</p>
      </div>
      <div>
        <p class="eyebrow">Contact</p>
        <p>Email: ${escapeHtml(site.contact.email)}</p>
        <p>LinkedIn: ${escapeHtml(site.contact.linkedin)}</p>
      </div>
    </div>
  </footer>`;
}

function renderHero() {
  return `<section class="hero-band">
    <div class="section-inner hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Base Camp - Home</p>
        <h1>${escapeHtml(profile.positioning)}</h1>
        <p class="hero-lede">${escapeHtml(profile.supportingCopy)}</p>
        <div class="hero-actions">
          <a class="button primary" href="/expeditions/">View Expeditions</a>
          <a class="button secondary" href="/field-notes/">Read Field Notes</a>
        </div>
      </div>
      <aside class="field-log" aria-label="Portfolio orientation notes">
        <div class="field-log-topline">
          <span>Observer log</span>
          <span>v0.1</span>
        </div>
        <dl>
          <div>
            <dt>Current role</dt>
            <dd>${escapeHtml(profile.currentRole)}</dd>
          </div>
          <div>
            <dt>Lens</dt>
            <dd>UX, HCI, Human Factors, accessibility</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>Research-oriented digital field notes</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>`;
}

function tagsMarkup(tags) {
  return `<ul class="tag-list">${tags
    .map((tag) => `<li>${escapeHtml(tag)}</li>`)
    .join("")}</ul>`;
}

function projectCard(project, options = {}) {
  const compact = options.compact ? " compact" : "";
  const status = project.detailPath
    ? `<a class="text-link" href="${project.detailPath}">Open case study</a>`
    : `<span class="muted">${escapeHtml(project.availability)}</span>`;
  const content = `<article class="project-card${compact}">
    ${renderProjectVisual(project)}
    <div class="project-card-body">
      <div class="meta-row">
        <span>${escapeHtml(project.type)}</span>
        <span>${escapeHtml(project.status)}</span>
      </div>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.inquiry)}</p>
      <dl class="project-facts">
        <div>
          <dt>Role</dt>
          <dd>${escapeHtml(project.role)}</dd>
        </div>
        <div>
          <dt>Context</dt>
          <dd>${escapeHtml(project.context)} / ${escapeHtml(project.year)}</dd>
        </div>
      </dl>
      ${tagsMarkup(project.themes)}
      <p class="card-action">${status}</p>
    </div>
  </article>`;

  return content;
}

function renderProjectVisual(project) {
  if (project.visualStyle === "family-pulse") {
    return `<div class="project-visual family-pulse-visual" role="img" aria-label="${escapeHtml(
      project.visualLabel
    )}">
      <div class="mini-phone"><span>82</span></div>
      <div class="mini-watch"><span>SOS</span></div>
      <p>${escapeHtml(project.visualLabel)}</p>
    </div>`;
  }

  return `<div class="project-visual" role="img" aria-label="${escapeHtml(
    project.visualLabel
  )}"><span>${escapeHtml(project.visualLabel)}</span></div>`;
}

function renderSelectedExpeditions() {
  const selected = projects.slice(0, 3);
  return `<section class="content-band">
    <div class="section-inner">
      <div class="section-heading">
        <p class="eyebrow">Selected Expeditions</p>
        <h2>Three positions for deeper case-study work.</h2>
        <p>Each card establishes a portfolio role while protecting unknown, incomplete, or confidential details.</p>
      </div>
      <div class="project-grid">
        ${selected.map((project) => projectCard(project)).join("")}
      </div>
    </div>
  </section>`;
}

function renderWorkingMethods() {
  return `<section class="content-band alternate">
    <div class="section-inner split-layout">
      <div class="section-heading">
        <p class="eyebrow">How Ruby Observes and Works</p>
        <h2>Field notes before polish.</h2>
        <p>${escapeHtml(profile.trajectory)}</p>
      </div>
      <div class="method-list">
        ${workingMethods
          .map(
            (method, index) => `<article class="method-item">
              <span class="method-index">${String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>${escapeHtml(method.title)}</h3>
                <p>${escapeHtml(method.detail)}</p>
              </div>
            </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function renderInquiries() {
  return `<section class="content-band">
    <div class="section-inner">
      <div class="section-heading">
        <p class="eyebrow">Current Inquiries</p>
        <h2>Questions to carry across projects.</h2>
      </div>
      <div class="inquiry-grid">
        ${inquiries
          .map(
            (inquiry) => `<article class="inquiry-card">
              <p>${escapeHtml(inquiry)}</p>
            </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function renderTrajectory() {
  return `<section class="content-band alternate">
    <div class="section-inner note-panel">
      <p class="eyebrow">Interdisciplinary Trajectory</p>
      <h2>Graphic design, philosophy, and web development as one working practice.</h2>
      <p>Ruby's portfolio should make room for visual craft, critical questioning, research curiosity, and implementation. This first skeleton uses TBD markers wherever final content still needs verification.</p>
    </div>
  </section>`;
}

function renderHomePage() {
  return renderPage({
    path: "/",
    title: "Base Camp - Home",
    description: site.description,
    bodyClass: "home",
    main: `${renderHero()}${renderSelectedExpeditions()}${renderWorkingMethods()}${renderInquiries()}${renderTrajectory()}`
  });
}

function renderExpeditionsPage() {
  const deep = projects.filter((project) => project.type.includes("Deep"));
  const medium = projects.filter((project) => project.type === "Medium project");
  return renderPage({
    path: "/expeditions/",
    title: "Expeditions - Projects and Case Studies",
    description:
      "Projects, case studies, experiments, and visual work from Ruby Ruan.",
    main: `<section class="page-hero">
        <div class="section-inner">
          <p class="eyebrow">Expeditions - Projects and Case Studies</p>
          <h1>Projects as investigations into people, systems, constraints, and designed agency.</h1>
          <p>Expeditions replaces a conventional projects page with a hub for deep case studies, medium projects, independent experiments, and graphic-design gallery items.</p>
        </div>
      </section>
      <section class="content-band">
        <div class="section-inner">
          <div class="section-heading">
            <p class="eyebrow">Deep Case Studies</p>
            <h2>Research thinking, making, and professional systems.</h2>
          </div>
          <div class="project-grid">
            ${deep.map((project) => projectCard(project)).join("")}
          </div>
        </div>
      </section>
      <section class="content-band alternate">
        <div class="section-inner">
          <div class="section-heading">
            <p class="eyebrow">Medium Projects and Experiments</p>
            <h2>Smaller investigations can live here without becoming full case studies.</h2>
          </div>
          <div class="project-grid two">
            ${medium.map((project) => projectCard(project, { compact: true })).join("")}
          </div>
        </div>
      </section>
      <section class="content-band">
        <div class="section-inner">
          <div class="section-heading">
            <p class="eyebrow">Graphic Design Gallery</p>
            <h2>Selected visual work can be added with resilient image fields.</h2>
          </div>
          <div class="gallery-grid">
            ${galleryItems.map((item) => renderGalleryTemplate(item, escapeHtml)).join("")}
          </div>
        </div>
      </section>`
  });
}

function renderFieldNotesPage() {
  return renderPage({
    path: "/field-notes/",
    title: "Field Notes - Research, Process, and Experiments",
    description:
      "Research observations, design-process reflections, experiments, and emerging HCI questions from Ruby Ruan.",
    main: `<section class="page-hero">
        <div class="section-inner">
          <p class="eyebrow">Field Notes - Research, Process, and Experiments</p>
          <h1>Short observations, process reflections, and questions that are still in motion.</h1>
          <p>Field Notes is a first-class space for documenting research observations, accessibility thinking, design-process reflections, experiments, and project updates without presenting unvalidated opinions as findings.</p>
        </div>
      </section>
      <section class="content-band">
        <div class="section-inner note-list">
          ${fieldNotes.map((note) => renderFieldNote(note, escapeHtml)).join("")}
        </div>
      </section>
      <section class="content-band alternate">
        <div class="section-inner">
          ${renderFieldNoteTemplate(escapeHtml)}
        </div>
      </section>`
  });
}

function renderAboutPage() {
  return renderPage({
    path: "/about/",
    title: "About Ruby",
    description:
      "Ruby Ruan's background, interdisciplinary path, values, and future research direction.",
    main: `<section class="page-hero">
        <div class="section-inner">
          <p class="eyebrow">About Ruby</p>
          <h1>A designer and emerging researcher shaped by visual craft, philosophical questioning, and web development.</h1>
          <p>${escapeHtml(profile.supportingCopy)}</p>
        </div>
      </section>
      <section class="content-band">
        <div class="section-inner split-layout">
          <div class="section-heading">
            <p class="eyebrow">Working Values</p>
            <h2>Curiosity, clarity, access, and agency.</h2>
            <p>Use this page to describe Ruby's background, values, and future research direction once final biographical content is available.</p>
          </div>
          <div class="method-list">
            ${workingMethods
              .map(
                (method, index) => `<article class="method-item">
                  <span class="method-index">${String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>${escapeHtml(method.title)}</h3>
                    <p>${escapeHtml(method.detail)}</p>
                  </div>
                </article>`
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="content-band alternate">
        <div class="section-inner note-panel">
          <p class="eyebrow">Future Direction</p>
          <h2>Growing toward HCI, Human Factors, accessibility, XR, human-centered AI, and emerging human-centered technologies.</h2>
          <p>Specific graduate research interests, professors, labs, readings, and collaborators are TBD and should be added only when Ruby is ready to make those connections public.</p>
        </div>
      </section>`
  });
}

function renderResumePage() {
  return renderPage({
    path: "/resume/",
    title: "Resume",
    description:
      "Education, experience, skills, and resume access for Ruby Ruan.",
    main: `<section class="page-hero">
        <div class="section-inner">
          <p class="eyebrow">Resume</p>
          <h1>Education, experience, skills, and resume access.</h1>
          <p>${escapeHtml(resume.intro)}</p>
        </div>
      </section>
      <section class="content-band">
        <div class="section-inner resume-layout">
          ${resume.sections
            .map(
              (section) => `<section class="resume-section" aria-labelledby="resume-${section.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}">
                <h2 id="resume-${section.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}">${escapeHtml(section.title)}</h2>
                ${section.items
                  .map(
                    (item) => `<article class="resume-item">
                      <h3>${escapeHtml(item.heading)}</h3>
                      <p class="meta-text">${escapeHtml(item.meta)}</p>
                      <p>${escapeHtml(item.detail)}</p>
                    </article>`
                  )
                  .join("")}
              </section>`
            )
            .join("")}
          <aside class="resume-access">
            <p class="eyebrow">Resume Access</p>
            <p>PDF resume: ${escapeHtml(site.contact.resumePdf)}</p>
            <p>Email: ${escapeHtml(site.contact.email)}</p>
          </aside>
        </div>
      </section>`
  });
}

function renderNotFoundPage() {
  return renderPage({
    path: "/404.html",
    title: "Page Not Found",
    description: "A helpful 404 page for Ruby Ruan's portfolio.",
    main: `<section class="page-hero">
      <div class="section-inner">
        <p class="eyebrow">404</p>
        <h1>This page is not in the field log yet.</h1>
        <p>The page may have moved, or the case study may still be preparing for publication.</p>
        <div class="hero-actions">
          <a class="button primary" href="/expeditions/">View Expeditions</a>
          <a class="button secondary" href="/">Return to Base Camp</a>
        </div>
      </div>
    </section>`
  });
}

module.exports = {
  escapeHtml,
  renderPage,
  renderHomePage,
  renderExpeditionsPage,
  renderFieldNotesPage,
  renderAboutPage,
  renderResumePage,
  renderNotFoundPage,
  renderDeepCaseStudy,
  renderMediumProjectTemplate,
  renderGalleryTemplate
};
