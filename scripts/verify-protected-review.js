const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(process.env.PRIVATE_REVIEW_FILE || "");
const password = process.env.PRIVATE_REVIEW_PASSWORD || "";
const sourcePath = process.env.PRIVATE_REVIEW_SOURCE
  ? path.resolve(process.env.PRIVATE_REVIEW_SOURCE)
  : null;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function fromBase64(value) {
  return Uint8Array.from(Buffer.from(value, "base64"));
}

async function decrypt(encoded, candidatePassword) {
  const sourceKey = await crypto.webcrypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(candidatePassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.webcrypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: fromBase64(encoded.salt),
      iterations: encoded.iterations,
      hash: "SHA-256"
    },
    sourceKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const clear = await crypto.webcrypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: fromBase64(encoded.iv),
      tagLength: 128
    },
    key,
    fromBase64(encoded.ciphertext)
  );
  return JSON.parse(new TextDecoder().decode(clear));
}

function verifyContent(html, language) {
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  assert(h1Count === 1, `${language}: expected one h1, found ${h1Count}.`);

  const headings = [...html.matchAll(/<h([1-6])(?:\s|>)/g)].map((match) => Number(match[1]));
  for (let index = 1; index < headings.length; index += 1) {
    assert(headings[index] - headings[index - 1] <= 1, `${language}: heading level jump detected.`);
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert(ids.has(match[1]), `${language}: missing fragment target #${match[1]}.`);
  }

  assert(
    !/\b(?:TBD|placeholder|NEEDS CONFIRMATION|Image TBD|artifact withheld)\b/i.test(html),
    `${language}: unresolved or placeholder text found.`
  );
}

async function main() {
  assert(process.env.PRIVATE_REVIEW_FILE, "PRIVATE_REVIEW_FILE is required.");
  assert(fs.existsSync(filePath), `Protected review not found: ${filePath}`);
  assert(password.length >= 20, "PRIVATE_REVIEW_PASSWORD must be at least 20 characters.");

  const file = fs.readFileSync(filePath, "utf8");
  const match = file.match(/<script id="encrypted-payload" type="application\/json">([\s\S]*?)<\/script>/);
  assert(match, "Encrypted payload was not found.");
  const encoded = JSON.parse(match[1]);
  assert(encoded.algorithm === "AES-256-GCM", "Unexpected encryption algorithm.");
  assert(encoded.kdf === "PBKDF2-SHA-256", "Unexpected key-derivation function.");
  assert(encoded.iterations >= 600000, "PBKDF2 work factor is below the required minimum.");

  const clear = await decrypt(encoded, password);
  assert(clear.languages && clear.languages.en && clear.languages.zh, "Both language payloads are required.");
  verifyContent(clear.languages.en, "en");
  verifyContent(clear.languages.zh, "zh-Hant");

  let wrongPasswordRejected = false;
  try {
    await decrypt(encoded, `${password}-wrong`);
  } catch (error) {
    wrongPasswordRejected = true;
  }
  assert(wrongPasswordRejected, "An incorrect passphrase unexpectedly decrypted the review.");

  if (sourcePath) {
    const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
    for (const language of ["en", "zh"]) {
      assert(
        !file.includes(source.languages[language].title),
        `${language}: plaintext private title leaked into the encrypted file.`
      );
    }
  }

  const digest = crypto.createHash("sha256").update(file).digest("hex");
  process.stdout.write(
    `${JSON.stringify({
      file: filePath,
      bytes: Buffer.byteLength(file),
      sha256: digest,
      languages: ["en", "zh-Hant"],
      wrongPasswordRejected,
      structuralChecks: "passed"
    })}\n`
  );
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
