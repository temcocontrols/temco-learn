---
title: "WYSIWYG match rules (hard requirements)"
order: 220
---

The right-hand **WYSIWYG** pane must match `examples/<example>/reference/SolarPoweredSensor.pdf` in layout and appearance. These rules apply to **all** aspects of the Studio application (typography, color, tables, titles, bands, scroll/zoom, page geometry).

**Authority:** `reference/SolarPoweredSensor.pdf` → manifests under `examples/solar-lora-sensor/` → CSS in `studio/target-wysiwyg.css`.

**Document-wide model** (page size, margin families, typography, box-sizing): **[DOCUMENT_LAYOUT.md](DOCUMENT_LAYOUT.md)** — apply to every product you process.

---

## 1. Titles and section headings (hard rule)

Every title must match the PDF in **all** of the following:

| Property | Rule |
|----------|------|
| **Highlight / band** | Grey fill `#d4d6d7` only on the heading strip (not bullets, table body, or full page width unless PDF does). Band **width** and **left** come from `titles.json` (linked widths where PDF links them, e.g. Highlights + Specifications = 181 px). |
| **Alignment** | `text-align: left`; horizontal position = PDF `left_px` for that heading. |
| **Font size** | Integer PDF points rendered as **CSS px** (title **16px**, sections **14px**). No CSS `pt` units. No decimal sizes. |
| **Font weight / face** | Bold (`700`), Arial / Helvetica stack. |
| **Color** | Ink `#231f20` on grey bands; no blue or default browser heading color. |
| **Underline** | **Only** where the PDF has an underline/rule. Document title has a **1 px** ink rule below (x=36…576). Section headings on grey bands have **no** underline. Never use default `text-decoration: underline` on `h1`/`h2`. |

Manifest: `examples/solar-lora-sensor/titles.json`
Re-measure: `python tools/extract_titles.py`

---

## 2. Body typography

- Integer PDF **point** sizes and leading per `typography.json`; WYSIWYG uses matching **CSS `px`** (`studio/generated-typography.css`). **Never CSS `pt`** on page content — it renders ~33% larger than the 612×792 layout and overflows fixed blocks.
- Ink `#231f20`, justified body columns where PDF justifies.
- Rebuild: `python tools/generate_typography_css.py`
- See `docs/STUDIO.md` → Typography.

---

## 3. Tables

- Column widths, row heights, borders, header colors per `table-columns.json` and `colors.json`.
- **Generated CSS** (`studio/generated-table-vars.css`, `generated-table-rules.css`) — rebuild with `python tools/generate_table_css.py`; never duplicate `--col-*` or row heights in `target-wysiwyg.css`.
- `sum(columns_px) == width_px` and `sum(row_heights_px) == height_px` enforced in Python (`tools/table_geometry.py`).
- Page area filled by table within **5%** of PDF (see `tools/verify_table_layout.py`).
- Full spec: **`docs/TABLE_GEOMETRY.md`**.

---

## 4. Color and bands

- Grey bands, table blues, borders per `colors.json`.
- See `docs/STUDIO.md` → Color and section bands.

---

## 5. Page geometry

- US Letter **612×792** pt pages on all sheets; 1 WYSIWYG px = 1 PDF pt.
- **Horizontal:** primary text column **528 px** wide at **42 px** left on all full-width text blocks (`document-text-column.css`); heading bands 181 / 235 / 364 px — see [DOCUMENT_TEXT_COLUMN.md](DOCUMENT_TEXT_COLUMN.md) and [DOCUMENT_LAYOUT.md](DOCUMENT_LAYOUT.md).
- **Vertical:** per-block `top` / `height` in `spacing.json`, not one global margin.
- Tint / element window sizes: `element-windows.json` (px on 612×792), percent overlays in Studio.
- Page guide overlay for visual QA (toggle **Guide** in Studio).

---

## 6. Interaction (Studio chrome)

- Wheel scrolls; Ctrl/Cmd+wheel zooms (`studio/wheel-zoom.js`).
- Full-width body copy uses one text width (`studio/document-text-column.css`); do not hand-tune per-section bullet widths.
- Linked PDF/WYSIWYG scroll when both panes visible.

---

## 7. Element windows (PDF outlines)

- One **window** per explorer leaf, stored in `element-windows.json` (from `tools/extract_element_windows.py`).
- **PDF view:** Passive light tints for every window; active selection uses a stronger outline in the same color.
- **Explorer:** Colored dot on each row matches the PDF tint (`kind_colors` in the manifest).
- **Images / product shot:** Bounds come from PyMuPDF `get_image_rects` plus `image_padding_px` (4 px). Highlights must not cover unrelated text (e.g. intro column when selecting the product shot).
- Re-run the extract script when the reference PDF or `spacing.json` blocks change.

---

## 8. Linked pane highlighting

- Clicking an element in **explorer**, **target PDF**, or **WYSIWYG** must highlight the same block in the **other two** panes (when highlighting is on).
- **PDF and WYSIWYG tint boxes** use the same `element-windows.json` coordinates (percent of 612×792 pt on each page). WYSIWYG overlays (`.wysiwyg-element-window`) must match the PDF passive tints in size and position; do not rely on DOM block outlines for tint geometry.
- **Double-click** a PDF tint box in Studio to enter resize edit mode (8 handles). Drag handles or the box interior to adjust; click outside to save. See `docs/STUDIO.md` (Refine element windows).
- **Right-click** the explorer group titles **Target** or **Document** toggles all highlighting (passive PDF tints + active selection + tree colors). Stored in browser `localStorage` key `datasheet-studio-pane-highlights`.
- See `docs/STUDIO.md` → Linked highlighting.

---

## 9. Explorer tree (document structure)

- Order and labels come from `document-outline.json` (reference PDF). Use a single intro block (**Solar Powered Sensor** / `text:intro`); do not add Overview, Introduction, or other duplicate labels for the same content.
- **Document** → **Page 1…4** (subfolders) → blocks in print order (same titles as `titles.json` / PDF where headings exist). Pages appear only under **Document**, not under **Target**.
- Do not add explorer sections that are not in the target PDF unless they are explicitly under **Links** or **Tables (Typst)** with a note.

---

## 10. Spacing and block relationships (hard rule)

**Paragraphs, titles, bullets, tables, and figures must not mingle or overlap.** Each logical block sits in its own vertical band on the page; gaps between bands match the reference PDF.

| Requirement | Rule |
|-------------|------|
| **No overlap** | A block’s box must not extend into the next block’s band (no `inset: 0` hero wrappers, no unbounded flow under absolute siblings). |
| **Position** | `top` / `height` per block come from `spacing.json` → `studio_layout.blocks` (PyMuPDF text regions). |
| **Gaps** | Space between bands matches PDF `gaps` in `spacing.json` (e.g. page 1: intro → Highlights ~16 px, bullets → Specifications ~12 px). |
| **Containment** | Blocks use `position: absolute`, explicit `height`, and `overflow: hidden` so extra edit text cannot push into neighbors. |
| **Stacking** | `z-index` orders title → intro → lower sections; lower on the page = higher index where bands meet. |

Manifest: `examples/solar-lora-sensor/spacing.json` (`studio_layout.blocks`, per-page `regions` / `gaps`)
CSS: `--p1-*`, `--p2-*`, … in `studio/target-wysiwyg.css`
Re-measure: `python tools/extract_spacing.py`
Verify non-overlap: `python tools/verify_spacing.py`

**Page 1 reference bands (612×792 pt):**

| Block | `data-studio-id` | Top (px) | Height (px) |
|-------|------------------|----------|-------------|
| Document title + rule | (header) | 43 | 27 |
| Intro + product photo | `text:intro` | 87 | 204 |
| Highlights | `text:highlights` | 298 | 164 |
| Specifications + RH table | `table:rh-temp` | 470 | 175 |

---

## Change process

1. Measure PDF (`tools/analyze_pdf.py`, `tools/extract_titles.py`, `tools/extract_spacing.py`, `tools/verify_table_layout.py`).
2. Update JSON manifests (`document-layout.json`, `titles.json`, `typography.json`, `table-columns.json`, `colors.json`, `spacing.json`).
3. Update `studio/target-wysiwyg.css` variables to match.
4. Update `document-outline.json` when PDF section order changes.
5. Run `python tools/extract_element_windows.py` and `python tools/verify_spacing.py`.
6. Hard-refresh Studio; compare with **Guide** on (PDF window tints + tree dots).

Do not ship WYSIWYG changes that violate these rules without updating the manifests and this document.
