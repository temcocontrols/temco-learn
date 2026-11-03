# Temco Learn

The documentation site for every Temco Controls product: six sections, one folder per product, one page per version.

It is a plain front-end project — Vite, React and Fluent UI — and it owns everything the site needs: the screens, the
theme, the content, the search index, the PDFs and the deployment. Nothing here knows about the editor that publishes
into it.

The reader is built to be read inside the Temco platform as much as on its own: one sticky masthead with the only search on
the site (`Ctrl K`), a breadcrumb and page actions that sit inline at the top of the content, a filterable page tree, a
table of contents that follows the reader, and — per page — a version switch, a PDF, the Markdown source, and a pencil that
opens the page in GitHub.



## Run it

```bash
npm install
npm run client-dev -- --port 1025   # http://localhost:1025/t3000/    (hot reload)
npm run build                       # catalog + index + type-check + bundle + PDFs → dist/
npm run build:fast                  # the same without the PDFs (local iteration)
npm run serve -- --port 1025        # http://localhost:1025/           (what the built site looks like)
npm run check                       # type-check, content rules, lint
npm run guard                       # every version has its committed PDF and Help file
npm run pdf                         # only the PDFs (needs dist/ and a Chromium from playwright)
npm run chm                         # only the Windows Help files (needs HTML Help Workshop)
```

Neither server script names a port: pass `--port`, so the built pages and the development server answer at the same
address and the Temco platform's Learn module can move both with one setting (1025 by default).

`npm run build` is the whole pipeline: `scripts/catalog.mts` compiles the Markdown and lists the versions,
`scripts/search.mts` writes the index, `tsc` type-checks, `vite build` writes `dist/`, and `scripts/pdf.mts` prints the
guides through a headless browser.

## Addresses

```
/                                    Home — the six sections, and what changed lately
/documentation                       a section
/t3000/                              a project
/t3000/1.0/                          one version, its pages in reading order
/t3000/1.0/ports                     one page
/search?q=alarm                      search
/print/t3000/1.0                     the guide as a document, for the PDF and for Ctrl P
/print/t3000/1.0/ports               one page as a document
```

Clean paths, no `#/`. GitHub Pages has no rewrites, so a direct hit on a deep address finds no file and Pages answers with
`404.html` — the build writes one as a copy of the app shell, and the router reads the path from there. The address stays
clean; the only consequence is that such a response carries an HTTP 404 status, which readers never see.

Clean paths also mean the browser resolves assets against the mount point, so the prefix is baked in at build time:

| Target | `VITE_BASE` |
|---|---|
| `npm run client-dev`, `npm run serve` | unset → `/` |
| GitHub Pages (`…github.io/temco-learn/`) | `/temco-learn/` — set in `pages.yml` |
| Platform mount, e.g. `https://platform/learn/` | `/learn/` |

A server with an SPA rewrite (Express, IIS, nginx `try_files`) needs no `404.html`; it can serve `index.html` for any path.
An address from the hash-routing days (`#/t3000/1.0/ports`) is rewritten to its clean equivalent before the router starts,
so links already shared keep working.

Two query flags exist for the host: `?embed=1` (or being inside an iframe) stands the masthead down, because the Temco
platform shows its own header, and posts the page height to the parent so the frame needs no scrollbar of its own.

## Downloads

Every page offers the same set of downloads, generated at build time and committed beside the catalog. The page-head
Download menu lists them in two groups — printed artefacts, then the sources they are made from:

| What | Where it comes from | How big |
|---|---|---|
| PDF of the version | `scripts/pdf.mts`, printing `/print/<project>/<version>` | one file per version |
| PDF of the page | the same script, printing the single-page route | one file per page |
| Windows Help (.chm) | `scripts/chm.mts`, assembling a help project and running `hhc.exe` | one file per version |
| Markdown | the source `.md`, plus one concatenated file per version | `public/download/` |
| HTML and ZIP | one standalone HTML file per version, and a ZIP of the Markdown | `public/download/` |

The PDF script warns and skips when no Chromium is installed, and the CHM script warns and skips when HTML Help Workshop
is missing — a local build without either still succeeds. CI runs `playwright install chromium` first; the CHMs are
committed, so a Linux runner keeps serving the files it cannot rebuild, and `scripts/chm.mts` writes
`public/download/manifest.json` from what is **on disk**, not from what that run managed to compile. The app reads that
manifest, so the CHM entry only appears where a `.chm` really exists.

If a machine cannot download Chromium, point the script at one it has: `PLAYWRIGHT_CHROMIUM=/path/to/chrome npm run pdf`.
For the help files, set `HTMLHELP_HHC` to `hhc.exe` if the workshop lives somewhere unusual.

## Content

Two kinds of page, one catalog:

| kind | where it comes from | who writes it |
|---|---|---|
| authored | `content/<project>/<version>/*.md` | a person, in Markdown with front matter |
| imported | `public/imported/<project>/<version>/**/*.html` | a project's own build (docfx), copied verbatim |

```markdown
---
title: Getting started
order: 10
description: Install the driver and prove the controller answers.
---

## Install the driver
Prose begins at `##`: the page title is the `#`.

::: note
Callouts are `::: note`, `::: tip`, `::: important` and `::: warning`, with an optional title after the kind.
:::
```

`content/<project>/site.json` names the product and the section it is listed under:

```json
{ "title": "Test1", "section": "documentation", "summary": "What the product is, in one sentence." }
```

`content/config.json` answers the site-wide questions — where the pencil points, and where the site is published:

```json
{
	"repository": "https://github.com/temcocontrols/temco-learn",
	"editBranch": "main",
	"siteUrl": "https://temcocontrols.github.io/temco-learn/"
}
```

With a repository set, every Markdown page gets **Edit this page**, **View history** and **Report an issue** pointing at
its own source file. A project that lives elsewhere overrides it in its `site.json`, and front matter overrides either one:

```markdown
---
title: A page kept somewhere else
edit: https://github.com/temcocontrols/another-repo/edit/main/docs/page.md
---
```

`edit: false` hides the pencil for a page that should not be edited here. Pages written by a project's build have no
Markdown source, so they carry no pencil unless their front matter says where to go.


`npm run check` enforces the rules a docs repo breaks silently: every page has a title, no two pages in a version share
one, prose starts at `##`, and each version has a `00-index.md` landing page.

## Publishing

Push to `main`; `.github/workflows/pages.yml` builds the site and deploys it to GitHub Pages
(`https://temcocontrols.github.io/temco-learn/`). The catalog, the search index, the downloads and the PDFs are generated
by `npm run build` — and they are committed as well, so a fresh clone opens (and downloads) without building first.

**CI does not rebuild the PDFs or the help files.** Both need something a Linux runner does not have: Segoe UI (so a PDF
built there would fall back to other fonts and not match what you reviewed) and `hhc.exe` (Windows only). The deploy runs
`npm run check`, `npm run guard` and `npm run build:fast`, and `vite build` copies the committed `public/pdf`, `public/chm`
and `public/download` into `dist/` — so the site serves exactly the files you built.

What that asks of you: **run `npm run build` on Windows before committing content changes.** `npm run guard` is the safety
net — it fails when a version in the catalog has no whole-guide PDF, when a page has no single-page PDF, or when
`manifest.json` and the `.chm` files on disk disagree. CI runs it before deploying; run it locally too.

The Temco platform's Learn module adds a build by copying it into `public/imported/…`, regenerating the catalog and
pushing — which is the same thing you would do by hand.

### Tags

`main` is the live site, so a deploy needs no tag. Tag only when you want to hand someone a frozen build:

```bash
# bump "version" in package.json first — .github/workflows/release.yml checks that the tag matches
git tag -a v0.1.0 -m "Temco Learn 0.1.0"
git push origin v0.1.0
```

The `Release` workflow then attaches `temco-learn-v0.1.0.zip` — the whole built site, PDFs and help files included — to a
GitHub release. Bump `patch` for content fixes, `minor` for a new section, project or version, `major` for a redesign or
a URL change.

Content versions (`t3000/1.0`) are **not** tags: they already live in the URL and in `content/t3000/1.0/`, and the site
offers each one as a download.

## Layout

```
content/        the docs: config.json, site.json per project, a folder per version of Markdown
public/         catalog.json, search.json, content/*.json, download/, pdf/ (generated) and imported/ (build output)
scripts/        catalog.mts, search.mts, check-content.mts, check-artifacts.mts, pdf.mts, chm.mts, zip.mts
src/            the app: routes, theme, chrome (breadcrumb and page actions), catalog reader, styles
docs/design/    the redesign this site was built from
```