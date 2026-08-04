# Ruby Ruan Portfolio

Portfolio Skeleton v0.1 is a dependency-free static site for Ruby Ruan's UX portfolio. It uses structured content, reusable templates, and generated route folders so GitHub Pages can load every primary route directly.

## Run Locally

```bash
npm run build
npm run serve
```

Then open `http://localhost:4173`.

## Build

```bash
npm run build
npm run check:links
```

The build writes static files to `dist/`.

## GitHub Pages Deployment

Deployment is handled by `.github/workflows/pages.yml`. On a push to `main` or `master`, GitHub Actions:

1. Builds the site with `npm run build`.
2. Checks internal links with `npm run check:links`.
3. Uploads `dist/` as the GitHub Pages artifact.
4. Deploys the artifact to GitHub Pages.

For the `rjruan.github.io` repository, the expected public URL is `https://rjruan.github.io/`. In the repository settings, Pages should use GitHub Actions as its source.

## Where Content Lives

Global site content, navigation, project data, field notes, gallery entries, and resume placeholders are defined in:

```text
src/content/site-data.js
```

Reusable rendering templates live in:

```text
src/templates/
```

The main stylesheet lives in:

```text
src/styles.css
```

The build script lives in:

```text
scripts/build.js
```

## Primary Navigation

The five persistent navigation entries are defined in `src/content/site-data.js` under `navigation`:

- Base Camp: `/`
- Expeditions: `/expeditions/`
- Field Notes: `/field-notes/`
- About Ruby: `/about/`
- Resume: `/resume/`

Keep these visible labels exact unless the portfolio brief changes.

## Add a Deep Case Study

Add a project object to the `projects` array in `src/content/site-data.js` with:

- `type: "Deep case study"`
- A unique `slug`
- A `detailPath`, such as `/expeditions/new-case-study/`
- Summary metadata
- `sections` with the deep case-study fields:
  - Overview
  - Context and constraints
  - Problem or research question
  - Role and collaborators
  - Evidence and observations
  - Process and exploration
  - Key decisions
  - Outcome or current state
  - Reflection
  - Open questions or next steps

Run `npm run build` after editing. The build script creates the detail page automatically.

## Add a Medium Project

Add a project object to `projects` with:

- `type: "Medium project"`
- Title
- One-sentence inquiry
- Role
- Context or year
- Status
- Relevant skills or research themes

If it does not have a complete detail page, leave `detailPath: null`. The card will render as a clear preview without a broken link.

## Add a Field Note

Add an object to the `fieldNotes` array with:

- Title
- Date
- Inquiry or topic
- Context
- Observation
- Interpretation
- Open questions
- Related expedition

Field notes should distinguish observations and interpretations. Do not present unvalidated opinions as research findings.

## Add a Graphic-Design Gallery Item

Add an object to `galleryItems` with:

- Title
- Image path, or `image: null`
- Category
- Year
- Role
- Short caption
- Accessible alt text
- Optional detail path

If `image` is `null`, the gallery renders a stable neutral placeholder instead of a broken image.

## Church Professional Case Placeholder

The professional systems case is represented by the `Professional Systems Case Study` object in `projects`.

Until public-sharing permission is confirmed:

- Keep `detailPath: null`.
- Do not add confidential product names.
- Do not publish real screenshots, internal processes, metrics, stakeholder details, or unreleased work.
- Use neutral reconstructed visuals or approved public-safe artifacts only.

To publish it later, replace the placeholder title and description with approved public-safe language, add sanitized section content, set a `detailPath`, and run `npm run build`.
