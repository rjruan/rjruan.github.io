const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const generatedFiles = ["404.html", "index.html", "robots.txt", "sitemap.xml"];
const generatedDirectories = ["about", "expeditions", "field-notes", "resume", "assets"];

if (!fs.existsSync(path.join(dist, "index.html"))) {
  throw new Error("dist/index.html is missing. Run npm run build first.");
}

for (const directory of generatedDirectories) {
  fs.rmSync(path.join(root, directory), { recursive: true, force: true });
}

for (const file of generatedFiles) {
  fs.copyFileSync(path.join(dist, file), path.join(root, file));
}

for (const directory of ["about", "expeditions", "field-notes", "resume"]) {
  fs.cpSync(path.join(dist, directory), path.join(root, directory), {
    recursive: true
  });
}

fs.mkdirSync(path.join(root, "assets"), { recursive: true });
fs.copyFileSync(
  path.join(dist, "assets", "styles.css"),
  path.join(root, "assets", "styles.css")
);

for (const directory of ["familypulse", "penpal", "ssim"]) {
  fs.cpSync(
    path.join(dist, "assets", directory),
    path.join(root, "assets", directory),
    { recursive: true }
  );
}

fs.writeFileSync(path.join(root, ".nojekyll"), "", "utf8");

console.log("Synced the public-safe dist build to the repository root for GitHub Pages.");
