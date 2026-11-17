---
title: "PDF element detection (deep dive)"
order: 170
---

**Authority:** The reference PDF under `examples/<slug>/reference/*.pdf` is the single source of truth. Before any WYSIWYG HTML or Typst work, Studio **documents the PDF** by measuring every logical element and storing a bounding box in `element-windows.json`.

This document specifies **what** to detect, **how** to measure it with PyMuPDF, and **how** those boxes drive the explorer tree, PDF tint overlays, and the visual onboarding sequence.

Related: **`docs/ONBOARDING.md`** (visual playback), **`docs/ELEMENT_WINDOW_RESIZE.md`** (manual refinement), **`docs/DOCUMENT_LAYOUT.md`** (margin families and manifests).

---

## 1. Why boxes come first

Onboarding is intentionally ordered:

```
PDF on disk
    ↓
Measure every element → element-windows.json   ← STEP 1 (this doc)
    ↓
Derive explorer tree → document-outline.json
    ↓
Derive vertical layout → spacing.json
    ↓
Scaffold editable HTML → wysiwyg-body.html
    ↓
Visual playback (explorer flash + WYSIWYG pop + PDF tint)
```

**Hard rule:** A WYSIWYG block, explorer leaf, and PDF tint must share the same `data-studio-id` / `id` and the same bounds (within tolerance). If the box is wrong, navigation and the onboarding animation will look out of sync.

Coordinate space for all boxes:

| Property | Value |
|----------|-------|
| Page size | **612 × 792 pt** (US Letter) |
| Origin | Top-left of page |
| Units | PDF points = WYSIWYG layout px |
| Manifest | `element-windows.json` → `windows[]` |

Percent overlays in WYSIWYG:

```
left%   = left_px / 612
top%    = top_px / 792
width%  = width_px / 612
height% = height_px / 792
```

---

## 2. Element kinds

Every detected region gets a **kind** that controls explorer dot color and PDF tint color.

| Kind | Color | Hex | What it is | Explorer label source |
|------|-------|-----|------------|------------------------|
| **page** | Grey | `#6b7b8c` | Full 612×792 sheet | `Page N` |
| **text** | Blue | `#4c8bf5` | Paragraphs, bullets, section headings (text union) | First line of block, truncated |
| **title** | Bronze | `#c4922a` | Page / document title (`text_role: heading` or `title`); ink rule below in WYSIWYG + explorer | First line of block |
| **table** | Green | `#22a06b` | Grid area (rules + cell text union) | Section title or “Table” |
| **asset** | Amber | `#e87b2a` | Embedded figure, diagram, photo (not page-1 hero) | “Figure N” |
| **link** | Purple | `#9b5de5` | Primary product shot / Blender-linked graphic | “Product shot” |

Stored in `element-windows.json` → `kind_colors` and on each window as `color`.

---

## 3. Detection pipeline (per page)

For each page `p` in the PDF, run detectors **in this order**:

```
1. Page shell           → page:p          (always 612×792)
2. Page numbers         → exclude from text blocks (not in explorer)
3. Vector table grids   → table:*         (before paragraph merge)
4. Text blocks          → text:*          (PyMuPDF blocks, filtered)
5. Embedded images      → link:* / asset:*
6. Title classification → upgrade text kind / WYSIWYG role (title vs section)
7. Clip & merge         → column clip before images, union related lines
8. Assign stable ids    → text:p{n}-{slug}, table:p{n}-{slug}, …
```

Implementation today:

| Step | Auto (`tools/pdf_layout_extract.py` via `onboard_example.py`) | Manual / refined (`tools/extract_element_windows.py`) |
|------|----------------------------------------------------------------|--------------------------------------------------------|
| Page shell | Yes | Yes |
| Page numbers | Footer filter (`y > 740`, digit pattern) | Same |
| Tables | Vector grid heuristic (≥ 4 vertical rules) | Solar-specific matchers + grid from `table-columns.json` |
| Text blocks | Line → paragraph merge; tight span bbox | Semantic sections (intro, highlights, …) |
| Images | `classify_image()` — product vs diagram heuristics | Tight image rect + 4 px pad; intro column clip |
| Title classify | Histogram sizes in `typography.json` | `titles.json` + band widths |
| Page 1 columns | Clip left column; **include** right column text | Hand-tuned column bands |

**Target:** Generic table detection and paragraph merging (§7–§9) will move into `onboard_example.py`; solar-lora-sensor keeps hand-tuned manifests as the quality bar.

---

## 4. Page numbers

Page footers must **not** become explorer items or WYSIWYG blocks.

### Detection signals

| Signal | Rule |
|--------|------|
| Vertical position | `bbox[1] > 740` pt (bottom ~6% of page) |
| Text pattern | `^[-–—]?\s*\d+\s*[-–—]?$` e.g. `- 1 -`, `– 2 –`, `3` |
| Font size | Typically **9 pt** (see `typography.json` → `page_number`) |
| Short text | ≤ 3 characters when `bbox[1] > 750` |

### PyMuPDF access

```python
for block in page.get_text("dict")["blocks"]:
    if block["type"] != 0:
        continue
    text = "".join(span["text"] for line in block["lines"] for span in line["spans"])
    bbox = block["bbox"]  # (x0, y0, x1, y1)
```

Current implementation: `_is_page_number()` in `tools/onboard_example.py`.

### WYSIWYG

Page numbers render in a fixed footer band (`typography.json` → `page_number`, CSS `--font-size-page-num`). They are **not** given `data-studio-id` blocks in the explorer Document tree.

---

## 5. Titles and section headings

Titles are text, but they need **special geometry** (band width, underline, font size).

### 5.1 Document title (page 1 only)

| Property | Typical value | Detection |
|----------|---------------|-----------|
| Font size | **16 pt** bold | Largest span on page 1 above intro body, or histogram peak + 4 pt |
| Position | Top band ~43–70 pt | First large span after page margin |
| Underline | 1 px rule at y ≈ title bottom + gap | `page.get_drawings()` horizontal stroke, width > 30 pt, height < 2.5 pt |
| Band | None (no grey fill) | — |

Diagnostic tool: `python tools/extract_titles.py` (stdout JSON, solar path today).

### 5.2 Section headings (all pages)

| Property | Typical value | Detection |
|----------|---------------|-----------|
| Font size | **14 pt** bold | Span size ≥ section threshold from typography histogram |
| Grey band | `#d4d6d7` fill behind heading strip | `page.get_drawings()` fill rect: width 40–400 pt, height 8–24 pt |
| Band widths | 181 / 235 / 364 px families | Measure fill rect width; see `colors.json` → `bands` |
| Underline | **No** on section headings | — |

### 5.3 Classifying a text block as heading vs body

Use span-level features inside the PyMuPDF block:

```
is_section_heading(block):
  max_span_size >= section_pt_threshold     # e.g. 14
  AND len(first_line) < 80 chars
  AND NOT starts with "•"
  AND NOT mostly numeric (table cell)

is_document_title(block, page_num):
  page_num == 1
  AND max_span_size >= title_pt_threshold   # e.g. 16
  AND block is among top 3 blocks by y
```

First-pass onboarding uses block-level heuristics when building `wysiwyg-body.html` (`doc-title-block` vs `h2.section` vs `doc-text-column`). Refined products add `titles.json` with measured band left/width per heading string.

### 5.4 Subtitle sections (grey band → linked content)

A **subtitle** is a section heading whose text sits on a **grey vector fill band** in the PDF. It labels the content that immediately follows on the same page — body paragraphs, a **table**, or an **image** (figure / product shot).

**Detection** (`tools/pdf_layout_extract.py`):

| Step | Rule |
|------|------|
| Collect bands | `_collect_grey_band_rects()` — filled rects from `page.get_drawings()`, non-white/black, width ≥ 40 pt, height 6–30 pt |
| Match heading | `_para_overlaps_band()` — short text line (≤ 48 chars, height ≤ 32 pt) overlaps band by ≥ 20% width |
| Font fallback | No vector band but left column (center x &lt; 305 pt), heading ≥ 15 pt, short line → `has_band: true`, `text_role: subtitle` (e.g. page 3 of `current-sensor-cs`) |
| Upgrade role | If overlap or font fallback and role was `section` or `body` → `text_role: "subtitle"`, `has_band: true` on window |

**Explorer grouping** (`tools/onboard_example.py` → `build_outline()`, merge rules in **`docs/PDF_ELEMENT_DETECTION.md`** §5.5):

| Anchor? | Rule |
|---------|------|
| Yes | `text_role: subtitle`, `has_band: true`, or id listed in `titles.json` |
| Yes | **Left column** — `text_role: section`, center x &lt; 305 pt, font ≥ 15 pt (grey band) |
| Yes | **Right column** — `text_role: section`, center x ≥ 305 pt, heading matches `STYLE_HEADING_RE` (*Clamping Style*, *Non Clamping Style*) |
| No | Other right-column section labels without style heading pattern |

**Two-column pages** (e.g. `current-sensor-cs` page 1): left and right columns each have their own subtitle stack. Right-column style headings own **right-column images** in the vertical band until the next right-column style subtitle.

`document-outline.json` may store **`section_folder`** nodes for merge metadata. **Studio explorer display** flattens those to **print-order leaves** at serve time (`tools/studio_server.py` → `_explorer_page_leaves()`) — every subtitle, table, and figure is a **sibling row** under **Page N** with the same left indent (no nested section-folder tree in the UI).

```
▾ Page 1
    ● Current Sensors       (title)
    ● Descriptions          (subtitle — blue)
    ● Clamping Style        (subtitle — blue)
    ● Features              (subtitle — blue)
    ● Specifications        (subtitle — blue)
    ● Product shot          (link — purple)
    …
```

**WYSIWYG:** Subtitle+body = one block (`h2.section` + body paragraphs). Tables and figures remain separate blocks.

**Regression:** `python tools/verify_subtitle_grouping.py` — page folders, merge flags, orphan body windows.

**Limitation:** PDFs without **vector** grey fills (bands baked into a raster image) rely on the **left-column + band font** fallback (§5.4 font fallback row) — still must set `has_band: true` and render `h2.section.subtitle` in WYSIWYG. Do not leave page 3+ headings as plain `h2.section`.

User-facing summary: **`docs/STUDIO.md`** → Subtitle sections (grey-band headings).

**Subtitle font match (WYSIWYG):** One **canonical heading size** per document (mode of left-column band subtitles ≥ 15 pt). Any subtitle heading with `|heading_font_pt − canonical| > 0.5 pt` is out of spec. Merged subtitle+body blocks store **`heading_font_pt`** (for `h2.section`) separately from **`font_pt`** (body `<p>` rows). Batch sync: `python tools/sync_subtitle_fonts.py <example>`.

### 5.5 Subtitle section content (required)

A band subtitle introduces a **section** — not just one paragraph. Everything that belongs to that heading on the page (until the next left-band subtitle) is linked in the explorer and kept in print order.

#### Two layers

| Layer | What it is | Surfaces |
|-------|------------|----------|
| **1. Text union** | Subtitle + **all contiguous body text** after it | One `text:*` window, one WYSIWYG `studio-block`, explorer folder row |
| **2. Section folder** | Text union + **other followers** (captions, images, vector tables) | Explorer children; separate PDF/WYSIWYG blocks per kind |

#### Layer 1 — text union (merged into one element)

These are joined into **one** `text:*` window (`merged_section_body: true`) and **one** WYSIWYG block (`<h2>` + body rows):

| Content | Treatment |
|---------|-----------|
| **Multiple paragraphs** | All consecutive `body` blocks after the subtitle are joined (union bbox) |
| **Numbered lists** | Lines like `1.` / `2.` — merged into the same block (see `LIST_BLOCK_MERGE_GAP_PT`) |
| **Bulleted lines** | `•` / `-` body lines — merged when same column and `body` role |
| **Key-value spec lines** | Tab-aligned rows without vector table rules — merged as body (e.g. *Key Specifications*) |
| **Right-column figure captions** | **Not** merged — skipped during scan, kept as separate `text:*` windows |

**Algorithm** (`_merge_band_subtitles_with_body()`):

```
For each left-band subtitle (§5.4):
  acc = subtitle
  Scan following text blocks in print order:
    • next left-band subtitle or page heading → stop
    • right-column section label → skip (separate window), continue scan
    • body (any column) → join into acc
  Emit acc; then emit skipped right-column labels
```

#### Layer 2 — section folder (subtitle + followers)

After text extraction, **images** and **vector tables** are separate windows. The explorer groups them with the subtitle:

| Follower kind | Window | Explorer dot |
|---------------|--------|--------------|
| Merged text (layer 1) | `text:*` | Blue — folder row (`merged_anchor: true`) |
| Figure caption | `text:*` (right column) | Blue — child row |
| Product shot | `link:*` | Purple — child row |
| Diagram / figure | `asset:*` | Amber — child row |
| Vector table | `table:*` | Green — child row |

Grouping runs until the **next left-band subtitle** on the same page (`group_specs_into_section_folders()`). Right-column images may be **reclaimed** to the section that owns the nearest preceding figure caption (§5.4 image link rule).

#### Surface summary

| Surface | Text union | Tables / images |
|---------|------------|-----------------|
| **PDF tints** | One box for subtitle+text | Own tinted boxes |
| **WYSIWYG** | One `studio-block` (`h2` + `<p class="body-text">` per line/para) | Separate `studio-block` / `<figure>` |
| **Explorer** | Folder label = subtitle; click → text union | Child rows under same folder |

**Do not merge into the text window:** `table:*`, `link:*`, `asset:*`, next band subtitle, page title.

Example (`current-sensor-cs` page 1 — **two-column** layout):

```
Left column                          Right column
▾ Descriptions (h2 + paragraphs)     ▾ Clamping Style (h2)
                                         ● Product shot (top)
                                         ● Product shot (mid)
▾ Features (h2 + numbered list)
▾ Specifications (h2 + spec lines)   ▾ Non Clamping Style (h2)
                                         ● Non-clamping style (image)
▾ Key Specifications (h2 + table text)
```

Left band subtitles merge with body text; right **style** subtitles (`STYLE_HEADING_RE`) own right-column images in their vertical band.

Example with vector table (other datasheets):

```
▾ Specifications
    ● Specifications    ← folder row = merged heading + intro (if any)
    ● RH / Temp table   ← table:* follower (green)
    ● Product shot
```

**Regression:** `python tools/verify_subtitle_grouping.py`

**WYSIWYG overrides:** Re-onboard runs `reconcile_wysiwyg_overrides()` — drops override keys for merged-away windows and removes **heading-only** overrides on `merged_section_body` windows (they would strip the body list/paragraphs from the served page).

---

## 6. Paragraphs and body text

### 6.1 Raw source: PyMuPDF text blocks

```python
page.get_text("dict")["blocks"]  # type 0 = text
```

Each block has:

- `bbox` — union of all lines in the block
- `lines[]` → `spans[]` with `text`, `size`, `font`, `color`, `flags` (bold)

Blocks are **not** always one paragraph. PDF producers may merge columns or split mid-paragraph.

### 6.2 First-pass strategy (auto onboard)

Implemented in `tools/pdf_layout_extract.py`. See **`docs/ONBOARDING_ITERATION.md`** and **`docs/WYSIWYG_ONBOARD_MATCH.md`** §5.

| Step | Action |
|------|--------|
| Collect lines | Per-line tight bbox from non-whitespace spans (not full line bbox) |
| Merge lines | Same column (cx < 305 vs ≥ 305), gap ≤ max(6 pt, 1.35× line height) → paragraph |
| Boundaries | Stop merge at section headings, titles, numbered list starts (`_is_block_boundary`) |
| Consolidate | `_consolidate_text_blocks()`: drop figure callouts, merge body blocks (22 pt), section runs |
| Filter | Drop page numbers (§4), page-1 side callouts (x ≥ 455), orphan right-column fragments |
| Page 1 clip | Left column clipped before product image; right column kept unless center on figure |
| One window | One `text:*` window per consolidated block |
| Label | First line, max 48 chars + `…` |
| ID | `text:p{page}-{slug(first_line)}` |
| Roles | `infer_text_role()` from span size histogram → `font_pt`, `text_role` on window |
| Subtitle | Grey **vector fill band** under a short heading → upgrade to `text_role: subtitle`, `has_band: true` (§5.4) |

**Target density:** ~10–12 text windows on page 1 of a 3-page brochure (not one box per PDF line).

### 6.3 Target strategy (merge & classify)

| Step | Action |
|------|--------|
| Column split | If block center-x > page midline, tag as right column |
| Merge vertically | If gap between blocks < 4 pt and same column, union bbox |
| Bullet lists | Blocks starting with `•` merge into preceding section window |
| Clip before image | If text bbox extends past `image.x0 - 6`, clip right edge (see solar `clip_left_of_image`) |
| Exclude headings | Short bold lines become section windows, not body paragraphs |

Solar reference: `tools/extract_element_windows.py` → `build_windows()` — semantic names (`text:intro`, `text:highlights`) instead of per-block slugs.

### 6.4 Primary text column

Most body copy sits in a stable column:

| Edge | Typical px |
|------|------------|
| Left | 42 |
| Right | 570 |
| Width | 528 |

Blocks wider than the column may be tables or multi-column layout — prefer table detection (§7) before treating as one paragraph.

Manifest: `document-layout.json` → `margin_families.primary_text_column`.

---

## 7. Tables

Tables are the hardest element. They require **both** vector grid lines and cell text.

### 7.1 Vector grid detection

PyMuPDF path API:

```python
for path in page.get_drawings():
    rect = path.get("rect")
    color = path.get("color")   # stroke
    fill = path.get("fill")
```

| Stroke pattern | Meaning |
|----------------|---------|
| Vertical line: width < 2.5 pt, height > 10 pt | Column divider |
| Horizontal line: height < 2.5 pt, width > 30 pt | Row divider |
| Filled rect matching header band | Header cell background (e.g. `#1b4583`) |

Collect vertical x-positions in a **y-band** that overlaps the table body:

```python
def table_vertical_grid(page, y_min, y_max) -> list[float]:
    xs = set()
    for path in page.get_drawings():
        r = path["rect"]
        if r.y0 < y_min or r.y0 > y_max:
            continue
        w, h = r.x1 - r.x0, r.y1 - r.y0
        if w < 2.5 and h > 10:
            xs.add(round(r.x0, 1))
    return sorted(xs)
```

Column widths = consecutive x deltas. See `tools/analyze_pdf.py` → `columns_from_grid()`.

### 7.2 Table bounding box

```
table_bbox = union of:
  - all grid line rects in the table region
  - all text spans whose center lies inside the grid
  - optional section title line directly above (e.g. "Specifications")
```

Window kind: **`table`**, color green.

### 7.3 Row heights

Measure horizontal rules or infer from text line baselines. Store in `table-columns.json` → `row_heights_px`. Generate CSS via `python tools/generate_table_css.py`.

### 7.4 First-pass gap

`onboard_example.py` currently labels table **text** as separate blue `text:*` windows. **Roadmap:** cluster blocks inside a detected grid into one `table:*` window before writing `element-windows.json`.

Verification: `python tools/verify_table_layout.py --example <slug>`.

---

## 8. Images and figures

### 8.1 Detection

```python
for img in page.get_images(full=True):
    for rect in page.get_image_rects(img[0]):
## rect is (x0, y0, x1, y1) in page pt
```

Also extract raster bytes for WYSIWYG:

```python
base = doc.extract_image(xref)
## → assets/reference-pdf/page-{n}-img-{k}.{ext}
```

See `tools/onboard_example.py` → `extract_assets()`.

### 8.2 Size filter

Skip icons and specks:

```
width >= 24 pt AND height >= 24 pt
```

### 8.3 Kind assignment

Implemented in `tools/pdf_layout_extract.py` → `classify_image()`. See **`docs/ONBOARDING_ITERATION.md`**.

| Signal | Kind | Explorer label |
|--------|------|----------------|
| Caption matches diagram/scheme keywords **or** width ≥ 360 pt | **asset** | Caption text or “Figure N” |
| Caption matches product/style keywords **or** page 1 compact photo (≤ 320×, h ≥ 70 pt) | **link** | “Product shot”, “Clamping style”, … |
| Page 1 first product shot | **link** | “Product shot” + `data-link-slot="product-shot"` |
| Page 2+ compact photo with product/mechanical caption | **link** | Caption-derived label |
| Default compact without diagram signals | **link** on page 1, **asset** elsewhere |

**Diagram keywords:** wiring diagram, schematic, part number scheme, ordering information, dimension, installation, …

**Product keywords:** clamping style, non-clamping, sensor, enclosure, housing, product, …

**Not a figure:** Brochure product photos on page 1 (multiple variants) are all **`link`**, not “Figure 2/3”.

### 8.4 Box sizing

| Kind | Padding | Rule |
|------|---------|------|
| **link** / **asset** | **4 px** (`image_padding_px`) | Tight to PyMuPDF image rect |
| **text** near image | 0 | Clip text column at `image.x0 - 6` |

`image_tight: true` on the window record.

### 8.5 Wiring diagram pattern (multi-rect assets)

Some “figures” are an image **plus** a caption line. Union:

```
figure_bbox = union(image_rect, caption_text_rect)
```

Solar: `asset:wiring-diagram` = wiring image + “Wiring Diagram” heading.

---

## 9. Full-page and page-folder windows

Every page gets a **`page:N`** window:

```json
{
  "id": "page:1",
  "page": 1,
  "kind": "page",
  "full_page": true,
  "left_px": 0,
  "top_px": 0,
  "width_px": 612,
  "height_px": 792
}
```

Explorer: **Document → Page N** folder. Clicking page background (not a tint) selects this id and scrolls both panes to that page.

---

## 10. `element-windows.json` schema

```json
{
  "source": "reference/Product.pdf",
  "hard_rule": "…",
  "page_size_px": [612, 792],
  "image_padding_px": 4,
  "image_gap_px": 6,
  "kind_colors": { "text": "#4c8bf5", "table": "#22a06b", "…": "…" },
  "windows": [
    {
      "id": "text:p1-descriptions",
      "page": 1,
      "kind": "text",
      "color": "#4c8bf5",
      "image_tight": false,
      "left_px": 47.9,
      "top_px": 92.8,
      "width_px": 96.9,
      "height_px": 22.3
    }
  ]
}
```

| Field | Required | Meaning |
|-------|----------|---------|
| `id` | yes | Stable `data-studio-id` |
| `page` | yes | 1-based page number |
| `kind` | yes | `page` \| `text` \| `table` \| `asset` \| `link` |
| `color` | yes | Hex tint / explorer dot |
| `left_px`, `top_px`, `width_px`, `height_px` | yes | Box on page |
| `full_page` | page only | Hit-test entire sheet |
| `image_tight` | images | True when box is image bounds + pad |

API: `GET /api/element-windows` — Studio pushes to PDF iframe via `set-pdf-windows`.

---

## 11. Downstream manifests (from boxes)

| Manifest | Derived from |
|----------|--------------|
| `document-outline.json` | Per-page nodes (may include `section_folder` for merge metadata); **Studio explorer** shows **flat print-order leaves** under each page folder |
| `spacing.json` | `studio_layout.blocks` from each window’s top/height |
| `wysiwyg-body.html` | One `section`/`figure` per window; text from PDF block string |
| `target-layout.json` | Page PNG guides + extracted image paths |

---

## 12. Verification

After detection (auto or manual):

```powershell
python tools/verify_element_windows.py
python tools/verify_spacing.py
python tools/verify_table_layout.py --example <slug>
```

### Onboard quality gate (PDF vs WYSIWYG)

For PDF-only examples after `onboard_example.py`:

```powershell
python tools/verify_onboard_match.py --example <slug>
python tools/iterate_onboard.py --example <slug>   # re-run + log until targets met
```

| Metric | Target | Meaning |
|--------|--------|---------|
| Box size | < **2%** | `element-windows.json` width/height vs PDF content union |
| Text / coverage | < **5%** | Orphan spans + typography size mismatch + position offset |
| WYSIWYG CSS | < **2%** | `generated-onboard-layout.css` vs windows |

Iteration log and codified tuning rules: **`docs/ONBOARDING_ITERATION.md`**.

WYSIWYG visual match (absolute layout, images, typography): **`docs/WYSIWYG_ONBOARD_MATCH.md`**.

Manual refinement in Studio: double-click PDF tint → drag handles → saves to manifest (`docs/ELEMENT_WINDOW_RESIZE.md`).

---

## 13. Visual onboarding: one box at a time

When `element-windows.json` is written, `run_onboard()` emits a **playback timeline**. Studio replays it so each box **appears** in all three panes in sync.

| Event | PDF pane | Explorer | WYSIWYG |
|-------|----------|----------|---------|
| `phase: scan` | — | — | Banner only |
| `page: N` | Scroll to page N | **Page N** folder expands + flash | Page shell pops in |
| `item: text:…` | Tint highlight on box | Tree row **flashes** + scroll into view | Block **pops** + green flash + scroll |
| `item: link:…` | Purple tint | Same | Figure pops in |
| `done` | — | — | All pending blocks revealed |

Timing: `ONBOARD_PHASE_MS`, `ONBOARD_PAGE_MS`, `ONBOARD_ITEM_MS` in `studio/app.js`.

CSS classes:

| Class | Where | Effect |
|-------|-------|--------|
| `onboard-pending` | WYSIWYG blocks | Hidden, scaled down |
| `onboard-reveal` | WYSIWYG | Pop-in animation |
| `onboard-flash` | WYSIWYG + tree | Green / blue highlight pulse |
| `onboard-expand-flash` | Page folder | Chevron flash when page opens |
| `onboarding-active` | `body` | Sidebar + WYSIWYG inset border |

Full sequence diagram: **`docs/ONBOARDING.md`**.

---

## 14. Tool reference

| Tool | Role |
|------|------|
| `tools/onboard_example.py` | **First pass** — generic detection + all manifests + playback events |
| `tools/pdf_layout_extract.py` | Shared extraction: lines, paragraphs, tables, images, typography |
| `tools/verify_onboard_match.py` | PDF windows vs content + WYSIWYG CSS quality gate |
| `tools/iterate_onboard.py` | Loop onboard + verify; append `docs/ONBOARDING_ITERATION.md` |
| `tools/generate_onboard_layout_css.py` | Absolute WYSIWYG positions from `element-windows.json` |
| `tools/analyze_pdf.py` | Font histogram, fill colors, table grid hints (stdout) |
| `tools/extract_pdf_assets.py` | Page PNGs + embedded images |
| `tools/extract_element_windows.py` | Solar-tuned semantic windows |
| `tools/extract_spacing.py` | Vertical regions + solar block map |
| `tools/extract_titles.py` | Title/underline diagnostic |
| `tools/generate_table_css.py` | Table geometry → Studio CSS |
| `tools/verify_element_windows.py` | Bounds sanity checks |

---

## 15. Quality tiers

| Tier | Example | Detection | WYSIWYG match |
|------|---------|-----------|---------------|
| **PDF only** | Before onboard | — | — |
| **First pass** | After `onboard_example.py` | Paragraph merge + images; partial tables | **< 2% box, < 5% text** on `current-sensor-cs` |
| **Refined** | Manual resize + extractors | Semantic sections + table grids | Near PDF |
| **Production** | solar-lora-sensor | Hand-tuned manifests + CSS | Pixel rules in `WYSIWYG_MATCH_RULES.md` |

The first pass exists so you can **see** every detected element immediately — boxes flashing on the PDF, tree expanding, WYSIWYG blocks popping in — then refine toward production quality.
