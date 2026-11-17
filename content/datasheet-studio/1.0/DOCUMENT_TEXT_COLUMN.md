---
title: "Document-wide text column (paragraph width)"
order: 100
---

All **full-width** body copy in the WYSIWYG pane uses one horizontal measure: the **primary text column** from `document-layout.json`. Paragraphs, bullet lists, and numbered steps in different sections share the same **left edge** and **width** so line breaks and tint boxes stay aligned with the target PDF.

**Not in scope:** section grey bands, tables, figures, and the page 1 intro column (narrower exception).

Related: [DOCUMENT_LAYOUT.md](DOCUMENT_LAYOUT.md), [STUDIO.md](STUDIO.md), [WYSIWYG_MATCH_RULES.md](WYSIWYG_MATCH_RULES.md).

---

## Authority

| Layer | File |
|-------|------|
| Manifest | `examples/<name>/document-layout.json` → `margin_families.primary_text_column` |
| Generated vars | `studio/generated-document-column.css` |
| Global rules | `studio/document-text-column.css` |
| Page chrome | `studio/target-wysiwyg.css` (bands, absolute blocks, tables) |

Rebuild after changing the manifest:

```powershell
python tools/generate_document_column_css.py
```

`tools/studio_server.py` and `tools/build.ps1` run this when `document-layout.json` exists.

---

## Primary column (default)

| Property | Typical value | CSS variable |
|----------|---------------|--------------|
| Left edge | 42 pt | `--doc-text-col-left` |
| Right edge | 570 pt | `--doc-text-col-right` |
| **Text width** | **528 pt** | `--doc-text-col-width` |

Validation: `width_px` must equal `right_px - left_px`.

Legacy aliases (same values): `--x-text-l`, `--x-text-r`, `--col-w-full`.

---

## Full-width text blocks

These `data-studio-id` values use the primary column for all copy inside the block:

- `text:highlights`
- `text:tvoc`
- `text:gateway`
- `text:operation`
- `text:installation`
- `text:notes`

Rules live in `document-text-column.css` (attribute selectors). New full-width sections should either match this list in the manifest `used_for` array or wrap content in `<div class="doc-text-column">`.

---

## Exceptions

| Block | Width | Variables |
|-------|-------|-----------|
| `text:intro` (page 1) | ~346 pt | `--doc-text-col-intro-left`, `--doc-text-col-intro-width` |
| Tables | per `table-columns.json` | generated table CSS |
| Figures / assets | image bounds | `element-windows.json` |

Record exceptions in `document-layout.json` → `exceptions`.

---

## HTML conventions

- **Full-width:** rely on `data-studio-id` selectors, or add `class="doc-text-column"` on a wrapper.
- **Narrow intro:** `class="doc-text-column-narrow"` on `.body-col` / `[data-studio-id="text:intro"]`.

Do **not** set per-section `width: 520px` or ad hoc `padding-right` on bullets — use the global sheet only.

---

## Onboarding a new product

1. Copy `examples/_template/document-layout.json` and measure primary column from pages 2–4 of the target PDF.
2. Set `primary_text_column.left_px`, `right_px`, `width_px`.
3. List full-width text ids under `used_for`; add `exceptions` for intro or other narrow columns.
4. Run `python tools/generate_document_column_css.py`.
5. Hard-refresh Studio; confirm bullets on pages 1–4 share the same text width in Guide mode.
