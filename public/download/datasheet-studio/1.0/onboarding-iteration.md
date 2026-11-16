---
title: "Onboarding iteration log"
order: 150
---

Automated tuning of `tools/pdf_layout_extract.py` vs PDF ground truth.

**Targets:** box size < 2%, text/coverage < 5%.

---

## Codified rules (apply to every new PDF)

These rules converged on **`current-sensor-cs`** (2026-05-31). Implement in `tools/pdf_layout_extract.py`; verify with `tools/verify_onboard_match.py`.

### Box geometry

| Rule | Constant | Why |
|------|----------|-----|
| Tight line bbox | non-whitespace span union | Line `bbox` includes trailing tabs; span union matches WYSIWYG text width |
| Image pad | `PAD = 4` px | Window = image rect ± 4 px on all sides |
| Page size | 612 × 792 pt | US Letter; PDF pt = layout px |
| Column overlap for merge | ≥ 35% horizontal overlap | Same-column paragraph merge |
| Paragraph merge gap | `MERGE_GAP_PT = 6` | Lines within 6 pt vertically merge into one window |

### Page 1 two-column layout

| Case | Action |
|------|--------|
| Text starts left of product image, extends into image column | Clip to left of `img_left - IMG_GAP` (6 pt) |
| Text starts at/after image column (`x0 ≥ img_left - 6`) | **Include** as its own window (do not skip) |
| Text center inside a large image rect (≥ 24×24 pt) | Skip (figure OCR noise) |

Previously skipped all right-column text when `x0 ≥ img_left`; that caused ~12% orphan spans.

### Typography

| Rule | Detail |
|------|--------|
| Histogram roles | `body` = most common size; `subhead` = intermediate (e.g. 12 pt); `section` / `title` from ranked peaks |
| Verify match | Compare each span to **nearest size in the PDF histogram** (10/12/14/16 pt), not a body-vs-section heuristic |
| Page numbers | Exclude spans with footer pattern (§4 in `PDF_ELEMENT_DETECTION.md`) |

### Span → window assignment (verify)

| Rule | Detail |
|------|--------|
| Overlap wins | Assign span to window with **largest bbox overlap** (fallback: center inside) |
| Tie-break | Prefer smaller window area (nested boxes) |

### WYSIWYG CSS

Absolute positions from `element-windows.json` → `studio/generated-onboard-layout.css`. CSS must match windows exactly (0% tolerance observed).

### Image classification (`link` vs `asset`)

| Rule | Detail |
|------|--------|
| Product (`link`) | Style captions, page-1 compact photos, mechanical product views |
| Figure (`asset`) | Wide images (≥ 360 pt), diagram/scheme captions |
| Primary hero | First page-1 `link` labeled “Product shot” gets `data-link-slot="product-shot"` |
| Dedupe | Merge image rects within 2 pt (repeated xref placements) |
| Caption search | ± 85 pt above/below image for label text |

Function: `classify_image()` in `tools/pdf_layout_extract.py`.

### Paragraph consolidation (fewer boxes)

| Constant | Value | Purpose |
|----------|-------|---------|
| `LEFT_COLUMN_MAX_CX` | 305 | Column split for merge |
| `MERGE_GAP_PT` | 6 | Min line gap |
| `BODY_BLOCK_MERGE_GAP_PT` | 22 | Body paragraph merge |
| `LIST_BLOCK_MERGE_GAP_PT` | 36 | Numbered list merge |
| `PAGE1_SIDE_CALLOUT_MIN_X` | 455 | Drop margin callouts |

Function: `_consolidate_text_blocks()` in `tools/pdf_layout_extract.py`.

**Pipeline:** line → paragraph (column + boundaries) → drop callouts/orphans → body block merge → **subtitle + body union** (§5.5 in `docs/PDF_ELEMENT_DETECTION.md`).

**Result (`current-sensor-cs`):** page 1 text windows **11** (was ~22); **38** total explorer events (was ~63).

### Commands

```powershell
python tools/onboard_example.py <slug>
python tools/verify_onboard_match.py --example <slug>
python tools/iterate_onboard.py --example <slug>   # loop + append log
```

**Full WYSIWYG visual match guide:** **`docs/WYSIWYG_ONBOARD_MATCH.md`**

---

## 2026-05-31 — Image classification fix (`current-sensor-cs`)

**Problem:** Page-1 product variant photos labeled “Figure 2/3” (`asset`) instead of product shots (`link`).

**Fix:** `classify_image()` in `pdf_layout_extract.py` — caption keywords, width heuristics, page-1 compact photos → `link`.

**Result after re-onboard:**

| Page | Labels |
|------|--------|
| 1 | Product shot ×2, Non-clamping style |
| 2 | Mechanical view (link), Figure 1 (asset) |
| 3 | Product shot (link), Part Number Scheme (asset) |

Verify still **PASS** (box 0.25%, text 1.12%).

---

## 2026-05-31 — WYSIWYG visual match pass

**Problem:** WYSIWYG looked jumbled vs PDF — wrong images on pages 2–3, body text rendered as oversized headings, figures not filling boxes.

**Fixes:**

1. `extract_assets(windows)` — overlap match `studio_id` → raster file
2. `infer_text_role()` — 10 pt body vs 12/16 pt section headings
3. `generated-onboard-layout.css` — per-block `font-size` + `object-fit: fill` on figures
4. `build_wysiwyg_body()` — sort by `(top, left)`, use `asset_file` + `text_role`

**Doc:** `docs/WYSIWYG_ONBOARD_MATCH.md`

**Verify:** PASS — box 0.25%, images 0.25%, text 1.12%.

---

## 2026-05-31 — Paragraph consolidation pass

**Problem:** Page 1 had 20+ tiny text windows (one per line, figure callouts, margin labels).

**Fix:** `_consolidate_text_blocks()` pipeline in `pdf_layout_extract.py` — column-aware paragraph merge, block boundaries, callout/orphan drops, body block merge, `_merge_band_subtitles_with_body()`.

**Result:** page 1 text windows **11**; **38** explorer events total. Verify still **PASS**.

**Doc:** `docs/WYSIWYG_ONBOARD_MATCH.md` §5, `docs/PDF_ELEMENT_DETECTION.md` §6.2.

---
## 2026-05-31 14:54 UTC

Round **1**: `PASS`

- box max/avg: 0.25% / 0.06%
- text max/avg: 1.12% / 0.06%
- wysiwyg css max: 0.00%
- orphan spans: 0.00%
- worst:
  - `text:p1-specifications`: box=0.04% text=1.12%
  - `text:p1-outputs-0-5v-directly-and-requir`: box=0.25% text=0.12%
  - `text:p1-non-clamping-style`: box=0.18% text=0.01%
  - `text:p1-clamping-style`: box=0.18% text=0.03%
  - `text:p1-the-cs-current-sensor-is-a-solid`: box=0.02% text=0.12%

## 2026-05-31 14:54 UTC

**Converged** on round 1 for `current-sensor-cs`.
Codified rules in `tools/pdf_layout_extract.py` and `docs/PDF_ELEMENT_DETECTION.md`.
