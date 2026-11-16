---
title: "Document layout model (all products)"
order: 90
---

Temco-style target PDFs (e.g. `SolarPoweredSensor.pdf`) share one **document-wide** design: US Letter canvas, Arial, fixed ink color, a small set of font sizes, and **stable horizontal margins** for body copy. Vertical placement varies by section, but **left/right text edges repeat** on almost every page.

Studio, WYSIWYG, and tint boxes should assume this model first, then measure only **exceptions**.

**Authority chain:** `reference/<Product>.pdf` → per-example JSON under `examples/<name>/` → `studio/target-wysiwyg.css` (+ generated typography, text column, and table CSS).

Related docs: [STUDIO.md](STUDIO.md), [WYSIWYG_MATCH_RULES.md](WYSIWYG_MATCH_RULES.md), [TABLE_GEOMETRY.md](TABLE_GEOMETRY.md).

---

## 1. Page canvas (fixed for every page)

| Property | Value | Notes |
|----------|-------|--------|
| Size | **612 × 792 pt** (US Letter) | All manifests use `page_size_px: [612, 792]` |
| WYSIWYG | `--page-w: 612px`, `--page-h: 792px` | 1 CSS px = 1 PDF pt in Studio |
| Page numbers | Bottom band ~**757–769** pt, **9 pt**, centered | `- n -` footer; not in body flow |
| Full-page tint | `page:1` … `page:4` windows | Explorer page folders only |

**Rule:** Do not mix A4 or custom page sizes in the WYSIWYG pane. If a new PDF differs, record it in `document-layout.json` → `page` before processing.

---

## 2. Document-wide typography (same on all pages)

Stored in `typography.json` per example. **Integer PDF points**; WYSIWYG renders them as **CSS `px`** (1 layout px = 1 PDF pt). Do not use CSS `pt` for font sizes — browser `pt` is larger and overflows fixed blocks.

| Role | Font | Size | Leading | Weight | Use |
|------|------|------|---------|--------|-----|
| **Body** | Arial | **12 pt** | **14 pt** | normal | Paragraphs, bullets, table cells |
| **Section heading** | Arial | **14 pt** | **17 pt** | bold (700) | `h2.section` on grey band |
| **Document title** | Arial | **16 pt** | **19 pt** | bold | Page 1 product name only |
| **Page number** | Arial | **9 pt** | **11 pt** | normal | Footer `- n -` |

Generated CSS (`python tools/generate_typography_css.py` → `studio/generated-typography.css`, rules in `studio/typography-wysiwyg.css`):

- `--font-family-page`, `--font-size-body`, `--font-size-section`, `--font-size-title`, `--font-size-page-num` (values in **px**)
- `--font-leading-body`, `--font-leading-section`, `--font-leading-title`, `--font-leading-page-num` (values in **px**)

**Paragraph / body style (document-wide):**

| Property | Value |
|----------|--------|
| Color | `#231f20` (`colors.json` → `text.ink`) |
| Alignment | Left for headings; body columns justified where PDF justifies |
| Decoration | **No** underline on section headings; document title has **1 px** rule below (x=36…576), not `text-decoration` |
| Bullets | Tab-indented list style per PDF; inside text blocks, not full-page width |

Re-measure after PDF change:

```powershell
python tools/analyze_pdf.py
```

---

## 3. Document-wide color (bands + tables)

`colors.json` per example.

| Role | Hex | Scope |
|------|-----|--------|
| Ink | `#231f20` | All body and table text |
| Section band fill | `#d4d6d7` | **Heading strip only** (not bullets/table body) |
| RH table header (data cols) | `#1b4583` / white text | Page 1 specs grid only |
| Table border | `#231f20` | 1 px grid lines |

---

## 4. Horizontal layout — margin families (stable across pages)

Most pages reuse the same **text column** and **heading band** widths. Measure once per product; only list deviations in `document-layout.json` → `exceptions`.

### 4.1 Primary text column (default for body + bullets)

Used on pages 2–4 and for Highlights bullets on page 1. **Enforced in Studio** by `studio/document-text-column.css` + `studio/generated-document-column.css` (from `document-layout.json`). See **[DOCUMENT_TEXT_COLUMN.md](DOCUMENT_TEXT_COLUMN.md)**.

| Edge | Typical (px) | CSS / manifest |
|------|----------------|----------------|
| Left | **42** | `--doc-text-col-left` |
| Right | **570** | `--doc-text-col-right` |
| **Content width** | **528** | `--doc-text-col-width` |

**Box-sizing rule:** All full-width text blocks share this width. Do not set per-section `width` on bullets or paragraphs in `target-wysiwyg.css`. Exceptions (page 1 intro) use `--doc-text-col-intro-width`.

### 4.2 Page 1 intro column (major exception)

Two-column layout: text left, product image right.

| Region | Left | Right / width |
|--------|------|----------------|
| Intro text | ~42 | ends ~**396** (`--x-intro-r`) |
| Intro column width | | **~346** (`--doc-text-col-intro-width`) |
| Product image | ~391 | width ~183 (`link:enclosure-view`) |

Tint box `text:intro` is **narrower** than the primary column by design.

### 4.3 Section heading grey bands (width families)

Grey fill applies only to the **heading line** (~20 px tall), not the content below.

| Family | Band left (px) | Band width (px) | Pages / sections |
|--------|----------------|-----------------|------------------|
| **Linked** | 36–41 | **181** | Page 1: Highlights, Specifications |
| **Wide** | 36–39 | **235** | Pages 2–4 most section titles; page 3 gateway |
| **Notes** | 39 | **364** | Page 4: Notes only |
| **Interface** | **46** | 235 | Page 3: Internal Interface Signals (left exception) |

Manifest: `titles.json` + `colors.json` (`bands.*_width_px`).

### 4.4 Tables (near full content width)

Tables align to the primary left margin (~36–41 pt) and span **~535–539 pt** width. Column splits are **per table** in `table-columns.json` (not page margins).

| Table | Left | Width |
|-------|------|-------|
| RH / Temp (p1) | 41 | 539 |
| CO₂ specs (p2) | 37 | 535 |

See [TABLE_GEOMETRY.md](TABLE_GEOMETRY.md).

---

## 5. Vertical layout — blocks, not uniform margins

**Top/bottom page margins are not one constant.** Each logical block has an absolute **`top_px`** and **`height_px`** on the 792 pt tall page.

- Manifest: `spacing.json` → `studio_layout.blocks` (`page_1` … `page_4`)
- WYSIWYG: `--p1-intro-top`, `--p1-highlights-top`, … in `target-wysiwyg.css`
- **Hard rule:** blocks must **not overlap**; `overflow: hidden` on absolute sections

Gaps between bands (e.g. intro → Highlights ~16 px) come from PDF text regions in `spacing.json` → `pages[].gaps`.

```powershell
python tools/extract_spacing.py
python tools/verify_spacing.py
```

**Do not** infer vertical box positions from a single “margin-top” constant. Use per-block metrics from the PDF.

---

## 6. Box sizes (element windows / PDF tints)

Explorer leaves map to rectangles on the PDF (`element-windows.json`).

| Kind | How size is set |
|------|-----------------|
| **text** | PyMuPDF text union; clip before images (≥6 px gap); default **~primary column** width |
| **table** | Grid bounds; width ≈ table `width_px` from `table-columns.json` |
| **asset / link** | Image rect + **4 px** padding (`image_padding_px`) |
| **page** | Full page 612×792 |

Coordinates are **absolute pt** on the page; Studio converts to **percent** of 612×792 for WYSIWYG overlays:

```
left%   = left_px / 612
top%    = top_px / 792
width%  = width_px / 612
height% = height_px / 792
```

When matching box sizes on a **new** document:

1. Assume **document-wide** typography and primary column margins (§2–4).
2. Run `python tools/extract_element_windows.py` — do not hand-draw tint widths.
3. For tables, use `table-columns.json` + `generate_table_css.py` — column widths are **not** the same as text margins.
4. Record any left/width that differs from §4 in `document-layout.json` → `exceptions`.

---

## 7. Manifest map (per example)

Copy this set for every product you process:

| File | Document-wide? | Contents |
|------|----------------|----------|
| **`document-layout.json`** | **Yes** | Page size, margin families, typography/color refs, known exceptions |
| `typography.json` | Yes | Font sizes / leading |
| `colors.json` | Yes | Ink, bands, table colors |
| `titles.json` | Mostly | Section heading positions + band widths |
| `spacing.json` | Per page | Block `top` / `height`, gaps |
| `table-columns.json` | Per table | Column widths, row heights |
| `element-windows.json` | Per block | Tint box px bounds |
| `document-outline.json` | Per product | Explorer tree order |

Reference instance: `examples/solar-lora-sensor/document-layout.json`.

---

## 8. Processing a new target PDF

**Fast path (PDF only):** Drop the PDF in `examples/<name>/reference/` with a minimal `datasheet.yaml`, open Studio — auto-onboarding documents the PDF (element boxes) and plays the visual reveal. See **`docs/ONBOARDING.md`** and **`docs/PDF_ELEMENT_DETECTION.md`**.

**Manual / production path:**

1. **Confirm** 612×792 and Arial 12/14/16 pt body (histogram in `analyze_pdf.py`).
2. **Create** `examples/<name>/document-layout.json` from the template (§7); fill margin families from pages 1–2.
3. **Extract** document-wide: `typography.json`, `colors.json`, `titles.json`.
4. **Extract** per-page vertical: `spacing.json` (`extract_spacing.py`).
5. **Extract** tables: `table-columns.json` (`analyze_pdf.py` + manual grid).
6. **Generate** table CSS: `python tools/generate_table_css.py`.
7. **Extract** windows: `extract_element_windows.py` → `element-windows.json`.
8. **Verify:** `verify_spacing.py`, `verify_table_layout.py`.
9. **Wire** WYSIWYG: `wysiwyg-body.html`, hard-refresh Studio.

---

## 9. What counts as an “exception”

Document explicitly when the PDF deviates from §4 defaults:

- Different left edge (e.g. Internal Interface Signals at **46** px).
- Narrow column (page 1 intro, TVOC width tweaks).
- Full-width figure (wiring diagram) — asset window, not text margins.
- Table with non-standard grid (CO₂ six-column layout).
- Extra Typst-only tables under **Tables** in explorer (CSV), not in target PDF.

Future automation can fail CI if a measured box violates `document-layout.json` margin families beyond listed exceptions.

---

## 10. Typst / build PDF (separate from target PDF)

`package/layout.typ` uses **A4** and generic margins for **compiled** `out/datasheet.pdf`. That is the editable Typst product, **not** the Studio WYSIWYG target.

**Studio authority** is always `reference/*.pdf` + JSON manifests above, not the Typst compile output.
