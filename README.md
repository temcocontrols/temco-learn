# Temco Learn

The documentation site for Temco Controls products.

| | |
|---|---|
| **Stack** | Vite 6, React 19, React Router 7, Fluent UI v9, TypeScript |
| **Reads** | Markdown in `content/`, HTML in `public/imported/` |
| **Writes** | `public/catalog.json`, `public/search.json`, `public/content/`, `public/download/`, `public/pdf/`, `public/chm/`, `dist/` |
| **Publishes** | a `v*` tag: deploys GitHub Pages and attaches a zip to a draft Release |
| **Needs** | Node.js 22.6 or newer; Chromium for the PDFs; `hhc.exe` for the help files |

Contents: [Quick start](#quick-start) - [Scripts](#scripts) - [Content](#content) - [Routes](#routes) -
[Ports and the base path](#ports-and-the-base-path) - [Generated files](#generated-files) -
[Downloads](#downloads) - [Gates](#gates) - [Publishing](#publishing) - [Troubleshooting](#troubleshooting) -
[Layout](#layout)

## Quick start

```bash
npm install
npm run client-dev -- --port 1025      # http://localhost:1025/  (hot reload)
npm run build                          # catalog, search, bundle, PDFs, help files
npm run serve                          # serve the built dist/
npm run check && npm run guard         # what CI runs before it deploys
```

`npm run pdf` warns and skips when Chromium is missing, and `npm run chm` does the same without HTML Help Workshop, so a
machine with neither still builds and serves the site.

## Scripts

| Command | Does |
|---|---|
| `npm run client-dev` | Vite development server |
| `npm run build` | catalog, search index, type-check, bundle, PDFs, `.chm` |
| `npm run build:fast` | the same without the PDFs and the `.chm` files |
| `npm run serve` | Vite preview of `dist/` |
| `npm run catalog` | compile the Markdown into `public/catalog.json`, `public/content/`, `public/download/` |
| `npm run search` | rebuild `public/search.json` |
| `npm run pdf` | rebuild the PDFs; needs `dist/` and Chromium |
| `npm run chm` | rebuild the help files and `public/download/manifest.json` |
| `npm run check` | `tsc --noEmit`, the content rules, ESLint |
| `npm run guard` | every version has a PDF and a `.chm`; `manifest.json` matches disk |
| `npm run lint` | ESLint only |

`catalog` runs before `pdf` and `chm`: both read `public/catalog.json`, and `pdf` also reads `dist/`.

## Content

```
content/
  config.json                    repository, edit branch, published URL, home-page hints
  sections.json                  the sections projects are grouped under
  <project>/
    site.json                    title, section, summary, optional repository and editBranch
    <version>/
      00-index.md                required: the version's landing page
      <page>.md                  one page
public/imported/
  <project>/<version>/**/*.html  a build from another repository, copied verbatim
```

A project is a folder under `content/`; a version is a folder inside it. The same shape under `public/imported/` serves
HTML built elsewhere.

### `config.json` and `sections.json`

`content/config.json` holds the site-wide answers the edit links fall back to, plus the hints offered under the home-page
search:

```json
{
	"repository": "https://github.com/temcocontrols/temco-learn",
	"editBranch": "main",
	"siteUrl": "https://temcocontrols.github.io/temco-learn/",
	"hints": ["alarms", "ports", "programming"]
}
```

`content/sections.json` lists the groups a project can be filed under:

```json
[
	{ "id": "documentation", "title": "Documentation", "description": "Guides and references for every product." },
	{ "id": "qa", "title": "Q&A", "description": "Questions from installers and engineers." }
]
```

`site.json` names the product and one section id from that list:

```json
{
	"title": "T3000",
	"section": "documentation",
	"summary": "The controller family that began the platform.",
	"repository": "https://github.com/temcocontrols/T3000_Building_Automation_System",
	"editBranch": "main"
}
```

### Front matter

```markdown
---
title: Getting started
order: 10
description: Install the driver and prove the controller answers.
edit: false
---

## Install the driver

Prose starts at `##`: the page title is the `#`. The first page of a version is `00-index.md`.
```

| Field | Meaning |
|---|---|
| `title` | page title; required, unique within a version |
| `order` | position in the version; pages without one follow those with one |
| `description` | shown under the title and in search results |
| `edit` | a URL to edit the page elsewhere, or `false` to hide the edit link |

### Callouts

```markdown
::: note Optional title
The text of the note.
:::
```

Four kinds: `note`, `tip`, `important`, `warning`.

### Imported pages

A build copied to `public/imported/<project>/<version>/` is served as it was written, inside an iframe, so its own CSS and
assets apply.

| | |
|---|---|
| Title | read from the page's `<title>` |
| Order | `index.html` first, then by path |
| Search | indexed by title |
| Edit link | none: there is no Markdown source |

## Routes

| Address | Shows |
|---|---|
| `/` | home: the sections, and recent changes |
| `/search?q=alarm` | search results |
| `/<section>` | one section, listing its projects |
| `/<project>` | one project, listing its versions |
| `/<project>/<version>` | one version, pages in reading order |
| `/<project>/<version>/<page>` | one page |
| `/print/<project>/<version>` | the whole version as one document (what the PDF prints) |
| `/print/<project>/<version>/<page>` | one page as a document |

The build writes `dist/404.html` as a copy of the app shell, so GitHub Pages answers a deep address with the router
instead of a missing file.

## Ports and the base path

| Started by | Port | Where the number lives |
|---|---|---|
| `npm run client-dev` | 5173 | Vite's default; pass `--port` to change it |
| `npm run serve` | 1011 | `preview.port` in `vite.config.ts` (`strictPort`) |
| the Temco platform | 1025 | the `temcoLearn.sitePort` setting, passed as `--port` |

Routes are paths, not hashes, so the mount point is fixed at build time:

```bash
npm run build                            # VITE_BASE unset   ->  /
VITE_BASE=/temco-learn/ npm run build    # GitHub Pages      ->  /temco-learn/
VITE_BASE=/learn/ npm run build          # platform mount    ->  /learn/
```

Framed, the site stands its masthead down (`?embed=1`, or any iframe) and reports its height to the parent:

```js
{ type: 'temco-learn:height', height: document.documentElement.scrollHeight }
```

## Generated files

| Path | Written by | Committed |
|---|---|---|
| `public/catalog.json` | `npm run catalog` | yes |
| `public/search.json` | `npm run search` | yes |
| `public/content/<project>/<version>.json` | `npm run catalog` | yes |
| `public/download/` | `npm run catalog`, `npm run chm` (`manifest.json`) | yes |
| `public/pdf/` | `npm run pdf` | yes |
| `public/chm/<project>/<version>.chm` | `npm run chm` | yes |
| `dist/` | `npm run build` | no |

They are committed because CI cannot rebuild them: the PDFs need Segoe UI and the help files need `hhc.exe`, neither of
which a Linux runner has. `vite build` copies the committed `public/pdf`, `public/chm` and `public/download` into `dist/`,
so the deploy serves exactly the files that were built and reviewed locally.

## Downloads

Each page offers the files for its version. A download exists only when the file was built and committed.

| Download | File |
|---|---|
| The version as a PDF | `public/pdf/<project>/<version>.pdf` |
| One page as a PDF | `public/pdf/<project>/<version>/<page>.pdf` (authored pages only) |
| Windows Help | `public/chm/<project>/<version>.chm` |
| Markdown | the source page, and one concatenated file per version |
| Standalone HTML, and a ZIP of the Markdown | `public/download/` |

Each Release carries the same files beside the site, so one can be had without unpacking the build:
`temco-learn-v<version>.zip` (the whole site), plus `pdf/<project>/<version>.pdf` and
`chm/<project>/<version>.chm` for every version.

`public/download/manifest.json` lists the help files that exist on disk; the download menu reads it, so it never points at
a `.chm` that was not built.

## Gates

`npm run check` fails on:

- a page with no `title`, or two pages in one version sharing a title;
- a version with no `00-index.md`;
- prose starting at `#`;
- a callout kind other than `note`, `tip`, `important`, `warning`;
- `config.json` naming a repository that is not `https://github.com/owner/name`;
- `site.json` with no title, or naming a section that is not in `sections.json`.

`npm run guard` fails on:

- a version in the catalog with no whole-guide PDF;
- an authored page with no single-page PDF;
- `manifest.json` and the `.chm` files on disk disagreeing.

## Publishing

Only a tag publishes. `.github/workflows/publish.yml` triggers on `v*` and produces both outputs from the one commit:

```yaml
npm ci
npm run check
# the tag must equal `version` in package.json, or the run stops here
VITE_BASE=/ npm run build:fast               # -> temco-learn-v<version>.zip, attached to a draft Release
npm run guard
VITE_BASE=/temco-learn/ npm run build:fast   # -> the Pages artifact, deployed
```

**A push to `main` publishes nothing.** The live site keeps serving the last tag until the next one is cut, so a page fix
reaches readers only when the version is bumped:

```bash
npm version minor --no-git-tag-version
git commit -am "Bump the site to $(node -p "require('./package.json').version")"
git tag -a "v$(node -p "require('./package.json').version")" -m "Temco Learn"
git push origin main --follow-tags
```

To publish the current `main` without cutting a tag — Pages only, no Release and no zip — run **Actions → Publish → Run
workflow**.

Served at `https://temcocontrols.github.io/temco-learn/`.

Enabling Pages is a **one-time manual step**: Settings → Pages → Build and deployment → Source: "GitHub Actions". The
workflow cannot do it, because creating the Pages site needs `administration: write`, a permission `GITHUB_TOKEN` cannot
hold — which is also why `enablement: true` on `actions/configure-pages` fails with "Resource not accessible by
integration". Until that switch is thrown, the `build` job fails at `actions/configure-pages` and nothing deploys — but the
draft Release, being created before those steps, still appears.

Content versions (`<project>/<version>`) are folders, not tags: they appear in the URL and each is offered as a download.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `npm run guard` fails with a missing PDF or `.chm` | the file was never built, or was built but not committed | `npm run build` on Windows, then commit `public/pdf` and `public/chm` |
| `chm: HTML Help Workshop is not installed` | `hhc.exe` is not on the machine or not in its usual place | install HTML Help Workshop, or set `HTMLHELP_HHC` to the full path of `hhc.exe` |
| `pdf:` skips every version | no Chromium for Playwright | `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM` to a browser you have |
| A deep address is 404 on a host other than Pages | the host has no SPA rewrite and no `404.html` | serve `index.html` for unknown paths (`try_files` on nginx, a rewrite on IIS or Express) |
| The live site did not change after a push | only a tag publishes | cut the next tag, or run **Actions → Publish → Run workflow** |
| The site renders with no styles or missing JSON | it was built with the wrong `VITE_BASE` | rebuild with the prefix the host serves it under |

## Layout

```
content/       config.json, sections.json, <project>/<version>/*.md
public/        generated catalog, index, downloads, PDFs, help files; imported/ build output
scripts/       catalog, search, check-content, check-artifacts, pdf, chm, zip
src/           the application: routes, shell, theme, catalog reader, styles
docs/design/   design notes
```
