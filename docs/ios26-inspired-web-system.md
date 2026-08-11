# iOS/iPadOS 26-inspired web system

This portfolio translates the interaction hierarchy and material principles of Apple’s iOS/iPadOS 26 design language into accessible web components. It is not a SwiftUI implementation and does not redistribute Apple UI Kit or SF Symbols assets.

## Source principles

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [WWDC25: Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/)
- [WWDC25: Get to know the new design system](https://developer.apple.com/videos/play/wwdc2025/356/)

The web translation follows four constraints:

1. Reserve translucent glass for navigation, controls, and lightweight structural surfaces.
2. Keep reading surfaces calm and predominantly opaque.
3. Use tint selectively to communicate action or state.
4. Preserve legibility when transparency, motion, or contrast preferences change.

## Foundations

The token layer lives in `src/styles.css` and covers:

- Canvas, surface, ink, muted text, line, accent, semantic, and glass colors.
- Small, medium, large, and pill radii.
- Two elevation levels.
- System-font typography using the platform font stack.
- A shared responsive content width and reading width.
- A consistent interaction easing curve.

## Components

| Component | Web implementation | Portfolio use |
| --- | --- | --- |
| Floating navigation bar | `.site-header-inner.glass-surface` | Persistent five-part portfolio navigation |
| Navigation pills | `.nav-link` and `[aria-current="page"]` | Current-section state and top-level routing |
| Filled button | `.button.primary` | Primary project and prototype actions |
| Tinted button | `.button.secondary` | Secondary links and alternate routes |
| Glass sidebar | `.case-nav.glass-surface` | Sticky case-study table of contents; horizontal on smaller screens |
| Metadata surface | `.case-fact-bar.glass-surface` | Role, timeframe, project type, and concept status |
| Content card | `.project-card`, `.decision-card`, `.flow-card` | Opaque reading surfaces and repeatable content groups |
| Evidence boundary | `.boundary-callout` | Research, technical, and clinical limitations |
| Statistic surface | `.stat-callout` | A sourced data point with contextual caveat |
| System model | `.system-model` | Accessible ordered concept relationship |
| Flow sequence | `.flow-card` | Step-based interaction flow without relying on animation |
| Figure frame | `.case-figure` | Project artifacts, caption, alt text, and resilient fallback |
| Device preview | `.device-stage` | Code-native cover composition until the approved Figma export is committed |

## Responsive behavior

- Desktop: floating capsule navigation, two-column case cover, sticky table of contents, multi-column cards.
- iPad/tablet: stacked case cover, horizontal section navigation, two-column content where useful.
- Mobile: scrollable top navigation, single-column content, vertical system model, compact device composition.

No component relies on hover alone. Navigation and controls preserve visible keyboard focus.

## Accessibility fallbacks

- `prefers-reduced-transparency: reduce` replaces blurred glass with an opaque surface.
- `prefers-contrast: more` strengthens borders, text, and glass opacity.
- `prefers-reduced-motion: reduce` removes lift and smooth-scroll behavior.
- `forced-colors: active` removes decorative shadows and preserves system colors.
- The build check requires one `h1`, one `main#main`, unique IDs, valid same-page anchors, and alt text for every image.

## FamilyPulse asset slots

The approved case-study content currently maps five Figma nodes into durable figure slots:

| Slot | Figma node | Purpose |
| --- | --- | --- |
| `hero-cross-device` | `528:3697` | Phone and watch concept opening |
| `status-home` | `1:14` | Family-facing status summary |
| `analysis-history` | `1:21` | Recent-history and guidance-sharing flow |
| `family-chat` | `1:17` | Everyday family connection |
| `reminder-setup` | `134:294` | Reminder setup flow |

Each figure already has a title, caption, alt text, and graceful fallback in `src/content/site-data.js`. Once durable PNG exports are available, add them under `src/assets/familypulse/` and replace each `src: null` with its public `/assets/familypulse/...` path.

## Non-goals

- Do not imitate an iPhone home screen or make the portfolio look like a native app simulator.
- Do not copy SwiftUI, UIKit, or watchOS code into the static website.
- Do not use glass as a decorative layer behind every section.
- Do not use Apple product assets or symbols as the portfolio’s brand identity.
- Do not restyle FamilyPulse screenshots to match the portfolio shell; project artifacts retain their original visual language.
