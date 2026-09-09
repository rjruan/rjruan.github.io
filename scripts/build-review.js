const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const cssPath = path.join(dist, "assets", "styles.css");

const reviews = [
  { route: "/", source: "index.html", output: "portfolio-home-research-review-v1.html" },
  {
    route: "/research/",
    source: "research/index.html",
    output: "portfolio-research-path-review-v1.html"
  },
  {
    route: "/expeditions/",
    source: "expeditions/index.html",
    output: "portfolio-expeditions-research-review-v1.html"
  },
  {
    route: "/expeditions/health-monitoring/",
    source: "expeditions/health-monitoring/index.html",
    output: "portfolio-familypulse-research-review-v1.html"
  },
  {
    route: "/expeditions/ssim/",
    source: "expeditions/ssim/index.html",
    output: "portfolio-ssim-research-review-v1.html"
  },
  {
    route: "/expeditions/church-professional-work/",
    source: "expeditions/church-professional-work/index.html",
    output: "portfolio-church-protected-research-review-v1.html"
  },
  {
    route: "/expeditions/pen-pal/",
    source: "expeditions/pen-pal/index.html",
    output: "portfolio-echo-penpal-research-review-v1.html"
  },
  {
    route: "/field-notes/",
    source: "field-notes/index.html",
    output: "portfolio-field-notes-research-review-v1.html"
  },
  { route: "/about/", source: "about/index.html", output: "portfolio-about-research-review-v1.html" },
  { route: "/resume/", source: "resume/index.html", output: "portfolio-resume-research-review-v1.html" },
  { route: "/zh/", source: "zh/index.html", output: "portfolio-zh-home-review-v1.html" },
  {
    route: "/zh/research/",
    source: "zh/research/index.html",
    output: "portfolio-zh-research-review-v1.html"
  },
  {
    route: "/zh/expeditions/",
    source: "zh/expeditions/index.html",
    output: "portfolio-zh-expeditions-review-v1.html"
  },
  { route: "/zh/about/", source: "zh/about/index.html", output: "portfolio-zh-about-review-v1.html" },
  { route: "/zh/resume/", source: "zh/resume/index.html", output: "portfolio-zh-resume-review-v1.html" },
  {
    route: "/zh/expeditions/health-monitoring/",
    source: "zh/expeditions/health-monitoring/index.html",
    output: "portfolio-zh-familypulse-review-v1.html"
  },
  { route: "/404.html", source: "404.html", output: "portfolio-404-research-review-v1.html" }
];

const reviewByRoute = new Map(reviews.map((review) => [review.route, review.output]));

function mimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  if (extension === ".mp4") return "video/mp4";
  throw new Error(`Unsupported review asset: ${filePath}`);
}

function buildReview(review, css) {
  const sourcePath = path.join(dist, review.source);
  const outputPath = path.join(dist, review.output);
  let html = fs.readFileSync(sourcePath, "utf8");

  html = html.replace(
    /<link rel="stylesheet" href="\/assets\/styles\.css(?:\?v=[^"]+)?">/,
    `<style>\n${css}\n</style>`
  );

  html = html.replace(/src="(\/assets\/[^"]+)"/g, (_match, publicPath) => {
    const filePath = path.join(dist, publicPath.replace(/^\//, ""));
    const base64 = fs.readFileSync(filePath).toString("base64");
    return `src="data:${mimeType(filePath)};base64,${base64}"`;
  });

  html = html.replace(/poster="(\/assets\/[^"]+)"/g, (_match, publicPath) => {
    const filePath = path.join(dist, publicPath.replace(/^\//, ""));
    const base64 = fs.readFileSync(filePath).toString("base64");
    return `poster="data:${mimeType(filePath)};base64,${base64}"`;
  });

  for (const [route, output] of reviewByRoute) {
    html = html.replaceAll(`href="${route}"`, `href="${output}"`);
  }

  fs.writeFileSync(outputPath, html, "utf8");
  console.log(`Built self-contained review page at ${path.relative(root, outputPath)}`);
}

const css = fs.readFileSync(cssPath, "utf8");
reviews.forEach((review) => buildReview(review, css));
