---
title: "Direct PDF editing"
order: 160
---

Studio can apply **minor edits on the target PDF pane** — spelling, grammar, and **position of text blocks** — and write changes **into the reference PDF file** (`examples/<example>/reference/*.pdf`), not only into WYSIWYG overrides or `element-windows.json`.

Implementation: **`tools/pdf_direct_edit.py`** (PyMuPDF redact + `insert_textbox`).

## Text edits

| Step | Action |
|------|--------|
| 1 | **Single-click** a text tint on the PDF (or select the same leaf in the explorer). |
| 2 | **Right-click → Edit text on PDF**, or press **F2** (PDF pane focused). |
| 3 | Edit in the overlay textarea (browser spellcheck enabled). |
| 4 | **Ctrl+S**, **Esc**, or click outside to save. |

On save:

1. Text in the element window rect is **redacted** (white fill) in the PDF.
2. New text is **inserted** with font size/color sampled from the original PDF spans (Helvetica/Arial fallback when needed).
3. **`wysiwyg-overrides.json`** is updated to match (WYSIWYG pane refreshes).
4. The PDF viewer reloads so PDF.js shows the updated file.

### API

| Method | Path | Body / query |
|--------|------|----------------|
| GET | `/api/pdf-window-text?id=<window_id>` | Returns `{ text, font_pt }` for the editor. |
| POST | `/api/pdf-edit-text` | `{ id, text }` — writes PDF + WYSIWYG override. |

Text source priority for the editor: `wysiwyg-overrides.json` → `wysiwyg-body.html` block → PDF `get_textbox()` in the window rect.

## Position edits (text blocks)

**Manual resize mode** (`docs/ELEMENT_WINDOW_RESIZE.md`) now writes **text block moves** into the PDF as well as `element-windows.json`.

| Step | Action |
|------|--------|
| 1 | **Double-click** a text tint (PDF, explorer, or WYSIWYG). |
| 2 | Drag the **interior** to move or **handles** to resize. |
| 3 | Click outside the box or **Right-click → Save manual size**. |

For **`kind: text`** windows, save:

1. Redacts text at the **previous** bounds in the PDF.
2. Reinserts the same plain text at the **new** bounds.
3. Updates `element-windows.json` and WYSIWYG override HTML.
4. Reloads PDF + WYSIWYG panes.

API unchanged: `POST /api/element-window` `{ id, left_px, top_px, width_px, height_px }`.

## Backup

The **first** edit to a reference PDF creates:

`reference/<name>.original.pdf`

Subsequent edits are incremental saves on the working PDF. Restore manually from `.original.pdf` if needed.

## Limits (current)

| Supported | Not yet in PDF |
|-----------|----------------|
| Text windows — copy edits, move, resize | Image/link/asset reposition in PDF pixels |
| Single-block plain / multi-line text | Table cell edits on PDF (use WYSIWYG or Excel paths) |
| Font size from window manifest or PDF spans | Perfect font embedding match for every PDF face |

Image/link/table bounds changed in resize mode still update **`element-windows.json`** and Studio overlays; only **text** content is relocated inside the PDF file today.

## Files

| File | Role |
|------|------|
| `tools/pdf_direct_edit.py` | Redact, insert, relocate, HTML ↔ plain helpers |
| `tools/studio_server.py` | `get_pdf_window_text`, `patch_pdf_window_text`, PDF-aware `patch_element_window` |
| `studio/pdf-viewer.html` | Text overlay, F2, context menu **Edit text on PDF** |
| `studio/app.js` | `/api/pdf-edit-text`, reload PDF after save |

See also: **`docs/STUDIO.md`** (split view, keyboard shortcuts), **`docs/ELEMENT_WINDOW_RESIZE.md`**.
