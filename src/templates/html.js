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

function renderContactLinks() {
  const links = [];
  if (typeof site.contact.email === "string" && site.contact.email.includes("@")) {
    links.push(
      `<a href="mailto:${escapeHtml(site.contact.email)}"><span>${escapeHtml(
        site.contact.email
      )}</span><span aria-hidden="true">↗</span></a>`
    );
  }
  if (
    typeof site.contact.linkedin === "string" &&
    /^https?:\/\//.test(site.contact.linkedin)
  ) {
    links.push(
      `<a href="${escapeHtml(site.contact.linkedin)}" target="_blank" rel="noreferrer"><span>LinkedIn</span><span aria-hidden="true">↗</span><span class="visually-hidden"> (opens in a new tab)</span></a>`
    );
  }
  if (
    typeof site.contact.github === "string" &&
    /^https?:\/\//.test(site.contact.github)
  ) {
    links.push(
      `<a href="${escapeHtml(site.contact.github)}" target="_blank" rel="noreferrer"><span>GitHub</span><span aria-hidden="true">↗</span><span class="visually-hidden"> (opens in a new tab)</span></a>`
    );
  }
  return links.length
    ? links.join("\n")
    : `<p class="meta-text">Contact details available on request.</p>`;
}

function renderResumeLink() {
  if (
    typeof site.contact.resumePdf !== "string" ||
    !site.contact.resumePdf.trim()
  ) {
    return `<p class="meta-text">Resume PDF available on request.</p>`;
  }
  return `<a class="resume-download" href="${escapeHtml(
    site.contact.resumePdf
  )}" download>
              <span>Download PDF resume</span><span aria-hidden="true">↓</span>
            </a>`;
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
    <link rel="stylesheet" href="/assets/styles.css?v=20260905-why-blue-2">
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
      <div class="footer-intro">
        <p class="eyebrow">Ongoing record</p>
        <p>${escapeHtml(
          "Designed as an extensible coded portfolio for projects, research notes, visual work, and future case studies."
        )}</p>
      </div>
      <div class="footer-contact">
        <p class="eyebrow">Contact</p>
        ${renderContactLinks()}
      </div>
    </div>
  </footer>`;
}

function renderHero() {
  return `<section class="hero-band">
    <div class="section-inner hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Ruby Ruan · UX Designer & Emerging Researcher</p>
        <h1>${escapeHtml(profile.positioning)}</h1>
        <p class="hero-lede">${escapeHtml(profile.supportingCopy)}</p>
        <div class="hero-actions">
          <a class="button primary" href="/expeditions/">View Expeditions</a>
          <a class="button secondary" href="/field-notes/">Read Field Notes</a>
        </div>
      </div>
      <aside class="field-log glass-surface" aria-label="Portfolio orientation notes">
        <div class="field-log-topline">
          <span>Current field log</span>
          <span>2026</span>
        </div>
        <dl>
          <div>
            <dt>Current role</dt>
            <dd>${escapeHtml(profile.currentRole)}</dd>
          </div>
          <div>
            <dt>Questions I carry</dt>
            <dd>Dignity, agency, memory, trust</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>Observe → frame → prototype → question again</dd>
          </div>
        </dl>
        <p class="field-log-whisper">I collect questions the way some people collect souvenirs.</p>
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

  if (project.visualStyle === "ssim") {
    return `<div class="project-visual ssim-project-visual" role="img" aria-label="${escapeHtml(
      project.visualLabel
    )}">
      <div class="ssim-card-wordmark">
        <span>SSIM</span>
        <span aria-hidden="true">MISS</span>
      </div>
      <p>${escapeHtml(project.visualLabel)}</p>
    </div>`;
  }

  if (project.visualStyle === "pen-pal") {
    return `<div class="project-visual pen-pal-visual" role="img" aria-label="${escapeHtml(
      project.visualLabel
    )}">
      <div class="pen-pal-card-wordmark" aria-hidden="true">
        <span>Echo</span><span>PenPal</span>
      </div>
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
        <h2>Three investigations into care, memory, and complex systems.</h2>
        <p>Two published independent studies and one protected professional case—each honest about its evidence, limits, and unfinished questions.</p>
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
      <h2>Graphic design taught me to shape meaning. Philosophy taught me to question it. Code taught me to test whether it survives contact with reality.</h2>
      <p>That combination is leading me toward HCI and Human Factors research focused on agency, accessibility, dignity, and the human consequences of emerging technology.</p>
    </div>
  </section>`;
}

function renderWhyHome() {
  const homeOrder = [
    "professional-systems-placeholder",
    "health-monitoring",
    "ssim"
  ];
  const homeProjects = homeOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  return `<section class="why-home" aria-labelledby="why-title">
    <div class="section-inner why-home-inner">
      <header class="why-intro">
        <p class="why-word" aria-hidden="true">WHY?</p>
        <div class="why-intro-copy">
          <p class="eyebrow">Ruby Ruan · UX Designer & Emerging Researcher</p>
          <h1 id="why-title">Every case study begins with a question I couldn’t leave alone.</h1>
          <p>I follow each question through evidence, design decisions, uncertainty, and the human consequences of the systems we build.</p>
        </div>
      </header>

      <ol class="why-project-list" aria-label="Selected case studies">
        ${homeProjects
          .map(
            (project, index) => `<li class="why-project-item why-project-item--${escapeHtml(project.visualStyle || "professional")}">
              <a class="why-project-link" href="${escapeHtml(project.detailPath)}">
                <span class="why-project-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
                <span class="why-project-copy">
                  <span class="why-project-meta">${escapeHtml(project.title)} · ${escapeHtml(project.context)}</span>
                  <span class="why-project-question">${escapeHtml(project.homeQuestion || project.inquiry)}</span>
                  <span class="why-project-status">${escapeHtml(project.availability)}</span>
                </span>
                <span class="why-project-arrow" aria-hidden="true">↗</span>
              </a>
            </li>`
          )
          .join("")}
      </ol>
    </div>
  </section>`;
}

function renderHomePage() {
  return renderPage({
    path: "/",
    title: "Why - Selected Case Studies",
    description: site.description,
    bodyClass: "home",
    main: renderWhyHome()
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
    bodyClass: "expeditions-page",
    main: `<section class="page-hero">
        <div class="section-inner">
          <p class="eyebrow">Expeditions - Projects and Case Studies</p>
          <h1>Every project begins with something I cannot stop wondering about.</h1>
          <p>These expeditions follow questions through evidence, design decisions, prototypes, limits, and the places where certainty runs out.</p>
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
      </section>`
  });
}

function renderFieldNotesPage() {
  return renderPage({
    path: "/field-notes/",
    title: "Field Notes - Research, Process, and Experiments",
    description:
      "Research observations, design-process reflections, experiments, and emerging HCI questions from Ruby Ruan.",
    bodyClass: "field-notes-page",
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
      </section>`
  });
}

function renderAboutPage() {
  return renderPage({
    path: "/about/",
    title: "About Ruby",
    description:
      "Ruby Ruan's background, interdisciplinary path, values, and future research direction.",
    bodyClass: "about-page",
    main: `<section class="page-hero">
        <div class="section-inner">
          <p class="eyebrow">About Ruby</p>
          <h1>I am an explorer who happens to carry a sketchbook, a prototype, and too many questions.</h1>
          <p>${escapeHtml(profile.supportingCopy)}</p>
        </div>
      </section>
      <section class="content-band">
        <div class="section-inner split-layout">
          <div class="section-heading">
            <p class="eyebrow">Working Values</p>
            <h2>Curiosity, clarity, access, and agency.</h2>
            <p>I care about people, not abstract “users.” I want to understand what a system asks of someone, what it hides, and whether the person still has room to choose.</p>
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
          <p>I am especially drawn to high-stakes and emerging systems where cognition, embodiment, accessibility, and human dignity meet. Graduate study is the next place I want to deepen the research methods behind those questions.</p>
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
    bodyClass: "resume-page",
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
            <p>Read the structured overview on this page. A PDF resume can be shared on request.</p>
            ${renderResumeLink()}
            ${renderContactLinks()}
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
