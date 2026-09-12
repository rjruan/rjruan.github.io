# Portfolio design system

The approved homepage is the source of truth. Other pages share its restrained editorial shell while retaining project-specific evidence and color.

## Typography

The effective tokens are defined at the end of `src/styles.css`.

| Role | Current token |
| --- | --- |
| English sans | `-apple-system`, `BlinkMacSystemFont`, `SF Pro Text`, `Segoe UI`, sans-serif |
| English serif | `ui-serif`, `Georgia`, `Times New Roman`, serif |
| Traditional Chinese sans | `-apple-system`, `BlinkMacSystemFont`, `PingFang TC`, `Noto Sans TC`, `Microsoft JhengHei`, sans-serif |
| Traditional Chinese serif | `ui-serif`, `Noto Serif TC`, `Songti TC`, `Georgia`, serif |
| H1 | `clamp(2.2rem, 4.4vw, 5.8rem)`, 500, 0.98 |
| H2 | `clamp(2.2rem, 4.7vw, 5rem)`, 500, 0.98 |
| H3 | `clamp(1.35rem, 2.2vw, 2.15rem)`, 550, 1.12 |
| Body 1 | `clamp(1.05rem, 1.35vw, 1.2rem)`, 1.55 |
| Body 2 | `1rem`, 1.7 |
| Body 3 | `0.9rem`, 1.55 |
| Caption/eyebrow | `0.72rem`, 1.35, `0.12em` tracking |

Ruby rejected the temporary self-hosted Source/Noto webfont treatment. Do not restore those declarations or preloads without explicit approval. Subheaders follow the homepage hierarchy rather than introducing another independent scale.

## Layout and shell

- Use the shared floating header and blue editorial footer from `src/templates/html.js` and the final stylesheet lock.
- Favor simple, elegant composition, large breathing room, flat surfaces, and meaningful break-the-frame imagery.
- Avoid generic cards, decorative borders, shadows, blobs, and fake project visuals.
- Break-the-frame elements must not create document-level horizontal overflow, clipped text, sticky-navigation collisions, or broken words.
- Project images remain fluid, uncropped when evidence matters, and include meaningful alt text plus intrinsic dimensions.

## Responsive and accessibility baseline

- Preserve one meaningful `h1`, sequential headings, `main`, landmarks, skip link, keyboard focus, and appropriate document language.
- Check contrast against WCAG 2.2 AA and honor `prefers-reduced-motion`.
- Homepage video is desktop-only progressive enhancement: at 680px and below, and for reduced-motion users, retain the poster without creating/loading the video.
- Verify mobile prototype containment and intentional horizontal scrolling where used.
