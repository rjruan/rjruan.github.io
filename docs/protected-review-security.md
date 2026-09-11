# Protected review security

This repository supports generating a self-contained encrypted review artifact without committing its plaintext source or password.

## Rules

- Keep plaintext review content outside this repository.
- Never commit review passwords, plaintext copy, private images, private Figma URLs, or decrypted output.
- The builder refuses both plaintext source and generated review output inside the public repository. A public Git branch is still public.
- A visual password overlay is not protection. The builder encrypts the complete bilingual case-study payload with AES-256-GCM and derives the key with PBKDF2-HMAC-SHA-256.
- This encrypted artifact is a cryptographic review gate, not server-side authentication: someone who obtains the file can still copy the ciphertext and attempt offline guesses. Use a strong, separately delivered passphrase and share only with reviewers already authorized under the NDA or written approval.
- The generated review is local-only until the owner confirms that the intended recipients are permitted under the applicable NDA or written approval.
- If the encrypted artifact is eventually hosted, share its strong passphrase through a different channel. Rotate it by rebuilding the artifact when access should change.

## Hosting decision

For true reviewer-level access control, use private hosting with revocable authentication. Cloudflare Access is a possible later route, but it requires an active domain on Cloudflare and a protected origin; it is not something GitHub Pages supplies by itself. Until that hosting path is configured and the reviewer identities are authorized, the encrypted self-contained artifact is the safer review prototype.

## Build

Set these environment variables without storing them in the repository:

- `PRIVATE_REVIEW_SOURCE`: absolute path to a bilingual JSON source outside the repository.
- `PRIVATE_REVIEW_PASSWORD`: strong passphrase of at least 20 characters.
- `PRIVATE_REVIEW_OUTPUT`: required absolute output path outside the repository.
- `PRIVATE_REVIEW_NOTO_SANS` and `PRIVATE_REVIEW_NOTO_SERIF`: optional paths to page-specific Traditional Chinese font subsets when the current site subset does not cover new copy.

Then run `npm run build:protected-review`.

The builder refuses plaintext sources located inside the repository, rejects unresolved placeholder text, verifies encryption by decrypting the result in memory, inlines the approved portfolio webfonts, and checks that the private English and Chinese titles do not appear in the generated HTML.

For an independent interoperability and structure check, set `PRIVATE_REVIEW_FILE`, `PRIVATE_REVIEW_PASSWORD`, and optionally `PRIVATE_REVIEW_SOURCE`, then run `npm run check:protected-review`. The verifier decrypts through the Web Crypto API used by browsers, confirms both languages, checks headings and fragment links, rejects placeholder text, confirms that a wrong passphrase fails, and reports the file digest.
