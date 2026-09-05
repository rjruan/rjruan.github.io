const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const cssPath = path.join(dist, "assets", "styles.css");

const reviews = [
  { route: "/", source: "index.html", output: "portfolio-home-professor-review-v4.html" },
  {
    route: "/expeditions/",
    source: "expeditions/index.html",
    output: "portfolio-expeditions-professor-review-v4.html"
  },
  {
    route: "/expeditions/health-monitoring/",
    source: "expeditions/health-monitoring/index.html",
    output: "portfolio-familypulse-professor-review-v4.html"
  },
  {
    route: "/expeditions/ssim/",
    source: "expeditions/ssim/index.html",
    output: "portfolio-ssim-professor-review-v6.html"
  },
  {
    route: "/expeditions/church-professional-work/",
    source: "expeditions/church-professional-work/index.html",
    output: "portfolio-church-protected-review-v2.html"
  },
  {
    route: "/expeditions/pen-pal/",
    source: "expeditions/pen-pal/index.html",
    output: "portfolio-echo-penpal-preview-v3.html"
  },
  {
    route: "/field-notes/",
    source: "field-notes/index.html",
    output: "portfolio-field-notes-professor-review-v3.html"
  },
  { route: "/about/", source: "about/index.html", output: "portfolio-about-professor-review-v3.html" },
  { route: "/resume/", source: "resume/index.html", output: "portfolio-resume-professor-review-v3.html" },
  { route: "/404.html", source: "404.html", output: "portfolio-404-review-v3.html" }
];

const reviewByRoute = new Map(reviews.map((review) => [review.route, review.output]));

function mimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
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

  for (const [route, output] of reviewByRoute) {
    html = html.replaceAll(`href="${route}"`, `href="${output}"`);
  }

  fs.writeFileSync(outputPath, html, "utf8");
  console.log(`Built self-contained review page at ${path.relative(root, outputPath)}`);
}

const css = fs.readFileSync(cssPath, "utf8");
reviews.forEach((review) => buildReview(review, css));
