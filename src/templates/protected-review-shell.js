function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderList(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderSection(section, language) {
  const id = `${language}-${section.id}`;
  const paragraphs = (section.paragraphs || [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const items = (section.items || [])
    .map(
      (item) => `<article class="private-item">
        ${item.label ? `<p class="eyebrow">${escapeHtml(item.label)}</p>` : ""}
        <h3>${escapeHtml(item.title)}</h3>
        ${(item.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        ${renderList(item.bullets)}
        ${item.note ? `<p class="evidence-note">${escapeHtml(item.note)}</p>` : ""}
      </article>`
    )
    .join("");

  return `<section class="private-section" id="${escapeHtml(id)}">
    <div class="section-heading">
      <p class="eyebrow">${escapeHtml(section.number)}</p>
      <h2>${escapeHtml(section.title)}</h2>
    </div>
    <div class="reading-rail">
      ${paragraphs}
      ${renderList(section.bullets)}
    </div>
    ${items ? `<div class="private-item-list">${items}</div>` : ""}
  </section>`;
}

function renderProtectedContent(content, language) {
  const navLabel = language === "zh" ? "案例章節" : "Case study sections";
  const privateLabel = language === "zh" ? "私人檢閱草稿" : "Private review draft";
  const lockReminder = language === "zh"
    ? "此內容目前不可對外分享。請勿轉寄、截圖或重新散布。"
    : "This material is not currently cleared for external sharing. Do not forward, capture, or redistribute it.";

  return `<article class="private-case" data-language="${escapeHtml(language)}">
    <header class="case-hero">
      <div class="content-rail">
        <p class="eyebrow">${escapeHtml(privateLabel)}</p>
        <h1>${escapeHtml(content.title)}</h1>
        <p class="case-lede">${escapeHtml(content.summary)}</p>
        <dl class="quick-facts">
          ${content.facts
            .map(
              (fact) => `<div><dt>${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`
            )
            .join("")}
        </dl>
        <aside class="boundary-note" aria-label="${escapeHtml(content.boundaryLabel)}">
          <strong>${escapeHtml(content.boundaryLabel)}</strong>
          <p>${escapeHtml(content.boundary)}</p>
        </aside>
      </div>
    </header>
    <nav class="case-index" aria-label="${escapeHtml(navLabel)}">
      <div class="content-rail">
        ${content.sections
          .map(
            (section) => `<a href="#${escapeHtml(`${language}-${section.id}`)}"><span>${escapeHtml(
              section.number
            )}</span>${escapeHtml(section.shortTitle || section.title)}</a>`
          )
          .join("")}
      </div>
    </nav>
    <div class="content-rail case-body">
      ${content.sections.map((section) => renderSection(section, language)).join("")}
    </div>
    <footer class="private-case-footer">
      <div class="content-rail"><p>${escapeHtml(lockReminder)}</p></div>
    </footer>
  </article>`;
}

function renderProtectedReviewShell({ encryptedPayload, fontData }) {
  const payloadJson = JSON.stringify(encryptedPayload).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex">
  <meta name="referrer" content="no-referrer">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; font-src data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; connect-src 'none'; media-src data: blob:">
  <title>Private Portfolio Review</title>
  <style>
    @font-face{font-family:'Ruby Source Sans';src:url(data:${fontData.sourceSans.mime};base64,${fontData.sourceSans.data}) format('${fontData.sourceSans.format}');font-style:normal;font-weight:200 900;font-display:swap}
    @font-face{font-family:'Ruby Source Serif';src:url(data:${fontData.sourceSerif.mime};base64,${fontData.sourceSerif.data}) format('${fontData.sourceSerif.format}');font-style:normal;font-weight:200 900;font-display:swap}
    @font-face{font-family:'Ruby Noto Sans TC';src:url(data:${fontData.notoSansTc.mime};base64,${fontData.notoSansTc.data}) format('${fontData.notoSansTc.format}');font-style:normal;font-weight:100 900;font-display:swap}
    @font-face{font-family:'Ruby Noto Serif TC';src:url(data:${fontData.notoSerifTc.mime};base64,${fontData.notoSerifTc.data}) format('${fontData.notoSerifTc.format}');font-style:normal;font-weight:200 900;font-display:swap}
    :root{--paper:#fbfcff;--ink:#10243a;--muted:#53677b;--blue:#0a2c52;--line:#d9e2eb;--focus:#9b5b00;--rail:72rem;--reading:46rem;color-scheme:light}
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;background:var(--paper);color:var(--ink);font-family:'Ruby Source Sans','Ruby Noto Sans TC',sans-serif;line-height:1.7;overflow-wrap:normal;word-break:normal}
    body.lang-zh{font-family:'Ruby Noto Sans TC','Ruby Source Sans',sans-serif}
    h1,h2,h3{font-family:'Ruby Source Serif','Ruby Noto Serif TC',serif;margin:0;text-wrap:balance}
    .lang-zh h1,.lang-zh h2,.lang-zh h3{font-family:'Ruby Noto Serif TC','Ruby Source Serif',serif}
    h1{font-size:clamp(2.2rem,4.4vw,5.8rem);font-weight:500;line-height:.98;letter-spacing:-.05em;max-width:13ch}
    h2{font-size:clamp(2.2rem,4.7vw,5rem);font-weight:500;line-height:.98;letter-spacing:-.045em;max-width:15ch}
    h3{font-size:clamp(1.35rem,2.2vw,2.15rem);font-weight:550;line-height:1.12;letter-spacing:-.035em}
    p,li,dd{font-size:1rem}
    a,button,input{font:inherit}
    button{cursor:pointer}
    :focus-visible{outline:3px solid var(--focus);outline-offset:4px}
    .skip-link{position:fixed;z-index:20;left:1rem;top:1rem;transform:translateY(-180%);background:#fff;color:var(--blue);padding:.7rem 1rem;border-radius:999px}
    .skip-link:focus{transform:none}
    .content-rail{width:min(calc(100% - 2.5rem),var(--rail));margin-inline:auto}
    .reading-rail{max-width:var(--reading)}
    .eyebrow{font-size:.72rem;line-height:1.35;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--muted)}
    .review-bar{position:sticky;top:0;z-index:10;background:rgba(251,252,255,.94);backdrop-filter:blur(18px);border-bottom:1px solid rgba(16,36,58,.12)}
    .review-bar-inner{width:min(calc(100% - 2rem),var(--rail));margin:auto;min-height:4.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
    .review-mark{display:flex;align-items:center;gap:.7rem;font-weight:650}
    .review-mark-dot{width:.7rem;height:.7rem;border-radius:50%;background:#327ab6}
    .review-controls{display:flex;align-items:center;gap:.55rem}
    .review-controls button{border:0;background:transparent;color:var(--ink);padding:.5rem .7rem;border-radius:999px}
    .review-controls button[aria-pressed='true']{background:var(--blue);color:#fff}
    .lock-button{border:1px solid var(--line)!important}
    .gate{min-height:100svh;display:grid;place-items:center;padding:7rem 1.25rem 3rem;background:linear-gradient(145deg,#edf4fb 0%,#fbfcff 55%,#eef5f8 100%)}
    .gate-panel{width:min(100%,35rem);background:rgba(255,255,255,.9);padding:clamp(2rem,5vw,4rem);border-radius:1.5rem;box-shadow:0 24px 70px rgba(10,44,82,.12)}
    .gate h1{font-size:clamp(2.15rem,7vw,4.5rem);max-width:none;margin:.8rem 0 1.2rem}
    .gate p{color:var(--muted)}
    .gate label{display:block;font-weight:650;margin:2rem 0 .55rem}
    .gate input{width:100%;border:1px solid #687a8b;border-radius:.75rem;padding:.9rem 1rem;background:#fff;color:var(--ink)}
    .gate button{width:100%;border:0;border-radius:999px;background:var(--blue);color:#fff;padding:.9rem 1rem;margin-top:1rem;font-weight:700}
    .gate-status{min-height:1.7em;color:#8a2d1e!important}
    .security-note{font-size:.9rem!important;border-top:1px solid var(--line);padding-top:1.2rem;margin-top:1.5rem}
    .case-hero{padding:clamp(6rem,10vw,10rem) 0 clamp(4rem,7vw,7rem);background:linear-gradient(145deg,#eaf3fb,#fbfcff 58%)}
    .case-lede{font-size:clamp(1.05rem,1.35vw,1.2rem);line-height:1.55;max-width:46rem;margin:2rem 0 0}
    .quick-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.5rem;margin:4rem 0 0;padding:2rem 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .quick-facts div{min-width:0}.quick-facts dt{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}.quick-facts dd{margin:.45rem 0 0}
    .boundary-note{max-width:46rem;margin:3rem 0 0;padding-left:1.25rem;border-left:4px solid #327ab6}.boundary-note p{margin:.5rem 0 0;color:var(--muted)}
    .case-index{position:sticky;top:4.5rem;z-index:8;background:rgba(251,252,255,.96);border-block:1px solid var(--line)}
    .case-index .content-rail{display:flex;gap:1.4rem;overflow-x:auto;scrollbar-width:thin;padding-block:.8rem}
    .case-index a{flex:none;color:var(--ink);text-decoration:none;font-size:.9rem}.case-index a span{color:var(--muted);margin-right:.4rem}
    .case-body{padding-block:clamp(2rem,5vw,4rem)}
    .private-section{padding:clamp(5rem,9vw,9rem) 0;border-bottom:1px solid var(--line);scroll-margin-top:9rem}
    .section-heading{margin-bottom:3rem}.section-heading .eyebrow{margin:0 0 1rem}.private-section p{max-width:46rem}.private-section li{max-width:43rem;margin:.65rem 0}
    .private-item-list{display:grid;gap:clamp(3rem,6vw,6rem);margin-top:4rem}.private-item{max-width:60rem}.private-item h3{max-width:26ch}.private-item p{color:#2b4359}.private-item ul{padding-left:1.2rem}.evidence-note{font-size:.9rem!important;color:var(--muted)!important}
    .private-case-footer{background:var(--blue);color:#fff;padding:4rem 0}.private-case-footer p{max-width:46rem;margin:0}
    [hidden]{display:none!important}
    @media(max-width:760px){h1{font-size:clamp(2.15rem,10vw,3.7rem)}h2{font-size:clamp(2rem,8.8vw,3.35rem)}h3{font-size:clamp(1.4rem,6.6vw,2rem)}.quick-facts{grid-template-columns:1fr 1fr}.review-mark span:last-child{display:none}.case-index{top:4.5rem}}
    @media(max-width:420px){.quick-facts{grid-template-columns:1fr}.content-rail{width:min(calc(100% - 1.5rem),var(--rail))}.review-controls{gap:.15rem}.review-controls button{padding:.45rem .55rem}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation:none!important;transition:none!important}}
    @media(prefers-reduced-transparency:reduce){.review-bar{backdrop-filter:none;background:var(--paper)}}
    @media(prefers-contrast:more){:root{--muted:#364c61;--line:#8da0b2}.review-bar{background:var(--paper)}}
    @media(forced-colors:active){:focus-visible{outline-color:Highlight}.boundary-note{border-left-color:CanvasText}}
  </style>
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>
  <header class="review-bar" id="review-bar" hidden>
    <div class="review-bar-inner">
      <div class="review-mark"><span class="review-mark-dot" aria-hidden="true"></span><span>Ruby Ruan · Private Review</span></div>
      <div class="review-controls">
        <button type="button" data-language="en" aria-pressed="true">EN</button>
        <button type="button" data-language="zh" aria-pressed="false" lang="zh-Hant">中文</button>
        <button type="button" class="lock-button" id="lock-review">Lock</button>
      </div>
    </div>
  </header>
  <main id="main"></main>
  <template id="gate-template">
    <section class="gate" aria-labelledby="gate-title">
      <div class="gate-panel">
        <p class="eyebrow">Restricted material</p>
        <h1 id="gate-title">Private portfolio review</h1>
        <p>This encrypted file opens only with the review passphrase. Access does not grant permission to forward, capture, or redistribute its contents.</p>
        <form id="unlock-form">
          <label for="review-password">Review passphrase</label>
          <input id="review-password" name="password" type="password" autocomplete="current-password" required>
          <button type="submit">Unlock review</button>
          <p class="gate-status" id="gate-status" role="status" aria-live="polite"></p>
        </form>
        <p class="security-note">The passphrase is not stored in this file. Closing or refreshing the page locks the review again.</p>
      </div>
    </section>
  </template>
  <script id="encrypted-payload" type="application/json">${payloadJson}</script>
  <script>
    (() => {
      'use strict';
      const main = document.getElementById('main');
      const bar = document.getElementById('review-bar');
      const gateTemplate = document.getElementById('gate-template');
      const encoded = JSON.parse(document.getElementById('encrypted-payload').textContent);
      let decrypted = null;
      let inactivityTimer = null;

      const bytesFromBase64 = (value) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

      async function decryptPayload(password) {
        const sourceKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
        const key = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: bytesFromBase64(encoded.salt), iterations: encoded.iterations, hash: 'SHA-256' },
          sourceKey,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );
        const clearBytes = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: bytesFromBase64(encoded.iv), tagLength: 128 },
          key,
          bytesFromBase64(encoded.ciphertext)
        );
        return JSON.parse(new TextDecoder().decode(clearBytes));
      }

      function setLanguage(language) {
        if (!decrypted || !decrypted.languages[language]) return;
        document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en';
        document.body.classList.toggle('lang-zh', language === 'zh');
        document.title = decrypted.titles[language];
        document.querySelector('.skip-link').textContent = language === 'zh' ? '跳到主要內容' : 'Skip to main content';
        document.getElementById('lock-review').textContent = language === 'zh' ? '上鎖' : 'Lock';
        main.innerHTML = decrypted.languages[language];
        document.querySelectorAll('[data-language]').forEach((button) => {
          button.setAttribute('aria-pressed', String(button.dataset.language === language));
        });
        window.scrollTo({ top: 0, behavior: 'auto' });
      }

      function resetInactivityTimer() {
        window.clearTimeout(inactivityTimer);
        if (decrypted) inactivityTimer = window.setTimeout(lock, 30 * 60 * 1000);
      }

      function unlock(payload) {
        decrypted = payload;
        bar.hidden = false;
        setLanguage(payload.defaultLanguage || 'en');
        resetInactivityTimer();
      }

      function mountGate(message = '') {
        main.replaceChildren(gateTemplate.content.cloneNode(true));
        const form = document.getElementById('unlock-form');
        const input = document.getElementById('review-password');
        const status = document.getElementById('gate-status');
        status.textContent = message;
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          status.textContent = 'Decrypting…';
          form.querySelector('button').disabled = true;
          try {
            const payload = await decryptPayload(input.value);
            input.value = '';
            unlock(payload);
          } catch (error) {
            status.textContent = 'That passphrase did not unlock this review.';
            form.querySelector('button').disabled = false;
            input.select();
          }
        });
        input.focus();
      }

      function lock() {
        decrypted = null;
        window.clearTimeout(inactivityTimer);
        bar.hidden = true;
        document.body.classList.remove('lang-zh');
        document.documentElement.lang = 'en';
        document.documentElement.scrollTop = 0;
        document.title = 'Private Portfolio Review';
        mountGate('Review locked.');
      }

      document.querySelectorAll('[data-language]').forEach((button) => {
        button.addEventListener('click', () => setLanguage(button.dataset.language));
      });
      document.getElementById('lock-review').addEventListener('click', lock);
      ['pointerdown', 'keydown', 'scroll'].forEach((eventName) => {
        window.addEventListener(eventName, resetInactivityTimer, { passive: true });
      });

      if (!window.crypto || !window.crypto.subtle) {
        main.innerHTML = '<section class="gate"><div class="gate-panel"><h1>Browser not supported</h1><p>This encrypted review requires a modern browser with Web Crypto support.</p></div></section>';
      } else {
        mountGate();
      }
    })();
  </script>
</body>
</html>`;
}

module.exports = { renderProtectedContent, renderProtectedReviewShell };
