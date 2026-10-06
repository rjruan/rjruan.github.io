const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { renderPage } = require("../src/templates/html");

// Import ciphertext only. Neither a passphrase nor decrypted content is needed.
const root = path.resolve(__dirname, "..");
const input = process.env.PRIVATE_REVIEW_FILE;
if (!input) throw new Error("PRIVATE_REVIEW_FILE is required.");
const source = fs.readFileSync(input, "utf8");
const match = source.match(/<script id="encrypted-payload" type="application\/json">([\s\S]*?)<\/script>/);
if (!match) throw new Error("Encrypted payload missing.");
const payload = JSON.parse(match[1]);
if (payload.algorithm !== "AES-256-GCM" || payload.kdf !== "PBKDF2-SHA-256" || payload.iterations < 600000) {
  throw new Error("Unsupported encrypted payload.");
}
const json = JSON.stringify(payload).replace(/</g, "\\u003c");
const styles = source.match(/<style>([\s\S]*?)<\/style>/)[1]
  .replace(/\s*@font-face\{[^}]+\}/g, "")
  .replace(/font-family:[^;}]+;?/g, "");
const shells = {};
for (const lang of ["en", "zh"]) {
  const page = renderPage({ path: "/church/", title: "Private Portfolio Review", main: "", lang });
  let header = page.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
  header = header.replace(/<div class="language-switch"[\s\S]*?<\/div>/g,
    `<div class="language-switch" aria-label="${lang === "zh" ? "語言切換" : "Language switcher"}">
      <a href="/church/?lang=en" data-review-language="en" lang="en">EN</a><span aria-hidden="true">/</span>
      <a href="/church/?lang=zh" data-review-language="zh" lang="zh-Hant">中文</a>
    </div>`);
  shells[lang] = { header, footer: page.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0] };
}

const controller = `(() => {
  'use strict';
  const main = document.getElementById('main');
  const header = document.getElementById('review-header');
  const footer = document.getElementById('review-footer');
  new ResizeObserver(() => {
    document.body.style.setProperty('--review-header-height', header.getBoundingClientRect().height + 'px');
  }).observe(header);
  const encoded = JSON.parse(document.getElementById('encrypted-payload').textContent);
  const shells = JSON.parse(document.getElementById('review-shells').textContent);
  let language = new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en';
  let decrypted = null;
  let timer;
  let generation = 0;
  const words = {
    en: { title:'Private portfolio review', label:'Restricted material', intro:'Enter the review passphrase to open this case study.', password:'Review passphrase', unlock:'Unlock review', lock:'Lock review', note:'Closing or refreshing this page locks the review again.', busy:'Opening review…', error:'That passphrase did not unlock this review.', locked:'Review locked.', skip:'Skip to main content', unsupported:'This review requires a browser with Web Crypto support.' },
    zh: { title:'私人作品集審查', label:'受保護的內容', intro:'輸入審查密碼以開啟完整案例。', password:'審查密碼', unlock:'開啟案例', lock:'重新上鎖', note:'關閉或重新整理頁面後，案例將重新上鎖。', busy:'正在開啟案例…', error:'這個密碼無法開啟案例。', locked:'案例已上鎖。', skip:'跳到主要內容', unsupported:'此案例需要支援 Web Crypto 的瀏覽器。' }
  };
  const bytes = value => Uint8Array.from(atob(value), c => c.charCodeAt(0));
  async function decrypt(password) {
    const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey({ name:'PBKDF2', salt:bytes(encoded.salt), iterations:encoded.iterations, hash:'SHA-256' }, material, { name:'AES-GCM', length:256 }, false, ['decrypt']);
    const result = await crypto.subtle.decrypt({ name:'AES-GCM', iv:bytes(encoded.iv), tagLength:128 }, key, bytes(encoded.ciphertext));
    return JSON.parse(new TextDecoder().decode(result));
  }
  function mountShell() {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en';
    document.body.classList.toggle('lang-zh', language === 'zh');
    document.querySelector('.skip-link').textContent = words[language].skip;
    header.innerHTML = shells[language].header;
    footer.innerHTML = shells[language].footer;
    header.querySelectorAll('[data-review-language]').forEach(link => {
      if (link.dataset.reviewLanguage === language) link.setAttribute('aria-current', 'true');
      link.addEventListener('click', event => {
        event.preventDefault();
        const selected = link.dataset.reviewLanguage;
        if (selected === language) return;
        generation += 1;
        language = selected;
        history.replaceState(null, '', '?lang=' + language);
        render();
      });
    });
  }
  function resetTimer() {
    clearTimeout(timer);
    if (decrypted) timer = setTimeout(lock, 30 * 60 * 1000);
  }
  function lock() {
    generation += 1;
    decrypted = null;
    clearTimeout(timer);
    render(words[language].locked);
  }
  function render(message = '') {
    mountShell();
    const w = words[language];
    document.title = decrypted ? decrypted.titles[language] : w.title + ' | Ruby Ruan';
    if (decrypted) {
      main.innerHTML = '<div class="review-lock-rail content-rail"><button id="lock-review" type="button">' + w.lock + '</button></div>' + decrypted.languages[language];
      // The shared portfolio footer below owns footer navigation and contacts.
      main.querySelector('.private-case-footer')?.remove();
      document.getElementById('lock-review').addEventListener('click', lock);
      const heading = main.querySelector('h1');
      heading.tabIndex = -1;
      heading.focus({ preventScroll:true });
      scrollTo({top:0, behavior:'instant'});
      resetTimer();
      return;
    }
    main.innerHTML = '<section class="gate" aria-labelledby="gate-title"><div class="gate-panel"><p class="eyebrow">' + w.label + '</p><h1 id="gate-title">' + w.title + '</h1><p>' + w.intro + '</p><form id="unlock-form"><label for="review-password">' + w.password + '</label><input id="review-password" type="password" autocomplete="current-password" required><button type="submit">' + w.unlock + '</button><p id="gate-status" class="gate-status" role="status" aria-live="polite"></p></form><p class="security-note">' + w.note + '</p></div></section>';
    const status = document.getElementById('gate-status');
    status.textContent = message;
    const input = document.getElementById('review-password');
    const form = document.getElementById('unlock-form');
    const submit = form.querySelector('button');
    if (!crypto?.subtle) { status.textContent = w.unsupported; submit.disabled = true; return; }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const attempt = ++generation;
      status.textContent = w.busy;
      submit.disabled = true;
      try {
        const payload = await decrypt(input.value);
        input.value = '';
        if (attempt !== generation) return;
        decrypted = payload;
        render();
      } catch {
        if (attempt !== generation) return;
        status.textContent = w.error;
        submit.disabled = false;
        input.select();
      }
    });
    input.focus({preventScroll:true});
    scrollTo({top:0, behavior:'instant'});
  }
  ['pointerdown', 'keydown', 'scroll'].forEach(name => addEventListener(name, resetTimer, {passive:true}));
  addEventListener('pagehide', () => { generation += 1; decrypted = null; clearTimeout(timer); main.replaceChildren(); });
  addEventListener('pageshow', event => { if (event.persisted) render(); });
  render();
})();`;

// Escape HTML delimiters in script strings so static HTML checks see only DOM headings.
const script = controller.replace(/</g, "\\u003c");
const scriptHash = crypto.createHash("sha256").update(script).digest("base64");
const sharedCss = fs.readFileSync(path.join(root, "src/styles.css"), "utf8");
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex"><meta name="referrer" content="no-referrer">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; font-src 'none'; style-src 'unsafe-inline'; script-src 'sha256-${scriptHash}'; base-uri 'none'; form-action 'none'; connect-src 'none'; media-src data: blob:; object-src 'none'">
<title>Private Portfolio Review | Ruby Ruan</title><style>${styles}\n${sharedCss}
/* Protected route only: reuse the shared fonts, header, footer and type scale. */
body.protected-review{--paper:#fbfcff;--ink:#10243a;--muted:#53677b;--blue:#0a2c52;--rail:72rem;--reading:46rem}
.protected-review #review-header{position:sticky;top:0;z-index:30}
.protected-review .gate{min-height:70svh;padding-top:5rem;background:none}
.protected-review .gate-panel{background:none;border:0;border-radius:0;box-shadow:none;padding:1rem 0 4rem}
.protected-review .gate h1{max-width:13ch}
.protected-review .case-hero{margin-top:0;padding-top:clamp(3rem,6vw,6rem)}
.protected-review .private-section{border-bottom:0;scroll-margin-top:calc(var(--review-header-height,5rem) + 5rem)}
.protected-review .case-index{top:var(--review-header-height,5rem)}
.protected-review .case-index .content-rail{padding:.8rem .25rem}
.protected-review .review-lock-rail{display:flex;justify-content:flex-end;padding-top:1.5rem}
.protected-review #lock-review{font:inherit;background:transparent;color:var(--ink);border:1px solid var(--line);border-radius:999px;padding:.6rem 1rem;cursor:pointer}
.protected-review :focus-visible{outline:3px solid #9b5b00;outline-offset:4px}
.protected-review .case-index a{padding:.25rem 0}
</style></head><body class="protected-review">
<a class="skip-link" href="#main">Skip to main content</a>
<div id="review-header">${shells.en.header}</div>
<main id="main"><section class="gate"><div class="gate-panel"><h1>Private portfolio review</h1><p>Enable JavaScript to enter the review passphrase.</p></div></section></main>
<div id="review-footer">${shells.en.footer}</div>
<script id="encrypted-payload" type="application/json">${json}</script>
<script id="review-shells" type="application/json">${JSON.stringify(shells).replace(/</g, "\\u003c")}</script>
<script>${script}</script></body></html>`;
fs.mkdirSync(path.join(root, "church"), { recursive: true });
fs.writeFileSync(path.join(root, "church/index.html"), html);
console.log("Prepared /church/ with ciphertext and shared portfolio shell.");
