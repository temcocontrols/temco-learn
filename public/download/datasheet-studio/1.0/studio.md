---
title: "Datasheet Studio"
order: 50
---

**Datasheet Studio** is the app UI for editing datasheets alongside the authoritative target PDF.

**Hard rule:** The WYSIWYG must match the target PDF in all visual respects (titles, tables, typography, colors, geometry). See **[WYSIWYG_MATCH_RULES.md](WYSIWYG_MATCH_RULES.md)** — mandatory for every change to `studio/target-wysiwyg.css` or `wysiwyg-body.html`.

**Document-wide layout** (fixed page size, margins, typography on most pages): **[DOCUMENT_LAYOUT.md](DOCUMENT_LAYOUT.md)** and `examples/<name>/document-layout.json`.

## Launch

```powershell
cd D:\XDrive\datasheet
.\tools\studio.ps1
```

Opens **http://127.0.0.1:8792** (works in the Cursor in-app browser).

### Switch example (target PDF)

Use **Example ▾** in the toolbar, click the **project title**, or right-click the **Target** PDF row in the explorer. Pick any folder under `examples/` that has a reference PDF. Choice persists in `?example=`, session storage, and `data/studio-vars.json` (`studio.active_example`). Full details: **`docs/EXAMPLE_SWITCHING.md`**.

**PDF-only examples** auto-generate a first-pass WYSIWYG + manifests with a visual onboarding animation (explorer tree expands and flashes in sync with blocks popping into the WYSIWYG pane). Step 1 documents the PDF with tinted element boxes. See **`docs/ONBOARDING.md`** (visual sequence) and **`docs/PDF_ELEMENT_DETECTION.md`** (paragraphs, images, tables, titles, page numbers).

## Split view layout

| Pane | Content | Interaction |
|------|---------|-------------|
| **Left** | Target PDF (`SolarPoweredSensor.pdf`) | **Minor edits write back to the PDF** — text (F2 / right-click) and text-block position (resize mode). See **`docs/PDF_DIRECT_EDIT.md`**. **Hide** / **Show PDF** toggles pane. **Mouse wheel** → scroll; **Ctrl+wheel** → zoom (see below). |
| **Divider** | Draggable | Drag left/right to resize panes; hidden with PDF pane. **Esc** cancels drag. |
| **Right** | WYSIWYG working copy | **Editable** — click text and table cells. Same **wheel / Ctrl+wheel** model as PDF. |
| **Explorer** (narrow left) | Target, Document, Links, Tables | **Click** syncs PDF + WYSIWYG. **Ctrl+click** multi-select (join). **Drag** the explorer divider to change width (120–480 px, persisted in `localStorage`). **Wheel** scrolls the tree only. |

There is **no “proposed PDF”** pane. The right side is HTML WYSIWYG, not a second PDF.

### Target PDF (canonical path)

`examples/<example>/reference/SolarPoweredSensor.pdf` — always under this repo (`docs/DATA_HOME.md`).

Rendered with **PDF.js** in `/static/pdf-viewer.html` (fit-to-pane width, scroll inside the pane).

## Mouse wheel

The document panes use a fixed wheel model (also in `examples/solar-lora-sensor/datasheet.yaml` under `studio.zoom`):

| Wheel | PDF pane | WYSIWYG pane | Explorer tree |
|-------|----------|--------------|---------------|
| **Scroll** (no modifier) | Scroll up/down through pages | Scroll up/down through pages | Scroll the tree |
| **Ctrl + scroll** (Cmd on Mac) | Zoom in/out (50–300%) | Zoom in/out (50–300%) | No zoom (modifier ignored) |

- **Scroll** never changes zoom; **Ctrl+scroll** never scrolls (browser page zoom is suppressed over the canvas).
- PDF scroll happens inside the PDF.js viewer; WYSIWYG scroll moves the parent pane while the iframe forwards wheel events.
- **+ / −** in each pane header and **Ctrl + + / − / 0** are alternate zoom controls.

## Pane zoom

**Linked scroll:** When the PDF pane is visible, scrolling in either pane keeps the other on the **same page** with the same **within-page** offset (not a single global % — PDF pages are taller than WYSIWYG because of render scale). WYSIWYG pane zoom is included in scroll math.

**Workspace pan:** Each pane has **80px** horizontal (and **32px** vertical) gray margin around the page so you can scroll past the white sheet into the desk area. **Dead space beyond that margin is forbidden** — see **`docs/STUDIO_PANE_BOUNDS.md`** (hard rule). Run `python tools/verify_pane_bounds.py` after changing zoom, scroll, or pane layout code.

**Auto-fit split:** On zoom (Ctrl+wheel), the divider moves so each pane is only as wide as its scaled page content—no gray dead space between PDF and WYSIWYG. Drag the divider to set a custom width; the next zoom restores auto-fit.

### Scrollbars (hard rule)

**Target PDF** and **WYSIWYG** panes use **hover-only vertical scrollbars** — no always-visible gutter.

| Rule | Detail |
|------|--------|
| Default | Vertical scrollbar thumb **hidden** (no reserved gutter; do not use `scrollbar-gutter: stable`) |
| Reveal | Thumb visible while the pointer is over the pane **or** for ~1s after wheel/scroll |
| Horizontal | Same hover/scroll reveal when content overflows width (workspace pan) |
| Explorer | Unchanged — sidebar tree keeps its normal scrollbar |
| CSS | `studio/scrollbar-hover.css` on `.pane-scroll` (WYSIWYG) and `#viewport` (PDF iframe) |
| WYSIWYG iframe | Parent uses `mousemove` hit-test — hovering document content inside the iframe still reveals the shell scrollbar |

Do not add permanent scrollbars or gutter to document panes. See **`docs/STUDIO_NAVIGATION.md`** § Scrollbars.

| Input | Action |
|-------|--------|
| **Wheel** (PDF, WYSIWYG, Explorer) | Scroll vertically through content |
| **Ctrl + wheel** (PDF or WYSIWYG) | Zoom in / out (physical Ctrl held on Windows; Cmd or pinch on Mac) |

After changing Studio CSS or `app.js`, use **Reload UI** in the toolbar (or open `http://127.0.0.1:8792/?_=1`). Browser **Ctrl+F5** often reloads only the focused iframe (PDF/WYSIWYG) with an old cache key; the address-bar reload + **Reload UI** pick up new `asset_stamp` URLs.

Plain mouse-wheel scroll must not zoom. `studio/wheel-zoom.js` uses **physical** Control/Meta key tracking plus `getModifierState()` on each wheel event so **Ctrl+wheel zooms** even when the pointer is over an iframe (PDF/WYSIWYG). Windows/Chromium may set a fake `ctrlKey` on plain scroll without Control held — that case is ignored unless `getModifierState("Control")` is true.
| **+ / −** (pane header) | Zoom in / out |
| **Ctrl + + / − / 0** | Zoom in / out / reset (100%) |
| **Ctrl + G** | Join selected elements (group) |
| **Ctrl + U** | Ungroup selected grouped element |
| **F2** | Edit text on PDF (text window selected) |

- Range: **50%–300%** (step ~8%)
- Persisted in `localStorage`: `datasheet-studio-zoom-pdf`, `datasheet-studio-zoom-wysiwyg`
- WYSIWYG zoom is applied in the Studio shell (scales the iframe); PDF zoom is inside the PDF.js viewer.

## Resizable split (divider)

- Drag the **vertical divider** between PDF and WYSIWYG (or focus it and use **←** / **→**).
- While the divider moves, the **PDF pane zoom** adjusts automatically so the page fills the left pane width (no gray gap beside the pages). Updates every frame during drag; a short ease applies on release.
- Uses a full-window **drag shield** and document-level **pointerup/mouseup** so release always ends resize (including over iframes).
- **Click** in either pane (PDF or WYSIWYG) also ends an active drag.
- Press **Esc** to cancel an active drag.
- Ratio persisted as `datasheet-studio-split` in browser `localStorage` (survives reload; auto-fit does not override after you drag the divider or a saved ratio exists).
- **TODO:** Persist split ratio in the database as a **per-user** setting (replace or supplement `localStorage`).
- Minimum pane width: ~180px each.

### WYSIWYG working copy (match target PDF)

The right pane mirrors the **4-page** `SolarPoweredSensor.pdf` layout:

- US Letter pages (612×792 pt), Arial, Temco `#232020` ink — see **Typography** below
- Layout matched to PDF metrics — **non-overlapping vertical bands** per `spacing.json` (page 1: intro + product image, then Highlights, then Specifications; pages 2–4: absolute blocks per `studio_layout`)
- **Page guide** underlay at ~28% opacity for alignment — toggle **Guide** in the toolbar (on/off is **sticky** across sessions via `data/studio-vars.json`, key `wysiwyg.guide_visible` — see **`docs/STUDIO_VARS.md`**)
- Content in `examples/solar-lora-sensor/wysiwyg-body.html` (editable)
- Assets extracted to `assets/reference-pdf/` via `tools/extract_pdf_assets.py`

**Save paths**

- Text/sections → `wysiwyg-overrides.json` (`POST /api/save-text`) and/or **directly into the reference PDF** (`POST /api/pdf-edit-text`) — see **`docs/PDF_DIRECT_EDIT.md`**
- Manual text bounds / move on PDF → reference PDF + `element-windows.json` (`POST /api/element-window`) for `kind: text`
- 2-column CSV tables → `tables/*.csv` (`POST /api/save-table/{name}`)
- Complex tables (CO₂, RH/Temp) → overrides as HTML blocks
- Graphics: double-click product photo → Blender (`enclosure-view` link)

**Apply & Refresh** — export modified Blender links, rebuild, reload WYSIWYG.

## Titles (hard rule)

Section and document titles must match the PDF for **highlight band**, **alignment**, **font size** (16 pt document / 14 pt section), and **underline** (document title only — 1 px rule at x=36…576). Section headings use grey `#d4d6d7` bands with **no** underline.

Manifest: `examples/solar-lora-sensor/titles.json`
Full rules: [WYSIWYG_MATCH_RULES.md](WYSIWYG_MATCH_RULES.md) §1

## Document layout (margins + styles)

Target PDFs use **612×792 pt** pages with **document-wide** Arial 12/14/16 pt and a stable **primary text column** (528 px wide, left 42 px). Paragraph and bullet copy use **`studio/document-text-column.css`** (vars from `document-layout.json` via `generate_document_column_css.py`) — see **`docs/DOCUMENT_TEXT_COLUMN.md`**. Section grey bands use fixed width families (181 / 235 / 364 px). Vertical block positions vary per page — see `spacing.json`, not a single margin constant.

Full spec: **[DOCUMENT_LAYOUT.md](DOCUMENT_LAYOUT.md)**
Machine-readable: `examples/solar-lora-sensor/document-layout.json` (template: `examples/_template/document-layout.json`)

## Spacing (hard rule)

Paragraphs, section titles, bullets, tables, and figures **must not overlap** on a page. Each `data-studio-id` block has a fixed `top` and `height` from the PDF; relationships (gaps between intro, Highlights, Specifications, etc.) match `reference/SolarPoweredSensor.pdf`.

Manifest: `examples/solar-lora-sensor/spacing.json` (`studio_layout.blocks`, `regions`, `gaps`)
Full rules: [WYSIWYG_MATCH_RULES.md](WYSIWYG_MATCH_RULES.md) §7

```powershell
python tools/extract_spacing.py
python tools/verify_spacing.py
```

| Title | Size | Band | Underline |
|-------|------|------|-----------|
| Solar Powered Sensor | 16 pt bold | none | yes (full-width rule below) |
| Highlights, Specifications | 14 pt bold | 181 px linked | no |
| Other section headings | 14 pt bold | 235 or 365 px | no |

## Typography (match target PDF)

Font sizes are taken from `reference/SolarPoweredSensor.pdf` (PyMuPDF span histogram) and stored in `examples/solar-lora-sensor/typography.json`. The WYSIWYG canvas is **612×792 layout px = PDF pt**. Typography is emitted as **CSS `px`** with the same numeric values (12 px body = 12 PDF pt). **Do not use CSS `pt`** for page content — browser `pt` renders ~4/3× larger and text overflows fixed blocks from `spacing.json`.

| Role | PDF (measured) | WYSIWYG CSS | Leading |
|------|----------------|-------------|---------|
| Body, bullets, tables | 12 pt | **12px** | **14px** |
| Section headings (`h2.section`) | 14 pt bold | **14px** | **17px** |
| Document title (page 1) | 16 pt bold | **16px** | **19px** |
| Page numbers (`- n -`) | 9 pt | **9px** | **11px** |

Generated: `python tools/generate_typography_css.py` → `studio/generated-typography.css`; base rules in `studio/typography-wysiwyg.css`. Re-measure after a new target PDF:

```powershell
python D:\XDrive\datasheet\tools\analyze_pdf.py
python D:\XDrive\datasheet\tools\generate_typography_css.py
```

Round measurements to integer PDF points in `typography.json`, then regenerate CSS.

## Color and section bands (match target PDF)

Measured from vector fills in `reference/SolarPoweredSensor.pdf` and recorded in `examples/solar-lora-sensor/colors.json`. CSS variables live in `studio/target-wysiwyg.css`.

### Body text

| Role | Hex | Use |
|------|-----|-----|
| Ink | `#231f20` | All body copy, table cell text, grey-band headings |

### Linked grey bands (page 1)

**Highlights** and **Specifications** headings share one width — about **181 px** (~30% of the 612 pt page). Do not stretch grey behind bullet lists or the full table; only the heading strip uses the band.

| Variable | Value | PDF source |
|----------|-------|------------|
| `--band-grey-bg` | `#d4d6d7` | Fill on Highlights + Specifications bars |
| `--band-grey-w-linked` | `181px` | Same width for both bands (linked) |
| `--band-grey-l-highlights` | `41px` | Highlights bar left edge |
| `--band-grey-l-specs` | `36px` | Specifications bar left edge |

### Wider grey bands (pages 2–4)

Section titles use **`--band-grey-w-wide` (235 px)** except **Notes** on page 4 (**364 px**). Same grey fill `#d4d6d7`.

### RH / Temperature table (page 1)

| Element | Background | Text |
|---------|------------|------|
| Grid borders | — | `#231f20` (`--table-border`) |
| Empty corner header cell | White | `#231f20` |
| “Relative Humidity” / “Temperature” headers | `#1b4583` | `#ffffff` |
| Body cells | White | `#231f20` |

### Table geometry (columns, rows, page fill)

`examples/solar-lora-sensor/table-columns.json` records PDF grid lines (PyMuPDF). WYSIWYG uses `table-layout: fixed`, `<colgroup>`, and **fixed row heights** so text does not wrap and inflate table height.

**Enforced automatically:** `python tools/generate_table_css.py` writes `studio/generated-table-*.css` (column widths, row heights, layout, col rules), `examples/*/table-grids.json`, and syncs PDF table tint boxes to `grid_x_px` / `grid_y_px`. Toggle **Table grid** in the toolbar to show column/row lines on PDF + WYSIWYG. See **`docs/TABLE_GEOMETRY.md`**.

**Acceptance:** table bounding box should be within **5%** of the PDF’s share of the page (width × height / 612×792). Check with:

```powershell
python D:\XDrive\datasheet\tools\verify_table_layout.py --example solar-lora-sensor
```

#### RH / Temperature (page 1)

| | PDF | WYSIWYG |
|---|-----|---------|
| Position | left 41.3 pt | `--x-table` **41 px** |
| Size | 539 × 135 pt | **539 × 136 px** (`--table-w`, `--table-rh-h`) |
| Page area used | **~15.0%** | target 14.97% |
| Label / RH / Temp cols | 130.5 / 203.0 / 205.5 | **131 / 203 / 205 px** |
| Row height (8 rows) | 16.7–17.4 pt each | **17 px** each (`--table-rh-row-h`) |
| Cell text | single line | `white-space: nowrap`, `line-height: 16px`, pad **0 4px** |

`131 + 203 + 205 = 539`. Rows are fixed at 17 px so body line-height (14 pt) does not stretch the grid.

#### CO₂ specs (page 2)

| | PDF | WYSIWYG |
|---|-----|---------|
| Position | left 36.5 pt | `--x-table-co2` **37 px** |
| Size | 535 × 192 pt (grid after reconciliation) | **535 × 192 px** (`height_px` = sum of `row_heights_px`) |

Page 2 CO₂ table: the last row was often missing from `grid_y_px` (no bottom PDF stroke). `generate_table_css.py` reconciles grid lines with `row_heights_px` — see **`docs/TABLE_GEOMETRY.md`** → Row/grid reconciliation.
| Page area used | **~19%** | multi-line accuracy rows |
| Columns | 189 / 150 / 36 / 74 / 45 / 41 | same `--col-co2-*` |
| Row heights | 17 / 17 / 53 / 71 / 17 / 17 pt bands | `--co2-row-h-short`, `--co2-row-h-tall`, `--co2-row-h-xl` |

CO₂ cells may wrap inside tall rows; column widths are fixed so line breaks match the PDF bands.

Re-measure after a PDF change:

```powershell
python D:\XDrive\datasheet\tools\analyze_pdf.py
python D:\XDrive\datasheet\tools\verify_table_layout.py
```

Update `table-columns.json`, then run `python tools/generate_table_css.py` (do not edit `--col-*` / row heights in `target-wysiwyg.css` by hand).

Re-measure fills after a PDF change:

```powershell
python -c "import fitz; ..."  # or extend tools/analyze_pdf.py
```

## Element windows (PDF + explorer)

Each leaf in the **Document** tree has a **window** on the target PDF (612×792 pt bounds in `element-windows.json`). This is an early layout step: measure the PDF, generate windows, then align WYSIWYG and navigation.

| Kind | Tree dot / PDF tint | Notes |
|------|---------------------|--------|
| Text | Blue `#4c8bf5` | Section/body bands from `spacing.json` |
| Page title | Bronze `#c4922a` | Running header on each page (`text_role: heading` / `title`); explorer label shows ink rule below |
| Table | Green `#22a06b` | Table grid area |
| Asset (figure) | Amber `#e87b2a` | **Tight** to PyMuPDF image rect + 4 px padding |
| Link (product shot) | Purple `#9b5de5` | **Tight** to image only — not the whole intro column |
| Page | Grey `#6b7b8c` | Full page |

**PDF pane:** All windows show as a **very light tint**; the selected item uses a stronger outline in the same color. **Explorer:** Colored dot beside each label matches its PDF tint.

Regenerate after PDF or layout changes:

```powershell
python tools/extract_element_windows.py
python tools/verify_element_windows.py
```

Or regenerate spacing + windows together:

```powershell
.\tools\sync-layout-manifests.ps1
```

Manifest: `examples/solar-lora-sensor/element-windows.json`
API: `GET /api/element-windows`

The linked graphic on page 1 is a **product shot** (`link:enclosure-view`), not a “3D enclosure” section.

### Refine element windows (right-click PDF tint)

Right-click any passive **tint box** on the target PDF for sizing helpers:

| Menu option | Effect |
|-------------|--------|
| Fit to text inside box | Union of text blocks overlapping the window |
| Too tall / trim top / trim bottom | Shrink vertical extent to content |
| Too narrow / widen to column | Adjust horizontal bounds |
| Exclude title / heading | Drop short heading lines from the union |
| Exclude photo / figure overlap | Clip text column before images |
| Snap to image only | Use image bounds (links/assets) |
| AI auto-detect | Re-run `extract_element_windows.py` rules for that id |
| Show drag handles | Same as **double-click** the tint box (see below). |
| **Save manual size** | Commits drag-resized bounds while edit mode is active. |

**Manual resize mode** — full workflow: **`docs/ELEMENT_WINDOW_RESIZE.md`**.

| Gesture | Enters edit mode? |
|---------|-------------------|
| **Double-click** PDF tint box | Yes — 8 handles; drag handle or interior to move |
| **Double-click** explorer Document leaf (with a window) | Yes — focuses PDF and same handles |
| **Double-click** WYSIWYG block (`data-studio-id`) | Yes — except product-shot link images (Blender) |
| **Single click** any pane | No — select/sync only |
| **Click outside** editing box | Saves bounds to PDF (text) + `element-windows.json` and exits |

API: `POST /api/element-window/refine` `{ id, action }`, `POST /api/element-window` `{ id, left_px, top_px, width_px, height_px }`.

### Direct PDF text edit

Fix spelling and grammar **on the PDF canvas** (not only in WYSIWYG):

| Gesture | Action |
|---------|--------|
| **F2** on selected text tint | Open inline editor on PDF |
| **Right-click** text tint → **Edit text on PDF** | Same |
| **Ctrl+S** / click outside | Save to reference PDF + WYSIWYG override |

Full spec: **`docs/PDF_DIRECT_EDIT.md`**.

### Group / ungroup elements

| Shortcut | Action |
|----------|--------|
| **Ctrl+click** | Add/remove item from multi-selection (explorer, PDF, WYSIWYG) |
| **Ctrl+G** | Join selected elements into one window |
| **Ctrl+U** | Ungroup selected grouped element |
| **Right-click** (≥2 selected) | **Join into single element** |

Full spec: **`docs/ELEMENT_GROUPING.md`**.

## Document explorer & navigation

Vertical tree (**Target** → **Document** → **Links** → **Tables (Typst)**).

**Target** lists the example’s reference PDF filename (e.g. `SolarPoweredSensor.pdf`) — one leaf, no duplicate page entries. **Example ▾** (toolbar), **project title** click, or **right-click** that filename opens the example picker (`POST /api/switch-example`; see **`docs/EXAMPLE_SWITCHING.md`**). **Document** expands into **Page 1…4** subfolders; each page folder lists **every block on that page in print order** as **flat rows at the same indent** (subtitles, body blocks, tables, and figures are siblings — not nested under section folders in the explorer UI). Order comes from `document-outline.json` after flattening (`tools/studio_server.py` → `_explorer_page_leaves()`). There is **one** page-1 intro entry — **Solar Powered Sensor** (`text:intro`) — not a separate Typst “Overview” or “Introduction”. The Typst file `datasheet.typ` is only for the hybrid build (CSV tables, Blender links); the 4-page body is edited in `wysiwyg-body.html`.

**Page folders:** click the **▸/▾** chevron to expand or collapse; click the **Page N** label to jump to that page in the PDF and WYSIWYG.

### Subtitle sections (grey-band headings)

**Fundamental requirement:** On **every page**, Studio must **identify each section subtitle** from the reference PDF and render it in the WYSIWYG with **matching formatting** — grey band `#d4d6d7` on the **`h2.section.subtitle` only**, canonical heading size (typically 16 pt bold), and body content merged under the subtitle until the next band heading. Missing subtitles, plain `h2.section` without the band, or orphan body blocks are **layout defects**.

**Color roles (do not mix):**

| Color | Where | Purpose |
|-------|--------|---------|
| `#d4d6d7` grey | WYSIWYG `h2.section.subtitle` background only | Printed subtitle band in the PDF |
| `#4c8bf5` blue | PDF pane element-window tints, explorer text dots, edit focus on **body** | Studio UI — not the printed page |
| `#c4922a` amber | Title / running-header windows | Document title blocks |
| `#1b4583` blue | Table header cells | Spec tables only |

Never grey-tint whole blocks, PDF overlays, or body paragraphs. Grey is **only** the subtitle heading band.

Many datasheets use a **section subtitle** — a short heading on a **grey background band** (`#d4d6d7`) in the target PDF, or an **underlined style heading** in a second column. Page 1 of `current-sensor-cs` is a **two-column layout**: band subtitles on the left (*Descriptions*, *Features*, …) and style subtitles on the right (*Clamping Style*, *Non Clamping Style*). Page 3 uses the same left-column band style (*Specifications*, *Part Number Scheme*, *Ordering information*) even when the PDF has no vector grey-fill rects (font-based detection).

**Required rule (subtitle sections):** A band subtitle owns **all content until the next band subtitle** on that page. See **`docs/PDF_ELEMENT_DETECTION.md`** §5.5.

| Follower type | Linked how |
|---------------|------------|
| **Paragraphs, lists, spec lines** | Merged with the subtitle into **one text element** (one PDF tint, one WYSIWYG block, explorer folder row) |
| **Tables** (`table:*`) | Separate element — **child row** in the same section folder (green dot) |
| **Images** (`link:*` / `asset:*`) | Separate element — **child row** in the same section folder (purple / amber dot) |
| **Figure captions** (right column) | Separate text element — **child row** in the same section folder |

During auto-onboarding and in **`document-outline.json`**, subtitle **merge** rules still apply (subtitle + body → one window). In the **Studio explorer UI**, page folders show a **flat print-order list** — each subtitle and follower is its own row at the same left margin:

| Where | Behavior |
|-------|----------|
| **Explorer** | **Flat list** under each **Page N** folder (no nested section-folder indent). Each row = one element window. |
| **Row click** | Jumps to that block’s `navigate_id` / `data-studio-id`. |
| **WYSIWYG** | Merged text: `h2.section.subtitle` on grey band + one or more `<p class="body-text">` rows. Tables and figures stay separate blocks in print order. |
| **PDF tints** | One tint for subtitle+text when merged; separate tints per table, figure, caption. |

Detection uses **vector fill rectangles** behind the heading when present (`has_band: true`, `text_role: subtitle`), **or** the **left-column band-font fallback** — short heading, center x &lt; 305 pt, font ≥ 15 pt → `has_band: true` (required on pages like `current-sensor-cs` page 3 where bands are raster-only). Right-column style headings use `STYLE_HEADING_RE` (*Clamping Style*, *Non Clamping Style*).

**Regression:** `python tools/verify_subtitle_grouping.py`

**Subtitle font match rule:** All section subtitles in a document share one **canonical heading size** (the mode of left-column band subtitles ≥ 15 pt). A subtitle is **out of spec** when `|heading_font_pt − canonical| > 0.5 pt`. Merged subtitle+body blocks store **`heading_font_pt`** (on `h2.section`) separately from **`font_pt`** (body text in `<p class="body-text">`). Batch fix: `python tools/sync_subtitle_fonts.py <example>` or `POST /api/sync-subtitle-fonts`.

**Copy tagging (enforce one subtitle style):** Right-click a subtitle block in the **WYSIWYG** pane (a block with `h2.section`) → **Copy tagging to…** → click the orphan subtitle (e.g. right-column *Clamping Style*). Copies **heading** font size (not inherited body size), line height, grey band background, and `h2.section.subtitle` class; updates `element-windows.json`, `wysiwyg-overrides.json`, and `generated-onboard-layout.css`. **Esc** cancels pick mode. API: `POST /api/copy-subtitle-tagging` with `{ source_id, target_id, tag? }`.

**Links** lists Blender-linked graphics (e.g. enclosure render). **Tables (Typst)** lists CSV tables used only in the Typst build, not in the 4-page target PDF.

### Linked highlighting (three panes)

**Full click/scroll contract:** **`docs/STUDIO_NAVIGATION.md`** (required reading for agents changing navigation). **Persistent UI vars:** **`docs/STUDIO_VARS.md`**. **Regression log:** `docs/AGENT_FIX_LOG.md`.

A click in **any** pane updates the **other two**:

| You click in… | Explorer | Target PDF | WYSIWYG |
|---------------|----------|------------|---------|
| **Explorer** (leaf) | Selects tree item | Scrolls + highlights matching window | Scrolls + outlines block |
| **Target PDF** (tinted window) | Selects matching leaf | Active window outline | Scrolls + outlines block |
| **Target PDF** (page background) | Selects Page N | — | Scrolls to page |
| **WYSIWYG** (block/image) | Selects matching leaf | Highlights matching window | Outlines clicked block |

Passive PDF tints, WYSIWYG outline, and explorer selection use the same `data-studio-id` / `element-windows.json` bounds.

**Scroll isolation:** PDF and WYSIWYG share vertical scroll position with each other only. Wheel and drag scrolling stay inside those panes; the explorer column does not move when you read the right-hand panes. Cross-pane clicks update explorer selection but do not auto-scroll the tree (only clicking a row in the explorer scrolls the tree, and only when needed to reveal that row).

**Toggle all highlighting:** **Right-click** the **Target** or **Document** group title in the explorer (not Page 1…4). This hides passive PDF tints and colored tree dots; **single-click still selects** elements (invisible PDF hit targets remain). WYSIWYG passive overlays turn off; active selection on click still works. Right-click again to restore. Preference is stored in `localStorage` (`datasheet-studio-pane-highlights`).

| Action | Result |
|--------|--------|
| **Single click** explorer leaf | Syncs PDF + WYSIWYG + tree selection |
| **Single click** tinted PDF window | Syncs explorer + WYSIWYG (PDF stays put) |
| **Double-click** tinted PDF window | Manual resize mode (see `ELEMENT_WINDOW_RESIZE.md`) |
| **Double-click** explorer Document leaf | Same resize mode on PDF |
| **Double-click** WYSIWYG block | Same resize mode on PDF (not product-shot link) |
| **Click** WYSIWYG block | Syncs explorer + PDF |
| **Right-click** Target or Document title | Toggle all pane highlighting on/off |
| **Right-click** Target PDF filename | Open another example datasheet |
| **Double-click** link in tree | Blender |
| **Double-click** **Tables (Typst)** row | Excel (`TABLE_EDITING.md`) |
| **Double-click** **Document** table row (CO₂, RH/Temp) | PDF resize — not Excel |
| **Double-click** WYSIWYG PDF grid table | PDF resize — not Excel; see `TABLE_EDITING.md` |
| **F2** (PDF pane, text tint selected) | Edit text on PDF — saves to reference PDF |
| **Right-click** PDF text tint → **Edit text on PDF** | Same as F2 |
| **Right-click** PDF text tint → alignment | Left / center / right / justify (`POST /api/text-align`) |
| **Ctrl+click** explorer / PDF / WYSIWYG | Multi-select for join |
| **Ctrl+G** | Join selected elements |
| **Ctrl+U** | Ungroup selected grouped element |
| **Right-click** (≥2 selected) | **Join into single element** |

Stable IDs: `data-studio-id` on each `<section class="studio-block">`. Text headings may use `navigate_id` to map to a table/link block. API: `GET /api/outline`.

## Toolbar

| Control | Action |
|---------|--------|
| **Show PDF** | Restores the hidden target PDF pane (visible only while PDF is hidden) |
| **Apply & Refresh** | Pull Blender/Excel changes, refresh WYSIWYG |
| **Accept** | Snapshot working state as baseline |
| **Revert** | Restore baseline |

## Manifest (`datasheet.yaml`)

```yaml
studio:
  port: 8792
  layout: pdf-left-wysiwyg-right
  explorer:
    groups: [target, links, tables, text]
    width_px: 200
  split:
    draggable: true
    storage_key: datasheet-studio-split
    pdf_hidden_key: datasheet-studio-pdf-hidden
    default_ratio: 0.5
    min_pane_px: 180
    pointer_capture: true
    escape_cancels: true
    pdf_hide_button: true
  titles:
    manifest: titles.json
  table_columns:
    manifest: table-columns.json
  colors:
    manifest: colors.json
    band_grey_w_linked_px: 181
    table_header_blue: "#1b4583"
  typography:
    manifest: typography.json
    decimal_sizes: false
    sizes_pt: { body: 12, section: 14, title: 16, page_number: 9 }
    leading_pt: { body: 14, section: 17, title: 19, page_number: 11 }
  zoom:
    wheel_scroll: wheel
    wheel_zoom: true
    wheel_scroll_modifier: ctrl
    input: [wheel, buttons]
    keyboard: [ctrl-plus, ctrl-minus, ctrl-zero]
    min: 0.5
    max: 3.0
    step: 0.08
    per_pane: true
    wysiwyg_zoom_host: parent_shell
    storage_keys:
      pdf: datasheet-studio-zoom-pdf
      wysiwyg: datasheet-studio-zoom-wysiwyg
  panes:
    left:
      type: pdf
      source: reference_pdf
      viewer: pdfjs
      page_width_px: 612
      fit_to_pane: true
      zoom: true
      hideable: true
      scroll: pane
      thumbnails: false
    right:
      type: wysiwyg
      endpoint: /preview/wysiwyg
      editable: [text, tables]
      fit_to_pane: true
      zoom: true
  navigation:
    highlight_attr: data-studio-id
    focus_class: studio-focus
    scroll: smooth
    dual_pane: true
    bidirectional: true
    pdf_page_field: pdf_page
    focus_editable: true
    api_outline: /api/outline
```

## Files

| File | Role |
|------|------|
| `examples/.../reference/SolarPoweredSensor.pdf` | Target PDF (canonical; **editable in Studio** for text + text position) |
| `examples/.../reference/*.original.pdf` | Backup before first PDF direct edit |
| `tools/pdf_direct_edit.py` | Write text / relocate text blocks in PDF |
| `tools/join_elements.py` / `tools/ungroup_elements.py` | Group / ungroup element windows |
| `tables/*.csv` | Spec tables (edited from WYSIWYG) |
| `wysiwyg-overrides.json` | Saved WYSIWYG text blocks |
| `element-windows.json` | PDF tint bounds per `id` |
| `pdf-element-groups.json` | **Persistent user join/ungroup** (PostgreSQL planned — see **`docs/ELEMENT_GROUPING.md`**) |
| `graphics.links.json` | Blender links |
| `datasheet.typ` | Typst source (full layout; export via build) |
