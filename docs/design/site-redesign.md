# Site redesign — a documentation reader for temco-platform

Status: **built**. Phases 1–6 are implemented; the deviations from this document, and why, are listed in
[§10 As built](#10-as-built).

This document is the contract for the redesign of Temco Learn into a Microsoft Learn / MSDN–style
documentation reader that runs standalone and inside the Temco platform. It records the decisions taken, the
type system, every screen, the two new features (PDF export, edit on GitHub), the order of work, and what is
deliberately out of scope.

Decisions taken with the maintainer:

| Question | Decision |
|---|---|
| Where does 12px apply? | **12px is the chrome** (tabs, nav, meta, badges). **Prose is 14px** on a 12px root, and everything inside the article scales from that one number in `em`. |
| How does PDF work? | **Build-time**, Playwright + Chromium, written beside `catalog.json` and committed. |
| First change set | **Phases 1–3** — type system, shell, article reader, search overlay, browse pages. |
| Embedded in the platform? | **Yes, iframe.** An embedded shell mode is part of phase 1. |

---

## 1. What the redesign is solving

The site today is one sticky bar, a three-column reader, and a search page. It is quiet and legible, but it
reads as a small website rather than as a documentation platform:

- no page-level actions — no version switcher in place, no export, no edit link;
- the left column is a flat list, not a navigable tree, and has no filter;
- the right column does not follow the reader;
- code, callouts and tables are unstyled text;
- 16px type with hardcoded `fontSize: 13`/`14` inline styles gives no density control and no consistency;
- the shell duplicates what the Temco platform already shows when the site is embedded.

The target is not a visual clone of Microsoft Learn. It is the three things that make a docs site feel like a
docs platform: **density**, **a stable frame** (breadcrumb + page actions that never move), and **every page
reachable in one keystroke**.

Conventions kept from the existing code:

- Fluent UI owns every control and every colour token; `styles.css` owns the page.
- The accent is Azure `#0078d4` and nothing else is coloured.
- Clean paths and no server, no API. The build is the only pipeline. (Written as hash routing at first; see §10.1 item 20
  for why that changed.)
- Generated files (`catalog.json`, `content/*.json`, `search.json`) are committed, so a fresh clone opens
  without building. Any new generated artefact (PDFs) follows the same rule.

---

## 2. Look and feel

Microsoft Learn reduces to three ideas, which this redesign adopts:

1. **One accent.** Azure for links, focus rings, the active tab and one primary button per screen. Everything
   else is neutral.
2. **Hairlines, not shadows.** Structure comes from 1px strokes and background steps. The only shadow is a
   2px lift under the two sticky bars once the page is scrolled.
3. **Density.** Small chrome, generous line-height, deep navigation. Nothing is padded for decoration.

### 2.1 Tokens

Extends the existing `:root` block in `src/styles.css`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ink` | `--colorNeutralForeground1` | same token | body text |
| `--ink-2` | `--colorNeutralForeground2` | same token | secondary prose, nav |
| `--ink-3` | `--colorNeutralForeground3` | same token | meta, labels, captions |
| `--surface` | `--colorNeutralBackground1` | same token | page |
| `--surface-2` | `--colorNeutralBackground2` | same token | breadcrumb bar, table head, code strip |
| `--surface-3` | `--colorNeutralBackground3` | same token | inline code, hover on nav |
| `--line` | `--colorNeutralStroke2` | same token | every hairline |
| `--line-strong` | `--colorNeutralStroke1` | same token | input borders, pager cards |
| `--brand` | `#0067b8` | `--colorBrandForegroundLink` | links |
| `--brand-soft` | `#eff6fc` | `--colorBrandBackground2` | selection, callout `note` |
| `--accent-note` `--accent-tip` `--accent-warn` `--accent-imp` | blue / green / amber / red at `Background2` weight | same tokens | callouts |
| `--radius` | `4px` | — | controls |
| `--radius-lg` | `6px` | — | surfaces |
| `--gutter` | `clamp(16px, 3vw, 40px)` | — | page margin (unchanged) |
| `--read` | `120ch` (the prose cap) | — | prose measure |
| `--mono` | `ui-monospace, SFMono-Regular, Consolas, monospace` | — | unchanged |

**Convention change.** `styles.css` currently states *"nothing is boxed (a surface, not a border)"*. A reader
with a bordered TOC, a code-block header strip, callout boxes and pager cards cannot honour that literally.
The header comment is amended to **"surfaces, not shadows"** so it stays true.

### 2.2 Two type layers

The request was "12px by default". 12px body prose is below the usual readability floor, so the type system is
split into two layers: chrome is dense and **fixed**; reading text is 14px and **scales**.

**Layer A — chrome, fixed at 12px.** These are labels, not reading text. They never scale.

| Role | Size | Token |
|---|---|---|
| Eyebrow / uppercase label | 11px | `--fs-micro` |
| Meta rows, table cells, badges, breadcrumb | 12px | `--fs-ui` |
| Left page tree, right "In this article" | 13px | literal |
| Masthead tabs | 15px | literal |
| Card title, section heading in a list | 14px | `--fs-ui-lg` |

**Layer B — reading text, in `em` off a 14px prose base.**

`html { font-size: 12px }` sets the chrome; the article sets `.prose { font-size: 14px }` and every size inside it is
expressed in `em`, so the reading scale follows one number. A text-size control was built and then removed; the site is
denser without one, and browser zoom still works.

| Role | Size | computed |
|---|---|---|
| Prose body, list items, table body | `14px` | 14 |
| Prose small print, figure caption | `0.929em` | 13 |
| Inline code, code blocks | `0.929em` mono | 13 |
| Article `h3` | `1.143em` | 16 |
| Lede / article description | `1.25rem` | 15 |
| Article `h2` | `1.357em` | 19 |
| Article `h1` | `2.667rem` | 32 |
| Hero `h1` | `3.333rem` | 40 |

Line-heights: prose `1.7`, chrome `1.4`, headings `1.25`-`1.3`.

**Fluent trap.** Fluent's typography tokens are px strings, so they ignore the root font size. Without a fix,
every Fluent control stays at its own size and the page looks broken. `src/theme.ts` therefore re-declares the
Fluent typography tokens so controls match their context:

- `fontSizeBase300` → `12px` (Fluent's default 300 is 14px) for chrome controls;
- article-level primary actions use `fontSizeBase300` too, so a project page's buttons match the tab strip;
- `lineHeightBase300` → `16px`.

**Measure.** The reading column fills its grid track, and prose inside it is capped at `120ch` — a character measure, not a
pixel one, so the report and the text grow together when the reader changes size. Tables, code blocks and figures are
allowed past the cap and use the whole column, which is what makes the reader read as full-width on a normal screen without
turning a paragraph into a two-hundred-character line on a 1920px one.

---

## 3. Shell

One sticky row, plus a page head that belongs to the content. The first build had two sticky rows; the second made every
page feel like a tool window and duplicated search, so it was folded back into the page.

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ T  Temco Learn │ Documentation  Training  Tests  Products  Q&A  Topics │ 🔍 ☾ │ 48px, sticky
└───────────────────────────────────────────────────────────────────────────────────┘
  Temco Learn › Documentation › Test1 › 1.0 › Ports and wiring   [1.0 ▾] [⬇ PDF] [✎ Edit] [⋯]
  ── inline, at the top of the column it describes ──
```

### 3.1 Masthead (48px, sticky)

- Brand: `T` mark + "Temco Learn" at 16px, hairline divider, then the six section tabs at **14px**.
- Right cluster: **search** (the only search on the site, opening the palette on `Ctrl K`) and the theme toggle.
- The only other sticky things are the article's own rails; nothing else follows the reader.

### 3.2 Page head (inline)

Rendered by `PageHeader` at the top of the content column — inside `.page` on browse routes, inside the article column on a
page — and it is not sticky.

| Slot | Behaviour |
|---|---|
| Breadcrumb | `Temco Learn › Section › Project › Version › Page`. Middle segments truncate with an ellipsis; the current page never truncates. Below 620px only the ends remain. |
| Version dropdown | Article and version routes only. A Fluent-style popover listing the project's versions with each one's page count, marks the newest `Latest`, and keeps the reader on the same page (by title) when it exists in the target version. |
| Download | A popover grouped into printed artefacts (full-guide PDF, this page's PDF, Windows help `.chm` when one was compiled) and sources (Markdown, HTML, ZIP), each row carrying a file-kind icon and a one-line note, with a hairline between the two groups. |
| Edit | Pencil + "Edit", opens GitHub in a new tab. Hidden when the page has no source (§6). |
| Overflow `⋯` | Copy link, View history, Report an issue, then Print behind a separator. |

All three popovers follow Fluent's Menu decoration: 6px radius, one hairline over a two-layer elevation shadow, 4px inset
padding, 4px-radius rows that fill on hover, a leading 16px icon in secondary ink, the label in primary ink with an 11px
note beneath it, and a 120ms fade-and-lift on open (skipped under `prefers-reduced-motion`).

Every action that leaves the site uses `target="_blank" rel="noopener noreferrer"` — mandatory when the site is inside the
platform's iframe, where navigating the top frame would be hostile.

There is deliberately no search control here: search is one keystroke away at the top, and a second entry point inside a
per-page toolbar is a duplicate rather than a convenience.

### 3.3 Embedded mode

The platform shows its own header, so the site must not show a second one.

- Activated by `window.self !== window.top` **or** `?embed=1`.
- Sets `documentElement.dataset.embed`, hides `.mast` (masthead) entirely, and drops page padding to `14px` on the sides.
- Posts `{ type: 'temco-learn:height', height }` to the parent on resize and on route change, so the host can
  size the iframe without a scrollbar inside a scrollbar.
- The page head is unaffected: it is content, and the reader still needs it.

This is in phase 1 because retrofitting it later means touching every route.

---

## 4. Screens

### 4.1 Home

Becomes a documentation home, not a marketing page.

- Hero over a soft mesh — three translucent glows (Azure blue, a cool teal, a tint of violet) blooming from the open corners
  over a 4% wash, with a hairline that fades out at both ends instead of a band. `Temco Learn`, one sentence at full width,
  then **one finder block**: the wide search field, and beneath it a single row with the three searches this site gets
  (`alarms`, `ports`, `BACnet points`) on the left and "Recently updated" on the right as inline links
  (`Test1 1.0 · 8 hours ago`) ending in "All documentation →". No cards and nothing boxed.
- The search is a **split field**: the input, then a plain bordered action beside it with a magnifier icon and the word
  "Search" in normal text — no fill, no caps, weight 400. On the home page the action is a link (`href="search?q=…"`), so
  it works before any JavaScript runs. Focus is shown by the field's own hairline turning brand, not by a ring.
- Six sections as a **plain grid of links** — three across, hairline above each row, no fills and no shadow. Each item is a
  small brand-tinted letter, the title (which turns brand and underlines on hover), a two-line description and its project
  count.


### 4.2 Section (`/documentation`)

- Hero unchanged.
- Projects are the same **hairline tiles** as the home page — a letter, a title that turns brand on hover, a two-line
  summary and `Latest 1.0 · 2 versions · updated 2 days ago`. No card fills.
- "Other sections" repeats the grid for the remaining five, under its own label row with a count.
- Tables anywhere else (versions, pages) are **borderless**: a hairline under the header and between rows, no outer box.

### 4.3 Project (`/t3000/`)

The product landing.

- Hero: title, summary, badges (`N versions`, `Latest 1.0`), and two buttons: **Read latest**, **Download PDF**.
- **Versions as a table** — `Version · Pages · Updated · status · Open` — replacing the card grid. Version
  lists grow monotonically and cards stop scanning after four.
- "In `<latest>`" keeps the page rows, with imported (`docfx`) pages marked.

### 4.4 Version (`/t3000/1.0/`)

The version landing, and the screen with the most to offer.

- Hero: section eyebrow, `Product 1.0`, one meta line (`5 pages · built 2 hours ago`), a sentence-style banner when the
  version is not the newest (`You are reading 0.9. Switch to 1.0 →`), and **four actions**: `Start reading`, `PDF`,
  `Windows help` (only when a `.chm` exists) and `All versions`.
- **The version's contents**, not a table of pages. The folders the build wrote become **tabs** in a Fluent `TabList`: the
  version's own front pages lead the strip, named by the page they open with (`TStat8`, `T3000`), each tab carries the
  chapter's first page number and its title, and the chosen chapter's pages fill the panel below in **three columns read
  down and then across** — two below 900px, one below 620px — as `01 · title · 1 min` rows under a line that gives the range
  they cover (`10–34`) and the chapter's size (`25 pages · 33 min`). Numbers follow the contents rather than the file listing,
  because a build writes its pages in an order that interleaves folders. A version with no folders at all (psychrometric,
  ph-chart) is the plain list with no strip, since a strip of one tab says nothing. The section label carries the total:
  `39 pages · 47 min`.
- **Other versions** as quiet chips (`0.9 · 1 page`) with no borders.
- The page head above carries the version switcher and the full download menu for anything the hero does not show.

### 4.5 Article — the reader

Three columns: `250px / minmax(0, 1fr) / 230px`, sticky rails, with the prose filling the middle column up to `120ch`.

| Element | Today | Redesign |
|---|---|---|
| Left column | flat `<ul>` | **tree**: filter input, version group header, page list at 12px, own scroll (`max-height: calc(100vh - 96px)`), active page with a 2px brand rail |
| Right column | TOC, no state | TOC with **scroll-spy** active marker and a hairline rail |
| Header | h1 + description | eyebrow (section), h1, description, **meta row**: `Updated Oct 30 · 3 min read · applies to 1.0` + ✎ Edit + `⋯` |
| Headings | ids exist, no affordance | on hover, a `#` that copies the deep link — built from the ids the compiler already emits |
| Code | plain `<pre>` | header strip with language + **Copy**; `highlight.js` at build time; line numbers only past 8 lines |
| Callouts | none | `::: note / tip / important / warning` → tinted box, icon, left rule (`markdown-it-container` at build time) |
| Tables | bare | scroll wrapper, `--surface-2` head, optional sticky first column |
| Images | bare | `<figure>` + caption from `alt` |
| Footer | two text links | **Additional resources** block → **pager cards** (`‹ Previous` / `Next ›`) → **"Was this page helpful?"** |

Imported (`kind: 'build'`) pages keep the iframe, but gain the same header, meta row, download and pager; the
"written by the build" note becomes a small badge instead of a paragraph.

### 4.6 Search

The results page stays (it is a real address: `/search?q=alarm`). The overlay (§5.5) is the primary way in.

Page improvements: grouped by product, `<mark>`-highlighted snippet, "jump to heading" entries, and a
"nothing matches" state that offers the nearest titles rather than only advice.

### 4.7 Not found

Search field, "did you mean" over catalog titles (Levenshtein ≤ 3), the six sections, and the two most
recently updated projects.

---

### 4.8 Footer

A sitemap on its own surface, about three rows tall (149px at 1440). The surface is **dark in both schemes** —
`#0e1a24` in light, `#121110` in dark — opened by an accent line that fades at both ends, so the foot reads as the edge of
the page rather than as more page.

- **Brand**: mark, name, one sentence.
- **Sections / Products / Resources**: column headings at 11px, links at 12px. The two long lists (`Sections`, `Resources`)
  run in **two CSS columns**, which halves their height without dropping a link; `Products` stays single. Below 900px the
  grid becomes two columns, below 620px one, and the split lists fall back to a single column.
- **Base line**: `© <year> Temco Controls`, the size of the index (`2 products · 8 pages · 6 sections`),
  `Index built <date>` from `catalog.generated`, and a **Back to top** pill — so a reader can tell how stale the site is and
  leave the foot of a long page without scrolling.

---

## 5. Features

### 5.1 Phase-1 supporting changes

- `markdown-it` pipeline gains `markdown-it-container` (callouts) and `highlight.js` (code), both at build time
  in `scripts/catalog.mts`. The compiler also emits, per page: `updated` (from `builtAt`), `minutes`
  (words / 200) and `source` (repo-relative path, §6).
- The hardcoded `fontSize: 13`/`14` inline styles in `ProjectPage`, `Article` and `SearchPage` move into
  tokens and classes; that is what makes the density uniform.
- A **skip link**, visible focus rings on every interactive element, and `prefers-reduced-motion` honoured for
  smooth scrolling.

### 5.2 Tree navigation

- Filter input filters the page list by title and by heading text (headings are already in `search.json`).
- Keyboard: Arrow Up/Down to move, Enter to open, Escape to clear the filter.
- Current page always scrolled into view on mount.

### 5.3 Reading aids

- Scroll-spy: `IntersectionObserver` over `h2`/`h3` with a root margin matched to the sticky bars.
- Heading deep links copy `location.href + '#' + id` and confirm with a 1.5s "Copied" chip.
- Copy on code blocks uses `navigator.clipboard`, with a `document.execCommand` fallback.

### 5.4 PDF export

**Build-time, Playwright + Chromium.** Chosen because the site is static: a PDF that is generated at build and
committed behaves exactly like `catalog.json` — a fresh clone has it, Pages serves it, and no runtime
dependency or platform endpoint is needed.

Order of work inside the pipeline:

```
catalog → search → tsc → vite build → pdf → mirror → deploy
```

- `scripts/pdf.mts` starts `vite preview` on a free port, visits one URL per artefact and writes PDFs.
- **One artefact per version** (`pdf/<project>/<version>.pdf`) and **one per page**
  (`pdf/<project>/<version>/<slug>.pdf`).
- Each version PDF starts from a **cover** (product, version, build date) and concatenates the pages in
  reading order, followed by a generated "In this guide" list.
- Rendering settings: A4, 18mm margins, `printBackground: true`, forced light theme
  (`data-theme="light"` injected), sticky positioning disabled, `displayHeaderFooter` with
  `Temco Learn · <project> <version> · page X of Y` in the footer, and **`outline: true`** so Chromium writes
  PDF bookmarks from the headings. That outline is the table of contents inside the PDF viewer.
- Chromium cannot write *page numbers into a printed TOC* (`target-counter` is unsupported). The cover list is
  therefore a plain list, and the navigable TOC is the PDF outline. If printed page numbers ever become a hard
  requirement, the renderer moves to WeasyPrint — with weaker support for this layout.
- PDFs are written into `dist/pdf/` by the build and **mirrored into `public/pdf/`**, so they are committed and
  survive a clone without a build (the same invariant the README states for the catalog).
- `npm run build` runs the full pipeline; `npm run build:fast` skips PDF for local iteration. CI runs the full
  one.
- Imported `kind: 'build'` pages are same-origin iframes and print correctly.

**Other formats**, cheapest first:

| Format | How | Phase |
|---|---|---|
| Markdown source | direct link to `content/<project>/<version>/<file>.md` on GitHub | 5 |
| Single-page HTML | concatenate compiled bodies + inline CSS (also the PDF input) | 5 |
| Version ZIP | zip of a version's `.md` files, written by `catalog.mts` | 5 |
| Windows Help (.chm) | `scripts/chm.mts`: one topic per page, contents tree, index, `.hhp`, then `hhc.exe` | 5 |
| DOCX / EPUB | Pandoc in CI — deferred, adds a dependency chain | not planned |

**CHM is a Windows-only artefact.** The `ITSF` container is produced by Microsoft's HTML Help Workshop, so the script
assembles the project and then runs `hhc.exe`; when the workshop is absent (a Linux CI runner) it warns, skips, and leaves
the committed files alone. `public/download/manifest.json` is written from what is on disk, and the app reads it so the CHM
entry only appears where a file exists.

**Print stylesheet regardless.** `@media print` lands in phase 1 with the type system, so Ctrl+P on any
article is already respectable and the PDF route inherits a solved problem.

### 5.5 Search overlay (`Ctrl K`)

- Opens from the masthead button, `Ctrl K` / `Cmd K`, or `/`.
- Three states: idle (recent searches, top pages), typing (type-ahead, 120ms debounce, max 40 results grouped
  by product), empty ("nothing matches" + nearest titles).
- Keyboard: Up/Down to move, Enter to open, Escape to close, `Tab` cycles results.
- Result rows show title, product · version, and a highlighted snippet; heading matches show
  `Page › Heading` and deep-link the anchor.
- Index change: `search.json` excerpt grows from 200 to ~400 characters, and each record gains the heading ids
  it already holds as text (`ha`, parallel to `h`), so a result can land on a section.
- Focus is trapped while open and returned to the trigger on close; the underlying page is `aria-hidden`.

### 5.6 Edit on GitHub

The blocker is data, not UI: `PageEntry` has no source path.

1. **Catalog** — `scripts/catalog.mts` adds `source: "content/t3000/1.0/ports.md"` to every Markdown page.
   Imported pages get no `source` unless the project declares a repository.
2. **Config** — `content/<project>/site.json` gains optional `repository` and `editBranch` (default `main`); a
   repo-wide default lives in `content/sections.json`.
3. **Front matter overrides** — `edit: false` hides the pencil; `edit: <url>` points a page at another repo.
4. **`src/data.ts`** gains `editUrl(...)`, `historyUrl(...)` and `issueUrl(...)`:
   - edit → `${repository}/edit/${branch}/${source}`
   - history → `${repository}/commits/${branch}/${source}`
   - issue → `${repository}/issues/new?title=${...}&body=${...}` with the page address pre-filled.
5. **UI** — ✎ in the breadcrumb bar and in the article meta row; *View history* and *Report an issue* in the
   overflow menu. No auth work: GitHub signs the editor in.
6. **`scripts/check-content.mts`** gains one rule — a `repository` that is not `https://github.com/owner/name`
   fails the build, in the spirit of the file's existing "a docs repo fails quietly" contract.

---

## 6. Order of work

| Phase | Scope | Files touched |
|---|---|---|
| **1** | Type layers + A−/A+ + Fluent token fix; tokens and spacing; breadcrumb/action bar; embedded mode; print stylesheet; inline styles → classes | `styles.css`, `theme.ts`, `Shell.tsx`, new `Breadcrumbs.tsx` / `PageActions.tsx`, `main.tsx` |
| **2** | Article reader: tree nav with filter, scroll-spy TOC, heading anchors, code header + copy + highlight, callouts, meta row, pager cards | `Article.tsx`, `catalog.mts` (plugins, `updated`/`minutes`), `styles.css` |
| **3** | ⌘K overlay + richer index; Home / Section / Project / Version / 404 restyle | new `SearchOverlay.tsx`, `search.mts`, `Home.tsx`, `SectionPage.tsx`, `ProjectPage.tsx`, `VersionPage.tsx`, `NotFound.tsx` |
| **4** | Edit on GitHub + history + report issue | `model.ts`, `catalog.mts`, `check-content.mts`, `data.ts`, article/breadcrumb UI |
| **5** | Print route, `scripts/pdf.mts`, Playwright dev-dependency, CI step, Markdown/ZIP/full-HTML downloads | new `Print.tsx` + `scripts/pdf.mts`, `package.json`, `pages.yml`, README |
| **6** | Optional: feedback widget (needs a decision on where answers go), "applies to" version ranges, keyboard cheatsheet | — |

Phases 1–3 are the approved first change set. 4 and 5 follow as their own change sets; 5 depends on the print
stylesheet from phase 1.

---

## 7. Verification

Every phase, before it is called done:

- `npm run check` — type-check, content rules, lint.
- `npm run build` — the pipeline, including PDF once phase 5 lands.
- Visual pass over each address: `/`, six sections, a project, a version, an article, an imported article,
  `/search?q=alarm`, a bad address.
- Both schemes, four widths (360 / 768 / 1280 / 1920), and **A− through A+** at each width.
- Keyboard-only pass: `Tab` order, `Ctrl K`, tree arrows, Escape, focus return.
- Print preview of an article, and — after phase 5 — a generated PDF opened to check page count, footer, and
  that the outline lists the headings.
- Embedded smoke test: the built site in an iframe with `?embed=1`, checking no double header, correct height
  messages, and that external links open in a new tab.

---

## 8. Not doing

- **No server, no API.** Everything stays static. It was also hash-routed at first; §10.1 item 20 records why the
  addresses became clean paths instead, and what that costs at the host.
- **No identity or locale UI.** The platform owns who you are and what language you read.
- **No broken links.** An address from the hash-routing days (`#/t3000/1.0/ports`) is rewritten to its clean equivalent
  before the router starts, so a link already shared still lands on the page it named.
- **No DOCX/EPUB** until someone actually needs them.
- **No shadows, no card-on-card nesting, no second accent colour.**
- **No feedback backend** in phase 6 unless the platform offers a sink; until then the widget records locally
  and thanks the reader.

---

## 9. Open items

1. **Feedback sink** — where do "Was this page helpful?" answers go? Platform endpoint, GitHub issue, or
   local-only for now.
2. **PDF on Pages vs platform** — build-time PDFs are committed and served by Pages. If the platform serves the
   site from its own origin, confirm `dist/pdf/` is copied along with it.
3. **Which repo owns imported pages** — docfx output under `public/imported/` has no Markdown source; if those
   should offer an edit link, `site.json` needs a `repository` pointing at the producing repo.
4. **`00-index.md` naming** — the de-duplication in §4.4 assumes `index` is presented as "Overview". Confirm.

---

## 10. As built

What shipped, and every place it differs from the plan above.

**Phases 1–6 all landed**, plus two things that were not planned because they were broken or missing:

| Where | What was found | What was done |
|---|---|---|
| `eslint.config.js` | The repo had the ESLint packages and `npm run check` ran `eslint .`, but there was **no config file** — ESLint 9 errors out, so `check` (and therefore the Pages workflow) failed before linting anything. | Added a flat config: `@eslint/js` + `typescript-eslint` recommended, the React hooks rules, and the `scripts/` globals. `npm run check` now passes end to end for the first time. |
| `index.html` | No favicon, so every visit logged a 404 for `/favicon.ico`. | Inline SVG favicon in the colour of the brand mark. |

Deliberate deviations:

1. **No line numbers on code blocks.** `highlight.js` emits spans that can cross newlines, so a naive per-line
   wrapper would break the markup. A token-aware line splitter is not worth it for the benefit; the block keeps
   its language label, its Copy button and its syntax colour instead.
2. **Site-wide repository config lives in `content/config.json`**, not in `content/sections.json`. `sections.json`
   is consumed as a plain array by the app and by `check-content.mts`; turning it into an object would have broken
   both. Per-project overrides stay in `site.json`, and front matter still wins.
3. **The dark palette is declared in CSS, not read from Fluent tokens.** `FluentProvider` sets its custom
   properties on its own element, so `var(--colorNeutral…)` never resolves at `:root` — with the old fallback-only
   tokens, dark mode produced light text on a white page. `styles.css` now owns `:root` and
   `html[data-theme='dark']` explicitly, and turns on `color-scheme` so native selects and scrollbars follow.
4. **PDF bookmarks could not be verified on this machine.** `page.pdf({ outline: true })` is passed, but the
   Chromium available here (a revision older than the pinned Playwright expects) ignores the flag, so the
   generated files contain no `/Outlines`. The pinned revision CI installs supports it. The cover's "In this
   guide" list means the guide is complete either way, and the number of pages is in the footer
   (`page X of Y`).
5. **`PLAYWRIGHT_CHROMIUM`** was added to `scripts/pdf.mts` as an escape hatch: a machine that cannot download
   the bundled browser can point the script at one it already has.
6. **The "In this article" box appears below 1180px**, where the right column is dropped, rather than on every
   width — with the TOC permanently visible it would be a duplicate.
7. **Feedback is local-only**, kept beside the theme key and the text size. `src/components/Feedback.tsx` writes
   to `localStorage`; the open item above stays open, and one function changes when the platform offers a sink.

Verification performed: `npm run check` (type-check, content rules, lint), `npm run build:fast`, `npm run pdf`
(11 PDFs written and mirrored), screenshots of all nine routes in light and dark at 1440px, at 420px, with the
palette open on `Ctrl K`, and with the text size stepped up — no console errors on any route. The generated ZIP
was opened with `Expand-Archive` to confirm its central directory and CRCs are correct.

### 10.1 Revision after the first review

Five changes came out of reading the built site, and they replace what §3 and §4.1 first specified:

1. **The second sticky row is gone.** Breadcrumbs and page actions moved into `PageHeader`, an inline row at the top of the
   column they describe — inside `.page` on browse routes, inside the article column on a page. Nothing but the masthead and
   the article's rails follows the reader now, and `--sub-h` disappeared with it.
2. **One search.** The page head has no search control; the masthead holds the only one (§3.2).
3. **Home leads with "Recently updated"** as a tinted panel of compact rows, above the sections rather than below them.
4. **No bordered cards.** Sections are flat tiles (three across, surface step on hover, one-pixel lift) and the project
   cards on section pages lost their outline too, so the two pages speak the same language.
5. **The hero background is a mesh**, not a band: two wide brand-coloured glows from the open corners, with a hairline that
   fades out at both ends instead of a rule across the page. Both schemes have their own glow strengths.
6. **The footer is a real footer**: four columns from the catalog plus a base line with the size and age of the index.
7. **The reader fills its column.** The prose was capped at `72ch` inside a much wider track, which left a third of the
   middle column empty. Prose now runs to `120ch` and tables, code and figures take the whole column; the two page titles
   grew with it (hero 32 → 40px, article 24 → 28px).
8. **The page title matches Microsoft Learn.** Measured live on
   `learn.microsoft.com/en-us/training/…`: the `h1` is **40px on a 52px line, weight 600, normal tracking**, on a 16px root.
   The article title was set to exactly that, 40×52, and the hero already sat at 40px. (It later came down — see 16.)
9. **A second review pass** then raised the masthead type (brand 14 → 16px, tabs 12 → 13px), turned "Recently updated" from
   a tinted row list into borderless horizontal cards with the title as a link, squared the home search action and made it a
   link rather than a button, rebuilt the footer as chip rows with a back-to-top, and warmed the hero mesh to three
   translucent glows — blue, teal and violet — instead of two of the same blue.
10. **Third pass**: the section tabs went to 14px; the A−/A+ control was deleted and its smallest stop (12px) became the fixed
    root, so prose is 12px and nothing scales but browser zoom; the search, its hint chips and "Recently updated" merged into
    one finder block with no cards; and the section tiles lost their fills for a hairline grid of links.
11. **Fourth pass**: the hint chips and "Recently updated" share one row (chips left, recent right), the search action lost its
    caps, tracking and weight, the field shows focus with its own border instead of a ring, and the hero sentence runs the
    full width.
12. **Fifth pass**: the search keeps the split shape — input, then a gap, then a plain bordered action with a prefix magnifier
    icon — and the focus indicator is a single hairline border change rather than a 2px ring.
13. **Sixth pass**: the section pages joined the home page. `Cards.tsx` became `Tiles.tsx`, so projects and "other sections"
    are the same hairline grid with no fills; the last card CSS was deleted; and tables lost their outer box, keeping only a
    hairline under the header and between rows.
14. **Seventh pass**: the version page was rebuilt — four useful actions in the hero, a numbered page grid with no lines,
    quiet version chips — the page head's native version `<select>` became a menu that lists every version with its size, and
    Download became one menu listing every artefact. That menu gained **Windows Help (.chm)**: `scripts/chm.mts` assembles a
    help project (topics, contents tree, index) and runs `hhc.exe`, writing `public/download/manifest.json` from the files on
    disk so the entry only shows where a `.chm` exists.
15. **Eighth pass**: the article's reading size went from 12px to **14px**, with `h2`, `h3`, tables, code and captions
    re-expressed in `em` so the whole reading scale moves together (the lede went to `1.4rem` to stay above it), and the left
    rail's filter field became `display: block` — it was an inline `<label>`, so its bottom margin had never applied and the
    page tree sat flush against the search box.
16. **Ninth pass**: the article title came down from 40px to **36px** and its lede from 17px to **15px** — against this
    chrome the Learn-sized title was overpowering the page. The reading chrome went up to meet the larger prose instead: the
    left page tree and the right "In this article" rail from 12px to **13px** (the filter field now inherits it, and its
    magnifier is centred rather than pinned to a pixel offset), and the masthead tabs from 14px to **15px**.
17. **Tenth pass**: the reading headings came down again — `h1` 36 → **32px**, `h2` 22 → **19px**, `h3` 17 → **16px** — so a
    page reads as a title, sections and text rather than three competing headline levels. Body stays at 14px.
18. **Eleventh pass**: "Was this page helpful?" and the previous/next row lost their `120ch` cap, so both now span the
    reading column edge to edge. The pager keeps the original two equal halves — the row is wider, the cards are as wide as
    they always were relative to each other — and their pressed and keyboard-focused states fill with the hover tint over a
    brand border instead of flashing the generic 2px focus ring.
19. **Twelfth pass**: the three page-head menus were redrawn as Fluent popovers — a hairline over a two-layer elevation shadow,
    6px radius, 4px inset padding, full-bleed hover rows — and every row gained a structure: a 16px file-kind icon (PDF, help
    book, text, globe, archive) beside the label in primary ink with an 11px note under it. Download now separates printed
    artefacts from sources with a rule, the open trigger reads pressed with its chevron turned over, and the popover fades
    and lifts 4px into place. To carry the marks, `downloads()` in `chrome.ts` returns `kind` and `group` per file instead of
    bare label/detail pairs.
20. **Thirteenth pass — clean addresses.** `/t3000/1.0/ports` replaces `/#/t3000/1.0/ports`. This reverses the "hash routing
    on purpose" decision in §2 and §8, knowingly:
    - `HashRouter` became `BrowserRouter` with `basename` from `import.meta.env.BASE_URL`;
    - `base: './'` could not survive, because a document at a deep path resolves `./assets/…` against the page rather than
      the app. The prefix is now baked in per host with `VITE_BASE` (`/` locally, `/temco-learn/` on Pages, `/learn/` for a
      platform mount), and the four `fetch('./…')` calls plus every download link read from `siteBase` in `data.ts`;
    - GitHub Pages has no rewrites, so the build copies `index.html` to `dist/404.html` and Pages answers unknown paths with
      it. Verified against a static server with no fallback: `t3000/1.0/ports`, `t3000/1.0/`, `t3000/`, `documentation`,
      `search?q=alarm` and `print/t3000/1.0` all render, at the clean address, with no console errors. Such responses carry
      an HTTP 404 status — invisible to a reader, imperfect for a crawler;
    - `index.html` rewrites an old `#/…` address into its clean path with `history.replaceState` before the router mounts, so
      every link shared before the change still lands on the page it named;
    - `scripts/pdf.mts` joins its route onto the preview's base with `new URL()` instead of building `#` addresses, and the
      eleven PDFs were regenerated to prove it.
21. **Fourteenth pass — the version's contents.** The numbered page grid became a contents page. The pages were already
    grouped by their addresses (`introduction/specifications`), so `VersionPage` reads the chapters out of those addresses
    rather than out of a second list kept in step with them: a folder is a chapter, named by its own page — the page that
    carries the folder's name, or the `readme`/`index` a tool gives it — and headed by the range it covers. Grouping comes
    **before** the numbering, because a build writes its pages in an order that interleaves folders (t3000 lists two pages of
    `menu-items-and-tree`, then three of something else, then three more of it), and numbering the file listing first made
    every chapter's range run over pages that were listed somewhere else on the page. Numbers are therefore the reader's
    count down the contents page, not the catalogue's. Each chapter's rows run in CSS columns — down one column and then the
    next, which is how a contents page is read and what a row-major grid cannot do — and every row is `number · title · time`
    on one line, with the number column measured once (34px) so titles line up whether they sit under a heading or under
    nothing. A chapter of one page is its heading alone. Reading time is the catalogue's own `minutes`, summed per chapter and
    for the version (`39 pages · 47 min`), and `readingTime()` in `data.ts` lets it say `1 hr 9 min`. Three chapters or more
    adds the `Chapters` jump list; a version with no folders at all (psychrometric, ph-chart) is the same list without the
    headings.
22. **Fifteenth pass — the chapters as tabs.** The stacked contents page became a Fluent `TabList`: one chapter at a time,
    with the strip keeping every chapter in reach. The cost is measured and accepted — t3000's eighteen chapters wrap the
    strip to three rows (Fluent v9 has no overflow menu for tabs), and the tabs pull about 86 kB more into the bundle (373 →
    459 kB raw, 116 → 139 kB gzipped). The pages that sit in no folder became the first tab, named by the page they open
    with, so a version never opens on an empty panel, and a version with no folders keeps the plain list rather than a strip
    of one tab. The page rows, the number column and the reading-time line are unchanged; only the way a chapter is chosen is.
