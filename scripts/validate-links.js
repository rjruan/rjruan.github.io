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
    const relativeFile = path.relative(root, file);
    const ids = new Set();
    const duplicateIds = new Set();
    const idPattern = /\sid="([^"]+)"/g;

    for (const match of html.matchAll(idPattern)) {
      if (ids.has(match[1])) {
        duplicateIds.add(match[1]);
      }
      ids.add(match[1]);
    }

    for (const id of duplicateIds) {
      failures.push(`${relativeFile} contains duplicate id "${id}"`);
    }

    const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
    if (h1Count !== 1) {
      failures.push(`${relativeFile} contains ${h1Count} h1 elements; expected exactly 1`);
    }

    if (!/<main id="main">/.test(html)) {
      failures.push(`${relativeFile} is missing the main#main landmark`);
    }

    if (!/<html lang="(?:en|zh-Hant)">/.test(html)) {
      failures.push(`${relativeFile} is missing a supported document language`);
    }

    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\salt="[^"]*"/.test(image[0])) {
        failures.push(`${relativeFile} contains an image without alt text`);
      }
      const source = image[0].match(/\ssrc="([^"]+)"/);
      if (source && source[1].startsWith("/") && !targetExists(source[1])) {
        failures.push(`${relativeFile} contains an image with missing source ${source[1]}`);
      }
    }

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
        if (!ids.has(href.slice(1))) {
          failures.push(`${relativeFile} links to missing page fragment ${href}`);
        }
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
