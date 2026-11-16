---
title: "WYSIWYG onboard visual match"
order: 230
---

How first-pass onboarding makes the WYSIWYG pane **substantially match** the target PDF.

**Authority:** `element-windows.json` boxes + `generated-onboard-layout.css` + `wysiwyg-body.html`.

**Quality gate:** `python tools/verify_onboard_match.py --example <slug>`

| Metric | Target |
|--------|--------|
| All window box size (incl. images) | < **2%** vs PDF content |
| Text typography / coverage | < **5%** |
| Generated CSS vs windows | < **2%** |

---

## Pipeline (do not skip steps)

```
PDF
  → extract_elements()        element-windows.json (boxes, font_pt, text_role)
  → extract_assets(windows)   assets by studio-id overlap match
  → build_wysiwyg_body()      absolute HTML + correct roles + asset paths
  → write_onboard_layout.css  top/left/width/height + font-size per block
  → verify_onboard_match.py   numeric gate before calling it “done”
```

---

## 1. Absolute layout (position + size)

- Class: `.page-content.onboard-absolute`
- Every non-page block gets `position: absolute` from `generated-onboard-layout.css`
- Coordinates = PDF points (612×792 page)
- **Images:** window = PyMuPDF image rect ± **4 px** pad (`PAD = 4`)

---

## 2. Images must fill their window

CSS (in `write_onboard_layout_css`):

```css
.onboard-absolute figure[data-studio-id] .onboard-figure {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
```

Without this, images shrink inside the figure box and the layout looks nothing like the PDF.

---

## 3. Image asset matching (critical)

**Wrong:** enumerate `page.get_images()` in order → `page-2-img-1.png` (21 px banner) mapped to a product window.

**Right:** `extract_assets(..., windows)` matches each `link:*` / `asset:*` window to the embedded image whose **bbox overlap** with the window inner rect is largest.

Output files: `assets/reference-pdf/link-p1-img1.jpeg` (named by `studio_id`).

`target-layout.json` stores `{ studio_id, file, pdf_rect }` per image.

---

## 4. Text typography (not everything is a heading)

**Wrong:** single-line blocks → `<h2 class="section">` → 16 px bold overflows the box.

**Right:** `infer_text_role()` from PDF span sizes:

| PDF size | Pattern | WYSIWYG role | HTML |
|----------|---------|--------------|------|
| 16 pt | Descriptions, Features, … | `section` | `<h2 class="section">` |
| 12 pt | Clamping / Non-clamping Style | `section` | `<h2 class="section">` |
| 14 pt | “Current Sensors” page header | `heading` | `<h2 class="section">` |
| 10 pt | body, bullets, spec lines | `body` | `<p class="body-text">` |

Each text window gets `font_pt` + `leading_pt` in `element-windows.json` and matching `font-size` / `line-height` in generated CSS.

---

## 5. Paragraph consolidation (fewer, smarter boxes)

Implemented in `tools/pdf_layout_extract.py` → `_consolidate_text_blocks()`.

**Problem:** Page 1 had 20+ tiny text windows (one per PDF line / figure callout).

**Pipeline:**

| Step | Rule |
|------|------|
| 1. Column split | Merge lines within **left** (cx < 305) or **right** column separately |
| 2. Block boundaries | Never merge across section headings, titles, or numbered list starts |
| 3. Line gap | Merge if gap ≤ max(6 pt, 1.35× line height) |
| 4. Drop callouts | Short text on product figures (overlap image band) |
| 5. Drop page-1 orphans | Single-line right-column fragments beside photos |
| 6. Body block merge | Same-column body within 22 pt → one block; numbered lists within 36 pt |
| 7. Subtitle section | **Required (§5.5):** band subtitle + all following body (multi-para, lists, spec lines) → one text window; tables/images/captions → section-folder followers |
| 8. Subtitle WYSIWYG | **Every page:** each subtitle → `h2.section.subtitle`, grey band `#d4d6d7`, 16 pt bold (canonical); verify with Guide on — page 3 *Specifications*, *Part Number Scheme*, *Ordering information* included |

**Target:** ~10–12 text windows on a 3-page brochure (not 40+).

Re-run after changes:

```powershell
python tools/onboard_example.py <slug>
python tools/verify_onboard_match.py --example <slug>
```

---

## 6. WYSIWYG reveal

Blocks ship with `onboard-pending` (hidden). Studio `revealWysiwygIfNotOnboarding()` strips that on load when not animating.

---

## 7. Verification commands

```powershell
python tools/onboard_example.py current-sensor-cs
python tools/verify_onboard_match.py --example current-sensor-cs
python tools/verify_subtitle_grouping.py
python tools/iterate_onboard.py --example current-sensor-cs
```

Expected for `current-sensor-cs`:

```
PASS current-sensor-cs
  box: max=0.25% avg=0.06%
  text: max=1.12% orphans=0.00%
  images: max=0.25%
```

---

## 8. Studio check

1. **Reload UI**
2. Toggle **Guide** — WYSIWYG faint page PNG under blocks
3. Compare product shots (purple) and figures (amber) to PDF tints
4. Ctrl+wheel zoom both panes similarly (~50–55%)

---

## 9. When it still looks wrong

| Symptom | Fix |
|---------|-----|
| Blank WYSIWYG | `revealWysiwygIfNotOnboarding()` in `studio/app.js` |
| Wrong image in box | Re-run onboard (overlap asset match) |
| Text too large / bold | Check `text_role` + `font_pt` on window |
| Image smaller than box | Check `.onboard-figure { width/height: 100% }` in CSS chain |
| Box > 2% | Tune `pdf_layout_extract.py`, re-onboard, re-verify |

Related: **`docs/ONBOARDING_ITERATION.md`**, **`docs/PDF_ELEMENT_DETECTION.md`** §8.
