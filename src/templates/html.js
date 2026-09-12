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
const { research } = require("../content/research-data");
const { zhNavigation, zhHome, zhResearch, zhProjects } = require("../content/zh-data");

const directLanguageAlternates = {
  "/": "/zh/",
  "/research/": "/zh/research/",
  "/expeditions/": "/zh/expeditions/",
  "/about/": "/zh/about/",
  "/resume/": "/zh/resume/",
  "/expeditions/health-monitoring/": "/zh/expeditions/health-monitoring/",
  "/zh/": "/",
  "/zh/research/": "/research/",
  "/zh/expeditions/": "/expeditions/",
  "/zh/about/": "/about/",
  "/zh/resume/": "/resume/",
  "/zh/expeditions/health-monitoring/": "/expeditions/health-monitoring/"
};

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

function renderContactLinks(lang = "en") {
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
    typeof site.contact.behance === "string" &&
    /^https?:\/\//.test(site.contact.behance)
  ) {
    links.push(
      `<a href="${escapeHtml(site.contact.behance)}" target="_blank" rel="noreferrer"><span>Behance</span><span aria-hidden="true">↗</span><span class="visually-hidden"> (opens in a new tab)</span></a>`
    );
  }
  return links.length
    ? links.join("\n")
    : `<p class="meta-text">${lang === "zh" ? "聯絡方式可來信索取。" : "Contact details available on request."}</p>`;
}

function renderResumeLink(lang = "en") {
  if (
    typeof site.contact.resumePdf !== "string" ||
    !site.contact.resumePdf.trim()
  ) {
    return `<p class="meta-text">${lang === "zh" ? "PDF 履歷可來信索取。" : "Resume PDF available on request."}</p>`;
  }
  return `<a class="resume-download" href="${escapeHtml(
    site.contact.resumePdf
  )}" download>
              <span>${lang === "zh" ? "下載 PDF 履歷" : "Download PDF resume"}</span><span aria-hidden="true">↓</span>
            </a>`;
}

function navMarkup(currentPath, items = navigation) {
  return items
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

function renderLanguageSwitch(path, lang) {
  const directAlternate = directLanguageAlternates[path];
  const englishPath = lang === "zh" ? directAlternate || "/" : path;
  const chinesePath = lang === "zh" ? path : directAlternate || "/zh/";
  const chineseLabel = "中文";

  return `<div class="language-switch" aria-label="${lang === "zh" ? "語言切換" : "Language switcher"}">
    <a href="${escapeHtml(englishPath)}" lang="en"${lang === "en" ? ' aria-current="true"' : ""}>EN</a>
    <span aria-hidden="true">/</span>
    <a href="${escapeHtml(chinesePath)}" lang="zh-Hant"${lang === "zh" ? ' aria-current="true"' : ""}>${chineseLabel}</a>
  </div>`;
}

function renderHeaderNavigation(path, lang) {
  const items = lang === "zh" ? zhNavigation : navigation;
  const menuLabel = lang === "zh" ? "選單" : "Menu";
  const navLabel = lang === "zh" ? "主要導覽" : "Primary navigation";

  return `<div class="desktop-header-actions">
      <nav class="primary-nav" aria-label="${navLabel}">${navMarkup(path, items)}</nav>
      ${renderLanguageSwitch(path, lang)}
    </div>
    <details class="nav-menu">
      <summary>${menuLabel}<span aria-hidden="true">+</span></summary>
      <div class="nav-menu-panel">
        <nav class="mobile-nav" aria-label="${navLabel}">${navMarkup(path, items)}</nav>
        ${renderLanguageSwitch(path, lang)}
      </div>
    </details>`;
}

function renderPage({ path, title, description, main, bodyClass = "", lang = "en" }) {
  const bodyClasses = [bodyClass, lang === "zh" ? "lang-zh" : ""].filter(Boolean).join(" ");
  const classes = bodyClasses ? ` class="${bodyClasses}"` : "";
  const stylesheetVersion = "20260912-home-type-restore-1";
  const directAlternate = directLanguageAlternates[path];
  const canonical = `${site.url}${path === "/" ? "/" : path}`;
  const alternateLinks = directAlternate
    ? `<link rel="alternate" hreflang="${lang === "zh" ? "en" : "zh-Hant"}" href="${site.url}${directAlternate}">
    <link rel="alternate" hreflang="${lang === "zh" ? "zh-Hant" : "en"}" href="${canonical}">
    <link rel="alternate" hreflang="x-default" href="${lang === "zh" ? `${site.url}${directAlternate}` : canonical}">`
    : "";
  return `<!DOCTYPE html>
<html lang="${lang === "zh" ? "zh-Hant" : "en"}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(pageTitle(title))}</title>
    <meta name="description" content="${escapeHtml(description || site.description)}">
    <meta property="og:title" content="${escapeHtml(pageTitle(title))}">
    <meta property="og:description" content="${escapeHtml(description || site.description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta name="theme-color" content="#f4f7fb">
    <link rel="canonical" href="${canonical}">
    ${alternateLinks}
    <link rel="stylesheet" href="/assets/styles.css?v=${stylesheetVersion}">
  </head>
  <body${classes}>
    <a class="skip-link" href="#main">${lang === "zh" ? "跳到主要內容" : "Skip to main content"}</a>
    <header class="site-header">
      <div class="site-header-inner glass-surface">
        <a class="site-mark" href="${lang === "zh" ? "/zh/" : "/"}" aria-label="${lang === "zh" ? "Ruby Ruan 作品集首頁" : "Ruby Ruan portfolio home"}">
          <span class="site-mark-dot" aria-hidden="true"></span>
          <span>
            <span class="site-mark-kicker">${lang === "zh" ? "基地" : "Base Camp"}</span>
            <span>${escapeHtml(site.name)}</span>
          </span>
        </a>
        ${renderHeaderNavigation(path, lang)}
      </div>
    </header>
    <main id="main">
      ${main}
    </main>
    ${renderFooter(lang)}
  </body>
</html>
`;
}

function renderFooter(lang = "en") {
  if (lang === "zh") {
    return `<footer class="site-footer">
      <div class="section-inner footer-grid">
        <div class="footer-intro">
          <p class="eyebrow">持續更新的紀錄</p>
          <p>這是一個持續成長的 coded portfolio，用來整理專案、研究札記、視覺工作與未來的案例。</p>
        </div>
        <div class="footer-contact">
          <p class="eyebrow">聯絡</p>
          ${renderContactLinks("zh")}
        </div>
      </div>
    </footer>`;
  }
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
        ${renderContactLinks("en")}
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
  if (!project.cardImage) return "";

  return `<figure class="project-visual project-visual-image" data-asset-source="ruby-provided">
    <img src="${escapeHtml(project.cardImage.src)}" alt="${escapeHtml(
      project.cardImage.alt
    )}" width="${escapeHtml(project.cardImage.width)}" height="${escapeHtml(
      project.cardImage.height
    )}" loading="lazy">
    <figcaption class="visually-hidden">${escapeHtml(project.visualLabel)}</figcaption>
  </figure>`;
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

function renderHomePathways(lang = "en") {
  const pathways = lang === "zh"
    ? zhHome.paths
    : [
        {
          label: "Research path",
          title: "Research questions & methods",
          body: "See the questions I am developing, the methods my work can support, and the skills I am still building.",
          path: "/research/"
        },
        {
          label: "Design path",
          title: "Case studies & systems",
          body: "Follow design questions through evidence, interaction decisions, prototypes, constraints, and reflection.",
          path: "/expeditions/"
        }
      ];

  return `<nav class="home-pathways" aria-label="${lang === "zh" ? "作品集閱讀路徑" : "Portfolio reading paths"}">
    ${pathways
      .map(
        (pathway) => `<a class="home-pathway" href="${escapeHtml(pathway.path)}">
          <span class="eyebrow">${escapeHtml(pathway.label)}</span>
          <strong>${escapeHtml(pathway.title)}</strong>
          <span>${escapeHtml(pathway.body)}</span>
          <span class="home-pathway-arrow" aria-hidden="true">→</span>
        </a>`
      )
      .join("")}
  </nav>`;
}

function renderCinematicHomeHero(lang = "en") {
  const title = lang === "zh"
    ? "我一直提問，直到我理解系統裡的人。"
    : "I keep asking questions until I understand the people inside the system.";
  const lede = lang === "zh"
    ? "觀察人、系統與那些還沒有被回答的問題。"
    : "I observe people, systems, and the questions that remain unresolved.";

  return `<section class="cinematic-home-hero" aria-labelledby="cinematic-home-title">
    <div class="cinematic-home-stage">
      <div class="cinematic-home-media" data-home-film data-video-src="/assets/home/home-roadtrip.mp4">
        <img class="cinematic-home-poster" src="/assets/home/home-roadtrip-poster.jpg" alt="" width="1128" height="634" fetchpriority="high" aria-hidden="true">
      </div>
      <div class="cinematic-home-wash" aria-hidden="true"></div>
      <div class="cinematic-home-caption">
        <p class="eyebrow">Ruby Ruan · Cinematic Research Studio</p>
        <h1 id="cinematic-home-title">${title}</h1>
        <p>${lede}</p>
      </div>
      <p class="cinematic-home-note" aria-hidden="true">A field note / Rexburg</p>
    </div>
    <script>
      (() => {
        const container = document.querySelector("[data-home-film]");
        const motionQuery = window.matchMedia("(min-width: 681px) and (prefers-reduced-motion: no-preference)");
        if (!container) return;
        const syncFilm = () => {
          const existing = container.querySelector("video");
          if (!motionQuery.matches) {
            existing?.remove();
            return;
          }
          if (existing) return;
          const video = document.createElement("video");
          video.className = "cinematic-home-video";
          video.width = 1128;
          video.height = 634;
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.preload = "metadata";
          video.poster = container.querySelector("img")?.currentSrc || "/assets/home/home-roadtrip-poster.jpg";
          video.src = container.dataset.videoSrc;
          video.setAttribute("aria-hidden", "true");
          container.append(video);
          video.play().catch(() => {});
        };
        syncFilm();
        motionQuery.addEventListener?.("change", syncFilm);
      })();
    </script>
  </section>`;
}

function renderWhyHome(lang = "en") {
  const cinematicHero = renderCinematicHomeHero(lang);

  if (lang === "zh") {
    return `${cinematicHero}<section class="why-home" aria-labelledby="why-title">
      <div class="section-inner why-home-inner">
        <header class="why-intro">
          <p class="why-word" aria-hidden="true">WHY?</p>
          <div class="why-intro-copy">
            <p class="eyebrow">${escapeHtml(zhHome.eyebrow)}</p>
            <h2 id="why-title">${escapeHtml(zhHome.title)}</h2>
            <p>${escapeHtml(zhHome.lede)}</p>
          </div>
        </header>
        <ol class="why-project-list" aria-label="精選案例">
          ${zhHome.projects
            .map(
              (project) => `<li class="why-project-item why-project-item--${escapeHtml(project.style)}">
                <a class="why-project-link" href="${escapeHtml(project.path)}">
                  <span class="why-project-number" aria-hidden="true">${escapeHtml(project.number)}</span>
                  <span class="why-project-copy">
                    <span class="why-project-meta">${escapeHtml(project.title)} · ${escapeHtml(project.meta)}</span>
                    <span class="why-project-question">${escapeHtml(project.question)}</span>
                    <span class="why-project-status">${escapeHtml(project.status)}</span>
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

  const homeOrder = [
    "health-monitoring",
    "ssim",
    "flood-50"
  ];
  const homeProjects = homeOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  return `${cinematicHero}<section class="why-home" aria-labelledby="why-title">
    <div class="section-inner why-home-inner">
      <header class="why-intro">
        <p class="why-word" aria-hidden="true">WHY?</p>
        <div class="why-intro-copy">
          <p class="eyebrow">Ruby Ruan · UX Designer & Emerging Researcher</p>
          <h2 id="why-title">Every case study begins with a question I couldn’t leave alone.</h2>
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

function renderZhHomePage() {
  return renderPage({
    path: "/zh/",
    title: "為什麼 — 精選案例",
    description: "Ruby Ruan 的 UX 設計與新進 HCI／Human Factors 研究作品集。",
    bodyClass: "home",
    lang: "zh",
    main: renderWhyHome("zh")
  });
}

function renderExpeditionsPage() {
  const featuredOrder = [
    "health-monitoring",
    "ssim",
    "pen-pal",
    "flood-50"
  ];
  const deep = featuredOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);
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
            <p class="eyebrow">Case Studies</p>
            <h2>Research thinking, interaction design, and systems work.</h2>
          </div>
          <div class="project-grid">
            ${deep.map((project) => projectCard(project)).join("")}
          </div>
        </div>
      </section>`
  });
}

function localizedProjectCard(project) {
  const sourceProject = projects.find((item) => item.slug === project.slug);
  return `<article class="project-card">
    ${sourceProject ? renderProjectVisual(sourceProject) : ""}
    <div class="project-card-body">
      <div class="meta-row"><span>${escapeHtml(project.type)}</span><span>${escapeHtml(project.status)}</span></div>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.question)}</p>
      <p>${escapeHtml(project.summary)}</p>
      <dl class="project-facts">
        <div><dt>角色</dt><dd>${escapeHtml(project.role)}</dd></div>
        <div><dt>時間</dt><dd>${escapeHtml(project.year)}</dd></div>
      </dl>
      ${tagsMarkup(project.themes)}
      <p class="card-action"><a class="text-link" href="${escapeHtml(project.path)}">${escapeHtml(project.status)}</a></p>
    </div>
  </article>`;
}

function renderZhExpeditionsPage() {
  return renderPage({
    path: "/zh/expeditions/",
    title: "專案與案例研究",
    description: "Ruby Ruan 的 UX 設計、研究思考、互動原型與系統作品。",
    bodyClass: "expeditions-page",
    lang: "zh",
    main: `<section class="page-hero">
        <div class="section-inner">
          <p class="eyebrow">專案與案例研究</p>
          <h1>每個專案，都從一個我無法停止追問的問題開始。</h1>
          <p>這些案例呈現我如何從證據、設計決策與原型逐步推進，也如實記錄限制與未知。</p>
        </div>
      </section>
      <section class="content-band">
        <div class="section-inner">
          <div class="section-heading">
            <p class="eyebrow">案例研究</p>
            <h2>研究思考、互動設計與系統工作。</h2>
          </div>
          <div class="project-grid">${zhProjects.map(localizedProjectCard).join("")}</div>
        </div>
      </section>`
  });
}

function renderResearchThemes(items, lang = "en") {
  return `<div class="research-theme-list">
    ${items
      .map(
        (theme) => `<article class="research-theme">
          <div class="research-theme-index">
            <span>${escapeHtml(theme.number)}</span>
            <span>${escapeHtml(theme.status)}</span>
          </div>
          <div class="research-theme-copy">
            <h3>${escapeHtml(theme.title)}</h3>
            <p class="research-question">${escapeHtml(theme.question)}</p>
            <p>${escapeHtml(theme.body)}</p>
            <p class="research-evidence"><strong>${lang === "zh" ? "目前來源：" : "Current source:"}</strong> ${escapeHtml(theme.evidence)}</p>
            <p class="research-boundary"><strong>${lang === "zh" ? "證據邊界：" : "Evidence boundary:"}</strong> ${escapeHtml(theme.boundary)}</p>
            ${theme.path ? `<a class="text-link" href="${escapeHtml(theme.path)}">${lang === "zh" ? "查看相關證據" : "View related evidence"}</a>` : ""}</div>
        </article>`
      )
      .join("")}
  </div>`;
}

function renderExperienceMethods(items, lang = "en") {
  return `<div class="method-evidence-list">
    ${items
      .map(
        (method) => `<article class="method-evidence-item">
          <h3>${escapeHtml(method.title)}</h3>
          <p><strong>${lang === "zh" ? "實作證據：" : "Supported by:"}</strong> ${escapeHtml(method.evidence)}</p>
          <p class="meta-text"><strong>${lang === "zh" ? "限制：" : "Boundary:"}</strong> ${escapeHtml(method.boundary)}</p>
        </article>`
      )
      .join("")}
  </div>`;
}

function renderResearchPage() {
  return renderPage({
    path: "/research/",
    title: "Research Direction",
    description:
      "Ruby Ruan's evolving HCI and Human Factors research direction, current methods, evidence boundaries, and selected work.",
    bodyClass: "research-page",
    main: `<section class="research-hero">
        <div class="section-inner research-hero-grid">
          <div>
            <p class="eyebrow">${escapeHtml(research.hero.eyebrow)}</p>
            <h1>${escapeHtml(research.hero.title)}</h1>
          </div>
          <div class="research-hero-note">
            <p>${escapeHtml(research.hero.lede)}</p>
            <p class="evidence-note">This page distinguishes current evidence from developing skills and future research questions. It does not present class projects as formal academic research.</p>
          </div>
        </div>
      </section>
      <section class="content-band" aria-labelledby="themes-title">
        <div class="section-inner">
          <div class="section-heading">
            <p class="eyebrow">Research themes</p>
            <h2 id="themes-title">Three connected directions, at three different levels of evidence.</h2>
            <p>My agenda begins with dignity and agency, then asks what people need to understand when technology becomes more complex, automated, embodied, or high-stakes.</p>
          </div>
          ${renderResearchThemes(research.themes)}
        </div>
      </section>
      <section class="content-band alternate" aria-labelledby="questions-title">
        <div class="section-inner research-question-layout">
          <div class="section-heading">
            <p class="eyebrow">Evolving research questions</p>
            <h2 id="questions-title">Questions I want to investigate—not findings I claim to have.</h2>
          </div>
          <ol class="research-question-list">
            ${research.questions.map((question, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(question)}</p></li>`).join("")}
          </ol>
        </div>
      </section>
      <section class="content-band" aria-labelledby="methods-title">
        <div class="section-inner">
          <div class="section-heading">
            <p class="eyebrow">Methods & evidence</p>
            <h2 id="methods-title">What I can support now, and what I am deliberately learning next.</h2>
          </div>
          <div class="research-method-columns">
            <section aria-labelledby="experience-title">
              <p class="method-status current">Experience</p>
              <h3 id="experience-title">Methods supported by existing work</h3>
              ${renderExperienceMethods(research.experience)}
            </section>
            <section aria-labelledby="developing-title">
              <p class="method-status developing">Developing</p>
              <h3 id="developing-title">Skills I am actively building</h3>
              <p>I list these to show direction, not established expertise.</p>
              <ul class="developing-method-list">${research.developing.map((method) => `<li>${escapeHtml(method)}</li>`).join("")}</ul>
            </section>
          </div>
        </div>
      </section>
      <section class="content-band alternate" aria-labelledby="work-title">
        <div class="section-inner">
          <div class="section-heading">
            <p class="eyebrow">Selected research-oriented work</p>
            <h2 id="work-title">Projects and notes that show how I frame questions and evidence.</h2>
          </div>
          <div class="research-work-grid">
            ${research.selectedWork
              .map(
                (work) => `<article class="research-work-item">
                  <p class="eyebrow">${escapeHtml(work.label)}</p>
                  <h3>${escapeHtml(work.title)}</h3>
                  <p>${escapeHtml(work.body)}</p>
                  <a class="text-link" href="${escapeHtml(work.path)}">Read this work</a>
                </article>`
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="content-band research-contact-band">
        <div class="section-inner research-contact-layout">
          <div>
            <p class="eyebrow">Research resume & contact</p>
            <h2>I am preparing for research assistant, project assistant, and research-coordination opportunities.</h2>
            <p>A research-focused resume is in preparation. My current resume and additional project context are available on request.</p>
          </div>
          <div class="research-contact-actions">
            <a class="button primary" href="/resume/">View resume overview</a>
            ${renderContactLinks("en")}
          </div>
        </div>
      </section>`
  });
}

function renderZhResearchPage() {
  const selected = [
    {
      label: "目前有專案證據",
      title: "FamilyPulse",
      body: "一個以尊嚴為核心的連線照護概念，明確標示假設、研究限制與未解決的隱私問題。",
      path: "/zh/expeditions/health-monitoring/"
    },
    {
      label: "獨立探索工作",
      title: "SSIM",
      body: "探索家庭記憶、文化保存、所有權，以及保存之後需要承擔的責任。",
      path: "/expeditions/ssim/"
    },
    {
      label: "正在發展的問題",
      title: "Field Notes",
      body: "短篇記錄明確分開觀察與詮釋，並標記尚需證據的問題。",
      path: "/field-notes/"
    }
  ];

  return renderPage({
    path: "/zh/research/",
    title: "研究方向",
    description: "Ruby Ruan 正在發展的 HCI 與 Human Factors 研究方向、方法、證據邊界與相關專案。",
    bodyClass: "research-page",
    lang: "zh",
    main: `<section class="research-hero">
        <div class="section-inner research-hero-grid">
          <div><p class="eyebrow">${escapeHtml(zhResearch.hero.eyebrow)}</p><h1>${escapeHtml(zhResearch.hero.title)}</h1></div>
          <div class="research-hero-note">
            <p>${escapeHtml(zhResearch.hero.lede)}</p>
            <p class="evidence-note">本頁區分目前證據、正在學習的方法與未來研究問題；不會將課堂專案包裝成正式學術研究。</p>
          </div>
        </div>
      </section>
      <section class="content-band" aria-labelledby="zh-themes-title">
        <div class="section-inner">
          <div class="section-heading">
            <p class="eyebrow">研究主題</p>
            <h2 id="zh-themes-title">三個相互連結、但擁有不同證據基礎的方向。</h2>
            <p>我從尊嚴與自主出發，再追問當科技變得更複雜、自動化、具身體性或處於高風險情境時，人需要理解什麼。</p>
          </div>
          ${renderResearchThemes(zhResearch.themes, "zh")}
        </div>
      </section>
      <section class="content-band alternate" aria-labelledby="zh-questions-title">
        <div class="section-inner research-question-layout">
          <div class="section-heading"><p class="eyebrow">正在發展的研究問題</p><h2 id="zh-questions-title">這些是我想進一步研究的問題，不是我已經得出的發現。</h2></div>
          <ol class="research-question-list">${zhResearch.questions.map((question, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(question)}</p></li>`).join("")}</ol>
        </div>
      </section>
      <section class="content-band" aria-labelledby="zh-methods-title">
        <div class="section-inner">
          <div class="section-heading"><p class="eyebrow">方法與證據</p><h2 id="zh-methods-title">區分我目前可以以作品支持的方法，以及正在學習的能力。</h2></div>
          <div class="research-method-columns">
            <section aria-labelledby="zh-experience-title"><p class="method-status current">已有經驗</p><h3 id="zh-experience-title">可由現有作品支持的方法</h3>${renderExperienceMethods(zhResearch.experience, "zh")}</section>
            <section aria-labelledby="zh-developing-title"><p class="method-status developing">正在學習</p><h3 id="zh-developing-title">我正主動建立的能力</h3><p>這份清單表示方向，不代表我已經具備成熟專業。</p><ul class="developing-method-list">${zhResearch.developing.map((method) => `<li>${escapeHtml(method)}</li>`).join("")}</ul></section>
          </div>
        </div>
      </section>
      <section class="content-band alternate" aria-labelledby="zh-work-title">
        <div class="section-inner">
          <div class="section-heading"><p class="eyebrow">研究導向的精選工作</p><h2 id="zh-work-title">這些專案與札記，呈現我如何定義問題並處理證據。</h2></div>
          <div class="research-work-grid">${selected.map((work) => `<article class="research-work-item"><p class="eyebrow">${escapeHtml(work.label)}</p><h3>${escapeHtml(work.title)}</h3><p>${escapeHtml(work.body)}</p><a class="text-link" href="${escapeHtml(work.path)}">閱讀相關工作</a></article>`).join("")}</div>
        </div>
      </section>
      <section class="content-band research-contact-band">
        <div class="section-inner research-contact-layout">
          <div><p class="eyebrow">研究履歷與聯絡</p><h2>我正在準備研究助理、專案助理與研究協調相關機會。</h2><p>研究導向履歷正在準備中；目前履歷與額外專案資料可來信索取。</p></div>
          <div class="research-contact-actions"><a class="button primary" href="/zh/resume/">查看履歷摘要</a>${renderContactLinks("zh")}</div>
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
            <p class="eyebrow">Current evidence</p>
            <h2>Curiosity, clarity, access, and agency—grounded in the work I can show.</h2>
            <p>My current practice includes exploratory UX research, synthesis, information architecture, interaction design, prototyping, accessibility evaluation, and front-end implementation. I care about people, not abstract “users,” and I try to show where evidence ends and interpretation begins.</p>
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
          <p class="eyebrow">Developing direction</p>
          <h2>Growing from UX design toward HCI and Human Factors research.</h2>
          <p>I am especially drawn to complex and high-stakes systems where situation awareness, cognitive workload, trust, accessibility, and human dignity meet. I am seeking formal research training in experimental design, qualitative analysis, statistics, research ethics, and academic writing; I do not yet present those developing methods as established expertise.</p>
          <p><a class="text-link" href="/research/">Read my research direction and evidence boundaries</a></p>
        </div>
      </section>`
  });
}

function renderZhAboutPage() {
  return renderPage({
    path: "/zh/about/",
    title: "關於 Ruby",
    description: "Ruby Ruan 的背景、跨領域路徑、目前證據與未來研究方向。",
    bodyClass: "about-page",
    lang: "zh",
    main: `<section class="page-hero">
        <div class="section-inner">
          <p class="eyebrow">關於 Ruby</p>
          <h1>我是一個帶著素描本、原型，以及太多問題出發的探索者。</h1>
          <p>我是 Ruby，是 UX 設計師，也是正在朝 HCI 與 Human Factors 發展的新進研究者。我的路徑連結平面設計、哲學、Web Development、無障礙與 coded prototyping。</p>
        </div>
      </section>
      <section class="content-band">
        <div class="section-inner split-layout">
          <div class="section-heading">
            <p class="eyebrow">目前證據</p>
            <h2>好奇、清晰、可及與行動自主權。</h2>
            <p>我目前的實作包含探索性 UX 研究、統整、資訊架構、互動設計、原型、無障礙評估與前端實作。我關心的是具體的人，也會儘量標示證據在哪裡結束、詮釋從哪裡開始。</p>
          </div>
          <div class="method-list">
            ${[
              ["觀察人與系統", "在收旂解法以前，先理解情境、行為、摩擦、限制與周邊系統。"],
              ["定義問題", "將模糊情境轉譯成有用的設計與研究問題，並保持假設可見。"],
              ["用原型幫助理解", "以視覺、互動與 coded prototype 檢視結構、清晰度、無障礙與自主權。"],
              ["記錄尚未知道的事", "把未解決問題也視為工作的一部分，特別是證據、許可或更深研究仍不足時。"]
            ].map((method, index) => `<article class="method-item"><span class="method-index">${String(index + 1).padStart(2, "0")}</span><div><h3>${method[0]}</h3><p>${method[1]}</p></div></article>`).join("")}
          </div>
        </div>
      </section>
      <section class="content-band alternate">
        <div class="section-inner note-panel">
          <p class="eyebrow">正在發展的方向</p>
          <h2>從 UX 設計逐步走向 HCI 與 Human Factors 研究。</h2>
          <p>我特別關心複雜與高風險系統中的情境感知、認知負荷、信任、無障礙與人的尊嚴。我正在尋找正式的研究訓練，建立實驗設計、質性分析、統計、研究倫理與學術寫作能力；這些目前都不會被包裝成已建立的專長。</p>
          <p><a class="text-link" href="/zh/research/">閱讀我的研究方向與證據邊界</a></p>
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
            <p>Read the structured overview on this page. A current PDF resume can be shared on request; a separate research-focused version is in preparation.</p>
            ${renderResumeLink("en")}
            ${renderContactLinks("en")}
          </aside>
        </div>
      </section>
      <section class="content-band alternate" aria-labelledby="resume-methods-title">
        <div class="section-inner">
          <div class="section-heading"><p class="eyebrow">Research readiness</p><h2 id="resume-methods-title">Current evidence and developing methods stay separate.</h2></div>
          <div class="research-method-columns compact">
            <section><p class="method-status current">Supported by current work</p><ul class="developing-method-list"><li>Exploratory interviews and questionnaires</li><li>Research synthesis and question framing</li><li>Formative usability and accessibility evaluation</li><li>Information architecture, interaction design, and prototyping</li></ul></section>
            <section><p class="method-status developing">Actively developing</p><ul class="developing-method-list">${research.developing.map((method) => `<li>${escapeHtml(method)}</li>`).join("")}</ul></section>
          </div>
        </div>
      </section>`
  });
}

function renderZhResumePage() {
  return renderPage({
    path: "/zh/resume/",
    title: "履歷",
    description: "Ruby Ruan 的教育、經驗、目前方法與正在發展的研究能力。",
    bodyClass: "resume-page",
    lang: "zh",
    main: `<section class="page-hero"><div class="section-inner"><p class="eyebrow">履歷</p><h1>教育、實作經驗、方法與研究方向。</h1><p>一份簡要紀錄，呈現我在 UX、HCI、Human Factors、無障礙與 coded prototyping 方面的學習與經驗。</p></div></section>
      <section class="content-band">
        <div class="section-inner resume-layout">
          <section class="resume-section" aria-labelledby="zh-resume-education"><h2 id="zh-resume-education">教育</h2>
            <article class="resume-item"><h3>Brigham Young University–Idaho</h3><p class="meta-text">平面設計學士 · UX/UI 導向 · Web Development 輔修 · GPA 3.53 · 2025</p><p>跨領域學習視覺溝通、互動設計、探索性研究、無障礙與前端開發。</p></article>
            <article class="resume-item"><h3>東吳大學</h3><p class="meta-text">哲學相關早期學習 · 台北</p><p>哲學思考持續影響我如何定義行動自主權、責任、尊嚴與科技的問題。</p></article>
          </section>
          <section class="resume-section" aria-labelledby="zh-resume-experience"><h2 id="zh-resume-experience">經驗</h2><article class="resume-item"><h3>UX Design Internship</h3><p class="meta-text">2025–2026</p><p>專業 UX 經驗正等待公開分享許可；在確認前，雇主、產品、內部流程與資料皆保持不公開。</p></article></section>
          <section class="resume-section" aria-labelledby="zh-resume-skills"><h2 id="zh-resume-skills">目前可支持的方法與技術</h2><article class="resume-item"><h3>設計與研究</h3><p>探索性訪談與問卷、研究統整、資訊架構、互動設計、原型、形成性可用性與無障礙評估。</p></article><article class="resume-item"><h3>工具與實作</h3><p>Figma、HTML、CSS、JavaScript 與 coded prototyping，用來連結設計意圖、響應式介面與無障礙前端結構。</p></article></section>
          <aside class="resume-access"><p class="eyebrow">履歷取得</p><p>目前 PDF 履歷可來信索取；獨立的研究導向版本正在準備中。</p>${renderResumeLink("zh")}${renderContactLinks("zh")}</aside>
        </div>
      </section>
      <section class="content-band alternate"><div class="section-inner"><div class="section-heading"><p class="eyebrow">研究準備度</p><h2>目前證據與正在學習的方法必須保持分開。</h2></div><div class="research-method-columns compact"><section><p class="method-status current">可由現有工作支持</p><ul class="developing-method-list"><li>探索性訪談與問卷</li><li>研究統整與問題定義</li><li>形成性可用性與無障礙評估</li><li>資訊架構、互動設計與原型</li></ul></section><section><p class="method-status developing">正在學習</p><ul class="developing-method-list">${zhResearch.developing.map((method) => `<li>${escapeHtml(method)}</li>`).join("")}</ul></section></div></div></section>`
  });
}

function renderZhCaseFigure(item, title, caption, alt, options = {}) {
  if (!item || !item.src) return "";
  const priority = options.eager ? ' fetchpriority="high"' : ' loading="lazy"';
  const extraClass = options.className ? ` ${escapeHtml(options.className)}` : "";
  return `<figure class="case-figure zh-case-figure${extraClass}" data-asset-id="${escapeHtml(item.id)}" data-asset-state="ready">
    <img src="${escapeHtml(item.src)}" alt="${escapeHtml(alt)}"${item.width ? ` width="${escapeHtml(item.width)}"` : ""}${item.height ? ` height="${escapeHtml(item.height)}"` : ""}${priority}>
    <figcaption><strong>${escapeHtml(title)}</strong><span>${escapeHtml(caption)}</span></figcaption>
  </figure>`;
}

function renderZhFamilyFigureSet(entries, title, caption, className = "") {
  const readyEntries = entries.filter((entry) => entry && entry.item && entry.item.src);
  if (!readyEntries.length) return "";

  return `<figure class="family-figure-set ${escapeHtml(className)}">
    <div class="family-figure-set-grid">
      ${readyEntries
        .map(
          ({ item, title: itemTitle, caption: itemCaption, alt }) => `<div class="family-figure-set-item" data-asset-id="${escapeHtml(item.id)}" data-asset-state="ready">
            <img src="${escapeHtml(item.src)}" alt="${escapeHtml(alt)}" loading="lazy"${item.width ? ` width="${escapeHtml(item.width)}"` : ""}${item.height ? ` height="${escapeHtml(item.height)}"` : ""}>
            <p><strong>${escapeHtml(itemTitle)}</strong>${escapeHtml(itemCaption)}</p>
          </div>`
        )
        .join("")}
    </div>
    <figcaption><strong>${escapeHtml(title)}</strong>${escapeHtml(caption)}</figcaption>
  </figure>`;
}

function renderZhFamilyPulsePage() {
  const family = projects.find((project) => project.slug === "health-monitoring");
  const study = family.caseStudy;
  const media = Object.fromEntries(study.media.map((item) => [item.id, item]));

  return renderPage({
    path: "/zh/expeditions/health-monitoring/",
    title: "FamilyPulse 中文案例摘要",
    description: "FamilyPulse 是 Ruby Ruan 於 2024 年獨立完成的 UX Design 課堂專案，探索高齡、尊嚴、自主、照護與跨裝置互動。",
    bodyClass: "family-pulse-case zh-family-case",
    lang: "zh",
    main: `<article class="zh-case-study">
      <header class="zh-case-hero">
        <div class="section-inner zh-case-hero-grid">
          <div class="zh-case-hero-copy">
            <p class="eyebrow">UX Design 課堂專案 · 2024 年 9–12 月</p>
            <h1>設計一個能支持照護，卻不讓人感覺被監視的系統。</h1>
            <p class="case-lede">FamilyPulse 是一個獨立完成的跨手錶與手機概念，探索高齡者與他們信任的人如何分享健康脈絡、聯繫，並在緊急時刻反應，同時保留尊嚴與自主。</p>
            <p class="evidence-note">課堂概念，不是醫療器材，也沒有上線、臨床驗證或量化成效。</p>
            <div class="case-actions">
              <a class="button primary" href="/expeditions/health-monitoring/">閱讀完整英文案例</a>
            </div>
          </div>
          ${renderZhCaseFigure(media["hero-cross-device"], "跨裝置概念", "手錶承擔貼近身體的短操作，手機則提供查看、溝通與設定空間。", "FamilyPulse 手機與智慧手錶概念畫面，手錶顯示緊急呼叫。", { eager: true, className: "zh-family-hero-figure" })}
          <dl class="case-fact-bar">
            <div><dt>角色</dt><dd>獨立 UX 研究與設計</dd></div>
            <div><dt>時間</dt><dd>2024 年 9–12 月</dd></div>
            <div><dt>情境</dt><dd>User Experience Design 課堂的個人專案</dd></div>
            <div><dt>範圍</dt><dd>未上線的探索性概念</dd></div>
          </dl>
        </div>
      </header>

      <nav class="section-inner zh-case-index glass-surface" aria-label="FamilyPulse 案例章節">
        <a href="#zh-origin">起點</a><a href="#zh-research">研究</a><a href="#zh-insight">核心觀察</a><a href="#zh-design">設計回應</a><a href="#zh-prototype">原型</a><a href="#zh-gaps">證據缺口</a><a href="#zh-reflection">反思</a>
      </nav>

      <div class="section-inner case-content zh-case-content">
        <section id="zh-origin" class="case-section case-question">
          <div class="case-section-heading"><span aria-hidden="true">01</span><div><p class="eyebrow">起點</p><h2>這個問題來自我對阿嬤的記憶。</h2></div></div>
          <p>當我在想這份自選問題的課堂作業時，我想到台灣的阿嬤。她曾在浴室跌倒，手術後精神狀態變得很不好。那段記憶讓我想理解：當身體逐漸不如以前，科技能不能在提供幫助的同時，不把一個人定義成「需要被照顧的老人」？</p>
          <blockquote><p>我如何設計一個讓人被幫助，卻不因此覺得自己「正在被幫助」的系統？</p></blockquote>
          <div class="family-origin-artifact">
            ${renderZhCaseFigure(media["vivi-character"], "Vivi 支持角色", "Vivi 被設計成共同幫手，而不是代表家人持續監控所愛的人。", "FamilyPulse 概念中的橘色 Vivi 角色。")}
          </div>
        </section>

        <section id="zh-research" class="case-section">
          <div class="case-section-heading"><span aria-hidden="true">02</span><div><p class="eyebrow">探索性研究</p><h2>從跌倒、獨立與「不想被看成需要幫助」開始。</h2></div></div>
          <p>我查看既有醫療警示產品，並和家人與身邊的人非正式地聊他們對老化、跌倒、獨立與照護的想法。我也把自己放進未來的情境中，思考如果心智仍清楚、但身體不再能做年輕時做得到的事，我會需要什麼。</p>
          <ul class="method-grid">
            <li><span aria-hidden="true">01</span>醫療警示產品競品分析</li>
            <li><span aria-hidden="true">02</span>少於 10 人的非正式探索性談話</li>
            <li><span aria-hidden="true">03</span>與 50–60 多歲父母的對話</li>
            <li><span aria-hidden="true">04</span>紙本原型、任務情境與課堂回饋</li>
          </ul>
          <div class="family-research-evidence" aria-label="研究框架素材">
            <div class="family-competitive-landscape">
              ${renderZhCaseFigure(media["competitive-review"], "醫療警示產品競品查看", "原始專案比較了專用醫療警示服務，後來讓我將機會點轉向更日常的智慧手錶。", "FamilyPulse 原始競品分析中的醫療警示產品標誌。")}
            </div>
            <div class="family-vivi-evidence">
              ${renderZhCaseFigure(media["dignity-framing"], "健康與尊重", "早期框架把健康支持與這個專案最重要的關切連在一起：尊重。", "早期 FamilyPulse 研究看板，Vivi 角色位於健康與尊重之間。")}
            </div>
          </div>
          <aside class="boundary-callout" aria-label="研究限制"><p class="eyebrow">證據邊界</p><p>我沒有保留準確參與人數、完整訪談稿或正式分析紀錄。參與者也不是目標年齡的高齡者，因此這些只能視為設計探索線索，不是具代表性的研究發現。</p></aside>
        </section>

        <section id="zh-insight" class="case-section">
          <div class="case-section-heading"><span aria-hidden="true">03</span><div><p class="eyebrow">觀察與詮釋</p><h2>安全工具即使功能正常，也可能在它傷害自我認同時失敗。</h2></div></div>
          <p>在這些非正式對話中，我最常問「你們對老後最擔心什麼？」跌倒是反覆出現的顧慮。但競品查看也讓我注意到，專用醫療警示裝置可能將使用者標記為脆弱或需要別人幫助。這不是要否定支持，而是詢問支持可否不奪走一個人的驕傲與日常身分。</p>
          <p class="evidence-note">「跌倒是重要顧慮」來自本專案的非正式談話；它不代表台灣高齡人口的普遍結論。</p>
          <div class="family-concept-map-wide">
            ${renderZhCaseFigure(media["concept-map"], "早期概念圖", "這份早期素材探索 Vivi、尊重照護、狀態查看與顧問在概念中可能如何互相連結。", "FamilyPulse 早期概念圖，包含 Vivi、尊重照護、醫療顧問與健康分析。")}
          </div>
        </section>

        <section id="zh-design" class="case-section">
          <div class="case-section-heading"><span aria-hidden="true">04</span><div><p class="eyebrow">設計回應</p><h2>把支持放進一個熟悉、好看且不顯得特殊的日常裝置。</h2></div></div>
          <div class="decision-grid">
            <article class="decision-card"><p class="decision-number">01</p><h3>選擇智慧手錶</h3><p>智慧手錶可以是一個酷、當代的日常物件，而不是明顯表示「我需要醫療協助」的專用裝置。</p></article>
            <article class="decision-card"><p class="decision-number">02</p><h3>依裝置可取性分工</h3><p>手錶優先支持緊急聯繫、家人訊息、提醒與狀態；手機則有更多空間用來查看、篩選、溝通與設定。</p></article>
            <article class="decision-card"><p class="decision-number">03</p><h3>用對比與 Vivi 區分體驗</h3><p>手錶方向使用更高的色彩對比，考量高齡使用情境；家人端則以 Vivi 作為共同幫手，嘗試減輕照顧者的心理壓力。</p></article>
            <article class="decision-card"><p class="decision-number">04</p><h3>用短路徑支持重要任務</h3><p>早期畫面不夠直觀後，我以約兩到三次點擊到達重要功能作為設計目標。這是設計準則，不是實測成果。</p></article>
          </div>
          ${renderZhFamilyFigureSet(
            [
              { item: media["analysis-history"], title: "近期狀態查看", caption: "手機端提供日期篩選，並在需要尋求建議時分享相關脈絡。", alt: "FamilyPulse 健康分析畫面，包含近期狀態與日期控制。" },
              { item: media["family-chat"], title: "日常聯繫", caption: "訊息與通話讓系統不只在發生問題時才出現。", alt: "FamilyPulse 家庭聊天畫面。" },
              { item: media["reminder-setup"], title: "提醒設定", caption: "家人可以準備配合高齡者日常生活的重複提醒。", alt: "FamilyPulse 提醒設定畫面，包含時間與重複選項。" }
            ],
            "手機端概念畫面",
            "近期狀態查看、家庭溝通與提醒設定以同一組介面呈現。",
            "family-figure-set--prototype"
          )}
          ${renderZhFamilyFigureSet(
            [
              { item: media["watch-design-system"], title: "手錶設計系統", caption: "手錶強調高對比、精簡控制與適合小尺寸畫面的元件。", alt: "FamilyPulse 手錶設計系統看板。" },
              { item: media["phone-design-system"], title: "手機設計系統", caption: "手機端延伸同一產品語言，同時容納更多資訊與 Vivi 角色。", alt: "FamilyPulse 手機設計系統看板。" }
            ],
            "跨裝置設計系統",
            "手錶與手機畫面以可閱讀的完整寬度呈現，作為同一個產品語言來查看。",
            "family-figure-set--stacked family-figure-set--design-system"
          )}
        </section>

        <section id="zh-prototype" class="case-section">
          <div class="case-section-heading"><span aria-hidden="true">05</span><div><p class="eyebrow">原型與任務</p><h2>用紙本與低保真原型把跨裝置概念變成可以討論的任務。</h2></div></div>
          <p>我請同學嘗試查看近三天狀態、將健康脈絡提供給顧問，以及用文字、語音或照片聯繫家人。紙本畫面也包含緊急呼叫、家人溝通、快速諮詢與提醒設定。</p>
          ${renderZhFamilyFigureSet(
            [
              { item: media["paper-prototype"], title: "紙本原型", caption: "在加入視覺細節前，先畫出手錶與手機的基本路徑。", alt: "FamilyPulse 早期手機導覽與訊息紙本原型。" },
              { item: media["lowfi-watch"], title: "低保真手錶流程", caption: "探索緊急呼叫、家人聯繫、顧問、提醒與狀態。", alt: "FamilyPulse 低保真智慧手錶畫面流程。" },
              { item: media["lowfi-phone"], title: "低保真手機流程", caption: "提供狀態查看、溝通與設定的空間。", alt: "FamilyPulse 低保真手機畫面流程。" }
            ],
            "原型演進",
            "紙本、手錶與手機探索放在同一組中，以便閱讀層級與流程如何逐步成形。",
            "family-figure-set--stacked"
          )}
          <aside class="boundary-callout" aria-label="評估限制"><p class="eyebrow">評估邊界</p><p>測試來自同學與教授課堂評論，沒有正式可用性計畫、任務數據、量表或後續縱向結果。因此本案例只描述設計變化，不聲稱已證明可用性。</p></aside>
        </section>

        <section id="zh-gaps" class="case-section">
          <div class="case-section-heading"><span aria-hidden="true">06</span><div><p class="eyebrow">證據缺口</p><h2>原始專案沒有解決的事，決定了下一步應研究什麼。</h2></div></div>
          <ul class="next-step-list">
            <li>三種健康狀態沒有定義生理閾值，也沒有臨床驗證。</li>
            <li>原始專案沒有設計隱私、同意、資訊分享權限、撤回權或家庭權力關係。</li>
            <li>哪些資訊應留在手錶、哪些應放在手機，當時是依裝置可取能力分配，未經實地驗證。</li>
            <li>高齡者並未直接參與；字體、對比、動作尺寸與誤觸風險仍需與目標使用者共同測試。</li>
            <li>專案沒有正式定義成功，也沒有實際健康、安全或關係成效。</li>
          </ul>
        </section>

        <section id="zh-reflection" class="case-section case-reflection">
          <div class="case-section-heading"><span aria-hidden="true">07</span><div><p class="eyebrow">反思</p><h2>反思</h2></div></div>
          <p class="family-reflection-copy">
            <span>FamilyPulse 讓我開始更深地關心：</span>
            <strong>設計可否幫到一個人，卻不讓幫助成為他的身分。</strong>
            <span>人可能需要幫助，同時仍然需要被當成一個有驕傲、選擇與尊嚴的人。如果繼續這個專案，我會先邀請高齡者共同定義什麼叫做「被支持但仍有自主」，再進入功能與界面設計。</span>
          </p>
        </section>
      </div>
    </article>`
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
  renderZhHomePage,
  renderResearchPage,
  renderZhResearchPage,
  renderExpeditionsPage,
  renderZhExpeditionsPage,
  renderFieldNotesPage,
  renderAboutPage,
  renderZhAboutPage,
  renderResumePage,
  renderZhResumePage,
  renderZhFamilyPulsePage,
  renderNotFoundPage,
  renderDeepCaseStudy,
  renderMediumProjectTemplate,
  renderGalleryTemplate
};
