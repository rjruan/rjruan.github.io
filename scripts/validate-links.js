const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return [fullPath];
  });
}

function targetExists(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "/") {
    return fs.existsSync(path.join(dist, "index.html"));
  }
  if (clean.endsWith("/")) {
    return fs.existsSync(path.join(dist, clean.replace(/^\//, ""), "index.html"));
  }
  return fs.existsSync(path.join(dist, clean.replace(/^\//, "")));
}

function check() {
  if (!fs.existsSync(dist)) {
    throw new Error("dist does not exist. Run npm run build first.");
  }

  const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
  const failures = [];
  const hrefPattern = /href="([^"]*)"/g;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(hrefPattern)) {
      const href = match[1];
      if (!href || href === "#") {
        failures.push(`${path.relative(root, file)} contains placeholder href "${href}"`);
        continue;
      }
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        continue;
      }
      if (href.startsWith("#")) {
        continue;
      }
      if (href.startsWith("/") && !targetExists(href)) {
        failures.push(`${path.relative(root, file)} links to missing target ${href}`);
      }
    }
  }

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }

  console.log(`Checked ${htmlFiles.length} HTML files; no broken internal links found.`);
}

check();
