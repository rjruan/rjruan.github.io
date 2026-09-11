const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {
  renderProtectedContent,
  renderProtectedReviewShell
} = require("../src/templates/protected-review-shell");

const repositoryRoot = path.resolve(__dirname, "..");
const sourcePath = path.resolve(process.env.PRIVATE_REVIEW_SOURCE || "");
const outputPath = path.resolve(process.env.PRIVATE_REVIEW_OUTPUT || "");
const password = process.env.PRIVATE_REVIEW_PASSWORD || "";
const iterations = 600000;

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function rejectUnresolvedText(value, location) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  assert(
    !/\b(?:TBD|placeholder|NEEDS CONFIRMATION|Image TBD|artifact withheld)\b/i.test(text),
    `${location}: unresolved or placeholder text found.`
  );
}

assert(process.env.PRIVATE_REVIEW_SOURCE, "PRIVATE_REVIEW_SOURCE is required.");
assert(process.env.PRIVATE_REVIEW_OUTPUT, "PRIVATE_REVIEW_OUTPUT is required.");
assert(fs.existsSync(sourcePath), `Private source not found: ${sourcePath}`);
assert(
  !isInside(repositoryRoot, sourcePath),
  "Refusing to read plaintext private content from inside the public repository."
);
assert(
  !isInside(repositoryRoot, outputPath),
  "Refusing to write a protected review artifact inside the public repository."
);
assert(password.length >= 20, "PRIVATE_REVIEW_PASSWORD must be at least 20 characters.");

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
assert(source.languages && source.languages.en && source.languages.zh, "Both English and Traditional Chinese content are required.");
rejectUnresolvedText(source, "Private review source");

for (const [language, content] of Object.entries(source.languages)) {
  assert(Array.isArray(content.facts) && content.facts.length > 0, `${language}: facts are required.`);
  assert(Array.isArray(content.sections) && content.sections.length > 0, `${language}: sections are required.`);
  const ids = content.sections.map((section) => section.id);
  assert(new Set(ids).size === ids.length, `${language}: section IDs must be unique.`);
}

const clearPayload = JSON.stringify({
  version: 1,
  defaultLanguage: "en",
  titles: {
    en: source.languages.en.documentTitle,
    zh: source.languages.zh.documentTitle
  },
  languages: {
    en: renderProtectedContent(source.languages.en, "en"),
    zh: renderProtectedContent(source.languages.zh, "zh")
  }
});

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256");
const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(clearPayload, "utf8"), cipher.final()]);
const ciphertext = Buffer.concat([encrypted, cipher.getAuthTag()]);

const encryptedPayload = {
  version: 1,
  algorithm: "AES-256-GCM",
  kdf: "PBKDF2-SHA-256",
  iterations,
  salt: salt.toString("base64"),
  iv: iv.toString("base64"),
  ciphertext: ciphertext.toString("base64")
};

const encryptedBody = ciphertext.subarray(0, -16);
const authTag = ciphertext.subarray(-16);
const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
decipher.setAuthTag(authTag);
const verification = Buffer.concat([decipher.update(encryptedBody), decipher.final()]).toString("utf8");
assert(verification === clearPayload, "Encrypted payload verification failed.");

function readFont(filename) {
  const extension = path.extname(filename).toLowerCase();
  const isWoff2 = extension === ".woff2";
  return {
    data: fs.readFileSync(filename).toString("base64"),
    mime: isWoff2 ? "font/woff2" : "font/ttf",
    format: isWoff2 ? "woff2" : "truetype"
  };
}

const fontDirectory = path.join(repositoryRoot, "src", "assets", "fonts");
const notoSansPath = path.resolve(
  process.env.PRIVATE_REVIEW_NOTO_SANS || path.join(fontDirectory, "noto-sans-tc-variable-subset.woff2")
);
const notoSerifPath = path.resolve(
  process.env.PRIVATE_REVIEW_NOTO_SERIF || path.join(fontDirectory, "noto-serif-tc-variable-subset.woff2")
);

const html = renderProtectedReviewShell({
  encryptedPayload,
  fontData: {
    sourceSans: readFont(path.join(fontDirectory, "source-sans-3-variable.woff2")),
    sourceSerif: readFont(path.join(fontDirectory, "source-serif-4-variable.woff2")),
    notoSansTc: readFont(notoSansPath),
    notoSerifTc: readFont(notoSerifPath)
  }
});

for (const language of ["en", "zh"]) {
  const title = source.languages[language].title;
  assert(!html.includes(title), `Plaintext ${language} title leaked into encrypted output.`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html);

const digest = crypto.createHash("sha256").update(html).digest("hex");
process.stdout.write(
  `${JSON.stringify({ output: outputPath, bytes: Buffer.byteLength(html), sha256: digest, iterations })}\n`
);
