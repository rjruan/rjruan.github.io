const fs = require("fs");
const path = require("path");
const data = require("../src/content/site-data");
const templates = require("../src/templates/html");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents, "utf8");
}

function routeToFile(route) {
  if (route === "/") {
    return path.join(dist, "index.html");
  }
  if (route.endsWith(".html")) {
    return path.join(dist, route.replace(/^\//, ""));
  }
  return path.join(dist, route.replace(/^\//, ""), "index.html");
}

function build() {
  fs.rmSync(dist, { recursive: true, force: true });
  ensureDir(dist);
  ensureDir(path.join(dist, "assets"));

  fs.copyFileSync(
    path.join(root, "src", "styles.css"),
    path.join(dist, "assets", "styles.css")
  );

  const sourceAssets = path.join(root, "src", "assets");
  if (fs.existsSync(sourceAssets)) {
    fs.cpSync(sourceAssets, path.join(dist, "assets"), { recursive: true });
  }

  const pages = [
    ["/", templates.renderHomePage()],
    ["/expeditions/", templates.renderExpeditionsPage()],
    ["/field-notes/", templates.renderFieldNotesPage()],
    ["/about/", templates.renderAboutPage()],
    ["/resume/", templates.renderResumePage()],
    ["/404.html", templates.renderNotFoundPage()]
  ];

  for (const project of data.projects) {
    if (project.detailPath) {
      pages.push([
        project.detailPath,
        templates.renderDeepCaseStudy(project, templates.renderPage, templates.escapeHtml)
      ]);
    }
  }

  for (const [route, html] of pages) {
    writeFile(routeToFile(route), html);
  }

  writeFile(
    path.join(dist, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${data.site.url}/sitemap.xml\n`
  );

  const urls = pages
    .filter(([route]) => route !== "/404.html")
    .map(([route]) => {
      const loc = `${data.site.url}${route === "/" ? "/" : route}`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join("\n");

  writeFile(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );

  console.log(`Built ${pages.length} pages into ${path.relative(root, dist)}`);
}

build();
